'use client';

import { formatTimeToNow } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

import { ExtendedPetPost } from '@/types/types'; 

interface PostProps {
  post: ExtendedPetPost; // Use the imported type
}

const FindPetPost: FC<PostProps> = ({ post }) => {
  return (
    <Card className="w-full max-w-lg mx-auto mb-6">
      <CardHeader>
        <Image
          src={post.imgUrl}
          width={400}
          height={350}
          alt={post.petName}
          className="w-full h-40 object-cover rounded-lg"   
        />
        <CardTitle className="text-lg font-bold mt-4">{post.petName}</CardTitle>
        <CardDescription className="text-gray-500">
          {post.location ? `Location: ${post.location}` : 'Location not specified'}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-gray-700 dark:text-gray-300">{post.description}</p>
          <p className="text-sm text-gray-500">Contact: {post.contactInfo}</p>
          <p className="text-sm text-gray-500">Posted by: {post.creator}</p>
          <p className="text-sm text-gray-500">
          {post.timestamp
            ? `Posted ${formatTimeToNow(new Date(post.timestamp * 1000))}`
            : "Timestamp unavailable"}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <Link
          href={`/f/find-pet/post/${post.id}`}
          className="text-sm text-purple-600 hover:underline"
        >
          View Pet Details
        </Link>
        {post.isOpen ? (
          <span className="text-sm text-green-500">Status: Open</span>
        ) : (
          <span className="text-sm text-red-500">Status: Closed</span>
        )}
      </CardFooter>
    </Card>
  );
};

export default FindPetPost;
