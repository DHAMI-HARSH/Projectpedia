function getTechPalette(label: string) {
  const key = label.toLowerCase();

  if (/(react|next|vue|svelte|tailwind|figma|css|ui|ux)/.test(key)) {
    return {
      tone: "border-sky-200 bg-sky-50 text-sky-800",
      font: "font-tech-ui",
    };
  }

  if (/(python|node|typescript|javascript|java|cpp|c\+\+|go|rust|sql|api)/.test(key)) {
    return {
      tone: "border-emerald-200 bg-emerald-50 text-emerald-800",
      font: "font-tech-code",
    };
  }

  if (/(ai|ml|llm|openai|langchain|pytorch|tensorflow|vector|rag)/.test(key)) {
    return {
      tone: "border-fuchsia-200 bg-fuchsia-50 text-fuchsia-800",
      font: "font-tech-ai",
    };
  }

  if (/(aws|gcp|azure|supabase|vercel|docker|kubernetes|cloud|firebase)/.test(key)) {
    return {
      tone: "border-amber-200 bg-amber-50 text-amber-800",
      font: "font-tech-cloud",
    };
  }

  const tones = [
    "border-cyan-200 bg-cyan-50 text-cyan-800",
    "border-indigo-200 bg-indigo-50 text-indigo-800",
    "border-rose-200 bg-rose-50 text-rose-800",
    "border-lime-200 bg-lime-50 text-lime-800",
  ];
  const hash = [...key].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return {
    tone: tones[hash % tones.length],
    font: "font-tech-ui",
  };
}

export default function TechChip({ label }: { label: string }) {
  const { tone, font } = getTechPalette(label);
  return (
    <span className={`tech-chip ${font} inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${tone}`}>
      {label}
    </span>
  );
}
