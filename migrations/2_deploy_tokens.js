//const PriceOracleFactory = artifacts.require("PriceOracleFactory");
//const PriceConsumer = artifacts.require("PriceConsumer");
const TokenA = artifacts.require("TokenA");
const TokenB = artifacts.require("TokenB");
const TokenC = artifacts.require("TokenC");

module.exports = function(deployer) {
  /*
  deployer.deploy(PriceOracleFactory).then(() => {
    PriceOracleFactory.deployed().then(instance => {
      instance.newPriceOracle(596472000, "ETH / USD");
      instance.newPriceOracle(1005109, "DAI / USD");
      instance.newPriceOracle(1120892, "CHF / USD");
      instance.newPriceOracle(742663, "AUD / USD");
      instance.newPriceOracle(1212305, "EUR / USD");
      instance.newPriceOracle(9598, "JPY / USD");
      instance.newPriceOracle(3270000, "AVAX / USD");
      instance.newPriceOracle(1000000, "AHOJ / USD");
    });
  });
  deployer.link(PriceOracleFactory, PriceConsumer);
  deployer.deploy(PriceConsumer);
  */
  deployer.deploy(TokenA);
  deployer.deploy(TokenB);
  deployer.deploy(TokenC);
};
