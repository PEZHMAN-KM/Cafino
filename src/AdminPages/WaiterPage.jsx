import { useEffect, useState } from "react";
import ProfileImage from "../../public/Profile.png";
import { useNavigate } from "react-router-dom";
import { BASE_PATH } from "../constants/paths";
import axios from "axios";
import { Icons } from "../Componnets/Icons";
import { useBlur } from "../constants/BlurContext.jsx";

const TableNumber = ({ tableNumber }) => (
  <div className="bg-white dark:bg-black text-black dark:text-white px-4 py-1 w-fit rounded-3xl border-2 border-adminBackgroundColor dark:border-adminBackgroundColorDark flex justify-center items-center gap-5 transition-colors duration-300">
    <Icons.table className="w-8 fill-adminPrimary dark:fill-adminPrimaryDark stroke-adminPrimary dark:stroke-adminPrimaryDark transition-colors duration-300" />
    <h1 className="text-2xl font-bold text-center">
      <span>میز شماره </span>
      <span className="text-adminPrimary dark:text-adminPrimaryDark transition-colors duration-300 text-3xl">
        {tableNumber}
      </span>
    </h1>
  </div>
);

const WaiterRequest = ({
  tableNumber,
  id,
  message,
  inProgress,
  waitress_name,
  full_name,
  progressNotification,
  unProgressNotification,
  doneNotification,
  removingId,
  setClickedButtonId,
  clickedButtonId,
  getNOtification,
}) => (
  <div
    className={`flex flex-col justify-center items-center w-full select-none ${
      removingId === id ? "animate-scale-out" : ""
    } ${clickedButtonId === id ? "animate-scale-out" : ""}`}>
    <div
      className={` transition-all hover:scale-102 duration-300 w-9/10 md:w-4/6 xl:w-3/6 px-7 py-2 rounded-3xl ${
        message && (!waitress_name || full_name === waitress_name)
          ? "bg-blue-100 dark:bg-blue-950"
          : waitress_name && full_name !== waitress_name
          ? "bg-slowgray dark:bg-slowgrayDark"
          : "bg-white dark:bg-darkpalleteDark"
      }`}>
      <h1 className="text-lg text-black dark:text-white transition-colors duration-300 pb-1">
        {message ? "تحویل سفارش" : "درخواست کمک"}
      </h1>
      <div className="flex flex-col justify-center items-center">
        <TableNumber tableNumber={tableNumber} />
      </div>
      {!waitress_name || full_name === waitress_name ? (
        <div className="flex justify-center items-center gap-2 py-2">
          {inProgress ? (
            <div className="flex justify-center items-center gap-3">
              <button
                onClick={() => doneNotification(id)}
                className="cursor-pointer bg-white dark:bg-darkpalleteDark border-adminAction dark:border-adminActionDark border-2 px-3 py-2 rounded-xl text-xl text-adminAction dark:text-adminActionDark hover:bg-adminAction hover:text-white dark:hover:bg-adminActionDark transition-all">
                انجام شد
              </button>
              <button
                onClick={() => {
                  setClickedButtonId(id);
                  setTimeout(async () => {
                    await unProgressNotification(id);
                    await getNOtification();
                    setClickedButtonId(null);
                  }, 300);
                }}
                className="cursor-pointer bg-white dark:bg-darkpalleteDark border-adminError dark:border-adminErrorDark border-2 px-3 py-2 rounded-xl text-xl text-adminError dark:text-adminErrorDark hover:bg-adminError hover:text-white dark:hover:bg-adminErrorDark transition-all">
                لغو بررسی
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setClickedButtonId(id);
                setTimeout(async () => {
                  await progressNotification(id);
                  await getNOtification();
                  setClickedButtonId(null);
                }, 300);
              }}
              className="cursor-pointer bg-white dark:bg-darkpalleteDark border-adminAction dark:border-adminActionDark border-2 px-3 py-2 rounded-xl text-xl text-adminAction dark:text-adminActionDark hover:bg-adminAction hover:text-white dark:hover:bg-adminActionDark transition-all">
              پذیرش بررسی
            </button>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center py-2">
          <h1 className="text-xs md:text-lg text-black dark:text-white transition-colors duration-300">
            این درخواست به {waitress_name} واگذار شده
          </h1>
        </div>
      )}
    </div>
  </div>
);

