// import React from 'react'
// import { useNavigate } from 'react-router-dom';

// const RevokeTransaction: React.FC = () => {
//   const navigate = useNavigate();

//   const navigateToHome = () => {
//     navigate('/');
//   };
//   return (
//       <>
//         <div className="w-[80%] mx-auto border border-b-red my-[30px] h-[402px] rounded-[10px] p-[15px] flex flex-col items-center justify-center">
//             <div className='flex items-center justify-between gap-[200px]'>
//               <i onClick={navigateToHome} className="bi bi-arrow-left-circle arrows"></i>
//               <h1 className='text-4xl font-bold'>Revoke A Transaction</h1>
//               <i className="bi bi-arrow-right-circle arrows invisible"></i>
//             </div>

//             <div className="flex items-center justify-between gap-[130px] my-[40px] px-[50px] h-[260px] w-[95%] rounded-lg border">
            
//             </div>
//         </div>
//       </>
//   )
// }

// export default RevokeTransaction


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { prepareContractCall } from 'thirdweb';
import { client, MULTI_SIG_CONTRACT } from '../client';
import { useSendTransaction } from 'thirdweb/react';

const RevokeTransaction: React.FC = () => {
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
        method: 'revokeConfirmation',
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
          navigateToConfirm(); // or any other desired navigation
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

  return (
    <div className="w-[80%] mx-auto border border-b-red my-[30px] h-[402px] rounded-[10px] p-[15px] flex flex-col items-center justify-center">
      <div className='flex items-center justify-between gap-[200px]'>
        <i onClick={navigateToConfirm} className="bi bi-arrow-left-circle arrows"></i>
        <h1 className='text-4xl font-bold'>Revoke A Transaction</h1>
        <i onClick={navigateToRevoke} className="bi bi-arrow-right-circle arrows"></i>
      </div>

      <div className="flex flex-col items-center justify-center gap-[20px] my-[40px] px-[50px] h-[260px] w-[95%] rounded-lg border">
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
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
};

export default RevokeTransaction;
