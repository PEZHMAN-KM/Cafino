import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// FOR HTTPS ----------------------------
import fs from "fs";
import path from "path";

// ✅ تنظیم کش هوشمند
const runtimeCaching = [
  // 📄 کش HTML
  {
    urlPattern: ({ request }) => request.destination === "document",
    handler: "NetworkFirst",
    options: {
      cacheName: "html-cache",
      expiration: {
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 روز
      },
    },
  },

  // 🎨 کش استایل و اسکریپت‌ها
  {
    urlPattern: ({ request }) =>
      request.destination === "style" || request.destination === "script",
    handler: "StaleWhileRevalidate",
    options: {
      cacheName: "asset-cache",
    },
  },

  // 🖼️ کش تصاویر عمومی (نه تصاویر غذا)
  {
    urlPattern: ({ request }) =>
      request.destination === "image" &&
      !request.url.includes("/images/foods/"),
    handler: "CacheFirst",
    options: {
      cacheName: "static-image-cache",
      expiration: {
        maxEntries: 50,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      },
    },
  },

  // THERE ISNT ANY URL FOR JUST A PICTURE -------------------------------
  // 🍽️ کش تصاویر غذاها (موقت ۱۲ ساعت)
  // {
  //   urlPattern: ({ url }) => url.pathname.includes("/images/foods/"),
  //   handler: "CacheFirst",
  //   options: {
  //     cacheName: "food-images-cache",
  //     expiration: {
  //       maxEntries: 50,
  //       maxAgeSeconds: 60 * 60 * 12,
  //     },
  //   },
  // },

  // 🍕 کش API غذا برای یوزر (۱ ساعت)
  {
    urlPattern: ({ url }) =>
      url.pathname.includes("/food/get_all_on_sale_foods") ||
      url.pathname.includes("/food/show_category_foods") ||
      url.pathname.includes("/food/get_food_list_by_id"),
    handler: "NetworkFirst",
    options: {
      cacheName: "menu-api-cache",
      expiration: {
        maxEntries: 30,
        maxAgeSeconds: 60 * 60, // 1 ساعت
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },

  // 🛠️ کش داده‌های ادمین (غذاها و گارسون‌ها) - 1 ساعت
  {
    urlPattern: ({ url }) =>
      url.pathname.includes("/food/get_all_foods") ||
      url.pathname.includes("/admin/waitress/get_all_waitresses"),
    handler: "NetworkFirst",
    options: {
      cacheName: "admin-api-cache",
      expiration: {
        maxEntries: 30,
        maxAgeSeconds: 60 * 60,
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },

  // 👤 کش اطلاعات کاربر و تصویر پروفایل - 30 روز
  {
    urlPattern: ({ url }) =>
      url.pathname.includes("/user/get_self_info") ||
      url.pathname.includes("/userget_user_picture"),
    handler: "CacheFirst",
    options: {
      cacheName: "admin-profile-cache",
      expiration: {
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 روز
      },
      cacheableResponse: {
        statuses: [0, 200],
      },
    },
  },

  // 🚫 داده‌های زنده سفارش (هر بار باید تازه بیاد)
  {
    urlPattern: ({ url }) => url.pathname.includes("/order/get_orders_to_show"),
    handler: "NetworkOnly",
    options: {
      cacheName: "live-order-cache",
    },
  },

  // 🚫 جستجوی غذاها (همیشه تازه باشه)
  {
    urlPattern: ({ url }) => url.pathname.includes("/food/search_food"),
    handler: "NetworkOnly",
    options: {
      cacheName: "no-cache-search",
    },
  },
];

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),

    // ✅ PWA یوزر
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
        scope: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#c67c4e",
        icons: [
          { src: "/Icon.svg", sizes: "192x192", type: "image/png" },
          { src: "/Icon.svg", sizes: "512x512", type: "image/png" },
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
      workbox: {
        runtimeCaching,
      },
      // injectRegister: false,
      injectRegister: "auto",
    }),

    // ✅ PWA ادمین (در صورت نیاز)
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
          { src: "/Icon.svg", sizes: "192x192", type: "image/png" },
          { src: "/Icon.svg", sizes: "512x512", type: "image/png" },
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
      workbox: {
        runtimeCaching,
      },
      injectRegister: false,
    }),
  ],

  // 🔧 ورودی برای build
  build: {
    rollupOptions: {
      input: {
        main: "index.html", // صفحه اصلی
        admin: "admin.html", // صفحه ادمین
      },
    },
  },

  // FOR HTTPS ----------------------------
  // 🔐 تنظیمات HTTPS با گواهی local
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
  //     cert: fs.readFileSync(path.resolve(__dirname, "localhost.pem")),
  //   },
  //   port: 3000,
  //   host: "localhost",
  // },

  server: {
    host: "0.0.0.0",
    port: 3000,
  },
});
