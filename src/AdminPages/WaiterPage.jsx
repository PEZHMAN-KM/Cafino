import { useEffect, useState } from "react";
import ProfileImage from "../../public/Profile.png";
import { useNavigate } from "react-router-dom";
import { BASE_PATH } from "../constants/paths";
import axios from "axios";

const TableIcon = ({ className }) => (
  <svg
    width={35}
    height={35}
    viewBox="0 0 15 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 3.31377C14 1.53604 10.3929 0.575756 7.00152 0.575756C3.61016 0.575756 0 1.53604 0 3.31377C0 5.03681 3.38225 5.991 6.6794 6.04875V9.63156C6.67333 9.65284 6.66421 9.67107 6.65509 9.69232C6.52441 9.70144 6.412 9.79261 6.3816 9.92329C6.34818 10.0418 6.3026 10.1542 6.24485 10.2636C6.21445 10.2788 6.18103 10.2879 6.14762 10.294C5.79512 10.3396 5.29066 9.78959 5.10226 9.51609C5.00804 9.37629 4.8166 9.34287 4.67985 9.43709C4.5431 9.5313 4.50663 9.72275 4.60085 9.8595C4.66771 9.95673 5.18126 10.6861 5.82552 10.8623C5.45478 11.2634 4.85611 11.6706 3.8928 11.8196C3.72566 11.8439 3.61324 11.9988 3.63754 12.166C3.65882 12.3149 3.78947 12.4243 3.93839 12.4243C3.95357 12.4243 3.96878 12.4243 3.98397 12.4213C5.60367 12.1751 6.36946 11.2908 6.71287 10.6769C6.8162 10.5888 6.90737 10.4885 6.9803 10.373C7.05323 10.4855 7.1444 10.5888 7.24773 10.6769C7.59416 11.2908 8.35995 12.1751 9.97965 12.4213C9.99484 12.4243 10.01 12.4243 10.0252 12.4243C10.1924 12.4243 10.3291 12.2876 10.3291 12.1204C10.3291 11.9685 10.2197 11.8408 10.0708 11.8196C9.10446 11.6706 8.50277 11.2634 8.13506 10.8623C8.77928 10.683 9.29591 9.95371 9.36274 9.85645C9.45696 9.71665 9.42049 9.52825 9.28374 9.43404C9.14395 9.33983 8.95555 9.37629 8.86133 9.51304C8.67595 9.78654 8.17152 10.3396 7.81598 10.291C7.78256 10.2879 7.74609 10.2758 7.71569 10.2606C7.66099 10.1512 7.61541 10.0388 7.58199 9.92024C7.5516 9.79261 7.43918 9.69839 7.3085 9.69232C7.29938 9.67104 7.29331 9.65281 7.28419 9.63156L7.28724 6.05179C10.5935 6.00011 14 5.04287 14 3.31377ZM7.07446 5.44705C7.02583 5.42577 6.96811 5.42577 6.91948 5.44705C3.21208 5.42577 0.632092 4.3166 0.632092 3.31984C0.632092 2.31397 3.2516 1.19263 7.01369 1.19263C10.7758 1.19263 13.3953 2.31397 13.3953 3.31984C13.3953 4.31962 10.8031 5.43489 7.07446 5.44705Z"
      fill="none"
      stroke="none"
      className={className}
      strokeWidth={0.5}
    />
  </svg>
);

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

