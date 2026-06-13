import DashboardClient from "@/components/projects/DashboardClient";
import { supabaseAdmin } from "@/lib/supabase-server";
import { Project } from "@/types/project";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const { data } = await supabaseAdmin.from("projects").select("*").order("created_at", { ascending: false });
  const projects = (data ?? []) as Project[];

  return <DashboardClient projects={projects} />;
}
