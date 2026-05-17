"use client";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
};

export default function Button({ variant = "primary", size = "md", loading, className = "", children, ...props }: Props) {
  const v = {
    primary: "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]",
    ghost: "bg-transparent text-[var(--text-secondary)] hover:bg-[var(--muted-bg)]",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border bg-white text-[var(--text-primary)] hover:bg-[var(--muted-bg)]",
  }[variant];
  const s = { sm: "h-8 px-3 text-sm", md: "h-10 px-4 text-sm", lg: "h-11 px-5 text-base" }[size];
  return (
    <button {...props} disabled={loading || props.disabled} className={`inline-flex items-center justify-center gap-2 rounded-md ${v} ${s} disabled:opacity-60 ${className}`}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}
