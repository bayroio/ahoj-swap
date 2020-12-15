const AhojToken = artifacts.require("AhojToken");
const AhojTokenB = artifacts.require("AhojTokenB");
const AhojPair = artifacts.require("AhojPair");

module.exports = function(deployer) {
  deployer.deploy(AhojPair, AhojToken.address, AhojTokenB.address);
};
