import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center rounded-full border border-transparent px-6 py-3 text-sm font-medium transition-all duration-500 ease-premium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-foreground text-background shadow-soft hover:scale-[1.03] hover:bg-[#2a2421]",
        secondary:
          "border-border bg-white/85 text-foreground backdrop-blur hover:scale-[1.02] hover:border-sage/35 hover:bg-cream",
        ghost: "text-foreground hover:scale-[1.02] hover:bg-foreground/5"
      },
      size: {
        default: "h-11",
        lg: "h-12 px-7 text-base",
        icon: "h-11 w-11 rounded-full px-0"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
