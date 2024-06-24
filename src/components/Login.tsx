'use client';

import React from "react";
import { ConnectButton, useActiveAccount, useActiveWallet } from "thirdweb/react";
import { chain, client } from "../client";
import { createWallet, inAppWallet } from "thirdweb/wallets";

    const wallets = [
        inAppWallet(),
        createWallet("io.metamask"),
        createWallet("com.coinbase.wallet"),
        createWallet("io.zerion.wallet"),
    ];


const Login = () => {
    const account = useActiveWallet();
    return (
        <>
            <div className="flex flex-col items-center justify-center">
                {account ? (
                    <div className="text-center">
                        <ConnectButton client={client} chain={chain}  />
                    </div>

                ) : (
                    <div className="text-center">
                        <ConnectButton client={client} chain={chain}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default Login;