import { isAdminRequestAuthenticated } from "@/lib/admin-auth";
import { supabaseAdmin } from "@/lib/supabase-server";
import { normalizeExternalUrl, slugify } from "@/lib/utils";
import { Milestone } from "@/types/project";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { data: project, error } = await supabaseAdmin.from("projects").select("*").eq("id", params.id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  const { data: milestones } = await supabaseAdmin
    .from("milestones")
    .select("*")
    .eq("project_id", params.id)
    .order("order_index", { ascending: true });
  return NextResponse.json({ ...project, milestones: milestones ?? [] });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdminRequestAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: existingProject } = await supabaseAdmin.from("projects").select("slug").eq("id", params.id).single();
  const body = await req.json();
  const milestones = body.milestones ?? [];
  delete body.milestones;
  const payload = body.title
    ? { ...body, github_url: normalizeExternalUrl(body.github_url), live_url: normalizeExternalUrl(body.live_url), slug: slugify(body.title) }
    : { ...body, github_url: normalizeExternalUrl(body.github_url), live_url: normalizeExternalUrl(body.live_url) };
  const { data, error } = await supabaseAdmin.from("projects").update(payload).eq("id", params.id).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await supabaseAdmin.from("milestones").delete().eq("project_id", params.id);
  if (milestones.length) {
    await supabaseAdmin.from("milestones").insert(
      milestones.map((m: Partial<Milestone>, i: number) => ({ ...m, project_id: params.id, order_index: i })),
    );
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/api/projects");
  if (existingProject?.slug) {
    revalidatePath(`/projects/${existingProject.slug}`);
  }
  if (data?.slug) {
    revalidatePath(`/projects/${data.slug}`);
  }

  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  if (!(await isAdminRequestAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data: existingProject } = await supabaseAdmin.from("projects").select("slug").eq("id", params.id).single();
  const { error } = await supabaseAdmin.from("projects").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/api/projects");
  if (existingProject?.slug) {
    revalidatePath(`/projects/${existingProject.slug}`);
  }

  return NextResponse.json({ ok: true });
}
