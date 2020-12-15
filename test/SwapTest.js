const AhojJar = artifacts.require("AhojJar");
const AhojToken = artifacts.require("AhojToken");
const AhojTokenB = artifacts.require("AhojTokenB");

contract('AhojToken', (accounts) => {
  it('Account '+accounts[0]+' must have have 4200000 AhojTokens', async () => {
    const instanceAhojToken = await AhojToken.deployed();
    const balance = await instanceAhojToken.balanceOf.call(accounts[0]);
    assert.equal(balance.valueOf(), 4200000, "4200000 wasn't in Account 0");
  });
});

contract('AhojTokenB', (accounts) => {
  it('Account '+accounts[0]+' must have have 6900000 AhojTokenBs', async () => {
    const instanceAhojTokenB = await AhojTokenB.deployed();
    const balance = await instanceAhojTokenB.balanceOf.call(accounts[0]);
    assert.equal(balance.valueOf(), 6900000, "6900000 wasn't in Account 0");
  });
});

contract('AhojJar', (accounts) => {
  it('Address1 of AhojJar must be AhojToken', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const instanceAhojToken = await AhojToken.deployed();
    const addressA = await instanceAhojJar.token1.call();
    assert.equal(addressA.valueOf(), instanceAhojToken.address, "Address1 of AhojJar must be AhojToken");
  });
  it('Address2 of AhojJar must be AhojTokenB', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const instanceAhojTokenB = await AhojTokenB.deployed();
    const addressB = await instanceAhojJar.token2.call();
    assert.equal(addressB.valueOf(), instanceAhojTokenB.address, "Address2 of AhojJar must be AhojTokenB");
  });
  it('Deposit 10000 AhojTokens to '+accounts[1]+' Account', async () => {
    const instanceAhojToken = await AhojToken.deployed();
    await instanceAhojToken.transfer(accounts[1], 10000);
    const balance = await instanceAhojToken.balanceOf.call(accounts[1]);
    assert.equal(balance.valueOf(), 10000, "Deposit was not made");
  });
  it('AhojJar must have 0 AhojTokens', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const reserves = await instanceAhojJar.getReserves.call();
    assert.equal(reserves._reserves1, 0, "AhojJar must have 0 AhojTokens");
  });
  it('Deposit 200000 AhojTokens to AhojJar', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const instanceAhojToken = await AhojToken.deployed();
    await instanceAhojToken.transfer(instanceAhojJar.address, 200000);
    const reserves = await instanceAhojJar.getReserves.call();
    assert.equal(reserves._reserves1, 200000, "Deposit was not made");
  });
  it('Deposit 400000 AhojTokenBs to AhojJar', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const instanceAhojTokenB = await AhojTokenB.deployed();
    await instanceAhojTokenB.transfer(instanceAhojJar.address, 400000);
    const reserves = await instanceAhojJar.getReserves.call();
    assert.equal(reserves._reserves2, 400000, "Deposit was not made");
  });
  // Upgrade by first validating the ammount of allowance and do the transfer of Token1 before doing Swaping
  it('Simulate a 100 AhojTokens to get 500 AhojTokenBs using AhojJar', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const instanceAhojTokenB = await AhojTokenB.deployed();
    await instanceAhojJar.swap(100, 0, {from: accounts[1]});
    const reserves = await instanceAhojJar.getReserves.call();
    const balance = await instanceAhojTokenB.balanceOf.call(accounts[1]);
    assert.equal(balance.valueOf(), 500, "User"+accounts[1]+" dont have 500 AhojTokenBs");
  });
});