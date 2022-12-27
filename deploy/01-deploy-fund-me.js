const { network } = require("hardhat")
const { networkConfig, developmentChain } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    let ethUSDPriceFeedAddress
    if (developmentChain.includes(network.name)) {
        const ethUSDAggregator = await deployments.get("MockV3Aggregator")
        ethUSDPriceFeedAddress = ethUSDAggregator.address
    } else {
        ethUSDPriceFeedAddress =
            networkConfig[chainId]["ethUSDPriceFeedAddress"]
    }

    //if the contract does not exist, we deploy a minimal version for local testing

    //What happens when we want to change chains
    //when going for localhost or hardhart network we want to use a mock
    const args = [ethUSDPriceFeedAddress]
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    log("args:", args)
    if (
        !developmentChain.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        log("-----verifying contract-----")
        await verify(fundMe.address, args)
    }
    log("------------------------------------------------------------------")
}

module.exports.tags = ["all", "fund-me"]
