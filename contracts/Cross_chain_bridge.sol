// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@axelar/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";

contract CrossChainBridge is AxelarExecutable {
    function bridgeXRP(uint256 amount, string memory destinationChain) external {
        IERC20(XRP).transferFrom(msg.sender, address(this), amount);
        sendMessage(destinationChain, abi.encode(amount));
    }
}