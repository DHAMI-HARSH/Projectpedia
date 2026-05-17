"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Project } from "@/types/project";
import StatusBadge from "../projects/StatusBadge";

export default function AdminProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);

  async function del(id: string) {
    if (!confirm("Delete project?")) return;
    const r = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!r.ok) return toast.error("Delete failed");
    toast.success("Deleted");
    setProjects((x) => x.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 rounded-[22px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(239,246,255,0.92),rgba(254,242,242,0.82))] p-6 shadow-[0_16px_42px_rgba(15,23,42,0.05)] md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Admin Workspace</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.045em] text-[var(--text-primary)]">Project control center</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">Review entries, jump into edits, and manage your catalog from one quieter workspace.</p>
        </div>
        <Link href="/admin/new" className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(14,116,144,0.2)] hover:translate-y-[-1px] hover:bg-[var(--accent-strong)]">
          Add New Project
        </Link>
      </div>

      <div className="overflow-hidden rounded-[22px] border border-[var(--border-strong)] bg-white shadow-[0_14px_34px_rgba(15,23,42,0.05)]">
        <div className="grid grid-cols-[minmax(0,2fr)_120px_140px_140px_140px] gap-4 border-b border-[var(--border)] bg-[var(--panel-muted)] px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)] max-md:hidden">
          <span>Project</span>
          <span>Category</span>
          <span>Status</span>
          <span>Updated</span>
          <span>Actions</span>
        </div>
        <div className="divide-y divide-[var(--border)]">
          {projects.map((p) => (
            <div key={p.id} className="grid gap-4 px-6 py-5 md:grid-cols-[minmax(0,2fr)_120px_140px_140px_140px] md:items-center">
              <div>
                <p className="text-base font-semibold text-[var(--text-primary)]">{p.title}</p>
                <p className="mt-1 line-clamp-1 text-sm text-[var(--text-secondary)]">{p.short_desc}</p>
              </div>
              <div>
                <span className="inline-flex rounded-full border border-[var(--border-strong)] bg-[var(--panel-muted)] px-3 py-1 text-xs font-medium capitalize text-[var(--text-secondary)]">
                  {p.category}
                </span>
              </div>
              <div><StatusBadge status={p.status} /></div>
              <div className="text-sm text-[var(--text-secondary)]">{p.updated_at?.slice(0, 10)}</div>
              <div className="flex items-center gap-3 text-sm">
                <Link href={`/admin/edit/${p.id}`} className="font-medium text-[var(--accent)] hover:text-[var(--accent-strong)]">Edit</Link>
                <button className="font-medium text-rose-600 hover:text-rose-700" onClick={() => del(p.id)}>Delete</button>
              </div>
            </div>
          ))}
          {projects.length === 0 ? (
            <div className="px-6 py-14 text-center text-sm text-[var(--text-secondary)]">No projects are available yet.</div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
