pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v2.5.0/contracts/token/ERC20/ERC20.sol";

contract TokenC is ERC20 {
    
    constructor() public ERC20("TokenC", "TESTC") {
        _mint(msg.sender, 6400000);
    }
}
