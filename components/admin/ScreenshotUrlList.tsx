/* eslint-disable @next/next/no-img-element */
"use client";

export default function ScreenshotUrlList({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const set = (i: number, val: string) => onChange(value.map((x, idx) => (idx === i ? val : x)));

  return (
    <div className="space-y-2">
      {value.map((u, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            className="flex-1 rounded-md border px-3 py-2 text-sm"
            onChange={(e) => set(i, e.target.value)}
            placeholder="https://"
            value={u}
          />
          {u ? (
            <div className="h-10 w-16 overflow-hidden rounded border">
              <img alt="" className="h-full w-full object-cover" loading="lazy" src={u} />
            </div>
          ) : null}
          <button onClick={() => onChange(value.filter((_, idx) => idx !== i))} type="button">
            x
          </button>
        </div>
      ))}
      {value.length < 10 ? (
        <button className="rounded-md border px-3 py-1 text-sm" onClick={() => onChange([...value, ""])} type="button">
          + Add Screenshot
        </button>
      ) : null}
    </div>
  );
}
