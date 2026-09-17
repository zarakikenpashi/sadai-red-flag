import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/ui";

export function Card({ className, ...props }: ComponentPropsWithoutRef<"article">) {
  return (
    <article
      className={cn(
        "rounded-3xl border border-slate-200 bg-white p-6 shadow-sm",
        className,
      )}
      {...props}
    />
  );
}

export function Panel({ className, ...props }: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "rounded-[2rem] bg-white p-8 shadow-xl shadow-slate-200 md:p-10",
        className,
      )}
      {...props}
    />
  );
}
