

// import React, { useState } from 'react';
// import { useReadContract } from 'thirdweb/react';
// import { MULTI_SIG_CONTRACT } from '../client'; 

// const GetTransaction: React.FC = () => {
//     const contract = MULTI_SIG_CONTRACT; 
//     const [txIndex, setTxIndex] = useState<bigint | null>(null);

//     const { data: transactionData, isLoading, error } = useReadContract({
//         contract,
//       method: 'getTransaction',
//       params: [txIndex ?? 0n], // Use 0n as the default value if txIndex is null
//     });
  
//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//       const value = BigInt(parseInt(e.target.value, 10));
//       setTxIndex(value >= 0 ? value : null);
//     };

//   return (
//     <div className="w-[80%] mx-auto border border-b-red my-[30px] h-auto rounded-[10px] p-[15px] flex flex-col items-center justify-center">
//       <h1 className="text-4xl font-bold mb-[20px]">Get Transaction</h1>
//       <input
//         type="number"
//         placeholder="Transaction Index"
//         onChange={handleInputChange}
//         className="px-[10px] py-[5px] border rounded-lg w-full mb-[20px]"
//       />
//       <div className="flex flex-col items-center justify-center gap-[20px] px-[50px] h-auto w-[95%] rounded-lg border">
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p style={{ color: 'red' }}>Error: {error.message}</p>
//         ) : transactionData ? (
//           <ul className="list-disc">
//             <li><strong>To:</strong> {transactionData?.to}</li> // Property 'to' does not exist on type 'readonly [string, bigint, `0x${string}`, boolean, bigint]'.ts(2339)

//             <li><strong>Value:</strong> {transactionData?.values.toString()}</li>
//             <li><strong>Data:</strong> {transactionData?.data}</li> // Property 'data' does not exist on type 'readonly [string, bigint, `0x${string}`, boolean, bigint]'.ts(2339)
//             <li><strong>Executed:</strong> {transactionData?.executed ? 'Yes' : 'No'}</li> // Property 'executed' does not exist on type 'readonly [string, bigint, `0x${string}`, boolean, bigint]'.ts(2339)
//             <li><strong>Number of Confirmations:</strong> {transactionData?.numConfirmations.toString()}</li> // Property 'numConfirmations' does not exist on type 'readonly [string, bigint, `0x${string}`, boolean, bigint]'.ts(2339)

//           </ul>
//         ) : (
//           <p>No transaction data available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default GetTransaction;


import React, { useState } from 'react';
import { useReadContract } from 'thirdweb/react';
import { MULTI_SIG_CONTRACT } from '../client';

const GetTransaction: React.FC = () => {
  const contract = MULTI_SIG_CONTRACT;
  const [txIndex, setTxIndex] = useState<bigint | null>(null);

  const { data: transactionData, isLoading, error } = useReadContract({
    contract,
    method: 'getTransaction',
    params: [txIndex ?? 0n], // Use 0n as the default value if txIndex is null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = BigInt(parseInt(e.target.value, 10));
    setTxIndex(value >= 0 ? value : null);
  };

  return (
    <div className="w-[80%] mx-auto border border-b-red my-[30px] h-auto rounded-[10px] p-[15px] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-[20px]">Get Transaction</h1>
      <input
        type="number"
        placeholder="Transaction Index"
        onChange={handleInputChange}
        className="px-[10px] py-[5px] border rounded-lg w-[95%] mb-[20px]"
      />
      <div className="flex flex-col items-center justify-center gap-[20px] px-[50px] h-auto w-[95%] rounded-lg border">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error.message}</p>
        ) : transactionData ? (
          <ul className="list-disc">
            <li><strong>To:</strong> {transactionData[0]}</li>
            <li><strong>Value:</strong> {transactionData[1].toString()}</li>
            <li><strong>Data:</strong> {transactionData[2]}</li>
            <li><strong>Executed:</strong> {transactionData[3] ? 'Yes' : 'No'}</li>
            <li><strong>Number of Confirmations:</strong> {transactionData[4].toString()}</li>
          </ul>
        ) : (
          <p>No transaction data available.</p>
        )}
      </div>
    </div>
  );
};

export default GetTransaction;
