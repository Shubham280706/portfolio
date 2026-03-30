import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-2xl border border-border bg-white/70 px-4 py-3 text-sm text-foreground outline-none transition-all duration-500 ease-premium placeholder:text-foreground/40 focus:border-sage/50 focus:bg-white focus:ring-2 focus:ring-sage/15",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
