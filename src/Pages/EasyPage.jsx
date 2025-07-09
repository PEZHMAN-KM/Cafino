import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  BASE_PATH,
  LIMIT_DATA,
  GET_TABLE_NUMBER,
  SET_TABLE_NUMBER,
} from "../constants/paths.js";
import itemImage from "../../public/No_Item.png";
import { Icons } from "../Componnets/Icons.jsx";
import { useBlur } from "../constants/BlurContext.jsx";
import { useAnimation } from "../constants/AnimationContext";

const Waiter = ({
  addNotification,
  tableNumber,
  setTableNumber,
  error,
  reduceBlur,
}) => (
  <div
    className={`transition-all duration-300 animate-move-up ${
      reduceBlur
        ? "bg-white dark:bg-darkpalleteDark lg:hover:bg-slowgray lg:hover:dark:bg-slowgrayDark"
        : "bg-backgroundcolor/30 dark:bg-backgroundcolorDark/30 lg:hover:bg-backgroundcolor/70 lg:hover:dark:bg-backgroundcolorDark/70 border-white/20 dark:border-white/10 border"
    } backdrop-blur-md shadow-lg flex gap-2 justify-between items-center max-w-full p-2 min-h-13 rounded-3xl ${
      error ? "border-primary! dark:border-primaryDark! border-2" : ""
    } `}>
    <div>
      <h1 className="text-md lg:text-xl font-extrabold pr-1 dark:text-white transition-colors duration-300">
        تماس با سالندار
      </h1>
      <h3 className="text-xs overflow-hidden lg:text-lg text-primary font-light transition-all duration-300">
        {error}
      </h3>
    </div>
    <div className="flex items-center gap-1">
      <div>
        <input
          className="transition-colors duration-300 w-10 h-10 text-2xl font-bold text-center border-2 border-slowgray dark:border-graypalleteDark bg-white dark:bg-darkpalleteDark text-highgray dark:text-slowgray rounded-2xl"
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
        className="w-10 h-10 bg-primary dark:bg-primaryDark hover:bg-primaryDark dark:hover:bg-primary rounded-2xl flex items-center justify-center cursor-pointer transition-colors duration-300">
        <Icons.bell className={"w-7 stroke-white"} />
      </button>
    </div>
  </div>
);

// Skeleton For ITEMS ---------------------------------------
const SkeletonItems = () => (
  <div className="animate-pulse flex items-center gap-3 px-3 py-2 bg-slowgray/20 dark:bg-slowgrayDark/20 rounded-3xl m-2">
    <div className="size-12 bg-neutral-300 dark:bg-neutral-700 rounded-2xl" />
    <div className="flex flex-col gap-2 flex-1">
      <div className="w-3/4 h-4 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
      <div className="w-1/2 h-3 bg-neutral-200 dark:bg-neutral-600 rounded-full" />
    </div>
    <div className="flex flex-col justify-end items-end gap-2 w-1/4">
      <div className="h-2 w-2/3 bg-neutral-300 dark:bg-neutral-700 rounded-3xl"></div>
      <div className="h-4 w-full bg-neutral-300 dark:bg-neutral-700 rounded-full"></div>
    </div>
    {/* <div className="w-16 h-7 bg-neutral-300 dark:bg-neutral-700 rounded-full" /> */}
  </div>
);

