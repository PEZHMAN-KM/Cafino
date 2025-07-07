import React, { useState, useEffect, useRef } from "react";

import Card from "../Componnets/Card.jsx";
import SkeletonCard from "../Componnets/SkeletonCard.jsx";

import { BASE_PATH } from "../constants/paths.js";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useAnimation } from "../constants/AnimationContext.jsx";
import { useBlur } from "../constants/BlurContext.jsx";

// FOR BANNER
import bannerImage from "../../public/Banner.jpg";

function Home({
  setFooterShrink,
  setCurrentPage,
  setHeaderMenuOpen,
  // PAGE 01 ------------------------
  setHideIcons,
  hideIcons,
  searchActive,
  searchTerm,
  setHeaderShrink,
  setFetchItems,
  selectedCategory,
}) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const shouldAnimate = useAnimation();
  const MotionOrDiv = shouldAnimate ? motion.div : "div";
  const reduceBlur = useBlur();

  const [isLoadingItems, setIsLoadingItems] = useState(false);

  const [blurActive, setBlurActive] = useState(false);
  const [activeCardData, setActiveCardData] = useState(null);

  const lastScrollTop = useRef(0);

  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const [orderCounts, setOrderCounts] = useState({});

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
    setIsLoadingItems(true);
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
        if (response.status == 204) {
          setError("نتیجه‌ای یافت نشد");
        } else {
          setItems(response.data);
        }
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

        if (
          response.data.on_sale_food.length === 0 &&
          response.data.not_on_sale_food.length === 0
        ) {
          setError("نتیجه‌ای یافت نشد");
        }
      } catch (err) {
        setError("خطا در دریافت داده‌ها");
      }
    }
    setIsLoadingItems(false);
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

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // SCROLL FOR HIDEICONS ------------------------------------------------
          const currentScrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

          if (currentScrollTop < 30) {
            setHideIcons(false);
            setHeaderShrink(false);
          } else if (currentScrollTop > 100) {
            setHideIcons(true);
            setHeaderShrink(true);
          }

          // SCROLL FOR FOOTER ------------------------------------------------
          const scrollingDown = currentScrollTop > lastScrollTop.current + 2;
          const scrollingUp = currentScrollTop < lastScrollTop.current - 2;

          if (scrollingDown) {
            setHeaderMenuOpen(false);
            setFooterShrink(true);
          } else if (scrollingUp) {
            setHeaderMenuOpen(false);
            setFooterShrink(false);
          }

          lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop;

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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

  useEffect(() => {
    if (setFetchItems) {
      setFetchItems(() => fetchItems);
    }
  }, [selectedCategory]);

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

  return (
    <>
      <AnimatePresence>
        {blurActive && (
          <>
            {/* تارکننده */}
            <MotionOrDiv
              className={`fixed inset-0 ${
                reduceBlur ? "bg-black/70" : "bg-black/20"
              } backdrop-blur-md z-40 w-full h-full`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* کارت بالا */}
            {activeCardData && (
              <MotionOrDiv
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
              </MotionOrDiv>
            )}
          </>
        )}
      </AnimatePresence>
      {/* FOR FIX COLAPSE UP DOWN | [ H(SUBHEADER) => !HIDE - HIDE = H(HIDE) HEADER ] */}
      <div
        style={{ WebkitOverflowScrolling: "touch" }}
        className={`${
          isPageLoaded
            ? "transition-colors duration-300"
            : "transition-none duration-0"
        } bg-backgroundcolor dark:bg-backgroundcolorDark w-screen min-h-screen overflow-x-hidden pb-15 md:pb-3 ${
          hideIcons && "" // pb-20 lg:pb-17
        }`}>
        <div className="animate-scale-up">
          <div className="mt-20">
            {/* BANNER IMAGE */}
            {/* <div className="flex justify-center items-center w-screen">
              <img
                className="object-center object-cover p-4 rounded-4xl"
                src={bannerImage}
                alt=""
              />
            </div> */}
            {isLoadingItems ? (
              <div className="grid max-xs:grid-cols-1 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10 4xl:grid-cols-12 gap-y-4 gap-x-2 mt-2 justify-center items-center">
                {Array.from({ length: 12 }).map((_, index) => (
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
        </div>
      </div>
    </>
  );
}

export default Home;
