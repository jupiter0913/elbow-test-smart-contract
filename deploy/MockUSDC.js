const MOCKUSDC_ARGS = require("../constants/mUSDC.json");

module.exports = async function ({ deployments, getNamedAccounts }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log(`>>> Deployer address: ${deployer}`);

  await deploy("MockUSDC", {
    from: deployer,
    args: [
      MOCKUSDC_ARGS.preMint,
      MOCKUSDC_ARGS.interval,
      MOCKUSDC_ARGS.faucetTotal,
      MOCKUSDC_ARGS.faucetAmount,
    ],
    log: true,
    waitConfirmations: 1,
  });
};

module.exports.tags = ["MockUSDC"];
