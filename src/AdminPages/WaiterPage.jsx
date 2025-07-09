import { useEffect, useRef, useState } from "react";
import { BASE_PATH } from "../constants/paths";
import axios from "axios";
import { Icons } from "../Componnets/Icons";

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
    className={`flex flex-col justify-center items-center w-full ${
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
        <div className="flex justify-center items-center py-2">
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
        <div className="flex justify-center items-center p-2">
          <h1 className="text-xs md:text-lg text-black dark:text-white transition-colors duration-300">
            این درخواست به {waitress_name} واگذار شده
          </h1>
        </div>
      )}
    </div>
  </div>
);

function WaiterPage({
  setFooterShrink,
  setHeaderMenuOpen,
  setHeaderShrink,
  userData,
}) {
  // SCROLL FOOTER -------------------------------------------------
  const lastScrollTop = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

          const scrollingDown = currentScrollTop > lastScrollTop.current + 2;
          const scrollingUp = currentScrollTop < lastScrollTop.current - 2;

          if (currentScrollTop <= 20) {
            setHeaderShrink(false);
          } else {
            setHeaderShrink(true);
          }

          if (scrollingDown) {
            setFooterShrink(true);
            setHeaderMenuOpen(false);
          } else if (scrollingUp) {
            setFooterShrink(false);
            setHeaderMenuOpen(false);
          }

          lastScrollTop.current = Math.max(0, currentScrollTop);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --------------------------------------------------------------------

  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [allNotifications, setAllNotifications] = useState([]);

  const [removingId, setRemovingId] = useState(null);
  const [clickedButtonId, setClickedButtonId] = useState(null);

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

    getNOtification();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      getNOtification();
    }, 7000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div
        style={{ WebkitOverflowScrolling: "touch" }}
        className={`${
          isPageLoaded
            ? "transition-colors duration-300"
            : "transition-none duration-0"
        } bg-adminBackgroundColor dark:bg-adminBackgroundColorDark w-screen min-h-screen pt-25 pb-17 md:pb-0`}>
        {/* -------------------------------------- BODY | REQUEST PANEL --------------------------------------------------------- */}
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
