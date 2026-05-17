import ProjectForm from "@/components/admin/ProjectForm";
import { requireAdminSession } from "@/lib/admin-auth";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  await requireAdminSession();

  const { data } = await supabase.from("projects").select("*").eq("id", params.id).single();
  if (!data) {
    notFound();
  }

  const { data: milestones } = await supabase.from("milestones").select("*").eq("project_id", params.id).order("order_index");
  return <ProjectForm mode="edit" project={{ ...data, milestones: milestones ?? [] }} />;
}
