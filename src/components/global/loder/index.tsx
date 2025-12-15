import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  state: boolean;
  className?: string;
  color?: string;
  children?: React.ReactNode;
};

const Loader = ({ className, color, state, children }: Props) => {
  if (state) {
    return (
      <div className={cn("flex items-center justify-center", className)}>
        <Spinner color={color} />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center gap-x-2", className)}>
      {children}
    </div>
  );
};

export default Loader;
