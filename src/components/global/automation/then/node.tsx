"use client";

import { useQueryAutomation } from "@/hooks/user-queries";
import { Separator } from "@/components/ui/separator";
import PlaneBlue from "@/icons/PlainBlue.svg";
import React from "react";
import { BotMessageSquare, CircleAlert } from "lucide-react";
import PostButton from "../posts";

type Props = {
  id: string;
};

const ThenNode = ({ id }: Props) => {
  const { data } = useQueryAutomation(id);

  const listener = data?.data?.listener;
  const triggers = data?.data?.trigger ?? [];

  // Find if COMMENT trigger exists (used for warning)
  const commentTrigger = triggers.find((t) => t.type === "COMMENT");

  // If no listener yet, don't render Then node
  if (!listener) return null;

  return (
    <div className="relative w-full flex justify-center">
      {/* CONNECTOR */}
      <div className="absolute h-20 left-1/2 bottom-full flex flex-col items-center z-50">
              <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
      
              <Separator
                orientation="vertical"
                className="bottom-full flex-1 border-[1px] border-connector/10"
              />
      
              <span className="h-[9px] w-[9px] bg-connector/10 rounded-full" />
            </div>

      {/* THEN NODE */}
      <div className="w-full lg:w-10/12 xl:w-6/12 p-5 rounded-xl bg-[#1D1D1D] flex flex-col gap-y-4">
        {/* HEADER */}
        <div className="flex gap-x-2 items-center">
          <CircleAlert />
          <p className="text-sm text-text-secondary">Then…</p>
        </div>

        {/* CONTENT */}
        <div className="bg-background-80 p-3 rounded-xl flex flex-col gap-y-2">
          <div className="flex gap-x-2 items-center">
            {listener.listener === "MESSAGE" ? (
              <PlaneBlue />
            ) : (
              <BotMessageSquare />
            )}

            <p className="text-lg text-white">
              {listener.listener === "MESSAGE"
                ? "Send the user a message."
                : "Let Smart AI take over."}
            </p>
          </div>

          {/* DESCRIPTION */}
          <p className="font-light text-text-secondary">
            {listener.prompt === "MESSAGE"
              ? "A message will be sent automatically when the trigger fires."
              : "Smart AI will generate and send replies on your behalf."}
          </p>

          {/* COMMENT WARNING */}
          {commentTrigger && listener.listener === "MESSAGE" && (
            <div className="mt-2 text-xs text-yellow-400">
              ⚠️ This message will be sent for every matching comment.
            </div>
          )}
        </div>
      </div>
        {/* himanshu wip */}
      {/* {data?.data?.posts?.length === 0 && commentTrigger && (<PostButton id={id} />)} */}

      
    </div>
  );
};

export default ThenNode;
