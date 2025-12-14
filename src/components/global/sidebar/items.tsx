import { SIDEBAR_MENU } from "@/constants/menu";
import { Page } from "@/constants/page";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  page: Page;
  slug: string;
};

const Items = ({ page, slug }: Props) => {
  return (
    <>
      {SIDEBAR_MENU.map((item) => {
        const href =
          item.page === "home"
            ? `/dashboard/${slug}`
            : `/dashboard/${slug}/${item.page}`;

        const isActive = page === item.page;

        return (
          <Link
            key={item.id}
            href={href}
            className={cn(
              "flex items-center gap-x-2 rounded-full p-3 transition",
              isActive
                ? "bg-[#0f0f0f] text-white"
                : "text-[#9B9CA0] hover:text-white"
            )}
          >
            {item.icon}
            <span className="capitalize">{item.label}</span>
          </Link>
        );
      })}
    </>
  );
};

export default Items;
