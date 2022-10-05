# Pyramid blockchain project on Solidity

The project is a game in which players invest tokens, receiving referral links for this, and each new contribution following the referral link brings tokens to the referral, also filling the lottery bank, the owner's share and the bank for reimbursement of contributions.
The lottery is held through a random number received from the ChainLink oracle and thus choosing a random contributor from the list..
The reimbursement bank is collected in Reserve Tokens (BTC) by converting through DEX (Uniswap) and when the exchange rate exceeds a certain threshold, users can also compensate their deposits.

Used libraries:
```shell
npm install --save-dev hardhat
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
npm install --save-dev solidity-coverage
npm install --save-dev @nomiclabs/hardhat-etherscan
npm install --save-dev @openzeppelin/contracts
npm install --save-dev @uniswap
npm install --save-dev @chainlink/contracts
npm install --save-dev @nomicfoundation/hardhat-network-helpers
npm install --save-dev @nomicfoundation/hardhat-chai-matchers
npm install dotenv
```

Running Tests
```shell
Base test:                    npx hardhat test
Check full test coverage      npx hardhat coverage --solcoverjs ./test/*.js 
```

For the following, you need to install slither (library for static audit of smart contracts)
```shell
Run slither on all file:            slither .
Run Slither on a single file:       slither tests/uninitialized.sol
```

Deploy
```shell
npx hardhat run scripts\deploy.js --network rinkeby
(change constructor parametres)
```

Verify example
```shell
npx hardhat verify 0x055874FDb78ab5b3dA84D1Aa56F8bCa3abAbA919 --network rinkeby 0x97472Bb24756e9b53B18b0c0543033528d25A76e 0xcCFb87a75eD87adE5b70F520FD8421db6BE4E8A2 10 30 1000 500 300 200 8000 1000
(contract address & constructor parametres)
```








