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

// get transaction
// const tx: SafeMultisigTransactionResponse = 
//   await safeService.getTransaction(safeTxHash)

  // estimate gas
// const estimateTx: SafeMultisigTransactionEstimateResponse =
//   await safeService.estimateSafeTransaction(safeOwner, safeTransaction)

// confirm transactions
// const confirmations: SafeMultisigConfirmationListResponse =
//   await safeService.getTransactionConfirmations(safeTxHash)

// get incoming transactions
const incomingTxs: TransferListResponse = 
 await safeService.getIncomingTransactions(safeOwner)

// get multisig transactions
const multisigTxs: SafeMultisigTransactionListResponse = 
 await safeService.getMultisigTransactions(
  safeOwner
  )

// get pending transaction
const pendingTxs: SafeMultisigTransactionListResponse = 
 await safeService.getPendingTransactions(
  safeOwner
  )