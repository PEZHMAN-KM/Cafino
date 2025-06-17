import React, { useState } from "react";
import { Icons } from "./Icons";

function SubHeder({
  hideIcons,
  className,
  onCategorySelect,
  showMenu,
  setShowMenu,
  onSearchClick,
  setSearchActive,
}) {
  const [onCategory, setOnCategory] = useState(1);
  const haptic = 10;

  function changeCategory(index) {
    if ("vibrate" in navigator && typeof window !== "undefined") {
      navigator.vibrate(haptic);
    }

    onCategorySelect(index);
    setOnCategory(index);
  }

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className={className}>
        <div className="z-10 flex justify-baseline xl:justify-center items-center gap-3 px-3 py-2 w-full scrollbar scrollbar-none overflow-x-auto">
          {/* MENU BUTTON */}
          <div
            className={`bg-darkpallete p-2 hidden shrink-0 font-bold rounded-2xl cursor-pointer transition-all duration-300 md:hover:scale-102 md:hover:bg-highgray touch-manipulation ${
              !hideIcons ? "hidden" : "md:block"
            }`}
            onClick={toggleMenu}>
            {hideIcons && <Icons.menu className={"w-10"} />}
          </div>
          {showMenu && hideIcons && (
            <div className="absolute right-5 top-14 mt-5 w-48 rounded-xl shadow-lg bg-white dark:bg-darkpalleteDark transition-colors duration-300 z-50">
              <div className="py-1">
                <a
                  href="/home"
                  className="block text-start w-full px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
                  خانه
                </a>
                <a
                  href="/favoritepage"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
                  علاقه مندی ها
                </a>
                <a
                  href="/order"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
                  سفارشات
                </a>
                <a
                  href="/contactus"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-white hover:bg-adminBackgroundColor dark:hover:bg-adminBackgroundColorDark transition-colors duration-300">
                  تماس با ما
                </a>
              </div>
            </div>
          )}
          {/* SEARCH ICON */}
          <div
            onClick={() => {
              if ("vibrate" in navigator && typeof window !== "undefined") {
                navigator.vibrate(haptic);
              }
              onSearchClick();
              setSearchActive(true);
            }}
            className={`bg-graypallete p-3 shrink-0 font-bold rounded-2xl cursor-pointer transition-all duration-300 md:hover:scale-102 md:hover:bg-highgray touch-manipulation ${
              !hideIcons ? "hidden" : "block"
            }`}>
            {hideIcons && <Icons.search className={"w-7 stroke-black"} />}
          </div>
          {/* COFFE */}
          <div
            className={`${
              onCategory === 1
                ? "bg-primary dark:bg-primaryDark text-white"
                : "bg-graypallete dark:bg-graypalleteDark text-black dark:text-white"
            } shrink-0 font-bold rounded-2xl cursor-pointer transition-colors duration-300 md:hover:scale-102 md:hover:bg-highgray animate-scale-up touch-manipulation ${
              !hideIcons
                ? "md:w-40 w-24 h-30 md:h-40 flex justify-center items-center flex-col gap-3 text-sm md:text-2xl"
                : "p-3 text-xl h-full text-center"
            }`}
            onClick={() => changeCategory(1)}>
            <Icons.Coffee
              fill={`transition-colors duration-300 ${
                onCategory === 1 ? "fill-white" : "fill-black dark:fill-white"
              }`}
              className={`w-15 h-15 md:w-20 md:h-20 transition-all duration-300 ${
                !hideIcons ? "scale-100" : "scale-0 !max-h-0"
              }`}
            />
            <h1>کافه</h1>
          </div>
          {/* OFF - SALE */}
          <div
            className={`${
              onCategory === -1
                ? "bg-primary dark:bg-primaryDark text-white"
                : "bg-slowprimary dark:bg-slowprimaryDark text-primary"
            } shrink-0 font-bold rounded-2xl cursor-pointer transition-colors duration-300 md:hover:scale-102 md:hover:bg-slowgrayDark md:hover:dark:bg-slowgray flex justify-center items-center gap-3 animate-scale-up touch-manipulation ${
              !hideIcons
                ? "md:w-40 w-24 h-30 md:h-40 flex-col text-sm md:text-2xl"
                : "p-2 text-xl text-center"
            }`}
            onClick={() => changeCategory(-1)}>
            <Icons.Off
              fill={`transition-colors duration-300 ${
                onCategory === -1 ? "fill-white" : "fill-primary"
              }`}
              stroke={`transition-colors duration-300 ${
                onCategory === -1 ? "stroke-white" : "stroke-primary"
              }`}
              className={`transition-all duration-300 ${
                !hideIcons ? "w-15 h-15 md:w-20 md:h-20 " : "w-9 h-9"
              }`}
            />
            <h1>تخفیفات ویژه</h1>
          </div>
          {/* Cake */}
          <div
            className={`${
              onCategory === 2
                ? "bg-primary dark:bg-primaryDark text-white"
                : "bg-graypallete dark:bg-graypalleteDark text-black dark:text-white"
            } shrink-0 font-bold rounded-2xl cursor-pointer transition-colors duration-300 md:hover:scale-102 md:hover:bg-highgray animate-scale-up touch-manipulation ${
              !hideIcons
                ? "md:w-40 w-24 h-30 md:h-40 flex justify-center items-center flex-col gap-3 text-sm md:text-2xl"
                : "p-3 text-xl h-full text-center"
            }`}
            onClick={() => changeCategory(2)}>
            <Icons.Cake
              stroke={`transition-colors duration-300 ${
                onCategory === 2
                  ? "stroke-white"
                  : "stroke-black dark:stroke-white"
              }`}
              className={`w-15 h-15 md:w-20 md:h-20 transition-all duration-300 ${
                !hideIcons ? "scale-100" : "scale-0 !max-h-0"
              }`}
            />
            <h1>کیک و دسر</h1>
          </div>
          {/* Warm Drink */}
          <div
            className={`${
              onCategory === 3
                ? "bg-primary dark:bg-primaryDark text-white"
                : "bg-graypallete dark:bg-graypalleteDark text-black dark:text-white"
            } shrink-0 font-bold rounded-2xl cursor-pointer transition-colors duration-300 md:hover:scale-102 md:hover:bg-highgray animate-scale-up touch-manipulation ${
              !hideIcons
                ? "md:w-40 w-24 h-30 md:h-40 flex justify-center items-center flex-col gap-3 text-sm md:text-2xl"
                : "p-3 text-xl h-full text-center"
            }`}
            onClick={() => changeCategory(3)}>
            <Icons.WarmDrink
              fill={`transition-colors duration-300 ${
                onCategory === 3 ? "fill-white" : "fill-black dark:fill-white"
              }`}
              className={`w-15 h-15 md:w-20 md:h-20 transition-all duration-300 ${
                !hideIcons ? "scale-100" : "scale-0 !max-h-0"
              }`}
            />
            <h1>نوشیدنی گرم</h1>
          </div>
          {/* Cold Drink */}
          <div
            className={`${
              onCategory === 4
                ? "bg-primary dark:bg-primaryDark text-white"
                : "bg-graypallete dark:bg-graypalleteDark text-black dark:text-white"
            } shrink-0 font-bold rounded-2xl cursor-pointer transition-colors duration-300 md:hover:scale-102 md:hover:bg-highgray animate-scale-up touch-manipulation ${
              !hideIcons
                ? "md:w-40 w-24 h-30 md:h-40 flex justify-center items-center flex-col gap-3 text-sm md:text-2xl"
                : "p-3 text-xl h-full text-center"
            }`}
            onClick={() => changeCategory(4)}>
            <Icons.ColdDrink
              className={`w-15 h-15 md:w-20 md:h-20 duration-300 transition-all ${
                onCategory === 4 ? "fill-white" : "fill-black dark:fill-white"
              } ${!hideIcons ? "scale-100" : "scale-0 !max-h-0"}`}
            />
            <h1>نوشیدنی سرد</h1>
          </div>
          {/* Food */}
          <div
            className={`${
              onCategory === 5
                ? "bg-primary dark:bg-primaryDark text-white"
                : "bg-graypallete dark:bg-graypalleteDark text-black dark:text-white"
            } shrink-0 font-bold rounded-2xl transition-colors duration-300 md:hover:scale-102 md:hover:bg-highgray cursor-pointer animate-scale-up touch-manipulation ${
              !hideIcons
                ? "md:w-40 w-24 h-30 md:h-40 flex justify-center items-center flex-col gap-3 text-sm md:text-2xl"
                : "p-3 text-xl h-full text-center"
            }`}
            onClick={() => changeCategory(5)}>
            <Icons.Food
              fill={`transition-colors duration-300 ${
                onCategory === 5 ? "fill-white" : "fill-black dark:fill-white"
              }`}
              className={`w-15 h-15 md:w-20 md:h-20 transition-all duration-300 ${
                !hideIcons ? "scale-100" : "scale-0 !max-h-0"
              }`}
            />
            <h1>غذا</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default SubHeder;
