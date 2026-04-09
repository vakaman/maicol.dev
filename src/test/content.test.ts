import { describe, expect, it } from "vitest";
import { resolveMarkdownAssetPath } from "@/lib/content";

describe("markdown content helpers", () => {
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
