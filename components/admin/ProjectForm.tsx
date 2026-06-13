"use client";

import { Milestone, Project } from "@/types/project";
import MDEditor from "@uiw/react-md-editor";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { normalizeDocumentationInput } from "@/lib/documentation";
import Input from "../ui/Input";
import Select from "../ui/Select";
import Textarea from "../ui/Textarea";
import TagInput from "./TagInput";
import FeatureListEditor from "./FeatureListEditor";
import ScreenshotUrlList from "./ScreenshotUrlList";
import MilestoneEditor from "./MilestoneEditor";
import { normalizeExternalUrl } from "@/lib/utils";

type ProjectFormState = Omit<Partial<Project>, "milestones"> & {
  milestones: Partial<Milestone>[];
};

export default function ProjectForm({ mode, project }: { mode: "create" | "edit"; project?: Partial<Project> }) {
  const router = useRouter();
  const [form, setForm] = useState<ProjectFormState>({
    title: project?.title ?? "",
    category: project?.category ?? "web",
    status: project?.status ?? "in-progress",
    short_desc: project?.short_desc ?? "",
    documentation: project?.documentation ?? "",
    live_url: project?.live_url ?? "",
    github_url: project?.github_url ?? "",
    cover_image: project?.cover_image ?? "",
    notes: project?.notes ?? "",
    start_date: project?.start_date ?? "",
    end_date: project?.end_date ?? "",
    tech_stack: project?.tech_stack ?? [],
    features: project?.features ?? [],
    screenshots: project?.screenshots ?? [],
    milestones: (project?.milestones ?? []) as Partial<Milestone>[],
  });
  const [loading, setLoading] = useState(false);

  function updateField<K extends keyof ProjectFormState>(key: K, value: ProjectFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function normalizeOptionalText(value?: string) {
    const nextValue = value?.trim() ?? "";
    return nextValue || undefined;
  }

  function normalizeProjectUrl(value?: string) {
    return normalizeExternalUrl(value);
  }

  function updateDocumentation(value: string) {
    updateField("documentation", value);
  }

  function normalizeDocumentation() {
    updateDocumentation(normalizeDocumentationInput(form.documentation ?? ""));
    toast.success("Documentation formatting cleaned up");
  }

  function handleDocumentationPaste(e: React.ClipboardEvent<HTMLTextAreaElement>) {
    const pasted = e.clipboardData.getData("text/plain");
    if (!pasted) return;

    const normalized = normalizeDocumentationInput(pasted);
    if (normalized === pasted) return;

    e.preventDefault();
    const textarea = e.currentTarget;
    const nextValue =
      textarea.value.slice(0, textarea.selectionStart) +
      normalized +
      textarea.value.slice(textarea.selectionEnd);

    updateDocumentation(nextValue);
  }

  async function submit() {
    setLoading(true);
    const url = mode === "create" ? "/api/projects" : `/api/projects/${project?.id}`;
    const method = mode === "create" ? "POST" : "PUT";
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        title: (form.title ?? "").trim(),
        short_desc: (form.short_desc ?? "").trim(),
        documentation: normalizeDocumentationInput(form.documentation ?? ""),
        live_url: normalizeProjectUrl(form.live_url),
        github_url: normalizeProjectUrl(form.github_url),
        cover_image: normalizeOptionalText(form.cover_image),
        notes: normalizeOptionalText(form.notes),
        start_date: normalizeOptionalText(form.start_date),
        end_date: normalizeOptionalText(form.end_date),
      }),
    });
    setLoading(false);
    if (!res.ok) {
      const payload = (await res.json().catch(() => null)) as { error?: string } | null;
      return toast.error(payload?.error ?? "Something went wrong");
    }
    toast.success("Project saved!");
    router.refresh();
    router.push("/admin");
  }
  return (
    <div className="space-y-5">
      <div className="rounded-[22px] border border-white/70 bg-white/95 p-6 shadow-[0_14px_38px_rgba(15,35,61,0.05)]">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--text-muted)]">{mode === "create" ? "Create" : "Edit"} Project</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em]">{mode === "create" ? "Build a new project entry" : "Refine your project record"}</h1>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">Add stack details, milestones, documentation, and media in one cleaner editor.</p>
      </div>
      <div className="rounded-[22px] border border-white/70 bg-white/95 p-6 shadow-[0_14px_38px_rgba(15,35,61,0.05)]">
        <div className="grid gap-4 md:grid-cols-3">
          <Input label="Project Name *" value={form.title} onChange={(e) => updateField("title", e.target.value)} />
          <Select label="Category *" value={form.category} onChange={(e) => updateField("category", e.target.value as Project["category"])}>
            <option value="web">Web</option><option value="mobile">Mobile</option><option value="ai-ml">AI/ML</option><option value="open-source">Open Source</option><option value="other">Other</option>
          </Select>
          <Select label="Status *" value={form.status} onChange={(e) => updateField("status", e.target.value as Project["status"])}>
            <option value="in-progress">In Progress</option>
            <option value="live">Live</option>
            <option value="archived">Archived</option>
          </Select>
        </div>
        <div className="mt-4">
          <Textarea label="Short Description *" rows={3} maxLength={200} value={form.short_desc} onChange={(e) => updateField("short_desc", e.target.value)} />
        </div>
      </div>
      <div className="rounded-[22px] border border-white/70 bg-white/95 p-6 shadow-[0_14px_38px_rgba(15,35,61,0.05)]">
        <p className="mb-4 text-sm font-semibold text-[var(--text-primary)]">Links and Media</p>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Deployed Project URL"
            placeholder="https://your-project.com"
            type="text"
            value={form.live_url ?? ""}
            onChange={(e) => updateField("live_url", e.target.value)}
          />
          <Input
            label="GitHub Repository URL"
            placeholder="https://github.com/username/repo"
            type="text"
            value={form.github_url ?? ""}
            onChange={(e) => updateField("github_url", e.target.value)}
          />
          <Input
            className="md:col-span-2"
            label="Cover Image URL"
            placeholder="https://images.example.com/cover.png"
            type="url"
            value={form.cover_image ?? ""}
            onChange={(e) => updateField("cover_image", e.target.value)}
          />
        </div>
      </div>
      <div className="rounded-[22px] border border-white/70 bg-white/95 p-6 shadow-[0_14px_38px_rgba(15,35,61,0.05)]">
        <p className="mb-4 text-sm font-semibold text-[var(--text-primary)]">Project Timeline</p>
        <div className="grid gap-4 md:grid-cols-2">
          <Input
            label="Start Date"
            type="date"
            value={form.start_date ?? ""}
            onChange={(e) => updateField("start_date", e.target.value)}
          />
          <Input
            label="End Date"
            type="date"
            value={form.end_date ?? ""}
            onChange={(e) => updateField("end_date", e.target.value)}
          />
        </div>
      </div>
      <div className="rounded-[22px] border border-white/70 bg-white/95 p-6 shadow-[0_14px_38px_rgba(15,35,61,0.05)]">
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[var(--text-primary)]">Documentation</p>
            <p className="mt-1 text-xs text-[var(--text-secondary)]">Direct paste is auto-cleaned into markdown when possible.</p>
          </div>
          <button className="rounded-full border border-[var(--border-strong)] bg-white px-4 py-2 text-sm font-medium text-[var(--text-primary)]" onClick={normalizeDocumentation} type="button">
            Clean Formatting
          </button>
        </div>
        <MDEditor
          value={form.documentation}
          onChange={(v) => updateDocumentation(v ?? "")}
          height={400}
          textareaProps={{
            onPaste: handleDocumentationPaste,
            placeholder: "Paste markdown or plain text documentation here...",
          }}
        />
      </div>
      <div className="rounded-[22px] border border-white/70 bg-white/95 p-6 shadow-[0_14px_38px_rgba(15,35,61,0.05)]">
        <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Tech Stack</p>
        <TagInput value={form.tech_stack ?? []} onChange={(v) => updateField("tech_stack", v)} />
      </div>
      <div className="rounded-[22px] border border-white/70 bg-white/95 p-6 shadow-[0_14px_38px_rgba(15,35,61,0.05)]">
        <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Features</p>
        <FeatureListEditor value={form.features ?? []} onChange={(v) => updateField("features", v)} />
      </div>
      <div className="rounded-[22px] border border-white/70 bg-white/95 p-6 shadow-[0_14px_38px_rgba(15,35,61,0.05)]">
        <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Screenshots</p>
        <ScreenshotUrlList value={form.screenshots ?? []} onChange={(v) => updateField("screenshots", v)} />
      </div>
      <div className="rounded-[22px] border border-white/70 bg-white/95 p-6 shadow-[0_14px_38px_rgba(15,35,61,0.05)]">
        <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Internal Notes</p>
        <Textarea
          label="Notes"
          rows={4}
          placeholder="Add any private implementation notes, launch notes, or reminders..."
          value={form.notes ?? ""}
          onChange={(e) => updateField("notes", e.target.value)}
        />
      </div>
      <div className="rounded-[22px] border border-white/70 bg-white/95 p-6 shadow-[0_14px_38px_rgba(15,35,61,0.05)]">
        <p className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Milestones</p>
        <MilestoneEditor value={form.milestones ?? []} onChange={(v) => updateField("milestones", v)} />
      </div>
      <div className="flex justify-end gap-3">
        <button className="rounded-full border border-[var(--border-strong)] bg-white px-5 py-2.5" onClick={() => router.back()}>Cancel</button>
        <button className="rounded-full bg-[var(--accent)] px-5 py-2.5 font-semibold text-white shadow-[0_12px_24px_rgba(15,118,110,0.2)]" onClick={submit} disabled={loading}>{loading ? "Saving..." : "Save Project"}</button>
      </div>
    </div>
  );
}
