import React, { useRef, useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimationContext } from "./constants/AnimationContext.jsx";

import Header from "./Componnets/Header.jsx";
import Footer from "./Componnets/Footer.jsx";

import ContactUs from "./Pages/ContactUs.jsx";
import Landing from "./Pages/Landing.jsx";

const Home = lazy(() => import("./Pages/Home.jsx"));
const FavoritePage = lazy(() => import("./Pages/FavoritePage.jsx"));
const Order = lazy(() => import("./Pages/Order.jsx"));
const Item = lazy(() => import("./Pages/Item.jsx"));
const EasyPage = lazy(() => import("./Pages/EasyPage.jsx"));

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [footerShrink, setFooterShrink] = useState(false);
  const [headerShrink, setHeaderShrink] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);

  // PAGE 01 -----------------------------------------------------------------------------
  const [hideIcons, setHideIcons] = useState(false);

  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchItems, setFetchItems] = useState(null);
  const headerRef = useRef(null);
  const headerInputRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const shouldAnimate = !document.body.classList.contains("no-anim");
  const MotionOrDiv = shouldAnimate ? motion.div : "div";

  const goHome = () => {
    setSearchActive(false);
    setSearchTerm("");
  };

  // NETWORK SPEED CONTROL ---------------------------------------------
  // const [netSpeed, SetNetSpeed] = useState(4);

  // const connection =
  //   navigator.connection ||
  //   navigator.mozConnection ||
  //   navigator.webkitConnection;
  // const netType = connection?.effectiveType || "unknown";
  // if (netType === "slow-2g") {
  //   // console.log("اینترنت خیلی ضعیف است، نسخه بسیار سبک اجرا شود.");
  //   SetNetSpeed(1);
  // } else if (netType === "2g") {
  //   // console.log("اینترنت ضعیف است، ویدئوها حذف شود.");
  //   SetNetSpeed(2);
  // } else if (netType === "3g") {
  //   // console.log("اینترنت متوسط است، عکس‌ها با کیفیت متوسط لود شوند.");
  //   SetNetSpeed(3);
  // } else if (netType === "4g") {
  //   // console.log("اینترنت خوب است، همه امکانات فعال باشند.");
  //   SetNetSpeed(4);
  // } else {
  //   // console.log("نوع اتصال مشخص نیست، حالت پیش‌فرض اجرا شود.");
  //   SetNetSpeed(4)
  // }

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return (
          <Landing
            setCurrentPage={setCurrentPage}
            goHome={goHome}
            setHeaderMenuOpen={setHeaderMenuOpen}
          />
        );
      case 1:
        return (
          <Home
            setFooterShrink={setFooterShrink}
            setCurrentPage={setCurrentPage}
            setHeaderMenuOpen={setHeaderMenuOpen}
            headerMenuOpen={headerMenuOpen}
            // PAGE 01 --------------------------------------------
            setHideIcons={setHideIcons}
            hideIcons={hideIcons}
            setFetchItems={setFetchItems}
            searchActive={searchActive}
            setSearchActive={setSearchActive}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            headerInputRef={headerInputRef}
            setHeaderShrink={setHeaderShrink}
            scrollContainerRef={scrollContainerRef}
          />
        );
      case 2:
        return (
          <FavoritePage
            setFooterShrink={setFooterShrink}
            setCurrentPage={setCurrentPage}
            setHeaderMenuOpen={setHeaderMenuOpen}
            setHeaderShrink={setHeaderShrink}
            scrollContainerRef={scrollContainerRef}
          />
        );
      case 3:
        return (
          <Order
            setFooterShrink={setFooterShrink}
            footerShrink={footerShrink}
            setCurrentPage={setCurrentPage}
            setHeaderMenuOpen={setHeaderMenuOpen}
            setHeaderShrink={setHeaderShrink}
            scrollContainerRef={scrollContainerRef}
          />
        );
      case 4:
        return (
          <ContactUs
            setFooterShrink={setFooterShrink}
            setHeaderMenuOpen={setHeaderMenuOpen}
            setHeaderShrink={setHeaderShrink}
            scrollContainerRef={scrollContainerRef}
          />
        );
      case 5:
        return (
          <Item
            setCurrentPage={setCurrentPage}
            setHeaderShrink={setHeaderShrink}
            setHideIcons={setHideIcons}
          />
        );
      case 6:
        return <EasyPage setCurrentPage={setCurrentPage} />;
      default:
        return (
          // <HomePage
          //   setFooterShrink={setFooterShrink}
          //   setCurrentPage={setCurrentPage}
          // />
          <div></div>
        );
    }
  };

  return (
    <AnimationContext.Provider value={shouldAnimate}>
      <div className="relative w-full h-screen overflow-hidden">
        {currentPage != 0 && currentPage != 5 && currentPage != 6 && (
          <Header
            setCurrentPage={setCurrentPage}
            page={currentPage}
            showMenu={headerMenuOpen}
            setShowMenu={setHeaderMenuOpen}
            headerShrink={headerShrink}
            setHeaderShrink={setHeaderShrink}
            // PAGE 01 ----------------------------------------
            searchActive={searchActive}
            setSearchActive={setSearchActive}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            fetchItems={fetchItems}
            ref={headerRef}
            headerInputRef={headerInputRef}
            goHome={goHome}
          />
        )}

        <Suspense
          fallback={<div className="p-5 text-center">در حال بارگذاری...</div>}>
          <AnimatePresence mode="wait">
            <MotionOrDiv
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute w-full h-full">
              {renderPage()}
            </MotionOrDiv>
          </AnimatePresence>
        </Suspense>

        {currentPage != 0 && currentPage != 5 && currentPage != 6 && (
          <Footer
            shouldAnimate={shouldAnimate}
            page={currentPage}
            setPage={setCurrentPage}
            shrink={footerShrink}
            setFooterShrink={setFooterShrink}
            setHeaderShrink={setHeaderShrink}
            // PAGE 01 -------------------------------------
            setHideIcons={setHideIcons}
            scrollContainerRef={scrollContainerRef}
            goHome={goHome}
          />
        )}
      </div>
    </AnimationContext.Provider>
  );
};

export default App;
