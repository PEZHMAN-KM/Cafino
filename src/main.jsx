import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteProgress from "./Componnets/RouteProgress.jsx";
import { BlurProvider } from "./constants/BlurContext.jsx";

import { registerSW } from "virtual:pwa-register";

const swFile = location.pathname.startsWith("/admin")
  ? "admin-sw.js"
  : "user-sw.js";
registerSW({ immediate: true, swUrl: `/${swFile}` });

import App from "./App.jsx";

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
// SUPER LOW END MOBILE DEVICE (OLD) ---------------------
const OldDeviceCheck = () => {
  if (!navigator.userAgent) return false;

  try {
    const userAgent = navigator.userAgent;

    // بررسی سیستم عامل اندروید
    const androidVersionMatch = userAgent.match(/Android (\d+)/);
    const isOldAndroid =
      androidVersionMatch && parseInt(androidVersionMatch[1], 10) <= 5; // نسخه‌های اندروید 1 تا 5

    // بررسی سیستم عامل iOS
    const iosVersionMatch = userAgent.match(/iPhone OS (\d+)_/);
    const isOldiOS = iosVersionMatch && parseInt(iosVersionMatch[1], 10) <= 10; // نسخه‌های iOS 7 و پایین‌تر

    // بررسی سیستم عامل Windows Phone
    const isOldWindowsPhone = /Windows Phone ([0-9.]+)/.test(userAgent); // نسخه‌های قدیمی ویندوز فون

    // بررسی سیستم عامل Windows (نسخه‌های قدیمی ویندوز)
    const isOldWindows = /Windows NT [6-7]\./.test(userAgent); // نسخه‌های قدیمی ویندوز (Windows 7 و پایین‌تر)

    // بررسی سیستم عامل MacOS (نسخه‌های قدیمی مک)
    const isOldMac = /Mac OS X [10_4_9|10_4|10_5|10_6|10_7|10_8|10_9]/.test(
      userAgent
    ); // نسخه‌های قدیمی مک

    // بررسی تبلت‌ها (شناسایی تبلت‌های اندروید و iOS)
    const isTablet = /iPad|Android.*Tablet/.test(userAgent); // شناسایی تبلت‌ها

    // بررسی مرورگر و ویژگی‌های قدیمی
    const isOldBrowser = !("fetch" in window) || !("Promise" in window); // بررسی پشتیبانی از fetch و Promise

    // چاپ مقادیر برای تشخیص بهتر
    console.log("UserAgent:", userAgent);
    console.log("isOldAndroid:", isOldAndroid);
    console.log("isOldiOS:", isOldiOS);
    console.log("isOldWindowsPhone:", isOldWindowsPhone);
    console.log("isOldWindows:", isOldWindows);
    console.log("isOldMac:", isOldMac);
    console.log("isTablet:", isTablet);
    console.log("isOldBrowser:", isOldBrowser);

    // بررسی دستگاه‌های قدیمی
    if (
      isOldAndroid ||
      isOldiOS ||
      isOldWindowsPhone ||
      isOldWindows ||
      isOldMac ||
      isTablet ||
      isOldBrowser
    ) {
      return true;
    }

    return false;
  } catch (err) {
    console.warn("OLD DEVICE FINDER API not available", err);
    return true;
  }
};

// TURN OFF ALL ANIMATIONS --------------------------
function detectShouldDisableAnimations() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  return prefersReducedMotion;
}
const applyAnimationSettings = (PowerSaving_LOW_BATTERY) => {
  const animationControl = localStorage.getItem("animationControl");

  // By Local Storage ----------------------------------------
  if (animationControl == "True") {
    document.body.classList.remove("no-anim");
  } else if (animationControl == "False") {
    document.body.classList.add("no-anim");
  } else {
    // By System Setting & Low Battery ----------------------------------------
    if (detectShouldDisableAnimations() || PowerSaving_LOW_BATTERY) {
      document.body.classList.add("no-anim");
    } else {
      document.body.classList.remove("no-anim");
    }
  }
};

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
  // SUPPER LOW END MOBILE DEVICE (OLD) ---------------------
  const isOldDevice = OldDeviceCheck();
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
    speed < 50 ||
    isOldDevice
  ) {
    window.location.replace("/lite.html");
    return;
  } else {
    // CHECK FOR OLD PHONE ------------------------------------------
    const PowerSaving_LOW_BATTERY = await PowerSaving_LowBattery();

    let REDUCE_BLUR = false;
    const blurControl = localStorage.getItem("blurControl");
    if (blurControl == "True") {
      REDUCE_BLUR = false;
    } else if (blurControl == "False") {
      REDUCE_BLUR = true;
    } else {
      const REDUCE_BLUR_FEATURE = lacksModernFeatures();
      REDUCE_BLUR = PowerSaving_LOW_BATTERY || REDUCE_BLUR_FEATURE;
    }

    // APPLIED VISION CHANGES ( ANIMATION AND ... ) ---------------------------------------
    applyAnimationSettings(PowerSaving_LOW_BATTERY);
    applyTheme();

    createRoot(document.getElementById("root")).render(
      <StrictMode>
        <BlurProvider reduceBlur={REDUCE_BLUR}>
          <BrowserRouter>
            <RouteProgress />
            <Routes>
              <Route path="/" element={<App />} />
              {/* <Route path="/home" element={<Home />} /> */}
            </Routes>
          </BrowserRouter>
        </BlurProvider>
      </StrictMode>
    );
  }
};

startApp();
