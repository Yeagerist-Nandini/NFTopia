const hre = require("hardhat");

async function main(){
  const Contract=await ethers.getContractFactory('NFTopia');
  console.log("Contract Deploying...");

  const contract=await Contract.deploy('NFTopia','NOA',10);
  await contract.waitForDeployment();
  console.log("contract address:",contract.target);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
