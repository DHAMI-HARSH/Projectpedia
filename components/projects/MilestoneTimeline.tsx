export default function MilestoneTimeline({ milestones }: { milestones: { id: string; title: string; description?: string; date?: string }[] }) {
  return <div className="space-y-3">{milestones.map((m) => <div key={m.id} className="border-l-2 border-[var(--border)] pl-3"><p className="font-medium">{m.title}</p><p className="mono text-xs text-[var(--text-muted)]">{m.date}</p><p className="text-sm text-[var(--text-secondary)]">{m.description}</p></div>)}</div>;
}