const TableNumber = ({ tableNumber }) => (
  <div className=" bg-white dark:bg-black text-black dark:text-white px-4 py-1 w-fit rounded-3xl border-2 border-adminBackgroundColor dark:border-adminBackgroundColorDark flex justify-center items-center gap-5 transition-colors duration-300">
    <TableIcon className="fill-adminPrimary dark:fill-adminPrimaryDark stroke-adminPrimary dark:stroke-adminPrimaryDark transition-colors duration-300" />
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
  progressNotification,
  unProgressNotification,
  doneNotification,
  removingId,
  setClickedButtonId,
  clickedButtonId,
  getNOtification,
}) => (
  <div
    className={`flex flex-col justify-center items-center w-full ${
      removingId === id ? "animate-scale-out" : ""
    } ${clickedButtonId === id ? "animate-scale-out" : ""}`}>
    <div
      className={` transition-all hover:scale-102 duration-300 w-9/10 md:w-4/6 xl:w-3/6 px-7 py-2 rounded-3xl ${
        message
          ? "bg-blue-100 dark:bg-blue-950"
          : "bg-white dark:bg-darkpalleteDark"
      }`}>
      <h1 className="text-lg text-black dark:text-white transition-colors duration-300 pb-2">
        {message ? "تحویل سفارش" : "درخواست کمک"}
      </h1>
      <div className="flex flex-col justify-center items-center">
        <TableNumber tableNumber={tableNumber} />
      </div>
      <div className="flex justify-center items-center gap-2 py-2">
        {inProgress ? (
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => doneNotification(id)}
              className="bg-white dark:bg-darkpalleteDark border-adminAction dark:border-adminActionDark border-2 px-3 py-2 rounded-xl text-xl text-adminAction dark:text-adminActionDark hover:bg-adminAction hover:text-white dark:hover:bg-adminActionDark transition-all">
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
              className="bg-white dark:bg-darkpalleteDark border-adminError dark:border-adminErrorDark border-2 px-3 py-2 rounded-xl text-xl text-adminError dark:text-adminErrorDark hover:bg-adminError hover:text-white dark:hover:bg-adminErrorDark transition-all">
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
            className="bg-white dark:bg-darkpalleteDark border-adminAction dark:border-adminActionDark border-2 px-3 py-2 rounded-xl text-xl text-adminAction dark:text-adminActionDark hover:bg-adminAction hover:text-white dark:hover:bg-adminActionDark transition-all">
            پذیرش بررسی
          </button>
        )}
      </div>
    </div>
  </div>
);

function WaiterPage() {
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
    const savedTheme = localStorage.getItem("theme");

    getUserInfo();
    getProfilePic();
    getNOtification();

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
      <div className="bg-adminBackgroundColor dark:bg-adminBackgroundColorDark w-screen h-screen overflow-y-auto scrollbar scrollbar-none overflow-x-hidden transition-colors duration-300">
        {/* HEADER */}
        <div className="p-2 sticky top-0 z-10 bg-adminBackgroundColor dark:bg-adminBackgroundColorDark transition-colors duration-300 rounded-b-3xl">
          <div className="bg-white dark:bg-darkpalleteDark transition-colors duration-300 w-full rounded-3xl py-3 px-4 flex justify-between items-center">
            <div className="text-xl flex gap-5 font-semibold text-darkpallete  dark:text-white transition-colors duration-300">
              <h1>کافـی نـو</h1>
              {/* DARK MODE BUTTON */}
              <button className="hidden md:block" onClick={toggleDarkMode}>
                {isDark ? (
                  <DarkMode
                    className={
                      "rotate-0 transition-all fill-white duration-150"
                    }
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

            <h1 className="md:hidden text-3xl text-black dark:text-white font-extrabold text-center p-2 rounded-3xl">
              سالن‌دار
            </h1>
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
                <p className="text-black dark:text-white transition-colors duration-300 font-bold md:block hidden">
                  {userData.full_name}
                </p>
              </div>
              {showMenu && (
                <div className="absolute left-0 mt-5 w-48 rounded-xl shadow-lg bg-white dark:bg-darkpalleteDark transition-colors duration-300">
                  <div className="py-1">
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
        <div className="bg-adminBackgroundColor flex flex-col gap-3 dark:bg-adminBackgroundColorDark h-fit transition-colors duration-300">
          {allNotifications.map((item) => (
            <div key={item.id} className="animate-scale-up">
              <WaiterRequest
                id={item.id}
                tableNumber={item.table_number}
                message={item.message}
                inProgress={item.is_in_progress}
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
