// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyCrowdsale is Ownable(msg.sender){
    IERC20 public token;
    uint256 public tokenPrice; 

    constructor(IERC20 _token, uint256 _tokenPrice) {
        token = _token;
        tokenPrice = _tokenPrice;
    }

    function buyTokens() external payable {
        uint256 amount = msg.value;
        uint256 tokens = amount  / tokenPrice

        require(tokens > 0, "Not enough Ether to buy any tokens");
        require(token.balanceOf(address(this)) >= tokens, "Not enough tokens in the contract");

        token.transfer(msg.sender, tokens);

        payable(owner()).transfer(amount);
    }
}
