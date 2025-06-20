import { useEffect, useState } from "react";
import ProfileImage from "../../public/Profile.png";
import { useNavigate } from "react-router-dom";
import { BASE_PATH } from "../constants/paths";
import axios from "axios";

const TopMenu = ({ className, stroke }) => {
  return (
    <svg
      className={className}
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
              className="dark:stroke-white transition-colors duration-300"
              stroke={stroke}
              strokeWidth={2}
              strokeLinecap="round"
            />
            <line
              x1={5}
              y1={17}
              x2={19}
              y2={17}
              id="Path"
              className="dark:stroke-white transition-colors duration-300"
              stroke={stroke}
              strokeWidth={2}
              strokeLinecap="round"
            />
            <line
              x1={5}
              y1={12}
              x2={19}
              y2={12}
              id="Path"
              className="dark:stroke-white transition-colors duration-300"
              stroke={stroke}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

function AdminHeader() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [isDark, setIsDark] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showMenuLeft, setShowMenuLeft] = useState(false);
  const [userData, setUserData] = useState(Object);
  const [profilePic, setProfilePic] = useState(null);

  const navigate = useNavigate();

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
        localStorage.removeItem("user_data");
        navigate("/adminlogin");
      }
    } catch (error) {
      console.error("مشکل در دریافت اطلاعات کاربر. مشکل :", error);
      localStorage.removeItem("user_data");
      navigate("/adminlogin");
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

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleMenuLeft = () => {
    setShowMenuLeft(!showMenuLeft);
  };

  const logOut = () => {
    localStorage.removeItem("user_data");
    navigate("/adminlogin");
  };

  return (
    <>
      <div
        className={`${
          isPageLoaded
            ? "transition-colors duration-300"
            : "transition-none duration-0"
        } p-2 sticky top-0 z-10 bg-adminBackgroundColor dark:bg-adminBackgroundColorDark rounded-b-3xl`}>
        <div
          className={`${
            isPageLoaded
              ? "transition-colors duration-300"
              : "transition-none duration-0"
          } bg-white dark:bg-darkpalleteDark w-full rounded-3xl py-3 px-4 flex justify-between items-center`}>
          <div className="hidden md:flex gap-4 text-xl font-bold">
            <a
              href="/adminhome"
              className={`text-darkpallete dark:text-white hover:text-adminPrimary dark:hover:text-adminPrimaryDark ${
                isPageLoaded
                  ? "transition-colors duration-300"
                  : "transition-none duration-0"
              }`}>
              خانه
            </a>
            <a
              href="/itemmanager"
              className={`text-darkpallete dark:text-white hover:text-adminPrimary dark:hover:text-adminPrimaryDark ${
                isPageLoaded
                  ? "transition-colors duration-300"
                  : "transition-none duration-0"
              }`}>
              آیتم ها
            </a>
            <a
              href=""
              className={`text-darkpallete dark:text-white hover:text-adminPrimary dark:hover:text-adminPrimaryDark ${
                isPageLoaded
                  ? "transition-colors duration-300"
                  : "transition-none duration-0"
              }`}>
              گزارش گیری
            </a>
          </div>
          <div
            onClick={toggleMenuLeft}
            className="flex md:hidden cursor-pointer relative">
            <TopMenu
              className={`w-15 bg-adminBackgroundColor dark:bg-darkpalleteDark rounded-2xl ${
                isPageLoaded
                  ? "transition-colors duration-300"
                  : "transition-none duration-0"
              }`}
              stroke={isDark ? "#fff" : "#809FB8"}
            />
          </div>
          {showMenuLeft && (
            <div className="absolute md:hidden right-5 top-20 mt-5 w-48 rounded-xl shadow-lg bg-white dark:bg-darkpalleteDark transition-colors duration-300">
              <div className="py-1">
                <a
                  href="/adminhome"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
                  خانه
                </a>
                <a
                  href="/itemmanager"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
                  آیتم
                </a>
                <a
                  href=""
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
                  گزارش گیری
                </a>
              </div>
            </div>
          )}
          <div
            className={`text-xl font-semibold md:hidden text-darkpallete dark:text-white ${
              isPageLoaded
                ? "transition-colors duration-300"
                : "transition-none duration-0"
            }`}>
            کافـی نـو
          </div>
          <div className="cursor-pointer relative" onClick={toggleMenu}>
            <div className="flex justify-center items-center flex-row-reverse gap-2">
              <img
                className={`w-15 h-15 rounded-full spect-square object-cover border-2 transition-all duration-300 ${
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
                    className="block text-start w-full px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
                    {isDark ? (
                      <p className="w-full">حالت روشن</p>
                    ) : (
                      <p className="w-full">حالت تاریک</p>
                    )}
                  </button>
                  <a
                    href="/changeuserinfo"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
                    تنظیمات
                  </a>
                  <button
                    onClick={logOut}
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
