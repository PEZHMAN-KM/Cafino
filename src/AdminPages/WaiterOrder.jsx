import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_PATH, LIMIT_DATA } from "../constants/paths.js";
import itemImage from "../../public/No_Item.png";
import { Icons } from "../Componnets/Icons.jsx";
import { useBlur } from "../constants/BlurContext.jsx";
import { useAnimation } from "../constants/AnimationContext";

// ADD ORDER FOOTER -----------------------------------------
const Waiter = ({
  addOrder,
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
      error ? "border-adminAction! dark:border-adminActionDark! border-2" : ""
    } `}>
    <div>
      <h1 className="text-md lg:text-xl font-extrabold pr-1 dark:text-white transition-colors duration-300">
        سفارش برای میز
      </h1>
      <h3 className="text-xs overflow-hidden lg:text-lg text-adminAction font-light transition-all duration-300">
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
        onClick={() => addOrder()}
        className="w-10 h-10 bg-adminAction dark:bg-adminActionDark hover:bg-adminActionDark dark:hover:bg-adminAction rounded-2xl flex items-center justify-center cursor-pointer transition-colors duration-300">
        <Icons.table className={"w-6 fill-white stroke-white"} />
      </button>
    </div>
  </div>
);

// Skeleton For ITEMS ---------------------------------------
const SkeletonItems = () => (
  <>
    <div className="animate-pulse h-27 md:h-35 p-2 bg-white dark:bg-darkpallete rounded-3xl">
      <div className="flex justify-start items-center gap-2 md:gap-4 pb-2">
        <div className="size-10! md:size-16! bg-neutral-300 dark:bg-neutral-700 rounded-xl md:rounded-2xl" />
        {/* <img
          src={itemImage}
          alt="Food Image"
          className="size-10 md:size-16 aspect-square object-cover rounded-xl md:rounded-2xl pointer-events-none touch-none"
        /> */}
        <div className="flex justify-start items-center w-3/4">
          <div className="w-full flex flex-col gap-2">
            <div className="w-1/4 h-4 md:pb-2 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
            <div className="w-1/2 h-3 bg-neutral-200 dark:bg-neutral-600 rounded-full" />
          </div>
          <div className="w-2 h-10 md:h-16" />
        </div>
      </div>
      <div className="flex w-full h-12 md:h-15 items-center justify-between">
        <div className="flex justify-center items-center cursor-pointer rounded-2xl bg-adminAction dark:bg-adminActionDark size-10 md:size-12 md:mr-1.5 transition-colors duration-300">
          <Icons.plus className={"w-7 md:w-9 stroke-white"} />
        </div>
        <div className="flex flex-col justify-end items-end gap-2 w-1/4">
          <div className="h-3 w-2/3 bg-neutral-300 dark:bg-neutral-700 rounded-3xl" />
          <div className="h-4 w-full bg-adminAction dark:bg-adminActionDark rounded-full" />
        </div>
      </div>
      {/* <div className="w-16 h-7 bg-neutral-300 dark:bg-neutral-700 rounded-full" /> */}
    </div>
  </>
);

function WaiterOrder({
  setFooterShrink,
  setHeaderMenuOpen,
  setHeaderShrink,
  footerShrink,
}) {
  const shouldAnimate = useAnimation();
  const reduceBlur = useBlur();

  function goToTop() {
    window.scrollTo({
      top: 0,
      ...(shouldAnimate ? { behavior: "smooth" } : {}),
    });
  }

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

  // ITEM CONTROL SHOW ----------------------------------------------
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
    const isDarkNow = document.documentElement.classList.contains("dark");
    setIsDark(isDarkNow);

    fetchData();
  }, []);

  // ADD ORDER CONTROL ---------------------------------------
  const [tableNumber, setTableNumber] = useState(null);
  const [TableError, setTableError] = useState(null);

  async function addOrder() {
    const rawOrder = localStorage.getItem("order");

    if (rawOrder != "[]") {
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
      const orderArray = rawOrder ? JSON.parse(rawOrder) : [];

      const foods = orderArray.map(([id, quantity]) => ({
        food_id: id,
        quantity,
      }));

      // const message = null;

      const dataToSend = {
        foods,
        table_number: tableNumber,
        // message,
      };
      try {
        const response = await axios.post(
          `${BASE_PATH}/order/add_order`,
          dataToSend,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status == 201) {
          if ("vibrate" in navigator && typeof window !== "undefined") {
            navigator.vibrate(20);
          }
          localStorage.setItem("order", "[]");
          setTableError("سفارش ثبت شده");
          setTimeout(() => {
            setTableError(null);
          }, 5000);
        }
      } catch (err) {
        setTableError("خطا در ثبت سفارش");
        if ("vibrate" in navigator && typeof window !== "undefined") {
          navigator.vibrate([50, 30, 50, 30, 70]);
        }
        setTimeout(() => {
          setTableError(null);
        }, 10000);
      }
    } else {
      setTableError("آیتمی انتخاب نکردید");
      if ("vibrate" in navigator && typeof window !== "undefined") {
        navigator.vibrate([50, 30, 50, 30, 70]);
      }
      setTimeout(() => {
        setTableError(null);
      }, 2000);
      return;
    }
  }

  function orderCount() {
    const storedOrder = JSON.parse(localStorage.getItem("order") || "[]");
    const counts = {};
    storedOrder.forEach(([id, count]) => {
      counts[id] = count;
    });
    setOrderCounts(counts);
  }

  useEffect(() => {
    orderCount();
  }, []);

  // DARK MODE CONTROL -------------------------------------------
  const [isDark, setIsDark] = useState(false);
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

  // Order Add/remove Control ------------------------------------

  const [orderCounts, setOrderCounts] = useState({});
  const [newlyAddedId, setNewlyAddedId] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const haptic = 20;

  const updateOrder = (id, newCount) => {
    const updatedCounts = { ...orderCounts };

    if (newCount > 0) {
      updatedCounts[id] = newCount;
    } else {
      delete updatedCounts[id];
    }

    const orderArray = Object.entries(updatedCounts).map(([key, value]) => [
      Number(key),
      value,
    ]);
    localStorage.setItem("order", JSON.stringify(orderArray));
    setOrderCounts(updatedCounts);
    window.dispatchEvent(new Event("orderUpdated"));
  };

  const increaseCount = (id, count) => {
    if ("vibrate" in navigator && typeof window !== "undefined") {
      navigator.vibrate(haptic);
    }
    if (count < LIMIT_DATA) updateOrder(id, count + 1);
  };
  const decreaseCount = (id, count) => {
    if ("vibrate" in navigator && typeof window !== "undefined") {
      navigator.vibrate(haptic);
    }
    const current = count || 1;

    if (current === 1) {
      setRemovingId(id);
      setTimeout(() => {
        updateOrder(id, 0);
        setRemovingId(null);
      }, 400);
    } else {
      updateOrder(id, current - 1);
    }
  };
  const handleAddToOrder = (id) => {
    if ("vibrate" in navigator) {
      navigator.vibrate(haptic);
    }
    updateOrder(id, 1);
    setNewlyAddedId(id);
    setTimeout(() => setNewlyAddedId(null), 400);
  };

  // ORDER PANEL CONTROL -----------------------------------------
  const [orderItems, setOrderItems] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  async function orderData() {
    const loaded_food_raw = localStorage.getItem("order");
    try {
      let orderArray = [];
      if (loaded_food_raw) {
        orderArray = JSON.parse(loaded_food_raw);
      }

      const foodIds = orderArray.map(([id, count]) => id);

      if (foodIds.length === 0) {
        setOrderItems([]);
        return;
      }

      const response = await axios.post(
        `${BASE_PATH}/food/get_food_list_by_id`,
        foodIds,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const itemsFromServer = response.data;

      const mergedItems = itemsFromServer.map((item) => {
        const countItem = orderArray.find(([id]) => id === item.id);
        return {
          ...item,
          count: countItem ? countItem[1] : 0,
        };
      });
      setOrderItems(mergedItems);
    } catch (err) {
      setOrderItems([]);
    }
  }

  const orderPanel = Object.entries(orderItems).map(([key, food]) => (
    <div
      key={key}
      className=" flex items-center pr-3 xs:px-1 py-1 gap-3 animate-scale-up">
      <div className="hidden xs:block aspect-square size-18 shrink-0">
        <img
          className="p-2 rounded-3xl w-full h-full object-cover pointer-events-none touch-none"
          src={
            food.pic_url
              ? `${BASE_PATH}/files/${food.pic_url?.split("/").pop()}`
              : itemImage
          }
          alt="Food Image"
        />
      </div>
      <div className="flex flex-col justify-center flex-1 overflow-hidden">
        <h1 className="text-lg font-extrabold truncate dark:text-white transition-colors duration-300">
          {food.name}
        </h1>
        <h3 className="text-m font-normal truncate dark:text-slowgray transition-colors duration-300">
          {food.category_name}
        </h3>
      </div>
      <div className="flex items-center gap-1 transition-all duration-300">
        <button
          onClick={() => increaseCountOrderPanel(food.id)}
          className="w-7 h-7 cursor-pointer flex items-center justify-center bg-adminAction dark:bg-adminActionDark rounded-full hover:bg-adminActionDark dark:hover:bg-adminAction transition-colors duration-300">
          <Icons.plus className={"w-7 stroke-white"} />
        </button>
        <span className="w-9 text-center text-4xl font-bold dark:text-white inline-block">
          {food.count}
        </span>
        <button
          onClick={() => decreaseCountOrderPanel(food.id)}
          className="w-7 h-7 cursor-pointer border-2 border-adminAction dark:border-adminActionDark rounded-full flex items-center justify-center hover:bg-adminAction dark:hover:bg-adminActionDark transition-colors duration-300">
          <Icons.mines
            className={
              "w-3 fill-black dark:fill-white hover:fill-white transition-colors duration-300"
            }
          />
        </button>
      </div>
    </div>
  ));

  const increaseCountOrderPanel = (id) => {
    if ("vibrate" in navigator && typeof window !== "undefined") {
      navigator.vibrate(20);
    }
    const updatedItems = orderItems.map((item) => {
      if (item.id === id && item.count < LIMIT_DATA) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    setOrderItems(updatedItems);
    updateLocalStorage(updatedItems);
  };
  const decreaseCountOrderPanel = (id) => {
    if ("vibrate" in navigator && typeof window !== "undefined") {
      navigator.vibrate(20);
    }

    const item = orderItems.find((item) => item.id === id);
    if (!item) return;

    if (item.count === 1) {
      setRemovingId(id);
      setTimeout(
        () => {
          setOrderItems((prev) => {
            const updated = prev.filter((item) => item.id !== id);
            updateLocalStorage(updated);
            return updated;
          });
          setRemovingId(null);
        },
        shouldAnimate ? 400 : 0
      );
    } else {
      const updatedItems = orderItems.map((item) => {
        if (item.id === id) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      });
      setOrderItems(updatedItems);
      updateLocalStorage(updatedItems);
    }
  };
  const updateLocalStorage = (items) => {
    const simplified = items.map((item) => [item.id, item.count]);
    localStorage.setItem("order", JSON.stringify(simplified));
    const foodIds = items.map((item) => item.count);
  };

  return (
    <>
      {/* ---------------------------------------------------- POP UP OVERLAY ---------------------------------------------------- */}
      {isPopupOpen && (
        <div
          className={`${
            reduceBlur ? "bg-black/70" : "bg-black/20"
          } backdrop-blur-md z-50 fixed inset-0 flex justify-center items-center`}>
          <div className="bg-backgroundcolor dark:bg-backgroundcolorDark rounded-3xl p-4 max-w-lg w-full">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl text-black dark:text-white font-bold">
                سبد خرید
              </h1>
              <button
                onClick={() => {
                  if ("vibrate" in navigator && typeof window !== "undefined") {
                    navigator.vibrate(10);
                  }
                  setIsPopupOpen(false);
                  orderCount();
                }}
                className="bg-slowgray dark:bg-darkpallete p-2 rounded-full">
                <Icons.arrow
                  className={
                    "size-6 rotate-180 stroke-3 stroke-black dark:stroke-white transition-all duration-300 group-hover:scale-105"
                  }
                />
              </button>
            </div>
            {orderPanel.length > 0 ? (
              <div>{orderPanel}</div>
            ) : (
              <p className="text-center font-bold text-adminAction">
                سبد خرید خالی است
              </p>
            )}
          </div>
        </div>
      )}
      {/* ---------------------------------------------------- MAIN PAGE ---------------------------------------------------- */}
      <div className="py-4 px-2 bg-adminBackgroundColor dark:bg-adminBackgroundColorDark transition-colors duration-300 min-h-screen w-screen pt-25 pb-32 md:pb-15">
        {/* <div className="flex justify-center mb-6">
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
        </div> */}
        {isLoadingItems ? (
          <div className="mb-5 w-full">
            <div className="h-6 transition-colors duration-300 mx-auto md:mx-0 w-1/4 md:w-1/8 mb-2 bg-neutral-300 dark:bg-neutral-700 rounded-full"></div>
            <div className="border-neutral-300 dark:border-neutral-700 border-b-2 mt-4 mb-3"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-y-2 gap-x-2 justify-center items-center">
              {Array.from({ length: 100 }).map((_, index) => (
                <div key={index}>
                  <SkeletonItems />
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <p className="text-adminAction text-center">{error}</p>
        ) : (
          <div>
            {Object.entries(foodsByCategory).map(([category, foods]) => (
              <div key={category} className="mb-5">
                <h2
                  className={`text-2xl text-center transition-colors duration-300 md:text-start font-bold mb-4 border-b pb-2 ${
                    category == "تخفیفات ویژه"
                      ? "text-adminAction"
                      : "text-black dark:text-white"
                  }`}>
                  {category}
                </h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-y-2 gap-x-2 justify-center items-center">
                  {foods.map((food) => (
                    <li
                      key={food.id}
                      className="shadow-lg p-2 h-27 md:h-35 overflow-hidden transition-colors duration-300 bg-white dark:bg-darkpallete rounded-3xl">
                      <div className="flex justify-start items-center gap-2 md:gap-4 pb-1">
                        <img
                          src={
                            food.pic_url
                              ? `${BASE_PATH}/files/${food.pic_url
                                  ?.split("/")
                                  .pop()}`
                              : itemImage
                          }
                          alt={food.name}
                          className="size-10 md:size-16 aspect-square object-cover rounded-xl md:rounded-2xl pointer-events-none touch-none"
                        />
                        <div className="text-start w-full">
                          <h3 className="text-lg md:text-xl md:pb-2 font-bold dark:text-white">
                            {food.name}
                          </h3>
                          <p className="text-xs md:text-sm max-h-8 overflow-hidden text-slowgrayDark dark:text-slowgray">
                            {food.description}
                          </p>
                        </div>
                        <div className="pl-2">
                          {orderCounts[food.id] > 0 ? (
                            <div>
                              <h1
                                className={`bg-adminAction w-6 h-6 rounded-full flex justify-center items-center font-bold text-white ${
                                  newlyAddedId === food.id
                                    ? "animate-scale-up"
                                    : removingId === food.id
                                    ? "animate-scale-out"
                                    : ""
                                }`}>
                                {orderCounts[food.id]}
                              </h1>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex w-full h-12 md:h-15 items-center justify-between">
                        {orderCounts[food.id] > 0 ? (
                          <div
                            className={`flex items-center gap-3 md:gap-2.5 mr-2 md:mr-0 transition-all duration-300 ${
                              newlyAddedId === food.id
                                ? "animate-scale-up"
                                : removingId === food.id
                                ? "animate-scale-out"
                                : ""
                            }`}>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                increaseCount(food.id, orderCounts[food.id]);
                              }}
                              className="w-7 h-7 cursor-pointer flex items-center justify-center bg-adminAction dark:bg-adminActionDark rounded-full md:hover:bg-adminActionDark md:dark:hover:bg-adminAction transition-colors duration-300 touch-manipulation">
                              <Icons.plus className={"w-7 stroke-white"} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                decreaseCount(food.id, orderCounts[food.id]);
                              }}
                              className="w-7 h-7 cursor-pointer border-2 border-adminAction dark:border-adminActionDark rounded-full flex items-center justify-center md:hover:bg-adminAction md:dark:hover:bg-adminActionDark transition-colors duration-300 touch-manipulation">
                              <Icons.mines
                                className={
                                  "w-3 fill-black dark:fill-white md:hover:fill-white transition-colors duration-300 touch-manipulation"
                                }
                              />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToOrder(food.id);
                            }}
                            className="flex justify-center items-center cursor-pointer rounded-2xl bg-adminAction dark:bg-adminActionDark md:hover:bg-adminActionDark md:dark:hover:bg-adminAction size-10 md:size-12 md:mr-1.5 transition-colors duration-300 touch-manipulation">
                            <Icons.plus className={"w-7 md:w-9 stroke-white"} />
                          </button>
                        )}
                        <div className="text-end pl-2">
                          {food.sale_price ? (
                            <>
                              <span className="line-through text-highgrayDark dark:text-highgray text-xs md:text-sm">
                                {Number(food.price).toLocaleString()} تومان
                              </span>
                              <br />
                            </>
                          ) : null}
                          <span className="text-adminAction font-bold text-md md:text-lg">
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
            ))}
          </div>
        )}
      </div>
      {/* --------------------------------------- FOTTER -------------------------------------------------- */}
      <div
        className={`fixed ${
          footerShrink ? "bottom-12 md:bottom-5" : "bottom-20 md:bottom-5"
        } w-full flex justify-center items-center gap-1 px-2`}>
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
          addOrder={addOrder}
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
            setIsPopupOpen(true);
            orderData();
          }}
          className={`animate-move-up ${
            reduceBlur
              ? "bg-white dark:bg-darkpalleteDark hover:bg-slowgray hover:dark:bg-slowgrayDark"
              : "bg-backgroundcolor/30 dark:bg-backgroundcolorDark/30 hover:bg-backgroundcolor/70 hover:dark:bg-backgroundcolorDark/70 border-white/20 dark:border-white/10 border"
          } backdrop-blur-md shadow-lg max-w-14 min-w-13 max-h-14 min-h-13 flex justify-center items-center rounded-3xl transition-all duration-300 group cursor-pointer`}>
          <Icons.bag
            className={
              "size-7 stroke-black dark:stroke-white transition-all duration-300 group-hover:scale-105"
            }
          />
        </button>
      </div>
    </>
  );
}

export default WaiterOrder;
