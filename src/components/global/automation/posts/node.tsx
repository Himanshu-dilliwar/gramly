"use client";

import { Separator } from "@/components/ui/separator";
import { CircleAlert } from "lucide-react";
import InstagramBlue from "@/icons/InstagramBlue.svg";
import Image from "next/image";
import { useQueryAutomation } from "@/hooks/user-queries";

type Props = {
  id: string;
};

const PostNode = ({ id }: Props) => {
  const { data } = useQueryAutomation(id);

  return (
    <div className="w-10/12 lg:w-8/12 relative xl:w-4/12 p-5 rounded-xl flex flex-col bg-[#1D1D1D] gap-y-3">
      {/* CONNECTOR */}
      <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
        <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
        <Separator
          orientation="vertical"
          className="flex-1 border-[1px] border-connector/10"
        />
        <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
      </div>

      {/* WARNING */}
      <div className="flex gap-x-2 items-center">
        <CircleAlert />
        <p>If they comment on…</p>
      </div>

      {/* POSTS INFO */}
      <div className="bg-background-80 p-3 rounded-xl flex flex-col gap-y-2">
        <div className="flex gap-x-2 items-center">
          <InstagramBlue />
          <p className="font-bold text-lg">These posts</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-3">
          {data?.data?.posts
            ?.filter((post) => post.media)
            .map((post) => (
              <div
                key={post.id}
                className="relative w-4/12 aspect-square rounded-lg overflow-hidden cursor-pointer"
              >
                {post.media && (
                  <Image
                    src={post.media}
                    alt="Post image"
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover hover:opacity-75 transition duration-100"
                  />
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostNode;
