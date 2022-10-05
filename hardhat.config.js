require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("solidity-coverage");
require("./tasks/task");

module.exports = {
  defaultNetwork: "rinkeby",
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 999999,
      },
    },
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      forking: {
        url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_RINKEBY}`,
        blockNumber: 11321476,
      },
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${process.env.ALCHEMY_API_RINKEBY}`,
      gasPrice: 3000000000, // 3 gwei
      gas: 3000000,
      timeout: 1000000,
      accounts: [process.env.PRIVATE_KEY_ONE],
    },
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${process.env.ALCHEMY_API_GOERLI}`,
      gasPrice: 3000000000, // 3 gwei
      gas: 3000000,
      timeout: 1000000,
      accounts: [process.env.PRIVATE_KEY_ONE],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API,
    accounts: [process.env.PRIVATE_KEY_ONE],
  },
};