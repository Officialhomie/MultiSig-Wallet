// import React, { useState, useEffect } from 'react';
// import { useReadContract } from 'thirdweb/react';
// import { MULTI_SIG_CONTRACT } from '../client';

// const GetOwners: React.FC = () => {
//   const contract = MULTI_SIG_CONTRACT;
  
//   const { data, isLoading, error } = useReadContract({
//     contract,
//     method: 'getOwners',
//     params: []
//   });




//   return (
//     <div className="w-[90%] mx-auto border border-b-red my-[30px] h-[402px] rounded-[10px] p-[15px] flex flex-col items-center justify-center">
//       <h1 className="text-4xl font-bold">Wallet Owners</h1>


//       {isLoading ? (
//         <div>Loading...</div>
//       ) : error ? (
//         <div>Error: {error.message}</div>
//       ) : (
//         <div className="flex flex-col items-center justify-center gap-[20px] my-[40px] px-[50px] h-[260px] w-[95%] rounded-lg border">
//           <ul className="list-disc">
//             {data?.map((owner: string, index: number) => (
//               <li key={index}>{owner}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GetOwners;


import React, { useState, useEffect } from 'react';
import { useReadContract } from 'thirdweb/react';
import { MULTI_SIG_CONTRACT } from '../client';

const GetOwners: React.FC = () => {
  const contract = MULTI_SIG_CONTRACT;

  const { data, isLoading, error } = useReadContract({
    contract,
    method: 'getOwners',
    params: [],
  });

  const formatAddress = (address: string) => {
    return `${address.substring(0, 5)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="w-[90%] mx-auto border border-b-red my-[30px] h-[402px] rounded-[10px] p-[15px] flex flex-col items-center justify-center">
      <h1 className="text-3xl lg:text-4xl font-bold mb-[20px]">Wallet Owners</h1>

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-[20px] h-[260px] w-[95%] rounded-lg border">
          <ul className="list-disc">
            {data?.map((owner: string, index: number) => (
              <li key={index} className="text-xs sm:text-base">
                <span className="block sm:hidden text-2xl">{formatAddress(owner)}</span>
                <span className="hidden sm:block text-xl">{owner}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GetOwners;

