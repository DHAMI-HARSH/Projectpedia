import { SelectHTMLAttributes } from "react";
type Props = SelectHTMLAttributes<HTMLSelectElement> & { label?: string };
export default function Select({ label, className = "", children, ...props }: Props) {
  return (
    <label className="block space-y-2">
      {label ? <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span> : null}
      <select {...props} className={`w-full rounded-2xl border bg-[var(--panel-muted)] px-4 py-3 text-sm outline-none ${className}`}>{children}</select>
    </label>
  );
}
