const markdownModules = import.meta.glob("../../content/**/*.md", {
  eager: true,
  import: "default",
  query: "?raw",
}) as Record<string, string>;

const markdownAssetModules = import.meta.glob("../../content/**/*.{avif,gif,jpeg,jpg,png,svg,webp}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

function getModuleKey(relativePath: string): string {
  return `../../content/${relativePath}`;
}

function normalizeMarkdown(raw: string): string {
  return raw.replace(/\r\n/g, "\n").trim();
}

function normalizeRelativePath(relativePath: string): string {
  const normalizedSegments: string[] = [];

  for (const segment of relativePath.replace(/\\/g, "/").split("/")) {
    if (!segment || segment === ".") {
      continue;
    }

    if (segment === "..") {
      normalizedSegments.pop();
      continue;
    }

    normalizedSegments.push(segment);
  }

  return normalizedSegments.join("/");
}

function getMarkdownText(relativePath: string): string {
  const content = markdownModules[getModuleKey(relativePath)];

  if (!content) {
    throw new Error(`Missing content file: ${relativePath}`);
  }

  return normalizeMarkdown(content);
}

export function getMarkdownContent(relativePath: string): string {
  return getMarkdownText(relativePath);
}

export function resolveMarkdownAssetPath(markdownRelativePath: string, assetPath: string): string {
  if (
    !assetPath ||
    assetPath.startsWith("/") ||
    assetPath.startsWith("data:") ||
    /^(?:[a-z]+:)?\/\//i.test(assetPath)
  ) {
    return assetPath;
  }

  const markdownDirectory = markdownRelativePath.split("/").slice(0, -1).join("/");
  const normalizedAssetPath = normalizeRelativePath([markdownDirectory, assetPath].join("/"));

  return markdownAssetModules[getModuleKey(normalizedAssetPath)] ?? assetPath;
}
