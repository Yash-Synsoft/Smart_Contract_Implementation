// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable(msg.sender) {
    uint256 internal constant MAX_SUPPLY = 2 * (10**9) * (10**18); 

    constructor(address ownerAddress) ERC20("SYN Token", "SYN") {
        _mint(ownerAddress, MAX_SUPPLY);
        transferOwnership(ownerAddress);
    }
}
