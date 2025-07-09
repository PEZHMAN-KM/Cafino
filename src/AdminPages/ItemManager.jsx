import axios, { Axios } from "axios";
import { useEffect, useRef, useState } from "react";
import { BASE_PATH } from "../constants/paths";
import itemImage from "../../public/No_Item.png";

import UseAuth from "../UseAuth";
import { Icons } from "../Componnets/Icons";

// ITEM CONTROL ---------------------------------------------------
// const Setting = ({ className }) => {
//   return (
//     <svg
//       className={className}
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg">
//       <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//       <g
//         id="SVGRepo_tracerCarrier"
//         stroke-linecap="round"
//         stroke-linejoin="round"></g>
//       <g id="SVGRepo_iconCarrier">
//         <path
//           d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
//           stroke-width="1.5"
//           stroke-miterlimit="10"
//           stroke-linecap="round"
//           stroke-linejoin="round"></path>
//         <path
//           d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z"
//           stroke-width="1.5"
//           stroke-miterlimit="10"
//           stroke-linecap="round"
//           stroke-linejoin="round"></path>
//       </g>
//     </svg>
//   );
// };
const formatPrice = (num) => {
  if (num == null || isNaN(num)) return "";
  return Number(num).toLocaleString("en-US");
};
const ItemTable = ({
  id,
  pic_url,
  name,
  category,
  price,
  in_sale,
  sale_price,
  deleteFood,
  editFood,
  removingId,
  setClickedButtonId,
  clickedButtonId,
}) => {
  return (
    <div
      className={`grid grid-cols-4 lg:grid-cols-5 items-center text-center text-sm md:text-xl font-bold gap-2 rounded-xl px-2 transition-colors duration-300 animate-scale-up ${
        in_sale
          ? "bg-adminAction text-adminBackgroundColor dark:bg-adminActionDark"
          : "bg-white dark:bg-darkpalleteDark dark:text-white"
      } ${removingId === id ? "animate-scale-out" : ""} ${
        clickedButtonId === id ? "animate-scale-out" : ""
      }`}>
      <div className="hidden lg:flex justify-center items-center">
        <img
          className="hidden lg:inline w-20 h-20 p-2 aspect-square object-cover rounded-2xl pointer-events-none touch-none"
          src={
            pic_url
              ? `${BASE_PATH}/files/${pic_url.split("/").pop()}`
              : itemImage
          }
          alt={name}
        />
        {in_sale ? <h1 className="text-sm w-0">تخفیف</h1> : null}
      </div>
      <div>
        <h1>{name}</h1>
      </div>
      <div>
        <h1>{category}</h1>
      </div>
      <div>
        <h1 className="text-center">
          <span>
            {sale_price ? formatPrice(sale_price) : formatPrice(price)}
          </span>
          {/* <span className="pr-1">تومان</span> */}
        </h1>
      </div>
      <div className="flex justify-center items-center gap-2 my-1 md:my-2">
        <button
          onClick={() => {
            deleteFood(id);
            setClickedButtonId(id);
            setTimeout(async () => {
              setClickedButtonId(null);
            }, 300);
          }}
          className="flex justify-center items-center bg-adminError md:px-1 md:py-0.5 text-white rounded-lg md:hover:scale-105 md:hover:bg-adminErrorDark transition-all duration-300">
          <Icons.delete className="w-8 md:w-6 stroke-white" />
          <h1 className="hidden md:block md:w-14 md:text-sm">پاک کردن</h1>
        </button>
        <button
          onClick={() => editFood(id)}
          className="flex justify-center items-center bg-white md:px-1 md:py-0.5 text-black rounded-lg md:hover:scale-105 transition-all duration-300">
          <Icons.edit className="w-8 md:w-6 stroke-black" />
          <h1 className="hidden md:block md:text-sm">اصلاح</h1>
        </button>
      </div>
    </div>
  );
};

// WAITER CONTROL -------------------------------------------------
const WaiterItem = ({
  id,
  pic_url,
  full_name,
  username,
  UnEmployUser,
  removingId,
  setClickedButtonId,
  clickedButtonId,
}) => {
  return (
    <div
      className={`flex justify-between items-center text-start text-xl font-bold rounded-3xl px-2 bg-white dark:bg-darkpalleteDark dark:text-white transition-colors duration-300 animate-scale-up ${
        removingId === id ? "animate-scale-out" : ""
      } ${clickedButtonId === id ? "animate-scale-out" : ""}`}>
      <div className="flex justify-center items-center">
        <img
          className="size-16 md:size-20 p-2 aspect-square object-cover rounded-full pointer-events-none touch-none"
          src={
            pic_url
              ? `${BASE_PATH}/files/${pic_url.split("/").pop()}`
              : itemImage
          }
          alt={username}
        />
        <div>
          <h1>{full_name}</h1>
          <h1 className="text-lg font-light">{username}</h1>
        </div>
      </div>
      <button
        onClick={() => {
          UnEmployUser(id);
          setClickedButtonId(id);
          setTimeout(async () => {
            setClickedButtonId(null);
          }, 300);
        }}
        className="flex justify-center items-center bg-adminError p-1 md:px-1 md:py-0.5 text-white rounded-lg md:hover:scale-105 md:hover:bg-adminErrorDark transition-all duration-300">
        <Icons.delete className="w-6 stroke-white" />
        <h1 className="hidden md:block md:w-14 md:text-sm">اخراج</h1>
      </button>
    </div>
  );
};

