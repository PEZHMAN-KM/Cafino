import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import { Icons } from "./Icons";

const TopMenu = () => {
  return (
    <svg
      className="w-10"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="black">
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <title>{"Menu"}</title>
        <g
          id="Page-1"
          stroke="none"
          strokeWidth={1}
          fill="none"
          fillRule="evenodd">
          <g id="Menu">
            <rect
              id="Rectangle"
              fillRule="nonzero"
              x={0}
              y={0}
              width={40}
              height={40}
            />
            <line
              x1={5}
              y1={7}
              x2={19}
              y2={7}
              id="Path"
              className="stroke-black dark:stroke-white transition-colors duration-300"
              stroke="black"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <line
              x1={5}
              y1={17}
              x2={19}
              y2={17}
              id="Path"
              className="stroke-black dark:stroke-white transition-colors duration-300"
              stroke="black"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <line
              x1={5}
              y1={12}
              x2={19}
              y2={12}
              id="Path"
              className="stroke-black dark:stroke-white transition-colors duration-300"
              stroke="black"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

const Header = forwardRef(
  (
    {
      page,
      text,
      showMenu,
      setShowMenu,
      searchActive,
      setSearchActive,
      searchTerm,
      setSearchTerm,
      fetchItems,
      headerInputRef,
    },
    ref
  ) => {
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
      focusSearchInput: () => {
        inputRef.current?.focus();
      },
    }));

    const toggleMenu = () => {
      setShowMenu(!showMenu);
    };

    useEffect(() => {
      // For flashing on LOADING PAGE
      setIsPageLoaded(true);

      const savedTheme = localStorage.getItem("theme");

      if (savedTheme) {
        setIsDark(savedTheme === "dark");
        if (savedTheme === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      } else {
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setIsDark(prefersDark);
        if (prefersDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    }, []);

    useEffect(() => {
      const closeMenuHandler = () => {
        setShowMenu(false);
      };

      window.addEventListener("closeMenus", closeMenuHandler);

      return () => {
        window.removeEventListener("closeMenus", closeMenuHandler);
      };
    }, []);

    const toggleDarkMode = () => {
      if (isDark) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        setIsDark(false);
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        setIsDark(true);
      }
    };

    return (
      <>
        <div className="flex justify-center items-center w-screen">
          <div
            className={`${
              isPageLoaded
                ? "transition-colors duration-300"
                : "transition-none duration-0"
            } z-10 flex justify-center items-center gap-3 p-5 py-3 ${
              page !== 1
                ? "lg:fixed lg:top-2 mt-2 lg:mt-0 w-[98vw] mx-auto bg-backgroundcolor/30 dark:bg-backgroundcolorDark/30 backdrop-blur-md shadow-lg border rounded-3xl border-white/20 dark:border-white/10"
                : "w-screen bg-backgroundcolor dark:bg-backgroundcolorDark"
            }`}>
            <div className="hidden md:flex-1/4 md:flex gap-2">
              <div
                className="transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={toggleMenu}>
                <TopMenu />
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
              <div className="absolute right-5 top-12 mt-5 w-48 rounded-xl shadow-lg bg-white dark:bg-darkpalleteDark transition-colors duration-300 z-50">
                <div className="py-1">
                  <a
                    href="/home"
                    className="block text-start w-full px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
                    خانه
                  </a>
                  <a
                    href="/favoritepage"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
                    علاقه مندی ها
                  </a>
                  <a
                    href="/order"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
                    سفارشات
                  </a>
                  <a
                    href="/contactus"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
                    تماس با ما
                  </a>
                </div>
              </div>
            )}
            {page == 1 ? (
              <div
                className={`${
                  isPageLoaded
                    ? "transition-colors duration-300"
                    : "transition-none duration-0"
                } flex-3/4 flex justify-center items-center bg-slowgray dark:bg-graypalleteDark p-1.5 gap-2 rounded-xl lg:flex-2/4 animate-width-up`}>
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
                  // onBlur={() => setSearchActive(false)}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchActive && (
                  <button
                    onClick={() => {
                      fetchItems();
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
                  {text}
                </h1>
              </div>
            )}
            <div
              className={`md:text-end ${
                page == 1 ? "flex-1/4" : "hidden md:flex-1/4 md:block"
              }`}>
              <a
                href="/home"
                onClick={() => {
                  if ("vibrate" in navigator && typeof window !== "undefined") {
                    navigator.vibrate(10);
                  }
                }}
                className="text-lg lg:text-xl font-bold dark:text-white transition-colors duration-300">
                کافـی نـو
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default Header;
