import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    // PWA برای یوزر
    VitePWA({
      registerType: "autoUpdate",
      filename: "user-sw.js",
      strategies: "generateSW",
      manifestFilename: "manifest.webmanifest",
      includeAssets: [
        "lite.html",
        "Icon.svg",
        "TEST_SPEED_PEZHMAN.jpg",
        // "icon-192x192.png",
        // "icon-512x512.png",
        // "apple-touch-icon.png",
      ],
      manifest: {
        name: "Cafino",
        short_name: "Cafino",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#c67c4e",
        icons: [
          {
            src: "/Icon.svg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/Icon.svg",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/Banner.jpg",
            sizes: "540x720",
            type: "image/png",
            form_factor: "wide",
          },
        ],
      },
      injectRegister: false,
    }),

    // PWA برای Admin
    VitePWA({
      registerType: "autoUpdate",
      filename: "admin-sw.js",
      strategies: "generateSW",
      manifestFilename: "admin-manifest.webmanifest",
      includeAssets: ["Icon.svg"],
      manifest: {
        name: "Cafino Admin",
        short_name: "Admin",
        start_url: "/admin",
        scope: "/admin",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#222222",
        icons: [
          {
            src: "/Icon.svg",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/Icon.svg",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        screenshots: [
          {
            src: "/Banner.jpg",
            sizes: "540x720",
            type: "image/png",
            form_factor: "wide",
          },
        ],
      },
      injectRegister: false,
    }),
  ],

  build: {
    rollupOptions: {
      input: {
        main: "index.html", // یوزر
        admin: "admin.html", // ادمین
      },
    },
  },

  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
