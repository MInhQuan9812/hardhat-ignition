const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Aston", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Aston");
    const hardhatToken = await Token.deploy(owner.address);
    console.log(owner.address);
    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    console.log(ownerBalance);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});
