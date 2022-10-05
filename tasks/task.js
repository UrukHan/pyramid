

// npx hardhat getFinalizeStatus --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("getFinalizeStatus", "Getting game status")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log("Finalize:", await PYRAMID.getFinalizeStatus());
    })

// npx hardhat getDepositAmount --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("getDepositAmount", "Getting Amount of contributions")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log("Amount of contributions:", (await PYRAMID.getDepositAmount()).toNumber());
    })

// npx hardhat setDepositAmount --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919 --amount 1000
task("setDepositAmount", "Setting Amount of contributions")
    .addParam("pyramid", "Contract address")
    .addParam("amount", "Amount of contributions")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        await PYRAMID.setDepositAmount(taskArgs.amount)
        console.log("Set Amount of contributions");
    })


// npx hardhat getPercentageOwner --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("getPercentageOwner", "Getting Percentage of contributions to the owner")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log("Owner's percentage:", (await PYRAMID.getPercentageOwner()).toNumber());
    })

// npx hardhat setPercentageOwner --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919 --percentage 500
task("setPercentageOwner", "Setting Percentage of contributions to the owner in Basic Points")
    .addParam("pyramid", "Contract address")
    .addParam("percentage", "Amount of contributions")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        await PYRAMID.setPercentageOwner(taskArgs.percentage)
        console.log("Set Owner's percentage");
    })

// npx hardhat getPercentageFund --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("getPercentageFund", "Getting Percentage of contributions to the Fund")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log("Fund's percentage:", (await PYRAMID.getPercentageFund()).toNumber());
    })

// npx hardhat setPercentageFund --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919 --percentage 1000
task("setPercentageFund", "Setting Percentage of contributions to the Fund in Basic Points")
    .addParam("pyramid", "Contract address")
    .addParam("percentage", "Amount of contributions")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        await PYRAMID.setPercentageFund(taskArgs.percentage)
        console.log("Set Fund's percentage");
    })

// npx hardhat getPercentageMarketing --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("getPercentageMarketing", "Getting Percentage of contributions to the Marketing")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log("Marketing's percentage:", (await PYRAMID.getPercentageMarketing()).toNumber());
    })

// npx hardhat setPercentageMarketing --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919 --percentage 300
task("setPercentageMarketing", "Setting Percentage of contributions to the Marketing in Basic Points")
    .addParam("pyramid", "Contract address")
    .addParam("percentage", "Amount of contributions")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        await PYRAMID.setPercentageMarketing(taskArgs.percentage)
        console.log("Set Marketing's percentage");
    })

// npx hardhat getPercentageLottery --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("getPercentageLottery", "Getting Percentage of contributions to the Lottery")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log("Lottery's percentage:", (await PYRAMID.getPercentageLottery()).toNumber());
    })

// npx hardhat setPercentageLottery --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919 --percentage 200
task("setPercentageLottery", "Setting Percentage of contributions to the Lottery in Basic Points")
    .addParam("pyramid", "Contract address")
    .addParam("percentage", "Amount of contributions")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        await PYRAMID.setPercentageLottery(taskArgs.percentage)
        console.log("Set Lottery's percentage");
    })

// npx hardhat getPercentageReferral --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("getPercentageReferral", "Getting Percentage of contributions to the Referral")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log("Referral's percentage:", (await PYRAMID.getPercentageReferral()).toNumber());
    })

// npx hardhat setPercentageReferral --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919 --percentage 8000
task("setPercentageReferral", "Setting Percentage of contributions to the Referral in Basic Points")
    .addParam("pyramid", "Contract address")
    .addParam("percentage", "Amount of contributions")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        await PYRAMID.setPercentageReferral(taskArgs.percentage)
        console.log("Set Referral's percentage");
    })

// npx hardhat getWaitingTime --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("getWaitingTime", "Getting Waiting Time")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log("Waiting Time:", (await PYRAMID.getWaitingTime()).toNumber());
    })

// npx hardhat setWaitingTime --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919 --percentage 30
task("setWaitingTime", "Setting Waiting Time")
    .addParam("pyramid", "Contract address")
    .addParam("percentage", "Amount of contributions")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        await PYRAMID.setWaitingTime(taskArgs.percentage)
        console.log("Set Waiting Time");
    })

// npx hardhat getCount --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("getCount", "Getting count all contribution")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log("Count all contribution:", (await PYRAMID.getCount()).toNumber());
    })

// npx hardhat getAmountLottery --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("getAmountLottery", "Getting sum Bank of Lottery")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log("Bank of Lottery:", (await PYRAMID.getAmountLottery()).toNumber());
    })

// npx hardhat getAmountOwner --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("getAmountOwner", "Getting sum Bank of Owner")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log("Bank of Owner:", (await PYRAMID.getAmountOwner()).toNumber());
    })

// npx hardhat getAmountMarketing --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("getAmountMarketing", "Getting sum Bank of Marketing")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log("Bank of Marketing:", (await PYRAMID.getAmountMarketing()).toNumber());
    })

