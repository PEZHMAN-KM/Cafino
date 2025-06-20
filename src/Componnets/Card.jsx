import { useRef, useEffect, useState } from "react";
import itemImage from "../../public/No_Item.png";
import { Icons } from "./Icons";
import { BASE_PATH, LIMIT_DATA } from "../constants/paths";

import { motion, AnimatePresence } from "framer-motion";

const formatPrice = (num) => {
  if (num == null || isNaN(num)) return "";
  return Number(num).toLocaleString("en-US");
};

function Card({
  id,
  in_sale,
  pic_url,
  name,
  description,
  price,
  sale_price,
  updateOrder,
  count,
  setBlurActive,
  setActiveCardData,
  expanded = false,
  setCurrentPage,
}) {
  const [newlyAddedId, setNewlyAddedId] = useState(null);
  const [removingId, setRemovingId] = useState(null);
  const haptic = 20;

  // TOUCH CONTROLL FOR LONG PRESS LIKE IOS ---------------------------------
  const [isLongPressed, setIsLongPressed] = useState(false);
  const longPressTimer = useRef(null);

  const startYRef = useRef(0);

  const handleTouchStart = (e) => {
    startYRef.current = e.touches[0].clientY;

    longPressTimer.current = setTimeout(() => {
      setIsLongPressed(true);
      setBlurActive(true);
      setActiveCardData({
        id,
        name,
        pic_url,
        description,
        price,
        sale_price,
        in_sale,
        count,
      });
    }, 400);
  };

  const handleTouchMove = (e) => {
    const currentY = e.touches[0].clientY;
    if (Math.abs(currentY - startYRef.current) > 10) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleTouchEnd = () => {
    clearTimeout(longPressTimer.current);
    setIsLongPressed(false);
    setBlurActive(false);
    setActiveCardData(null);
  };

  // --------------------------------------------------------------------------

  function selectFood(food_id) {
    if ("vibrate" in navigator && typeof window !== "undefined") {
      navigator.vibrate(10);
    }
    localStorage.setItem("show_food", food_id);
    // navigate("/item");
    setCurrentPage(5);
  }

  const increaseCount = () => {
    if ("vibrate" in navigator && typeof window !== "undefined") {
      navigator.vibrate(haptic);
    }
    if (count < LIMIT_DATA) updateOrder(id, count + 1);
  };

  const decreaseCount = (id) => {
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

  return (
    <>
      <div onClick={() => selectFood(id)} key={id}>
        <motion.div
          onTouchStartCapture={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`${
            in_sale
              ? "bg-slowprimary dark:bg-slowprimaryDark"
              : "bg-white dark:bg-darkpalleteDark"
          } rounded-3xl w-full h-fit p-3 m-auto text-start transition-colors select-none duration-300 animate-scale-up`}
          animate={isLongPressed ? { scale: 1.1 } : { scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}>
          <img
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            className="w-full h-full aspect-square object-cover rounded-2xl"
            src={
              pic_url
                ? `${BASE_PATH}/files/${pic_url.split("/").pop()}`
                : itemImage
            }
            alt={name}
          />
          <div className="flex justify-between items-center">
            <div className="overflow-hidden w-fit">
              <h1 className="text-2xl font-bold mt-2 dark:text-white truncate transition-colors duration-300">
                {name}
              </h1>
              <h3
                className={`mt-1 dark:text-slowgray transition-colors duration-300 min-h-[1.5rem] ${
                  expanded
                    ? "line-clamp-3 text-sm leading-relaxed"
                    : "truncate whitespace-nowrap overflow-hidden text-ellipsis"
                }`}>
                {description}
              </h3>
            </div>
            {count > 0 ? (
              <div>
                <h1
                  className={`bg-primary w-6 h-6 rounded-full flex justify-center items-center font-bold text-white ${
                    newlyAddedId === id
                      ? "animate-scale-up"
                      : removingId === id
                      ? "animate-scale-out"
                      : ""
                  }`}>
                  {count}
                </h1>
              </div>
            ) : null}
          </div>

          <div
            className={`flex mt-3 h-20 items-center ${
              !expanded ? "justify-between" : "justify-center"
            }`}>
            {!expanded &&
              (count > 0 ? (
                <div
                  className={`flex items-center gap-2 transition-all duration-300 ${
                    newlyAddedId === id
                      ? "animate-scale-up"
                      : removingId === id
                      ? "animate-scale-out"
                      : ""
                  }`}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      increaseCount(id);
                    }}
                    className="w-7 h-7 cursor-pointer flex items-center justify-center bg-primary dark:bg-primaryDark rounded-full md:hover:bg-primaryDark md:dark:hover:bg-primary transition-colors duration-300 touch-manipulation">
                    <Icons.plus className={"w-7 stroke-white"} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      decreaseCount(id);
                    }}
                    className="w-7 h-7 cursor-pointer border-2 border-primary dark:border-primaryDark rounded-full flex items-center justify-center md:hover:bg-primary md:dark:hover:bg-primaryDark transition-colors duration-300 touch-manipulation">
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
                    handleAddToOrder(id);
                  }}
                  className="flex justify-center items-center cursor-pointer rounded-2xl bg-primary dark:bg-primaryDark md:hover:bg-primaryDark md:dark:hover:bg-primary w-13 h-13 transition-colors duration-300 touch-manipulation">
                  <Icons.plus className={"w-10 stroke-white"} />
                </button>
              ))}
            <div className={`text-end ${expanded && "w-full"}`}>
              {sale_price && (
                <div
                  className={`${
                    expanded && "flex justify-between w-full items-center"
                  }`}>
                  {expanded && (
                    <h1 className="text-md font-medium dark:text-white transition-colors duration-300">
                      قیمت اصلی:
                    </h1>
                  )}

                  <h1 className="text-md font-medium dark:text-white transition-colors duration-300 line-through">
                    {formatPrice(price)} تومان
                  </h1>
                </div>
              )}
              <div
                className={`${
                  expanded && "flex justify-between w-full items-center"
                }`}>
                {expanded && (
                  <h1 className="text-md font-medium dark:text-white transition-colors duration-300">
                    {sale_price ? "با تخفیف:" : "قیمت اصلی:"}
                  </h1>
                )}
                <div className="flex justify-end items-center gap-1">
                  <h1 className="text-2xl font-bold dark:text-white transition-colors duration-300">
                    {sale_price ? formatPrice(sale_price) : formatPrice(price)}
                  </h1>
                  <h3 className="text-sm dark:text-slowgray transition-colors duration-300">
                    تومان
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Card;
