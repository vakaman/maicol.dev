import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("site metadata", () => {
  it("uses maicol.dev social preview metadata only", () => {
    const indexHtml = readFileSync(resolve(process.cwd(), "index.html"), "utf-8");
    const legacyBrandPattern = new RegExp(["lov", "able"].join(""), "i");

    expect(indexHtml).toContain('content="https://maicol.dev"');
    expect(indexHtml).toContain('content="https://maicol.dev/favicon.ico"');
    expect(indexHtml).not.toMatch(legacyBrandPattern);
  });
});
