import Sidebar from "@/components/layout/Sidebar";
import DashboardClient from "@/components/projects/DashboardClient";
import { supabase } from "@/lib/supabase";
import { Project } from "@/types/project";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
  const projects = (data ?? []) as Project[];
  const techCount = new Set(projects.flatMap((p) => p.tech_stack ?? [])).size;
  const featuredTech = Array.from(new Set(projects.flatMap((p) => p.tech_stack ?? []))).slice(0, 5);
  return (
    <div>
      <Sidebar />
      <main className="p-6 lg:ml-[280px]">
        <section className="motion-enter mb-6 rounded-[24px] border border-white/60 bg-[linear-gradient(135deg,rgba(255,255,255,0.97),rgba(233,245,255,0.92),rgba(255,243,229,0.86))] p-6 shadow-[0_20px_60px_rgba(15,35,61,0.06)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Project Atlas</p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-[-0.045em] text-[var(--text-primary)]">Project docs that feel easier to browse.</h1>
              <p className="mt-3 max-w-xl text-base leading-7 text-[var(--text-secondary)]">Browse builds, compare stacks, and track how each project evolves in a cleaner, calmer workspace.</p>
            </div>
            <div className="rounded-[20px] border border-white/70 bg-white/80 p-4 shadow-[0_10px_28px_rgba(15,35,61,0.05)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">Featured Stack</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {featuredTech.map((tech) => (
                  <span key={tech} className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-800">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        <div className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
          <div className="hover-lift surface-glow motion-enter rounded-[20px] border border-zinc-200 bg-white p-5"><p className="text-sm text-zinc-600">Total Projects</p><p className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{projects.length}</p></div>
          <div className="hover-lift surface-glow motion-enter rounded-[20px] border border-emerald-200 bg-emerald-50 p-5"><p className="text-sm text-emerald-700">Completed</p><p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-emerald-800">{projects.filter((p) => p.status === "live").length}</p></div>
          <div className="hover-lift surface-glow motion-enter rounded-[20px] border border-rose-200 bg-rose-50 p-5"><p className="text-sm text-rose-700">Ongoing</p><p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-rose-800">{projects.filter((p) => p.status === "in-progress").length}</p></div>
          <div className="hover-lift surface-glow motion-enter rounded-[20px] border border-sky-200 bg-sky-50 p-5"><p className="text-sm text-sky-700">Tech Count</p><p className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-sky-800">{techCount}</p></div>
        </div>
        <DashboardClient projects={projects} />
      </main>
    </div>
  );
}
