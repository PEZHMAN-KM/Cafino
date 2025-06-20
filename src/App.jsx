import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimationContext } from "./constants/AnimationContext.jsx";

import Home from "./Pages/Home.jsx";
import FavoritePage from "./Pages/FavoritePage.jsx";
import Order from "./Pages/Order.jsx";
import ContactUs from "./Pages/ContactUs.jsx";
import Footer from "./Componnets/Footer.jsx";
import Item from "./Pages/Item.jsx";
import Landing from "./Pages/Landing.jsx";
import Header from "./Componnets/Header.jsx";

const App = () => {
  const [currentPage, setCurrentPage] = useState(0); // 1:Home, 2:Fav, 3:Cart, 4:Contact
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

  // تشخیص فعال بودن انیمیشن مثلاً با کلاس body یا دستگاه ضعیف
  const shouldAnimate = !document.body.classList.contains("no-anim");
  const MotionOrDiv = shouldAnimate ? motion.div : "div";

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return <Landing setCurrentPage={setCurrentPage} />;
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
          />
        );
      case 4:
        return (
          <ContactUs
            setFooterShrink={setFooterShrink}
            setHeaderMenuOpen={setHeaderMenuOpen}
            setHeaderShrink={setHeaderShrink}
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
        {currentPage != 0 && currentPage != 5 && (
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
          />
        )}

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

        {currentPage != 0 && currentPage != 5 && (
          <Footer
            shouldAnimate={shouldAnimate}
            page={currentPage}
            setPage={setCurrentPage}
            shrink={footerShrink}
            setFooterShrink={setFooterShrink}
            setHeaderShrink={setHeaderShrink}
            // -PAGE 01 -------------------------------------
            setHideIcons={setHideIcons}
            scrollContainerRef={scrollContainerRef}
          />
        )}
      </div>
    </AnimationContext.Provider>
  );
};

export default App;
