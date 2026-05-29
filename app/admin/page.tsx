import AdminProjectsClient from "@/components/admin/AdminProjectsClient";
import { requireAdminSession } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-server";
import { Project } from "@/types/project";

export default async function AdminPage() {
  await requireAdminSession();

  const { data } = await supabaseAdmin.from("projects").select("*").order("updated_at", { ascending: false });

  return <AdminProjectsClient initialProjects={(data ?? []) as Project[]} />;
}
