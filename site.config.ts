const DEFAULT_BASE_PATH = "/";

export function normalizeBasePath(basePath = DEFAULT_BASE_PATH): string {
  if (!basePath || basePath === "./") {
    return DEFAULT_BASE_PATH;
  }

  const withLeadingSlash = basePath.startsWith("/") ? basePath : `/${basePath}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

export function getRouterBasename(basePath = DEFAULT_BASE_PATH): string {
  const normalizedBasePath = normalizeBasePath(basePath);
  return normalizedBasePath === DEFAULT_BASE_PATH
    ? DEFAULT_BASE_PATH
    : normalizedBasePath.slice(0, -1);
}

export function getBuildBasePath(envBasePath?: string): string {
  return normalizeBasePath(envBasePath);
}

export const siteUrl = "https://maicol.dev";
