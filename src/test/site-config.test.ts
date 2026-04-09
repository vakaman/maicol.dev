import { describe, expect, it } from "vitest";
import { getBuildBasePath, getRouterBasename, normalizeBasePath } from "../../site.config";

describe("site config", () => {
  it("normalizes empty and relative bases to root", () => {
    expect(normalizeBasePath()).toBe("/");
    expect(normalizeBasePath("./")).toBe("/");
  });

  it("normalizes non-root base paths with leading and trailing slash", () => {
    expect(normalizeBasePath("portfolio")).toBe("/portfolio/");
    expect(normalizeBasePath("/portfolio")).toBe("/portfolio/");
  });

  it("builds the router basename from the normalized base path", () => {
    expect(getRouterBasename("/")).toBe("/");
    expect(getRouterBasename("/portfolio/")).toBe("/portfolio");
  });

  it("builds the Vite base path from an optional env value", () => {
    expect(getBuildBasePath()).toBe("/");
    expect(getBuildBasePath("portfolio")).toBe("/portfolio/");
  });
});
