module.exports = async function ({ deployments, getNamedAccounts }) {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  console.log(`>>> Deployer address: ${deployer}`);

  await deploy("Crowdfund", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 1,
  });
};

module.exports.tags = ["Crowdfund"];
