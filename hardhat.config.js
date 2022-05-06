/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 require("@nomiclabs/hardhat-waffle");
 require('dotenv').config()

module.exports = {
  solidity: {
    version: "0.8.0",
  },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts:{
        mnemonic:process.env.MNEMONIC,
        path:"m/44'/60'/0'/0",
        initialIndex:0,
      }
    },
    infura:{
      url:"https://ropsten.infura.io/v3/5bbbb13e787a4732a12912360988cf47",
      accounts:{
        mnemonic:process.env.MNEMONIC,
        path:"m/44'/60'/0'/0",
        initialIndex:0,
      }
    },
  }
}
;
