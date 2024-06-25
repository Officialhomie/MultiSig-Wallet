// import React, { useState } from 'react';
// import { useReadContract } from 'thirdweb/react';
// import { MULTI_SIG_CONTRACT } from '../client';

// const IsTransactionConfirmed: React.FC = () => {
//   const contract = MULTI_SIG_CONTRACT;

//   const [txIndex, setTxIndex] = useState<bigint | null>(null);
//   const [address, setAddress] = useState<string>('');

//   const { data: isConfirmed, isLoading, error } = useReadContract({
//     contract,
//     method: 'isConfirmed',
//     params: [txIndex ?? 0n, address],
//   });

//   const handleTxIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = BigInt(parseInt(e.target.value, 10));
//     setTxIndex(value >= 0 ? value : null);
//   };

//   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setAddress(e.target.value);
//   };

//   return (
//     <div className="w-[80%] mx-auto border border-b-red my-[30px] h-auto rounded-[10px] p-[15px] flex flex-col items-center justify-center">
//       <h1 className="text-4xl font-bold mb-[20px]">Check Transaction Confirmation</h1>
//       <input
//         type="number"
//         placeholder="Transaction Index"
//         onChange={handleTxIndexChange}
//         className="px-[10px] py-[5px] border rounded-lg w-[95%] mb-[20px]"
//       />
//       <input
//         type="text"
//         placeholder="Address"
//         onChange={handleAddressChange}
//         className="px-[10px] py-[5px] border rounded-lg w-[95%] mb-[20px]"
//       />
//       <div className="flex flex-col items-center justify-center gap-[20px] px-[50px] h-auto w-[95%] rounded-lg border">
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : error ? (
//           <p style={{ color: 'red' }}>Error: {error.message}</p>
//         ) : isConfirmed !== undefined ? (
//           <p>Transaction Confirmed: {isConfirmed ? 'Yes' : 'No'}</p>
//         ) : (
//           <p>No confirmation data available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default IsTransactionConfirmed;


import React, { useState } from 'react';
import { useReadContract } from 'thirdweb/react';
import { MULTI_SIG_CONTRACT } from '../client';

const IsTransactionConfirmed: React.FC = () => {
  const contract = MULTI_SIG_CONTRACT;

  const [txIndex, setTxIndex] = useState<bigint | null>(null);
  const [address, setAddress] = useState<`0x${string}` | null>(null);

  const { data: isConfirmed, isLoading, error } = useReadContract({
    contract,
    method: 'isConfirmed',
    params: [txIndex ?? 0n, address ?? '0x0000000000000000000000000000000000000000'],
  });

  const handleTxIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = BigInt(parseInt(e.target.value, 10));
    setTxIndex(value >= 0 ? value : null);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.startsWith('0x') && inputValue.length === 42) {
      setAddress(inputValue as `0x${string}`);
    } else {
      setAddress(null); // Reset if not a valid address
    }
  };

  return (
    <div className="w-[80%] mx-auto border border-b-red my-[30px] h-auto rounded-[10px] p-[15px] flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-[20px]">Check Transaction Confirmation</h1>
      <input
        type="number"
        placeholder="Transaction Index"
        onChange={handleTxIndexChange}
        className="px-[10px] py-[5px] border rounded-lg w-[95%] mb-[20px]"
      />
      <input
        type="text"
        placeholder="Address"
        onChange={handleAddressChange}
        className="px-[10px] py-[5px] border rounded-lg w-[95%] mb-[20px]"
      />
      <div className="flex flex-col items-center justify-center gap-[20px] px-[50px] h-auto w-[95%] rounded-lg border">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>Error: {error.message}</p>
        ) : isConfirmed !== undefined ? (
          <p>Transaction Confirmed: {isConfirmed ? 'Yes' : 'No'}</p>
        ) : (
          <p>No confirmation data available.</p>
        )}
      </div>
    </div>
  );
};

export default IsTransactionConfirmed;


