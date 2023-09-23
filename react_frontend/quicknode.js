const ethers = require("ethers");
(async () => {
  const provider = new ethers.providers.JsonRpcProvider("https://FILL_YOUR_ENDPOINT_HERE.com");
  const network = await provider.send(
    "qn_fetchNFTs",
    ["FILL_ME_ARG_1"]
  );
  console.log(network);
})();