function EasyPage({ setCurrentPage, setIsDark, isDark }) {
  const reduceBlur = useBlur();
  const shouldAnimate = useAnimation();

  function goToTop() {
    window.scrollTo({
      top: 0,
      ...(shouldAnimate ? { behavior: "smooth" } : {}),
    });
  }
  // ITEM CONTROL ----------------------------------------------
  const [isLoadingItems, setIsLoadingItems] = useState(false);

  const [foodsByCategory, setFoodsByCategory] = useState({});
  const [error, setError] = useState(null);
  const categoryMap = {
    1: "کافه",
    2: "کیک و دسر",
    3: "نوشیدنی گرم",
    4: "نوشیدنی سرد",
    5: "غذا",
    "-1": "تخفیفات ویژه",
  };
  async function fetchData() {
    setIsLoadingItems(true);
    const result = {};
    try {
      const ids = [-1, 1, 2, 3, 4, 5];
      for (const id of ids) {
        let foods = [];
        if (id === -1) {
          const res = await axios.get(
            `${BASE_PATH}/food/get_all_on_sale_foods`
          );
          foods = res.data;
        } else {
          const res = await axios.post(
            `${BASE_PATH}/food/show_category_foods`,
            { category_id: id },
            { headers: { "Content-Type": "application/json" } }
          );
          foods = [...res.data.on_sale_food, ...res.data.not_on_sale_food];
        }
        result[categoryMap[id]] = foods;
      }
      setFoodsByCategory(result);
    } catch (err) {
      setError("خطا در دریافت داده‌ها");
    }
    setIsLoadingItems(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  // WAITER CALLER CONTROL ---------------------------------------
  const [tableNumber, setTableNumber] = useState(GET_TABLE_NUMBER());

  useEffect(() => {
    SET_TABLE_NUMBER(tableNumber);
  }, [tableNumber]);

  const [TableError, setTableError] = useState(null);
  async function addNotification(tableNumber) {
    if (tableNumber < 1 || tableNumber > LIMIT_DATA) {
      setTableError("شماره میز را درست وارد کنید!");
      if ("vibrate" in navigator && typeof window !== "undefined") {
        navigator.vibrate([50, 30, 50, 30, 70]);
      }
      setTimeout(() => {
        setTableError(null);
      }, 2000);
      return;
    }
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
      setTableError("اطلاع داده شد. سالن‌دار میاد");
      if ("vibrate" in navigator && typeof window !== "undefined") {
        navigator.vibrate(20);
      }
      setTimeout(() => {
        setTableError(null);
      }, 5000);
    } catch (err) {
      setTableError("خطا در تماس با سالن‌دار");
      if ("vibrate" in navigator && typeof window !== "undefined") {
        navigator.vibrate([50, 30, 50, 30, 70]);
      }
      setTimeout(() => {
        setTableError(null);
      }, 10000);
    }
  }

  // DARK MODE CONTROL -------------------------------------------
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

  return (
    <>
      <div className="py-4 px-2 bg-backgroundcolor dark:bg-backgroundcolorDark transition-colors duration-300 min-h-screen w-screen pb-15">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => {
              if ("vibrate" in navigator && typeof window !== "undefined") {
                navigator.vibrate(10);
              }
              setCurrentPage(0);
            }}
            className="text-3xl font-extrabold dark:text-white">
            لیست ساده غذاها
          </button>
        </div>
        {isLoadingItems ? (
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-y-2 gap-x-2 justify-center items-center">
            {Array.from({ length: 100 }).map((_, index) => (
              <div key={index}>
                <SkeletonItems />
              </div>
            ))}
          </div>
        ) : error ? (
          <p className="text-primary text-center">{error}</p>
        ) : (
          Object.entries(foodsByCategory).map(([category, foods]) => (
            <div key={category} className="mb-5">
              <h2
                className={`text-2xl text-center transition-colors duration-300 md:text-start font-bold mb-4 border-b pb-2 ${
                  category == "تخفیفات ویژه"
                    ? "text-primary"
                    : "text-black dark:text-white"
                }`}>
                {category}
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-y-2 gap-x-2 justify-center items-center">
                {foods.map((food) => (
                  <li
                    key={food.id}
                    className="flex justify-start items-center gap-2 md:gap-4 shadow-lg p-2 max-h-19 overflow-hidden transition-colors duration-300 bg-white dark:bg-darkpallete rounded-3xl">
                    <img
                      src={
                        food.pic_url
                          ? `${BASE_PATH}/files/${food.pic_url
                              ?.split("/")
                              .pop()}`
                          : itemImage
                      }
                      alt={food.name}
                      className="size-10 md:size-15 aspect-square object-cover rounded-xl md:rounded-2xl pointer-events-none touch-none"
                    />
                    <div className="flex justify-between items-center gap-2 w-full">
                      <div className="text-start">
                        <h3 className="text-lg md:text-xl font-bold dark:text-white">
                          {food.name}
                        </h3>
                        <p className="text-xs md:text-sm max-h-8 overflow-hidden text-slowgrayDark dark:text-slowgray">
                          {food.description}
                        </p>
                      </div>
                      <div className="text-end">
                        {food.sale_price ? (
                          <>
                            <span className="line-through text-highgrayDark dark:text-highgray text-xs md:text-sm">
                              {Number(food.price).toLocaleString()} تومان
                            </span>
                            <br />
                          </>
                        ) : null}
                        <span className="text-primary font-bold text-md md:text-lg">
                          {food.sale_price
                            ? Number(food.sale_price).toLocaleString()
                            : Number(food.price).toLocaleString()}
                          تومان
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
      {/* --------------------------------------- FOTTER -------------------------------------------------- */}
      <div
        className="fixed w-full flex justify-center items-center gap-1 px-2"
        style={{ bottom: "max(1rem, env(safe-area-inset-bottom))" }}>
        <div className="hidden lg:flex">
          <button
            className={`animate-move-up ${
              reduceBlur
                ? "bg-white dark:bg-darkpalleteDark hover:bg-slowgray hover:dark:bg-slowgrayDark"
                : "bg-backgroundcolor/30 dark:bg-backgroundcolorDark/30 hover:bg-backgroundcolor/70 hover:dark:bg-backgroundcolorDark/70 border-white/20 dark:border-white/10 border"
            } backdrop-blur-md shadow-lg max-w-14 min-w-13 max-h-14 min-h-13 flex justify-center items-center rounded-3xl transition-all duration-300 group cursor-pointer`}
            onClick={toggleDarkMode}>
            <Icons.darkMode
              className={`${
                isDark ? "rotate-0 fill-white" : "rotate-180 fill-black"
              } w-7 transition-all duration-300 ease-out group-hover:scale-105`}
            />
          </button>
        </div>
        <div className="hidden xs:flex lg:hidden">
          <button
            onClick={() => {
              if ("vibrate" in navigator && typeof window !== "undefined") {
                navigator.vibrate(10);
              }
              goToTop();
            }}
            className={`animate-move-up ${
              reduceBlur
                ? "bg-white dark:bg-darkpalleteDark hover:bg-slowgray hover:dark:bg-slowgrayDark"
                : "bg-backgroundcolor/30 dark:bg-backgroundcolorDark/30 hover:bg-backgroundcolor/70 hover:dark:bg-backgroundcolorDark/70 border-white/20 dark:border-white/10 border"
            } backdrop-blur-md shadow-lg max-w-14 min-w-13 max-h-14 min-h-13 flex justify-center items-center rounded-3xl transition-all duration-300 group cursor-pointer`}>
            <Icons.arrow
              className={
                "size-6 rotate-270 stroke-3 stroke-black dark:stroke-white transition-all duration-300 group-hover:scale-105"
              }
            />
          </button>
        </div>
        <Waiter
          addNotification={addNotification}
          tableNumber={tableNumber}
          setTableNumber={setTableNumber}
          error={TableError}
          reduceBlur={reduceBlur}
        />
        <button
          onClick={() => {
            if ("vibrate" in navigator && typeof window !== "undefined") {
              navigator.vibrate(10);
            }
            setCurrentPage(0);
          }}
          className={`animate-move-up ${
            reduceBlur
              ? "bg-white dark:bg-darkpalleteDark hover:bg-slowgray hover:dark:bg-slowgrayDark"
              : "bg-backgroundcolor/30 dark:bg-backgroundcolorDark/30 hover:bg-backgroundcolor/70 hover:dark:bg-backgroundcolorDark/70 border-white/20 dark:border-white/10 border"
          } backdrop-blur-md shadow-lg max-w-14 min-w-13 max-h-14 min-h-13 flex justify-center items-center rounded-3xl transition-all duration-300 group cursor-pointer`}>
          <Icons.arrow
            className={
              "size-6 rotate-180 stroke-3 stroke-black dark:stroke-white transition-all duration-300 group-hover:scale-105"
            }
          />
        </button>
      </div>
    </>
  );
}

export default EasyPage;
