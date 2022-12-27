const networkConfig = {
    5: {
        name: "goerli",
        ethUSDPriceFeedAddress: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
    },
}

const developmentChain = ["hardhat", "localhost"]
const DECIMALS = 8
const INITAIL_ANSWER = 200000000000

module.exports = { networkConfig, developmentChain, DECIMALS, INITAIL_ANSWER }
