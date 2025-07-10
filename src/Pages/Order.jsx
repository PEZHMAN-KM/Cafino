import { useRef, useEffect, useState } from "react";
import itemImage from "../../public/No_Item.png";
import axios from "axios";
import {
  BASE_PATH,
  LIMIT_DATA,
  GET_TABLE_NUMBER,
  SET_TABLE_NUMBER,
} from "../constants/paths.js";

import OrderReceiptOverlay from "../Componnets/OrderReceiptOverlay.jsx";
import { Icons } from "../Componnets/Icons.jsx";
import { useBlur } from "../constants/BlurContext.jsx";
import { useAnimation } from "../constants/AnimationContext.jsx";

// heroicon
// هیرو ایکون معروف واس ایکون ولی کامل نیست
// https://lucide.dev/icons/
// این هم معروف

const formatPrice = (num) => {
  if (num == null || isNaN(num)) return "";
  return Number(num).toLocaleString("en-US");
};

const OrderBox = ({
  orderItems,
  handleIncreaseCount,
  handleDecreaseCount,
  removingId,
  selectFood,
  isLoadingItems,
  hasInitialOrder,
}) => (
  <div
    className={`pt-2 mb-2 lg:mb-4 ${
      hasInitialOrder &&
      "border-b-4 border-primary dark:border-primaryDark transition-colors duration-300"
    }`}>
    <h1 className="font-extrabold text-3xl px-8 dark:text-white transition-colors duration-300 pb-5">
      آیتم های خرید
    </h1>
    <div
      className={`${
        !hasInitialOrder
          ? "grid-cols-1"
          : "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 pb-1"
      } grid transition-colors duration-300`}>
      {isLoadingItems && hasInitialOrder ? (
        <>
          {Array.from({ length: hasInitialOrder }).map((_, index) => (
            <SkeletonOrderItem key={index} />
          ))}
        </>
      ) : !hasInitialOrder ? (
        <h1 className="text-center text-xl md:text-3xl font-black text-slowgrayDark dark:text-slowgray pb-5 transition-colors duration-300 animate-opacity-up">
          سبد خرید خالی است
        </h1>
      ) : (
        orderItems.map((item) => (
          <div
            onClick={() => selectFood(item.id)}
            key={item.id}
            className={` ${
              item.in_sale ? "bg-slowprimary dark:bg-slowprimaryDark" : ""
            } hover:bg-slowgray border-b-1 border-t-1 lg:border-r-1 lg:border-l-1 lg:border-t-0 lg:border-b-0 border-highgrayDark dark:border-highgray hover:dark:bg-slowgrayDark transition-colors duration-300 rounded-2xl ${
              removingId === item.id ? "animate-scale-out" : ""
            }`}>
            <OrderItem
              id={item.id}
              in_sale={item.in_sale}
              name={item.name}
              category_name={item.category_name}
              count={item.count}
              handleIncreaseCount={handleIncreaseCount}
              handleDecreaseCount={handleDecreaseCount}
              pic_url={item.pic_url}
            />
          </div>
        ))
      )}
    </div>
  </div>
);
const OrderItem = ({
  id,
  name,
  category_name,
  count,
  handleIncreaseCount,
  handleDecreaseCount,
  pic_url,
}) => (
  <div className=" flex items-center pr-3 xs:px-1 py-1 gap-3 animate-scale-up">
    <div className="hidden xs:block aspect-square size-18 shrink-0">
      <img
        className="p-2 rounded-3xl w-full h-full object-cover pointer-events-none touch-none"
        src={
          pic_url ? `${BASE_PATH}/files/${pic_url.split("/").pop()}` : itemImage
        }
        alt=""
      />
    </div>
    <div className="flex flex-col justify-center flex-1 overflow-hidden">
      <h1 className="text-lg font-extrabold truncate dark:text-white transition-colors duration-300">
        {name}
      </h1>
      <h3 className="text-m font-normal truncate dark:text-slowgray transition-colors duration-300">
        {category_name}
      </h3>
    </div>
    <div className="shrink-0 pl-3">
      <CountController
        itemId={id}
        count={count}
        onIncrease={handleIncreaseCount}
        onDecrease={handleDecreaseCount}
      />
    </div>
  </div>
);
// Skeleton For ORFER ITEM ---------------------------------------
const SkeletonOrderItem = () => (
  <div className="animate-scale-up">
    <div className="animate-pulse flex items-center gap-3 px-3 py-2 bg-slowgray/20 dark:bg-slowgrayDark/20 rounded-3xl m-2">
      <div className="w-16 h-16 bg-neutral-300 dark:bg-neutral-700 rounded-3xl" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="w-1/3 h-4 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
        <div className="w-2/4 h-3 bg-neutral-200 dark:bg-neutral-600 rounded-full" />
      </div>
      {/* <div className="w-25 h-10 flex items-center gap-1">
      <div className="size-7 bg-primary dark:bg-primaryDark rounded-full hover:bg-primaryDark dark:hover:bg-primary transition-colors duration-300" />
      <div className="w-9 h-full rounded-2xl bg-neutral-200 dark:bg-neutral-600" />
      <div className="size-7 border-2 border-primary dark:border-primaryDark rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primaryDark transition-colors duration-300" />
    </div> */}
      <div className="w-25 h-7 bg-primary dark:bg-primaryDark rounded-full" />
    </div>
  </div>
);

