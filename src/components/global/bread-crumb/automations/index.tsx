"use client";
import { ChevronRight, Pencil } from "lucide-react";
import React from "react";
import ActivateAutomationButton from "../../activate-automation-button";
import { useQueryAutomation } from "@/hooks/user-queries";
import { useEditAutomation } from "@/hooks/use-automation";
import { useMutationDataState } from "@/hooks/use-mutations";

type Props = {
  id: string;
};

const AutomationBreadCrumb = ({ id }: Props) => {
  const { data } = useQueryAutomation(id)

  const { edit, enableEdit, inputRef, mutate, isPending } =
    useEditAutomation(id);

  const { latestVariable, status } = useMutationDataState<{ name?: string }>([
    "update-automation",
  ]);

  return (
    <div className="w-full rounded-full bg-[#18181B] px-5 py-3 flex items-center">
      {/* LEFT: Breadcrumb */}
      <div className="flex items-center gap-x-3 text-sm min-w-0 text-[#9B9CA0]">
        <span className="truncate">Automations</span>

        <ChevronRight className="flex-shrink-0" size={16} />

        <span className="flex gap-x-3 items-center min-w-0">
          {edit ? (
            <input
              ref={inputRef}
              autoFocus
              defaultValue={
                isPending && latestVariable?.name
                  ? latestVariable.name
                  : data?.data?.name
              }
              className="bg-transparent outline-none text-white text-sm border-none p-0 min-w-0"
              placeholder="Add a new name"
            />
          ) : (
            <span className="text-white truncate max-w-[240px]">
              {latestVariable?.name ? latestVariable?.name:data?.data?.name}
            </span>
          )}

          <button
            type="button"
            onClick={enableEdit}
            className="p-1 rounded-full hover:opacity-75 transition"
            aria-label="Edit automation title"
          >
            <Pencil size={14} className="text-[#9B9CA0]" />
          </button>
        </span>
      </div>

      {/* RIGHT: Edit Icon */}
      <div className="flex items-center gap-x-5 ml-auto min-w-0">
        {/* Left message (hidden on small screens) */}
        <p className="hidden md:block text-text-secondary/60 text-sm truncate min-w-0">
          All states are automatically saved
        </p>

        {/* Right actions */}
        <div className="flex items-center gap-x-5 min-w-0">
          <p className="text-text-secondary text-sm truncate min-w-0 mr-4">
            Changes Saved
          </p>
        </div>
      </div>
      <ActivateAutomationButton id={id} />
    </div>
  );
};

export default AutomationBreadCrumb;
