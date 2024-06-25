import React from 'react';
import { useReadContract } from 'thirdweb/react';
import { MULTI_SIG_CONTRACT } from '../client';

const GetTransactionCount: React.FC = () => {
  const contract = MULTI_SIG_CONTRACT;
  
  const { data: transactionCount, isLoading, error } = useReadContract({
    contract,
    method: 'getTransactionCount',
    params: []
  });

  return (
    <div className="w-[80%] mx-auto border border-b-red my-[30px] h-auto rounded-[10px] p-[15px] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-[20px]">Transaction Count</h1>
      <div className="flex flex-col items-center justify-center gap-[20px] px-[50px] h-auto w-[95%] rounded-lg border">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error.message}</p>
        ) : transactionCount !== undefined ? (
          <p>Number of Transactions: {transactionCount.toString()}</p>
        ) : (
          <p>No transaction count available.</p>
        )}
      </div>
    </div>
  );
};

export default GetTransactionCount;
