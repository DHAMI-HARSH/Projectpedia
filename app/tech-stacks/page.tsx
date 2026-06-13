import TechStacksClient from "@/components/projects/TechStacksClient";
import { supabaseAdmin } from "@/lib/supabase-server";
import { Project } from "@/types/project";

export const dynamic = "force-dynamic";

export default async function TechStacksPage() {
  const { data } = await supabaseAdmin.from("projects").select("*").order("created_at", { ascending: false });
  const projects = (data ?? []) as Project[];

  return <TechStacksClient projects={projects} />;
}
