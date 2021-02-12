pragma solidity ^0.6.0;
// Modify to make it Ownable
import './AhojJar.sol';

contract AhojJarFactory {

    address[] public jars;

    event JarCreated(address indexed jarAddress);
    constructor() public {
    }

    function newAhojJar(address _token1, address _token2) public returns (address) {
        AhojJar jar = (new AhojJar(_token1, _token2));
        jars.push(address(jar));
        emit JarCreated(address(jar));
        return address(jar);
    }

    function getOraclesLenght() external view returns (uint) {
        return jars.length;
    }
}