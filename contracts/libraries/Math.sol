pragma solidity ^0.6.0;
import "@openzeppelin/contracts/math/SafeMath.sol";

library Math {

    uint private constant DECIMALS = 4;
    function getSwapAmmount(uint _assetOut, uint _assetIn,uint _fee, uint _input) internal pure returns (uint _result) {
        uint _product = _assetOut * _assetIn;
        uint _part1 = (_input*((10**DECIMALS) - _fee))/(10**4);
        uint _part2 = _assetOut - _product/(_assetIn + _part1);
        _result = _part2;
    }

    function getEfectivePrice(uint _reserves1, uint _reserves2) internal pure returns (uint _result) {
        uint result = (_reserves2*(10**DECIMALS))/_reserves1;
        _result = result;
    }

}