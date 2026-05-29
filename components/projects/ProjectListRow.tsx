/* eslint-disable @next/next/no-img-element */
import { Project } from "@/types/project";
import { ExternalLink, GitBranch } from "lucide-react";
import Link from "next/link";
import StatusBadge from "./StatusBadge";
import TechChip from "./TechChip";

export default function ProjectListRow({ project }: { project: Project }) {
  return (
    <article className="rounded-[26px] border border-slate-300 bg-white p-5 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
      <div className="grid gap-5 lg:grid-cols-[180px_minmax(0,1fr)_170px] lg:items-center">
        <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-[linear-gradient(135deg,#f8fafc,#e2e8f0)]">
          {project.cover_image ? (
            <img alt={project.title} className="h-full min-h-[140px] w-full object-cover" loading="lazy" src={project.cover_image} />
          ) : (
            <div className="flex min-h-[140px] items-center justify-center px-6 text-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">{project.category}</p>
                <p className="mt-2 text-sm font-medium text-slate-700">{project.status}</p>
              </div>
            </div>
          )}
        </div>

        <div className="min-w-0">
          <div className="flex flex-col gap-3 lg:pr-4">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <Link href={`/projects/${project.slug}`} className="block text-[1.35rem] font-medium tracking-[-0.03em] text-slate-950 hover:text-[#0f4fcf]">
                  {project.title}
                </Link>
                <p className="mt-2 max-w-3xl text-[15px] leading-7 text-slate-600">{project.short_desc}</p>
              </div>
              <div className="hidden shrink-0 lg:block">
                <StatusBadge status={project.status} />
              </div>
            </div>
            {!!project.tech_stack?.length ? (
              <div className="flex flex-wrap gap-2">
                {project.tech_stack.slice(0, 4).map((tech) => (
                  <TechChip key={tech} label={tech} />
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 lg:items-end">
          <div className="lg:hidden">
            <StatusBadge status={project.status} />
          </div>

          <div className="flex flex-wrap items-center gap-5 text-sm font-semibold">
            <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 text-[#0f4fcf] hover:text-[#0d45b3]">
              Docs
            </Link>
            {project.live_url ? (
              <a className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-950" href={project.live_url} rel="noreferrer" target="_blank">
                <ExternalLink className="h-4 w-4" />
                Live
              </a>
            ) : null}
            {project.github_url ? (
              <a className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-950" href={project.github_url} rel="noreferrer" target="_blank">
                <GitBranch className="h-4 w-4" />
                Code
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}
