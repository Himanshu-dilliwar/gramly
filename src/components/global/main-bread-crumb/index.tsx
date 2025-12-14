import { Page } from "@/constants/page";
import React from "react";
import PageLogo from "../page-logo";

type Props = {
  page: Page;
  slug: string;
};

const MainBreadCrumb = ({ page, slug }: Props) => {
  return (
    <div className="flex flex-col items-start w-full">
      {/* Welcome card ONLY on Home */}
      {page === "home" && (
        <div className="flex justify-center w-full">
          <div className="w-4/12 py-5 lg:py-10 flex flex-col items-center bg-[radial-gradient(circle,rgba(255,255,255,0.1),rgba(0,0,0,0))] rounded-xl">
            <p className="text-text-secondary text-lg">Welcome Back</p>
            <h2 className="text-3xl font-bold capitalize">{slug}</h2>
          </div>
        </div>
      )}

      {/* Page logo */}
      <div className="py-5 lg:py-10">
        <PageLogo page={page} />
      </div>
    </div>
  );
};

export default MainBreadCrumb;
