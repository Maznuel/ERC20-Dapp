/*import { ethers, Contract } from 'ethers';
import NikiToken from './NikiToken.json';
import NikiTokenSale from './NikiTokenSale.json';
import KycContract from './KycContract.json';

const getBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener('load', async () => {
      if(window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signerAddress = await signer.getAddress();
        
        const nikiToken = new Contract(
          NikiToken.address,
          NikiToken.abi,
          signer
        );
        const nikiTokenSale = new Contract(
          NikiTokenSale.address,
          NikiTokenSale.abi,
          signer
        );
        const kycContract = new Contract(
          KycContract.address,
          KycContract.abi,
          signer
        );

        resolve({signerAddress, nikiToken, nikiTokenSale, kycContract});
      }
      resolve({
        signerAddress: undefined,
        nikiToken: undefined,
        nikiTokenSale: undefined,
        kycContract: undefined,
        });
    });
  });

  import getBlockchain from './ethereum.js';
  import React, { useState, useEffect } from 'react';
  
  function App() {
    const [nikiToken, setNikiToken] = useState(undefined);
    const [nikiTokenSale, setNikiTokenSale] = useState(undefined);
    const [kycContract, setKyc] = useState(undefined);
  
    useEffect(() => {
        const init = async () => {
        const { nikiToken } = await getBlockchain();
        setNikiToken(nikiToken);
        const { nikiTokenSale } = await getBlockchain();
        setNikiTokenSale(nikiTokenSale);
        const { kycContract } = await getBlockchain();
        setKyc(kycContract);
      };
      init();
    }, []);
  
    if(
      typeof nikiToken === 'undefined'
    ) {
      return 'Loading...';
    }
  
    return (
      <div className="App">
       
      </div>
    );
  }
  
  export default App;


export default getBlockchain;*/