const ItemManager = ({
  setCurrentPage,
  setHeaderShrink,
  setFooterShrink,
  setHeaderMenuOpen,
}) => {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [clickedButtonId, setClickedButtonId] = useState(null);

  const { isAuthenticated } = UseAuth();

  async function checktoken() {
    if (isAuthenticated) {
      const data = JSON.parse(localStorage.getItem("user_data"));
      if (data.is_admin == false) {
        setCurrentPage(0);
        localStorage.removeItem("user_data");
      }
    }
  }

  useEffect(() => {
    // For flashing on LOADING PAGE
    setIsPageLoaded(true);

    allFoods();
    allWaiteres();
  }, []);

  // ITEM CONTROL ---------------------------------------------------
  const [allFood, setAllFood] = useState([]);

  async function allFoods() {
    try {
      const response = await fetch(`${BASE_PATH}/food/get_all_foods`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status == 200) {
        const data = await response.json();
        setAllFood(data);
      }
    } catch (error) {
      console.error("Error fetching foods:", error);
      setAllFood([]);
    }
  }
  async function deleteFood(food_id) {
    checktoken();
    setRemovingId(food_id);
    const token = JSON.parse(localStorage.getItem("user_data"));
    setTimeout(async () => {
      try {
        const response = await axios.delete(
          `${BASE_PATH}/admin/food/delete_food`,
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
              "Content-Type": "application/json",
            },
            data: { food_id },
          }
        );

        if (response.status === 200) {
          console.log("Deleted successfully:", response.data);
          setAllFood((prevFoods) =>
            prevFoods.filter((item) => item.id !== food_id)
          );
        }
      } catch (error) {
        console.error("Error Deleting food:", error);
      } finally {
        setRemovingId(null);
      }
    }, 300);
  }
  function editFood(food_id) {
    checktoken();
    localStorage.setItem("edit_food", food_id);
    setCurrentPage(4);
  }

  // WAITER CONTROL -------------------------------------------------
  const [allWaiter, SetAllWaiter] = useState([]);

  async function allWaiteres() {
    const token = JSON.parse(localStorage.getItem("user_data"));

    try {
      const response = await fetch(
        `${BASE_PATH}/admin/waitress/get_all_waitresses`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        SetAllWaiter(data);
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching foods:", error);
      setAllFood([]);
    }
  }
  async function UnEmployUser(user_id) {
    checktoken();
    setRemovingId(user_id);

    const token = JSON.parse(localStorage.getItem("user_data"));
    setTimeout(async () => {
      try {
        const response = await axios.put(
          `${BASE_PATH}/admin/waitress/admin_unemploy_user`,
          { user_id: user_id },
          {
            headers: {
              Authorization: `Bearer ${token.access_token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log("بیکاری با موفقیت انجام شد", response.data);
          SetAllWaiter((prevFoods) =>
            prevFoods.filter((item) => item.id !== user_id)
          );
        }
      } catch (error) {
        console.error("کاربر بیکار نشد", error);
      } finally {
        setRemovingId(null);
      }
    }, 300);
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

  return (
    <>
      <div
        style={{ WebkitOverflowScrolling: "touch" }}
        className={`${
          isPageLoaded
            ? "transition-colors duration-300"
            : "transition-none duration-0"
        } bg-adminBackgroundColor dark:bg-adminBackgroundColorDark min-h-screen overflow-x-hidden`}>
        <div
          className={`${
            isPageLoaded
              ? "transition-colors duration-300"
              : "transition-none duration-0"
          } pt-25 grid grid-cols-1 xl:grid-cols-6 gap-2 pb-20 md:pb-2 xl:h-screen`}>
          {/* -------------------------------------------------------- ITEM CONTROL -------------------------------------------------------- */}
          <div
            className={`${
              isPageLoaded
                ? "transition-colors duration-300"
                : "transition-none duration-0"
            } col-span-1 xl:col-span-4 bg-white dark:bg-darkpalleteDark mx-2 xl:mx-0 xl:mr-2 rounded-3xl h-fit max-h-full overflow-y-auto overflow-x-hidden scrollbar scrollbar-none`}>
            <div className="flex justify-between items-center pl-4 py-3">
              <h1
                className={`${
                  isPageLoaded
                    ? "transition-colors duration-300"
                    : "transition-none duration-0"
                } text-2xl md:text-3xl font-extrabold pr-8 py-4 dark:text-white`}>
                مدیریت آیتم ها
              </h1>
              {/* <div className="flex gap-1 md:gap-2">
                  <a href="">
                    <div className="bg-white flex items-center justify-center gap-1 border-3 border-highgray text-highgray p-1 md:p-2 rounded-2xl font-bold">
                      <Setting className={"w-8 stroke-highgray "} />
                      <h1 className="hidden md:block">تنظیمات</h1>
                    </div>
                  </a>
                </div> */}
              <button
                onClick={() => {
                  setCurrentPage(3);
                }}>
                <div className="bg-white dark:bg-black flex items-center justify-center gap-1 border-3 border-black dark:border-white p-2 rounded-2xl font-bold transition-all duration-300">
                  <Icons.add
                    className={
                      "w-8 rotate-180 stroke-black dark:stroke-white transition-colors duration-300"
                    }
                  />
                  <h1 className="hidden md:block text-black dark:text-white transition-all duration-300">
                    اضافه کردن
                  </h1>
                </div>
              </button>
            </div>
            <div className="px-2">
              <div
                className={`${
                  isPageLoaded
                    ? "transition-colors duration-300"
                    : "transition-none duration-0"
                } grid grid-cols-4 lg:grid-cols-5 text-center text-balance md:text-xl font-bold gap-2 pb-2 border-b-2 dark:text-white`}>
                <h1 className="hidden lg:block md:text-lg lg:text-2xl mt-auto">
                  عکس
                </h1>
                <h1 className="text-lg mt-auto lg:text-2xl">نام آیتم</h1>
                <h1 className="text-lg mt-auto lg:text-2xl">دسته بندی</h1>
                <h1 className="text-lg mt-auto lg:text-2xl">
                  <span>هزینه </span>
                  <span className="text-xs md:text-sm lg:text-base">
                    (هزار تومان)
                  </span>
                </h1>
                <h1 className="text-lg mt-auto lg:text-2xl">آپشن</h1>
              </div>
              {allFood.length === 0 ? (
                <div
                  className={`${
                    isPageLoaded
                      ? "transition-colors duration-300"
                      : "transition-none duration-0"
                  } text-center py-4 text-gray-500 dark:text-gray-400 font-bold`}>
                  هیچ آیتمی وجود ندارد.
                </div>
              ) : (
                allFood.map((item) => (
                  <div
                    className="border-b-1 my-0 md:my-1 md:border-b-0"
                    key={item.id}>
                    <ItemTable
                      id={item.id}
                      pic_url={item.pic_url}
                      name={item.name}
                      category={item.category_name}
                      price={item.price}
                      in_sale={item.in_sale}
                      sale_price={item.sale_price}
                      deleteFood={deleteFood}
                      editFood={editFood}
                      setClickedButtonId={setClickedButtonId}
                      clickedButtonId={clickedButtonId}
                      removingId={removingId}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
          {/* -------------------------------------------------------- WAITER CONTROL -------------------------------------------------------- */}
          <div
            className={`${
              isPageLoaded
                ? "transition-colors duration-300"
                : "transition-none duration-0"
            } col-span-1 xl:col-span-2 bg-white dark:bg-darkpalleteDark mx-2 xl:mx-0 xl:ml-2 rounded-3xl h-fit max-h-full overflow-y-auto overflow-x-hidden scrollbar scrollbar-none`}>
            <div className="flex justify-between items-center pl-4 py-3">
              <h1
                className={`${
                  isPageLoaded
                    ? "transition-colors duration-300"
                    : "transition-none duration-0"
                } text-2xl md:text-3xl font-extrabold pr-8 py-4 dark:text-white`}>
                لیست سالن‌دار ها
              </h1>
              <button
                onClick={() => {
                  setCurrentPage(6);
                }}>
                <div className="bg-white dark:bg-black flex items-center justify-center gap-1 border-3 border-black dark:border-white p-2 rounded-2xl font-bold transition-all duration-300">
                  <Icons.add
                    className={
                      "w-8 rotate-180 stroke-black dark:stroke-white transition-colors duration-300"
                    }
                  />
                  <h1 className="hidden md:block text-black dark:text-white transition-all duration-300">
                    استخدام سالن‌دار
                  </h1>
                </div>
              </button>
            </div>
            {allWaiter.length === 0 ? (
              <p className="text-xl text-center pb-4 text-slowgrayDark dark:text-slowgray">
                هیچ سالن‌داری وجود ندارد
              </p>
            ) : (
              allWaiter.map((item) => (
                <div
                  className="border-b-1 my-0 md:my-1 md:border-b-0"
                  key={item.id}>
                  <WaiterItem
                    id={item.id}
                    pic_url={item.pic_url}
                    full_name={item.full_name}
                    username={item.username}
                    UnEmployUser={UnEmployUser}
                    setClickedButtonId={setClickedButtonId}
                    clickedButtonId={clickedButtonId}
                    removingId={removingId}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemManager;
