"use client";

import { useContract, useContractRead, useContractWrite, useContractEvents } from "@thirdweb-dev/react";

// Contract address
const contractAddress = "0x17896b08cabD2759cc2047a8e726845CbEE9a3fB";

// Hook to interact with USDC-Paws contract
export function useUSDCpaws() {
  const { contract } = useContract(contractAddress);

  // Hook for Approval event
  const { data: approvalEvents, isLoading: eventsLoading, error: eventsError } = useContractEvents(contract, "Approval");

  // Hook to read balance of an address
  const useBalance = (address: string) => {
    const { data: balance, isLoading, error } = useContractRead(contract, "balanceOf", [address]);
    return { balance, isLoading, error };
  };

  // Hook to approve tokens
  const { mutateAsync: approve, isLoading: isApproving, error: approveError } = useContractWrite(contract, "approve");

  const approveTokens = async (spender: string, amount: number) => {
    try {
      const tx = await approve({ args: [spender, amount] });
      return { success: true, transactionHash: tx.receipt.transactionHash };
    } catch (error) {
      console.error("Approval Error:", error);
      return { success: false, error };
    }
  };

  // Hook to transfer tokens
  const { mutateAsync: transfer, isLoading: isTransferring, error: transferError } = useContractWrite(contract, "transfer");

  const transferTokens = async (to: string, amount: number) => {
    try {
      const tx = await transfer({ args: [to, amount] });
      return { success: true, transactionHash: tx.receipt.transactionHash };
    } catch (error) {
      console.error("Transfer Error:", error);
      return { success: false, error };
    }
  };

  return {
    contract,
    approvalEvents,
    eventsLoading,
    eventsError,
    useBalance,
    approveTokens,
    isApproving,
    approveError,
    transferTokens,
    isTransferring,
    transferError,
  };
}
