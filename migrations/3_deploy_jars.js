const TokenA = artifacts.require("TokenA");
const TokenB = artifacts.require("TokenB");
const AhojJar = artifacts.require("AhojJar");

module.exports = function(deployer) {
  deployer.deploy(AhojJar, TokenA.address, TokenB.address);
};
