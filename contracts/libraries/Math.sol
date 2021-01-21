pragma solidity ^0.6.0;

library Math {
/*
    function getEfectivePrice(uint _assetIn, uint _assetOut, uint _valueInput, uint _fee) internal pure returns (uint _valueOutput) {
        uint product = _assetIn * _assetOut;
        _valueOutput = (_assetOut - product/(_assetIn + _valueInput));
        //_valueOutput = (_assetOut - product/(_assetIn + _valueInput * (100 - _fee)));
    }
*/
    function getSwapAmmount(uint _assetOut, uint _assetIn,uint _fee, uint _input) internal pure returns (uint _result) {
        uint _product = _assetOut * _assetIn;
        uint _part1 = (_input*(10000 - _fee))/(10**4);
        uint _part2 = _assetOut - _product/(_assetIn + _part1);
        _result = _part2;
    }

}