function WaiterPage() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const reduceBlur = useBlur();

  const [isDark, setIsDark] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [userData, setUserData] = useState(Object);
  const [profilePic, setProfilePic] = useState(null);
  const [allNotifications, setAllNotifications] = useState([]);

  const [removingId, setRemovingId] = useState(null);
  const [clickedButtonId, setClickedButtonId] = useState(null);

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
        setUserData(data);
        if (data.is_waitress != true) {
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

  async function getNOtification() {
    try {
      const response = await axios.get(
        `${BASE_PATH}/notification/get_notifs_to_show`,
        {
          headers: { accept: "application/json" },
        }
      );
      setAllNotifications([
        ...response.data.in_progress_notifs,
        ...response.data.requested_notifs,
      ]);
    } catch (error) {
      console.error("خطا در دریافت نوتفیکیشن ها:", error);
    }
  }
  async function progressNotification(notif_id) {
    const token = JSON.parse(localStorage.getItem("user_data"));
    try {
      const response = await axios.put(
        `${BASE_PATH}/waitress/notification/get_notif_in_progress`,
        {
          notif_id: notif_id,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
      await getNOtification();
    } catch (error) {
      console.error("خطا در پذیرش بررسی :", error);
    }
  }
  async function unProgressNotification(notif_id) {
    const token = JSON.parse(localStorage.getItem("user_data"));
    try {
      const response = await axios.put(
        `${BASE_PATH}/notification/get_out_of_progress`,
        {
          notif_id: notif_id,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
    } catch (error) {
      console.error("خطا در لغو بررسی نوتیف:", error);
    }
  }
  async function doneNotification(notif_id) {
    const token = JSON.parse(localStorage.getItem("user_data"));
    setRemovingId(notif_id);
    setTimeout(async () => {
      try {
        const response = await axios.put(
          `${BASE_PATH}/waitress/notification/get_notif_done`,
          {
            notif_id: notif_id,
          },
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access_token}`,
            },
          }
        );
        await getNOtification();
      } catch (error) {
        console.error("خطا در اتمام وظیفه :", error);
      } finally {
        setRemovingId(null); // پاک کردن state بعد از حذف
      }
    }, 300);
  }

  useEffect(() => {
    // For flashing on LOADING PAGE
    setIsPageLoaded(true);

    getUserInfo();
    getProfilePic();
    getNOtification();

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      getNOtification();
    }, 7000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
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
        } bg-adminBackgroundColor dark:bg-adminBackgroundColorDark w-screen h-screen overflow-y-auto scrollbar scrollbar-none overflow-x-hidden`}>
        {/* HEADER */}
        <div
          className={`${
            isPageLoaded
              ? "transition-colors duration-300"
              : "transition-none duration-0"
          } p-2 sticky top-0 z-10`}>
          <div
            className={`${
              isPageLoaded
                ? "transition-colors duration-300"
                : "transition-none duration-0"
            } ${
              reduceBlur
                ? "bg-white dark:bg-darkpalleteDark"
                : "bg-white/30 dark:bg-darkpalleteDark/30 border-white/20 dark:border-white/10 border"
            }  w-full rounded-3xl py-2 px-4 flex justify-between items-center backdrop-blur-md shadow-lg`}>
            <div
              className={`${
                isPageLoaded
                  ? "transition-colors duration-300"
                  : "transition-none duration-0"
              } text-xl flex gap-5 font-semibold text-darkpallete dark:text-white`}>
              <h1>کافـی نـو</h1>
              {/* DARK MODE BUTTON */}
              <button
                className="hidden md:block cursor-pointer"
                onClick={toggleDarkMode}>
                <Icons.darkMode
                  className={`${
                    isDark ? "rotate-0 fill-white" : "rotate-180 fill-black"
                  } w-8 transition-all duration-300 ease-out`}
                />
              </button>
            </div>

            <h1 className="md:hidden text-xl text-black dark:text-white font-extrabold text-center p-2 rounded-3xl">
              سالن‌دار
            </h1>
            <div className="cursor-pointer relative" onClick={toggleMenu}>
              <div className="flex justify-center items-center flex-row-reverse cursor-pointer gap-2">
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
                    <a
                      href="/changeuserinfo"
                      className="cursor-pointer block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
                      تنظیمات
                    </a>
                    <button
                      onClick={logOut}
                      className="cursor-pointer block w-full text-right px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
                      خروج
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* BODY - REQUEST PANEL */}
        <div
          className={`${
            isPageLoaded
              ? "transition-colors duration-300"
              : "transition-none duration-0"
          } bg-adminBackgroundColor flex flex-col pb-2 gap-3 dark:bg-adminBackgroundColorDark h-fit`}>
          {allNotifications.map((item) => (
            <div key={item.id} className="animate-scale-up">
              <WaiterRequest
                id={item.id}
                tableNumber={item.table_number}
                message={item.message}
                inProgress={item.is_in_progress}
                waitress_name={item.waitress_name}
                full_name={userData.full_name}
                progressNotification={progressNotification}
                unProgressNotification={unProgressNotification}
                doneNotification={doneNotification}
                removingId={removingId}
                setClickedButtonId={setClickedButtonId}
                clickedButtonId={clickedButtonId}
                getNOtification={getNOtification}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default WaiterPage;
