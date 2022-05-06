var chai = require("chai");
const { ethers } = require("hardhat");
const expect = chai.expect;
require('dotenv').config()

describe("Crowdsale contract", function () {
    let initialHolder
    let recipient
    let NikiToken
    let NikiTokenSale
    let instanceToken
    let instanseSale
    let KycContract
    let instanceKyc

    beforeEach(async function () {

      const [initialHolderOBJ, recipientOBJ, addr3, ...addrs] = await ethers.getSigners();
       initialHolder = initialHolderOBJ.address
       recipient = recipientOBJ.address
       NikiToken = await ethers.getContractFactory("NikiToken");
       NikiTokenSale = await ethers.getContractFactory("NikiTokenSale")
       KycContract = await ethers.getContractFactory("KycContract")
       instanceToken = await NikiToken.deploy(process.env.INITIAL_TOKENS);
       kycInstance = await KycContract.deploy()
       instanseSale = await NikiTokenSale.deploy(1, initialHolder, instanceToken.address, kycInstance.address)
       await instanceToken.transfer(instanseSale.address, process.env.INITIAL_TOKENS)
      
    })
    it("The Token contract should not have any funds", async()=>{
        expect(await instanceToken.balanceOf(initialHolder)).to.equal(0)
    })
    it("all coins should be in the tokensale smart contract", async () => {
        let balance = await instanceToken.balanceOf(instanseSale.address);
        let totalSupply = await instanceToken.totalSupply();
        expect(balance).to.equal(totalSupply);
    })
    it("should be possible to buy one token by simply sending ether to the smart contract", async () => {
        let balanceBeforeAccount = await instanceToken.balanceOf(recipient);
        const signer = await ethers.provider.getSigner(recipient)
        await expect(signer.sendTransaction({to: instanseSale.address, value: ethers.utils.parseUnits("1","wei")})).to.be.reverted           
        expect(balanceBeforeAccount).to.equal(await instanceToken.balanceOf(recipient))

        await kycInstance.setKycCompleted(recipient);
        await expect(signer.sendTransaction({to: instanseSale.address, value: ethers.utils.parseUnits("1","wei")})).to.emit(instanseSale,"TokensPurchased")
        expect(balanceBeforeAccount+1).to.equal(await instanceToken.balanceOf(recipient))
    });
    })