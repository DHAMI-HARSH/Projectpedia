/* eslint-disable @next/next/no-img-element */
import Sidebar from "@/components/layout/Sidebar";
import TableOfContents from "@/components/layout/TableOfContents";
import DocRenderer from "@/components/projects/DocRenderer";
import MilestoneTimeline from "@/components/projects/MilestoneTimeline";
import ScreenshotGallery from "@/components/projects/ScreenshotGallery";
import StatusBadge from "@/components/projects/StatusBadge";
import TechChip from "@/components/projects/TechChip";
import { supabaseAdmin } from "@/lib/supabase-server";
import { Project } from "@/types/project";
import { ExternalLink, GitBranch } from "lucide-react";

export const revalidate = 60;

export async function generateStaticParams() {
  const { data } = await supabaseAdmin.from("projects").select("slug");
  return (data ?? []).map((p) => ({ slug: p.slug as string }));
}

export default async function ProjectDocPage({ params }: { params: { slug: string } }) {
  const { data: projects } = await supabaseAdmin.from("projects").select("*").order("created_at", { ascending: false });
  const { data: project } = await supabaseAdmin.from("projects").select("*").eq("slug", params.slug).single();
  if (!project) return <div>Not found</div>;
  const { data: milestones } = await supabaseAdmin.from("milestones").select("*").eq("project_id", project.id).order("order_index");

  return (
    <div id="top">
      <Sidebar projects={(projects ?? []) as Project[]} />
      <div className="mx-auto flex max-w-[1380px] gap-6 lg:ml-[320px]">
        <main className="max-w-4xl flex-1 p-6">
          <section className="motion-enter mb-6 rounded-[30px] border border-white/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(224,242,254,0.92),rgba(255,237,213,0.88))] p-6 shadow-[0_24px_80px_rgba(15,35,61,0.08)]">
            <h1 className="display mb-3 text-4xl font-semibold">{project.title}</h1>
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <StatusBadge status={project.status} />
              <span className="mono rounded-full border border-[var(--border)] bg-white/80 px-3 py-1 text-xs text-[var(--text-muted)]">{project.slug}</span>
            </div>
            {project.short_desc ? <p className="max-w-3xl text-lg leading-8 text-[var(--text-secondary)]">{project.short_desc}</p> : null}
            {!!project.tech_stack?.length && <div className="mt-5 flex flex-wrap gap-2">{project.tech_stack.map((t: string) => <TechChip key={t} label={t} />)}</div>}
            {project.live_url || project.github_url ? (
              <div className="mt-5 flex flex-wrap gap-3">
                {project.live_url ? (
                  <a className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(15,118,110,0.18)] hover:bg-[var(--accent-hover)]" href={project.live_url} rel="noreferrer" target="_blank">
                    <ExternalLink className="h-4 w-4" />
                    View Live Project
                  </a>
                ) : null}
                {project.github_url ? (
                  <a className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-white px-4 py-2 text-sm font-semibold text-[var(--text-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)]" href={project.github_url} rel="noreferrer" target="_blank">
                    <GitBranch className="h-4 w-4" />
                    View Source
                  </a>
                ) : null}
              </div>
            ) : null}
          </section>
          {project.cover_image ? <div className="mb-6 h-80 overflow-hidden rounded-[28px] border border-white/70 shadow-[0_18px_50px_rgba(15,35,61,0.08)]"><img alt={project.title} className="h-full w-full object-cover" loading="lazy" src={project.cover_image} /></div> : null}
          <div className="rounded-[28px] border border-white/70 bg-white/95 p-6 shadow-[0_18px_50px_rgba(15,35,61,0.06)]">
            {project.documentation ? <DocRenderer content={project.documentation} /> : null}
            {project.notes ? <section className="mt-8"><h2 className="mb-3 text-xl font-semibold">Notes</h2><p className="leading-7 text-[var(--text-secondary)]">{project.notes}</p></section> : null}
            {!!project.features?.length && <section className="mt-8"><h2 className="mb-3 text-xl font-semibold">Features</h2><div className="space-y-2">{project.features.map((f: string) => <p key={f} className="text-[var(--text-secondary)]">+ {f}</p>)}</div></section>}
            {!!milestones?.length && <section className="mt-8"><h2 id="timeline" className="mb-3 text-xl font-semibold">Timeline</h2><MilestoneTimeline milestones={milestones} /></section>}
            {!!project.screenshots?.length && <section className="mt-8"><h2 id="screenshots" className="mb-3 text-xl font-semibold">Screenshots</h2><ScreenshotGallery urls={project.screenshots} /></section>}
          </div>
        </main>
        <TableOfContents items={["timeline", "screenshots"]} />
      </div>
    </div>
  );
}
