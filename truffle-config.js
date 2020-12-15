const HDWalletProvider = require('@truffle/hdwallet-provider');
const propertiesReader = require('properties-reader');

const config = propertiesReader('./development.properties');
const KEY = config.get('main.privatekeys');
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
          privateKeys: [KEY],
          providerOrUrl: 'https://api.avax-test.network/ext/bc/C/rpc',
          pollingInterval: 500
        }),
        network_id: "*",
        gas: 3000000,
        gasPrice: 500000000000,
        timeoutBlocks: 20000,
        deploymentPollingInterval: 500
    }
  }
};
