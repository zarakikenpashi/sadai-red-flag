import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/ui";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary" | "dark" | "danger";
  size?: "sm" | "md" | "lg";
};

const variants = {
  primary:
    "bg-red-flag text-white shadow-lg shadow-red-600/20 hover:bg-[#D90429]",
  secondary:
    "border border-slate-200 bg-white text-ink-black hover:border-slate-300 hover:bg-slate-50",
  dark: "bg-ink-black text-white hover:bg-slate-800",
  danger:
    "border border-deep-alert bg-white text-deep-alert hover:bg-red-50",
};

const sizes = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-12 px-5 py-3 text-sm",
  lg: "min-h-14 px-6 py-4 text-base",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-2xl font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-100 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  );
}
