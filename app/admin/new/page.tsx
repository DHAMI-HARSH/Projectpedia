import ProjectForm from "@/components/admin/ProjectForm";
import { requireAdminSession } from "@/lib/admin-auth";

export default async function NewProjectPage() {
  await requireAdminSession();

  return <ProjectForm mode="create" />;
}
