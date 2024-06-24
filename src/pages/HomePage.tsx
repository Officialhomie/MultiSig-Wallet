import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  // State to hold the text content
  const [leftText, setLeftText] = useState<React.ReactNode>(null);
  const [rightText, setRightText] = useState<React.ReactNode>(null);
  const [text3, setText3] = useState<React.ReactNode>(null);
  const [text4, setText4] = useState<React.ReactNode>(null);

  // Function to handle button click
  const handleButtonClick1 = () => {
    setLeftText(Getext1());
  };
  const handleButtonClick2 = () => {
    setRightText(Getext2());
  };
  const handleButtonClick3 = () => {
    setLeftText(Getext3());
  };
  const handleButtonClick4 = () => {
    setRightText(Getext4());
  };

  const Getext1 = () => {
    return (
        <h1>Any owner can submit a transaction. Ensure there is a sufficient ETH in this contract. If not, <button className='deposit'>Deposit</button> <br /> Must include a recipient address & an amount. Data is optional</h1>
    )
  }
  const Getext2 = () => {
    return (
        <h1>Other owners can use the "<span className='deposit'>Confirm Transaction</span>" button to confirm the transaction. A minimum number of 4 confirmations is required for a transaction to be executed.</h1>
    )
  }
  const Getext3 = () => {
    return (
        <h1>Once the required number of confirmations is reached, any owner can call <span className='deposit'>Execute Transaction</span> to execute the transaction. <br /> This transfers the funds to the recipient</h1>
    )
  }
  const Getext4 = () => {
    return (
        <h1>An owner can revoke their confirmation before the transaction is executed by calling <span className='deposit'>Revoke Confirmation</span>.</h1>
    )
  }

  const navigate = useNavigate();

  const navigateToSubmit = () => {
    navigate('/SubmitTransaction');
  };

  return (
    <>
    	<div className="w-[90%] mx-auto border border-b-red my-[30px] h-full rounded-[10px] py-[20px] lg:p-[15px] flex flex-col items-center justify-center">
        <h1 className="text-center text-2xl lg:text-4xl font-bold">Here's a WorkFlow</h1> 

        
        <div className="flex flex-col md:flex-row lg:flex-row items-center justify-between gap-[20px] lg:gap-[130px] my-[40px] px-[0px] lg:px-[50px]">

          <div className=" lg:w-[95%] h-[170px] border rounded-lg p-[15px] lg:p-[10px] w-[80%]">
            <h1 className='font-bold text-[12px] lg:text-[16px]'>{leftText}</h1>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:flex-col lg:flex lg:flex-col items-center gap-[15px] lg:gap-[30px] my-[0px] w-[90%] mx-auto">
              <button onClick={handleButtonClick1} className="px-[10px] lg:px-[20px] py-[10px] border border-white cursor-pointer rounded-lg text-[10px]">Submit Transaction</button>
              <button onClick={handleButtonClick2} className="px-[10px] lg:px-[20px] py-[10px] border border-white cursor-pointer rounded-lg text-[10px]">Confirm Transaction</button>
              <button onClick={handleButtonClick3} className="px-[10px] lg:px-[20px] py-[10px] border border-white cursor-pointer rounded-lg text-[10px]">Execute Transaction</button>
              <button onClick={handleButtonClick4} className="px-[10px] lg:px-[20px] py-[10px] border border-white cursor-pointer rounded-lg text-[10px]">Revoke Confirmation</button>
          </div>

          <div className="w-[] lg:w-[95%] h-[170px] border rounded-lg p-[15px] lg:p-[10px] w-[80%]">
              <h1 className='font-bold text-[12px] lg:text-md'>{rightText}</h1>
          </div>
        </div>

        <button onClick={navigateToSubmit} className="px-[20px] py-[10px] border border-white cursor-pointer rounded-lg bg-blue-500 ">Get Started</button>
		</div>
    </>
  );
};

export default HomePage;
