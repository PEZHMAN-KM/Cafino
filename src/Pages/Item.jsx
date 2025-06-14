import itemImage from "../../public/No_Item.png";
import { useEffect, useState } from "react";
import axios, { Axios } from "axios";
import { BASE_PATH } from "../constants/paths";
import { useNavigate } from "react-router-dom";
import { Icons } from "../Componnets/Icons";

const formatPrice = (num) => {
  if (num == null || isNaN(num)) return "";
  return Number(num).toLocaleString("en-US");
};

// This component is used to display the size options for the item. (Not used in the current version)
// const Size = () => (
//   <div className="p-2">
//     <h1 className="text-2xl font-bold p-1 dark:text-white transition-colors duration-300">
//       اندازه
//     </h1>
//     <div className="flex justify-between items-center px-2 pt-3">
//       <button className="border-2 border-primary dark:border-primaryDark bg-slowprimary dark:bg-subprimaryDark w-30 px-8 py-3 rounded-2xl transition-colors duration-300">
//         کوچک
//       </button>
//       <button className="border-2 border-slowgray dark:border-graypalleteDark bg-white dark:bg-darkpalleteDark w-30 px-8 py-3 rounded-2xl transition-colors duration-300">
//         متوسط
//       </button>
//       <button className="border-2 border-slowgray dark:border-graypalleteDark bg-white dark:bg-darkpalleteDark w-30 px-8 py-3 rounded-2xl transition-colors duration-300">
//         بزرگ
//       </button>
//     </div>
//   </div>
// );

const NamePanel = ({ className, name, category, price, sale_price }) => (
  <div className={className}>
    <div className="p-2 flex justify-between items-center bg-slowprimary dark:bg-subprimaryDark rounded-2xl border-1 border-primary dark:border-primaryDark transition-colors duration-300">
      <div>
        <h1 className="text-2xl font-extrabold p-1 dark:text-white transition-colors duration-300">
          {name}
        </h1>
        <h3 className="text-xl font-bold p-1 pt-0 dark:text-slowgray transition-colors duration-300">
          {category}
        </h3>
      </div>
      {sale_price && (
        <div className="flex flex-col items-start px-2 py-2 w-30 rounded-xl bg-backgroundcolor dark:bg-backgroundcolorDark justify-center gap-1">
          <h1 className="dark:text-white font-semibold w-full">قیمت اصلی :</h1>
          <h1 className="text-lg font-medium w-full text-end dark:text-white line-through transition-colors duration-300">
            {formatPrice(price)} تومان
          </h1>
        </div>
      )}
    </div>
  </div>
);

const Description = ({ className, description }) => (
  <div className={className}>
    <div className="p-2">
      <h1 className="text-2xl font-bold p-1 dark:text-white transition-colors duration-300">
        توضیحات
      </h1>
      <p className="px-3 pt-1 dark:text-slowgray transition-colors duration-300">
        {description}
      </p>
    </div>
  </div>
);

