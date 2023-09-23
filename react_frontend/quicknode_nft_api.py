import requests
import json

url = "https://docs-demo.quiknode.pro/"

payload = json.dumps({
  "id": 67,
  "jsonrpc": "2.0",
  "method": "qn_fetchNFTs",
  "params": [{
    "wallet": "0x0E5d299236647563649526cfa25c39d6848101f5",
    "omitFields": [
      "traits"
    ],
    "page": 1,
    "perPage": 10
  }]
})
headers = {
  'Content-Type': 'application/json'
}

response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)

sample_response = {"jsonrpc":"2.0","id":67,"result":{"owner":"0x91b51c173a4bdaa1a60e234fc3f705a16d228740","assets":[{"collectionName":"ENS: Ethereum Name Service","collectionTokenId":"38853309149452581077701141679233650460660338303674199927415651071997354510129","collectionAddress":"0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85","name":"bunsen.eth","description":"","imageUrl":"","chain":"ETH","network":"MAINNET"},{"collectionName":"ENS: Ethereum Name Service","collectionTokenId":"99714264064120529103136539703888684445403246456096729363559387196806604594133","collectionAddress":"0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85","name":"0xsurl.eth","description":"","imageUrl":"","chain":"ETH","network":"MAINNET"},{"collectionName":"Rarible","collectionTokenId":"80829","collectionAddress":"0xd07dc4262bcdbf85190c01c996b4c06a461d2430","name":"Girl with a pearl earring","description":"","imageUrl":"https://quicknode-content.quicknode-ipfs.com/ipfs/QmWyUaVgiRLgv1gp6hGVtoKxG8PSVrJmf4UpkRJKCXkYGp/image.gif","chain":"ETH","network":"MAINNET"},{"collectionName":"Rarible","collectionTokenId":"130476","collectionAddress":"0xd07dc4262bcdbf85190c01c996b4c06a461d2430","name":"FaceLOOP#1","description":"","imageUrl":"https://quicknode-content.quicknode-ipfs.com/ipfs/QmcxS6KVaGfX8XmwMMAbM19Sh5xauFwjR9adEr6aYqDnHc/image.gif","chain":"ETH","network":"MAINNET"},{"collectionName":"Rarible","collectionTokenId":"133803","collectionAddress":"0xd07dc4262bcdbf85190c01c996b4c06a461d2430","name":"Let me out","description":"Let me out of here please","imageUrl":"https://quicknode-content.quicknode-ipfs.com/ipfs/QmUFq2ftcDaybWASBwsP4BsFLfik9HfJmdVcMegC895DkK/image.png","chain":"ETH","network":"MAINNET"},{"collectionName":"Foundation (FND)","collectionTokenId":"160","collectionAddress":"0x3b3ee1931dc30c1957379fac9aba94d1c48a5405","name":"ARRIVAL","description":"Hemisveer #002 / ARRIVAL","imageUrl":"https://quicknode-content.quicknode-ipfs.com/ipfs/QmYepWRu5WVzZrncNuNTBP8pS2xDzfwQ9DzqArX5HBfx26/nft.mp4","chain":"ETH","network":"MAINNET"},{"collectionName":"Foundation (FND)","collectionTokenId":"468","collectionAddress":"0x3b3ee1931dc30c1957379fac9aba94d1c48a5405","name":"Paint Dots 02","description":"Created from interpolation videos based on a dataset of hand painted circles. ","imageUrl":"https://quicknode-content.quicknode-ipfs.com/ipfs/QmZazFxC1VoK4V7vByy3g1SvM8UYKrGmgcNr2Gdmb93MYr/nft.mp4","chain":"ETH","network":"MAINNET"},{"collectionName":"SOLOS","collectionTokenId":"176","collectionAddress":"0x7f96f68fa766d4e9b037417fe4967511152b9272","name":"Sweet Wood","description":"Solos Edition One: Saturnalia.","imageUrl":"https://s3.amazonaws.com/tokens.solos.so/176.png","chain":"ETH","network":"MAINNET"},{"collectionName":"SOLOS","collectionTokenId":"2413","collectionAddress":"0x7f96f68fa766d4e9b037417fe4967511152b9272","name":"Jolly Sunset","description":"Solos Edition One: Saturnalia.","imageUrl":"https://s3.amazonaws.com/tokens.solos.so/2413.png","chain":"ETH","network":"MAINNET"},{"collectionName":"ENS: Ethereum Name Service","collectionTokenId":"51050888276517340603750605228445096604816390143185520217218819846065839481034","collectionAddress":"0x57f1887a8bf19b14fc0df6fd9b2acc9af147ea85","name":"courtsidedao.eth","description":"","imageUrl":"","chain":"ETH","network":"MAINNET"}],"totalPages":5,"totalItems":47,"pageNumber":1}}