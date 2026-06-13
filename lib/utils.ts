import { format } from "date-fns";

export function slugify(title: string): string {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base}-${suffix}`;
}

export function normalizeExternalUrl(url?: string) {
  const value = url?.trim();
  if (!value) return undefined;
  if (/^[a-z][a-z\d+.-]*:\/\//i.test(value)) return value;
  if (value.startsWith("//")) return `https:${value}`;
  if (value.startsWith("www.")) return `https://${value}`;
  if (value.startsWith("/")) return value;

  try {
    return new URL(`https://${value}`).toString();
  } catch {
    return value;
  }
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  return format(new Date(dateStr), "MMM yyyy");
}

export function getCategoryColor(cat: string): string {
  const map: Record<string, string> = {
    web: "bg-sky-50 text-sky-800 border-sky-200",
    mobile: "bg-emerald-50 text-emerald-800 border-emerald-200",
    "ai-ml": "bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200",
    "open-source": "bg-amber-50 text-amber-800 border-amber-200",
    other: "bg-slate-100 text-slate-700 border-slate-200",
  };
  return map[cat] ?? map.other;
}

export function getStatusConfig(status: string) {
  if (status === "live") {
    return {
      label: "Live",
      textClass: "text-[var(--success-text)]",
      bgClass: "bg-[var(--success-bg)]",
      borderClass: "border-[var(--success-border)]",
    };
  }
  if (status === "in-progress") {
    return {
      label: "In Progress",
      textClass: "text-[var(--warning-text)]",
      bgClass: "bg-[var(--warning-bg)]",
      borderClass: "border-[var(--warning-border)]",
    };
  }
  return {
    label: "Archived",
    textClass: "text-[var(--muted-text)]",
    bgClass: "bg-[var(--muted-bg)]",
    borderClass: "border-[var(--muted-border)]",
  };
}
