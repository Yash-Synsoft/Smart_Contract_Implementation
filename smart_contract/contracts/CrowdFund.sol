// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Address.sol";

contract Crowdsale is Ownable {
    using Address for address payable;

    uint256 public cap;
    uint256 public rate;
    uint256 public weiRaised;
    ERC20 public token;

    mapping(address => uint256) public contributions;

    constructor(
        uint256 _cap,
        uint256 _rate,
        address _wallet,
        ERC20 _token
    ) Ownable(msg.sender) {
        require(_cap > 0, "Crowdsale: cap must be greater than 0");
        require(_rate > 0, "Crowdsale: rate must be greater than 0");
        require(_wallet != address(0), "Crowdsale: wallet is the zero address");
        require(address(_token) != address(0), "Crowdsale: token is the zero address");

        cap = _cap;
        rate = _rate;
        token = _token;

        transferOwnership(_wallet);
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view {
        require(beneficiary != address(0), "Crowdsale: beneficiary is the zero address");
        require(weiRaised + weiAmount <= cap, "Crowdsale: cap exceeded");
    }

    function _processPurchase(address beneficiary, uint256 tokenAmount) internal {
        weiRaised += tokenAmount / rate;
        contributions[beneficiary] += tokenAmount / rate;
        token.transfer(beneficiary, tokenAmount);
    }

    function buyTokens(address beneficiary) public payable {
        uint256 weiAmount = msg.value;
        _preValidatePurchase(beneficiary, weiAmount);
        uint256 tokens = weiAmount * rate;
        _processPurchase(beneficiary, tokens);
        address payable wallet = payable(owner());
        wallet.sendValue(msg.value);

        emit TokensPurchased(msg.sender, beneficiary, weiAmount, tokens);
    }

    function withdrawTokens() public onlyOwner {
        token.transfer(owner(), token.balanceOf(address(this)));
    }

    function withdrawFunds() public onlyOwner {
        payable(owner()).sendValue(address(this).balance);
    }

    receive() external payable {
        address payable wallet = payable(owner());
        wallet.sendValue(msg.value);
    }

    event TokensPurchased(address indexed purchaser, address indexed beneficiary, uint256 value, uint256 amount);
}