// npx hardhat getAmountFund --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("getAmountFund", "Getting sum Bank of Fund")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log("Bank of Fund:", (await PYRAMID.getAmountFund()).toNumber());
    })

// npx hardhat getAmountContributions --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919 --account 0x1C3f50CA4f8b96fAa6ab1020D9C54a44ADfAc814
task("getAmountContributions", "Getting amount account contribution")
    .addParam("pyramid", "Contract address")
    .addParam("account", "User address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log("Amount account contribution:", (await PYRAMID.getAmountContributions(taskArgs.account)).toNumber());
    })

// npx hardhat getAmountIncome --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919 --account 0x1C3f50CA4f8b96fAa6ab1020D9C54a44ADfAc814
task("getAmountIncome", "Getting amount account Income")
    .addParam("pyramid", "Contract address")
    .addParam("account", "User address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log("Amount account Income:", (await PYRAMID.getAmountIncome(taskArgs.account)).toNumber());
    })


// npx hardhat getActiveReferrals --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919 --account 0x1C3f50CA4f8b96fAa6ab1020D9C54a44ADfAc814
task("getActiveReferrals", "Getting count account Active Referrals")
    .addParam("pyramid", "Contract address")
    .addParam("account", "User address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log("Account Active Referrals:", (await PYRAMID.getActiveReferrals(taskArgs.account)).toNumber());
    })

// npx hardhat getCountBid --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919 --account 0x1C3f50CA4f8b96fAa6ab1020D9C54a44ADfAc814
task("getCountBid", "Getting count of account bids")
    .addParam("pyramid", "Contract address")
    .addParam("account", "User address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log("Account bids:", (await PYRAMID.getCountBid(taskArgs.account)).toNumber());
    })

// npx hardhat getBid --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919 --account 0x1C3f50CA4f8b96fAa6ab1020D9C54a44ADfAc814 --bid 0
task("getBid", "Getting account bid by number")
    .addParam("pyramid", "Contract address")
    .addParam("account", "User address")
    .addParam("bid", "User address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log("Bid", taskArgs.bid, ":", await PYRAMID.getBid(taskArgs.account, taskArgs.bid));
    })

// npx hardhat getRandomNum --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("getRandomNum", "Get lottery random number")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log("lottery random number", await PYRAMID.getRandomNum());
    })

// npx hardhat updateRandomNum --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("updateRandomNum", "update random number for Lottery")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        console.log(await PYRAMID.updateRandomNum());
    })

// npx hardhat contribute --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919 --usd 0x97472Bb24756e9b53B18b0c0543033528d25A76e --multi 2 --base true --referral 0x0000000000000000000000000000000000000000
task("contribute", "Contribute")
    .addParam("pyramid", "Contract address")
    .addParam("usd", "currency address")
    .addParam("multi", "count bids")
    .addParam("base", "base or referal bids -  true/false")
    .addParam("referral", "referral address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        const UsdContract = await ethers.getContractFactory("Token");
        const USD = await UsdContract.attach(taskArgs.usd);
        const amount = (await PYRAMID.getDepositAmount()).toNumber() * taskArgs.multi
        console.log("amount:", amount);
        USD.approve(taskArgs.pyramid, amount);
        await PYRAMID.contribute(taskArgs.multi, taskArgs.base, taskArgs.referral)
        console.log("contribute");
    })

// npx hardhat offsetContribution --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919 --bid 0
task("offsetContribution", "Contribute offset")
    .addParam("pyramid", "Contract address")
    .addParam("bid", "bid number")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        await PYRAMID.offsetContribution(taskArgs.bid)
        console.log("contribute offset");
    })

// npx hardhat startLottery --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919 --bid 0
task("startLottery", "Start Lottery")
    .addParam("pyramid", "Contract address")
    .addParam("bid", "bid number")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        await PYRAMID.startLottery()
        console.log("Start Lottery");
    })

// npx hardhat startLottery --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("startLottery", "Start Lottery")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        await PYRAMID.startLottery()
        console.log("Start Lottery");
    })

// npx hardhat finalize --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("finalize", "Finalize project")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        await PYRAMID.finalize()
        console.log("Finalize project");
    })

// npx hardhat withdrawAll --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("withdrawAll", "Withdraw balance")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        await PYRAMID.withdrawAll()
        console.log("Withdraw all");
    })

// npx hardhat withdrawMarketing --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("withdrawMarketing", "Withdraw Marketing")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        await PYRAMID.withdrawMarketing()
        console.log("Withdraw Marketing");
    })

// npx hardhat withdrawOwner --pyramid 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919
task("withdrawOwner", "Withdraw Owner")
    .addParam("pyramid", "Contract address")
    .setAction(async (taskArgs) => {
        const pyramidContract = await ethers.getContractFactory("Pyramid");
        const PYRAMID = pyramidContract.attach(taskArgs.pyramid);
        await PYRAMID.withdrawOwner()
        console.log("Withdraw Owner");
    })



