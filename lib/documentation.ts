function normalizeLineEndings(value: string) {
  return value.replace(/\r\n?/g, "\n").replace(/\u00a0/g, " ").trim();
}

function isMarkdownLike(value: string) {
  return /(^|\n)\s*(#{1,6}\s|\-\s|\*\s|\d+\.\s|>\s|```|\|.+\||!\[.*\]\(.*\)|\[.*\]\(.*\))/.test(value);
}

function splitColumns(line: string) {
  return line
    .split(/\t+|\s{2,}/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function isTableCandidate(line: string) {
  return splitColumns(line).length >= 2;
}

function isHeadingLine(line: string) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.length > 40) return false;
  if (/[.:]$/.test(trimmed)) return false;
  if (/^[#>\-\*\d]/.test(trimmed)) return false;
  return /^[A-Z][A-Za-z0-9/&+ -]+$/.test(trimmed);
}

function isFeatureLine(line: string) {
  return /^([^:]{2,80}?)(?:\s+[—-]\s+)(.+)$/.test(line.trim());
}

function formatFeatureLine(line: string) {
  const match = line.trim().match(/^([^:]{2,80}?)(?:\s+[—-]\s+)(.+)$/);
  if (!match) return line.trim();
  return `- **${match[1].trim()}** — ${match[2].trim()}`;
}

function flushParagraph(buffer: string[], output: string[]) {
  if (!buffer.length) return;
  output.push(buffer.join(" ").replace(/\s+/g, " ").trim());
  buffer.length = 0;
}

export function normalizeDocumentationInput(raw: string) {
  const value = normalizeLineEndings(raw);
  if (!value) return "";
  if (isMarkdownLike(value)) return value;

  const lines = value.split("\n").map((line) => line.replace(/\s+$/g, ""));
  const output: string[] = [];
  const paragraph: string[] = [];

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();

    if (!line) {
      flushParagraph(paragraph, output);
      if (output.at(-1) !== "") output.push("");
      continue;
    }

    if (i === 0) {
      flushParagraph(paragraph, output);
      output.push(`# ${line}`);
      output.push("");
      continue;
    }

    if (isHeadingLine(line)) {
      flushParagraph(paragraph, output);
      if (output.at(-1) !== "") output.push("");
      output.push(`## ${line}`);
      output.push("");
      continue;
    }

    if (isFeatureLine(line)) {
      flushParagraph(paragraph, output);
      output.push(formatFeatureLine(line));
      continue;
    }

    if (isTableCandidate(line)) {
      const tableLines = [line];
      let cursor = i + 1;

      while (cursor < lines.length && lines[cursor].trim() && isTableCandidate(lines[cursor])) {
        tableLines.push(lines[cursor].trim());
        cursor += 1;
      }

      if (tableLines.length >= 2) {
        flushParagraph(paragraph, output);
        const rows = tableLines.map(splitColumns);
        const width = Math.max(...rows.map((row) => row.length));
        const normalizedRows = rows.map((row) => {
          const nextRow = [...row];
          while (nextRow.length < width) nextRow.push("");
          return nextRow;
        });
        const [header, ...body] = normalizedRows;

        output.push(`| ${header.join(" | ")} |`);
        output.push(`| ${header.map(() => "---").join(" | ")} |`);
        body.forEach((row) => output.push(`| ${row.join(" | ")} |`));
        output.push("");
        i = cursor - 1;
        continue;
      }
    }

    paragraph.push(line);
  }

  flushParagraph(paragraph, output);

  return output.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}
