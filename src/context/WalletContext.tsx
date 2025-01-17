"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";

interface WalletContextProps {
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const connectedAddress = useAddress(); // Get the address of the connected wallet

  // Update the wallet address whenever the connected address changes
  useEffect(() => {
    setWalletAddress(connectedAddress || null);
  }, [connectedAddress]);

  return (
    <WalletContext.Provider value={{ walletAddress, setWalletAddress }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
