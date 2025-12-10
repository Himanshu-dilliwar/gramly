import * as React from "react";
import { cn } from "@/lib/utils"; // optional helper to merge classNames (or use your own)

export interface EditTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  // additional custom props (if needed) can go here
}

export const EditText = React.forwardRef<HTMLInputElement, EditTextProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={cn(
          "w-full min-h-[44px] rounded-md border px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0",
          "border-neutral-300 bg-white text-black dark:bg-[#111827] dark:text-white",
          className
        )}
      />
    );
  }
);

EditText.displayName = "edit-text";
