pragma solidity ^0.6.0;
// Modify to make it Ownable
import './PriceOracle.sol';

contract PriceOracleFactory {

    address[] public oracles;

    event OracleCreated(address indexed oracleAddress);
    constructor() public {
    }

    function newPriceOracle(int _price, string memory _name) public returns (address) {
        PriceOracle oracle = (new PriceOracle(_price, _name));
        oracles.push(address(oracle));
        emit OracleCreated(address(oracle));
        return address(oracle);
    }

    function getOraclesLenght() external view returns (uint) {
        return oracles.length;
    }
}