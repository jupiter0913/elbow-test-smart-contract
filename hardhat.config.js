require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
require("solidity-coverage");

const ChainUri = require("./constants/chainUrls.json");
const ChainId = require("./constants/chainIds.json");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const getMnemonic = (networkName) => {
  if (networkName) {
    const mnemonic = process.env["MNEMONIC_" + networkName.toUpperCase()];
    if (mnemonic && mnemonic !== "") return mnemonic;
  }

  const mnemonic = process.env.MNEMONIC;
  if (!mnemonic || mnemonic === "") {
    return "test test test test test test test test test test test junk";
  }

  return mnemonic;
};

const accounts = (chainKey) => {
  return { mnemonic: getMnemonic(chainKey) };
};

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: ChainId.hardhat,
    },
    ethereum: {
      url: ChainUri.ethereum, // public infura endpoint
      chainId: ChainId.ethereum,
      accounts: accounts(),
    },
    bsc: {
      url: ChainUri.bsc,
      chainId: ChainId.bsc,
      accounts: accounts(),
    },
    avalanche: {
      url: ChainUri.avalanche,
      chainId: ChainId.avalanche,
      accounts: accounts(),
    },
    polygon: {
      url: ChainUri.polygon,
      chainId: ChainId.polygon,
      accounts: accounts(),
    },
    opera: {
      url: ChainUri.opera,
      chainId: ChainId.opera,
      accounts: accounts(),
    },
    cronos: {
      url: ChainUri.cronos,
      chainId: ChainId.cronos,
      accounts: accounts(),
    },
    arbitrumOne: {
      url: ChainUri.arbitrumOne,
      chainId: ChainId.arbitrumOne,
      accounts: accounts(),
    },
    optimisticEthereum: {
      url: ChainUri.optimisticEthereum,
      chainId: ChainId.optimisticEthereum,
      accounts: accounts(),
    },

    rinkeby: {
      url: ChainUri.rinkeby, // public infura endpoint
      chainId: ChainId.rinkeby,
      accounts: accounts(),
    },
    bscTestnet: {
      url: ChainUri.bscTestnet,
      chainId: ChainId.bscTestnet,
      accounts: accounts(),
    },
    fuji: {
      url: ChainUri.fuji,
      chainId: ChainId.fuji,
      accounts: accounts(),
    },
    mumbai: {
      url: ChainUri.mumbai,
      chainId: ChainId.mumbai,
      accounts: accounts(),
    },
    ftmTestnet: {
      url: ChainUri.ftmTestnet,
      chainId: ChainId.ftmTestnet,
      accounts: accounts(),
    },
    cronosTestnet: {
      url: ChainUri.cronosTestnet,
      chainId: ChainId.cronosTestnet,
      accounts: accounts(),
    },
    arbitrumRinkeby: {
      url: ChainUri.arbitrumRinkeby,
      chainId: ChainId.arbitrumRinkeby,
      accounts: accounts(),
    },
    optimisticKovan: {
      url: ChainUri.optimisticKovan,
      chainId: ChainId.optimisticKovan,
      accounts: accounts(),
    },
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
    deploy: "./deploy",
    deployments: "./deployments",
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.8.10",
        settings: {
          metadata: {
            bytecodeHash: "none",
          },
          optimizer: {
            enabled: true,
            runs: 800,
          },
        },
      },
      {
        version: "0.8.4",
        settings: {
          metadata: {
            bytecodeHash: "none",
          },
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.0",
        settings: {
          metadata: {
            bytecodeHash: "none",
          },
          optimizer: {
            enabled: true,
            runs: 800,
          },
        },
      },
      {
        version: "0.7.5",
        settings: {
          metadata: {
            bytecodeHash: "none",
          },
          optimizer: {
            enabled: true,
            runs: 800,
          },
        },
      },
      {
        version: "0.5.16",
      },
    ],
    settings: {
      outputSelection: {
        "*": {
          "*": ["storageLayout"],
        },
      },
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      mainnet: process.env.ETHERSCAN_API_KEY,
      ropsten: process.env.ETHERSCAN_API_KEY,
      rinkeby: process.env.ETHERSCAN_API_KEY,
      goerli: process.env.ETHERSCAN_API_KEY,
      kovan: process.env.ETHERSCAN_API_KEY,
      // binance smart chain
      bsc: process.env.BSCSCAN_API_KEY,
      bscTestnet: process.env.BSCSCAN_API_KEY,
      // fantom mainnet
      opera: process.env.FTMSCAN_API_KEY,
      ftmTestnet: process.env.FTMSCAN_API_KEY,
      // optimism
      optimisticEthereum: process.env.OPTIMISTIC_ETHERSCAN_API_KEY,
      optimisticKovan: process.env.OPTIMISTIC_ETHERSCAN_API_KEY,
      // polygon
      polygon: process.env.POLYGONSCAN_API_KEY,
      polygonMumbai: process.env.POLYGONSCAN_API_KEY,
      // arbitrum
      arbitrumOne: process.env.ARBISCAN_API_KEY,
      arbitrumTestnet: process.env.ARBISCAN_API_KEY,
      // avalanche
      avalanche: process.env.SNOWTRACE_API_KEY,
      avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY,
    },
  },
};
