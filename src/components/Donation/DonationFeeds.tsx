'use client'

import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { FC, useEffect, useRef } from 'react'
import DonationPost from '@/components/Donation/DonationPost';

interface ExtendedPost {
  id: number
  creator: string
  imgUrl: string
  targetAmount: number
  currentAmount: number
  category: string
  description: string
  deadline: number
  beneficiary: string
  isOpen: boolean
}

interface DonationPostFeedsProps {
  initialPosts: ExtendedPost[]
}


const DonationPostFeeds: FC<DonationPostFeedsProps> = ({ initialPosts }) => {
  const lastPostRef = useRef<HTMLLIElement>(null)

  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ['infinite-query'],
    async ({ pageParam = 1 }) => {
      const limit = INFINITE_SCROLL_PAGINATION_RESULTS
      return initialPosts.slice((pageParam - 1) * limit, pageParam * limit);
    },
    {
      getNextPageParam: (_, pages) => pages.length + 1,
      initialData: { pages: [initialPosts], pageParams: [1] },
    }
  )

  useEffect(() => {
    if (lastPostRef.current && lastPostRef.current.getBoundingClientRect().bottom <= window.innerHeight) {
      fetchNextPage()
    }
  }, [fetchNextPage])

  const posts = data?.pages.flatMap((page) => page) ?? initialPosts

  return (
    <ul className="flex flex-col col-span-2 space-y-6">
      {posts.map((post, index) => {
        // const votesAmt = post.votes.reduce((acc: number, vote: { type: string }) => {
        //   if (vote.type === 'UP') return acc + 1
        //   if (vote.type === 'DOWN') return acc - 1
        //   return acc
        // }, 0)

        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={lastPostRef}>
              <DonationPost
                post={post}
              />
            </li>
          )
        } else {
          return (
            <DonationPost
              key={post.id}
              post={post}
            />
          )
        }
      })}

      {isFetchingNextPage && (
        <li className="flex justify-center">
          <Loader2 className="w-6 h-6 text-zinc-500 animate-spin" />
        </li>
      )}
    </ul>
  )
}

export default DonationPostFeeds