const CountController = ({ itemId, count, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center gap-1 transition-all duration-300">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onIncrease(itemId);
        }}
        className="w-7 h-7 cursor-pointer flex items-center justify-center bg-primary dark:bg-primaryDark rounded-full hover:bg-primaryDark dark:hover:bg-primary transition-colors duration-300">
        <Icons.plus className={"w-7 stroke-white"} />
      </button>
      <span className="w-9 text-center text-4xl font-bold dark:text-white inline-block">
        {count}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDecrease(itemId);
        }}
        className="w-7 h-7 cursor-pointer border-2 border-primary dark:border-primaryDark rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primaryDark transition-colors duration-300">
        <Icons.mines
          className={
            "w-3 fill-black dark:fill-white hover:fill-white transition-colors duration-300"
          }
        />
      </button>
    </div>
  );
};

const UserNumber = ({
  tableNumber,
  setTableNumber,
  tableError,
  isPageLoaded,
  hasInitialOrder,
}) => (
  <div
    className={`${
      tableError
        ? "border-adminError dark:border-adminErrorDark"
        : " border-highgray dark:border-graypalleteDark"
    } ${
      isPageLoaded
        ? "transition-colors duration-300"
        : "transition-none duration-0"
    } bg-white dark:bg-darkpalleteDark w-screen p-3 mx-2 rounded-3xl border-2 flex justify-between items-center text-2xl font-bold ${
      !hasInitialOrder ? "animate-scale-out" : "animate-scale-up"
    }`}>
    <div className="flex flex-col lg:gap-2">
      <h1 className="text-lg md:text-2xl font-extrabold dark:text-white transition-colors duration-300">
        سفارش برای میز :
      </h1>
      <h3
        className={`text-xs md:text-lg font-bold ${
          tableError
            ? "text-adminError"
            : "text-slowgrayDark dark:text-slowgray"
        } transition-colors duration-300`}>
        {tableError ? tableError : "از درست بودن شماره میز اطمینان حاصل کنید"}
      </h3>
    </div>
    <div>
      <input
        className={`${
          tableError
            ? "border-adminError dark:border-adminErrorDark"
            : " border-highgray dark:border-graypalleteDark"
        } ${
          isPageLoaded
            ? "transition-colors duration-300"
            : "transition-none duration-0"
        } size-10 xs:size-13 text-3xl font-bold text-center border-2 bg-white dark:bg-darkpalleteDark text-highgray dark:text-slowgray rounded-2xl`}
        type="number"
        value={tableNumber || ""}
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
  </div>
);

