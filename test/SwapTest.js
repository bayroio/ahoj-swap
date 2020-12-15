const AhojPair = artifacts.require("AhojPair");
const AhojToken = artifacts.require("AhojToken");
const AhojTokenB = artifacts.require("AhojTokenB");

contract('AhojToken', (accounts) => {
  it('Account '+accounts[0]+' must have have 4200000 AhojTokens', async () => {
    const instanceAhojToken = await AhojToken.deployed();
    const balance = await instanceAhojToken.balanceOf.call(accounts[0]);
    assert.equal(balance.valueOf(), 4200000, "42069 wasn't in Account 0");
  });
});

contract('AhojTokenB', (accounts) => {
  it('Account '+accounts[0]+' must have have 6900000 AhojTokenBs', async () => {
    const instanceAhojTokenB = await AhojTokenB.deployed();
    const balance = await instanceAhojTokenB.balanceOf.call(accounts[0]);
    assert.equal(balance.valueOf(), 6900000, "69049 wasn't in Account 0");
  });
});

contract('AhojPair', (accounts) => {
  it('Address1 of AhojPair must be AhojToken', async () => {
    const instanceAhojPair = await AhojPair.deployed();
    const instanceAhojToken = await AhojToken.deployed();
    const addressA = await instanceAhojPair.token1.call();
    assert.equal(addressA.valueOf(), instanceAhojToken.address, "Address1 of AhojPair must be AhojToken");
  });
  it('Address2 of AhojPair must be AhojTokenB', async () => {
    const instanceAhojPair = await AhojPair.deployed();
    const instanceAhojTokenB = await AhojTokenB.deployed();
    const addressB = await instanceAhojPair.token2.call();
    assert.equal(addressB.valueOf(), instanceAhojTokenB.address, "Address2 of AhojPair must be AhojTokenB");
  });
  it('AhojPair must have 0 AhojTokens', async () => {
    const instanceAhojPair = await AhojPair.deployed();
    const reservers = await instanceAhojPair.getReserves.call();
    assert.equal(reservers._reserves1, 0, "AhojPair must have 0 AhojTokens");
  });
  it('Deposit AhojTokens to AhojPair', async () => {
    const instanceAhojPair = await AhojPair.deployed();
    const instanceAhojToken = await AhojToken.deployed();
    await instanceAhojToken.transfer(instanceAhojPair.address, 200000);
    const balance = await instanceAhojToken.balanceOf.call(instanceAhojPair.address);
    assert.equal(balance.valueOf(), 200000, "Deposit was not made");
  });
  it('Account '+accounts[0]+' must have have 4000000 AhojTokens', async () => {
    const instanceAhojToken = await AhojToken.deployed();
    const balance = await instanceAhojToken.balanceOf.call(accounts[0]);
    assert.equal(balance.valueOf(), 4000000, "4000000 wasn't in Account 0");
  });
});