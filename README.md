# ERC-Dapp
ERC20 Token made with hardhat enviroment

I will improve the front end soon! Firs I just want to show I'm able to connect a smart contract to a front end.

install required dependencies

cd /frontend and run npm i

on main folder run

npm install --save-dev hardhat
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers

then run a local memory based node with npx hardhat node.
deploy our contracts on the local node with npx hardhat run /scripts/deploy.js --network localhost (If you are going to use your metamask account to deploy it, first 
transfer to your account some ether to make sure you can afford the gas fees (connect to the localhost network in metamask).
run our frontend with cd /frontend and npm start.

Thanks for your time! Any feedback will be welcome.


