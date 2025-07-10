import React, { useState, useEffect } from "react";
import { Icons } from "../Componnets/Icons.jsx";
import { ADMIN_PAGE_TITLES } from "../constants/paths.js";
import { useBlur } from "../constants/BlurContext.jsx";

const size_icon = 10;

export default function AdminFooter({
  page,
  shrink,
  setFooterShrink,
  setPage,
  setHeaderShrink,
  shouldAnimate,
  setHeaderMenuOpen,
}) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const reduceBlur = useBlur();
  const haptic = 10;

  useEffect(() => {
    // For flashing on LOADING PAGE
    setIsPageLoaded(true);
  }, []);

  function goToTop() {
    window.scrollTo({
      top: 0,
      ...(shouldAnimate ? { behavior: "smooth" } : {}),
    });
  }

  return (
    <>
      <div className="flex justify-center items-center">
        <div
          className={`${
            isPageLoaded
              ? "transition-all duration-300"
              : "transition-none duration-0"
          } ${shrink ? "scale-50 w-fit" : "scale-100 w-[98vw]"} origin-bottom ${
            reduceBlur
              ? "bg-backgroundcolor dark:bg-backgroundcolorDark" //bg-backgroundcolor/30 dark:bg-backgroundcolorDark/30
              : "bg-backgroundcolor/30 dark:bg-backgroundcolorDark/30 border-white/20 dark:border-white/10 border"
          } backdrop-blur-md shadow-lg fixed bottom-3 md:hidden px-6 py-2 rounded-3xl`}>
          {shrink ? (
            <button
              onClick={() => setFooterShrink(false)}
              className="text-2xl text-black dark:text-white text-center">
              {ADMIN_PAGE_TITLES[page] || "صفحه ناشناس"}
            </button>
          ) : (
            <div
              className="flex items-center justify-around" // flex-row-reverse
            >
              {/* --------------------------------------------------------- Set Order Button --------------------------------------------------------- */}
              <button
                onClick={() => {
                  if ("vibrate" in navigator && typeof window !== "undefined") {
                    navigator.vibrate(haptic);
                  }
                  setPage(11);
                  setHeaderShrink(false);
                  goToTop();
                  setHeaderMenuOpen(false);
                }}
                className="transition-all duration-300 flex gap-1 justify-center items-center">
                <Icons.bag
                  className={` w-${size_icon} transition-colors duration-300 ${
                    page == 11
                      ? "stroke-adminAction"
                      : "stroke-highgray dark:stroke-highgrayDark"
                  }`}
                />
              </button>
              {/* --------------------------------------------------------- Report Button --------------------------------------------------------- */}
              <button
                onClick={() => {
                  if ("vibrate" in navigator && typeof window !== "undefined") {
                    navigator.vibrate(haptic);
                  }
                  setPage(10);
                  setHeaderShrink(false);
                  goToTop();
                  setHeaderMenuOpen(false);
                }}
                className="transition-all duration-300 flex gap-1 justify-center items-center">
                <Icons.bell
                  className={` w-${size_icon} transition-colors duration-300 ${
                    page == 10
                      ? "stroke-adminAction"
                      : "stroke-highgray dark:stroke-highgrayDark"
                  }`}
                />
              </button>
              {/* --------------------------------------------------------- Item Manager Button --------------------------------------------------------- */}
              <button
                onClick={() => {
                  if ("vibrate" in navigator && typeof window !== "undefined") {
                    navigator.vibrate(haptic);
                  }
                  setPage(2);
                  setHeaderShrink(false);
                  goToTop();
                  setHeaderMenuOpen(false);
                }}
                className="transition-all duration-300 flex gap-1 justify-center items-center">
                <Icons.wallet
                  className={` w-${size_icon} transition-colors duration-300 ${
                    page == 2
                      ? "stroke-adminAction"
                      : "stroke-highgray dark:stroke-highgrayDark"
                  }`}
                />
              </button>
              {/* --------------------------------------------------------- Home Button --------------------------------------------------------- */}
              <button
                onClick={() => {
                  if ("vibrate" in navigator && typeof window !== "undefined") {
                    navigator.vibrate(haptic);
                  }
                  setPage(1);
                  setHeaderShrink(false);
                  goToTop();
                  setHeaderMenuOpen(false);
                }}
                className="transition-all duration-300 flex gap-1 justify-center items-center">
                <Icons.home
                  className={` w-${size_icon} transition-colors duration-300 ${
                    page == 1
                      ? "stroke-adminAction fill-adminAction"
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
