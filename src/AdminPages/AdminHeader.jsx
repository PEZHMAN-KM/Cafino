import { useEffect, useState } from "react";
import ProfileImage from "../../public/Profile.png";
import { BASE_PATH, ADMIN_PAGE_TITLES } from "../constants/paths";
import axios from "axios";
// import { Icons } from "../Componnets/Icons";
import { useBlur } from "../constants/BlurContext";

function AdminHeader({
  page,
  setCurrentPage,
  headerShrink,
  setShowMenu,
  showMenu,
  setUserData,
  userData,
  setIsDark,
  isDark,
  setProfilePic,
  profilePic,
  logOut,
}) {
  // DARK MODE | IS LOADING MODE -------------------------------------
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const reduceBlur = useBlur();

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

  // USER INFORMATION ------------------------------------------------
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
        console.log(data);
        setUserData(data);
        if (data.is_admin != true) {
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

  // MENU CONTROLL -------------------------------------------------
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
        } ${
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
              : "bg-white/30 dark:bg-darkpalleteDark/30"
          } w-full backdrop-blur-md shadow-lg border border-white/20 dark:border-white/10 rounded-3xl py-3 px-4 flex justify-between items-center`}>
          {/* ------------------------------------------------------- TOP RIGHT HEADER PANEL ------------------------------------------------------- */}
          <div className="hidden md:flex gap-4 text-xl font-bold">
            <button
              onClick={() => {
                setCurrentPage(1);
                setShowMenu(false);
              }}
              className={`${
                page == 1
                  ? "text-adminAction"
                  : "text-highgray dark:text-highgrayDark"
              } hover:text-adminPrimary dark:hover:text-adminPrimaryDark ${
                isPageLoaded
                  ? "transition-colors duration-300"
                  : "transition-none duration-0"
              }`}>
              {ADMIN_PAGE_TITLES[1]}
            </button>
            <button
              onClick={() => {
                setCurrentPage(2);
                setShowMenu(false);
              }}
              className={`${
                page == 2
                  ? "text-adminAction"
                  : "text-highgray dark:text-highgrayDark"
              } hover:text-adminPrimary dark:hover:text-adminPrimaryDark ${
                isPageLoaded
                  ? "transition-colors duration-300"
                  : "transition-none duration-0"
              }`}>
              {ADMIN_PAGE_TITLES[2]}
            </button>
            <button
              onClick={() => {
                setCurrentPage(10);
                setShowMenu(false);
              }}
              className={`${
                page == 10
                  ? "text-adminAction"
                  : "text-highgray dark:text-highgrayDark"
              } hover:text-adminPrimary dark:hover:text-adminPrimaryDark ${
                //text-darkpallete dark:text-white
                isPageLoaded
                  ? "transition-colors duration-300"
                  : "transition-none duration-0"
              }`}>
              {ADMIN_PAGE_TITLES[10]}
            </button>
            <button
              onClick={() => {
                setCurrentPage(11);
                setShowMenu(false);
              }}
              className={`${
                page == 11
                  ? "text-adminAction"
                  : "text-highgray dark:text-highgrayDark"
              } hover:text-adminPrimary dark:hover:text-adminPrimaryDark ${
                isPageLoaded
                  ? "transition-colors duration-300"
                  : "transition-none duration-0"
              }`}>
              {ADMIN_PAGE_TITLES[11]}
            </button>
          </div>
          <button
            onClick={() => {
              setCurrentPage(1);
            }}
            className={`text-xl font-bold md:hidden text-darkpallete dark:text-white ${
              isPageLoaded
                ? "transition-colors duration-300"
                : "transition-none duration-0"
            }`}>
            کافـی نـو
          </button>

          {/* --------------------------------------------------------- CENTER HEADER PANEL --------------------------------------------------------- */}
          <div
            className={`text-xl font-bold md:hidden text-darkpallete dark:text-white ${
              isPageLoaded
                ? "transition-colors duration-300"
                : "transition-none duration-0"
            }`}>
            {ADMIN_PAGE_TITLES[page]}
          </div>
          {/* -------------------------------------------------------- TOP LEFT HEADER PANEL -------------------------------------------------------- */}
          <div className="cursor-pointer relative" onClick={toggleMenu}>
            <div className="flex justify-center items-center flex-row-reverse gap-2">
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
                    onClick={toggleDarkMode}
                    className="hidden lg:block text-start w-full px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
                    {isDark ? (
                      <p className="w-full">حالت روشن</p>
                    ) : (
                      <p className="w-full">حالت تاریک</p>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage(9);
                      setShowMenu(false);
                    }}
                    className="block w-full text-start px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
                    تنظیمات
                  </button>
                  <button
                    onClick={() => {
                      logOut();
                      setShowMenu(false);
                    }}
                    className="block w-full text-right px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
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

export default AdminHeader;
