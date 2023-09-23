import { View, Text } from "react-native";
import { Button, Card, List } from 'antd';

import styles from "./specifics.style";



const transactions = [{'amount': '1', 'blockNumber': 14498658, 'blockTimestamp': '2022-04-01T06:10:08Z', 'from': {'addresses': ['0x0000000000000000000000000000000000000000']}, 'to': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'tokenAddress': '0xfc5d9258cc6d21d21c16aaec1daa52759c92ce30', 'transactionHash': '0x9b83386f626320e73a7370fac9fe99cef894b5aec9c9471daea382c6255d973e', 'tokenType': 'ERC721', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638663, 'blockTimestamp': '2022-09-29T11:19:59Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x6fbfb348597f9f88cd3a2d99714687268769441c']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0x644bbf49202270625b5233aa7e091c54c71fe1e41137f9a8460ce68215f3e7d8', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '1', 'blockNumber': 14049128, 'blockTimestamp': '2022-01-21T13:19:14Z', 'from': {'addresses': ['0x0000000000000000000000000000000000000000']}, 'to': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'tokenAddress': '0xc450362d646f42327050ff3521fc2061b34a6a0d', 'transactionHash': '0x005e1a1cd23bc5596803472b7340e9353005922cee573eda8ba39c1d4008e904', 'tokenType': 'ERC721', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15481848, 'blockTimestamp': '2022-09-06T04:04:05Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x35a791707bfad064e00b450f24b141d1c7bdb0db']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0xf208ce845157a5c7d34327e78f48b93098e895f0360482e7553cbff953aeb1c8', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '66411142560000000', 'blockNumber': 17811763, 'blockTimestamp': '2023-07-31T08:21:35Z', 'from': {'addresses': ['0x420ee2c1d0aec3c961b5845ed63c3258eef1403e']}, 'to': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'tokenAddress': '0x7e48f84e566c2e118ebc3a06711471967ac09447', 'transactionHash': '0x2e1067200884035430e17cfd505f968048c5c0ea7068af68b4c01ac2fc7e7912', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '1', 'blockNumber': 16320171, 'blockTimestamp': '2023-01-02T16:05:23Z', 'from': {'addresses': ['0x0000000000000000000000000000000000000000']}, 'to': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'tokenAddress': '0xd352edbd9315dbe0e90b8c2b082732a6eba7f984', 'transactionHash': '0x11143fcb1b7e7efb75948c87085dcd653234052a74a177c8c3cbbcb84c381900', 'tokenType': 'ERC721', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638793, 'blockTimestamp': '2022-09-29T11:46:11Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xef0e791ba41c53037c2b13638682dcde7e605ac0']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0x7d5406b8499c7a483e833ef6b2f47a59b9b51f53db48a23513964697cd52b504', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15477615, 'blockTimestamp': '2022-09-05T11:31:10Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x3262394bba400904aa90761abeec7232d091f0e3']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0x56c7d6febca08e233142c97208d067a22eb4b94f74a3869affd6acd4c7b920a5', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15480561, 'blockTimestamp': '2022-09-05T23:02:52Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xba52d3e317d168cb6640ebadd8cbc6ac3dec6047']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0x17b6678245df3b543d7c88c0e9897fece86cbad49cb9c53b4634675567e33d74', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15481851, 'blockTimestamp': '2022-09-06T04:04:16Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xaffaaa4fc25e9b9d14d9d0103f8e49978bb094be']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0x67d6a45198883c5b21b1a28ff9077ca220dbc676e093e4a75d2e15bb3b9fa057', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15481848, 'blockTimestamp': '2022-09-06T04:04:05Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x4d3321e42944c6f14cbb683a9f543cf58591af38']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0xa39077c935d2b79ea65b7e051dd2b81b0564dbf23fd359720cfeb732e00a062f', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638690, 'blockTimestamp': '2022-09-29T11:25:35Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x20153221c1279db78aba7e3339f08cf4789fe23f']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0xd1908f4d1fd9c73caceadaa2bc804b821e4f90f3a7aa4ffeb9fb38c3530f4a85', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638768, 'blockTimestamp': '2022-09-29T11:41:11Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xba76afc14f5240370b940d859adaa9c3a8f03afe']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0x7b3747214e856451abb50b305d65847152ff76029ddc6102e229cdd359180483', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15482140, 'blockTimestamp': '2022-09-06T05:10:29Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x7cb43ff702f307af9c1c261860d997a4d370148c']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0x432c388cea91f4f1c7937a78e01a59f853c89a70a5986ac46e642f8449fb8349', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '1', 'blockNumber': 14670221, 'blockTimestamp': '2022-04-28T02:26:30Z', 'from': {'addresses': ['0x0000000000000000000000000000000000000000']}, 'to': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'tokenAddress': '0xf9eab063d52ead6c3b6f0e6faedb44a4303bb036', 'transactionHash': '0xcb6700e03af82ea599d791fcb0957c43a8ab874f5f6858fc385c746d2c9cfb97', 'tokenType': 'ERC721', 'blockchain': 'ethereum'}, {'amount': '1', 'blockNumber': 16320171, 'blockTimestamp': '2023-01-02T16:05:23Z', 'from': {'addresses': ['0x0000000000000000000000000000000000000000']}, 'to': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'tokenAddress': '0xd352edbd9315dbe0e90b8c2b082732a6eba7f984', 'transactionHash': '0x11143fcb1b7e7efb75948c87085dcd653234052a74a177c8c3cbbcb84c381900', 'tokenType': 'ERC721', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15482140, 'blockTimestamp': '2022-09-06T05:10:29Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xbbbe0484f7f9749afa2f6a36bd5015d9a20b07b3']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0xe3414048d8e94f6891e3bbd041d5118c2535494ae505b810ae219be9c8a2be28', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638707, 'blockTimestamp': '2022-09-29T11:28:59Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x4c800163406a3aa9b67f79ca491eea264db13ff4']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0xb7c59d3a721451eae9b0a43e99456bdafb7b41dea6874b805b3234924413a92b', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15477603, 'blockTimestamp': '2022-09-05T11:28:28Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xc7dfab84834329feb333c8c4f80d3fc14364afaf']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0x788f68d8f02de6826c7c9a7fd35761a76f13e9b76b7e0702d186ad61598a2f19', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638776, 'blockTimestamp': '2022-09-29T11:42:47Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xc8d741d6187dca43e070fb48373c890f416ddc34']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0xa0e7cb343182a78749d389fe4602969e0db57d5aede1730aff9a20ba3aad2d01', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638645, 'blockTimestamp': '2022-09-29T11:16:23Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xcfcce06af0ee209dfa340247199057fe619c98c9']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0xa4dffbefb960be9dcf385ca416f2be4baff556564d2819af67dc66ad3d178bb9', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638785, 'blockTimestamp': '2022-09-29T11:44:35Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xdc32905aa83faeb942fbbf4f040815fe9836acbe']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0xda73c27c8d0f71168dab7876eb41c3f84f7120d5fe6b14fb8c8eedeefe05a114', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638635, 'blockTimestamp': '2022-09-29T11:14:23Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xba40624b1f2e3e01b7d074e1224c3c0821a5da8e']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0xd99e3325ca6cd1e8088014edf4a12206ade4ce28191a7b8c201d0e92d9db14cb', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15482035, 'blockTimestamp': '2022-09-06T04:45:39Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xdf63a072500a09c962d189758f96ea8acb584239']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0x502686a1345abab0d5bb3344ab578f75a2c1fe7c2c6ae9da9b66d2bc9873dd93', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638792, 'blockTimestamp': '2022-09-29T11:45:59Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xeb83b088fd45f408dcf5e1923d291a08bb8c2557']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0xfe4353efcc662583782b1f15483f1861d5591e4337491a5e737c83e114d258ac', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638659, 'blockTimestamp': '2022-09-29T11:19:11Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xfc5148e383509d2ffdd062822c7f1b3090a10850']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0xdc37b5d63ec72a123a6f98c21c98531a6ab5514902f052a9e571704df74735ee', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638689, 'blockTimestamp': '2022-09-29T11:25:23Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x1da03122ba9d846c4b8dcf13a8c3e2ffd83b1889']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0x83680c907c13b3e9986779eeead6569bf4dce61b84f9130186343ac27f6d3dcd', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15477622, 'blockTimestamp': '2022-09-05T11:32:43Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xb5026494ea932cbd161c46392ffd7a2855ca05af']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0x724bca392826940fc9499dc2411420d11000ad4f69dbb0fc8c8882afd6fb9b88', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638717, 'blockTimestamp': '2022-09-29T11:30:59Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x60cc85f456f1e785b5daf24c9c3426239f12d05f']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0x2d66bf91b0913abe611975fb6097e58069d4d5f754702c9e9e10dcf35832d6ff', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638769, 'blockTimestamp': '2022-09-29T11:41:23Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xbde6aa3c89db77002df747776d2830cf9090d94d']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0x7a5c850356069843564091bc6b6651f2a66e20cbc5b76e648dea89db150579b1', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638676, 'blockTimestamp': '2022-09-29T11:22:47Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xd14191330e1b146bc00203bd7c3da74f5b67b7e3']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0xe1cccb1be782da72b1e0535a53701a0bc1a7e8c403e92304676d88902bda9784', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638793, 'blockTimestamp': '2022-09-29T11:46:11Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xee4b7df63877f6131d0e8b5a09400358e8600ded']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0x7d5406b8499c7a483e833ef6b2f47a59b9b51f53db48a23513964697cd52b504', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '3840583796270474798932415828903', 'blockNumber': 14244160, 'blockTimestamp': '2022-02-20T17:10:00Z', 'from': {'addresses': ['0xad3082a90022ff65aab93c9852a44a830c1b36ce']}, 'to': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'tokenAddress': '0xa098c8749c3765d677216fe1ebe7dbf9f1acc232', 'transactionHash': '0x9eeb047406250a562dba3edf7319746effd6c8d571aa59c32cb95743e021f42c', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15482140, 'blockTimestamp': '2022-09-06T05:10:29Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x1749e514cc8a8a7f5f0c5c08d823416b84b6f5a4']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0x1f2f0651539c3577481286aa0811559471afd5be05f57e265a8da466ef79e8bb', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15477615, 'blockTimestamp': '2022-09-05T11:31:10Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x9096e90905a309c9cd2a7c43c4a77b172e18f06f']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0x408d67f28ae5a134dc15a1feae435c27c01fc96dec5d136ca144bcd9f3dda848', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638787, 'blockTimestamp': '2022-09-29T11:44:59Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xe037cdde28ec42da5be8a5e90617e287a6ebb149']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0xc6256712cac79db773e2cf8883dd0b7680d99f5ceb524949feb9d2afecdd51a8', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638693, 'blockTimestamp': '2022-09-29T11:26:11Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x28a23f0679d435fa70d41a5a9f782f04134cd0d4']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0xfd88e5e8e9a4b67fc6e0e38c649076d2ef2c100d3ddb5a4258a8123c4cb35759', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638694, 'blockTimestamp': '2022-09-29T11:26:23Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x2f5170deea823099d75f200ae0524b30c3701881']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0xefffb67aab2fb4d0298d715e60cb5a9b3afd96ef1dd7045d4114daf6fa84971b', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15477602, 'blockTimestamp': '2022-09-05T11:28:25Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xe9c2b9e10a70d78a86275192d203833aee58f651']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0xd974a6ed550e5743fb7406618e40e08b14832cb2c2e43c950888da7d57cbff51', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15477615, 'blockTimestamp': '2022-09-05T11:31:10Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x61d453dd3f38ffb8e72ecc4040090e6d822cd66b']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0x56c7d6febca08e233142c97208d067a22eb4b94f74a3869affd6acd4c7b920a5', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '3846098520965767704597007548366', 'blockNumber': 14367759, 'blockTimestamp': '2022-03-11T20:50:18Z', 'from': {'addresses': ['0x666aec4b62b4180434e546c533aa9537864e5682']}, 'to': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'tokenAddress': '0x270f9123a1dd3a2ff458b2b8aa4361c1c977ac61', 'transactionHash': '0xfe7bab93e6bd3e6603338ae5e849cf373032ebd9d4c5ccf7e6217c7bcb77caf4', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15477602, 'blockTimestamp': '2022-09-05T11:28:25Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x652273954e0054e90bb6ed79b2c05692913bf411']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0x12d40f47e7f3688feda37d119c9aad1b0d7e6f0cc269bca52be17ab6618c4325', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638707, 'blockTimestamp': '2022-09-29T11:28:59Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x4d30425deefeae11d63f3c49025b75ed280d9f41']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0xb7c59d3a721451eae9b0a43e99456bdafb7b41dea6874b805b3234924413a92b', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15477615, 'blockTimestamp': '2022-09-05T11:31:10Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xba82a67253ff2af9cbc924fd8f7bc61424a4ea33']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0x56c7d6febca08e233142c97208d067a22eb4b94f74a3869affd6acd4c7b920a5', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15477624, 'blockTimestamp': '2022-09-05T11:33:09Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x2a0c1241926c1501be74571b835b1ba6ea4da4aa']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0x3286c0c845a54e74f4f93e72de92390971dff95038a5f5d750b7ee6232badea2', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '3775313907464278781673893551438', 'blockNumber': 14029249, 'blockTimestamp': '2022-01-18T11:32:29Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x527788ae179be743614496680d38b39d87ee1ce8']}, 'tokenAddress': '0x998e70adc540c2b7a53d29ff3447716a32b92562', 'transactionHash': '0x01194bf02547824ac6a20447c776b33f4729177056771c9c2d8d919d75823a95', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15481848, 'blockTimestamp': '2022-09-06T04:04:05Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x921522d9353458f566cc28e26da4b8c8d710e4c5']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0xa39077c935d2b79ea65b7e051dd2b81b0564dbf23fd359720cfeb732e00a062f', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15477615, 'blockTimestamp': '2022-09-05T11:31:10Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xd6cb7b1ac99b0bc7d44d2be622c1589230ddd3f6']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0x56c7d6febca08e233142c97208d067a22eb4b94f74a3869affd6acd4c7b920a5', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '800', 'blockNumber': 15477602, 'blockTimestamp': '2022-09-05T11:28:25Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0x116b6ad7344c72ab4101d9bde33adb6bd9d926cf']}, 'tokenAddress': '0x062032f5a8ffafbde4d513237071f450c270b764', 'transactionHash': '0x690fc2b61fb71beb73015fc55001a7154797633ffa76e7459100e4e71f71e3b1', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}, {'amount': '7', 'blockNumber': 15638648, 'blockTimestamp': '2022-09-29T11:16:59Z', 'from': {'addresses': ['0xab5801a7d398351b8be11c439e05c5b3259aec9b']}, 'to': {'addresses': ['0xdbb3a9a77fff25c37ab4c3c3c97e7848aae5af26']}, 'tokenAddress': '0x54fd62228c6e1234fd5fded28555ca963dcf6d26', 'transactionHash': '0x2fd24188acbd610601ecd8e1e9f304e62ffe369e6fa87ef193bebc99f9c526aa', 'tokenType': 'ERC20', 'blockchain': 'ethereum'}];

