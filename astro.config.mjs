// @ts-check
import path from "node:path";
import { fileURLToPath } from "node:url";

import react from "@astrojs/react";
import { lingui } from "@lingui/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import svgr from "vite-plugin-svgr";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({ babel: { plugins: ["@lingui/babel-plugin-lingui-macro"] } }),
  ],
  vite: {
    plugins: [
      lingui(),
      tailwindcss(),
      svgr({
        include: "**/*.svg?react",
        svgrOptions: {
          icon: true,
          replaceAttrValues: {
            "#000": "currentColor",
            "#000000": "currentColor",
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  },
});
