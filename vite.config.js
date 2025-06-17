import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
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
      },
    }),
  ],
  //FOR TESTING MOBILE ON LOCAL HOST
  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
