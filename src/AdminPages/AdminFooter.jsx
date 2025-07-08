import React, { useState, useEffect } from "react";
import { Icons } from "../Componnets/Icons.jsx";
import { ADMIN_PAGE_TITLES } from "../constants/paths";
import { useBlur } from "../constants/BlurContext.jsx";

const size_icon = 10;

function AdminFooter({
  page,
  shrink,
  setFooterShrink,
  setPage,
  setHeaderShrink,
  shouldAnimate,
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
              {/* --------------------------------------------------------- Profile Button --------------------------------------------------------- */}
              <button
                onClick={() => {
                  if ("vibrate" in navigator && typeof window !== "undefined") {
                    navigator.vibrate(haptic);
                  }
                  setPage(8);
                  setHeaderShrink(false);
                  goToTop();
                }}
                className="transition-all duration-300 flex gap-1 justify-center items-center">
                <Icons.bag
                  className={` w-${size_icon} transition-colors duration-300 ${
                    page == 8
                      ? "stroke-adminAction"
                      : "stroke-highgray dark:stroke-highgrayDark"
                  }`}
                />
                <h1
                  className={`font-bold text-xl hidden xs:block transition-colors duration-300 ${
                    page == 8
                      ? "text-adminAction"
                      : "text-highgray dark:text-highgrayDark"
                  }`}>
                  {ADMIN_PAGE_TITLES[8]}
                </h1>
              </button>
              {/* --------------------------------------------------------- Waiter Call Button --------------------------------------------------------- */}
              <button
                onClick={() => {
                  if ("vibrate" in navigator && typeof window !== "undefined") {
                    navigator.vibrate(haptic);
                  }
                  setPage(7);
                  setHeaderShrink(false);
                  goToTop();
                }}
                className="transition-all duration-300 flex gap-1 justify-center items-center">
                <Icons.bell
                  className={` w-${size_icon} transition-colors duration-300 ${
                    page == 7
                      ? "stroke-adminAction"
                      : "stroke-highgray dark:stroke-highgrayDark"
                  }`}
                />
                <h1
                  className={`font-bold text-xl hidden xs:block transition-colors duration-300 ${
                    page == 7
                      ? "text-adminAction"
                      : "text-highgray dark:text-highgrayDark"
                  }`}>
                  {ADMIN_PAGE_TITLES[7]}
                </h1>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminFooter;
