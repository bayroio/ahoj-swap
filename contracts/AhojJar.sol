pragma solidity ^0.6.0;

import './interfaces/IAhojJar.sol';
import './libraries/Math.sol';
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract AhojJar is IAhojJar {

    address public token1;
    address public token2;

    uint private reserves1;
    uint private reserves2;

    uint private value1;
    uint private value2;

    uint private FEE_PORCENT = 30; // 10000 Are equals to 100%

    event Swap(address indexed token, uint amount, address indexed to);
    event Alert(string message, uint amount);

    constructor(address _token1, address _token2) public {
        token1 = _token1;
        token2 = _token2;
        value1 = 100000; // 1 TokenA = 10 Dollar (four ceros for decimals)
        value2 = 20000; // 1 TokenB = 2 Dollars (four ceros for decimals)
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
        /*
        if(_amountX > 0) {
            require(_token1.allowance(msg.sender, address(this)) == _amountX, 
            'ERR: Allowance was not Made or not is Exactly the ammount required');
            uint swapAmmount = Math.getSwapAmmount(_amountX, _value1, _value2);
            require(_amountX < _reserves1 && swapAmmount < _reserves2, 'ERR: Insuficient Liquidity');
            transferAllowance(_token1, _amountX);
            transferSwap(_token2, swapAmmount);
        }
        */
        if(_amountY > 0) {
            //emit Alert("MSG: B",_amountY);
            require(_token2.allowance(msg.sender, address(this)) == _amountY, 
            'ERR: Allowance was not Made or not is Exactly the ammount required');
            uint swapAmmount = Math.getSwapAmmount(_amountY, _reserves2, _reserves1);
            emit Alert("MSG: A",swapAmmount);
            //require(swapAmmount < _reserves1 && _amountY < _reserves2, 'ERR: Insuficient Liquidity');
            //transferAllowance(_token2, _amountY);
            //transferSwap(_token1, _amountY*value1);
        }
        reserves1 = _token1.balanceOf(address(this));
        reserves2 = _token2.balanceOf(address(this));
    }
    
    function transferAllowance(IERC20 _token, uint _amount) private {
        _token.transferFrom(msg.sender, address(this), _amount);
    }

    function transferSwap(IERC20 _token, uint _amount) private {
        _token.transfer(msg.sender, _amount);
        emit Swap(address(_token), _amount, msg.sender);
    }

    function updatePrices(uint _value1, uint _value2) private {
        (uint _reserves1, uint _reserves2) = getReserves();
        //Aqui toca trabajar
    }
    
}