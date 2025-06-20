import React, { useState, useEffect } from "react";
import { Icons } from "./Icons";

const size_icon = 10;
const pageTitles = {
  1: "خونه",
  2: "علاقه‌مندی",
  3: "سبد خرید",
  4: "تماس با ما",
};

function Footer({ page, shrink, setFooterShrink, setPage }) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const haptic = 10;

  const [totalOrderCount, setTotalOrderCount] = useState(0);
  const calculateTotal = () => {
    const storedOrder = JSON.parse(localStorage.getItem("order") || "[]");
    const totalCount = storedOrder.reduce((sum, [, count]) => sum + count, 0);
    setTotalOrderCount(totalCount);
  };

  useEffect(() => {
    // For flashing on LOADING PAGE
    setIsPageLoaded(true);

    calculateTotal();

    const handleOrderUpdated = () => {
      calculateTotal();
    };

    window.addEventListener("orderUpdated", handleOrderUpdated);

    return () => {
      window.removeEventListener("orderUpdated", handleOrderUpdated);
    };
  }, []);

  return (
    <>
      <div className="flex justify-center items-center">
        <div
          className={`${
            isPageLoaded
              ? "transition-all duration-300"
              : "transition-none duration-0"
          } ${
            shrink ? "scale-50 w-fit" : "scale-100 w-[98vw]"
          } origin-bottom bg-backgroundcolor/30 dark:bg-backgroundcolorDark/30 backdrop-blur-md shadow-lg border-t border-white/20 dark:border-white/10 fixed bottom-3 md:hidden px-6 py-2 rounded-3xl`}>
          {shrink ? (
            <button
              onClick={() => setFooterShrink(false)}
              className="text-2xl text-black dark:text-white text-center select-none">
              {pageTitles[page] || "صفحه ناشناس"}
            </button>
          ) : (
            <div className="flex items-center justify-between px-5">
              {/* Contact Us Button */}
              <button
                onClick={() => {
                  if ("vibrate" in navigator && typeof window !== "undefined") {
                    navigator.vibrate(haptic);
                  }
                  setPage(4);
                }}
                className="transition-all duration-300">
                <Icons.call
                  className={` w-${size_icon} transition-colors duration-300 ${
                    page == 4
                      ? "stroke-primary fill-primary"
                      : "stroke-highgray dark:stroke-highgrayDark fill-highgray dark:fill-highgrayDark"
                  }`}
                />
              </button>
              {/* Order Button */}
              <button
                onClick={() => {
                  if ("vibrate" in navigator && typeof window !== "undefined") {
                    navigator.vibrate(haptic);
                  }
                  setPage(3);
                }}
                href="Order"
                className="relative transition-all duration-300">
                {totalOrderCount > 0 && (
                  <div className="absolute -right-1 -top-1 bg-primary w-6 h-6 rounded-full flex justify-center items-center font-bold text-white text-sm">
                    {totalOrderCount}
                  </div>
                )}
                <Icons.bag
                  className={` w-${size_icon} transition-colors duration-300 ${
                    page == 3
                      ? "stroke-primary"
                      : "stroke-highgray dark:stroke-highgrayDark"
                  }`}
                />
              </button>
              {/* Favorite Button */}
              <button
                onClick={() => {
                  if ("vibrate" in navigator && typeof window !== "undefined") {
                    navigator.vibrate(haptic);
                  }
                  setPage(2);
                }}
                className="transition-all duration-300"
                href="FavoritePage">
                <Icons.favorite
                  className={` w-${size_icon} transition-colors duration-300 ${
                    page == 2
                      ? "stroke-primary fill-primary"
                      : "stroke-highgray dark:stroke-highgrayDark fill-highgray dark:fill-highgrayDark"
                  }`}
                />
              </button>
              {/* Home Button */}
              <button
                onClick={() => {
                  if ("vibrate" in navigator && typeof window !== "undefined") {
                    navigator.vibrate(haptic);
                  }
                  setPage(1);
                }}
                className="transition-all duration-300"
                href="Home">
                <Icons.home
                  className={` w-${size_icon} transition-colors duration-300 ${
                    page == 1
                      ? "stroke-primary fill-primary"
                      : "stroke-highgray dark:stroke-highgrayDark fill-highgray dark:fill-highgrayDark"
                  }`}
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Footer;
