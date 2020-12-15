pragma solidity ^0.6.0;

contract PriceOracle {

    address public factory;
    int private price;
    string private name;
    
    constructor(int _price, string memory _name) public {
        factory = msg.sender;
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