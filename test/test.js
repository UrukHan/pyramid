
const { ethers } = require("hardhat");
const {expect} = require("chai");
const UNIROUT_ABI = [{"inputs":[{"internalType":"address","name":"_factory","type":"address"},{"internalType":"address","name":"_WETH","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"amountADesired","type":"uint256"},{"internalType":"uint256","name":"amountBDesired","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountTokenDesired","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"addLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"},{"internalType":"uint256","name":"liquidity","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountIn","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"reserveIn","type":"uint256"},{"internalType":"uint256","name":"reserveOut","type":"uint256"}],"name":"getAmountOut","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"reserveA","type":"uint256"},{"internalType":"uint256","name":"reserveB","type":"uint256"}],"name":"quote","outputs":[{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidity","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETH","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"removeLiquidityETHSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermit","outputs":[{"internalType":"uint256","name":"amountToken","type":"uint256"},{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountTokenMin","type":"uint256"},{"internalType":"uint256","name":"amountETHMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityETHWithPermitSupportingFeeOnTransferTokens","outputs":[{"internalType":"uint256","name":"amountETH","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"tokenA","type":"address"},{"internalType":"address","name":"tokenB","type":"address"},{"internalType":"uint256","name":"liquidity","type":"uint256"},{"internalType":"uint256","name":"amountAMin","type":"uint256"},{"internalType":"uint256","name":"amountBMin","type":"uint256"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bool","name":"approveMax","type":"bool"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"removeLiquidityWithPermit","outputs":[{"internalType":"uint256","name":"amountA","type":"uint256"},{"internalType":"uint256","name":"amountB","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactETHForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForETHSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapExactTokensForTokensSupportingFeeOnTransferTokens","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactETH","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"deadline","type":"uint256"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256[]","name":"amounts","type":"uint256[]"}],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}];
const UNIROUT_ADDRESS = "0xc23E2DD7CC17e232414436520C7cDB7b4aB5c15E";

describe("Pyramid", function () {
    this.timeout(100000)

    let owner
    let accOne
    let accTwo
    let PYRAMID
    let USD
    let BTC
    let balanceOwner
    let price = 1000
    let percentOwner = 500
    let percentMarketing = 300
    let percentLottery = 200
    let percentReferral = 8000
    let percentageFund = 1000
    let multiplier = 1
    let waitingTime = 30
    let deployCost
    let UNISWAP
    const MAX_BPS = 10000

    beforeEach(async function(){
        console.log("|     --------- Connect deploy ---------     |");
        [owner, accOne, accTwo] = await ethers.getSigners()

        const UsdContract = await ethers.getContractFactory("Token", owner)
        USD = await UsdContract.deploy('USD Coin', 'USD', 100000, owner.address) // ethers.utils.parseEther("1000")
        await USD.deployed()

        const BtcContract = await ethers.getContractFactory("Token", owner)
        BTC = await BtcContract.deploy('BTC Coin', 'BTC', 10000, owner.address) // ethers.utils.parseEther("1000")
        await BTC.deployed()

        const PyramidContract = await ethers.getContractFactory("Pyramid", owner)
        PYRAMID = await PyramidContract.deploy(USD.address, BTC.address, multiplier,  waitingTime,
                        price, percentOwner, percentMarketing, percentLottery, percentReferral, percentageFund)

        await PYRAMID.deployed()

        balanceOwner = await owner.getBalance()
        deployCost = await 10000 - ethers.utils.formatEther(balanceOwner);

        await USD.transfer(accOne.address, 10000)
        await BTC.transfer(accOne.address, 1000)
        await USD.transfer(accTwo.address, 10000)
        await BTC.transfer(accTwo.address, 1000)

        UNISWAP = new ethers.Contract(
            UNIROUT_ADDRESS,
            UNIROUT_ABI,
            owner,
        );

        await USD.approve(UNIROUT_ADDRESS, 30000);
        await BTC.approve(UNIROUT_ADDRESS, 3000);
        await UNISWAP.addLiquidity(USD.address, BTC.address, 30000, 3000, 30000, 3000, owner.address, Date.now())
        //await USD.approve(UNIROUT_ADDRESS, 1000);
        //await UNISWAP.swapExactTokensForTokens(1000, 0, [USD.address, BTC.address], owner.address, Date.now(), {gasLimit: 5000000})

    })

    it("Test 0", async function() {
        console.log('\nEther spent for deploy: ', deployCost, 'ethers')

        console.log("\nContract addresses:")
        console.log("PYRAMID contract address -", PYRAMID.address)
        console.log("USD contract address -", USD.address)
        console.log("BTC contract address -", BTC.address)
        console.log("\nAccount addresses:")
        console.log("Owner -", owner.address, "   | Account 1 -", accOne.address, "   | Account 2 -", accTwo.address)

        console.log("\nAccount balances USD:")
        console.log("Owner -", (await USD.balanceOf(owner.address)).toNumber(), "   | Account 1 -",
            (await USD.balanceOf(accOne.address)).toNumber(), "   | Account 2 -", (await USD.balanceOf(accTwo.address)).toNumber())
        console.log("\nAccount balances BTC:")
        console.log("Owner -", (await BTC.balanceOf(owner.address)).toNumber(), "   | Account 1 -",
            (await BTC.balanceOf(accOne.address)).toNumber(), "   | Account 2 -", (await BTC.balanceOf(accTwo.address)).toNumber())
    })



    it("Test 1", async function() {
        console.log("|     --------- Sets / Gets ---------     |")
        await PYRAMID.setDepositAmount(1)
        expect(await PYRAMID.getDepositAmount()).to.equal(1)
        await PYRAMID.setPercentageOwner(1)
        expect(await PYRAMID.getPercentageOwner()).to.equal(1)
        await PYRAMID.setPercentageFund(1)
        expect(await PYRAMID.getPercentageFund()).to.equal(1)
        await PYRAMID.setPercentageMarketing(1)
        expect(await PYRAMID.getPercentageMarketing()).to.equal(1)
        await PYRAMID.setPercentageLottery(1)
        expect(await PYRAMID.getPercentageLottery()).to.equal(1)
        await PYRAMID.setPercentageReferral(1)
        expect(await PYRAMID.getAmountLottery()).to.equal(0)
        expect(await PYRAMID.getAmountOwner()).to.equal(0)
        expect(await PYRAMID.getAmountMarketing()).to.equal(0)
        expect(await PYRAMID.getAmountFund()).to.equal(0)
        expect(await PYRAMID.getRandomNum()).to.equal(0)
        await PYRAMID.setWaitingTime(1)
        expect(await PYRAMID.getWaitingTime()).to.equal(1)
        console.log(" Sets / Gets comlite !!!")
        })

    it("Test 2", async function() {

        console.log("|     --------- Test contributes ---------     |")
        const m_1 = 5
        await USD.approve(PYRAMID.address, (await PYRAMID.getDepositAmount()).toNumber()*m_1)
        await PYRAMID.contribute(m_1, true, "0x0000000000000000000000000000000000000000")
        let usd_b_contact = await PYRAMID.getDepositAmount()*((percentOwner+percentMarketing+percentLottery)/MAX_BPS)*m_1
        expect(await USD.balanceOf(PYRAMID.address)).to.equal(usd_b_contact)
        expect(await PYRAMID.getAmountContributions(owner.address)).to.equal(await PYRAMID.getDepositAmount()*m_1)
        expect(await PYRAMID.getActiveReferrals(owner.address)).to.equal(m_1+1)
        expect(await PYRAMID.getCountBid(owner.address)).to.equal(1)
        console.log("examle get Bid:", await PYRAMID.getBid(owner.address, 0))
        expect(await PYRAMID.getAmountLottery()).to.equal(20*m_1)
        expect(await PYRAMID.getAmountOwner()).to.equal(50*m_1)
        expect(await PYRAMID.getAmountMarketing()).to.equal(30*m_1)
        expect(await PYRAMID.getAmountFund() > 0)
        expect(await USD.balanceOf(owner.address)).to.equal(50000 - (1000*m_1) + (800*(m_1-1)))

        const m_2 = 2
        await USD.connect(accOne).approve(PYRAMID.address, (await PYRAMID.getDepositAmount()).toNumber()*m_2)
        await PYRAMID.connect(accOne).contribute(m_2, false, owner.address)
        usd_b_contact = usd_b_contact + await PYRAMID.getDepositAmount()*((percentOwner+percentMarketing+percentLottery)/MAX_BPS)*m_2
        expect(await USD.balanceOf(PYRAMID.address)).to.equal(usd_b_contact)
        expect(await PYRAMID.getAmountContributions(accOne.address)).to.equal(await PYRAMID.getDepositAmount()*m_2)
        expect(await PYRAMID.getActiveReferrals(accOne.address)).to.equal(m_2+1)
        expect(await PYRAMID.getAmountLottery()).to.equal(20*(m_1+m_2))
        expect(await PYRAMID.getAmountOwner()).to.equal(50*(m_1+m_2))
        expect(await PYRAMID.getAmountMarketing()).to.equal(30*(m_1+m_2))
        expect(await USD.balanceOf(accOne.address)).to.equal(10000 - (1000*m_2) + (800*(m_2-1)))

        expect(await PYRAMID.getAmountIncome(owner.address)).to.equal(800)

    })

    it("Test 3", async function() {
        console.log("|     --------- Lottery ---------     |")
        await USD.approve(PYRAMID.address, (await PYRAMID.getDepositAmount()).toNumber())
        await PYRAMID.contribute(1, true, "0x0000000000000000000000000000000000000000")
        await USD.approve(PYRAMID.address, (await PYRAMID.getDepositAmount()).toNumber())
        await PYRAMID.contribute(1, true, "0x0000000000000000000000000000000000000000")
        console.log("Bank Lottery before start Lottery:", await PYRAMID.getAmountLottery())
        console.log("USD user balance before start Lottery:", await USD.balanceOf(owner.address))
        await PYRAMID.startLottery()
        console.log("Bank Lottery after start Lottery:", await PYRAMID.getAmountLottery())
        console.log("USD user balance after start Lottery:", await USD.balanceOf(owner.address))
    })

    it("Test 4", async function() {
        console.log("|     --------- Finalize ---------     |")
        await USD.approve(PYRAMID.address, (await PYRAMID.getDepositAmount()).toNumber())
        await PYRAMID.contribute(1, true, "0x0000000000000000000000000000000000000000")
        await USD.approve(PYRAMID.address, (await PYRAMID.getDepositAmount()).toNumber())
        await PYRAMID.contribute(1, true, "0x0000000000000000000000000000000000000000")
        await expect(PYRAMID.offsetContribution(2)).to.be.revertedWith('Zero bid')
        await expect(PYRAMID.offsetContribution(0)).to.be.revertedWith('The deposit of the rate in the reserve has not yet increased enough')
        await USD.approve(UNIROUT_ADDRESS, 20000);
        await UNISWAP.swapExactTokensForTokens(20000, 0, [USD.address, BTC.address], owner.address, Date.now(), {gasLimit: 5000000})
        await PYRAMID.offsetContribution(0)
        await BTC.approve(UNIROUT_ADDRESS, 3000);
        await UNISWAP.swapExactTokensForTokens(3000, 0, [BTC.address, USD.address], owner.address, Date.now(), {gasLimit: 5000000})

        console.log("Bank fund before finalize:", await PYRAMID.getAmountFund())
        console.log("USD user balance before finalize:", await USD.balanceOf(owner.address))
        console.log("Finalize:", await PYRAMID.getFinalizeStatus())
        await PYRAMID.finalize()
        console.log("Finalize:", await PYRAMID.getFinalizeStatus())
        console.log("Bank Lottery after finalize:", await PYRAMID.getAmountFund())
        console.log("USD user balance after finalize:", await USD.balanceOf(owner.address))
        await PYRAMID.offsetContribution(1)
        console.log("Bank Lottery after offset Contribution:", await PYRAMID.getAmountFund())
        console.log("USD user balance after finalize:", await USD.balanceOf(owner.address))


    })

    it("Test 5", async function() {
        console.log("|     --------- Withdraws ---------     |")
        await USD.approve(PYRAMID.address, (await PYRAMID.getDepositAmount()).toNumber())
        await PYRAMID.contribute(1, true, "0x0000000000000000000000000000000000000000")
        await USD.approve(PYRAMID.address, (await PYRAMID.getDepositAmount()).toNumber())
        await PYRAMID.contribute(1, true, "0x0000000000000000000000000000000000000000")
        console.log("Bank owner before withdraw:", await PYRAMID.getAmountOwner())
        console.log("Bank owner before withdraw:", await PYRAMID.getAmountMarketing())
        console.log("Owner balance before withdraw:", await USD.balanceOf(owner.address))
        await PYRAMID.withdrawOwner()
        await PYRAMID.withdrawMarketing()
        console.log("Bank owner after withdraw:", await PYRAMID.getAmountOwner())
        console.log("Bank owner after withdraw:", await PYRAMID.getAmountMarketing())
        console.log("Owner balance after withdraw:", await USD.balanceOf(owner.address))
        await expect(PYRAMID.withdrawOwner()).to.be.reverted

    })

    it("Test 6", async function() {
        console.log("|     --------- GAS ---------     |")
        let balanceOwner = await owner.getBalance()
        await USD.approve(PYRAMID.address, (await PYRAMID.getDepositAmount()).toNumber())
        await PYRAMID.contribute(1, true, "0x0000000000000000000000000000000000000000")
        console.log("Owner spend on contribute:", balanceOwner - await owner.getBalance())

        // 506733002752000
        // 484877004701696

    })

})









