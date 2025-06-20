import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { BASE_PATH } from "../constants/paths.js";
import Card from "../Componnets/Card.jsx";

import { AnimatePresence, motion } from "framer-motion";

function FavoritePage({
  setFooterShrink,
  setCurrentPage,
  setHeaderMenuOpen,
  setHeaderShrink,
}) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [blurActive, setBlurActive] = useState(false);
  const [activeCardData, setActiveCardData] = useState(null);

  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const [orderCounts, setOrderCounts] = useState({});

  // SCROLL FOOTER -------------------------------------------------
  const scrollContainerRef = useRef(null);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollTop = scrollContainer.scrollTop;

          const scrollingDown = currentScrollTop > lastScrollTop.current + 2;
          const scrollingUp = currentScrollTop < lastScrollTop.current - 2;

          if (currentScrollTop <= 20) {
            setHeaderShrink(false);
          } else {
            setHeaderShrink(true);
          }

          if (scrollingDown) {
            setFooterShrink(true);
            setHeaderMenuOpen(false);
          } else if (scrollingUp) {
            setFooterShrink(false);
            setHeaderMenuOpen(false);
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
  // ----------------------------------------------------------------

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
  }, []);

  useEffect(() => {
    const lided_food = localStorage.getItem("liked_items");

    async function fetchItems() {
      setError(null);
      try {
        const response = await axios.post(
          `${BASE_PATH}/food/get_food_list_by_id`,
          lided_food,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status == 204) {
          setError("نتیجه‌ای یافت نشد");
        } else {
          setItems([...response.data]);
        }
      } catch (err) {
        setError("آیتمی یافت نشد!");
      }
    }

    fetchItems();
  }, []);

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
                className="fixed left-1/2 top-1/2 z-50 w-80 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1.07, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}>
                <Card
                  {...activeCardData}
                  setBlurActive={setBlurActive}
                  setActiveCardData={setActiveCardData}
                />
              </motion.div>
            )}
          </>
        )}
      </AnimatePresence>

      <div
        ref={scrollContainerRef}
        className={`${
          isPageLoaded
            ? "transition-colors duration-300"
            : "transition-none duration-0"
        } bg-backgroundcolor dark:bg-backgroundcolorDark w-screen h-screen overflow-y-auto scrollbar scrollbar-none overflow-x-hidden pb-18 md:pb-3 pt-16 md:pt-20`}>
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
                setCurrentPage={setCurrentPage}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default FavoritePage;
