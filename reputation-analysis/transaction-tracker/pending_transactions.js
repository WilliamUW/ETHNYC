"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var web3_1 = require("web3");
var protocol_kit_1 = require("@safe-global/protocol-kit");
var provider = new web3_1.default.providers.HttpProvider('http://localhost:8545');
var web3 = new web3_1.default(provider);
var safeOwner = '0x<address>';
var ethAdapter = new protocol_kit_1.Web3Adapter({
    web3: web3,
    signerAddress: safeOwner
});
var readOnlyEthAdapter = new protocol_kit_1.Web3Adapter({ web3: web3 });
