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
        address _token1 = token1;
        address _token2 = token2;
        require(IERC20(_token1).allowance(msg.sender, address(this)) > 0 || IERC20(_token2).allowance(msg.sender, address(this)) > 0, 'Allowance not Made');
        //if(_amountX > 0) checkAllowance(_token1, _amountX);
        //if(_amountY > 0) checkAllowance(_token2, _amountY);
        if(_amountX > 0) transfer(_token2, _amountX*value2);
        if(_amountY > 0) transfer(_token1, _amountY*value1);
        reserves1 = IERC20(token1).balanceOf(address(this));
        reserves2 = IERC20(token2).balanceOf(address(this));
    }

    function transfer(address _token, uint _amount) private {
        IERC20 token = IERC20(_token);
        token.transfer(msg.sender, _amount);
    }

    function checkAllowance(address _token, uint _amount) private {
        IERC20 token = IERC20(_token);
        token.transfer(msg.sender, _amount);
    }
}