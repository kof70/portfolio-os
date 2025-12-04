"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function CustomTooltip({
  children,
  label,
}: {
  readonly children: React.ReactNode;
  readonly label: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className="bg-black/40 border-[0.5px] border-white/10 text-white rounded-md px-2 py-1 text-sm">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
