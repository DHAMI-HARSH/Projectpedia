import { supabaseAdmin } from "../lib/supabase";
import { slugify } from "../lib/utils";

const seed = [
  { title: "Projectpedia", category: "web", status: "live", short_desc: "Documentation hub.", documentation: "## Overview\nProject docs platform.", tech_stack: ["Next.js", "TypeScript", "Supabase", "Tailwind", "NextAuth"], screenshots: ["https://picsum.photos/seed/p1/800/500"], features: ["Project docs", "Admin panel", "Filters"], milestones: [{ title: "MVP", description: "First release", date: "2026-01-20" }] },
  { title: "BudgetFlow", category: "mobile", status: "in-progress", short_desc: "Budget tracking app.", documentation: "## Progress\nBuilding core flows.", tech_stack: ["React Native", "Expo", "Supabase", "TypeScript"], screenshots: ["https://picsum.photos/seed/p2/800/500"], features: ["Budgeting"] },
  { title: "NeuralNotes", category: "ai-ml", status: "archived", short_desc: "AI note summarizer.", documentation: "## Notes\nArchived experiment.", tech_stack: ["Python", "FastAPI", "Transformers", "Postgres", "Docker", "Redis"], screenshots: ["https://picsum.photos/seed/p3/800/500"], features: ["Summaries"] },
  { title: "OpenKit UI", category: "open-source", status: "live", short_desc: "Open component library.", documentation: "## Components\nReusable kit.", tech_stack: ["React", "TypeScript", "Storybook", "Vite", "pnpm"], screenshots: ["https://picsum.photos/seed/p4/800/500"], features: ["Components"] },
];

async function run() {
  for (const p of seed) {
    const { data } = await supabaseAdmin.from("projects").insert({ ...p, slug: slugify(p.title), milestones: undefined }).select("*").single();
    if (data && p.milestones?.length) {
      await supabaseAdmin.from("milestones").insert(p.milestones.map((m, i) => ({ ...m, project_id: data.id, order_index: i })));
    }
  }
  console.log("Seed completed");
}

run();
