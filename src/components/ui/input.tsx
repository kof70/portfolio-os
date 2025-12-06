import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: "default" | "glass";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, variant = "glass", id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-white/70 text-sm mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            "w-full rounded-xl transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-white/20",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            variant === "glass" && [
              "bg-white/5 border border-white/10",
              "text-white placeholder-white/30",
              "focus:border-white/30",
              "px-4 py-3",
            ],
            variant === "default" && [
              "bg-background border border-input",
              "text-foreground placeholder-muted-foreground",
              "focus:border-ring",
              "px-3 py-2",
            ],
            error && "border-red-500/50 focus:border-red-500",
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
