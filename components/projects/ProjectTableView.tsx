"use client";
import { Project } from "@/types/project";
import { ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import StatusBadge from "./StatusBadge";
import TechChip from "./TechChip";
import { normalizeExternalUrl } from "@/lib/utils";

type Key = "title" | "status" | "start_date";
export default function ProjectTableView({ projects }: { projects: Project[] }) {
  const [key, setKey] = useState<Key>("title");
  const [asc, setAsc] = useState(true);
  const rows = useMemo(
    () =>
      [...projects]
        .sort((a, b) => `${a[key] ?? ""}`.localeCompare(`${b[key] ?? ""}`) * (asc ? 1 : -1))
        .map((project) => ({
          ...project,
          githubUrl: normalizeExternalUrl(project.github_url),
          liveUrl: normalizeExternalUrl(project.live_url),
        })),
    [projects, key, asc],
  );
  const headers: { key?: Key; label: string }[] = [
    { label: "#" },
    { key: "title", label: "Name" },
    { label: "Category" },
    { key: "status", label: "Status" },
    { label: "Tech Stack" },
    { key: "start_date", label: "Start Date" },
    { label: "Links" },
  ];
  return (
    <div className="overflow-hidden rounded-[26px] border border-white/70 bg-white/95 shadow-[0_18px_50px_rgba(15,35,61,0.06)]">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--panel-muted)] text-left">
            {headers.map((h) => <th key={h.label} className={`p-3 ${h.key ? "cursor-pointer" : ""}`} onClick={() => { if (!h.key) return; setKey(h.key); setAsc(h.key === key ? !asc : true); }}>{h.label}{h.key ? <ArrowUpDown className="ml-1 inline h-3 w-3" /> : null}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((p, i) => (
            <tr key={p.id} className="border-b border-[var(--border)] align-top hover:bg-[var(--panel-muted)]">
              <td className="p-3">{i + 1}</td>
              <td className="p-3 font-medium">{p.title}</td>
              <td className="p-3 capitalize text-[var(--text-secondary)]">{p.category}</td>
              <td className="p-3"><StatusBadge status={p.status} /></td>
              <td className="p-3"><div className="flex flex-wrap gap-2">{p.tech_stack.slice(0, 3).map((t) => <TechChip key={t} label={t} />)}</div></td>
              <td className="p-3 text-[var(--text-secondary)]">{p.start_date ?? "-"}</td>
              <td className="p-3 text-[var(--text-secondary)]">
                <div className="flex flex-wrap gap-3">
                  {p.liveUrl ? <a className="font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]" href={p.liveUrl} rel="noreferrer" target="_blank">Live</a> : null}
                  {p.githubUrl ? <a className="font-medium text-[var(--accent)] hover:text-[var(--accent-hover)]" href={p.githubUrl} rel="noreferrer" target="_blank">GitHub</a> : null}
                  {!p.liveUrl && !p.githubUrl ? <span>-</span> : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
