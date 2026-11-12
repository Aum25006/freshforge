import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Builds ONE script (about.js) and ONE stylesheet (about.css) into the website's assets folder.
// They are plain static files: the site does not need Node, React or a build step to serve them.
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  build: {
    // New design builds to assets/about-next so the LIVE About page (assets/about) is never touched until approved.
    outDir: path.resolve(__dirname, process.env.ABOUT_OUT ?? "../freshforge/assets/about-next"),
    emptyOutDir: true,
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, "src/main.tsx"),
      name: "FreshForgeAbout",
      formats: ["iife"],
      fileName: () => "about.js",
      cssFileName: "about",
    },
  },
});
