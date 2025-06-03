import { useEffect, useState } from "react";
import itemImage from "../../public/No_Item.png";
import axios from "axios";
import { BASE_PATH } from "../constants/paths.js";
import { useNavigate } from "react-router-dom";

import Footer from "../Componnets/Footer.jsx";
import Header from "../Componnets/Header.jsx";
import OrderReceiptOverlay from "../Componnets/OrderReceiptOverlay.jsx";

const Wallet = ({ ...props }) => (
  <svg
    className="w-10"
    viewBox="0 0 19 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <path
      d="M17.533 10.497h-3.374a2.244 2.244 0 0 1 0-4.485h3.374m-2.993 2.19h-.259"
      stroke="#C67C4E"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      clipRule="evenodd"
      d="M5.957 1h7.202a4.373 4.373 0 0 1 4.373 4.373v5.98a4.373 4.373 0 0 1-4.373 4.374H5.957a4.373 4.373 0 0 1-4.373-4.373v-5.98A4.373 4.373 0 0 1 5.957 1"
      stroke="#C67C4E"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.363 4.782h4.5"
      stroke="#C67C4E"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const Plus = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M5 12h14m-7-7v14"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Minus = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="none">
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      fillRule="evenodd"
      d="M18 10a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h14a1 1 0 0 1 1 1"
    />
  </svg>
);

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
  <div className="pt-2 mb-4 border-b-4 border-slowprimary dark:border-primaryDark transition-colors duration-300">
    <h2 className="font-extrabold text-3xl px-8 dark:text-white transition-colors duration-300 pb-5">
      آیتم های خرید
    </h2>
    <div className=" divide-highgray dark:divide-graypalleteDark grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:border-b-1 lg:border-highgray dark:border-graypalleteDark transition-colors duration-300">
      {orderItems.length === 0 ? (
        <h1 className="text-center text-3xl font-black text-slowgrayDark dark:text-slowgray py-10 transition-colors duration-300">
          {orderError}
        </h1>
      ) : (
        orderItems.map((item) => (
          <div
            onClick={() => selectFood(item.id)}
            href="/item"
            key={item.id}
            className={` cursor-pointer hover:bg-slowprimary border-b-1 border-t-1 lg:border-r-1 lg:border-l-1 lg:border-t-0 lg:border-b-0 hover:dark:bg-slowgrayDark transition-colors duration-300 rounded-2xl ${
              removingId === item.id ? "animate-scale-out" : ""
            }`}>
            <OrderItem
              id={item.id}
              name={item.name}
              category_name={item.category_name}
              count={item.count}
              handleIncreaseCount={handleIncreaseCount}
              handleDecreaseCount={handleDecreaseCount}
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
}) => (
  <div className="flex items-center px-5 py-2 gap-3">
    <div className="aspect-square size-[100px] shrink-0">
      <img
        className="p-2 rounded-3xl dark:opacity-90 transition-opacity duration-300"
        src={itemImage}
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
        className="w-7 h-7 flex items-center justify-center bg-primary dark:bg-primaryDark rounded-full hover:bg-primaryDark dark:hover:bg-primary transition-colors duration-300">
        <Plus className={"w-7 stroke-white"} />
      </button>
      <span className="w-9 text-center text-4xl font-bold dark:text-white inline-block">
        {count}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDecrease(itemId);
        }}
        className="w-7 h-7 border-2 border-primary dark:border-primaryDark rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primaryDark transition-colors duration-300">
        <Minus
          className={
            "w-3 fill-black dark:fill-white hover:fill-white transition-colors duration-300"
          }
        />
      </button>
    </div>
  );
};

const UserNumber = ({ tableNumber, setTableNumber, tableError }) => (
  <div className="bg-white dark:bg-darkpalleteDark w-screen p-5 mx-5 rounded-2xl border-1 border-highgray dark:border-graypalleteDark flex justify-between items-center text-2xl font-bold transition-colors duration-300">
    <div className="flex flex-col gap-2">
      <h1 className="text-lg md:text-2xl lg:text-3xl font-extrabold dark:text-white transition-colors duration-300">
        سفارش برای میز :
      </h1>
      <h3 className="text-xs md:text-lg font-semibold text-slowgrayDark dark:text-slowgray transition-colors duration-300">
        از درست بودن شماره میز اطمینان حاصل کنید
        <br />
        {tableError && (
          <span className="text-xs md:text-sm text-Start text-primary">
            {tableError}
          </span>
        )}
      </h3>
    </div>
    <div>
      <input
        className="w-13 h-13 text-3xl font-bold text-center border-2 border-slowgray dark:border-graypalleteDark bg-white dark:bg-darkpalleteDark text-highgray dark:text-slowgray rounded-2xl transition-colors duration-300"
        type="number"
        value={tableNumber}
        onChange={(e) => setTableNumber(Number(e.target.value))}
      />
    </div>
  </div>
);

