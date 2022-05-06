const fs = require("fs");
const { ethers } = require("hardhat");
require('dotenv').config()

async function main() {
    const [deployer] = await ethers.getSigners();
  
  //DEPLOY
    const NikiToken = await ethers.getContractFactory("NikiToken");
    const NikiTokenSale = await ethers.getContractFactory("NikiTokenSale")
    const KycContract = await ethers.getContractFactory("KycContract")
    const nikiToken = await NikiToken.deploy(process.env.INITIAL_TOKENS);
    await nikiToken.deployed()
    const kycContract = await KycContract.deploy()
    await kycContract.deployed()
    const nikiTokenSale = await NikiTokenSale.deploy(1, deployer.address, nikiToken.address,kycContract.address)
    await nikiTokenSale.deployed()
    await nikiToken.transfer(nikiTokenSale.address, process.env.INITIAL_TOKENS)

  //DEPLOY
  
    console.log("Deployed from:", deployer.address);
    console.log("Token address:", nikiToken.address);
    console.log("Token sale address:", nikiTokenSale.address)
 
    //JSON FILES FOR FRONTEND
    const nikiTokenData= {
        address: nikiToken.address,
        abi: JSON.parse(nikiToken.interface.format("json"))
    }
    const tokenSaleData={
      address:  nikiTokenSale.address,
      abi: JSON.parse(nikiTokenSale.interface.format("json"))
    }
    const kycContractData={
      address:  kycContract.address,
      abi: JSON.parse(kycContract.interface.format("json"))
    }

    fs.writeFileSync("frontend/src/NikiToken.json", JSON.stringify(nikiTokenData))
    fs.writeFileSync("frontend/src/NikiTokenSale.json", JSON.stringify(tokenSaleData))
    fs.writeFileSync("frontend/src/KycContract.json", JSON.stringify(kycContractData))
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  