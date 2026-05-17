"use client";
import { Milestone } from "@/types/project";

export default function MilestoneEditor({ value, onChange }: { value: Partial<Milestone>[]; onChange: (v: Partial<Milestone>[]) => void }) {
  const set = (i: number, next: Partial<Milestone>) => onChange(value.map((m, idx) => idx === i ? next : m));
  return (
    <div className="space-y-3">
      {value.map((m, i) => (
        <div key={i} className="rounded-md border p-3">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
            <input value={m.title ?? ""} onChange={(e) => set(i, { ...m, title: e.target.value })} className="rounded-md border px-3 py-2 text-sm" placeholder="Milestone Title" />
            <input type="date" value={m.date ?? ""} onChange={(e) => set(i, { ...m, date: e.target.value })} className="rounded-md border px-3 py-2 text-sm" />
          </div>
          <textarea rows={2} value={m.description ?? ""} onChange={(e) => set(i, { ...m, description: e.target.value })} className="mt-2 w-full rounded-md border px-3 py-2 text-sm" placeholder="Description" />
        </div>
      ))}
      <button className="rounded-md border px-3 py-1 text-sm" onClick={() => onChange([...value, { title: "" }])}>+ Add Milestone</button>
    </div>
  );
}
