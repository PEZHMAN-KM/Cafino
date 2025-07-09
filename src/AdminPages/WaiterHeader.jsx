import React, { useState, useEffect } from "react";
import { Icons } from "../Componnets/Icons.jsx";
import { BASE_PATH, ADMIN_PAGE_TITLES } from "../constants/paths";
import { useBlur } from "../constants/BlurContext.jsx";
import ProfileImage from "../../public/Profile.png";
import axios from "axios";

const size_icon = 10;

function WaiterHeader({
  page,
  setCurrentPage,
  headerShrink,
  setShowMenu,
  showMenu,
  setUserData,
  userData,
  shouldAnimate,
  setIsDark,
  isDark,
  setProfilePic,
  profilePic,
  logOut,
}) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const reduceBlur = useBlur();
  const haptic = 10;

  async function getUserInfo() {
    try {
      const token = JSON.parse(localStorage.getItem("user_data"));
      const response = await fetch(`${BASE_PATH}/user/get_self_info`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
        if (data.is_waitress != true) {
          logOut();
        }
      } else {
        console.error("مشکل در دریافت اطلاعات کاربر");
        logOut();
      }
    } catch (error) {
      console.error("مشکل در دریافت اطلاعات کاربر. مشکل :", error);
      logOut();
    }
  }
  async function getProfilePic() {
    try {
      const token = JSON.parse(localStorage.getItem("user_data"));
      const response = await axios.post(
        `${BASE_PATH}/userget_user_picture`,
        { user_id: token.userID },
        {
          headers: { "Content-Type": "application/json" },
          responseType: "blob",
        }
      );

      const imageBlob = response.data;
      const imageUrl = URL.createObjectURL(imageBlob);
      setProfilePic(imageUrl);
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  }

  useEffect(() => {
    // For flashing on LOADING PAGE
    setIsPageLoaded(true);

    getUserInfo();
    getProfilePic();

    const isDarkNow = document.documentElement.classList.contains("dark");
    setIsDark(isDarkNow);
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

  function goToTop() {
    window.scrollTo({
      top: 0,
      ...(shouldAnimate ? { behavior: "smooth" } : {}),
    });
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div
        className={`${
          isPageLoaded
            ? "transition-all duration-300"
            : "transition-none duration-0"
        }  ${
          headerShrink ? " scale-0! md:scale-none!" : " scale-100!"
        } p-2 origin-top fixed w-full top-0 z-10`}>
        <div
          className={`${
            isPageLoaded
              ? "transition-colors duration-300"
              : "transition-none duration-0"
          } ${
            reduceBlur
              ? "bg-white dark:bg-darkpalleteDark"
              : "bg-white/30 dark:bg-darkpalleteDark/30 border-white/20 dark:border-white/10 border"
          } w-full rounded-3xl py-2 px-4 flex justify-between items-center backdrop-blur-md shadow-lg`}>
          <div
            className={`${
              isPageLoaded
                ? "transition-colors duration-300"
                : "transition-none duration-0"
            }  text-xl flex gap-5 font-bold text-darkpallete dark:text-white`}>
            <h1>کافـی نـو</h1>
            {/* DARK MODE BUTTON */}
            {page == 7 && (
              <button
                className="hidden lg:block cursor-pointer"
                onClick={toggleDarkMode}>
                <Icons.darkMode
                  className={`${
                    isDark ? "rotate-0 fill-white" : "rotate-180 fill-black"
                  } w-8 transition-all duration-300 ease-out`}
                />
              </button>
            )}
          </div>

          <h1 className="md:hidden text-xl text-black dark:text-white font-extrabold text-center">
            {ADMIN_PAGE_TITLES[page] || "صفحه ناشناس"}
          </h1>
          <div className="hidden md:flex gap-3 text-xl font-extrabold text-center">
            <button
              onClick={() => {
                if ("vibrate" in navigator && typeof window !== "undefined") {
                  navigator.vibrate(haptic);
                }
                setCurrentPage(8);
                goToTop();
                setShowMenu(false);
              }}
              className={`${
                isPageLoaded
                  ? "transition-colors duration-300"
                  : "transition-none duration-0"
              } ${
                page == 8
                  ? "text-adminAction"
                  : "text-highgray dark:text-highgrayDark"
              }`}>
              {ADMIN_PAGE_TITLES[8]}
            </button>
            <button
              onClick={() => {
                if ("vibrate" in navigator && typeof window !== "undefined") {
                  navigator.vibrate(haptic);
                }
                setCurrentPage(7);
                goToTop();
                setShowMenu(false);
              }}
              className={`${
                isPageLoaded
                  ? "transition-colors duration-300"
                  : "transition-none duration-0"
              } ${
                page == 7
                  ? "text-adminAction"
                  : "text-highgray dark:text-highgrayDark"
              }`}>
              {ADMIN_PAGE_TITLES[7]}
            </button>
          </div>
          <div className="cursor-pointer relative" onClick={toggleMenu}>
            <div className="flex justify-center items-center flex-row-reverse cursor-pointer gap-2">
              <img
                className={`w-15 h-15 rounded-full spect-square object-cover border-2 transition-all duration-300 pointer-events-none touch-none ${
                  showMenu
                    ? "border-adminPrimary dark:border-adminPrimaryDark"
                    : "border-transparent hover:border-adminPrimary dark:hover:border-adminPrimaryDark"
                }`}
                src={userData.pic_url ? profilePic : ProfileImage}
                alt="Profile"
              />
              <p
                className={`${
                  isPageLoaded
                    ? "transition-colors duration-300"
                    : "transition-none duration-0"
                } text-black dark:text-white font-bold md:block hidden`}>
                {userData.full_name}
              </p>
            </div>
            {showMenu && (
              <div className="absolute left-0 mt-5 w-48 rounded-xl shadow-lg bg-white dark:bg-darkpalleteDark transition-colors duration-300">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setCurrentPage(9);
                      setShowMenu(false);
                    }}
                    className="cursor-pointer w-full text-start block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
                    تنظیمات
                  </button>
                  <button
                    onClick={() => {
                      logOut();
                      setShowMenu(false);
                    }}
                    className="cursor-pointer block w-full text-right px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
                    خروج
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default WaiterHeader;
