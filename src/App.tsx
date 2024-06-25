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

export function App() {
	return (
		<>
		    <Router>
				<nav className="flex items-center justify-between px-[10px] lg:w-[100%] lg:px-[30px] py-[20px] bg-blue-500">
					<h1 className="sm:text-xl md:text-xl lg:text-3xl font-bold">Your Multi-Signature Wallet</h1>
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


				<footer className="p-4 bg-blue-500 text-white">
					Thank You.
				</footer>
			</Router>
		</>
	);
}





















{/* <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">

</main> */}