export interface Milestone {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  date?: string;
  order_index: number;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: "web" | "mobile" | "ai-ml" | "open-source" | "other";
  status: "live" | "in-progress" | "archived";
  short_desc: string;
  documentation: string;
  live_url?: string;
  github_url?: string;
  cover_image?: string;
  screenshots: string[];
  tech_stack: string[];
  features: string[];
  notes?: string;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
  milestones?: Milestone[];
}
