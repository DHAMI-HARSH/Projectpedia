/* eslint-disable @next/next/no-img-element */
import { formatDate, getCategoryColor, normalizeExternalUrl } from "@/lib/utils";
import { Project } from "@/types/project";
import Link from "next/link";
import { Globe, GitBranch } from "lucide-react";
import StatusBadge from "./StatusBadge";
import TechChip from "./TechChip";

export default function ProjectCard({ project }: { project: Project }) {
  const liveUrl = normalizeExternalUrl(project.live_url);
  const githubUrl = normalizeExternalUrl(project.github_url);

  return (
    <article className="hover-lift surface-glow motion-enter rounded-[28px] border border-white/70 bg-white/95 p-4 shadow-[0_18px_55px_rgba(15,35,61,0.06)]">
      <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded-[22px] bg-zinc-100">
        {project.cover_image ? <img alt={project.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]" loading="lazy" src={project.cover_image} /> : null}
      </div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${getCategoryColor(project.category)}`}>{project.category}</span>
        <StatusBadge status={project.status} />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-[var(--text-primary)]">{project.title}</h3>
      <p className="mb-3 line-clamp-2 text-sm leading-6 text-[var(--text-secondary)]">{project.short_desc}</p>
      <div className="mb-3 flex flex-wrap gap-2">{project.tech_stack?.slice(0, 4).map((t) => <TechChip key={t} label={t} />)}</div>
      <p className="mono mb-3 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">{formatDate(project.start_date)} {project.end_date ? `to ${formatDate(project.end_date)}` : ""}</p>
      <div className="flex flex-wrap items-center gap-3">
        <Link href={`/projects/${project.slug}`} className="inline-flex items-center text-sm font-semibold text-[var(--accent)] hover:text-[var(--accent-hover)]">
          View Documentation &rarr;
        </Link>
        {liveUrl ? (
          <a className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)]" href={liveUrl} rel="noreferrer" target="_blank">
            <Globe className="h-4 w-4" />
            Live
          </a>
        ) : null}
        {githubUrl ? (
          <a className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent)]" href={githubUrl} rel="noreferrer" target="_blank">
            <GitBranch className="h-4 w-4" />
            Code
          </a>
        ) : null}
      </div>
    </article>
  );
}
