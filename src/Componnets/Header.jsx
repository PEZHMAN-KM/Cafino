import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { Icons } from "./Icons";
import { PAGE_TITLES } from "../constants/paths";
import { useBlur } from "../constants/BlurContext.jsx";

const Header = forwardRef(
  (
    {
      page,
      showMenu,
      setShowMenu,
      searchActive,
      setSearchActive,
      searchTerm,
      setSearchTerm,
      fetchItems,
      headerInputRef,
      setCurrentPage,
      headerShrink,
      setHeaderShrink,
      goHome,
      setIsDark,
      isDark,
    },
    ref
  ) => {
    // DARK MODE | IS LOADING MODE -------------------------------------
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    useEffect(() => {
      // For flashing on LOADING PAGE
      setIsPageLoaded(true);
    }, []);
    const toggleDarkMode = () => {
      const root = document.documentElement;
      if (root.classList.contains("dark")) {
        root.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setIsDark(false);
      } else {
        root.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setIsDark(true);
      }
    };
    // SEARCH FOCOS ----------------------------------------------------
    const inputRef = useRef(null);
    useImperativeHandle(ref, () => ({
      focusSearchInput: () => {
        inputRef.current?.focus();
      },
    }));
    // MOTION AND MENU CONTROLL ---------------------------------------------
    const reduceBlur = useBlur();
    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };

    return (
      <>
        <div
          className={`flex justify-center origin-top items-center w-screen transition-all duration-100 ${
            headerShrink && page !== 2 && !searchActive
              ? `${page !== 1 ? "md:max-h-full!" : "lg:opacity-0"} max-h-0!`
              : "max-h-full! opacity-100"
          }`}>
          <div
            className={`${
              isPageLoaded
                ? "transition-all duration-300"
                : "transition-none duration-0"
            } z-20 origin-top flex justify-center items-center gap-3 p-5 py-3 ${
              headerShrink && page !== 2 && !searchActive
                ? `scale-0! ${page !== 1 ? "md:scale-none!" : ""}`
                : ""
            } ${
              page !== 1
                ? `fixed top-2 w-[98vw] mx-auto ${
                    reduceBlur
                      ? "bg-backgroundcolor dark:bg-backgroundcolorDark"
                      : "bg-backgroundcolor/30 dark:bg-backgroundcolorDark/30"
                  } backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg rounded-3xl`
                : `fixed top-0 w-screen ${
                    searchActive &&
                    `${
                      reduceBlur
                        ? "bg-backgroundcolor dark:bg-backgroundcolorDark"
                        : "bg-backgroundcolor/30 dark:bg-backgroundcolorDark/30"
                    } backdrop-blur-md shadow-lg`
                  }`
            }`}>
            <div className="hidden md:flex-1/4 md:flex gap-2">
              <div
                className="transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={toggleMenu}>
                <Icons.topMenu />
              </div>
              <button
                className="transition-all duration-300 hover:scale-105 hidden lg:block cursor-pointer"
                onClick={toggleDarkMode}>
                <Icons.darkMode
                  className={`${
                    isDark ? "rotate-0 fill-white" : "rotate-180 fill-black"
                  } w-8 transition-all duration-300 ease-out`}
                />
              </button>
            </div>
            {showMenu && (
              <div className="absolute hidden md:block right-5 top-12 mt-5 w-48 rounded-xl shadow-lg bg-white dark:bg-darkpalleteDark transition-colors duration-300 z-50">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setCurrentPage(1);
                      setShowMenu(false);
                      setHeaderShrink(false);
                    }}
                    className="block w-full text-start px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-slowprimary dark:hover:bg-slowprimaryDark transition-colors duration-300">
                    {PAGE_TITLES[1]}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage(2);
                      setShowMenu(false);
                      setHeaderShrink(false);
                    }}
                    className="block w-full text-start px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-slowprimary dark:hover:bg-slowprimaryDark transition-colors duration-300">
                    {PAGE_TITLES[2]}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage(3);
                      setShowMenu(false);
                      setHeaderShrink(false);
                    }}
                    className="block w-full text-start px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-slowprimary dark:hover:bg-slowprimaryDark transition-colors duration-300">
                    {PAGE_TITLES[3]}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage(4);
                      setShowMenu(false);
                      setHeaderShrink(false);
                    }}
                    className="block w-full text-start px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-slowprimary dark:hover:bg-slowprimaryDark transition-colors duration-300">
                    {PAGE_TITLES[4]}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage(5);
                      setShowMenu(false);
                      setHeaderShrink(false);
                    }}
                    className="block w-full text-start px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-slowprimary dark:hover:bg-slowprimaryDark transition-colors duration-300">
                    {PAGE_TITLES[5]}
                  </button>
                </div>
              </div>
            )}
            {page == 1 ? (
              <div
                className={`${
                  isPageLoaded
                    ? "transition-colors duration-300"
                    : "transition-none duration-0"
                } flex-3/4 flex justify-center items-center bg-slowgray dark:bg-graypalleteDark p-1.5 gap-2 rounded-xl lg:flex-2/4 animate-scale-up`}>
                <Icons.search
                  className={
                    "w-7 stroke-black dark:stroke-white transition-colors duration-300"
                  }
                />
                <input
                  className="w-full bg-transparent dark:text-white focus:outline-none placeholder-highgrayDark dark:placeholder-highgray transition-colors duration-300"
                  type="text"
                  placeholder="جستجو در کافی نو"
                  value={searchTerm}
                  ref={headerInputRef}
                  onFocus={() => {
                    setSearchActive(true);
                    setShowMenu(false);
                  }}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchActive && (
                  <button
                    onClick={() => {
                      if (fetchItems) fetchItems();
                      setSearchActive(false);
                      setSearchTerm("");
                      setShowMenu(false);
                      if (
                        "vibrate" in navigator &&
                        typeof window !== "undefined"
                      ) {
                        navigator.vibrate(20);
                      }
                    }}
                    className="mr-2 cursor-pointer text-sm text-gray-500 dark:text-gray-300 transition-all duration-300">
                    بستن
                  </button>
                )}
              </div>
            ) : (
              <div className="flex-3/4">
                <h1 className="text-center text-2xl font-black dark:text-white transition-colors duration-300">
                  {PAGE_TITLES[page] || "صفحه ناشناس"}
                </h1>
              </div>
            )}
            <div
              className={`md:text-end ${
                page == 1 ? "flex-1/4" : "hidden md:flex-1/4 md:block"
              }`}>
              <button
                onClick={() => {
                  if ("vibrate" in navigator && typeof window !== "undefined") {
                    navigator.vibrate(10);
                  }
                  setCurrentPage(0);
                  goHome();
                }}
                className="text-lg lg:text-xl font-bold dark:text-white transition-colors duration-300">
                کافـی نـو
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default Header;
