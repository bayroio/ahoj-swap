const HDWalletProvider = require('@truffle/hdwallet-provider')
module.exports = {
  compilers: { 
    solc: { 
      version: "0.6.0"
    }
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    fuji: {
      provider: () =>
        new HDWalletProvider({
          privateKeys:['some-private-key'],
          providerOrUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
          pollingInterval: 500
        }),
        network_id: "*",
        gas: 3000000,
        gasPrice: 500000000000,
        timeoutBlocks: 10000,
        deploymentPollingInterval: 500
    }
  }
};