const Checkout = ({ orderItems, isLoadingItems, hasInitialOrder }) => {
  return (
    <div>
      <h1 className="font-extrabold text-2xl sm:text-3xl px-8 py-3 dark:text-white transition-colors duration-300">
        فاکتور سفارشات شما
      </h1>
      {isLoadingItems && hasInitialOrder ? (
        <>
          {Array.from({ length: hasInitialOrder }).map((_, index) => (
            <SkeletonCheckOutItem key={index} />
          ))}
        </>
      ) : (
        orderItems.map((item) => (
          <div key={item.id}>
            <CheckOutItem
              name={item.name}
              count={item.count}
              price={item.price}
              sale_price={item.sale_price}
            />
          </div>
        ))
      )}
    </div>
  );
};
const CheckOutItem = ({ name, count, price, sale_price }) => (
  <div className="flex justify-between px-5 sm:px-10 animate-opacity-up">
    <div className="flex gap-3">
      <h1 className="text-xl sm:text-2xl font-bold dark:text-white transition-colors duration-300">
        {name}
      </h1>
      {count != "" ? (
        <h1 className="font-light text-xl dark:text-slowgray transition-colors duration-300">
          {count}x
        </h1>
      ) : null}
    </div>
    <div>
      {sale_price == null ? (
        <h1 className="font-bold dark:text-white transition-colors duration-300">
          {formatPrice(price)} تومان
        </h1>
      ) : (
        <div className="flex items-center justify-center gap-2 md:gap-4">
          <h1 className="text-sm decoration-1 line-through text-highgray dark:text-slowgray transition-colors duration-300">
            {formatPrice(price)} <span className="hidden md:inline">تومان</span>
          </h1>
          <h1 className="font-bold dark:text-white transition-colors duration-300">
            {formatPrice(sale_price)} تومان
          </h1>
        </div>
      )}
    </div>
  </div>
);
// Skeleton For CHECKOUT ITEM ---------------------------------------
const SkeletonCheckOutItem = () => (
  <div className="flex justify-between px-5 sm:px-10 py-3 animate-pulse">
    <div className="flex gap-3 flex-col w-1/2">
      <div className="w-32 h-5 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
    </div>
    <div className="w-20 h-6 bg-neutral-300 dark:bg-neutral-700 rounded-full" />
  </div>
);

