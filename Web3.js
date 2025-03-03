pragma solidity ^0.8.4;

contract MyToken {

    // Token information

    string public name;

    string public symbol;

    uint8 public decimals;

    uint256 public totalSupply;

    // Balances of token holders

    mapping (address => uint256) public balanceOf;

    // Allowances for token holders to spend on behalf of other addresses

    mapping (address => mapping (address => uint256)) public allowance;

    // Event for token transfer

    event Transfer(address indexed from, address indexed to, uint256 value);

    // Event for approval of token spending

    event Approval(address indexed owner, address indexed spender, uint256 value);

    // Constructor function

    constructor(uint256 initialSupply, string memory tokenName, string memory tokenSymbol, uint8 decimalUnits) {

        balanceOf[msg.sender] = initialSupply;

        totalSupply = initialSupply;

        name = tokenName;

        symbol = tokenSymbol;

        decimals = decimalUnits;

    }

    // Transfer tokens from one address to another

    function transfer(address to, uint256 value) public returns (bool success) {

        require(to != address(0), "Invalid recipient address");

        balanceOf[msg.sender] -= value;

        balanceOf[to] += value;

        emit Transfer(msg.sender, to, value);

        return true;

    }

    // Approve another address to spend tokens on your behalf

    function approve(address spender, uint256 value) public returns (bool success) {

        allowance[msg.sender][spender] = value;

        emit Approval(msg.sender, spender, value);

        return true;

    }

    // Transfer tokens from one address to another on behalf of the owner

    function transferFrom(address from, address to, uint256 value) public returns (bool success) {

        require(to != address(0), "Invalid recipient address");

        require(value <= balanceOf[from], "Insufficient balance");

        require(value <= allowance[from][msg.sender], "Insufficient allowance");

        balanceOf[from] -= value;

        balanceOf[to] += value;

        allowance[from][msg.sender] -= value;

        emit Transfer(from, to, value);

        return true;

    }

    // Get the token balance of a specific address

    function getBalance(address addr) public view returns (uint256 balance) {

        return balanceOf[addr];

    }

    // Optimize gas usage by reducing the number of SSTORE operations in transfer and transferFrom

    function transferOptimized(address to, uint256 value) public returns (bool success) {

        require(to != address(0), "Invalid recipient address");

        uint256 fromBalance = balanceOf[msg.sender];

        require(fromBalance >= value, "Insufficient balance");

        unchecked {

            balanceOf[msg.sender] = fromBalance - value;

        }

        balanceOf[to] += value;

        emit Transfer(msg.sender, to, value);

        return true;

    }

    function transferFromOptimized(address from, address to, uint256 value) public returns (bool success) {

        require(to != address(0), "Invalid recipient address");

        uint256 fromBalance = balanceOf[from];

        require(fromBalance >= value, "Insufficient balance");

        uint256 allowanceAmount = allowance[from][msg.sender];

        require(allowanceAmount >= value, "Insufficient allowance");

        unchecked {

            balanceOf[from] = fromBalance - value;

            allowance[from][msg.sender] = allowanceAmount - value;

        }

        balanceOf[to] += value;

        emit Transfer(from, to, value);

        return true;

    }

}
