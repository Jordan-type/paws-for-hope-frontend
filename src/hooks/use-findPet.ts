"use client";

import { useContract, useContractRead, useContractWrite  } from "@thirdweb-dev/react";
import { PetPost } from "@/types/types";

const contractAddress = "0xeB6deFC2b3588e8C807701DA8b31Bd52E39f0039";

// Hook to fetch all posts
export function useGetAllPosts() {
  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useContractRead(
    contract,
    "getAllPosts",
    []
  );

  return {
    posts: data as PetPost[] | undefined,
    isLoading,
    error,
  };
}


// Hook to fetch a specific post by ID
export function useGetPostById(postId: number) {
  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useContractRead(
    contract,
    "getPost",
    [postId]
  );

  return {
    post: data as PetPost | undefined,
    isLoading,
    error,
  };
}

// Hook to close a post and reward the beneficiary
export function useClosePost() {
  const { contract } = useContract(contractAddress);
  const { mutateAsync: closePost, isLoading, error } = useContractWrite(
    contract,
    "closePost"
  );

  const executeClosePost = async (postId: number, beneficiary: string) => {
    try {
      const tx = await closePost({
        args: [postId, beneficiary],
      });
      return {
        success: true,
        transactionHash: tx.receipt.transactionHash,
      };
    } catch (err) {
      console.error("Error closing post:", err);
      return { success: false, error: err };
    }
  };

  return {
    closePost: executeClosePost,
    isLoading,
    error,
  };
}

// Hook to create a new post
export function useCreateFindPetPost() {
  const { contract } = useContract(contractAddress);
  const { mutateAsync: createPost, isLoading, error } = useContractWrite(
    contract,
    "createPost"
  );

  const executeCreatePost = async (
    amount: number,
    imgUrl: string,
    petName: string,
    description: string,
    location: string,
    contactInfo: string
  ) => {
    try {
      const tx = await createPost({
        args: [amount, imgUrl, petName, description, location, contactInfo],
      });
      return {
        success: true,
        transactionHash: tx.receipt.transactionHash,
      };
    } catch (err) {
      console.error("Error creating post:", err);
      return { success: false, error: err };
    }
  };

  return {
    createPost: executeCreatePost,
    isLoading,
    error,
  };
}
