pragma solidity ^0.6.0;
// Modify to make it Ownable

contract PriceOracleFactory {

    address[] private oracles;

    event OracleCreated(address indexed oracleAddress);
    constructor() public {
    }

    function newPriceOracle(int _price, string memory _name) public returns (address) {
        PriceOracle oracle = (new PriceOracle(_price, _name));
        oracles.push(address(oracle));
        emit OracleCreated(address(oracle));
        return address(oracle);
    }

    function getOracles() public returns (address[] memory) {
        return oracles;
    }
}

contract PriceOracle {

    int private price;
    string private name;
    constructor(int _price, string memory _name) public {
        price = _price;
        name = _name;
    }

    /**
     * Returns the latest price
     */
    function latestAnswer() public view returns (int) {
        return price;
    }

    function setPrice(int _price) public { //Modify so only Owner can change price
        price = _price;
    }

    function getName() public view returns (string memory) {
        return name;
    }
}