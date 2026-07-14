import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/parayana-sangraham-final/",
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Parayana Sangraham",
        short_name: "Parayana",
        description: "Personal offline audio library",

        start_url: "/parayana-sangraham-final/",
        scope: "/parayana-sangraham-final/",
        display: "standalone",

        background_color: "#111827",
        theme_color: "#111827",

        icons: [
          {
            src: "/parayana-sangraham-final/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/parayana-sangraham-final/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },

      workbox: {
        navigateFallback: "/parayana-sangraham-final/index.html",

        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts",
            },
          },
        ],
      },
    }),
  ],
});
