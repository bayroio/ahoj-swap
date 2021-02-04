const HDWalletProvider = require('@truffle/hdwallet-provider');
const propertiesReader = require('properties-reader');

const config = propertiesReader('./development.properties');
const KEY1 = config.get('main.privatekey1');
const KEY2 = config.get('main.privatekey2');

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
          privateKeys: [KEY1, KEY2],
          providerOrUrl: 'http://127.0.0.1:9650/ext/bc/C/rpc', //'https://api.avax-test.network/ext/bc/C/rpc',
          address_index: 0,
          num_addresses: 2
        }),
        network_id: "*",
        gas: 3000000,
        gasPrice: 470000000000,
        timeoutBlocks: 100000,
        deploymentPollingInterval: 5000
    }
  }
};
