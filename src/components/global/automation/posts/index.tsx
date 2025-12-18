import { useAutomationPosts } from '@/hooks/use-automation'
import { useQueryAutomationPosts } from '@/hooks/user-queries'
import React from 'react'
import TriggerButton from '../trigger-button'
import { CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Loader from '../../loder'
import { cn } from '@/lib/utils'
import { InstagramPostProps } from '@/types/posts.type'

type Props = {
    id:string
}

const PostButton = ({id}: Props) => {
    const {data} = useQueryAutomationPosts()
    const {posts,
    onSelectPost,
    saveSelectedPosts,
    isPending,} = useAutomationPosts(id)

  return (
    <TriggerButton label="Attach a post">
      {data?.status === 200 && data.data.data.length > 0 ? (
        <div className="flex flex-col gap-y-3 w-full">
          {/* POSTS GRID */}
          <div className="flex flex-wrap w-full gap-3">
            {data.data.data.map((post: InstagramPostProps) => {
              const isSelected = posts.some(
                (p) => p.postid === post.id
              )

              return (
                <div
                  key={post.id}
                  onClick={() =>
                    onSelectPost({
                      postid: post.id,
                      media: post.media_url,
                      mediaType: post.media_type,
                      caption: post.caption,
                    })
                  }
                  className="relative w-4/12 aspect-square rounded-lg cursor-pointer overflow-hidden"
                >
                  {/* CHECK ICON */}
                  {isSelected && (
                    <CheckCircle
                      className="absolute top-1/2 left-1/2 z-50 
                      -translate-x-1/2 -translate-y-1/2"
                      fill="white"
                      stroke="black"
                    />
                  )}

                  {/* IMAGE */}
                  <Image
                    fill
                    sizes="100vw"
                    src={post.media_url}
                    alt="Instagram post"
                    className={cn(
                      "object-cover transition duration-100 hover:opacity-75",
                      isSelected && "opacity-75"
                    )}
                  />
                </div>
              )
            })}
          </div>

          {/* ATTACH BUTTON */}
          <Button
            onClick={saveSelectedPosts}
            disabled={posts.length === 0 || isPending}
            className="bg-gradient-to-br w-full from-[#3352CC] to-[#1C2D70] text-white font-medium"
          >
            <Loader state={isPending}>Attach Post</Loader>
          </Button>
        </div>
      ) : (
        <p className="text-text-secondary text-center">
          No posts found
        </p>
      )}
    </TriggerButton>
  )

}

export default PostButton