const { network } = require("hardhat")
const { from } = require("solhint/lib/config")
const {
    developmentChain,
    DECIMALS,
    INITAIL_ANSWER,
} = require("../helper-hardhat-config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    if (developmentChain.includes(network.name)) {
        log("Local network detected! Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITAIL_ANSWER],
        })
        log("Mocks deployed!")
        log("-----------------------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
