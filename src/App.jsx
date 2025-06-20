import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./Pages/Home.jsx";
import FavoritePage from "./Pages/FavoritePage.jsx";
import Order from "./Pages/Order.jsx";
import ContactUs from "./Pages/ContactUs.jsx";
import Footer from "./Componnets/Footer.jsx";
import Item from "./Pages/Item.jsx";
import Landing from "./Pages/Landing.jsx";

const App = () => {
  const [currentPage, setCurrentPage] = useState(0); // 1:Home, 2:Fav, 3:Cart, 4:Contact
  const [footerShrink, setFooterShrink] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return <Landing setCurrentPage={setCurrentPage} />;
      case 1:
        return (
          <Home
            setFooterShrink={setFooterShrink}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        );
      case 2:
        return (
          <FavoritePage
            setFooterShrink={setFooterShrink}
            setCurrentPage={setCurrentPage}
          />
        );
      case 3:
        return (
          <Order
            setFooterShrink={setFooterShrink}
            footerShrink={footerShrink}
            setCurrentPage={setCurrentPage}
          />
        );
      case 4:
        return (
          <ContactUs
            setFooterShrink={setFooterShrink}
            setCurrentPage={setCurrentPage}
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
        />
      )}
    </div>
  );
};

export default App;
