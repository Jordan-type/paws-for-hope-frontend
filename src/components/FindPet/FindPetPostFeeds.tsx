'use client';

import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { FC, useEffect, useRef } from 'react';
import FindPetPost from '@/components/FindPet/FindPetPost';

import { ExtendedPetPost } from "@/types/types";

interface FindPetPostFeedsProps {
  initialPosts: ExtendedPetPost[];
}

const FindPetPostFeeds: FC<FindPetPostFeedsProps> = ({ initialPosts }) => {
  const lastPostRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['infinite-query'],
    async ({ pageParam = 1 }) => {
      const limit = INFINITE_SCROLL_PAGINATION_RESULTS;
      return initialPosts.slice((pageParam - 1) * limit, pageParam * limit);
    },
    {
      getNextPageParam: (_, pages) => pages.length + 1,
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  );

  useEffect(() => {
    if (lastPostRef.current && lastPostRef.current.getBoundingClientRect().bottom <= window.innerHeight) {
      fetchNextPage();
    }
  }, [fetchNextPage]);

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {posts.map((post, index) => {
        if (index === posts.length - 1) {
          return (
            <div key={post.id} ref={lastPostRef}>
              <FindPetPost post={post} />
            </div>
          );
        } else {
          return (
          <div key={post.id}>
            <FindPetPost post={post} />
          </div>
          )
            //  <FindPetPost key={post.id} post={post} />;
        }
      })}

      {isFetchingNextPage && (
        <div className="flex justify-center">
          <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
        </div>
      )}
    </div>
  );
};

export default FindPetPostFeeds;
