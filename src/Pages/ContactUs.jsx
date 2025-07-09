import {
  BASE_PATH,
  LIMIT_DATA,
  LOCATION,
  GET_TABLE_NUMBER,
  SET_TABLE_NUMBER,
} from "../constants/paths";
import React, { useState, useEffect, useRef } from "react";
import { Icons } from "../Componnets/Icons.jsx";
import axios from "axios";

const Waiter = ({
  addNotification,
  tableNumber,
  setTableNumber,
  error,
  tableError,
  isPageLoaded,
}) => (
  <div
    className={`${
      isPageLoaded
        ? "transition-colors duration-300"
        : "transition-none duration-0"
    } bg-white dark:bg-darkpalleteDark flex justify-between items-center w-screen p-2 xs:p-3 m-2 rounded-3xl border-2 ${
      error
        ? tableError
          ? "border-adminError dark:border-adminErrorDark"
          : "border-primary dark:border-primaryDark"
        : "border-highgray dark:border-graypalleteDark"
    } `}>
    <div>
      <h1 className="text-lg md:text-2xl font-extrabold dark:text-white transition-colors duration-300">
        تماس با سالندار
      </h1>
      <h3
        className={`text-xs md:text-lg font-normal ${
          error
            ? tableError
              ? "text-adminError"
              : "text-primary"
            : "text-slowgrayDark dark:text-slowgray"
        } transition-colors duration-300`}>
        {error ? error : "از درست بودن شماره میز اطمینان حاصل کنید"}
      </h3>
    </div>
    <div className="flex items-center gap-1 xs:gap-2">
      <div>
        <input
          className={`${
            isPageLoaded
              ? "transition-colors duration-300"
              : "transition-none duration-0"
          } size-10 xs:size-13 text-3xl font-bold text-center border-2 border-slowgray dark:border-graypalleteDark bg-white dark:bg-darkpalleteDark text-highgray dark:text-slowgray rounded-2xl`}
          type="number"
          value={tableNumber}
          step="1"
          onChange={(e) => {
            const value = e.target.value;
            if (!value.includes(".")) {
              setTableNumber(Number(value));
            }
          }}
          pattern="^[0-9]+$"
        />
      </div>
      <button
        onClick={() => addNotification(tableNumber)}
        className="size-10 xs:size-13 bg-primary dark:bg-primaryDark hover:bg-primaryDark dark:hover:bg-primary rounded-2xl flex items-center justify-center cursor-pointer transition-colors duration-300">
        <Icons.bell className={"w-6 xs:w-8 stroke-white"} />
      </button>
    </div>
  </div>
);
const Location = ({ setIframeLoaded, iframeLoaded }) => (
  <a
    onClick={() => {
      if ("vibrate" in navigator && typeof window !== "undefined") {
        navigator.vibrate(20);
      }
    }}
    href="https://nshn.ir/_bfkwn5FLuBe"
    className="relative bg-darkpallete dark:bg-darkpalleteDark hover:bg-darkpalleteDark dark:hover:bg-darkpallete p-5 pb-3 rounded-3xl transition-colors duration-300 cursor-pointer">
    {!iframeLoaded && (
      <div className="absolute bg-neutral-300 dark:bg-neutral-700 flex flex-col items-center justify-center gap-5 size-50! rounded-2xl w-full h-full animate-pulse">
        <Icons.location className={"w-12 stroke-red-600"} />
        <span className="text-black dark:text-white">
          در حال بارگذاری نقشه...
        </span>
      </div>
    )}
    <iframe
      title="map-iframe"
      src={LOCATION}
      allowFullScreen
      className="size-50! rounded-2xl z-10"
      onLoad={() => setIframeLoaded(true)}
      loading="lazy"></iframe>
    <div className="flex justify-between items-center px-4 text-white pt-2">
      <Icons.location className={"w-8 stroke-white"} />
      <h1 className="text-xl font-bold">آدرس کـــــــــافه</h1>
    </div>
  </a>
);
const PhoneNumber = () => (
  <a
    onClick={() => {
      if ("vibrate" in navigator && typeof window !== "undefined") {
        navigator.vibrate(20);
      }
    }}
    href="tel:09114605574"
    className="bg-primary dark:bg-primaryDark hover:bg-primaryDark dark:hover:bg-primary w-60 px-8 py-2 rounded-2xl flex items-center justify-between transition-colors duration-300">
    <Icons.call className="stroke-white fill-white w-8" />
    <h1 className="text-xl font-bold text-white">0911-460-5574</h1>
  </a>
);
const InstagramPage = () => (
  <a
    onClick={() => {
      if ("vibrate" in navigator && typeof window !== "undefined") {
        navigator.vibrate(20);
      }
    }}
    href="https://www.instagram.com/pezhmankazemimir?igsh=MWdibjNqeHgyczNzZg=="
    className="bg-purple-700 dark:bg-purple-800 hover:bg-purple-900 dark:hover:bg-purple-600 w-60 px-8 py-2 rounded-2xl flex items-center justify-between transition-colors duration-300">
    <Icons.instagram className={"stroke-white"} />
    <h1 className="text-xl font-bold text-white">PEZHMAN.KM</h1>
  </a>
);

