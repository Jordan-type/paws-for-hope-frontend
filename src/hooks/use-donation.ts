"use client";

import { useContract, useContractRead, useContractWrite  } from "@thirdweb-dev/react";

export interface Post {
  creator: string;
  imgUrl: string;
  targetAmount: number;
  currentAmount: number;
  category: string;
  description: string;
  deadline: number;
  beneficiary: string;
  isOpen: boolean;
}

export function useGetAllPosts(contractAddress: string) {
  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useContractRead(
    contract,
    "getAllPosts",
    []
  );

  return {
    data: data as Post[] | undefined,
    isLoading,
    error,
  };
}

export function useGetPostById(contractAddress: string, postId: number) {
  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useContractRead(
    contract,
    "posts",
    [postId]
  );

  return {
    data: data as Post | undefined,
    isLoading,
    error,
  };
}

export function useCreateDonationPost(contractAddress: string) {
  const { contract } = useContract(contractAddress);
  const { mutateAsync: write, isLoading, error } = useContractWrite(contract, "createDonationPost");

  const createDonationPost = async (
    _targetAmount: number,
    _imgUrl: string,
    _category: string,
    _description: string,
    _deadline: number,
    _beneficiary: string
  ) => {
    try {
      const tx = await write({
        args: [_targetAmount, _imgUrl, _category, _description, _deadline, _beneficiary],
      });
      return { success: true, transactionHash: tx.receipt.transactionHash };
    } catch (err) {
      console.error("Error creating donation post:", err);
      return { success: false, error: err };
    }
  };

  return {
    createDonationPost,
    isLoading,
    error,
  };
}

export function useDonateToPost(contractAddress: string) {
  const { contract } = useContract(contractAddress);
  const { mutateAsync: write, isLoading, error } = useContractWrite(contract, "donateToPost");

  const donateToPost = async (_postId: number, _amount: number) => {
    try {
      const tx = await write({ args: [_postId, _amount] });
      return { success: true, transactionHash: tx.receipt.transactionHash };
    } catch (err) {
      console.error("Error donating to post:", err);
      return { success: false, error: err };
    }
  };

  return {
    donateToPost,
    isLoading,
    error,
  };
}

export function useGetPostsByCategory(contractAddress: string, category: string) {  
  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useContractRead(
    contract,
    "getPostsByCategory",
    [category]
  );

  return {
    data: data as Post[] | undefined,
    isLoading,
    error,
  };
}

export function useGetTotalDonations(contractAddress: string, creator: string) {
  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useContractRead(
    contract,
    "getTotalDonations",
    [creator]
  );

  return {
    data: data as Post[] | undefined,
    isLoading,
    error,
  };
}

export default {
  useGetAllPosts,
  useGetPostById,
  useGetPostsByCategory,
  useGetTotalDonations,
}
