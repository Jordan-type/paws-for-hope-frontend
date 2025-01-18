import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";

// Contract address
const contractAddress = "0x77df767288b7C632D7E6F9dF1EC83117f4B8F942";

export interface Post {
  creator: string;
  imgUrl: string;
  stock: number;
  price: number;
  category: string;
  description: string;
  location: string;
  contactInfo: string;
  createdAt: number;
  isOpen: boolean;
}

// Hook to read a single post
export function useGetPostById(postId: number) {
  const { contract } = useContract(contractAddress);
  const { data, isLoading, error } = useContractRead(contract, "posts", [postId]);

  return {
    data: data as Post | undefined,
    isLoading,
    error,
  };
}

// Hook to create a post
export function useCreatePost() {
  const { contract } = useContract(contractAddress);
  const { mutateAsync: write, isLoading, error } = useContractWrite(contract, "createPost");

  const createPost = async (
    _stock: number,
    _price: number,
    _imgUrl: string,
    _category: string,
    _description: string,
    _location: string,
    _contactInfo: string
  ) => {
    try {
      const tx = await write({
        args: [_stock, _price, _imgUrl, _category, _description, _location, _contactInfo],
      });
      return { success: true, transactionHash: tx.receipt.transactionHash };
    } catch (err) {
      console.error("Error creating post:", err);
      return { success: false, error: err };
    }
  };

  return {
    createPost,
    isLoading,
    error,
  };
}

// Hook to redeem an item
export function useRedeemItem() {
  const { contract } = useContract(contractAddress);
  const { mutateAsync: write, isLoading, error } = useContractWrite(contract, "redeemItem");

  const redeemItem = async (_postId: number) => {
    try {
      const tx = await write({ args: [_postId] });
      return { success: true, transactionHash: tx.receipt.transactionHash };
    } catch (err) {
      console.error("Error redeeming item:", err);
      return { success: false, error: err };
    }
  };

  return {
    redeemItem,
    isLoading,
    error,
  };
}
