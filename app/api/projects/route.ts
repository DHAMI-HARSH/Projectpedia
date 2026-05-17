import { isAdminRequestAuthenticated } from "@/lib/admin-auth";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import { slugify } from "@/lib/utils";
import { Milestone } from "@/types/project";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get("category");
  const status = req.nextUrl.searchParams.get("status");
  const slug = req.nextUrl.searchParams.get("slug");
  let q = supabase.from("projects").select("*").order("created_at", { ascending: false });
  if (category) q = q.eq("category", category);
  if (status) q = q.eq("status", status);
  if (slug) q = q.eq("slug", slug);
  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  if (!(await isAdminRequestAuthenticated(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const milestones = body.milestones ?? [];
  const payload = { ...body, slug: slugify(body.title) };
  delete payload.milestones;
  const { data, error } = await supabaseAdmin.from("projects").insert(payload).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (milestones.length) {
    await supabaseAdmin.from("milestones").insert(
      milestones.map((m: Partial<Milestone>, i: number) => ({ ...m, project_id: data.id, order_index: i })),
    );
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/api/projects");
  revalidatePath(`/projects/${data.slug}`);

  return NextResponse.json(data);
}
