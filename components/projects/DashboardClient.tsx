"use client";

import MobileSidebarDrawer from "../layout/MobileSidebarDrawer";
import Sidebar from "../layout/Sidebar";
import ProjectCard from "./ProjectCard";
import ProjectListRow from "./ProjectListRow";
import { Project } from "@/types/project";
import { Bell, ChevronDown, LayoutGrid, List, Menu } from "lucide-react";
import { useMemo, useState } from "react";

type Tab = "overview" | "recent" | "starred" | "archived";
type View = "list" | "grid";

function twoDigit(value: number) {
  return String(value).padStart(2, "0");
}

function matchesSearch(project: Project, query: string) {
  if (!query) return true;
  const haystack = [
    project.title,
    project.short_desc,
    project.category,
    project.status,
    ...(project.tech_stack ?? []),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

export default function DashboardClient({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("recent");
  const [view, setView] = useState<View>("list");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  const stats = useMemo(() => {
    const techCount = new Set(projects.flatMap((p) => p.tech_stack ?? [])).size;
    return {
      live: projects.filter((p) => p.status === "live").length,
      ongoing: projects.filter((p) => p.status === "in-progress").length,
      techCount,
      total: projects.length,
    };
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const base = [...projects].sort((a, b) => {
      const aTime = new Date(a.created_at).getTime();
      const bTime = new Date(b.created_at).getTime();
      return bTime - aTime;
    });

    let items = base.filter((project) => matchesSearch(project, search));

    if (tab === "archived") {
      items = items.filter((project) => project.status === "archived");
    }
    if (tab === "starred") {
      items = items.filter((project) => project.status === "live" || Boolean(project.live_url));
    }

    if (status !== "all") {
      items = items.filter((project) => project.status === status);
    }
    if (category !== "all") {
      items = items.filter((project) => project.category === category);
    }

    return items;
  }, [projects, search, tab, status, category]);

  const tabItems: Array<{ id: Tab; label: string; count: number }> = [
    { id: "overview", label: "Overview", count: stats.total },
    { id: "recent", label: "Recent", count: Math.min(stats.total, 99) },
    { id: "starred", label: "Starred", count: projects.filter((p) => p.status === "live" || Boolean(p.live_url)).length },
    { id: "archived", label: "Archived", count: projects.filter((p) => p.status === "archived").length },
  ];

  return (
    <div className="min-h-screen bg-[#f4f6fb] text-[var(--text-primary)]">
      <Sidebar projects={projects} search={search} onSearchChange={setSearch} />
      <MobileSidebarDrawer open={open} onClose={() => setOpen(false)} projects={projects} search={search} onSearchChange={setSearch} />

      <main className="min-h-screen lg:pl-[320px]">
        <div className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
          <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <button
              aria-label="Open navigation"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 lg:hidden"
              onClick={() => setOpen(true)}
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
              {tabItems.map((item) => (
                <button
                  key={item.id}
                  className={`relative whitespace-nowrap px-3 py-2 text-sm font-medium transition ${
                    tab === item.id ? "text-[#0f4fcf]" : "text-slate-600 hover:text-slate-900"
                  }`}
                  onClick={() => setTab(item.id)}
                  type="button"
                >
                  {item.label}
                  <span
                    className={`ml-2 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                      tab === item.id ? "bg-blue-50 text-[#0f4fcf]" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {twoDigit(item.count)}
                  </span>
                  {tab === item.id ? <span className="absolute inset-x-3 -bottom-4 h-0.5 rounded-full bg-[#0f4fcf]" /> : null}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                aria-label="Notifications"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50"
                type="button"
              >
                <Bell className="h-5 w-5" />
              </button>
              <button
                aria-label="User menu"
                className="h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-slate-200 shadow-sm"
                type="button"
              >
                <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#e2e8f0,#cbd5e1)] text-xs font-semibold text-slate-700">
                  JD
                </div>
              </button>
            </div>
          </div>
        </div>

        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-[20px] border border-slate-300 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
              <p className="font-mono text-lg uppercase tracking-[0.18em] text-slate-700">Total Projects</p>
              <p className="mt-4 text-3xl font-medium tracking-[-0.04em] text-slate-950">{twoDigit(stats.total)}</p>
            </div>
            <div className="rounded-[20px] border border-slate-300 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
              <p className="font-mono text-lg uppercase tracking-[0.18em] text-slate-700">Live</p>
              <p className="mt-4 text-3xl font-medium tracking-[-0.04em] text-[#0f4fcf]">{twoDigit(stats.live)}</p>
            </div>
            <div className="rounded-[20px] border border-slate-300 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
              <p className="font-mono text-lg uppercase tracking-[0.18em] text-slate-700">Ongoing</p>
              <p className="mt-4 text-3xl font-medium tracking-[-0.04em] text-slate-950">{twoDigit(stats.ongoing)}</p>
            </div>
            <div className="rounded-[20px] border border-slate-300 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
              <p className="font-mono text-lg uppercase tracking-[0.18em] text-slate-700">Tech Stack</p>
              <p className="mt-4 text-3xl font-medium tracking-[-0.04em] text-slate-950">{twoDigit(stats.techCount)}</p>
            </div>
          </section>

          <section className="mt-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-medium tracking-[-0.03em] text-slate-950">Library</h2>
                <span className="rounded-full bg-slate-200 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                  {twoDigit(filteredProjects.length)} items
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-slate-500">
                  <span>All Status</span>
                  <select
                    className="rounded-full border border-transparent bg-transparent text-sm font-medium text-slate-700 outline-none"
                    onChange={(e) => setStatus(e.target.value)}
                    value={status}
                  >
                    <option value="all">All</option>
                    <option value="live">Live</option>
                    <option value="in-progress">In Progress</option>
                    <option value="archived">Archived</option>
                  </select>
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-500">
                  <span>All Categories</span>
                  <select
                    className="rounded-full border border-transparent bg-transparent text-sm font-medium text-slate-700 outline-none"
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
                  <ChevronDown className="h-4 w-4 text-slate-400" />
                </label>
                <div className="hidden h-6 w-px bg-slate-300 sm:block" />
                <div className="flex items-center gap-2">
                  <button
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full border ${
                      view === "grid" ? "border-[#0f4fcf] text-[#0f4fcf]" : "border-slate-300 text-slate-500"
                    } bg-white shadow-sm`}
                    onClick={() => setView("grid")}
                    type="button"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-full border ${
                      view === "list" ? "border-[#0f4fcf] text-[#0f4fcf]" : "border-slate-300 text-slate-500"
                    } bg-white shadow-sm`}
                    onClick={() => setView("list")}
                    type="button"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              {filteredProjects.length === 0 ? (
                <div className="rounded-[24px] border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
                  No projects found for the current filters.
                </div>
              ) : view === "grid" ? (
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProjects.map((project) => (
                    <ProjectListRow key={project.id} project={project} />
                  ))}
                </div>
              )}
            </div>

            <p className="py-16 text-center text-[11px] uppercase tracking-[0.38em] text-slate-400">
              End of archive - {new Date().getFullYear()}
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
