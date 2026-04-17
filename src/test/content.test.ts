import { describe, expect, it } from "vitest";
import { loadMarkdownContent, resolveMarkdownAssetPath } from "@/lib/content";

describe("markdown content helpers", () => {
  it("loads markdown content on demand", async () => {
    const content = await loadMarkdownContent("journey/masternet/detail/us-en.md");

    expect(content).toContain("Before I start talking about my journey at Masternet");
  });

  it("keeps remote, data and root-relative image paths untouched", () => {
    expect(resolveMarkdownAssetPath("journey/example/detail/pt-br.md", "https://example.com/image.png")).toBe(
      "https://example.com/image.png",
    );
    expect(resolveMarkdownAssetPath("journey/example/detail/pt-br.md", "data:image/png;base64,abc")).toBe(
      "data:image/png;base64,abc",
    );
    expect(resolveMarkdownAssetPath("journey/example/detail/pt-br.md", "/images/cover.png")).toBe(
      "/images/cover.png",
    );
  });

  it("preserves unresolved relative paths for future markdown assets", () => {
    expect(resolveMarkdownAssetPath("journey/example/detail/pt-br.md", "./diagram.png")).toBe("./diagram.png");
    expect(resolveMarkdownAssetPath("journey/example/detail/pt-br.md", "../shared/diagram.png")).toBe(
      "../shared/diagram.png",
    );
  });
});
