import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("critical css loading", () => {
  it("loads the global stylesheet from the html head", () => {
    const indexHtml = readFileSync(resolve(process.cwd(), "index.html"), "utf-8");

    expect(indexHtml).toMatch(/<link[\s\S]*rel="stylesheet"[\s\S]*href="\/src\/index\.css"/);
  });
});
