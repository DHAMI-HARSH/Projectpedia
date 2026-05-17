"use client";
export default function FeatureListEditor({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="space-y-2">
      {value.map((f, i) => <div key={i} className="flex gap-2"><input value={f} onChange={(e) => onChange(value.map((x, idx) => idx === i ? e.target.value : x))} className="flex-1 rounded-md border px-3 py-2 text-sm" placeholder="Describe a key feature..." /><button onClick={() => onChange(value.filter((_, idx) => idx !== i))}>✕</button></div>)}
      <button className="rounded-md border px-3 py-1 text-sm" onClick={() => onChange([...value, ""])}>+ Add Feature</button>
    </div>
  );
}
