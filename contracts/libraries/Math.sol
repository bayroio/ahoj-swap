pragma solidity ^0.6.0;

library Math {
    function calFee(uint _value,uint _fee) internal pure returns (uint _result) {
        _result = _value*_fee;
    }
}