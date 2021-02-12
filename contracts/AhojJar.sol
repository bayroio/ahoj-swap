pragma solidity ^0.6.0;

import './interfaces/IAhojJar.sol';
import './libraries/Math.sol';
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AhojJar is IAhojJar {

    address public token1;
    address public token2;

    uint private constant FEE_PORCENT = 30; // 10000 Are equals to 100%

    event Swap(address indexed token, uint amount, address indexed to);
    event Alert(string message, uint amount);

    constructor(address _token1, address _token2) public {
        token1 = _token1;
        token2 = _token2;
    }

    function getReserves() public view override returns (uint _reserves1, uint _reserves2) {
        _reserves1 = IERC20(token1).balanceOf(address(this));
        _reserves2 = IERC20(token2).balanceOf(address(this));
    }

    function swap(uint _amountX, uint _amountY) external override {
        require(_amountX > 0 || _amountY > 0, 'ERR: Insuficient Amount');
        (uint _reserves1, uint _reserves2) = getReserves();
        IERC20 _token1 = IERC20(token1);
        IERC20 _token2 = IERC20(token2);
        if(_amountX > 0) {
            require(_token1.allowance(msg.sender, address(this)) == _amountX, 
            'ERR: Allowance was not Made or is not Exactly the ammount required');
            uint _swapAmmount = Math.getSwapAmmount(_reserves2, _reserves1, FEE_PORCENT, _amountX);
            require(_swapAmmount < _reserves2, 'ERR: Insuficient Liquidity');
            transferAllowance(_token1, _amountX);
            transferSwap(_token2, _swapAmmount);
        }
        if(_amountY > 0) {
            require(_token2.allowance(msg.sender, address(this)) == _amountY, 
            'ERR: Allowance was not Made or is not Exactly the ammount required');
            uint _swapAmmount = Math.getSwapAmmount(_reserves1, _reserves2, FEE_PORCENT, _amountY);
            require(_swapAmmount < _reserves1, 'ERR: Insuficient Liquidity');
            transferAllowance(_token2, _amountY);
            transferSwap(_token1, _swapAmmount);
        }
    }

    function swapChain(uint _amountX, uint _amountY, address _recipient, uint _index, address[] calldata _nextContract) external override {
        require(_amountX > 0 || _amountY > 0, 'ERR: Insuficient Amount');
        (uint _reserves1, uint _reserves2) = getReserves();
        IERC20 _token1 = IERC20(token1);
        IERC20 _token2 = IERC20(token2);
        if(_amountX > 0) {
            require(_token1.allowance(msg.sender, address(this)) == _amountX, 
            'ERR: Allowance was not Made or is not Exactly the ammount required');
            uint _swapAmmount = Math.getSwapAmmount(_reserves2, _reserves1, FEE_PORCENT, _amountX);
            require(_swapAmmount < _reserves2, 'ERR: Insuficient Liquidity');
            if(_nextContract[_nextContract.length-1] == address(this)) {
                transferAllowance(_token1, _amountX);
                _directTransferSwap(_token2, _swapAmmount, _recipient);
            } else {
                IERC20(token2).approve(_nextContract[_index+1], _swapAmmount);
                IAhojJar(_nextContract[_index+1]).swapChain(_swapAmmount, _amountY, _recipient, _index+1, _nextContract);
                transferAllowance(_token1, _amountX);
            }
        }
        if(_amountY > 0) {
            require(_token2.allowance(msg.sender, address(this)) == _amountY, 
            'ERR: Allowance was not Made or is not Exactly the ammount required');
            uint _swapAmmount = Math.getSwapAmmount(_reserves1, _reserves2, FEE_PORCENT, _amountY);
            require(_swapAmmount < _reserves1, 'ERR: Insuficient Liquidity');
            transferAllowance(_token2, _amountY);
            transferSwap(_token1, _swapAmmount);
        }
    }
    
    function transferAllowance(IERC20 _token, uint _amount) private {
        _token.transferFrom(msg.sender, address(this), _amount);
    }

    function transferSwap(IERC20 _token, uint _amount) private {
        _token.transfer(msg.sender, _amount);
        emit Swap(address(_token), _amount, msg.sender);
    }

    function _directTransferSwap(IERC20 _token, uint _amount, address _to) internal {
        _token.transfer(_to, _amount);
        emit Swap(address(_token), _amount, _to);
    }

    function getChangeValue() public view returns(uint _result) {
        (uint _reserves1, uint _reserves2) = getReserves();
        _result = Math.getEfectivePrice(_reserves1, _reserves2);
    }
    
}