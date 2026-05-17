"use client";
import { Project } from "@/types/project";
import { useEffect, useMemo, useState } from "react";
import TopBar from "../layout/TopBar";
import MobileSidebarDrawer from "../layout/MobileSidebarDrawer";
import ProjectCard from "./ProjectCard";
import ProjectListRow from "./ProjectListRow";
import ProjectTableView from "./ProjectTableView";

export default function DashboardClient({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list" | "table">("grid");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [allProjects, setAllProjects] = useState<Project[]>(projects);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadProjects() {
      setLoading(true);
      setLoadError("");

      try {
        const response = await fetch("/api/projects", { cache: "no-store" });
        const data = await response.json();
        if (!active) return;

        if (!response.ok) {
          setLoadError("Could not load the latest projects.");
          return;
        }

        setAllProjects(Array.isArray(data) ? data : []);
      } catch {
        if (active) {
          setLoadError("Could not load the latest projects.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadProjects();

    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(
    () =>
      allProjects.filter(
        (p) => (status === "all" || p.status === status) && (category === "all" || p.category === category),
      ),
    [allProjects, status, category],
  );

  return (
    <>
      <TopBar
        category={category}
        onMenu={() => setOpen(true)}
        setCategory={setCategory}
        setStatus={setStatus}
        setView={setView}
        status={status}
        total={filtered.length}
        view={view}
      />
      <MobileSidebarDrawer open={open} onClose={() => setOpen(false)} />
      {loading ? <div className="mb-4 text-sm text-[var(--text-secondary)]">Refreshing latest projects...</div> : null}
      {loadError ? <div className="mb-4 rounded-[18px] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{loadError}</div> : null}
      {filtered.length === 0 ? <div className="rounded-[20px] border bg-white p-8 text-center text-[var(--text-secondary)]">No projects found</div> : null}
      {view === "grid" ? <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">{filtered.map((p) => <ProjectCard key={p.id} project={p} />)}</div> : null}
      {view === "list" ? <div className="space-y-2">{filtered.map((p) => <ProjectListRow key={p.id} project={p} />)}</div> : null}
      {view === "table" ? <ProjectTableView projects={filtered} /> : null}
    </>
  );
}