function Order({
  setFooterShrink,
  footerShrink = false,
  setCurrentPage,
  setHeaderShrink,
  setHeaderMenuOpen,
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
  const [orderItems, setOrderItems] = useState([]);

  const [tableNumber, setTableNumber] = useState(GET_TABLE_NUMBER());
  useEffect(() => {
    SET_TABLE_NUMBER(tableNumber);
  }, [tableNumber]);

  const [timeAdded, setTimeAdded] = useState(null);

  const [showReceipt, setShowReceipt] = useState(false);

  const [tableError, setTableError] = useState(null);

  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [hasInitialOrder, setHasInitialOrder] = useState(false);

  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [visible, setVisible] = useState(false);

  const reduceBlur = useBlur();
  const shouldAnimate = useAnimation();

  const handleIncreaseCount = (id) => {
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
  const handleDecreaseCount = (id) => {
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
    setHasInitialOrder(foodIds.length);
    console.log(foodIds.length);
  };

  function selectFood(food_id) {
    if ("vibrate" in navigator && typeof window !== "undefined") {
      navigator.vibrate(20);
    }
    localStorage.setItem("show_food", food_id);
    setCurrentPage(6);
  }

  async function fetchItems() {
    const loaded_food_raw = localStorage.getItem("order");
    setIsLoadingItems(true);
    try {
      let orderArray = [];
      if (loaded_food_raw) {
        orderArray = JSON.parse(loaded_food_raw);
      }

      const foodIds = orderArray.map(([id, count]) => id);
      setHasInitialOrder(foodIds.length);

      if (foodIds.length === 0) {
        setOrderItems([]);
        setIsLoadingItems(false);
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
      console.log(err);
      setOrderItems([]);
      setHasInitialOrder(false);
    }
    setIsLoadingItems(false);
  }

  useEffect(() => {
    // For flashing on LOADING PAGE
    setIsPageLoaded(true);

    fetchItems();
  }, []);

  useEffect(() => {
    if (!hasInitialOrder) {
      if (visible) {
        setTimeout(
          () => {
            setVisible(false);
          },
          shouldAnimate ? 400 : 0
        );
      }
    } else {
      setVisible(true);
    }

    window.dispatchEvent(new Event("orderUpdated"));
  }, [hasInitialOrder]);

  async function addOrder() {
    const rawOrder = localStorage.getItem("order");

    if (rawOrder != "[]") {
      if (tableNumber < 1 || tableNumber > LIMIT_DATA) {
        setTableError("لطفا شماره میز را درست وارد کنید!");
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
      console.log(foods);

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
          setTimeAdded(response.data.order.time_added);
          setShowReceipt(true);
          localStorage.setItem("order", "[]");
          // fetchItems();
        }
      } catch (err) {
        console.log(err);
        if ("vibrate" in navigator && typeof window !== "undefined") {
          navigator.vibrate([50, 30, 50, 30, 70]);
        }
      }
    }
  }
  const refreshAllData = () => {
    fetchItems();
    setShowReceipt(false);
    window.dispatchEvent(new Event("orderUpdated"));
  };

  const totalCost = orderItems.reduce((sum, item) => {
    const price = item.sale_price ?? item.price;
    return sum + price * item.count;
  }, 0);

  return (
    <>
      <div
        style={{ WebkitOverflowScrolling: "touch" }}
        className={`${
          isPageLoaded
            ? "transition-colors duration-300"
            : "transition-none duration-0"
        } bg-backgroundcolor dark:bg-backgroundcolorDark w-screen min-h-screen overflow-x-hidden pt-18 ${
          hasInitialOrder && "pb-60 md:pb-50"
        }`}>
        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <OrderBox
              orderItems={orderItems}
              handleIncreaseCount={handleIncreaseCount}
              handleDecreaseCount={handleDecreaseCount}
              removingId={removingId}
              selectFood={selectFood}
              isLoadingItems={isLoadingItems}
              hasInitialOrder={hasInitialOrder}
            />
          </div>
          {visible && (
            <div className="w-screen lg:w-2/3 mx-auto">
              <div className="col-span-1 flex justify-center items-start">
                <UserNumber
                  tableNumber={tableNumber}
                  setTableNumber={setTableNumber}
                  tableError={tableError}
                  isPageLoaded={isPageLoaded}
                  hasInitialOrder={hasInitialOrder}
                />
              </div>
              <div
                className={`col-span-1 pt-2 lg:pt-4 ${
                  !hasInitialOrder && "animate-opacity-out"
                }`}>
                <Checkout
                  orderItems={orderItems}
                  isLoadingItems={isLoadingItems}
                  hasInitialOrder={hasInitialOrder}
                />
              </div>
            </div>
          )}
        </div>
        {/* ------------------------------------------- FOOTER PAY PANEL ------------------------------------------- */}
        {visible && (
          <div
            className={`w-screen fixed transition-all duration-30 ${
              footerShrink ? "bottom-12 md:bottom-5" : "bottom-20 md:bottom-5"
            }`}>
            <div
              className={`${
                isPageLoaded
                  ? "transition-colors duration-300"
                  : "transition-none duration-0"
              } ${
                !hasInitialOrder
                  ? " animate-opacity-out"
                  : " animate-opacity-up"
              } w-[98vw] mx-auto lg:w-2/3 p-4 rounded-3xl ${
                reduceBlur
                  ? "bg-backgroundcolor dark:bg-backgroundcolorDark"
                  : "bg-backgroundcolor/30 dark:bg-backgroundcolorDark/30 border-white/20 dark:border-white/10 border"
              } backdrop-blur-md shadow-lg`}>
              <div className="flex justify-center flex-col items-center w-full">
                <div className="flex justify-between w-full items-center pb-3">
                  <div className="flex items-center gap-2">
                    <Icons.wallet className={"w-10 stroke-primary"} />
                    <h1 className="text-lg md:text-2xl lg:text-3xl font-bold dark:text-white transition-colors duration-300">
                      مبلغ کل سفارشات
                    </h1>
                  </div>
                  <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-primary ransition-colors duration-300">
                    {formatPrice(totalCost)} تومان
                  </h1>
                </div>
                <button
                  onClick={() => addOrder()}
                  className="w-full p-5 rounded-2xl bg-primary text-white text-2xl dark:bg-primaryDark hover:bg-primaryDark dark:hover:bg-primary cursor-pointer transition-colors duration-300">
                  ثبت سفارش
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <OrderReceiptOverlay
        visible={showReceipt}
        items={orderItems}
        totalPrice={totalCost}
        tableNumber={tableNumber}
        timeAdded={timeAdded}
        refreshAllData={refreshAllData}
      />
    </>
  );
}

export default Order;
