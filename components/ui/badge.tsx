import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/ui";

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  tone?: "red" | "green" | "blue" | "amber" | "slate";
};

const tones = {
  red: "bg-red-50 text-red-flag",
  green: "bg-green-50 text-green-700",
  blue: "bg-blue-50 text-blue-700",
  amber: "bg-amber-50 text-amber-700",
  slate: "bg-slate-100 text-slate-600",
};

export function Badge({ className, tone = "slate", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full px-4 py-2 text-sm font-bold",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
