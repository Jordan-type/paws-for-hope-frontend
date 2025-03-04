"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { useCreateDonationPost } from "@/hooks/use-donation";

const contractAddress = "0x244747e42Aa15452D08Ef3d58B9693f6f49911c7";

const CreateDonationForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const walletAddress = searchParams.get("wallet");
  const initialTitle = searchParams.get("title") || ""; // Get the title from query params

  const [formData, setFormData] = useState({
    title: initialTitle,
    description: "",
    targetAmount: "",
    beneficiary: "",
    category: "",
    deadline: "",
    imgUrl: "",
  });

  const { createDonationPost, isLoading } = useCreateDonationPost(contractAddress);

    // Check for wallet address
    useEffect(() => {
      if (!walletAddress) {
        alert("Wallet address is missing. Please connect your wallet.");
        router.back(); // Navigate back if no wallet address is provided
      }
    }, [walletAddress, router]);

  useEffect(() => {
    if (initialTitle) {
      setFormData((prev) => ({ ...prev, title: initialTitle }));
    }
  }, [initialTitle]);

  const handleCreatePost = async () => {
    try {
      const result = await createDonationPost(
        Number(formData.targetAmount),
        formData.imgUrl,
        formData.category,
        formData.description,
        Math.floor(new Date(formData.deadline).getTime() / 1000), // Convert deadline to Unix timestamp
        formData.beneficiary
      );

      if (result.success) {
        toast({
          title: "Donation Post Created",
          description: "Your donation post has been successfully created!",
          variant: "default",
        });
        router.push("/r/donate");
      }
    } catch (error) {
      toast({
        title: "Error creating donation post.",
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
          <h1 className="text-xl font-semibold">Create a Donation Post</h1>
        </div>

        <hr className="bg-red-500 h-px" />

        <div>
          <p className="text-lg font-medium">Title</p>
          <Input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter a title for the donation post"
          />
        </div>

        <div>
          <p className="text-lg font-medium">Description</p>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter a description for the donation post"
          />
        </div>

        <div>
          <p className="text-lg font-medium">Target Amount</p>
          <Input
            name="targetAmount"
            type="number"
            value={formData.targetAmount}
            onChange={handleChange}
            placeholder="Enter the target amount"
          />
        </div>

        <div>
          <p className="text-lg font-medium">Beneficiary</p>
          <Input
            name="beneficiary"
            value={formData.beneficiary}
            onChange={handleChange}
            placeholder="Enter the beneficiary"
          />
        </div>

        <div>
          <p className="text-lg font-medium">Category</p>
          <Input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Enter the category (e.g., Education, Health)"
          />
        </div>

        <div>
          <p className="text-lg font-medium">Deadline</p>
          <Input
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>

        <div>
          <p className="text-lg font-medium">Image URL</p>
          <Input
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleChange}
            placeholder="Enter the image URL"
          />
        </div>

        <div className="flex justify-end gap-4">
          <Button
            disabled={isLoading}
            variant="default"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading || Object.values(formData).some((val) => val === "")} // Combine isLoading with other conditions
            variant="default"
            onClick={handleCreatePost}
          >
            {isLoading ? "Loading..." : "Create Donation Post"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const CreateDonationPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateDonationForm />
    </Suspense>
  );
};

export default CreateDonationPage;