function Item() {
  const [isLiked, setIsLiked] = useState(false);
  const id = Number(localStorage.getItem("show_food"));
  const navigate = useNavigate();

  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const [item, setItem] = useState(null);
  const [orderCount, setOrderCount] = useState(0);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    const likedItems = JSON.parse(localStorage.getItem("liked_items") || "[]");
    setIsLiked(likedItems.includes(id));
  }, [id]);

  const handleLikeClick = () => {
    let likedItems = JSON.parse(localStorage.getItem("liked_items") || "[]");

    if (likedItems.includes(id)) {
      likedItems = likedItems.filter((itemId) => itemId !== id);
      setIsLiked(false);
    } else {
      likedItems.push(id);
      setIsLiked(true);
    }

    localStorage.setItem("liked_items", JSON.stringify(likedItems));
  };

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await axios.post(
          `${BASE_PATH}/food/get_food_list_by_id`,
          [id],
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setItem(response.data[0]);
      } catch (error) {
        console.error("Error loading item:", error);
      }
    }

    if (id) fetchItem();
  }, [id]);

  useEffect(() => {
    // For flashing on LOADING PAGE
    setIsPageLoaded(true);

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  });

  useEffect(() => {
    const storedOrder = localStorage.getItem("order");
    const orderArray = storedOrder ? JSON.parse(storedOrder) : [];
    const existingItem = orderArray.find(([itemId]) => itemId === id);
    if (existingItem) {
      setOrderCount(existingItem[1]);
    }
  }, [id]);

  const updateLocalStorage = (newCount) => {
    let orderArray = localStorage.getItem("order");
    orderArray = orderArray ? JSON.parse(orderArray) : [];
    const index = orderArray.findIndex(([itemId]) => itemId === id);

    if (index !== -1) {
      if (newCount > 0) {
        orderArray[index][1] = newCount;
      } else {
        orderArray.splice(index, 1);
      }
    } else if (newCount > 0) {
      orderArray.push([id, newCount]);
    }

    localStorage.setItem("order", JSON.stringify(orderArray));
  };

  const handleAddToOrder = () => {
    setOrderCount(1);
    updateLocalStorage(1);
  };

  const increaseCount = () => {
    const newCount = orderCount + 1;
    setOrderCount(newCount);
    updateLocalStorage(newCount);
  };

  const decreaseCount = () => {
    if (orderCount === 1) {
      setRemoving(true);
      setTimeout(() => {
        setOrderCount(0);
        updateLocalStorage(0);
        setRemoving(false);
      }, 300);
    } else {
      const newCount = orderCount - 1;
      setOrderCount(newCount);
      updateLocalStorage(newCount);
    }
  };

  function exit() {
    localStorage.removeItem("show_food");
    navigate(-1);
  }

  if (!item)
    return (
      <div className="flex flex-col gap-2 justify-center items-center w-screen h-screen">
        <h1 className="text-2xl font-bold dark:text-white">آیتم یافت نشد!</h1>
        <button onClick={() => exit()}>
          <div className="bg-white dark:bg-darkpalleteDark p-5 rounded-2xl w-full flex items-center text-highgray dark:text-highgrayDark gap-3 hover:bg-slowprimary dark:hover:bg-subprimaryDark hover:text-black dark:hover:text-white transition-all duration-200">
            <Icons.arrow className="w-8 rotate-180 stroke-3 dark:hover:text-white" />
            <h1 className="text-2xl font-bold dark:text-white">برگشت</h1>
          </div>
        </button>
      </div>
    );

  return (
    <>
      <div className="lg:flex">
        <div
          className={`${
            isPageLoaded
              ? "transition-colors duration-300"
              : "transition-none duration-0"
          } overflow-auto scrollbar scrollbar-none lg:flex-1/2 xl:flex-1/3 lg:flex lg:justify-center lg:items-center bg-backgroundcolor dark:bg-backgroundcolorDark pb-25 lg:pb-0 h-screen overflow-x-hidden`}>
          <div className="relative lg:absolute">
            <img
              className="w-screen aspect-square object-cover p-2 rounded-3xl"
              src={
                item.pic_url
                  ? `${BASE_PATH}/files/${item.pic_url.split("/").pop()}`
                  : itemImage
              }
              alt=""
            />
            <div className="flex lg:justify-between md:p-2 lg:items-center lg:gap-2">
              <div className="absolute lg:static lg:top-auto lg:left-auto lg:w-1/2 lg:pt-0 top-5 right-5">
                <button
                  onClick={handleLikeClick}
                  className={`bg-white dark:bg-darkpalleteDark p-5 rounded-2xl lg:w-full flex items-center gap-3 text-highgray dark:text-highgrayDark transition-all duration-300 group hover:bg-slowprimary dark:hover:bg-subprimaryDark hover:text-black dark:hover:text-white
                  ${
                    isLiked
                      ? "bg-slowprimary dark:bg-darkpalleteDark text-red-500"
                      : ""
                  }`}>
                  <Icons.like
                    className={`w-8 transition-all duration-300 
                    ${
                      isLiked
                        ? "stroke-red-500 fill-red-500"
                        : "stroke-highgray dark:stroke-highgrayDark fill-highgray dark:fill-highgrayDark group-hover:fill-black dark:group-hover:fill-white group-hover:stroke-black dark:group-hover:stroke-white"
                    }`}
                  />
                  <h1
                    className={`hidden transition-colors duration-300  lg:block text-2xl font-bold ${
                      isLiked
                        ? "dark:text-red-300 text-red-700"
                        : "dark:text-white "
                    }`}>
                    علاقه مندی
                  </h1>
                </button>
              </div>
              <div className="absolute lg:static lg:top-auto lg:right-auto lg:w-1/2 lg:pt-0 top-5 left-5">
                <button
                  onClick={() => exit()}
                  className="bg-white dark:bg-darkpalleteDark p-5 rounded-2xl lg:w-full flex items-center gap-3 text-highgray dark:text-highgrayDark transition-all duration-300 hover:bg-slowprimary dark:hover:bg-subprimaryDark hover:text-black dark:hover:text-white">
                  <Icons.arrow className="w-8 rotate-180 stroke-3 dark:hover:text-white" />
                  <h1 className="hidden transition-colors duration-300 lg:block text-2xl font-bold dark:text-white">
                    برگشت
                  </h1>
                </button>
              </div>
            </div>
          </div>
          <div>
            <div className="w-screen lg:w-auto p-2 pt-0">
              <NamePanel
                name={item.name}
                category={item.category_name}
                price={item.price}
                sale_price={item.sale_price}
                className={"block lg:hidden"}
              />
              <Description
                description={item.description}
                className={"block lg:hidden"}
              />
              {/* <Size /> */}
            </div>
          </div>
        </div>
        <div
          className={`${
            isPageLoaded
              ? "transition-colors duration-300"
              : "transition-none duration-0"
          } lg:flex-1/2 xl:flex-2/3 flex md:flex-col-reverse md:justify-center fixed bottom-0 w-screen p-5 lg:p-2 bg-white rounded-t-2xl lg:rounded-none lg:bg-backgroundcolor dark:bg-darkpalleteDark lg:dark:bg-backgroundcolorDark lg:static lg:bottom-auto lg:w-auto`}>
          <div className="flex justify-between w-full items-center lg:flex-col-reverse lg:justify-center lg:gap-4 bg-white dark:bg-darkpalleteDark lg:bg-white dark:lg:bg-darkpalleteDark lg:px-3 lg:py-6 lg:rounded-3xl transition-colors duration-300">
            <div>
              {orderCount === 0 ? (
                <button
                  onClick={handleAddToOrder}
                  className="bg-primary dark:bg-primaryDark hover:bg-primaryDark dark:hover:bg-primary text-white text-lg lg:text-2xl font-bold p-2 lg:px-5 lg:py-3 rounded-2xl transition-colors duration-300 animate-scale-up">
                  افزودن به سبد خرید
                </button>
              ) : (
                <div
                  className={`flex items-center gap-3 ${
                    removing ? "animate-scale-out" : "animate-scale-up"
                  }`}>
                  <button
                    onClick={increaseCount}
                    className="w-14 h-14 flex items-center justify-center bg-primary dark:bg-primaryDark rounded-full hover:bg-primaryDark dark:hover:bg-primary text-white transition-colors duration-300">
                    <Icons.plus className={"w-9 stroke-white"} />
                  </button>

                  <span className="w-12 text-center text-4xl font-bold dark:text-white inline-block">
                    {orderCount}
                  </span>

                  <button
                    onClick={decreaseCount}
                    className="border-2 flex items-center justify-center border-primary dark:border-primaryDark hover:bg-primaryDark dark:hover:bg-primary hover:border-primaryDark dark:hover:border-primary text-white w-12 h-12 rounded-full transition-colors duration-300">
                    <Icons.mines
                      className={
                        "w-8 fill-black dark:fill-white hover:fill-white transition-colors duration-300"
                      }
                    />
                  </button>
                </div>
              )}
            </div>
            <div className="w-fit lg:w-auto lg:flex lg:gap-2">
              <h1 className="text-xl font-bold lg:text-5xl dark:text-white transition-colors duration-300">
                قیمت
                <span className="hidden lg:inline">:</span>
              </h1>
              <div className="flex justify-center items-end gap-1">
                <h1 className="text-3xl lg:text-5xl font-bold dark:text-white transition-colors duration-300">
                  {item.sale_price
                    ? formatPrice(item.sale_price)
                    : formatPrice(item.price)}
                </h1>
                <h3 className="dark:text-slowgray text-sm lg:text-3xl transition-colors duration-300">
                  تومان
                </h3>
              </div>
            </div>
            <Description
              description={item.description}
              className={"hidden lg:block w-full"}
            />
            <NamePanel
              name={item.name}
              category={item.category_name}
              price={item.price}
              sale_price={item.sale_price}
              className={"hidden lg:block w-full"}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Item;
