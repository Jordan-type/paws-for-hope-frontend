"use client";

import FindPetPostFeeds from "@/components/FindPet/FindPetPostFeeds";
import CreateMiniFindPetPost from "@/components/FindPet/CreateMiniFindPetPost";
import { useGetAllPosts } from "@/hooks/use-findPet";

import { ExtendedPetPost } from "@/types/types";

const Page = () => {
  const {posts, isLoading, error } = useGetAllPosts();

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

  const formattedPosts: ExtendedPetPost[] =
    posts?.map((post, index) => ({
      id: index, // Start index from 0
      creator: post.creator,
      amount: post.amount,
      imgUrl: post.imgUrl,
      petName: post.petName,
      description: post.description,
      location: post.location,
      contactInfo: post.contactInfo,
      timestamp: post.timestamp,
      isOpen: post.isOpen,
    })) || [];

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-6">Find Lost Pets</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Find Pet Feeds */}
        <div className="lg:col-span-2">
          <FindPetPostFeeds initialPosts={formattedPosts} />
        </div>

        {/* Right Section: Mini Create Find Pet Post */}
        <div>
          <CreateMiniFindPetPost />
        </div>
      </div>
    </div>
  );
};

export default Page;
