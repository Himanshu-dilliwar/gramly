"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Ban } from "lucide-react";
import GradientButton from "../gradient-button";
import { Button } from "@/components/ui/button";
import { useQueryAutomations } from "@/hooks/user-queries";
import CreateAutomation from "../create-automation";

const AutomationList = () => {
  const pathname = usePathname();
  const { data, isLoading } = useQueryAutomations();
  console.log(data);

  /* ---------------- LOADING ---------------- */
  if (isLoading) {
    return (
      <div className="h-[70vh] flex justify-center items-center text-muted-foreground">
        Loading automations...
      </div>
    );
  }

  /* ---------------- EMPTY ---------------- */
  if (!data?.success || data.data.length === 0) {
    return (
      <div className="h-[70vh] flex flex-col justify-center items-center gap-y-3 text-muted-foreground">
        <Ban size={32} />
        <p className="text-gray-400">No automations found</p>
        <CreateAutomation />
      </div>
    );
  }

  /* ---------------- LIST ---------------- */
  return (
    <div className="flex flex-col gap-y-3">
      {data.data.map((automation) => (
        <Link
          key={automation.id}
          href={`${pathname}/${automation.id}`}
          className="bg-[#1D1D1D] hover:opacity-80 transition rounded-xl p-5 border border-[#545454] radial-gradient--automations flex justify-between gap-x-5"
        >
          {/* LEFT */}
          <div className="flex flex-col flex-1 items-start">
            <h2 className="text-xl font-semibold">{automation.name}</h2>
            <p className="text-[#9B9CA0] text-sm font-light">
              {automation.listener?.commentReply ?? "No description"}
            </p>

            {/* TAGS */}
            <div className="flex items-center gap-x-2 flex-wrap mt-3">
              {automation.keywords.length > 0 ? (
                automation.keywords.map((keyword, index) => (
                  <span
                    key={keyword.id}
                    className={cn(
                      "rounded-full px-4 py-1 capitalize text-sm font-medium border-2",
                      index % 4 === 0 &&
                        "bg-keyword-green/15 border-keyword-green",
                      index % 4 === 1 &&
                        "bg-keyword-purple/15 border-keyword-purple",
                      index % 4 === 2 &&
                        "bg-keyword-yellow/15 border-keyword-yellow",
                      index % 4 === 3 &&
                        "bg-keyword-red/15 border-keyword-red"
                    )}
                  >
                    {keyword.word}
                  </span>
                ))
              ) : (
                <div className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/60 px-3 py-1">
                  <Ban size={14} className="text-[#bfc0c3]" />
                  <span className="text-sm text-[#bfc0c3]">No keywords</span>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-between items-end">
            <p className="capitalize text-sm font-light text-[#9B9CA0]">
              {new Date(automation.createdAt).toLocaleDateString()}
            </p>

            <div className="flex flex-col gap-y-2 w-[120px]">
              {automation.listener?.listener === "SMARTAI" && (
                <GradientButton type="BUTTON" className="w-full text-white">
                  Smart AI
                </GradientButton>
              )}

              <Button variant="secondary" className="w-full">
                Standard
              </Button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AutomationList;
