// import React from 'react'
// import { useNavigate } from 'react-router-dom';

// const ExecuteTransaction: React.FC = () => {
//     const navigate = useNavigate();

//     const navigateToConfirm = () => {
//       navigate('/ConfirmTransaction');
//     };

//   return (
    
//     <>
//         <div className="w-[80%] mx-auto border border-b-red my-[30px] h-[402px] rounded-[10px] p-[15px] flex flex-col items-center justify-center">
//             <div className='flex items-center justify-between gap-[200px]'>
                
//                 <i onClick={navigateToConfirm} className="bi bi-arrow-left-circle arrows"></i>
//                 <h1 className='text-4xl font-bold'>Execute a Transaction</h1>
//                 <i onClick={navigateToConfirm} className="bi bi-arrow-right-circle arrows invisible"></i>
//             </div>

//             <div className="flex items-center justify-between gap-[130px] my-[40px] px-[50px] h-[260px] w-[95%] rounded-lg  border">
            
//             </div>
//         </div>
//     </>
//   )
// }

// export default ExecuteTransaction;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { prepareContractCall } from 'thirdweb';
import { client, MULTI_SIG_CONTRACT } from '../client';
import { useSendTransaction } from 'thirdweb/react';

const ExecuteTransaction: React.FC = () => {
  const contract = MULTI_SIG_CONTRACT;
  const navigate = useNavigate();

  const [txIndex, setTxIndex] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // Navigation functions
  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToSubmit = () => {
    navigate('/SubmitTransaction');
  };

  const navigateToConfirm = () => {
    navigate('/ConfirmTransaction');
  };

  const navigateToRevoke = () => {
    navigate('/RevokeTransaction');
  };

  const { mutate: sendTransaction } = useSendTransaction();

  const handleExecuteTransaction = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const tx = await prepareContractCall({
        contract,
        method: 'executeTransaction',
        params: [BigInt(parseInt(txIndex))],
      });

      const transaction = {
        to: contract.address as `0x${string}`,
        data: tx.data as `0x${string}`,
        value: 0n,
        chain: MULTI_SIG_CONTRACT.chain,
        client,
      };

      sendTransaction(transaction, {
        onSuccess: () => {
          console.log('Transaction executed successfully');
          navigateToHome(); // or any other desired navigation
        },
        onError: (error) => {
          console.error('Transaction error:', error);
          setError(error);
        },
      });
    } catch (err) {
      console.error('Transaction preparation error:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 5000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="w-[90%] mx-auto border border-b-red my-[30px] h-auto rounded-[10px] p-[15px] flex flex-col items-center justify-center">
      <div className='flex items-center justify-between gap-[20px] md:gap-[200px]'>
        <i onClick={navigateToConfirm} className="bi bi-arrow-left-circle arrows"></i>
        <h1 className='text-[18px] sm:text-4xl font-bold'>Execute A Transaction</h1>
        <i onClick={navigateToRevoke} className="bi bi-arrow-right-circle arrows invisible"></i>
      </div>

      <div className="flex flex-col items-center justify-center gap-[20px] my-[30px] px-[15px] md:px-[50px] py-[15px] h-[200px] w-[95%] rounded-lg border">
        <input
          type="number"
          placeholder="Transaction Index"
          value={txIndex}
          onChange={(e) => setTxIndex(e.target.value)}
          className="px-[10px] py-[5px] border rounded-lg w-full"
        />
        <button
          onClick={handleExecuteTransaction}
          className="px-[20px] py-[10px] border border-white cursor-pointer rounded-lg bg-blue-500"
          disabled={isLoading}
        >
          {isLoading ? 'Executing...' : 'Execute Transaction'}
        </button>
      </div>
      {error && 
        <div className='w-[80%] mx-auto my-[30px] py-[15px] text-center bg-white text-black border rounded-xl'>
          Error: {error.message}
        </div>
      }
    </div>
  );
};

export default ExecuteTransaction;
