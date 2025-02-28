"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "@/hooks/use-toast";
import { useCreateFindPetPost } from "@/hooks/use-findPet";
import { useUSDCpaws } from "@/hooks/use-usdc-paws";

const contractAddress = "0xeB6deFC2b3588e8C807701DA8b31Bd52E39f0039";

const CreateFindPetForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const walletAddress = searchParams.get("wallet");
  const initialTitle = searchParams.get("title") || ""; // Get the title from query params

  const [formData, setFormData] = useState({
    petName: initialTitle,
    description: "",
    rewardAmount: "",
    location: "",
    contactInfo: "",
    imgUrl: "",
  });

  const { createPost, isLoading } = useCreateFindPetPost();
  const { approveTokens, isApproving } = useUSDCpaws();

  // Check for wallet address
  useEffect(() => {
    if (!walletAddress) {
      alert("Wallet address is missing. Please connect your wallet.");
      router.back(); // Navigate back if no wallet address is provided
    }
  }, [walletAddress, router]);

  useEffect(() => {
    if (initialTitle) {
      setFormData((prev) => ({ ...prev, petName: initialTitle }));
    }
  }, [initialTitle]);

  const handleCreatePost = async () => {
    try {
        if (!formData.rewardAmount || Number(formData.rewardAmount) <= 0) {
            toast({
              title: "Invalid Reward Amount",
              description: "Please enter a valid reward amount.",
              variant: "destructive",
            });
            return;
          }
    
          // Approve USDC transfer
          const approvalResult = await approveTokens(contractAddress, Number(formData.rewardAmount));
          if (!approvalResult.success) {
            toast({
              title: "Approval Failed",
              description: String(approvalResult.error) || "Unable to approve USDC transfer.",
              variant: "destructive",
            });
            return;
          }
    
          // Create the find pet post
          const result = await createPost(
            Number(formData.rewardAmount),
        formData.imgUrl,
        formData.petName,
        formData.description,
        formData.location,
        formData.contactInfo
      );

      if (result.success) {
        toast({
          title: "Find Pet Post Created",
          description: "Your find pet post has been successfully created!",
          variant: "default",
        });
        router.push("/f/find-pet");
      }
    } catch (error) {
      toast({
        title: "Error creating find pet post.",
        description: String(error) || "An unknown error occurred.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container flex items-center h-full max-w-3xl mx-auto">
      <div className="relative bg-white dark:bg-zinc-900 dark:text-slate-200 w-full h-fit p-4 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Create a Find Pet Post</h1>
        </div>

        <hr className="bg-red-500 h-px" />

        <div>
          <p className="text-lg font-medium">Pet Name</p>
          <Input
            name="petName"
            value={formData.petName}
            onChange={handleChange}
            placeholder="Enter the name of the pet"
          />
        </div>

        <div>
          <p className="text-lg font-medium">Description</p>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description for the pet (e.g., breed, color, size)"
          />
        </div>

        <div>
          <p className="text-lg font-medium">Reward Amount</p>
          <Input
            name="rewardAmount"
            type="number"
            value={formData.rewardAmount}
            onChange={handleChange}
            placeholder="Enter the reward amount in USDC"
          />
        </div>

        <div>
          <p className="text-lg font-medium">Location</p>
          <Input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter the location where the pet was last seen"
          />
        </div>

        <div>
          <p className="text-lg font-medium">Contact Information</p>
          <Input
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            placeholder="Enter your contact information"
          />
        </div>

        <div>
          <p className="text-lg font-medium">Image URL</p>
          <Input
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
            placeholder="Enter the image URL of the pet"
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            disabled={isLoading}
            variant="subtle"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            isLoading={isLoading || isApproving}
            disabled={Object.values(formData).some((val) => val === "")}
            onClick={handleCreatePost}
          >
            Approve and Create Post
          </Button>
        </div>
      </div>
    </div>
  );
};

const CreateFindPetPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateFindPetForm />
    </Suspense>
  );
}

export default CreateFindPetPage;
