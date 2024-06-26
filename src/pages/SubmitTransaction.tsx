// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { prepareContractCall } from 'thirdweb';
// import { client, MULTI_SIG_CONTRACT } from '../client';
// import { createWallet } from 'thirdweb/wallets';
// import { useSendTransaction } from 'thirdweb/react';

// const SubmitTransaction: React.FC = () => {
//   const contract = MULTI_SIG_CONTRACT;
//   const navigate = useNavigate();

//   const [walletAddress, setWalletAddress] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [error, setError] = useState<Error | null>(null);
//   const [to, setTo] = useState<`0x${string}` | ''>('');
//   const [value, setValue] = useState<string>('');
//   const [data, setData] = useState<string>('');
//   const [description, setDescription] = useState<string>('');
//   const [isConnecting, setIsConnecting] = useState<boolean>(false);

//   const navigateToHome = () => {
//     navigate('/');
//   };
  
//   const navigateToConfirm = () => {
//     navigate('/ConfirmTransaction');
//   };
  
//   useEffect(() => {
//     const connectWallet = async () => {
//       if (isConnecting) return;
//       setIsConnecting(true);

//       try {
//         const wallet = createWallet('io.metamask');
//         const account = await wallet.connect({ client });
//         setWalletAddress(account.address);
//       } catch (err) {
//         setError(err as Error);
//       } finally {
//         setIsLoading(false);
//         setIsConnecting(false);
//       }
//     };

//     connectWallet();
//   }, [isConnecting]);

//   const { mutate: sendTransaction } = useSendTransaction();

//   const handleSubmitTransaction = async () => {
//     try {
//       const formattedData = `0x${data}`;

//       if (!formattedData.startsWith('0x')) {
//         throw new Error('Data must be a hex string starting with 0x');
//       }

//       if (!to || !value) {
//         throw new Error('Recipient Address and Value are required');
//       }

//       const tx = await prepareContractCall({
//         contract,
//         method: 'submitTransaction',
//         params: [to, BigInt(parseInt(value)), formattedData as `0x${string}`, description],
//       });

//       const transaction = {
//         to: contract.address as `0x${string}`,
//         data: tx.data as `0x${string}`,
//         value: BigInt(parseInt(value)),
//         chain: MULTI_SIG_CONTRACT.chain,
//         client,
//       };

//       sendTransaction(transaction, {
//         onSuccess: () => {
//           console.log('Transaction sent successfully');
//           navigateToConfirm();
//         },
//         onError: (error) => {
//           console.error('Transaction error:', error);
//           setError(error);
//         },
//       });
//     } catch (err) {
//       console.error('Transaction preparation error:', err);
//       setError(err as Error);
//     }
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div className='w-[80%] mx-auto my-[30px] py-[15px] text-center bg-white text-black border rounded-xl'>
//   Error: {error.message}</div>;

//   return (
//     <div className="w-[90%] mx-auto border border-b-red my-[30px] h-[472px] rounded-[10px] p-[25px] flex flex-col items-center justify-center">
//       <div className='flex items-center justify-between gap-[20px] md:gap-[200px] mb-[20px]' >
//         <i onClick={navigateToHome} className="bi bi-arrow-left-circle arrows"></i>
//         <h1 className='text-[16px] sm:text-4xl font-bold '>Submit A Transaction</h1>
//         <i onClick={navigateToConfirm} className="bi bi-arrow-right-circle arrows"></i>
//       </div>

//       <div className="flex flex-col items-center justify-center gap-[20px] my-[10px] px-[15px] md:px-[50px] py-[15px] py-[30px] h-[350px] w-[97%] rounded-lg border">
//         <input
//           type="text"
//           placeholder="To Address"
//           value={to}
//           onChange={(e) => {
//             const inputValue = e.target.value;
//             if (inputValue.startsWith('0x') && inputValue.length === 42) {
//               setTo(inputValue as `0x${string}`);
//             } else {
//               setTo(''); 
//             }
//           }}
//           className="px-[10px] py-[5px] border rounded-lg w-full"
//         />
//         <input
//           type="number"
//           placeholder="Value"
//           value={value}
//           onChange={(e) => setValue(e.target.value)}
//           className="px-[10px] py-[5px] border rounded-lg w-full"
//         />
//         <input
//           type="text"
//           placeholder="Data"
//           value={data}
//           onChange={(e) => setData(e.target.value)}
//           className="px-[10px] py-[5px] border rounded-lg w-full"
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="px-[10px] py-[5px] border rounded-lg w-full"
//         />
//         <button
//           onClick={handleSubmitTransaction}
//           className="px-[20px] py-[10px] border border-white cursor-pointer rounded-lg bg-blue-500"
//         >
//           Submit Transaction
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SubmitTransaction;




