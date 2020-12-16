pragma solidity ^0.6.0;

library Math {
    function getFee(uint _value,uint _fee) internal pure returns (uint _result) {
        _result = _value*_fee;
    }

    function getSwapAmmount(uint _amount,uint _value1, uint _value2) internal pure returns (uint _result) {
        // Research about better and more exacts division in Solidity
        uint result = (_value1/_value2)*_amount;
        _result = result;
    }
}