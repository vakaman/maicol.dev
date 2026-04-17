import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { getBuildBasePath } from "./site.config";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: getBuildBasePath(process.env.VITE_BASE_PATH),
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/mermaid")) {
            return "mermaid";
          }

          if (
            id.includes("node_modules/react-markdown") ||
            id.includes("node_modules/remark-gfm") ||
            id.includes("node_modules/rehype-highlight") ||
            id.includes("node_modules/highlight.js")
          ) {
            return "markdown";
          }

          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/react-router-dom") ||
            id.includes("node_modules/@tanstack/")
          ) {
            return "app-vendor";
          }
        },
      },
    },
  },
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
