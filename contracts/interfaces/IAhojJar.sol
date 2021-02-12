pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
interface IAhojJar {

    function getReserves() external view returns (uint _reserves1, uint _reserves2);
    function swap(uint _amountX, uint _amountY) external;
    function swapChain(uint _amountX, uint _amountY, address _recipient, uint _index, address[] calldata _nextContract) external;
}