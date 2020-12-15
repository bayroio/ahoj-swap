pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/token/ERC20/ERC20.sol";

contract AhojToken is ERC20 {
    
    constructor() public ERC20("AhojToken", "AHOJ") {
        _mint(msg.sender, 4200000);
    }
}
