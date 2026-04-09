import { copyFile, mkdir, access, writeFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const indexFile = path.join(distDir, "index.html");
const notFoundFile = path.join(distDir, "404.html");
const cnameFile = path.join(distDir, "CNAME");
const noJekyllFile = path.join(distDir, ".nojekyll");

await mkdir(distDir, { recursive: true });
await copyFile(indexFile, notFoundFile);
await writeFile(noJekyllFile, "");

try {
  await access(path.resolve("public", "CNAME"));
} catch {
  await writeFile(cnameFile, "maicol.dev\n");
}
