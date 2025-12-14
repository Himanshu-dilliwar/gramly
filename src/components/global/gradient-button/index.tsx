import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  type: "BUTTON" | "LINK";
  className?: string;
  href?: string;
};

const GradientButton = ({ children, type, className, href }: Props) => {
  const gradient =
    "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[2px] rounded-xl";

  const inner =
    "w-full h-full rounded-xl bg-[#0f0f0f] hover:bg-[#141414] transition";

  switch (type) {
    case "BUTTON":
      return (
        <div className={gradient}>
          <Button className={cn(inner, className)}>
            {children}
          </Button>
        </div>
      );

    case "LINK":
      if (!href) return null;

      return (
        <div className={gradient}>
          <Link
            href={href}
            className={cn(
              inner,
              "inline-flex items-center justify-center px-4 py-2 text-white",
              className
            )}
          >
            {children}
          </Link>
        </div>
      );

    default:
      return null;
  }
};

export default GradientButton;
