import { defineConfig } from "astro/config";
import relativeLinks from "astro-relative-links";
import { run } from "vite-plugin-run";
import FullReload from "vite-plugin-full-reload";

// https://astro.build/config
export default defineConfig({
  integrations: [relativeLinks()],
  trailingSlash: "never",
  devToolbar: { enabled: false },
  outDir: "build",
  build: {
    format: "file",
    inlineStylesheets: "never",
  },
  compressHTML: false,
  scopedStyleStrategy: "class",
  vite: {
    plugins: [
      // run([{ name: "sass", run: ["npm run sass-watch"] }]),
      FullReload(["public/scss/**/*.scss", 'public/js/**/*.js']),
    ],
  },
});
