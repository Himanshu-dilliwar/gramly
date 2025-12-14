import { ChevronRight, Pencil } from "lucide-react";
import React from "react";
import ActivateAutomationButton from "../../activate-automation-button";

type Props = {
  id: string;
};

const AutomationBreadCrumb = ({ id }: Props) => {
  return (
    <div className="w-full rounded-full bg-[#18181B] px-5 py-3 flex items-center">
      {/* LEFT: Breadcrumb */}
      <div className="flex items-center gap-x-3 text-sm min-w-0 text-[#9B9CA0]">
        <span className="truncate">Automations</span>

        <ChevronRight className="flex-shrink-0" size={16} />

        <span className="text-white truncate max-w-[240px]">
          This is the automation title
        </span>
        <button
          type="button"
          className="p-1 rounded-full hover:opacity-75 transition"
          aria-label="Edit automation title"
        >
          <Pencil size={14} className="text-[#9B9CA0]" />
        </button>
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
      <ActivateAutomationButton/>
    </div>
  );
};

export default AutomationBreadCrumb;
