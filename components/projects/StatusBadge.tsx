import { getStatusConfig } from "@/lib/utils";

export default function StatusBadge({ status }: { status: "live" | "in-progress" | "archived" }) {
  const c = getStatusConfig(status);
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-2 py-1 text-xs ${c.textClass} ${c.bgClass} ${c.borderClass}`}>
      <span className={`h-2 w-2 rounded-full ${status === "live" ? "animate-pulse bg-[var(--success-text)]" : status === "in-progress" ? "bg-[var(--warning-text)]" : "bg-[var(--muted-text)]"}`} />
      {c.label}
    </span>
  );
}
