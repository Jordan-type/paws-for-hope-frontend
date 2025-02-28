"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useGetPostById, useDonateToPost } from "@/hooks/use-donation"; // Import donation hook
import { useUSDCpaws } from "@/hooks/use-usdc-paws";
import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "@/hooks/use-toast"; // Ensure you're using a toast library for notifications

const contractAddress = "0x244747e42Aa15452D08Ef3d58B9693f6f49911c7";

const DonationPostPage = () => {
  const params = useParams();
  const rawPostId = params?.postId;
  const postId = typeof rawPostId === "string" ? parseInt(rawPostId, 10) : -1;
  const { walletAddress } = useWallet();

  const { data: post, isLoading, error } = useGetPostById(contractAddress, postId);
  const { donateToPost, isLoading: isDonating } = useDonateToPost(contractAddress);
  const { approveTokens, isApproving } = useUSDCpaws();

  const [donationAmount, setDonationAmount] = useState<number>(0);

  const handleDonate = async () => {
    if (!walletAddress) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (donationAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid donation amount.",
        variant: "destructive",
      });
      return;
    }

    // Approve the USDC transfer first
    const approvalResult = await approveTokens(contractAddress, donationAmount);
    if (!approvalResult.success) {
      toast({
        title: "Approval Failed",
        description: "An error occurred during the approval process.",
        variant: "destructive",
      });
      return;
    }

    const result = await donateToPost(postId, donationAmount);
    if (result.success) {
      toast({
        title: "Donation Successful",
        description: `Transaction hash: ${result.transactionHash}`,
        variant: "default",
      });
    } else {
      toast({
        title: "Donation Failed",
        description: "An error occurred while processing your donation.",
        variant: "destructive",
      });
    }
  };

  if (isNaN(postId) || postId < 0) {
    return <div className="container mx-auto px-4">Invalid post ID</div>;
  }

  if (isLoading) {
    return <div className="container mx-auto px-4">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-4">Error: {String(error)}</div>;
  }

  if (!post) {
    return <div className="container mx-auto px-4">Post not found.</div>;
  }

  const targetAmount = post.targetAmount.toString();
  const currentAmount = post.currentAmount.toString();
  const deadline = new Date(post.deadline * 1000).toLocaleString();

  return (
    <div className="container mx-auto px-4 py-6 flex justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <Image
            src={post.imgUrl}
            alt="Donation Post Image"
            width={600}
            height={400}
            className="rounded-lg"
          />
          <CardTitle className="text-3xl font-bold mt-4">{post.description}</CardTitle>
          <CardDescription className="mt-2 text-lg text-zinc-500">{post.category}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Target Amount:</strong> {targetAmount} USDC
            </p>
            <p>
              <strong>Current Amount:</strong> {currentAmount} USDC
            </p>
            <p>
              <strong>Beneficiary:</strong> {post.beneficiary}
            </p>
            <p>
              <strong>Deadline:</strong> {deadline}
            </p>
            <p>
              <strong>Creator:</strong> {post.creator}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(Number(e.target.value))}
              placeholder="Enter amount to donate"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
            <Button
              variant="default"
              className="bg-purple-600 text-white hover:bg-purple-700"
              onClick={handleDonate}
              disabled={isDonating || isApproving}
            >
              {isDonating || isApproving ? "Processing..." : "Donate Now"}
            </Button>
          </div>
          <p className="text-sm text-zinc-500">
            Every donation helps! Let&apos;s work together to make a difference.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DonationPostPage;
