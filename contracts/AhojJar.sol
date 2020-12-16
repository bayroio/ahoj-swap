pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AhojJar {

    address public token1;
    address public token2;

    uint private reserves1;
    uint private reserves2;

    uint private value1;
    uint private value2;

    constructor(address _token1, address _token2) public {
        token1 = _token1;
        token2 = _token2;
        value1 = 1;
        value2 = 5;
    }

    function getReserves() public view returns (uint _reserves1, uint _reserves2) {
        _reserves1 = IERC20(token1).balanceOf(address(this));
        _reserves2 = IERC20(token2).balanceOf(address(this));
    }

    function swap(uint _amountX, uint _amountY) external {
        require(_amountX > 0 || _amountY > 0, 'Insuficient Amount');
        (uint _reserves1, uint _reserves2) = getReserves();
        require(_amountX < _reserves1 && _amountY < _reserves2, 'Insuficient Liquidity');
        IERC20 _token1 = IERC20(token1);
        IERC20 _token2 = IERC20(token2);
        if(_amountX > 0) {
            require(_token1.allowance(msg.sender, address(this)) == _amountX, 'Allowance was not Made or not is Exactly the ammount required');
            transferAllowance(_token1, _amountX);
            uint swapAmmount = _amountX*value2;
            transferSwap(_token2, swapAmmount);
        }
        if(_amountY > 0) {
            require(_token2.allowance(msg.sender, address(this)) == _amountY, 'Allowance was not Made or not is Exactly the ammount required');
            transferAllowance(_token2, _amountY);
            uint swapAmmount = _amountY*value1;
            transferSwap(_token1, _amountY*value1);
        }
        reserves1 = _token1.balanceOf(address(this));
        reserves2 = _token2.balanceOf(address(this));
    }

    function transferAllowance(IERC20 _token, uint _amount) private {
        _token.transferFrom(msg.sender, address(this), _amount);
    }

    function transferSwap(IERC20 _token, uint _amount) private {
        _token.transfer(msg.sender, _amount);
    }
    
}