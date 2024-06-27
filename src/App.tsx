'use client'

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from "./components/Login";
import HomePage from "./pages/HomePage";
import SubmitTransaction from "./pages/SubmitTransaction";
import ExecuteTransaction from './pages/ExecuteTransaction';
import ConfirmTransaction from './pages/ConfirmTransaction';
import RevokeTransaction from './pages/RevokeTransaction';
import GetOwners from './components/Owners';
import GetTransaction from './components/GetTransaction';
import GetTransactionCount from './components/GetTransactionCount';
import IsTransactionConfirmed from './components/IsConfirmed';
import GetTransactionDetails from './components/Transactions';
import myLogo from "./images/WhatsApp Image 2024-06-27 at 03.32.24_a38343ae.jpg"

export function App() {
	return (
		<>
		    <Router>
				<nav className="flex items-center justify-between px-[10px] lg:w-[100%] lg:px-[30px] py-[20px] bg-blue-500 rounded-bl-2xl rounded-br-2xl glass-navbar">
					<div className='flex items-center gap-[10px]'>
						<img className='w-[30%] sm:w-[20%] md:w-[8%] rounded-[50%]' src={myLogo} alt="" />
						<h1 className="hidden sm:block sm:text-xl md:text-xl lg:text-4xl font-bold">DeFi Insights Multi-Sig</h1>
					</div>
					<Login />
				</nav>

				<Routes>
                    <Route path="/" element={<HomePage />} />
					<Route path="/SubmitTransaction" element={<SubmitTransaction />} />
					<Route path="/ConfirmTransaction" element={<ConfirmTransaction />} />
					<Route path="/ExecuteTransaction" element={<ExecuteTransaction />} />
					<Route path="/RevokeTransaction" element={<RevokeTransaction />} />
                </Routes>

				<GetOwners/>
				<GetTransaction/>
				<GetTransactionCount/>
				<IsTransactionConfirmed/>
				<GetTransactionDetails/>


				<footer className="p-4 bg-blue-500 text-white  rounded-tr-2xl rounded-tl-2xl">
					Thank You.
				</footer>
			</Router>
		</>
	);
}





















