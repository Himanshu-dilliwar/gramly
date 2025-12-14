// src/components/global/page-logo.tsx
import React from "react";
import { PAGE_ICON, PAGE_LABEL, Page } from "@/constants/page";

type Props = {
  page: Page;
};

const PageLogo = ({ page }: Props) => {
  return (
    <div className="inline-flex items-center gap-x-3 py-4">
      {/* ICON */}
      <span className="text-[#768BDD]">
        {PAGE_ICON[page]}
      </span>

      {/* PAGE NAME */}
      <h2 className="text-2xl font-semibold capitalize">
        {PAGE_LABEL[page]}
      </h2>
    </div>
  );
};

export default PageLogo;
