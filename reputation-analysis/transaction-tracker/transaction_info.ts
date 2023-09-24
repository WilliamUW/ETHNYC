import Web3 from 'web3'
import { Web3Adapter } from '@safe-global/protocol-kit'
import SafeApiKit from '@safe-global/api-kit'

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
const web3 = new Web3(provider)

const safeOwner = '0xa5F623b3f1E0EEe821eED3D0A0e9C98e3f784284'


const ethAdapter = new Web3Adapter({
  web3,
  signerAddress: safeOwner
})

const readOnlyEthAdapter = new Web3Adapter({ web3 })

const safeService = new SafeApiKit({
    txServiceUrl: 'https://safe-transaction-mainnet.safe.global',
    readOnlyEthAdapter
  })


function getTx(): SafeMultisigTransactionResponse {
  const tx: SafeMultisigTransactionResponse = 
  await safeService.getTransaction(safeTxHash)
  return tx
}

function getGas(): SafeMultisigTransactionEstimateResponse {
  const estimateTx: SafeMultisigTransactionEstimateResponse =
    await safeService.estimateSafeTransaction(safeOwner, safeTransaction)
  return estimateTx
}

// confirm transactions
function getConfirmations(): SafeMultisigConfirmationListResponse {
  const confirmations: SafeMultisigConfirmationListResponse =
  await safeService.getTransactionConfirmations(safeTxHash)
  return confirmations
}
async function main() {
  // get incoming transactions
  const incomingTxs = await safeService.getIncomingTransactions(safeOwner);

  // get multisig transactions
  const multisigTxs = await safeService.getMultisigTransactions(safeOwner);

  // get pending transaction
  const pendingTxs = await safeService.getPendingTransactions(safeOwner);

}
