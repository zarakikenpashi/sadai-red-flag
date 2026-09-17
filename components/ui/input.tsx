import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/ui";

export function Input({ className, ...props }: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      className={cn(
        "min-h-14 w-full rounded-2xl border border-slate-200 px-5 text-base outline-none transition placeholder:text-slate-400 focus:border-red-flag focus:ring-4 focus:ring-red-100",
        className,
      )}
      {...props}
    />
  );
}
