// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";
// import "../nprogress-custom.css";

// NProgress.configure({
//   showSpinner: false,
//   trickle: false,
// });

// const RouteProgress = () => {
//   const location = useLocation();
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     NProgress.start();
//     setIsVisible(true);

//     const timeout = setTimeout(() => {
//       NProgress.done();
//       setIsVisible(false);
//     }, 800);

//     return () => clearTimeout(timeout);
//   }, [location.pathname]);

//   const adminRoutes = [
//     "/AddWaiter",
//     "/ChangeUserInfo",
//     "/AdminLogin",
//     "/WaiterPage",
//     "/ItemManager",
//     "/EditItem",
//     "/AddItem",
//     "/AdminHome",
//   ];

//   const isAdmin = adminRoutes.some((route) =>
//     location.pathname.toLowerCase().includes(route.toLowerCase())
//   );

//   useEffect(() => {
//     const root = document.documentElement;
//     root.style.setProperty(
//       "--pulse-color",
//       isAdmin ? "#3B82F6" : "#FB923C"
//     );
//   }, [isAdmin]);

//   return (
//     <>
//       {isVisible && (
//         <div className="route-pulse-loader" key={location.pathname} />
//       )}
//     </>
//   );
// };

// export default RouteProgress;

import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import "../nprogress-custom.css";

NProgress.configure({
  showSpinner: false,
  trickle: false,
});

const RouteProgress = () => {
  const location = useLocation();

  // مسیرهای ادمین
  const adminRoutes = [
    "/AddWaiter",
    "/ChangeUserInfo",
    "/AdminLogin",
    "/WaiterPage",
    "/ItemManager",
    "/EditItem",
    "/AddItem",
    "/AdminHome",
  ];

  const isAdmin = adminRoutes.some((route) =>
    location.pathname.toLowerCase().includes(route.toLowerCase())
  );

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      "--nprogress-color",
      isAdmin ? "#3b82f6" : "#f97316"
    );

    NProgress.start();
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 500);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return null;
};

export default RouteProgress;
