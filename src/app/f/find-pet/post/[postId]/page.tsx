"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useGetPostById, useClosePost } from "@/hooks/use-findPet"; // Import close post hook
import { useUSDCpaws } from "@/hooks/use-usdc-paws";
import { useState } from "react";
import { useWallet } from "@/context/WalletContext";
import { toast } from "@/hooks/use-toast";

const PetDetailsPage = () => {
  const params = useParams();
  const rawPostId = params?.postId;
  const postId = typeof rawPostId === "string" ? parseInt(rawPostId, 10) : -1;
  const { walletAddress } = useWallet();

  const { post, isLoading, error } = useGetPostById(postId);
  const { approveTokens, isApproving } = useUSDCpaws();
  const { closePost, isLoading: isClosing } = useClosePost();

  const [rewardAmount, setRewardAmount] = useState<number>(0);

  const handleApproveReward = async () => {
    if (!walletAddress) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (rewardAmount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid reward amount.",
        variant: "destructive",
      });
      return;
    }

    const approvalResult = await approveTokens(postId.toString(), rewardAmount);
    if (!approvalResult.success) {
      toast({
        title: "Approval Failed",
        description: "An error occurred during the approval process.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Approval Successful",
      description: `You have approved ${rewardAmount} USDC for the reward.`,
      variant: "default",
    });
  };

  const handleClosePost = async () => {
    if (!walletAddress) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (!post) {
      toast({
        title: "Post Not Found",
        description: "The post you are trying to close does not exist.",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await closePost(postId, walletAddress);
      if (result.success) {
        toast({
          title: "Post Closed",
          description: `Transaction hash: ${result.transactionHash}`,
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: "Error Closing Post",
        description: String(error) || "An error occurred while closing the post.",
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

  return (
    <div className="container mx-auto px-4 py-6 flex justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader>
          <Image
            src={post.imgUrl}
            alt="Lost Pet Image"
            width={600}
            height={400}
            className="rounded-lg"
          />
          <CardTitle className="text-3xl font-bold mt-4">{post.petName}</CardTitle>
          <CardDescription className="mt-2 text-lg text-zinc-500">{post.location}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-2">
            <p>
              <strong>Description:</strong> {post.description}
            </p>
            <p>
              <strong>Contact Info:</strong> {post.contactInfo}
            </p>
            <p>
              <strong>Posted By:</strong> {post.creator}
            </p>
            <p>
              <strong>Status:</strong> {post.isOpen ? "Open" : "Closed"}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="number"
              value={rewardAmount}
              onChange={(e) => setRewardAmount(Number(e.target.value))}
              placeholder="Enter reward amount in USDC"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
            />
            <Button
              variant="default"
              className="bg-purple-600 text-white hover:bg-purple-700"
              onClick={handleApproveReward}
              disabled={isApproving}
            >
              {isApproving ? "Approving..." : "Approve Reward"}
            </Button>
          </div>

          {post.isOpen && (
            <Button
              variant="default"
              className="bg-green-600 text-white hover:bg-green-700"
              onClick={handleClosePost}
              disabled={isClosing}
            >
              {isClosing ? "Closing..." : "Mark as Found & Close"}
            </Button>
          )}

          <p className="text-sm text-zinc-500">
            Thank you for contributing to finding {post.petName}.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PetDetailsPage;
