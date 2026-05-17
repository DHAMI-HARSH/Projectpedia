import { TextareaHTMLAttributes } from "react";
type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; helpText?: string; error?: string };
export default function Textarea({ label, helpText, error, className = "", ...props }: Props) {
  return (
    <label className="block space-y-2">
      {label ? <span className="text-sm font-medium text-[var(--text-primary)]">{label}</span> : null}
      <textarea {...props} className={`w-full rounded-2xl border bg-[var(--panel-muted)] px-4 py-3 text-sm outline-none ${error ? "border-red-500" : ""} ${className}`} />
      {helpText ? <p className="text-xs text-[var(--text-secondary)]">{helpText}</p> : null}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </label>
  );
}
