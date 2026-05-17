"use client";
import { LayoutGrid, List, Menu, Table2 } from "lucide-react";

type View = "grid" | "list" | "table";

export default function TopBar({
  onMenu,
  view,
  setView,
  status,
  setStatus,
  category,
  setCategory,
  total,
}: {
  onMenu: () => void;
  view: View;
  setView: (v: View) => void;
  status: string;
  setStatus: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  total: number;
}) {
  const items = [
    { v: "grid" as const, icon: LayoutGrid, label: "Grid" },
    { v: "list" as const, icon: List, label: "List" },
    { v: "table" as const, icon: Table2, label: "Table" },
  ];

  return (
    <div className="glass-topbar sticky top-0 z-40 mb-5 rounded-[20px] border border-white/70 px-4 py-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <button className="rounded-full border border-white/60 bg-white/80 p-2.5 text-[var(--text-secondary)] hover:bg-[var(--accent-bg)] hover:text-[var(--accent)] lg:hidden" onClick={onMenu}>
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Project Workspace</p>
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-lg font-semibold tracking-[-0.03em] text-[var(--text-primary)]">Projectpedia</span>
              <span className="text-sm text-[var(--text-secondary)]">{total} visible projects</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-3 py-2 text-sm text-[var(--text-secondary)]">
              <span>Status</span>
              <select
                className="bg-transparent font-medium text-[var(--text-primary)] outline-none"
                onChange={(e) => setStatus(e.target.value)}
                value={status}
              >
                <option value="all">All</option>
                <option value="live">Live</option>
                <option value="in-progress">In Progress</option>
                <option value="archived">Archived</option>
              </select>
            </label>
            <label className="flex items-center gap-2 rounded-full border border-white/70 bg-white/85 px-3 py-2 text-sm text-[var(--text-secondary)]">
              <span>Category</span>
              <select
                className="bg-transparent font-medium text-[var(--text-primary)] outline-none"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="all">All</option>
                <option value="web">Web</option>
                <option value="mobile">Mobile</option>
                <option value="ai-ml">AI/ML</option>
                <option value="open-source">Open Source</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          <div className="flex items-center gap-2">
            {items.map((it) => (
              <button
                key={it.v}
                onClick={() => setView(it.v)}
                className={`hover-lift inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${
                  view === it.v ? "border-transparent bg-[var(--accent)] text-white shadow-[0_10px_22px_rgba(15,118,110,0.18)]" : "border-white/70 bg-white/85 text-[var(--text-secondary)]"
                }`}
              >
                <it.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{it.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
