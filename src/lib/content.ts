const markdownModules = import.meta.glob("../../content/**/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

function getModuleKey(relativePath: string): string {
  return `../../content/${relativePath}`;
}

function normalizeMarkdown(raw: string): string {
  return raw.replace(/\r\n/g, "\n").trim();
}

function getMarkdownText(relativePath: string): string {
  const content = markdownModules[getModuleKey(relativePath)];

  if (!content) {
    throw new Error(`Missing content file: ${relativePath}`);
  }

  return normalizeMarkdown(content);
}

export function getMarkdownParagraphs(relativePath: string): string[] {
  return getMarkdownText(relativePath)
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.replace(/\n/g, " ").trim())
    .filter(Boolean);
}
