const { ethers } = require("hardhat")

async function main() {
    const [deployer] = await ethers.getSigner();

console.log(deployer.address)
}



main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});