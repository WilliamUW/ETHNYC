import { deployContract } from "./shared";
import ReputableArgs from "../constants/args.json";
import shell from "shelljs";

const environments: any = {
  testnet: ["goerli", "arbitrum-goerli", "mantle-testnet", "base-testnet"],
};

export const deployReputable = async (taskArgs: any, hre: any) => {
  const { ethers, network } = hre;
  const [owner] = await ethers.getSigners();
  const args = (ReputableArgs as any)[network.name];

  await deployContract(hre, "Reputable", owner, [
    args.highRepURI,
    args.lowRepURI,
    args.mediumRepURI,
    args.gateway,
    args.gasReciever,
  ]);
};

export const deployAllReputable = async (taskArgs: any, hre: any) => {
  const networks = environments[taskArgs.e];
  if (!taskArgs.e || networks.length === 0) {
    console.log(`Invalid environment argument: ${taskArgs.e}`);
  }
  await Promise.all(
    networks.map(async (network: string) => {
      const checkWireUpCommand = `npx hardhat deployReputable --network ${network}`;
      console.log(checkWireUpCommand);
      shell.exec(checkWireUpCommand).stdout.replace(/(\r\n|\n|\r|\s)/gm, "");
    })
  );
};
