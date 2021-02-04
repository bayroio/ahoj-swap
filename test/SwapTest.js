const AhojJar = artifacts.require("AhojJar");
const TokenA = artifacts.require("TokenA");
const TokenB = artifacts.require("TokenB");

contract('TokenA', (accounts) => {
  it('Account '+accounts[0]+' must have have 4200000 TokenAs', async () => {
    const instanceTokenA = await TokenA.deployed();
    const balance = await instanceTokenA.balanceOf.call(accounts[0]);
    assert.equal(balance.valueOf().toNumber(), 4200000, "4200000 wasn't in Account 0");
  });
});

contract('TokenB', (accounts) => {
  it('Account '+accounts[0]+' must have have 6900000 TokenBs', async () => {
    const instanceTokenB = await TokenB.deployed();
    const balance = await instanceTokenB.balanceOf.call(accounts[0]);
    assert.equal(balance.valueOf().toNumber(), 6900000, "6900000 wasn't in Account 0");
  });
});

contract('AhojJar Case A', (accounts) => {
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
    assert.equal(balanceInit.valueOf().toNumber(), 0, "Account "+accounts[1]+" must have 0 TokenA");
  });
  it('Validate 0 TokenBs in '+accounts[1]+' Account', async () => {
    const instanceTokenB = await TokenB.deployed();
    const balanceInit = await instanceTokenB.balanceOf.call(accounts[1]);
    assert.equal(balanceInit.valueOf().toNumber(), 0, "Account "+accounts[1]+" must have 0 TokenB");
  });
  it('Deposit 100000 TokenBs to '+accounts[1]+' Account', async () => {
    const instanceTokenB = await TokenB.deployed();
    await instanceTokenB.transfer(accounts[1], 100000);
    const balance = await instanceTokenB.balanceOf.call(accounts[1]);
    assert.equal(balance.valueOf().toNumber(), 100000, "Deposit was not made");
  });
  it('AhojJar must have 0 TokenAs', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const reserves = await instanceAhojJar.getReserves.call();
    assert.equal(reserves._reserves1.toNumber(), 0, "AhojJar must have 0 TokenAs");
  });
  it('Deposit 1000000 TokenAs to AhojJar', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const instanceTokenA = await TokenA.deployed();
    await instanceTokenA.transfer(instanceAhojJar.address, 1000000);
    const reserves = await instanceAhojJar.getReserves.call();
    assert.equal(reserves._reserves1.toNumber(), 1000000, "Deposit was not made");
  });
  it('Deposit 2000000 TokenBs to AhojJar', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const instanceTokenB = await TokenB.deployed();
    await instanceTokenB.transfer(instanceAhojJar.address, 2000000);
    const reserves = await instanceAhojJar.getReserves.call();
    assert.equal(reserves._reserves2.toNumber(), 2000000, "Deposit was not made");
  });
  it('Swap 10000 TokenBs to get 4961 TokenAs using AhojJar', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const instanceTokenA = await TokenA.deployed();
    const instanceTokenB = await TokenB.deployed();
    await instanceTokenB.approve(instanceAhojJar.address, 10000, {from: accounts[1]});
    await instanceAhojJar.swap(0, 10000, {from: accounts[1]});
    const balance = await instanceTokenA.balanceOf.call(accounts[1]);
    assert.equal(balance.valueOf().toNumber(), 4961, "User "+accounts[1]+" dont have 4961 TokenAs");
  });
  it('User '+accounts[1]+' must have now 10000 less TokenBs (90000)', async () => {
    const instanceTokenB = await TokenB.deployed();
    const balance = await instanceTokenB.balanceOf.call(accounts[1]);
    assert.equal(balance.valueOf().toNumber(), 90000, "User "+accounts[1]+" dont have 90000 TokenAs");
  });
  it('AhojJar must have 995039 TokenAs', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const reserves = await instanceAhojJar.getReserves.call();
    assert.equal(reserves._reserves1.toNumber(), 995039, "AhojJar doesn't have expected quantity");
  });
  it('AhojJar must have 2010000 TokenBs', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const reserves = await instanceAhojJar.getReserves.call();
    assert.equal(reserves._reserves2.toNumber(), 2010000, "AhojJar doesn't have expected quantity");
  });
  it('New change must be 20200', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const exchange = await instanceAhojJar.getChangeValue.call();
    assert.equal(exchange.toNumber(), 20200, "AhojJar exchange rate is not Correct");
  });
});

contract('AhojJar Case B', (accounts) => {
  it('Deposit 100000 TokenAs to '+accounts[1]+' Account', async () => {
    const instanceTokenA = await TokenA.deployed();
    await instanceTokenA.transfer(accounts[1], 100000);
    const balance = await instanceTokenA.balanceOf.call(accounts[1]);
    assert.equal(balance.valueOf().toNumber(), 100000, "Deposit was not made");
  });
  it('Deposit 1000000 TokenAs to AhojJar', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const instanceTokenA = await TokenA.deployed();
    await instanceTokenA.transfer(instanceAhojJar.address, 1000000);
    const reserves = await instanceAhojJar.getReserves.call();
    assert.equal(reserves._reserves1.toNumber(), 1000000, "Deposit was not made");
  });
  it('Deposit 2000000 TokenBs to AhojJar', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const instanceTokenB = await TokenB.deployed();
    await instanceTokenB.transfer(instanceAhojJar.address, 2000000);
    const reserves = await instanceAhojJar.getReserves.call();
    assert.equal(reserves._reserves2.toNumber(), 2000000, "Deposit was not made");
  });
  it('Swap 5000 TokenAs to get 9921 TokenBs using AhojJar', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const instanceTokenA = await TokenA.deployed();
    const instanceTokenB = await TokenB.deployed();
    await instanceTokenA.approve(instanceAhojJar.address, 5000, {from: accounts[1]});
    await instanceAhojJar.swap(5000, 0, {from: accounts[1]});
    const balance = await instanceTokenB.balanceOf.call(accounts[1]);
    assert.equal(balance.valueOf().toNumber(), 9921, "User "+accounts[1]+" dont have 9921 TokenBs");
  });
  it('User '+accounts[1]+' must have now 5000 less TokenAs (95000)', async () => {
    const instanceTokenA = await TokenA.deployed();
    const balance = await instanceTokenA.balanceOf.call(accounts[1]);
    assert.equal(balance.valueOf().toNumber(), 95000, "User "+accounts[1]+" dont have 95000 TokenAs");
  });
  it('AhojJar must have 1005000 TokenAs', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const reserves = await instanceAhojJar.getReserves.call();
    assert.equal(reserves._reserves1.toNumber(), 1005000, "AhojJar doesn't have expected quantity");
  });
  it('AhojJar must have 1990079 TokenBs', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const reserves = await instanceAhojJar.getReserves.call();
    assert.equal(reserves._reserves2.toNumber(), 1990079, "AhojJar doesn't have expected quantity");
  });
  it('New change must be 19801', async () => {
    const instanceAhojJar = await AhojJar.deployed();
    const exchange = await instanceAhojJar.getChangeValue.call();
    assert.equal(exchange.toNumber(), 19801, "AhojJar exchange rate is not Correct");
  });
});