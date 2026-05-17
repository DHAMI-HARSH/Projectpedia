import AdminProjectsClient from "@/components/admin/AdminProjectsClient";
import { requireAdminSession } from "@/lib/admin-auth";
import { supabase } from "@/lib/supabase";
import { Project } from "@/types/project";

export default async function AdminPage() {
  await requireAdminSession();

  const { data } = await supabase.from("projects").select("*").order("updated_at", { ascending: false });

  return <AdminProjectsClient initialProjects={(data ?? []) as Project[]} />;
}
