import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, rows = 4, ...props }, ref) => {
    const generatedId = React.useId();
    const textareaId = id || generatedId;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-white/70 text-sm mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          rows={rows}
          className={cn(
            "w-full bg-white/5 border border-white/10 rounded-xl",
            "text-white placeholder-white/30",
            "focus:outline-none focus:border-white/30",
            "transition-colors resize-none",
            "px-4 py-3",
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

Textarea.displayName = "Textarea";

export { Textarea };
