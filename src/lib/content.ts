const markdownModules = import.meta.glob("../../content/**/*.md", {
  import: "default",
  query: "?raw",
}) as Record<string, () => Promise<string>>;

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

const markdownCache = new Map<string, Promise<string>>();

export async function loadMarkdownContent(relativePath: string): Promise<string> {
  const moduleLoader = markdownModules[getModuleKey(relativePath)];

  if (!moduleLoader) {
    throw new Error(`Missing content file: ${relativePath}`);
  }

  const cachedContent = markdownCache.get(relativePath);

  if (cachedContent) {
    return cachedContent;
  }

  const contentPromise = moduleLoader().then((content) => normalizeMarkdown(content));
  markdownCache.set(relativePath, contentPromise);
  return contentPromise;
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
