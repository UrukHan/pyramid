// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

/// Imports
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import '@uniswap/v2-periphery/contracts/interfaces/IUniswapV2Router02.sol';
import "./VRFv2Consumer.sol";

uint constant MAX_BPS = 10_000;

/// @title Pyramid project contract
contract Pyramid is Ownable {

    using SafeERC20 for IERC20;
    using Counters for Counters.Counter;

    // Events
    event Contributed(address user, uint amount, uint referral, uint fund, uint lottery, uint marketing, uint toOwner, uint refund);
    event Offset(address user, uint number, uint amount, uint price);
    event Lottery(uint num, address user, uint bank);

    /// Variables
    Counters.Counter _countContributions;                                           // Счетчик количества ставок
    Counters.Counter _countOffsetBids;                                              // Счетчик количества компенсированных ставок
    bool private locker;
    bool _final = false;                                                            // Индикатор завершения игры
    uint _share;                                                                    // Доля банка на пользователя после (определяется после финализации игры)
    uint public timer;                                                              // Таймер, устанавливается после финализации игры (чтобы пользователи могли забрать свою компенсацию)
    uint private _waitingTime;                                                      // количество дней устанавливаемых для таймера
    uint private _depositAmount;                                                    // Размер одной ставки
    address private _wallet;                                                        // Адрес кошелька (текущий контракт)
    address private _usd;                                                           // Адрес токена валюты
    address private _bitcoin;                                                       // Адрес токена резерва
    address private _router = 0xc23E2DD7CC17e232414436520C7cDB7b4aB5c15E;           // Адрес DEX роутера
    address private _vrf = 0xe1b31023588b6f5a3EE6f154f513B72C0EBF17a7;              // Адрес контракта генератора случайных чисел
    uint private _percentageOwner;                                                  // Доля владельца (в BP, 1% = 100bp)
    uint private _percentageMarketing;                                              // Доля маркетинга (в BP, 1% = 100bp)
    uint private _percentageLottery;                                                // Доля лотореи (в BP, 1% = 100bp)
    uint private _percentageReferral;                                               // Доля реферала (в BP, 1% = 100bp)
    uint private _percentageFund;                                                   // Доля фонда (в BP, 1% = 100bp)
    uint private _bankLottery;                                                      // Банк лотореи
    uint private _bankOwner;                                                        // Банк владельца
    uint private _bankMarketing;                                                    // Банк маркетинга
    uint private _bankFund;                                                         // Банк фонда
    uint private _multiplier;                                                       // Мнжитель цены резервной валюте во время ставки превышая который разрешается компенсировать ставки до финализациии
    uint private _randomNum;                                                        // Случайное число, принимается с другого контратка
    uint private _startLotteryNum;                                                  // Номер ставки с которого стартует раунд лотореи
    mapping(uint => address) private _payments;                                     // Сопоставление номер ставки -> адресс вкладчика
    mapping(address => Contribution) private _contributions;                        // Сопоставление адресс вкладчика -> структура вклада

    /// Structurs
    struct Bid {
        uint128 _amount;                       // размер вклада
        uint128 _price;                        // цена резервной валюты на момент вклада
        bool _returned;                     // индикатор события компенсации вклада
    }
    struct Contribution {
        uint _amountContributions;          // Общий размер вклада пользователя
        uint _amountIncome;                 // Общий размер дохода пользователя (с рефералок и компенсаций)
        uint _activeReferrals;              // Счетчик количества активных ссылок реферальных
        mapping(uint => Bid) _bids;         // Сопоставление номера вклада пользователя -> структура ставки
        Counters.Counter _countBids;        // Счетчик количества ставок пользователя
    }

    /// Constructor
    constructor(address usd, address bitcoin, uint multiplier, uint waitingTime, uint depositAmount,
                uint percentageOwner, uint percentageMarketing, uint percentageLottery, uint percentageReferral, uint percentageFund) {
        _usd = usd;
        _bitcoin = bitcoin;
        _multiplier = multiplier;
        _waitingTime = waitingTime;
        _depositAmount = depositAmount;
        _percentageOwner = percentageOwner;
        _percentageMarketing = percentageMarketing;
        _percentageLottery = percentageLottery;
        _percentageReferral = percentageReferral;
        _percentageFund = percentageFund;
        _wallet = address(this);
    }

/// @notice Getting game status
    function getFinalizeStatus() external view returns(bool){
        return _final;
    }
    /// @notice Getting Amount of contributions
    function getDepositAmount() external view returns(uint){
        return _depositAmount;
    }
    /// @notice Setting Amount of contributions
    /// @param depositAmount - amount of contributions
    function setDepositAmount(uint depositAmount) external onlyOwner{
        _depositAmount = depositAmount;
    }
    /// @notice Getting Percentage of contributions to the owner
    function getPercentageOwner() external view returns(uint){
        return _percentageOwner;
    }
    /// @notice Setting Percentage of contributions to the owner
    /// @param percentageOwner - amount percentage of contributions to the owner
    function setPercentageOwner(uint percentageOwner) external onlyOwner{
        _percentageOwner = percentageOwner;
    }
    /// @notice Getting Percentage of contributions to the Fund
    function getPercentageFund() external view returns(uint){
        return _percentageFund;
    }
    /// @notice Setting Percentage of contributions to the Fund
    /// @param percentageFund - amount percentage of contributions to the Fund
    function setPercentageFund(uint percentageFund) external onlyOwner{
        _percentageFund = percentageFund;
    }
    /// @notice Getting Percentage of contributions to the marketing
    function getPercentageMarketing() external view returns(uint){
        return _percentageMarketing;
    }
    /// @notice Setting Percentage of contributions to the Marketing
    /// @param percentageMarketing - amount percentage of contributions to the Marketing
    function setPercentageMarketing(uint percentageMarketing) external onlyOwner{
        _percentageMarketing = percentageMarketing;
    }
    /// @notice Getting Percentage of contributions to the Lottery
    function getPercentageLottery() external view returns(uint){
        return _percentageLottery;
    }
    /// @notice Setting Percentage of contributions to the Lottery
    /// @param percentageLottery - amount percentage of contributions to the Lottery
    function setPercentageLottery(uint percentageLottery) external onlyOwner{
        _percentageLottery = percentageLottery;
    }
    /// @notice Getting Percentage of contributions to the Referral
    function getPercentageReferral() external view returns(uint){
        return _percentageReferral;
    }
    /// @notice Setting Percentage of contributions to the Referral
    /// @param percentageReferral - amount percentage of contributions to the Referral
    function setPercentageReferral(uint percentageReferral) external onlyOwner{
        _percentageReferral = percentageReferral;
    }
    /// @notice Getting Waiting Time
    function getWaitingTime() external view returns(uint){
        return _waitingTime;
    }
    /// @notice Setting Waiting Time
    /// @param waitingTime - in days
    function setWaitingTime(uint waitingTime) external onlyOwner{
        _waitingTime = waitingTime;
    }
    /// @notice Getting count all contribution
    /// @return (uint)
    function getCount() external view onlyOwner returns(uint){
        return _countContributions.current();
    }
    /// @notice Getting sum Bank of Lottery
    /// @return (uint)
    function getAmountLottery() external view returns(uint){
        return _bankLottery;
    }
    /// @notice Getting sum Bank of Owner
    /// @return (uint)
    function getAmountOwner() external view onlyOwner returns(uint){
        return _bankOwner;
    }
    /// @notice Getting sum Bank of Marketing
    /// @return (uint)
    function getAmountMarketing() external view onlyOwner returns(uint){
        return _bankMarketing;
    }
    /// @notice Getting sum Bank of Fund
    /// @return (uint)
    function getAmountFund() external view onlyOwner returns(uint){
        return _bankFund;
    }
    /// @notice Getting amount account contribution
    /// @return (uint)
    function getAmountContributions(address account) external view returns(uint){
        return _contributions[account]._amountContributions;
    }
    /// @notice Getting amount account Income
    /// @return (uint)
    function getAmountIncome(address account) external view returns(uint){
        return _contributions[account]._amountIncome;
    }
    /// @notice Getting count account Active Referrals
    /// @return (uint)
    function getActiveReferrals(address account) external view returns(uint){
        return _contributions[account]._activeReferrals;
    }
    /// @notice Getting count of account bids
    /// @return (uint)
    function getCountBid(address account) external view returns(uint){
        return _contributions[account]._countBids.current();
    }
    /// @notice Getting account bid by number
    /// @return (uint)
    function getBid(address account, uint num) external view returns(Bid memory){
        return _contributions[account]._bids[num];
    }
    /// @notice Get lottery random number
    function getRandomNum() public view returns(uint){
        return _randomNum;
    }
    /// @notice Update lottery random number (После утверждения транзакции нужно подождать 2-3 минуту для обновления значения Оракулом)
    function updateRandomNum() external onlyOwner{
        VRFv2Consumer(_vrf).requestRandomWords();
    }
    /// @notice Get share contribute
    /// @param multi - Количество ставок
    function getShare(uint multi) internal view returns(uint, uint, uint, uint, uint, uint, uint){
        if (multi == 1) {
            uint _shareFond = _depositAmount*_percentageFund/MAX_BPS;
            uint _shareReferral = _depositAmount*_percentageReferral/MAX_BPS;
            uint _shareLottery = _depositAmount*_percentageLottery/MAX_BPS;
            uint _shareMarketing = _depositAmount*_percentageMarketing/MAX_BPS;
            uint _shareOwner = _depositAmount*_percentageOwner/MAX_BPS;
            uint _refund;
            return (_depositAmount, _shareFond, _shareReferral, _shareLottery, _shareMarketing, _shareOwner, _refund);
        } else {
            uint _amountGen = multi*_depositAmount;
            uint _shareFond = _amountGen*_percentageFund/MAX_BPS;
            uint _shareReferral = _depositAmount*_percentageReferral/MAX_BPS;
            uint _shareLottery = _amountGen*_percentageLottery/MAX_BPS;
            uint _shareMarketing = _amountGen*_percentageMarketing/MAX_BPS;
            uint _shareOwner = _amountGen*_percentageOwner/MAX_BPS;
            uint _refund = (_amountGen*_percentageReferral/MAX_BPS) - _shareReferral;
            return (_amountGen, _shareFond, _shareReferral, _shareLottery, _shareMarketing, _shareOwner, _refund);
        }
    }

    /// @notice Contribute
    /// @param multi - Количество ставок
    /// @param base - индикатор ставки (базовый/реферальный)
    /// @param referral - адрес реферала (если ставка базовая адрес не учитывается. можно ставить любой или нулевой адрес)
    function contribute(uint multi, bool base, address referral) external {
        require(_final == false, "Game finalized");
        Contribution storage c_referral = _contributions[referral];
        if (base == false) {
            require(c_referral._activeReferrals > 0);
        }
        require(!locker);
        locker = true;

        (uint _deposit, uint _fond, uint _referral, uint _lottery, uint _marketing, uint _toOwner, uint _refund) = getShare(multi);
        uint _fromSwap;
        address[] memory path = new address[](2);
        path[0] = _usd;
        path[1] = _bitcoin;
        _bankLottery += _lottery;
        _bankMarketing += _marketing;
        _bankOwner += _toOwner;
        _payments[_countContributions.current()] = msg.sender;
        _countContributions.increment();

        Contribution storage c_sender = _contributions[msg.sender];
        Bid storage b_sender = _contributions[msg.sender]._bids[c_sender._countBids.current()];
        c_sender._activeReferrals += multi+1;
        c_sender._amountContributions += _deposit;
        b_sender._amount = uint128(_deposit);

        if (base == true) {
            _fond += _referral;
            IERC20(_usd).safeTransferFrom(msg.sender, _wallet, _deposit - _refund);
        } else {
            IERC20(_usd).safeTransferFrom(msg.sender, referral, _referral);
            IERC20(_usd).safeTransferFrom(msg.sender, _wallet, (_deposit - _referral - _refund));

            c_referral._amountIncome += _depositAmount*_percentageReferral/MAX_BPS;
            c_referral._activeReferrals --;
        }

        IERC20(_usd).approve(_router, _fond);
        _fromSwap = IUniswapV2Router02(_router).swapExactTokensForTokens(_fond, 0, path, address(this), block.timestamp)[1];
        _bankFund += _fromSwap;
        require(_fromSwap > 0, "from DEX comes 0 token");
        require(_fond/_fromSwap > 0, "the price is 0");
        b_sender._price = uint128(_fond/_fromSwap);
        c_sender._countBids.increment();

        locker = false;
        emit Contributed(msg.sender, _deposit, _referral, _fond, _lottery, _marketing, _toOwner, _refund);
    }

    /// @notice Referral contribute
    /// @param number - user's refundable bet number
    function offsetContribution(uint number) external{
        require(_contributions[msg.sender]._bids[number]._returned == false, 'The bet has already been refunded');
        require(!locker);
        locker = true;

        uint _amount = _contributions[msg.sender]._bids[number]._amount;
        require(_amount != 0, 'Zero bid');
        address[] memory path = new address[](2);
        path[0] = _bitcoin;
        path[1] = _usd;
        uint _toSwap;
        uint _price_old = _contributions[msg.sender]._bids[number]._price;
        uint _price_new = IUniswapV2Router02(_router).getAmountsOut(_amount, path)[1]/_amount;
        Contribution storage c_sender = _contributions[msg.sender];
        if (_final == false) {
            require(_price_old*_multiplier < _price_new, 'The deposit of the rate in the reserve has not yet increased enough');
            uint _count = _amount/_price_new;
            IERC20(_bitcoin).approve(_router, _count);
            _toSwap = IUniswapV2Router02(_router).swapTokensForExactTokens(_amount, _count, path, msg.sender, block.timestamp)[0];
            _bankFund -= _toSwap;
            c_sender._amountIncome += _amount;
            _countOffsetBids.increment();
        } else {
            if (_share > _amount) {
                IERC20(_usd).safeTransfer(msg.sender, _amount);
                _bankFund -= _amount;
                c_sender._amountIncome += _amount;
                emit Offset(msg.sender, number, _amount, _price_new);
            } else {
                IERC20(_usd).safeTransfer(msg.sender, _share);
                _bankFund -= _share;
                c_sender._amountIncome += _share;
                emit Offset(msg.sender, number, _share, _price_new);
            }
        }
        locker = false;
    }
    /// @notice Run lottery
    function startLottery() external onlyOwner {
        require(_final == false, "Game finalized");
        uint number =  VRFv2Consumer(_vrf).randomNums(0);
        require(_randomNum != number, 'Random number not yet received from oracle');
        _randomNum = number;
        uint _num = getRandomNum() % (_countContributions.current() - _startLotteryNum);
        IERC20(_usd).safeTransfer(_payments[_num], _bankLottery);

        emit Lottery(_num, _payments[_num], _bankLottery);
        _bankLottery = 0;
        _startLotteryNum = _countContributions.current();
    }
    /// @notice Finalize project
    function finalize() external onlyOwner {
        require(_final == false, "Already finalized");
        address[] memory path = new address[](2);
        path[0] = _bitcoin;
        path[1] = _usd;
        IERC20(_bitcoin).approve(_router, _bankFund);
        _bankFund = IUniswapV2Router02(_router).swapExactTokensForTokens(_bankFund, 0, path, address(this), block.timestamp)[1];
        _share = _bankFund / (_countContributions.current() - _countOffsetBids.current());
        timer = block.timestamp + (_waitingTime * 1 days);
        _final = true;
    }
    /// @notice Withdraw balance
    function withdrawAll() external onlyOwner {
        require(_final == false, "Game finalized");
        require(timer < block.timestamp, "Time to withdraw user funds has not yet expired");
        uint _balance = IERC20(_usd).balanceOf(msg.sender);
        IERC20(_usd).safeTransfer(msg.sender, _balance);
    }
    /// @notice Withdraw Marketing
    function withdrawMarketing() external onlyOwner {
        require(_bankMarketing > 0, "bank empty");
        IERC20(_usd).safeTransfer(msg.sender, _bankMarketing);
        _bankMarketing = 0;
    }
    /// @notice Withdraw Owner
    function withdrawOwner() external onlyOwner {
        require(_bankOwner > 0, "bank empty");
        IERC20(_usd).safeTransfer(msg.sender, _bankOwner);
        _bankOwner = 0;
    }
}












