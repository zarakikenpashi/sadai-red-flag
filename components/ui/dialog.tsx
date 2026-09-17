import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/ui";

export function DialogShell({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-300",
        className,
      )}
      role="dialog"
      {...props}
    />
  );
}
