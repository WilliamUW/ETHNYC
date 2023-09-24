import path from "path";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { Contract } from "ethers";

export const deployContract = async (
  hre: any,
  name: string,
  owner: any,
  initParams: Array<any>
): Promise<Contract> => {
  const { ethers, network } = hre;
  const factory = await ethers.getContractFactory(name, owner);
  const contract = await factory.deploy(...initParams);
  const deployed = await contract.deployed();
  console.log(`deployed ${name} to `, deployed.address);

  const folderName = network.name;
  const folderPath = path.resolve(__dirname, `../deployments/${folderName}`);
  if (!existsSync(folderPath)) {
    mkdirSync(folderPath);
  }
  writeFileSync(
    `${folderPath}/${name}.json`,
    JSON.stringify({
      address: deployed.address,
    }),
    {
      encoding: "utf8",
      flag: "w",
    }
  );

  return deployed;
};
