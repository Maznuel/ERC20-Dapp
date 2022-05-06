var chai = require("chai");
const { ethers } = require("hardhat");
const expect = chai.expect;
require('dotenv').config()



describe("Token contract", function () {
  let initialHolder
  let recipient
  let NikiToken
  let instance
  beforeEach(async function () {
    const [initialHolderOBJ, recipientOBJ, addr3, ...addrs] = await ethers.getSigners();
     initialHolder = initialHolderOBJ.address
      recipient = recipientOBJ.address
     NikiToken = await ethers.getContractFactory("NikiToken");
     instance = await NikiToken.deploy(process.env.INITIAL_TOKENS);
    
  })
  
  it("The deployer account balance should match the total supply", async ()=>{
    
    let totalSupply = await instance.totalSupply()
     expect(await instance.balanceOf(initialHolder)).equal(totalSupply);

  })
  it("I can send tokens from Account 1 to Account 2", async () => {
   
    let totalSupply = await instance.totalSupply();
   await expect(instance.transfer(recipient, 1)).to.emit(instance, "Transfer")
    expect(await instance.balanceOf(initialHolder)).equal(totalSupply - 1)
      expect(await instance.balanceOf(recipient)).equal(1)

  })
  it("It's not possible to send more tokens than account 1 has", async () => {
    

    let balanceOfAccount = await instance.balanceOf(initialHolder);
   await expect(instance.transfer(recipient, balanceOfAccount+1)).to.be.reverted;
    expect(await instance.balanceOf(initialHolder)).to.equal(balanceOfAccount )

    })
});
