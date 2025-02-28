"use client";


import DonationPostFeeds from "@/components/Donation/DonationFeeds";
import CreateMiniDonationPost from "@/components/Donation/CreateMiniDonationPost";
import { useGetAllPosts, Post } from "@/hooks/use-donation";

interface ExtendedPost extends Post {
    id: number; // Adding the required `id` property
  }

const contractAddress = "0x244747e42Aa15452D08Ef3d58B9693f6f49911c7";

const Page = () => {
    const { data: posts, isLoading, error } = useGetAllPosts(contractAddress);
    
    console.log(posts);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-6">Error fetching posts</h1>
        <p className="text-red-500">{String(error)}</p>
      </div>
    );
  }

  const formattedPosts: ExtendedPost[] =
  posts?.map((post, index) => ({
    id: index, // Start index from 0
    creator: post.creator,
    imgUrl: post.imgUrl,
    targetAmount: parseInt(post.targetAmount.toString(), 10),
    currentAmount: parseInt(post.currentAmount.toString(), 10),
    category: post.category,
    description: post.description,
    deadline: parseInt(post.deadline.toString(), 10), // 1919191919199789789
    beneficiary: post.beneficiary,
    isOpen: post.isOpen,
  })) || [];

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Donate to Animal Welfare</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Donation Feeds */}
        <div className="lg:col-span-2">
          <DonationPostFeeds initialPosts={formattedPosts} />
        </div>

        {/* Right Section: Mini Create Donation Post */}
        <div>
          <CreateMiniDonationPost />
        </div>
      </div>
    </div>
  );
};

export default Page;
