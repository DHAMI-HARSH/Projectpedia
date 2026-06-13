"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderOpen, LayoutGrid, Layers3, Search, Shield, Sparkles } from "lucide-react";

type SidebarProps = {
  mobile?: boolean;
  onSearchChange?: (value: string) => void;
  search?: string;
};

function navClass(active?: boolean) {
  return `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
    active ? "bg-[#0f4fcf] text-white shadow-[0_14px_30px_rgba(15,79,207,0.25)]" : "text-slate-300 hover:bg-white/6 hover:text-white"
  }`;
}

export default function Sidebar({ mobile = false, search = "", onSearchChange }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={`${mobile ? "relative h-full w-full" : "fixed inset-y-0 left-0 hidden w-[320px] lg:flex"} z-30 overflow-hidden bg-[#0b1320] text-white`}
    >
      <div className="flex h-full w-full flex-col border-r border-white/10 bg-[linear-gradient(180deg,#0b1320_0%,#09101b_100%)] px-5 py-5">
        <div className="flex items-center gap-3 px-1 pt-1">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0f4fcf] text-white shadow-[0_10px_24px_rgba(15,79,207,0.28)]">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-400">Projectpedia</p>
            <h1 className="text-xl font-semibold tracking-[-0.04em] text-white">Projectpedia</h1>
          </div>
        </div>

        <label className="mt-10 flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-slate-400 shadow-inner shadow-black/10">
          <Search className="h-4 w-4 shrink-0" />
          <input
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 outline-none"
            onChange={onSearchChange ? (e) => onSearchChange(e.target.value) : undefined}
            placeholder="Quick search..."
            readOnly={!onSearchChange}
            value={search}
          />
        </label>

        <nav className="mt-8 space-y-2">
          <Link className={navClass(pathname === "/")} href="/">
            <LayoutGrid className="h-4 w-4" />
            Dashboard
          </Link>
          <Link className={navClass(pathname.startsWith("/projects"))} href="/projects">
            <FolderOpen className="h-4 w-4" />
            Projects
          </Link>
          <Link className={navClass(pathname === "/tech-stacks")} href="/tech-stacks">
            <Layers3 className="h-4 w-4" />
            Tech Stacks
          </Link>
        </nav>

        <div className="mt-auto pt-6">
          <Link
            className="flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/20 hover:bg-white/10"
            href="/admin"
          >
            <Shield className="h-4 w-4" />
            Open Admin
          </Link>
        </div>
      </div>
    </aside>
  );
}
