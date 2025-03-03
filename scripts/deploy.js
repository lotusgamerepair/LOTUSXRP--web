const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    const ticketPrice = ethers.parseEther("0.01"); // Set your ticket price

    const LotusFLR = await ethers.getContractFactory("LotusFLR");
    const lotusFLR = await LotusFLR.deploy(ticketPrice);

    await lotusFLR.deployed();

    console.log("LotusFLR deployed to:", lotusFLR.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});