const PriceOracleFactory = artifacts.require("PriceOracleFactory");
const PriceConsumer = artifacts.require("PriceConsumer");
const AhojToken = artifacts.require("AhojToken");

module.exports = function(deployer) {
  deployer.deploy(PriceOracleFactory).then(() => {
    PriceOracleFactory.deployed().then(instance => {
      instance.newPriceOracle(596472000, "ETH / USD");
      instance.newPriceOracle(1005109, "DAI / USD");
      instance.newPriceOracle(1120892, "CHF / USD");
      instance.newPriceOracle(0742663, "AUD / USD");
      instance.newPriceOracle(1212305, "EUR / USD");
      instance.newPriceOracle(0009598, "JPY / USD");
      instance.newPriceOracle(3270000, "AVAX / USD");
      instance.newPriceOracle(1000000, "AHOJ / USD");
    });
  });
  deployer.link(PriceOracleFactory, PriceConsumer);
  deployer.deploy(PriceConsumer);
  deployer.deploy(AhojToken);
};