import React from 'react';

function TransactionList({ transactions }) {
  return (
    <List>
      {transactions.map((transaction, index) => (
        <List.Item key={index} className="transaction-panel">
          <div>
            <p><strong>Amount:</strong> {transaction.amount}</p>
            <p><strong>Token Type:</strong> {transaction.tokenType}</p>
            <p><strong>Blockchain:</strong> {transaction.blockchain}</p>
            </div>
            <div>            <p><strong>From:</strong> {transaction.from.addresses[0]}</p>
            <p><strong>To:</strong> {transaction.to.addresses[0]}</p>
            <p><strong>Token Address:</strong> {transaction.tokenAddress}</p></div>
          <div className="transaction-details">
            
            <p><strong>Block Number:</strong> {transaction.blockNumber}</p>
            <p><strong>Block Timestamp:</strong> {transaction.blockTimestamp}</p>

            <p><strong>Transaction Hash:</strong> {transaction.transactionHash}</p>

          </div>
          <div>
          <Button className="dispute-button" type="primary">View Transaction Details</Button>
          <p></p>
            <Button className="dispute-button" type="dashed">Dispute Transaction</Button></div>
          
        </List.Item>
      ))}
    </List>
  );
}


const exampleDisputes = [
  {
    user: 'User1',
    successful: true,
    changeInReputation: 1,
    transactionHash: '0x9b83386f626320e73a7370fac9fe99cef894b5aec9c9471daea382c6255d973e',
    transactionAmount: 100,
    transactionCurrency: 'USD',
    date: '2023-09-25',
  },
  {
    user: 'User2',
    successful: false,
    changeInReputation: -1,
    transactionHash: '0x7c6a18f28d8a17ecf4b69d4b4e3e51a6f122b1e3a5ee7c72b6f6c9c6c6c6c6c6',
    transactionAmount: 50,
    transactionCurrency: 'EUR',
    date: '2023-09-24',
  },
  {
    user: 'User3',
    successful: true,
    changeInReputation: 1,
    transactionHash: '0x3d5e2f1c8b7a9b5c4c8b7a9b5c4c8b7a9b5c4c8b7a9b5c4c8b7a9b5c4c8b7a9b5c',
    transactionAmount: 75,
    transactionCurrency: 'GBP',
    date: '2023-09-23',
  },
];

