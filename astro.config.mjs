// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({ applyBaseStyles: false }), react()],
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
