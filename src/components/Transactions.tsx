import React, { useState } from 'react';
import { readContract } from 'thirdweb';
import { MULTI_SIG_CONTRACT } from '../client';

const GetTransactionDetails: React.FC = () => {
  const contract = MULTI_SIG_CONTRACT;

  const [txIndex, setTxIndex] = useState<bigint | null>(null);
  const [transactionData, setTransactionData] = useState<{
    to: string;
    value: bigint;
    data: string;
    executed: boolean;
    numConfirmations: bigint;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = BigInt(parseInt(e.target.value, 10));
    setTxIndex(value >= 0 ? value : null);
  };

  const fetchTransactionDetails = async () => {
    if (txIndex === null) {
      setError('Please enter a valid transaction index');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await readContract({
        contract,
        method: 'transactions',
        params: [txIndex],
      });

      setTransactionData({
        to: data[0],
        value: data[1],
        data: data[2],
        executed: data[3],
        numConfirmations: data[4],
      });
    } catch (err) {
      setError('Failed to fetch transaction details');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[80%] mx-auto border border-b-red my-[30px] h-auto rounded-[10px] p-[15px] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-[20px]">Get Transaction Details</h1>
      <input
        type="number"
        placeholder="Transaction Index"
        onChange={handleInputChange}
        className="px-[10px] py-[5px] border rounded-lg w-full mb-[20px]"
      />
      <button
        onClick={fetchTransactionDetails}
        className="px-[20px] py-[10px] border border-white cursor-pointer rounded-lg bg-blue-500"
        disabled={isLoading}
      >
        Fetch Transaction Details
      </button>
      <div className="flex flex-col items-center justify-center gap-[20px] px-[50px] h-auto w-[95%] rounded-lg border mt-[20px]">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error}</p>
        ) : transactionData ? (
          <ul className="list-disc">
            <li><strong>To:</strong> {transactionData.to}</li>
            <li><strong>Value:</strong> {transactionData.value.toString()}</li>
            <li><strong>Data:</strong> {transactionData.data}</li>
            <li><strong>Executed:</strong> {transactionData.executed ? 'Yes' : 'No'}</li>
            <li><strong>Number of Confirmations:</strong> {transactionData.numConfirmations.toString()}</li>
          </ul>
        ) : (
          <p>No transaction data available.</p>
        )}
      </div>
    </div>
  );
};

export default GetTransactionDetails;
