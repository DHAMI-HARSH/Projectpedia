"use client";

import MobileSidebarDrawer from "../layout/MobileSidebarDrawer";
import Sidebar from "../layout/Sidebar";
import { Project } from "@/types/project";
import { Layers3, Menu, Search } from "lucide-react";
import { useMemo, useState } from "react";

type TechGroup = {
  count: number;
  projects: Project[];
  tech: string;
};

function twoDigit(value: number) {
  return String(value).padStart(2, "0");
}

export default function TechStacksClient({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const stacks = useMemo(() => {
    const map = new Map<string, Project[]>();

    for (const project of projects) {
      for (const tech of project.tech_stack ?? []) {
        const key = tech.trim();
        if (!key) continue;
        const list = map.get(key) ?? [];
        list.push(project);
        map.set(key, list);
      }
    }

    return Array.from(map.entries())
      .map(([tech, items]): TechGroup => ({ tech, projects: items, count: items.length }))
      .sort((a, b) => b.count - a.count || a.tech.localeCompare(b.tech));
  }, [projects]);

  const filteredStacks = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return stacks;

    return stacks.filter((stack) => {
      const haystack = [stack.tech, ...stack.projects.map((p) => p.title), ...stack.projects.map((p) => p.category)]
        .join(" ")
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [search, stacks]);

  const stats = useMemo(() => {
    const uniqueTechs = stacks.length;
    const totalLinks = stacks.reduce((sum, stack) => sum + stack.count, 0);
    const topTech = stacks[0];

    return {
      totalLinks,
      topTech: topTech ? `${topTech.tech} (${twoDigit(topTech.count)})` : "None",
      uniqueTechs,
    };
  }, [stacks]);

  return (
    <div className="min-h-screen bg-[#f4f6fb] text-[var(--text-primary)]">
      <Sidebar search={search} onSearchChange={setSearch} />
      <MobileSidebarDrawer open={open} onClose={() => setOpen(false)} search={search} onSearchChange={setSearch} />

      <main className="min-h-screen lg:pl-[320px]">
        <div className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 backdrop-blur">
          <div className="flex items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <button
              aria-label="Open navigation"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm hover:bg-slate-50 lg:hidden"
              onClick={() => setOpen(true)}
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="flex min-w-0 flex-1 items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-[#0f4fcf]">
                <Layers3 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">Public catalog</p>
                <h1 className="text-2xl font-medium tracking-[-0.03em] text-slate-950">Tech Stacks</h1>
              </div>
            </div>

            <label className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-500 shadow-sm sm:flex">
              <Search className="h-4 w-4" />
              <input
                className="w-64 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search stacks..."
                value={search}
              />
            </label>
          </div>
        </div>

        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <section className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[20px] border border-slate-300 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
              <p className="font-mono text-lg uppercase tracking-[0.18em] text-slate-700">Unique Tech</p>
              <p className="mt-4 text-3xl font-medium tracking-[-0.04em] text-slate-950">{twoDigit(stats.uniqueTechs)}</p>
            </div>
            <div className="rounded-[20px] border border-slate-300 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
              <p className="font-mono text-lg uppercase tracking-[0.18em] text-slate-700">Total Links</p>
              <p className="mt-4 text-3xl font-medium tracking-[-0.04em] text-[#0f4fcf]">{twoDigit(stats.totalLinks)}</p>
            </div>
            <div className="rounded-[20px] border border-slate-300 bg-white p-6 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
              <p className="font-mono text-lg uppercase tracking-[0.18em] text-slate-700">Most Used</p>
              <p className="mt-4 text-lg font-medium tracking-[-0.03em] text-slate-950">{stats.topTech}</p>
            </div>
          </section>

          <section className="mt-10">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-medium tracking-[-0.03em] text-slate-950">Stack Library</h2>
                <span className="rounded-full bg-slate-200 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-600">
                  {twoDigit(filteredStacks.length)} items
                </span>
              </div>
            </div>

            <div className="mt-6">
              {filteredStacks.length === 0 ? (
                <div className="rounded-[24px] border border-slate-200 bg-white p-10 text-center text-slate-500 shadow-sm">
                  No tech stacks found for the current search.
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {filteredStacks.map((stack) => (
                    <article key={stack.tech} className="rounded-[26px] border border-slate-300 bg-white p-5 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500">Technology</p>
                          <h3 className="mt-2 text-xl font-semibold tracking-[-0.03em] text-slate-950">{stack.tech}</h3>
                        </div>
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0f4fcf]">
                          {twoDigit(stack.count)}
                        </span>
                      </div>

                      <div className="mt-5 space-y-2">
                        {stack.projects.slice(0, 4).map((project) => (
                          <a
                            key={project.id}
                            href={`/projects/${project.slug}`}
                            className="block rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-slate-950"
                          >
                            {project.title}
                          </a>
                        ))}
                      </div>

                      {stack.projects.length > 4 ? (
                        <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-500">
                          +{stack.projects.length - 4} more projects
                        </p>
                      ) : null}
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
