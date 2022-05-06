var chai = require("chai");
const expect = chai.expect;
require('dotenv').config()



describe("TokenSale",  function(){

    beforeEach(async function () {
        
      });
    it("there shouldnt be any coins in my account", async () => {
        
         expect(await nikiToken.balanceOf(deployer.address)).to.equal(0);
        });
})