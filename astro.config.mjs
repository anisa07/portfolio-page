// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import purgecss from "astro-purgecss";

// https://astro.build/config
export default defineConfig({
  site: "https://www.anisa-sd.org",
  integrations: [
    tailwind({ applyBaseStyles: false }),
    react(),
    sitemap({
      // Generate sitemap for all locales
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          nl: "nl",
        },
      },
      // Custom filter to exclude certain pages
      filter: (page) => {
        // Exclude any test or draft pages
        return !page.includes("/test/") && !page.includes("/draft/");
      },
      // Custom serialize function for better URL handling
      serialize: (item) => {
        // Add lastmod date as ISO string
        item.lastmod = new Date().toISOString();

        // Set priority based on page type
        if (item.url.includes("/blog/")) {
          item.priority = 0.8;
        } else if (
          item.url.endsWith("/") ||
          item.url.includes("/en") ||
          item.url.includes("/nl")
        ) {
          // Main pages get higher priority
          item.priority = item.url === "https://www.anisa-sd.org/" ? 1.0 : 0.9;
        } else {
          item.priority = 0.7;
        }

        return item;
      },
    }),
    robotsTxt({
      // Configure robots.txt generation
      policy: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/api/", "/*.json$", "/src/", "/.env", "/node_modules/"],
        },
      ],
      sitemap: true, // Automatically includes sitemap reference
    }),
    (await import("@playform/compress")).default(),
    purgecss({
      content: [
        "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte}",
        "./public/**/*.html",
      ],
      safelist: {
        // Preserve dynamic classes that might be added by JavaScript
        standard: [
          /^fade-/,
          /^slide-/,
          /^opacity-/,
          /^transform/,
          /^transition/,
          // Preserve classes used in React components
          /^react-/,
          // Preserve Tailwind's arbitrary value classes
          /^\[.*\]$/,
        ],
        deep: [
          // Preserve classes within specific components
          /data-/,
          /aria-/,
        ],
        greedy: [
          // Preserve classes that match patterns
          /^btn-/,
          /^card-/,
          /^nav-/,
        ],
      },
      // Don't purge CSS variables
      variables: true,
      // Keep keyframes for animations
      keyframes: true,
      // Tailwind-specific optimizations
      defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "@": "/src",
        "@/components": "/src/components",
        "@/layouts": "/src/layouts",
        "@/utils": "/src/utils",
        "@/types": "/src/types",
        "@/styles": "/src/styles",
        "@/i18n": "/src/i18n",
        "@/hooks": "/src/hooks",
        "@/services": "/src/services",
        "@/config": "/src/config",
      },
    },
  },
});