const Checkout = ({ orderItems }) => {
  if (orderItems.length === 0) return null;

  return (
    <div>
      <h1 className="font-extrabold text-3xl px-8 py-3 dark:text-white transition-colors duration-300">
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
  <div className="flex justify-between px-10">
    <div className="flex gap-3">
      <h1 className="text-2xl font-bold dark:text-white transition-colors duration-300">
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
        <div className="flex gap-2 md:gap-4">
          <h1 className="decoration-1 line-through text-highgray dark:text-slowgray transition-colors duration-300">
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

function Order() {
  const [orderItems, setOrderItems] = useState([]);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState(0);

  const [showReceipt, setShowReceipt] = useState(false);
  const navigate = useNavigate();

  const [tableError, setTableError] = useState(null);
  const [orderError, SetOrderError] = useState("سبد خرید خالی است");

  const [removingId, setRemovingId] = useState(null);

  const handleIncreaseCount = (id) => {
    const updatedItems = orderItems.map((item) => {
      if (item.id === id) {
        return { ...item, count: item.count + 1 };
      }
      return item;
    });
    setOrderItems(updatedItems);
    updateLocalStorage(updatedItems);
  };

  const handleDecreaseCount = (id) => {
    const item = orderItems.find((item) => item.id === id);
    if (!item) return;

    if (item.count === 1) {
      setRemovingId(id);
      setTimeout(() => {
        setOrderItems((prev) => prev.filter((item) => item.id !== id));
        updateLocalStorage(orderItems.filter((item) => item.id !== id));
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
    localStorage.setItem("show_food", food_id);
    navigate("/item");
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
    fetchItems();
  }, []);

  async function addOrder() {
    const rawOrder = localStorage.getItem("order");

    if (rawOrder) {
      if (tableNumber <= 0) {
        setTableError("لطفا شماره میز را درست وارد کنید!");
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
        localStorage.setItem("order", []);
      } catch (err) {
        console.log(err);
      }
    }
  }
  const refreshAllData = () => {
    fetchItems();
    setTableNumber(0);
    setShowReceipt(false);
  };

  const totalCost = orderItems.reduce((sum, item) => {
    const price = item.sale_price ?? item.price;
    return sum + price * item.count;
  }, 0);

  return (
    <>
      <div className="bg-backgroundcolor dark:bg-backgroundcolorDark w-screen h-screen overflow-y-auto scrollbar scrollbar-none overflow-x-hidden pb-60 md:pb-0 transition-colors duration-300">
        <Header
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
          <div className="col-span-1 flex justify-center items-start">
            <UserNumber
              tableNumber={tableNumber}
              setTableNumber={setTableNumber}
              tableError={tableError}
            />
          </div>
          <div className="col-span-1 pt-4">
            <Checkout orderItems={orderItems} />
          </div>
        </div>
        <div className="w-full justify-center bottom-0 mt-10 hidden md:flex px-5">
          <div className="w-2/3 bg-white p-4 rounded-2xl dark:bg-darkpalleteDark transition-colors duration-300">
            <div className="flex justify-center bg- flex-col items-center w-full pb-5">
              <div className="flex justify-between w-full items-center pb-3">
                <div className="flex items-center gap-2">
                  <Wallet />
                  <h1 className="text-2xl font-bold dark:text-white transition-colors duration-300">
                    مبلغ کل سفارشات
                  </h1>
                </div>
                <h1 className="text-2xl font-bold text-primary ransition-colors duration-300">
                  {formatPrice(totalCost)} تومان
                </h1>
              </div>
              <button
                onClick={() => addOrder()}
                className="w-full p-5 rounded-2xl bg-primary text-white text-2xl dark:bg-primaryDark hover:bg-primaryDark dark:hover:bg-primary transition-colors duration-300">
                پرداخت
              </button>
            </div>
          </div>
        </div>
        <Footer page={3} CostMoney={totalCost} addOrder={addOrder} />
      </div>
      <OrderReceiptOverlay
        visible={showReceipt}
        items={orderItems}
        totalPrice={totalCost}
        refreshAllData={refreshAllData}
      />
    </>
  );
}

export default Order;
