"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Project } from "@/types/project";

export default function Sidebar({ mobile = false }: { mobile?: boolean }) {
  const [projects, setProjects] = useState<Project[]>([]);
  useEffect(() => {
    fetch("/api/projects", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setProjects(Array.isArray(data) ? data : []))
      .catch(() => setProjects([]));
  }, []);
  return (
    <aside className={`${mobile ? "h-screen" : "fixed h-screen max-lg:hidden lg:block"} left-0 top-0 w-[280px] border-r border-white/10 bg-[var(--sidebar-bg)] p-5 text-[var(--sidebar-text)] shadow-[1px_0_0_0_rgba(255,255,255,0.06)]`}>
      <div className="mb-5 rounded-[20px] border border-white/10 bg-white/5 p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--sidebar-muted)]">Docs Hub</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">Projectpedia</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--sidebar-muted)]">A living gallery of projects, stacks, and release stories.</p>
      </div>
      <input placeholder="Search projects..." className="mb-4 w-full rounded-full border border-white/10 bg-[var(--sidebar-hover)] px-4 py-3 text-sm text-white placeholder:text-[var(--sidebar-muted)]" />
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--sidebar-muted)]">All Projects ({projects.length})</p>
      <div className="space-y-2 overflow-y-auto text-sm">
        {projects.map((p) => (
          <Link key={p.id} href={`/projects/${p.slug}`} className="block rounded-2xl border border-transparent px-3 py-2.5 hover:border-white/10 hover:bg-[var(--sidebar-hover)]">
            <span className="block font-medium text-[var(--sidebar-text)]">{p.title}</span>
            <span className="block text-xs text-[var(--sidebar-muted)]">{p.category}</span>
          </Link>
        ))}
      </div>
      <Link href="/admin" className="absolute bottom-5 left-5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--sidebar-muted)] hover:text-[var(--sidebar-text)]">
        Admin Panel
      </Link>
    </aside>
  );
}
