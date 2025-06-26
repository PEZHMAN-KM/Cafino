import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import "./index.css";
import RouteProgress from "./Componnets/RouteProgress.jsx";
import { BlurProvider } from "./constants/BlurContext.jsx";

import { registerSW } from "virtual:pwa-register";
registerSW({ immediate: true });

import App from "./App.jsx";
// import Home from "./Pages/Home.jsx";
// import Landing from "./Pages/Landing.jsx";
// import Item from "./Pages/Item.jsx";
// import Order from "./Pages/Order.jsx";
// import ContactUs from "./Pages/ContactUs.jsx";
// import FavoritePage from "./Pages/FavoritePage.jsx";
// import EasyPage from "./Pages/EasyPage.jsx";

// const connection =
//   navigator.connection || navigator.mozConnection || navigator.webkitConnection;
// const netType = connection?.effectiveType || "unknown";
// if (netType === "slow-2g") {
//   console.log("اینترنت خیلی ضعیف است، نسخه بسیار سبک اجرا شود.");
// } else if (netType === "2g") {
//   console.log("اینترنت ضعیف است، ویدئوها حذف شود.");
// } else if (netType === "3g") {
//   console.log("اینترنت متوسط است، عکس‌ها با کیفیت متوسط لود شوند.");
// } else if (netType === "4g") {
//   console.log("اینترنت خوب است، همه امکانات فعال باشند.");
// } else {
//   console.log("نوع اتصال مشخص نیست، حالت پیش‌فرض اجرا شود.");
// }

// BATTERY SERVER - LOW BATTERT DETECTION
const PowerSaving_LowBattery = async () => {
  if (!navigator.getBattery) return false;

  try {
    const battery = await navigator.getBattery();
    const level = battery.level;
    const time = battery.dischargingTime;
    const charging = battery.charging;

    const likelySaving = time < 1800 && !charging;
    const lowBattery = level <= 0.1;

    return (likelySaving || lowBattery) && !charging;
  } catch (err) {
    console.warn("Battery API not available", err);
    return false;
  }
};

// NETWORK SPEED DETECTION (Show The Speed Of Intenet)
const testNetworkSpeed = async () => {
  const fileUrl = "/TEST_SPEED_PEZHMAN.jpg";
  const fileSizeInBytes = 50335;

  const startTime = performance.now();
  try {
    const response = await fetch(fileUrl, { cache: "no-store" });
    await response.blob();
    const endTime = performance.now();

    const durationInSeconds = (endTime - startTime) / 1000;
    const speedInKbps = fileSizeInBytes / durationInSeconds / 1024;

    console.log("📶 سرعت اینترنت:", Math.round(speedInKbps), "KB/s");

    return speedInKbps;
  } catch (error) {
    console.warn("ارور در تست سرعت:", error);
    return 1000;
  }
};

// LOW END SYSTEM ----------------------------------------------------------
// TURN OFF ALL ANIMATIONS --------------------------
function detectShouldDisableAnimations() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  return prefersReducedMotion;
}
// CHECK DARK MODE SYSTEM ------------------------------------------------
const applyTheme = () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else if (savedTheme === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
};
// TURN OFF GLASS EFFECT ----------------------------
const lacksModernFeatures = () => {
  return (
    !("OffscreenCanvas" in window) ||
    !CSS.supports("backdrop-filter", "blur(10px)") ||
    !window.WebGL2RenderingContext
  );
};

const startApp = async () => {
  // NETWORK SPEED CONTROL ----------------------------
  const connection =
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection;
  const netType = connection?.effectiveType || "unknown";

  const speed = await testNetworkSpeed();
  if (
    netType === "2g" ||
    netType === "slow-2g" ||
    (speed < 80 && netType === "unknown") ||
    speed < 50
  ) {
    window.location.replace("/lite.html");
    return;
  } else {
    // CHECK BY BATTERY ------------------------------------------
    const PowerSaving_LOW_BATTERY = await PowerSaving_LowBattery();
    // APPLIED VISION CHANGES ( ANIMATION AND ... ) ---------------------------------------
    if (detectShouldDisableAnimations() || PowerSaving_LOW_BATTERY) {
      document.body.classList.add("no-anim");
    }
    applyTheme();
    // CHECK FOR OLD PHONE ------------------------------------------
    const REDUCE_BLUR_FEATURE = lacksModernFeatures();
    const REDUCE_BLUR = PowerSaving_LOW_BATTERY || REDUCE_BLUR_FEATURE;
    // const REDUCE_BLUR = true;

    createRoot(document.getElementById("root")).render(
      <StrictMode>
        <BlurProvider reduceBlur={REDUCE_BLUR}>
          <BrowserRouter>
            <RouteProgress />
            <Routes>
              <Route path="/" element={<App />} />
              {/* <Route path="/home" element={<Home />} />
              <Route path="/Landing" element={<Landing />}></Route>
              <Route path="/Item" element={<Item />}></Route>
              <Route path="/Order" element={<Order />}></Route>
              <Route path="/ContactUs" element={<ContactUs />}></Route>
              <Route path="/FavoritePage" element={<FavoritePage />}></Route>
              <Route path="/EasyPage" element={<EasyPage />}></Route> */}
            </Routes>
          </BrowserRouter>
        </BlurProvider>
      </StrictMode>
    );
  }
};

startApp();
