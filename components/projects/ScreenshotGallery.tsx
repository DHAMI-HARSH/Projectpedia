/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";

export default function ScreenshotGallery({ urls }: { urls: string[] }) {
  const [i, setI] = useState<number | null>(null);
  return (
    <>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">{urls.map((u, idx) => <button key={u + idx} onClick={() => setI(idx)} className="h-44 overflow-hidden rounded-lg border"><img alt="" className="h-full w-full object-cover" loading="lazy" src={u} /></button>)}</div>
      {i !== null ? <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80" onClick={() => setI(null)}><div className="h-[70vh] w-[80vw]"><img alt="" className="h-full w-full object-contain" src={urls[i]} /></div></div> : null}
    </>
  );
}
