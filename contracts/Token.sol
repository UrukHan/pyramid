// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


import "./interfaces/IERC20Mintable.sol";


contract Token is IERC20Mintable, ERC20, Ownable {
    constructor(
        string memory _name,
        string memory _symbol,
        uint _supply,
        address _owner
    ) ERC20(_name, _symbol) {
        if (_supply > 0) {
            _mint(_owner, _supply);
        }

        _transferOwnership(_owner);
    }

    function mint(
        address user,
        uint amount
    ) external override onlyOwner {
        _mint(user, amount);
    }

    function burn(
        address user,
        uint amount
    ) external override onlyOwner {
        _burn(user, amount);
    }
}