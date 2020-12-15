const AhojToken = artifacts.require("AhojToken");
const AhojTokenB = artifacts.require("AhojTokenB");
const AhojJar = artifacts.require("AhojJar");

module.exports = function(deployer) {
  deployer.deploy(AhojJar, AhojToken.address, AhojTokenB.address);
};
