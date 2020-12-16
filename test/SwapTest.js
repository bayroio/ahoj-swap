const AhojJar = artifacts.require("AhojJar");
const TokenA = artifacts.require("TokenA");
const TokenB = artifacts.require("TokenB");

contract('TokenA', (accounts) => {
  it('Account '+accounts[0]+' must have have 4200000 TokenAs', async () => {
    const instanceTokenA = await TokenA.deployed();
    const balance = await instanceTokenA.balanceOf.call(accounts[0]);
    assert.equal(balance.valueOf(), 4200000, "4200000 wasn't in Account 0");
  });
});

contract('TokenB', (accounts) => {
  it('Account '+accounts[0]+' must have have 6900000 TokenBs', async () => {
    const instanceTokenB = await TokenB.deployed();
    const balance = await instanceTokenB.balanceOf.call(accounts[0]);
    assert.equal(balance.valueOf(), 6900000, "6900000 wasn't in Account 0");
  });
});

contract('AhojJar', (accounts) => {
  it('Address1 of AhojJar must be TokenA', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const instanceTokenA = await TokenA.deployed();
    const addressA = await instanceAhojJar.token1.call();
    assert.equal(addressA.valueOf(), instanceTokenA.address, "Address1 of AhojJar must be TokenA");
  });
  it('Address2 of AhojJar must be TokenB', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const instanceTokenB = await TokenB.deployed();
    const addressB = await instanceAhojJar.token2.call();
    assert.equal(addressB.valueOf(), instanceTokenB.address, "Address2 of AhojJar must be TokenB");
  });
  it('Validate 0 TokenAs in '+accounts[1]+' Account', async () => {
    const instanceTokenA = await TokenA.deployed();
    const balanceInit = await instanceTokenA.balanceOf.call(accounts[1]);
    assert.equal(balanceInit.valueOf(), 0, "Deposit was not made");
  });
  it('Deposit 10000 TokenAs to '+accounts[1]+' Account', async () => {
    const instanceTokenA = await TokenA.deployed();
    await instanceTokenA.transfer(accounts[1], 10000);
    const balance = await instanceTokenA.balanceOf.call(accounts[1]);
    assert.equal(balance.valueOf(), 10000, "Deposit was not made");
  });
  it('AhojJar must have 0 TokenAs', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const reserves = await instanceAhojJar.getReserves.call();
    assert.equal(reserves._reserves1, 0, "AhojJar must have 0 TokenAs");
  });
  it('Deposit 200000 TokenAs to AhojJar', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const instanceTokenA = await TokenA.deployed();
    await instanceTokenA.transfer(instanceAhojJar.address, 200000);
    const reserves = await instanceAhojJar.getReserves.call();
    assert.equal(reserves._reserves1, 200000, "Deposit was not made");
  });
  it('Deposit 400000 TokenBs to AhojJar', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const instanceTokenB = await TokenB.deployed();
    await instanceTokenB.transfer(instanceAhojJar.address, 400000);
    const reserves = await instanceAhojJar.getReserves.call();
    assert.equal(reserves._reserves2, 400000, "Deposit was not made");
  });
  // Upgrade by first validating the ammount of allowance and do the transfer of Token1 before doing Swaping
  it('Simulate a 100 TokenAs to get 500 TokenBs using AhojJar', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const instanceTokenA = await TokenA.deployed();
    const instanceTokenB = await TokenB.deployed();
    await instanceTokenA.approve(instanceAhojJar.address, 100, {from: accounts[1]});
    await instanceAhojJar.swap(100, 0, {from: accounts[1]});
    const balance = await instanceTokenB.balanceOf.call(accounts[1]);
    assert.equal(balance.valueOf(), 500, "User"+accounts[1]+" dont have 500 TokenBs");
  });
  /*
  it('Simulate a 100 TokenAs to get 500 TokenBs using AhojJar', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const reserves = await instanceAhojJar.getReserves.call();
    assert.equal(reserves._reserves1, 200100, "VAL");
  });
  */
});