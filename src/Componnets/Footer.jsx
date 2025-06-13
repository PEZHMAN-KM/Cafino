import React, { useState, useEffect } from "react";
import { Icons } from "./Icons";

const size_icon = 10;

function Footer({ page }) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

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
      <div
        className={`${
          isPageLoaded
            ? "transition-colors duration-300"
            : "transition-none duration-0"
        } bg-white dark:bg-darkpalleteDark  fixed w-screen bottom-0 md:hidden ${
          page == 3 ? " px-6 pb-6 pt-3" : "p-6 rounded-t-3xl"
        }`}>
        <div className="flex items-center justify-between px-5">
          {/* Contact Us Button */}
          <a
            className="hover:scale-125 transition-all duration-300"
            href="ContactUs">
            <Icons.call
              className={` w-${size_icon} transition-colors duration-300 ${
                page == 4
                  ? "stroke-primary fill-primary"
                  : "stroke-highgray dark:stroke-highgrayDark fill-highgray dark:fill-highgrayDark"
              }`}
            />
          </a>
          {/* Order Button */}
          <a
            href="Order"
            className="relative hover:scale-125 transition-all duration-300">
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
          </a>
          {/* Favorite Button */}
          <a
            className="hover:scale-125 transition-all duration-300"
            href="FavoritePage">
            <Icons.favorite
              className={` w-${size_icon} transition-colors duration-300 ${
                page == 2
                  ? "stroke-primary fill-primary"
                  : "stroke-highgray dark:stroke-highgrayDark fill-highgray dark:fill-highgrayDark"
              }`}
            />
          </a>
          {/* Home Button */}
          <a
            className="hover:scale-125 transition-all duration-300"
            href="Home">
            <Icons.home
              className={` w-${size_icon} transition-colors duration-300 ${
                page == 1
                  ? "stroke-primary fill-primary"
                  : "stroke-highgray dark:stroke-highgrayDark fill-highgray dark:fill-highgrayDark"
              }`}
            />
          </a>
        </div>
      </div>
    </>
  );
}

export default Footer;