function ContactUs({ setFooterShrink, setHeaderMenuOpen, setHeaderShrink }) {
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
  // ----------------------------------------------------------------

  const [tableNumber, setTableNumber] = useState(GET_TABLE_NUMBER());
  useEffect(() => {
    SET_TABLE_NUMBER(tableNumber);
  }, [tableNumber]);

  const [error, setError] = useState(null);
  const [tableError, setTableError] = useState(null);

  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    // For flashing on LOADING PAGE
    setIsPageLoaded(true);
  }, []);

  async function addNotification(tableNumber) {
    if (tableNumber < 1 || tableNumber > LIMIT_DATA) {
      setError("لطفا شماره میز را درست وارد کنید!");
      setTableError(true);
      if ("vibrate" in navigator && typeof window !== "undefined") {
        navigator.vibrate([50, 30, 50, 30, 70]);
      }
      setTimeout(() => {
        setError(null);
        setTableError(null);
      }, 2000);
      return;
    }
    setError(null);
    setTableError(null);
    try {
      const response = await axios.post(
        `${BASE_PATH}/notification/add_notif`,
        { table_number: tableNumber },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setError("اطلاع داده شد. تا چند لحظه دیگه سالن‌دار میاد");
      if ("vibrate" in navigator && typeof window !== "undefined") {
        navigator.vibrate(20);
      }
      setTimeout(() => {
        setError(null);
      }, 5000);
    } catch (err) {
      setError("خطا در تماس با سالن‌دار");
      setTableError(null);
      if ("vibrate" in navigator && typeof window !== "undefined") {
        navigator.vibrate([50, 30, 50, 30, 70]);
      }
      setTimeout(() => {
        setError(null);
        setTableError(null);
      }, 10000);
    }
  }

  return (
    <>
      <div
        style={{ WebkitOverflowScrolling: "touch" }}
        className={`${
          isPageLoaded
            ? "transition-colors duration-300"
            : "transition-none duration-0"
        } bg-backgroundcolor dark:bg-backgroundcolorDark h-full pb-22 w-screen min-h-screen pt-18 md:pt-20`}>
        <div className="grid grid-cols-1">
          {/* ------------------------------------------ CALL WAITER ------------------------------------------ */}
          <div className="col-span-1 flex justify-center items-start w-screen lg:w-2/3 mx-auto animate-scale-up">
            <Waiter
              tableNumber={tableNumber}
              setTableNumber={setTableNumber}
              addNotification={addNotification}
              error={error}
              isPageLoaded={isPageLoaded}
              tableError={tableError}
            />
          </div>
          {/* -------------------------------------------- LOCATION -------------------------------------------- */}
          <div className="col-span-1 flex justify-center mt-0 md:mt-2 animate-move-up">
            <Location
              setIframeLoaded={setIframeLoaded}
              iframeLoaded={iframeLoaded}
            />
          </div>
          {/* ------------------------------------------ PHONE COLLOR ------------------------------------------ */}
          <div className="col-span-1 flex justify-center items-center mt-2 md:mt-4 animate-move-up delay-1">
            <PhoneNumber />
          </div>
          {/* ----------------------------------------- INSTAGRAM PAGE ----------------------------------------- */}
          <div className="col-span-1 flex justify-center items-center my-2 md:my-4 animate-move-up delay-2">
            <InstagramPage />
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
