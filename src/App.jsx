import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [fetchItems, setFetchItems] = useState(null);

  const headerRef = useRef(null);
  const headerInputRef = useRef(null);

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
            setFetchItems={setFetchItems}
            searchActive={searchActive}
            setSearchActive={setSearchActive}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            headerInputRef={headerInputRef}
            setHeaderShrink={setHeaderShrink}
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
        return <Item setCurrentPage={setCurrentPage} />;
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
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute w-full h-full">
          {renderPage()}
        </motion.div>
      </AnimatePresence>

      {currentPage != 0 && currentPage != 5 && (
        <Footer
          page={currentPage}
          setPage={setCurrentPage}
          shrink={footerShrink}
          setFooterShrink={setFooterShrink}
          setHeaderShrink={setHeaderShrink}
        />
      )}
    </div>
  );
};

export default App;
