import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";

const DarkMode = ({ className }) => {
  return (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-8 ${className}`}>
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <title>{"dark-mode"}</title>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Icons">
            <g>
              <rect width={48} height={48} fill="none" />
              <g>
                <path d="M14,24A10,10,0,0,0,24,34V14A10,10,0,0,0,14,24Z" />
                <path d="M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM6,24A18.1,18.1,0,0,1,24,6v8a10,10,0,0,1,0,20v8A18.1,18.1,0,0,1,6,24Z" />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

const SearchIcon = () => {
  return (
    <svg
      className="w-7"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
          stroke="#000000"
          className="dark:stroke-white transition-colors duration-300"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"></path>
      </g>
    </svg>
  );
};
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
    },
    ref
  ) => {
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
        <div
          className={`z-10 flex justify-center items-center max-w-screen gap-3 p-5 py-3 bg-backgroundcolor dark:bg-backgroundcolorDark transition-colors duration-300 ${
            page !== 1 ? "sticky top-0" : ""
          }`}>
          <div className="hidden md:flex-1/4 md:flex gap-2">
            <div
              className="transition-all duration-300 hover:scale-105"
              onClick={toggleMenu}>
              <TopMenu />
            </div>
            <button
              className="transition-all duration-300 hover:scale-105"
              onClick={toggleDarkMode}>
              {isDark ? (
                <DarkMode
                  className={"rotate-0 transition-all fill-white duration-150"}
                />
              ) : (
                <DarkMode
                  className={
                    "rotate-180 transition-all fill-black duration-150"
                  }
                />
              )}
            </button>
          </div>
          {showMenu && (
            <div className="absolute right-5 top-12 mt-5 w-48 rounded-xl shadow-lg bg-white dark:bg-darkpalleteDark transition-colors duration-300 z-50 animate-scale-up">
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
            <div className="flex-3/4 flex justify-center items-center bg-slowgray dark:bg-graypalleteDark p-1.5 gap-2 rounded-xl md:flex-2/4  transition-colors duration-300">
              <SearchIcon />
              <input
                className="w-full bg-transparent dark:text-white focus:outline-none placeholder-highgrayDark dark:placeholder-highgray transition-colors duration-300"
                type="text"
                placeholder="جستجو در کافی نو"
                value={searchTerm}
                onFocus={() => setSearchActive(true)}
                // onBlur={() => setSearchActive(false)}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchActive && (
                <button
                  onClick={() => {
                    fetchItems();
                    setSearchActive(false);
                    setSearchTerm("");
                  }}
                  className="mr-2 cursor-pointer text-sm text-gray-500 dark:text-gray-300">
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
              className="text-lg md:text-xl font-bold dark:text-white transition-colors duration-300">
              کافـی نـو
            </a>
          </div>
        </div>
      </>
    );
  }
);

export default Header;
