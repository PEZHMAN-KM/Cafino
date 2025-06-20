import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import RouteProgress from "./Componnets/RouteProgress.jsx";
import { BlurProvider } from "./constants/BlurContext.jsx";

import App from "./App.jsx";
// import Home from "./Pages/Home.jsx";
// import Landing from "./Pages/Landing.jsx";
// import Item from "./Pages/Item.jsx";
// import Order from "./Pages/Order.jsx";
// import ContactUs from "./Pages/ContactUs.jsx";
// import FavoritePage from "./Pages/FavoritePage.jsx";
import AdminHome from "./AdminPages/AdminHome.jsx";
import AddItem from "./AdminPages/AddItem.jsx";
import EditItem from "./AdminPages/EditItem.jsx";
import ItemManager from "./AdminPages/ItemManager.jsx";
import WaiterPage from "./AdminPages/WaiterPage.jsx";
import AdminLogin from "./AdminPages/AdminLogin.jsx";
import ChangeUserInfo from "./AdminPages/ChangeUserInfo.jsx";
import AddWaiter from "./AdminPages/AddWaiter.jsx";

// CHECK DARK MODE SYSTEM -------------------------------------
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark");
} else if (savedTheme === "light") {
  document.documentElement.classList.remove("dark");
} else {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (prefersDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

// LOW END SYSTEM ----------------------------------------------------------
// TURN OFF ALL ANIMATIONS --------------------------
function detectShouldDisableAnimations() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  return prefersReducedMotion;
}
if (detectShouldDisableAnimations()) {
  document.body.classList.add("no-anim");
}

// function detectShouldReduceBlur() {
//   const deviceMemory = navigator.deviceMemory || 4;
//   const ua = navigator.userAgent.toLowerCase();

//   const isLowBlurDevice =
//     deviceMemory <= 2 ||
//     ua.includes("a9 2018") ||
//     ua.includes("j5") ||
//     ua.includes("android 8") ||
//     ua.includes("m10") ||
//     ua.includes("lg k");

//   return isLowBlurDevice;
// }

// if (detectShouldReduceBlur()) {
//   document.body.classList.add("reduce-blur");
// }
const REDUCE_BLUR = false;

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
        <Route path="/FavoritePage" element={<FavoritePage />}></Route> */}
          <Route path="/AdminHome" element={<AdminHome />}></Route>
          <Route path="/AddItem" element={<AddItem />}></Route>
          <Route path="/EditItem" element={<EditItem />}></Route>
          <Route path="/ItemManager" element={<ItemManager />}></Route>
          <Route path="/WaiterPage" element={<WaiterPage />}></Route>
          <Route path="/AdminLogin" element={<AdminLogin />}></Route>
          <Route path="/ChangeUserInfo" element={<ChangeUserInfo />}></Route>
          <Route path="/AddWaiter" element={<AddWaiter />}></Route>
        </Routes>
      </BrowserRouter>
    </BlurProvider>
  </StrictMode>
);
