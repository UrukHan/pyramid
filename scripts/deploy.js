const hre = require("hardhat")
const ethers = hre.ethers

async function main() {

  let USD = "0x97472Bb24756e9b53B18b0c0543033528d25A76e";     // Адрес токена валюты
  let BTC = "0xcCFb87a75eD87adE5b70F520FD8421db6BE4E8A2";     // Адрес токена резерва
  let multiplier = 10;                                        // Мнжитель цены резервной валюте во время ставки превышая который разрешается компенсировать ставки до финализациии
  let waitingTime = 30;                                       // Таймер, устанавливается после финализации игры (чтобы пользователи могли забрать свою компенсацию)
  let price = 1000;                                           // Размер одной ставки
  let percentOwner = 500;                                     // Доля владельца (в BP, 1% = 100bp)
  let percentMarketing = 300;                                 // Доля маркетинга (в BP, 1% = 100bp)
  let percentLottery = 200;                                   // Доля лотореи (в BP, 1% = 100bp)
  let percentReferral = 8000;                                 // Доля реферала (в BP, 1% = 100bp)
  let percentageFund = 1000;                                  // Доля фонда (в BP, 1% = 100bp)// Доля фонда (в BP, 1% = 100bp)
  let PYRAMID;

  [owner] = await ethers.getSigners()
  const PyramidContract = await ethers.getContractFactory("Pyramid", owner)
  PYRAMID = await PyramidContract.deploy(USD, BTC, multiplier,  waitingTime,
      price, percentOwner, percentMarketing, percentLottery, percentReferral, percentageFund)
  await PYRAMID.deployed();

  console.log("CONTRACT ADDRESS:", await PYRAMID.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
