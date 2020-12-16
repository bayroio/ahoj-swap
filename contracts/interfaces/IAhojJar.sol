pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
interface IAhojJar {

    event Swap(address indexed token, uint amount, address indexed to);

    function getReserves() external view returns (uint _reserves1, uint _reserves2);
    function swap(uint _amountX, uint _amountY) external;
}