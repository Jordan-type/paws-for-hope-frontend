"use client";

import { formatTimeToNow } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface PostProps {
  post: {
    id: number;
    creator: string;
    imgUrl: string;
    targetAmount: number;
    currentAmount: number;
    category: string;
    description: string;
    deadline: number;
    beneficiary: string;
    isOpen: boolean;
  };
}

const DonationPost: FC<PostProps> = ({ post }) => {
  return (
    <div className="rounded-md dark:text-slate-100 dark:bg-slate-800 bg-white shadow">
      <div className="px-6 py-4 flex justify-between">
        <div className="w-0 flex-1">
        {post.imgUrl && (
          <Image
              src={post.imgUrl}
              width={400}
              height={350}
              alt={post.description}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
          )}
          <div className="max-h-40 mt-1 text-xs text-gray-500">
            {post.category ? (
              <>
                <Link
                  className="underline dark:text-slate-100 text-zinc-900 text-sm underline-offset-2"
                  href={`/r/category/${post.category}`}
                >
                  r/{post.category}
                </Link>
                <span className="px-1">•</span>
              </>
            ) : null}
            <span>Posted by {post.creator}</span>{" "}
            {formatTimeToNow(new Date(post.deadline * 1000))}
          </div>
          <div>
            <h1 className="text-lg font-semibold py-2 leading-6 dark:text-slate-50 text-gray-900">
              {post.category}
            </h1>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {post.description}
            </p>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Beneficiary: {post.beneficiary}
          </p>
          <p className="text-sm text-gray-500">
            Progress: {post.currentAmount} / {post.targetAmount}
          </p>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 z-20 text-sm px-4 py-4 sm:px-6">
        <Link
          href={`/r/donate/post/${post.id}`}
          className="w-fit flex items-center gap-2"
        >
          <span className="text-gray-500">View Donation post</span>
        </Link>
      </div>
    </div>
  );
};

export default DonationPost;
