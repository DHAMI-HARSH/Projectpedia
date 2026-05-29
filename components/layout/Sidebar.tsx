"use client";

import { Project } from "@/types/project";
import { FolderOpen, HelpCircle, LayoutGrid, Layers3, Plus, Search, Settings, Sparkles } from "lucide-react";
import Link from "next/link";

type SidebarProps = {
  mobile?: boolean;
  onSearchChange?: (value: string) => void;
  projects?: Project[];
  search?: string;
};

function navClass(active?: boolean) {
  return `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
    active ? "bg-[#0f4fcf] text-white shadow-[0_14px_30px_rgba(15,79,207,0.25)]" : "text-slate-300 hover:bg-white/6 hover:text-white"
  }`;
}

export default function Sidebar({ mobile = false, projects = [], search = "", onSearchChange }: SidebarProps) {
  const query = search.trim().toLowerCase();
  const recentProjects = (query
    ? projects.filter((project) =>
        [project.title, project.short_desc, project.category, project.status, ...(project.tech_stack ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(query),
      )
    : projects
  ).slice(0, 4);

  return (
    <aside
      className={`${mobile ? "relative h-full w-full" : "fixed inset-y-0 left-0 hidden w-[320px] lg:flex"} z-30 overflow-hidden bg-[#0b1320] text-white`}
    >
      <div className="scrollbar-hidden flex h-full w-full min-h-0 flex-col overflow-y-auto border-r border-white/10 bg-[linear-gradient(180deg,#0b1320_0%,#09101b_100%)] px-5 py-5">
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
          <Link className={navClass(true)} href="/">
            <LayoutGrid className="h-4 w-4" />
            Dashboard
          </Link>
          <Link className={navClass()} href="/admin">
            <FolderOpen className="h-4 w-4" />
            Projects
          </Link>
          <Link className={navClass()} href="/#tech-stack">
            <Layers3 className="h-4 w-4" />
            Tech Stacks
          </Link>
          <Link className={navClass()} href="/admin">
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>

        <Link
          className="mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-[#0f4fcf] px-5 py-4 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(15,79,207,0.28)] transition hover:bg-[#0d45b3]"
          href="/admin/new"
        >
          <Plus className="h-4 w-4" />
          New Project
        </Link>

        <div className="scrollbar-hidden mt-8 min-h-0 flex-1 overflow-y-auto">
          <div className="mb-3 flex items-center justify-between px-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
            <span>Recent</span>
            <span>{String(recentProjects.length).padStart(2, "0")}</span>
          </div>
          <div className="space-y-2 pr-1">
            {recentProjects.length === 0 ? (
              <div className="rounded-2xl border border-white/8 bg-white/4 px-4 py-3 text-sm text-slate-400">
                No projects yet.
              </div>
            ) : (
              recentProjects.map((project) => (
                <Link
                  key={project.id}
                  className="block rounded-2xl border border-white/8 bg-white/4 px-4 py-3 transition hover:border-white/14 hover:bg-white/8"
                  href={`/projects/${project.slug}`}
                >
                  <p className="text-sm font-medium text-white">{project.title}</p>
                  <p className="mt-1 text-xs text-slate-400">{project.category}</p>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="mt-6 border-t border-white/8 pt-5">
          <Link className="flex items-center gap-3 text-sm text-slate-400 transition hover:text-white" href="/admin">
            <HelpCircle className="h-4 w-4" />
            Support
          </Link>
        </div>
      </div>
    </aside>
  );
}
