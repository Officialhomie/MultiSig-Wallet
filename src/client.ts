import { createThirdwebClient, defineChain, getContract } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = import.meta.env.VITE_TEMPLATE_CLIENT_ID;

// export the client id
export const client = createThirdwebClient({
  clientId: clientId,
});

// export the chain 
export const chain = defineChain(11155111);

// get the contract address 
const contractAddress = "0xDf9736f21a3D0CAadC9D3d3B7C8b03027744E3F3";

// get the contract Abi as a constant
const contractABI = [
  {
    "type": "constructor",
    "name": "",
    "inputs": [
      {
        "type": "address[]",
        "name": "_owners",
        "internalType": "address[]"
      },
      {
        "type": "uint256",
        "name": "_numConfirmationsRequired",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "ConfirmTransaction",
    "inputs": [
      {
        "type": "address",
        "name": "owner",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "txIndex",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "Deposit",
    "inputs": [
      {
        "type": "address",
        "name": "sender",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "amount",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "uint256",
        "name": "balance",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "ExecuteTransaction",
    "inputs": [
      {
        "type": "address",
        "name": "owner",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "txIndex",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "RevokeConfirmation",
    "inputs": [
      {
        "type": "address",
        "name": "owner",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "txIndex",
        "indexed": true,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "SubmitTransaction",
    "inputs": [
      {
        "type": "address",
        "name": "owner",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "txIndex",
        "indexed": true,
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "to",
        "indexed": true,
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "value",
        "indexed": false,
        "internalType": "uint256"
      },
      {
        "type": "bytes",
        "name": "data",
        "indexed": false,
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "function",
    "name": "confirmTransaction",
    "inputs": [
      {
        "type": "uint256",
        "name": "_txIndex",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "executeTransaction",
    "inputs": [
      {
        "type": "uint256",
        "name": "_txIndex",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getOwners",
    "inputs": [],
    "outputs": [
      {
        "type": "address[]",
        "name": "",
        "internalType": "address[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTransaction",
    "inputs": [
      {
        "type": "uint256",
        "name": "_txIndex",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "address",
        "name": "to",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "value",
        "internalType": "uint256"
      },
      {
        "type": "bytes",
        "name": "data",
        "internalType": "bytes"
      },
      {
        "type": "bool",
        "name": "executed",
        "internalType": "bool"
      },
      {
        "type": "uint256",
        "name": "numConfirmations",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getTransactionCount",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isConfirmed",
    "inputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      },
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "bool",
        "name": "",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isOwner",
    "inputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "bool",
        "name": "",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "numConfirmationsRequired",
    "inputs": [],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owners",
    "inputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "address",
        "name": "",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "revokeConfirmation",
    "inputs": [
      {
        "type": "uint256",
        "name": "_txIndex",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "submitTransaction",
    "inputs": [
      {
        "type": "address",
        "name": "_to",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "_value",
        "internalType": "uint256"
      },
      {
        "type": "bytes",
        "name": "_data",
        "internalType": "bytes"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "transactions",
    "inputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "address",
        "name": "to",
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "value",
        "internalType": "uint256"
      },
      {
        "type": "bytes",
        "name": "data",
        "internalType": "bytes"
      },
      {
        "type": "bool",
        "name": "executed",
        "internalType": "bool"
      },
      {
        "type": "uint256",
        "name": "numConfirmations",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "receive",
    "name": "",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  }
] as const;

// Get the contract data and export them
export const MULTI_SIG_CONTRACT = getContract({
  client, 
  chain: chain,
  address: contractAddress,
  // ABI is optional 
  abi: contractABI,
});