function App() {
  return (
    <div>
      <h1>Dispute List</h1>
      <DisputeList disputes={exampleDisputes} />
    </div>
  );
}




function DisputeList({ disputes }) {
  return (
    <List className="dispute-list">
      {disputes.map((dispute, index) => (
        <List.Item key={index} className={`dispute-panel ${dispute.successful ? 'successful' : 'unsuccessful'}`}>
          <div className="dispute-user">
            <p><strong>Submitted by User:</strong> {dispute.user}</p>
            <p><strong>Successful:</strong> {dispute.successful ? 'Yes' : 'No'}</p>

          </div>
          
          <div className="transaction-details">
            <p><strong>Transaction Hash:</strong> {dispute.transactionHash}</p>
            <p><strong>Transaction Amount:</strong> {dispute.transactionAmount} {dispute.transactionCurrency}</p>
            <p><strong>Date:</strong> {dispute.date}</p>
          </div>
          <div className="dispute-result">
            <p><strong>Change in Reputation:</strong> {dispute.changeInReputation}</p>
          </div>
          <Button type="primary">View Dispute Details</Button>
        </List.Item>
      ))}
    </List>
  );
}




const Specifics = ({ title, points }) => {
  return (
    <View style={styles.container}>
      

      {title == "Transactions" &&
      <View>
        <Text style={styles.title}>{title}:</Text>
      <TransactionList transactions={transactions} />
      </View>}

      {title == "Reputation" && 
      <View style={styles.pointsContainer}>
        <Text style={styles.title}>{title}: 98</Text>
        <p></p>
        <Button type="primary">Import Reputation with UMA x The Graph</Button>


        <p></p>
        {points.map((item, index) => (
          <View style={styles.pointWrapper} key={item + index}>
            <View style={styles.pointDot} />
            <Text style={styles.pointText}>{item}</Text>
          </View>
        ))}
      </View>}

      {title == "Disputes" && 
      <View style={styles.pointsContainer}>
        <Text style={styles.title}>{title}:</Text>
        <DisputeList disputes={exampleDisputes} />

      </View>}

      
    </View>
  );
};

export default Specifics;
