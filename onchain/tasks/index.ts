import { task } from "hardhat/config";
import { deployReputable, deployAllReputable } from "./tasks/ReputableSuite";

task("deployReputable", "Deploys Reputable contract").setAction(
  deployReputable
);

task("deployAllReputable", "Deploys Reputable contract to all testnets")
  .addParam("e", "testnet or mainnet")
  .setAction(deployAllReputable);
