"use client";
export default function TableOfContents({ items }: { items: string[] }) {
  return (
    <aside className="sticky top-24 hidden w-[220px] self-start rounded-lg border bg-white p-3 xl:block">
      <p className="mb-2 text-sm font-semibold">On this page</p>
      <div className="space-y-1 text-sm">{items.map((x) => <a key={x} href={`#${x}`} className="block text-[var(--text-secondary)] hover:text-[var(--accent)]">{x}</a>)}</div>
      <a href="#top" className="mt-3 block text-xs text-[var(--accent)]">↑ Back to top</a>
    </aside>
  );
}
