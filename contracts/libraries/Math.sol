pragma solidity ^0.6.0;

library Math {

    function getEfectivePrice(uint _assetIn, uint _assetOut, uint _valueInput, uint _fee) internal pure returns (uint _valueOutput) {
        uint product = _assetIn * _assetOut;
        _valueOutput = (_assetOut - product/(_assetIn + _valueInput));
        //_valueOutput = (_assetOut - product/(_assetIn + _valueInput * (100 - _fee)));
    }

    function getSwapAmmount(uint _amount,uint _value1, uint _value2) internal pure returns (uint _result) {
        // Research about better and more exacts division in Solidity
        uint result = (_value1/_value2)*_amount;
        _result = result;
    }
}