import { Project } from "@/types/project";
import Link from "next/link";
import StatusBadge from "./StatusBadge";
import TechChip from "./TechChip";

export default function ProjectListRow({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="hover-lift grid grid-cols-12 items-center gap-3 rounded-[24px] border border-white/70 bg-white/95 p-4 shadow-[0_12px_36px_rgba(15,35,61,0.05)] hover:bg-[var(--accent-bg)]">
      <div className="col-span-12 md:col-span-4">
        <p className="text-lg font-semibold">{project.title}</p>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">{project.short_desc}</p>
      </div>
      <div className="col-span-12 flex flex-wrap gap-2 md:col-span-4">
        {project.tech_stack.slice(0, 3).map((t) => <TechChip key={t} label={t} />)}
      </div>
      <div className="col-span-8 md:col-span-2"><StatusBadge status={project.status} /></div>
      <div className="col-span-4 text-right text-lg font-semibold text-[var(--accent)] md:col-span-2">&rarr;</div>
    </Link>
  );
}
