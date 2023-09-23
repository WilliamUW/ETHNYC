import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import CustomButton from "../components/CustomButton";


export default function HomePage() {
  return (
    <>

        {/* Predefined button  */}
        <div>
        <Web3Button icon="show" label="Connect Wallet" balance="show" />
      <br />
      <br />

      {/* Network Switcher Button */}
      <Web3NetworkSwitch />
      <br />

      <br />
      {/* Custom button */}
      <CustomButton />
        </div>
      
     
      
    </>
  );
}
