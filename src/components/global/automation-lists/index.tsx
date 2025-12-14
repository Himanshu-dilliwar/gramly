"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Ban } from "lucide-react";
import GradientButton from "../gradient-button";
import { Button } from "@/components/ui/button";

const AutomationList = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-y-3">
      <Link
        href={`${pathname}/123124123123`}
        className="bg-[#1D1D1D] hover:opacity-80 transition rounded-xl p-5 border border-[#545454] radial-gradient--automations flex justify-between gap-x-5"
      >
        {/* LEFT */}
        <div className="flex flex-col flex-1 items-start">
          <h2 className="text-xl font-semibold">Automation Name</h2>
          <p className="text-[#9B9CA0] text-sm font-light">
            This is from the comment
          </p>

          {/* TAGS */}
          <div className="flex items-center gap-x-2 flex-wrap mt-3">
            <div
              className={cn(
                "rounded-full px-4 py-1 capitalize text-sm font-medium border-2",
                "bg-keyword-green/15 border-keyword-green"
              )}
            >
              getstarted
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-dashed border-white/60 px-3 py-1">
              <Ban size={14} className="text-[#bfc0c3]" />
              <span className="text-sm text-[#bfc0c3]">No keywords</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col justify-between items-end">
          <p className="capitalize text-sm font-light text-[#9B9CA0]">
            October 5th 2024
          </p>

          <div className="flex flex-col gap-y-2 w-[120px]">
            <GradientButton type="BUTTON" className="w-full text-white">
              Smart AI
            </GradientButton>

            <Button variant="secondary" className="w-full">
              Standard
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AutomationList;
