import React, { useState, useEffect, useRef } from "react";

import Header from "../Componnets/Header.jsx";
import Footer from "../Componnets/Footer.jsx";
import SubHeder from "../Componnets/SubHeder.jsx";
import Card from "../Componnets/Card.jsx";

import { BASE_PATH } from "../constants/paths.js";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";

// FOR BANNER
import bannerImage from "../../public/Banner.jpg";

function Home() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [blurActive, setBlurActive] = useState(false);
  const [activeCardData, setActiveCardData] = useState(null);

  const [hideIcons, setHideIcons] = useState(false);
  const scrollContainerRef = useRef(null);
  const headerRef = useRef(null);
  const headerInputRef = useRef(null);
  const [footerShrink, setFooterShrink] = useState(false);
  const lastScrollTop = useRef(0);

  const [selectedCategory, setSelectedCategory] = useState(1);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const [orderCounts, setOrderCounts] = useState({});

  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [subHeaderMenuOpen, setSubHeaderMenuOpen] = useState(false);

  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const updateOrder = (id, newCount) => {
    const updatedCounts = { ...orderCounts };

    if (newCount > 0) {
      updatedCounts[id] = newCount;
    } else {
      delete updatedCounts[id];
    }

    const orderArray = Object.entries(updatedCounts).map(([key, value]) => [
      Number(key),
      value,
    ]);
    localStorage.setItem("order", JSON.stringify(orderArray));
    setOrderCounts(updatedCounts);
    window.dispatchEvent(new Event("orderUpdated"));
  };

  async function fetchItems() {
    setError(null);
    if (selectedCategory === -1) {
      try {
        const response = await axios.get(
          `${BASE_PATH}/food/get_all_on_sale_foods`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setItems(response.data);
      } catch (err) {
        setError("خطا در دریافت داده‌ها");
      }
    } else {
      try {
        const response = await axios.post(
          `${BASE_PATH}/food/show_category_foods`,
          { category_id: selectedCategory },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setItems([
          ...response.data.on_sale_food,
          ...response.data.not_on_sale_food,
        ]);
      } catch (err) {
        setError("خطا در دریافت داده‌ها");
      }
    }
  }

  const fetchSearchResults = async () => {
    try {
      const response = await axios.post(
        `${BASE_PATH}/food/search_food`,
        {},
        {
          params: { search: searchTerm },
          headers: { accept: "application/json" },
        }
      );
      if (response.status === 204 || !Array.isArray(response.data)) {
        setItems([]);
        setError("نتیجه‌ای یافت نشد");
      } else {
        setItems(response.data);
        setError(null);
      }
    } catch (err) {
      setError("خطا در دریافت نتایج جستجو");
      setItems([]);
    }
  };

  function scrollToTopAndFocus() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (headerInputRef.current) {
      headerInputRef.current.focus();
    }
  }

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem("order") || "[]");
    const counts = {};
    storedOrder.forEach(([id, count]) => {
      counts[id] = count;
    });
    setOrderCounts(counts);
  }, []);

  useEffect(() => {
    // For flashing on LOADING PAGE
    setIsPageLoaded(true);

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // SCROLL FOR HIDEICONS ------------------------------------------------
          const currentScrollTop = scrollContainer.scrollTop;

          if (currentScrollTop <= 40) {
            setHideIcons(false);
            window.dispatchEvent(new CustomEvent("closeMenus"));
          } else {
            setHideIcons(true);
          }

          // SCROLL FOR FOOTER ------------------------------------------------
          const scrollingDown = currentScrollTop > lastScrollTop.current + 2;
          const scrollingUp = currentScrollTop < lastScrollTop.current - 2;

          if (scrollingDown) {
            setFooterShrink(true);
          } else if (scrollingUp) {
            setFooterShrink(false);
          }

          lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop;

          ticking = false;
        });
        ticking = true;
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (searchActive) {
      if (searchTerm.trim() === "") {
        setItems([]);
        return;
      }
      fetchSearchResults();
    } else {
      if (!selectedCategory) return;
      fetchItems();
    }
  }, [searchActive, searchTerm, selectedCategory]);

  // FOOTER SCROLL
  // useEffect(() => {
  //   const scrollContainer = scrollContainerRef.current;
  //   if (!scrollContainer) return;

  //   let lastScrollTop = 0;
  //   let ticking = false;

  //   const handleScroll = () => {
  //     if (!ticking) {
  //       window.requestAnimationFrame(() => {
  //         const currentScrollTop = scrollContainer.scrollTop;

  //         // بالا یا پایین اسکرول رفتن
  //         const scrollingDown = currentScrollTop > lastScrollTop;

  //         setHideIcons(currentScrollTop > 40);
  //         setFooterShrink(scrollingDown); // 👈 shrink وقتی پایین میریم

  //         lastScrollTop = currentScrollTop;
  //         ticking = false;
  //       });
  //       ticking = true;
  //     }
  //   };

  //   scrollContainer.addEventListener("scroll", handleScroll);
  //   return () => scrollContainer.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <>
      <AnimatePresence>
        {blurActive && (
          <>
            {/* تارکننده */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-md z-40 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* کارت بالا */}
            {activeCardData && (
              <motion.div
                className="fixed left-1/2 top-1/2 z-50 w-[80vw] -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1.07, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}>
                <Card
                  expanded={true}
                  {...activeCardData}
                  setBlurActive={setBlurActive}
                  setActiveCardData={setActiveCardData}
                />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>
      {/* FOR FIX COLAPSE UP DOWN | [ H(SUBHEADER) => !HIDE - HIDE = H(HIDE) HEADER ] */}
      <div
        ref={scrollContainerRef}
        className={`${
          isPageLoaded
            ? "transition-colors duration-300"
            : "transition-none duration-0"
        } bg-backgroundcolor dark:bg-backgroundcolorDark w-screen h-screen overflow-y-auto scrollbar scrollbar-none overflow-x-hidden pb-15 md:pb-3 ${
          hideIcons && "pb-20 lg:pb-17"
        }`}>
        <Header
          page={1}
          showMenu={headerMenuOpen}
          setShowMenu={setHeaderMenuOpen}
          searchActive={searchActive}
          setSearchActive={setSearchActive}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          fetchItems={fetchItems}
          ref={headerRef}
          headerInputRef={headerInputRef}
        />

        <div className="animate-scale-up">
          {!searchActive && (
            <SubHeder
              onCategorySelect={setSelectedCategory}
              hideIcons={hideIcons}
              showMenu={subHeaderMenuOpen}
              onSearchClick={scrollToTopAndFocus}
              setShowMenu={setSubHeaderMenuOpen}
              setSearchActive={setSearchActive}
              className={`${
                isPageLoaded
                  ? "transition-all duration-300"
                  : "transition-none duration-0"
              } sticky top-2 pt-[env(safe-area-inset-top)] z-10 bg-backgroundcolor/30 dark:bg-backgroundcolorDark/30 backdrop-blur-md border-white/20 dark:border-white/10 ${
                !hideIcons
                  ? "h-29 lg:h-34 rounded-b-none w-screen m-0 shadow-lg border-b"
                  : "h-11 lg:h-17 rounded-3xl w-[98vw] mx-auto shadow-lg border"
              }`}
            />
          )}
          {/* BANNER IMAGE */}
          {/* <div className="flex justify-center items-center w-screen">
            <img
              className="object-center object-cover p-4 rounded-4xl"
              src={bannerImage}
              alt=""
            />
          </div> */}

          {error && <p className="text-center my-4 text-primary">{error}</p>}

          {!error && (
            <div className="grid max-xs:grid-cols-1 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10 4xl:grid-cols-12 gap-y-4 gap-x-2 mt-2 justify-center items-center">
              {items.map((item) => (
                <Card
                  key={item.id}
                  id={item.id}
                  in_sale={item.in_sale}
                  pic_url={item.pic_url}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  sale_price={item.sale_price}
                  updateOrder={updateOrder}
                  count={orderCounts[item.id] || 0}
                  setBlurActive={setBlurActive}
                  setActiveCardData={setActiveCardData}
                />
              ))}
            </div>
          )}
        </div>
        <Footer page={1} shrink={footerShrink} />
      </div>
    </>
  );
}

export default Home;
