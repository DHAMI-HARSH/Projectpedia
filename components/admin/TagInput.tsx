"use client";
import { X } from "lucide-react";
import { useState } from "react";

export default function TagInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState("");
  return (
    <div className="space-y-2">
      <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); if (input.trim()) onChange([...value, input.trim()]); setInput(""); } }} className="w-full rounded-md border px-3 py-2 text-sm" placeholder="Type a technology and press Enter" />
      <div className="flex flex-wrap gap-2">{value.map((t) => <span key={t} className="mono inline-flex items-center gap-1 rounded-full border bg-[var(--code-bg)] px-2 py-1 text-xs">{t}<button onClick={() => onChange(value.filter((x) => x !== t))}><X className="h-3 w-3" /></button></span>)}</div>
    </div>
  );
}
