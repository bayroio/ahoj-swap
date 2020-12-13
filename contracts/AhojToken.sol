pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/token/ERC20/ERC20.sol";

contract AhojToken is ERC20 {
    //State Variables
    constructor() public ERC20("AhojToken", "AHOJ") {
        _mint(msg.sender, 42069000000);
    }
}
// 0x6d5ca7bF3AFE305AA1C093C441027264134869a8 Address
