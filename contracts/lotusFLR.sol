pragma solidity ^0.8.0;

contract LotusFLR {
    address public owner;
    uint256 public ticketPrice;
    uint256 public pot;
    address[] public players;

    uint256 public drawingBlockNumber;
    bool public drawingStarted;

    constructor(uint256 _ticketPrice) {
        owner = msg.sender;
        ticketPrice = _ticketPrice;
    }

    function buyTicket() public payable {
        require(msg.value == ticketPrice, "Must send the exact ticket price.");
        players.push(msg.sender);
        pot += msg.value;
    }

    function startDrawing() public onlyOwner {
        require(!drawingStarted, "Drawing already started.");
        require(players.length > 0, "No players to draw from.");
        drawingBlockNumber = block.number;
        drawingStarted = true;
    }

    function finalizeDrawing() public {
        require(drawingStarted, "Drawing not started.");
        require(block.number > drawingBlockNumber + 9, "Wait for at least 10 blocks.");
        uint256 randomNumber = uint256(blockhash(drawingBlockNumber));
        uint256 randomIndex = randomNumber % players.length;
        address winner = players[randomIndex];
        payable(winner).transfer(pot);
        pot = 0;
        delete players;
        drawingStarted = false;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }
}