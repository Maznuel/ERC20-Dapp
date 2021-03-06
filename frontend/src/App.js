import React, { Component } from "react";
import NikiToken from './contracts/NikiToken.json';
import NikiTokenSale from './contracts/NikiTokenSale.json';
import KycContract from './contracts/KycContract.json';
import { ethers, Contract } from 'ethers';
//Components
import Nav from "./components/Nav"
import GlobalStyled from "./components/GlobalStyled"

import "./style.css"

class App extends Component {
  state = { loaded: false, kycAddress: "Enter address", tokenSaleAddress: "" };


  componentDidMount = async () => {
  try {
    if(window.ethereum){
      await window.ethereum.enable();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
     this.signer = provider.getSigner();
     this.signerAddress = await this.signer.getAddress();

    this.nikiToken = new Contract(
      NikiToken.address,
      NikiToken.abi,
      this.signer
    );
    this.nikiTokenSale = new Contract(
      NikiTokenSale.address,
      NikiTokenSale.abi,
      this.signer
    );
    this.kycContract = new Contract(
      KycContract.address,
      KycContract.abi,
      this.signer
    );
    this.setState({ loaded:true, tokenSaleAddress: this.nikiTokenSale.address, userTokens: 0 })
    this.listenToTokenTransfer()
    }
  }catch (error) {
  // Catch any errors for any of the above operations.
  alert(
  `Failed to load web3, accounts, or contract. Check console for details.`,
  );
  console.error(error);
  }
  };
  
  handleBuyToken = async () => {
    await this.nikiTokenSale.buyTokens(this.signerAddress,{value: 1});
    }

  listenToTokenTransfer = async() => {
    this.nikiToken.on("Transfer",async () =>{
      let userTokens = parseInt(await this.nikiToken.balanceOf(this.signerAddress));
      this.setState({userTokens: userTokens});
    });
    }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
    [name]: value
    });
    }

    handleKycSubmit = async () => {
      const {kycAddress} = this.state;
      await this.kycContract.setKycCompleted(kycAddress)
      alert("Account "+kycAddress+" is now whitelisted");
      }


  render() {
    if (!this.state.loaded) {
    return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
    <div className="App">
      <GlobalStyled />
      <Nav />
      <div className="Home">
        <div className="kyc">
    <h1>NikiToken</h1>
    <p>Make sure you are using the deployer account!</p>
    <h2>Enable your account</h2>
    Address to allow: <input type="text" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange} />
    <button type="button" onClick={this.handleKycSubmit}>Add Address to Whitelist</button>
    </div>
    <div className="buy">
    <h2>Buy NikiTokens</h2>
    <p>Current price 1 Wei</p>
    <p>Send Ether to this address : {this.state.tokenSaleAddress}</p>
    <p>You have: {this.state.userTokens} NikiTokens</p>
    <button type="button" onClick={this.handleBuyToken}>Buy more tokens</button>
    </div>
    </div>
    </div>
    
    );
    }}

export default App;
    