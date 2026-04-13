import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("site metadata", () => {
  it("uses maicol.dev social preview metadata only", () => {
    const indexHtml = readFileSync(resolve(process.cwd(), "index.html"), "utf-8");
    const legacyBrandPattern = new RegExp(["lov", "able"].join(""), "i");

    expect(indexHtml).toContain('content="https://maicol.dev"');
    expect(indexHtml).toContain('content="https://maicol.dev/favicon.ico"');
    expect(indexHtml).toContain('rel="canonical" href="https://maicol.dev"');
    expect(indexHtml).toContain('hreflang="pt-BR" href="https://maicol.dev/pt-br"');
    expect(indexHtml).toContain("<h1>Backend Infrastructure and Distributed Systems</h1>");
    expect(indexHtml).toContain('href="/journey/masternet-inicio"');
    expect(indexHtml).toContain('rel="apple-touch-icon" href="/favicon.ico"');
    expect(indexHtml).not.toMatch(legacyBrandPattern);
  });
});
