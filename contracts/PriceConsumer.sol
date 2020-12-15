/**
 * Using the ETH/USD Price Feed: https://feeds.chain.link/eth-usd
 */

pragma solidity ^0.6.0;

import "./PriceOracle.sol";

contract PriceConsumer {

    constructor() public {
    }

    function getLatestPrice(address _contractAddress) public view returns (int256) {
        PriceOracle priceFeed = PriceOracle(_contractAddress);
        return priceFeed.latestAnswer();
    }
}