import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { prepareContractCall } from 'thirdweb';
import { client, MULTI_SIG_CONTRACT } from '../client';
import { createWallet } from 'thirdweb/wallets';
import { useSendTransaction } from 'thirdweb/react';

const SubmitTransaction: React.FC = () => {
  const contract = MULTI_SIG_CONTRACT;
  const navigate = useNavigate();

  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [to, setTo] = useState<`0x${string}` | ''>('');
  const [value, setValue] = useState<string>('');
  const [data, setData] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToConfirm = () => {
    navigate('/ConfirmTransaction');
  };

  useEffect(() => {
    const connectWallet = async () => {
      if (isConnecting) return;
      setIsConnecting(true);

      try {
        const wallet = createWallet('io.metamask');
        const account = await wallet.connect({ client });
        setWalletAddress(account.address);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
        setIsConnecting(false);
      }
    };

    connectWallet();
  }, [isConnecting]);

  const { mutate: sendTransaction } = useSendTransaction();

  const handleSubmitTransaction = async () => {
    try {
      const formattedData = `0x${data}`;

      if (!formattedData.startsWith('0x')) {
        throw new Error('Data must be a hex string starting with 0x');
      }

      if (!to || !value) {
        throw new Error('Recipient Address and Value are required');
      }

      const tx = await prepareContractCall({
        contract,
        method: 'submitTransaction',
        params: [to, BigInt(parseInt(value)), formattedData as `0x${string}`, description],
      });

      const transaction = {
        to: contract.address as `0x${string}`,
        data: tx.data as `0x${string}`,
        value: BigInt(parseInt(value)),
        chain: MULTI_SIG_CONTRACT.chain,
        client,
      };

      sendTransaction(transaction, {
        onSuccess: () => {
          console.log('Transaction sent successfully');
          navigateToConfirm();
        },
        onError: (error) => {
          console.error('Transaction error:', error);
          setError(error);
        },
      });
    } catch (err) {
      console.error('Transaction preparation error:', err);
      setError(err as Error);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="w-[90%] mx-auto border border-b-red my-[30px] h-[472px] rounded-[10px] p-[25px] flex flex-col items-center justify-center">
      <div className='flex items-center justify-between gap-[20px] md:gap-[200px] mb-[20px]' >
        <i onClick={navigateToHome} className="bi bi-arrow-left-circle arrows"></i>
        <h1 className='text-[16px] sm:text-4xl font-bold '>Submit A Transaction</h1>
        <i onClick={navigateToConfirm} className="bi bi-arrow-right-circle arrows"></i>
      </div>

      {error && (
        <div className='w-[80%] mx-auto my-[30px] py-[15px] text-center bg-white text-black border rounded-xl'>
          Error: {error.message}
        </div>
      )}

      <div className="flex flex-col items-center justify-center gap-[20px] my-[10px] px-[15px] md:px-[50px] py-[15px] py-[30px] h-[350px] w-[97%] rounded-lg border">
        <input
          type="text"
          placeholder="To Address"
          value={to}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (inputValue.startsWith('0x') && inputValue.length === 42) {
              setTo(inputValue as `0x${string}`);
            } else {
              setTo(''); 
            }
          }}
          className="px-[10px] py-[5px] border rounded-lg w-full"
        />
        <input
          type="number"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="px-[10px] py-[5px] border rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="Data"
          value={data}
          onChange={(e) => setData(e.target.value)}
          className="px-[10px] py-[5px] border rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="px-[10px] py-[5px] border rounded-lg w-full"
        />
        <button
          onClick={handleSubmitTransaction}
          className="px-[20px] py-[10px] border border-white cursor-pointer rounded-lg bg-blue-500"
        >
          Submit Transaction
        </button>
      </div>
    </div>
  );
};

export default SubmitTransaction;
