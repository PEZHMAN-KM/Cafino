import { useRef, useEffect, useState } from "react";
import itemImage from "../../public/No_Item.png";
import axios from "axios";
import { BASE_PATH, LIMIT_DATA } from "../constants/paths.js";
import { useNavigate } from "react-router-dom";

import Header from "../Componnets/Header.jsx";
import OrderReceiptOverlay from "../Componnets/OrderReceiptOverlay.jsx";
import { Icons } from "../Componnets/Icons.jsx";

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
  orderError,
}) => (
  <div className="pt-2 mb-4 border-b-4 border-primary dark:border-primaryDark transition-colors duration-300">
    <h1 className="font-extrabold text-3xl px-8 dark:text-white transition-colors duration-300 pb-5">
      آیتم های خرید
    </h1>
    <div
      className={`${
        orderItems.length === 0
          ? "grid-cols-1"
          : "grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
      } divide-highgray dark:divide-graypalleteDark grid lg:border-b-1 lg:border-highgray dark:border-graypalleteDark transition-colors duration-300`}>
      {orderItems.length === 0 ? (
        <h1 className="text-center text-xl md:text-3xl font-black text-slowgrayDark dark:text-slowgray py-5 transition-colors duration-300 animate-opacity-up">
          {orderError}
        </h1>
      ) : (
        orderItems.map((item) => (
          <div
            onClick={() => selectFood(item.id)}
            key={item.id}
            className={` ${
              item.in_sale ? "bg-slowprimary dark:bg-slowprimaryDark" : ""
            } hover:bg-slowgray border-b-1 border-t-1 lg:border-r-1 lg:border-l-1 lg:border-t-0 lg:border-b-0 hover:dark:bg-slowgrayDark transition-colors duration-300 rounded-2xl ${
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
  <div className=" flex items-center px-1 py-1 md:px-5 md:py-2 gap-3  animate-scale-up">
    <div className="aspect-square size-18 md:size-25 shrink-0">
      <img
        className="p-2 rounded-3xl w-full h-full object-cover"
        src={
          pic_url ? `${BASE_PATH}/files/${pic_url.split("/").pop()}` : itemImage
        }
        alt=""
      />
    </div>
    <div className="flex flex-col justify-center flex-1 overflow-hidden">
      <h1 className="text-2xl font-extrabold truncate dark:text-white transition-colors duration-300">
        {name}
      </h1>
      <h3 className="text-lg font-normal truncate dark:text-slowgray transition-colors duration-300">
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
const CountController = ({ itemId, count, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center gap-2 transition-all duration-300">
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
    } bg-white dark:bg-darkpalleteDark w-screen p-5 mx-5 rounded-2xl border-1 flex justify-between items-center text-2xl font-bold animate-scale-up`}>
    <div className="flex flex-col gap-2">
      <h1 className="text-lg md:text-2xl lg:text-3xl font-extrabold dark:text-white transition-colors duration-300">
        سفارش برای میز :
      </h1>
      <h3 className="text-xs md:text-lg font-semibold text-slowgrayDark dark:text-slowgray transition-colors duration-300">
        از درست بودن شماره میز اطمینان حاصل کنید
      </h3>
      {tableError && (
        <h3 className="text-xs md:text-sm text-Start text-primary">
          {tableError}
        </h3>
      )}
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
        } w-13 h-13 text-3xl font-bold text-center border-2 bg-white dark:bg-darkpalleteDark text-highgray dark:text-slowgray rounded-2xl`}
        type="number"
        value={tableNumber || ""}
        onChange={(e) => setTableNumber(Number(e.target.value))}
      />
    </div>
  </div>
);

const Checkout = ({ orderItems }) => {
  if (orderItems.length === 0) return null;

  return (
    <div>
      <h1 className="font-extrabold text-2xl sm:text-3xl px-8 py-3 dark:text-white transition-colors duration-300">
        فاکتور سفارشات شما
      </h1>
      {orderItems.map((item) => (
        <div key={item.id}>
          <CheckOutItem
            name={item.name}
            count={item.count}
            price={item.price}
            sale_price={item.sale_price}
          />
        </div>
      ))}
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

function Order({ setFooterShrink, footerShrink = false, setCurrentPage }) {
  // SCROLL FOOTER -------------------------------------------------
  const scrollContainerRef = useRef(null);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollTop = scrollContainer.scrollTop;

          const scrollingDown = currentScrollTop > lastScrollTop.current + 2;
          const scrollingUp = currentScrollTop < lastScrollTop.current - 2;

          if (scrollingDown) {
            setFooterShrink(true);
          } else if (scrollingUp) {
            setFooterShrink(false);
          }

          lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop;
          ticking = false;
        });
        ticking = true;
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // ----------------------------------------------------------------

  const [orderItems, setOrderItems] = useState([]);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState(undefined);
  const [timeAdded, setTimeAdded] = useState(null);

  const [showReceipt, setShowReceipt] = useState(false);
  const navigate = useNavigate();

  const [tableError, setTableError] = useState(null);
  const [orderError, SetOrderError] = useState("سبد خرید خالی است");

  const [removingId, setRemovingId] = useState(null);

  const [isPageLoaded, setIsPageLoaded] = useState(false);

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
      setTimeout(() => {
        setOrderItems((prev) => {
          const updated = prev.filter((item) => item.id !== id);
          updateLocalStorage(updated);
          return updated;
        });
        setRemovingId(null);
      }, 400);
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
  };

  function selectFood(food_id) {
    if ("vibrate" in navigator && typeof window !== "undefined") {
      navigator.vibrate(20);
    }
    localStorage.setItem("show_food", food_id);
    setCurrentPage(5);
  }

  async function fetchItems() {
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
      console.log(err);
      setOrderItems([]);
    }
  }

  useEffect(() => {
    // For flashing on LOADING PAGE
    setIsPageLoaded(true);

    fetchItems();
  }, []);

  useEffect(() => {
    window.dispatchEvent(new Event("orderUpdated"));
  }, [orderItems]);

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

      setShowReceipt(true);

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
        setTimeAdded(response.data.order.time_added);
        localStorage.setItem("order", "[]");
        if ("vibrate" in navigator && typeof window !== "undefined") {
          navigator.vibrate(20);
        }
      } catch (err) {
        console.log(err);
        if ("vibrate" in navigator && typeof window !== "undefined") {
          navigator.vibrate(10);
        }
      }
    }
  }
  const refreshAllData = () => {
    fetchItems();
    setTableNumber(0);
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
        ref={scrollContainerRef}
        className={`${
          isPageLoaded
            ? "transition-colors duration-300"
            : "transition-none duration-0"
        } bg-backgroundcolor dark:bg-backgroundcolorDark w-screen h-screen overflow-y-auto scrollbar scrollbar-none overflow-x-hidden pb-60 md:pb-50 lg:pt-20`}>
        <Header
          setCurrentPage={setCurrentPage}
          page={3}
          text={"سبد خرید"}
          showMenu={headerMenuOpen}
          setShowMenu={setHeaderMenuOpen}
        />
        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <OrderBox
              orderItems={orderItems}
              handleIncreaseCount={handleIncreaseCount}
              handleDecreaseCount={handleDecreaseCount}
              removingId={removingId}
              selectFood={selectFood}
              orderError={orderError}
            />
          </div>
          <div className="w-screen lg:w-2/3 mx-auto">
            <div className="col-span-1 flex justify-center items-start">
              <UserNumber
                tableNumber={tableNumber}
                setTableNumber={setTableNumber}
                tableError={tableError}
                isPageLoaded={isPageLoaded}
              />
            </div>
            <div className="col-span-1 pt-4">
              <Checkout orderItems={orderItems} />
            </div>
          </div>
        </div>
        <div
          className={`w-screen fixed transition-all duration-30 ${
            footerShrink ? "bottom-10 md:bottom-5" : "bottom-20 md:bottom-5"
          }`}>
          <div
            className={`${
              isPageLoaded
                ? "transition-colors duration-300"
                : "transition-none duration-0"
            } w-[98vw] mx-auto animate-move-up p-4 rounded-3xl bg-backgroundcolor/30 dark:bg-backgroundcolorDark/30 backdrop-blur-md shadow-lg border-white/20 dark:border-white/10 border`}>
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
