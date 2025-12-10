import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/** Helper: parse "1 solid #000000" into CSS border string (naive) */
function parseBorderBorder(value?: string): string | undefined {
  if (!value) return undefined;
  // Return trimmed value (we'll add 'px' if needed later)
  return value.trim();
}

/** Helper: parse padding "t=12px,r=24px,b=12px,l=24px" -> CSS padding */
function parsePadding(value?: string): string | undefined {
  if (!value) return undefined;
  const parts = value.split(",").reduce<Record<string, string>>((acc, part) => {
    const [k, v] = part.split("=");
    if (k && v) acc[k.trim()] = v.trim();
    return acc;
  }, {});
  const top = parts["t"] ?? parts["top"];
  const right = parts["r"] ?? parts["right"];
  const bottom = parts["b"] ?? parts["bottom"];
  const left = parts["l"] ?? parts["left"];
  if (top && right && bottom && left) return `${top} ${right} ${bottom} ${left}`;
  return undefined;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  // design-tool props (optional)
  text?: string;
  text_color?: string;
  fill_background_color?: string;
  border_border?: string;
  padding?: string;
  layout_width?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      text,
      text_color,
      fill_background_color,
      border_border,
      padding,
      layout_width,
      children,
      style,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // convert design props into inline styles
    const computedStyle: React.CSSProperties = { ...(style ?? {}) };

    if (text_color) {
      computedStyle.color = text_color;
    }
    if (fill_background_color) {
      computedStyle.backgroundColor = fill_background_color;
    }

    if (border_border) {
      let borderVal = parseBorderBorder(border_border);
      if (borderVal) {
        // ensure numeric width has px (e.g. "1 solid #000" -> "1px solid #000")
        borderVal = borderVal.replace(/^(\d+)(\s+)/, "$1px$2");
        computedStyle.border = borderVal;
      }
    }

    if (padding) {
      const pad = parsePadding(padding);
      if (pad) computedStyle.padding = pad;
    }

    // layout_width is often "flex-1" or "w-full" coming from generator; prefer className
    const mergedClassName = cn(buttonVariants({ variant, size }), layout_width ?? "", className);

    return (
      <Comp
        className={mergedClassName}
        ref={ref}
        style={computedStyle}
        {...props}
      >
        {/* prefer explicit `text` prop if present, else children */}
        {text ?? children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
