import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { BASE_PATH } from "../constants/paths.js";
import Card from "../Componnets/Card.jsx";
import SkeletonCard from "../Componnets/SkeletonCard.jsx";

import { AnimatePresence, motion } from "framer-motion";
import { useAnimation } from "../constants/AnimationContext";

function FavoritePage({
  setFooterShrink,
  setCurrentPage,
  setHeaderMenuOpen,
  setHeaderShrink,
}) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const shouldAnimate = useAnimation();
  const MotionOrDiv = shouldAnimate ? motion.div : "div";

  const [skeletonCounter, setSkeletonCounter] = useState(0);
  const [isLoadingItems, setIsLoadingItems] = useState(false);

  const [blurActive, setBlurActive] = useState(false);
  const [activeCardData, setActiveCardData] = useState(null);

  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const [orderCounts, setOrderCounts] = useState({});

  // SCROLL FOOTER -------------------------------------------------
  const lastScrollTop = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

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

          lastScrollTop.current = Math.max(0, currentScrollTop);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    // For flashing on LOADING P1AGE
    setIsPageLoaded(true);
  }, []);

  // Scroll For NOT HOLD CARD ------------------------------------------
  useEffect(() => {
    if (blurActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [blurActive]);

  useEffect(() => {
    const liked_food = localStorage.getItem("liked_items");
    const likedFoodArray = JSON.parse(liked_food);
    setIsLoadingItems(true);
    setSkeletonCounter(likedFoodArray?.length || 0);

    async function fetchItems() {
      setError(null);
      try {
        const response = await axios.post(
          `${BASE_PATH}/food/get_food_list_by_id`,
          liked_food,
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
      setIsLoadingItems(false);
    }

    fetchItems();
  }, []);

  return (
    <>
      <AnimatePresence>
        {blurActive && (
          <>
            {/* تارکننده */}
            <MotionOrDiv
              className="fixed inset-0 bg-black/20 backdrop-blur-md z-40 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* کارت بالا */}
            {activeCardData && (
              <MotionOrDiv
                className="fixed left-1/2 top-1/2 z-50 w-80 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1.07, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}>
                <Card
                  expanded={true}
                  {...activeCardData}
                  setBlurActive={setBlurActive}
                  setActiveCardData={setActiveCardData}
                />
              </MotionOrDiv>
            )}
          </>
        )}
      </AnimatePresence>

      <div
        style={{ WebkitOverflowScrolling: "touch" }}
        className={`${
          isPageLoaded
            ? "transition-colors duration-300"
            : "transition-none duration-0"
        } bg-backgroundcolor dark:bg-backgroundcolorDark w-screen min-h-screen overflow-x-hidden pb-18 md:pb-3 pt-18 md:pt-20`}>
        {isLoadingItems ? (
          <div className="grid max-xs:grid-cols-1 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10 4xl:grid-cols-12 gap-y-4 gap-x-2 mt-2 justify-center items-center">
            {Array.from({ length: skeletonCounter }).map((_, index) => (
              <div key={index}>
                <SkeletonCard />
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-center my-4 text-primary">{error}</p>
        ) : (
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
