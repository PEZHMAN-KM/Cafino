import { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import itemImage from "../../public/No_Item.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_PATH } from "../constants/paths";

// const TableIcon = ({ stroke }) => (
//   <svg
//     width={25}
//     height={24}
//     viewBox="0 0 14 13"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg">
//     <path
//       d="M14 3.31377C14 1.53604 10.3929 0.575756 7.00152 0.575756C3.61016 0.575756 0 1.53604 0 3.31377C0 5.03681 3.38225 5.991 6.6794 6.04875V9.63156C6.67333 9.65284 6.66421 9.67107 6.65509 9.69232C6.52441 9.70144 6.412 9.79261 6.3816 9.92329C6.34818 10.0418 6.3026 10.1542 6.24485 10.2636C6.21445 10.2788 6.18103 10.2879 6.14762 10.294C5.79512 10.3396 5.29066 9.78959 5.10226 9.51609C5.00804 9.37629 4.8166 9.34287 4.67985 9.43709C4.5431 9.5313 4.50663 9.72275 4.60085 9.8595C4.66771 9.95673 5.18126 10.6861 5.82552 10.8623C5.45478 11.2634 4.85611 11.6706 3.8928 11.8196C3.72566 11.8439 3.61324 11.9988 3.63754 12.166C3.65882 12.3149 3.78947 12.4243 3.93839 12.4243C3.95357 12.4243 3.96878 12.4243 3.98397 12.4213C5.60367 12.1751 6.36946 11.2908 6.71287 10.6769C6.8162 10.5888 6.90737 10.4885 6.9803 10.373C7.05323 10.4855 7.1444 10.5888 7.24773 10.6769C7.59416 11.2908 8.35995 12.1751 9.97965 12.4213C9.99484 12.4243 10.01 12.4243 10.0252 12.4243C10.1924 12.4243 10.3291 12.2876 10.3291 12.1204C10.3291 11.9685 10.2197 11.8408 10.0708 11.8196C9.10446 11.6706 8.50277 11.2634 8.13506 10.8623C8.77928 10.683 9.29591 9.95371 9.36274 9.85645C9.45696 9.71665 9.42049 9.52825 9.28374 9.43404C9.14395 9.33983 8.95555 9.37629 8.86133 9.51304C8.67595 9.78654 8.17152 10.3396 7.81598 10.291C7.78256 10.2879 7.74609 10.2758 7.71569 10.2606C7.66099 10.1512 7.61541 10.0388 7.58199 9.92024C7.5516 9.79261 7.43918 9.69839 7.3085 9.69232C7.29938 9.67104 7.29331 9.65281 7.28419 9.63156L7.28724 6.05179C10.5935 6.00011 14 5.04287 14 3.31377ZM7.07446 5.44705C7.02583 5.42577 6.96811 5.42577 6.91948 5.44705C3.21208 5.42577 0.632092 4.3166 0.632092 3.31984C0.632092 2.31397 3.2516 1.19263 7.01369 1.19263C10.7758 1.19263 13.3953 2.31397 13.3953 3.31984C13.3953 4.31962 10.8031 5.43489 7.07446 5.44705Z"
//       fill={stroke}
//       stroke={stroke}
//       strokeWidth={0.5}
//     />
//   </svg>
// );
// const Wallet = ({ stroke }) => (
//   <svg
//     width={25}
//     viewBox="0 0 19 17"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg">
//     <path
//       d="M17.533 10.497h-3.374a2.244 2.244 0 0 1 0-4.485h3.374m-2.993 2.19h-.259"
//       stroke={stroke}
//       strokeWidth={1.5}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       clipRule="evenodd"
//       d="M5.957 1h7.202a4.373 4.373 0 0 1 4.373 4.373v5.98a4.373 4.373 0 0 1-4.373 4.374H5.957a4.373 4.373 0 0 1-4.373-4.373v-5.98A4.373 4.373 0 0 1 5.957 1"
//       stroke={stroke}
//       strokeWidth={1.5}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//     <path
//       d="M5.363 4.782h4.5"
//       stroke={stroke}
//       strokeWidth={1.5}
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

const Wallet = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 19 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.533 10.497h-3.374a2.244 2.244 0 0 1 0-4.485h3.374m-2.993 2.19h-.259"
      stroke="current color"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      clipRule="evenodd"
      d="M5.957 1h7.202a4.373 4.373 0 0 1 4.373 4.373v5.98a4.373 4.373 0 0 1-4.373 4.374H5.957a4.373 4.373 0 0 1-4.373-4.373v-5.98A4.373 4.373 0 0 1 5.957 1"
      stroke="current color"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.363 4.782h4.5"
      stroke="current color"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const TableIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 14 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 3.31377C14 1.53604 10.3929 0.575756 7.00152 0.575756C3.61016 0.575756 0 1.53604 0 3.31377C0 5.03681 3.38225 5.991 6.6794 6.04875V9.63156C6.67333 9.65284 6.66421 9.67107 6.65509 9.69232C6.52441 9.70144 6.412 9.79261 6.3816 9.92329C6.34818 10.0418 6.3026 10.1542 6.24485 10.2636C6.21445 10.2788 6.18103 10.2879 6.14762 10.294C5.79512 10.3396 5.29066 9.78959 5.10226 9.51609C5.00804 9.37629 4.8166 9.34287 4.67985 9.43709C4.5431 9.5313 4.50663 9.72275 4.60085 9.8595C4.66771 9.95673 5.18126 10.6861 5.82552 10.8623C5.45478 11.2634 4.85611 11.6706 3.8928 11.8196C3.72566 11.8439 3.61324 11.9988 3.63754 12.166C3.65882 12.3149 3.78947 12.4243 3.93839 12.4243C3.95357 12.4243 3.96878 12.4243 3.98397 12.4213C5.60367 12.1751 6.36946 11.2908 6.71287 10.6769C6.8162 10.5888 6.90737 10.4885 6.9803 10.373C7.05323 10.4855 7.1444 10.5888 7.24773 10.6769C7.59416 11.2908 8.35995 12.1751 9.97965 12.4213C9.99484 12.4243 10.01 12.4243 10.0252 12.4243C10.1924 12.4243 10.3291 12.2876 10.3291 12.1204C10.3291 11.9685 10.2197 11.8408 10.0708 11.8196C9.10446 11.6706 8.50277 11.2634 8.13506 10.8623C8.77928 10.683 9.29591 9.95371 9.36274 9.85645C9.45696 9.71665 9.42049 9.52825 9.28374 9.43404C9.14395 9.33983 8.95555 9.37629 8.86133 9.51304C8.67595 9.78654 8.17152 10.3396 7.81598 10.291C7.78256 10.2879 7.74609 10.2758 7.71569 10.2606C7.66099 10.1512 7.61541 10.0388 7.58199 9.92024C7.5516 9.79261 7.43918 9.69839 7.3085 9.69232C7.29938 9.67104 7.29331 9.65281 7.28419 9.63156L7.28724 6.05179C10.5935 6.00011 14 5.04287 14 3.31377ZM7.07446 5.44705C7.02583 5.42577 6.96811 5.42577 6.91948 5.44705C3.21208 5.42577 0.632092 4.3166 0.632092 3.31984C0.632092 2.31397 3.2516 1.19263 7.01369 1.19263C10.7758 1.19263 13.3953 2.31397 13.3953 3.31984C13.3953 4.31962 10.8031 5.43489 7.07446 5.44705Z"
      fill="current color"
      stroke="current color"
      strokeWidth={0.5}
    />
  </svg>
);

const formatPrice = (num) => {
  if (num == null || isNaN(num)) return "";
  return Number(num).toLocaleString("en-US");
};
const formatDateTime = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const TotalCost = ({ total_price }) => (
  <div className="flex justify-between items-center text-lg font-bold border-2 border-graypalleteDark dark:border-graypallete p-2 rounded-2xl">
    <div className="flex gap-2">
      <Wallet className={"w-5 md:w-7 lg:w-10  stroke-adminPrimary"} />
      <span className="text-black dark:text-white text-lg lg:text-2xl">
        مبلغ کل سفارش
      </span>
    </div>
    <div className="flex gap-1 items-end justify-center text-adminPrimary text-lg font-bold lg:text-3xl lg:font-extrabold">
      <span>{formatPrice(total_price)}</span>
      <span className="text-sm font-normal lg:text-xl">تومان</span>
    </div>
  </div>
);

const TableNumber = ({ table_number }) => (
  <div className="flex justify-center w-full h-10 md:h-12 lg:h-14 items-center gap-2 text-lg font-bold border-2 border-graypalleteDark dark:border-graypallete md:py-1 md:px-2 rounded-2xl">
    <TableIcon className="w-5 md:w-7 lg:w-10 fill-adminPrimary stroke-adminPrimary" />
    <span className="text-black dark:text-white text-sm lg:text-2xl">
      میز شماره
    </span>
    <span className="text-adminPrimary text-xl font-bold lg:text-3xl lg:font-extrabold">
      {table_number}
    </span>
  </div>
);

const OrderTime = ({ time_added }) => (
  <div className="flex justify-center w-full h-10 md:h-12 lg:h-14 items-center text-lg font-bold border-2 border-graypalleteDark dark:border-graypallete md:py-1 md:px-3 rounded-2xl">
    <span className="text-xs md:text-sm lg:text-lg text-slowgrayDark dark:text-slowgray">
      {formatDateTime(time_added)}
    </span>
  </div>
);

const OrderTable = ({
  id,
  total_price,
  table_number,
  foods,
  time_added,
  is_accepted,
  acceptOrder,
  denyOrder,
  doneOrder,
  removingId,
  setClickedButtonId,
  clickedButtonId,
  fetchItems,
}) => (
  <div
    className={`${
      !is_accepted
        ? "border-2 border-adminPrimary dark:border-adminPrimaryDark"
        : "border-3 border-adminAction dark:border-adminActionDark"
    } m-2   rounded-3xl transition-colors duration-300 ${
      removingId === id ? "animate-scale-out" : ""
    } ${clickedButtonId === id ? "animate-scale-out" : ""}`}>
    <div className="border-b-4 border-adminBackgroundColor dark:border-graypalleteDark transition-colors duration-300">
      {foods.map((item, index) => (
        <div key={index}>
          <OrderItem
            name={item.name}
            description={item.description}
            count={item.quantity}
            price={item.price}
            in_sale={item.in_sale}
            category_name={item.category_name}
          />
        </div>
      ))}
    </div>
    <div className="p-1 md:p-2">
      <TotalCost total_price={total_price} />
      <div className="flex justify-center w-full items-center mt-2">
        <div className="flex justify-center w-full items-center gap-1">
          <TableNumber table_number={table_number} />
          <OrderTime time_added={time_added} />
        </div>
      </div>
    </div>
    <div className="flex justify-center items-center gap-2 py-2">
      {is_accepted ? (
        <button
          onClick={() => doneOrder(id)}
          className="w-full mx-2 bg-adminAction dark:bg-adminActionDark border-adminAction dark:border-adminActionDark border-2 px-3 py-2 rounded-xl text-xl text-white hover:bg-adminActionDark dark:hover:bg-adminAction hover:border-adminActionDark dark:hover:border-adminAction transition-all">
          ارسال سفارش
        </button>
      ) : (
        <div className="flex justify-center items-center gap-3">
          <button
            onClick={() => {
              setClickedButtonId(id);
              setTimeout(async () => {
                await acceptOrder(id);
                await fetchItems();
                setClickedButtonId(null);
              }, 300);
            }}
            className="bg-white dark:bg-darkpalleteDark border-adminAction dark:border-adminActionDark border-2 px-3 py-2 rounded-xl text-xl text-adminAction dark:text-adminActionDark hover:bg-adminAction hover:text-white dark:hover:bg-adminActionDark transition-all">
            پذیرش سفارش
          </button>
          <button
            onClick={() => {
              setClickedButtonId(id);
              setTimeout(async () => {
                await denyOrder(id);
                await fetchItems();
                setClickedButtonId(null);
              }, 300);
            }}
            className="bg-white dark:bg-darkpalleteDark border-adminError dark:border-adminErrorDark border-2 px-3 py-2 rounded-xl text-xl text-adminError dark:text-adminErrorDark hover:bg-adminError hover:text-white dark:hover:bg-adminErrorDark transition-all">
            لغو سفارش
          </button>
        </div>
      )}
    </div>
  </div>
);

const OrderItem = ({ name, description, count, price, in_sale }) => (
  <div
    className={`transition-colors duration-300 ${
      in_sale ? "bg-adminBackgroundColor dark:bg-adminBackgroundColorDark" : ""
    } flex items-center justify-between px-1 py-2 rounded-3xl`}>
    <img
      src={itemImage}
      alt={name}
      className="w-12 h-12 lg:w-18 lg:h-18 rounded-xl object-cover"
    />
    <div className="flex-1 mx-3">
      <div className="font-bold text-black lg:text-2xl dark:text-white flex gap-2 justify-start items-center">
        <h1>{name}</h1>
        <h1 className="text-sm font-medium lg:text-xl text-black dark:text-white"></h1>
      </div>
      <p className="text-sm lg:text-xl text-slowgrayDark dark:text-slowgray">
        {description}
      </p>
    </div>
    <div className="flex flex-col justify-end items-end ml-2">
      <div>
        <span className="text-lg font-normal lg:text-3xl lg:font-extrabold text-slowgrayDark dark:text-slowgray">
          {count}x
        </span>
      </div>
      <div className="flex justify-center items-center gap-1">
        <span className="text-sm font-normal lg:text-xl lg:font-semibold text-slowgrayDark dark:text-slowgray">
          {formatPrice(price)}
        </span>
        <span className="text-xs font-light lg:text-sm lg:font-normal text-slowgrayDark dark:text-slowgray">
          تومان
        </span>
      </div>
    </div>
  </div>
);

function AdminHome() {
  const [items, setItems] = useState([]);

  const [removingId, setRemovingId] = useState(null);
  const [clickedButtonId, setClickedButtonId] = useState(null);

  async function fetchItems() {
    // setError(null);
    try {
      const response = await axios.get(
        `${BASE_PATH}/order/get_orders_to_show`,
        {
          headers: {
            accept: "application/json",
          },
        }
      );

      setItems([
        ...response.data.in_progress_orders,
        ...response.data.not_accepted_orders,
      ]);

      console.log([
        ...response.data.in_progress_orders,
        ...response.data.not_accepted_orders,
      ]);
    } catch (err) {
      // setError("خطا در دریافت داده‌ها");
      console.log("خطا در دریافت داده‌ها");
    }
  }
  useEffect(() => {
    fetchItems();
  }, []);

  async function acceptOrder(order_id) {
    const token = JSON.parse(localStorage.getItem("user_data"));
    try {
      const response = await axios.put(
        `${BASE_PATH}/admin/order/accept_order`,
        {
          order_id: order_id,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
      console.log(response);

      await fetchItems();
    } catch (error) {
      console.error("خطا در پذیرش سفارش :", error);
    }
  }
  async function denyOrder(order_id) {
    const token = JSON.parse(localStorage.getItem("user_data"));
    try {
      const response = await fetch(`${BASE_PATH}/admin/order/deny_order`, {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${token.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_id: order_id }),
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("خطا در لغو سفارش:", response.statusText);
      }
    } catch (error) {
      console.error("خطا در لغو سفارش:", error);
    }
  }
  async function doneOrder(order_id) {
    const token = JSON.parse(localStorage.getItem("user_data"));
    setRemovingId(order_id);
    setTimeout(async () => {
      try {
        const response = await axios.put(
          `${BASE_PATH}/admin/order/get_order_done`,
          {
            order_id: order_id,
          },
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access_token}`,
            },
          }
        );
        await fetchItems();
      } catch (error) {
        console.error("خطا در اتمام وظیفه :", error);
      } finally {
        setRemovingId(null);
      }
    }, 300);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchItems();
    }, 7000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="bg-adminBackgroundColor dark:bg-adminBackgroundColorDark h-screen transition-colors duration-300">
        <AdminHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 h-fit bg-adminBackgroundColor dark:bg-adminBackgroundColorDark transition-colors duration-300">
          <div className="bg-white dark:bg-darkpalleteDark rounded-2xl transition-colors duration-300">
            <h1 className="text-3xl font-extrabold pr-8 py-4 dark:text-white transition-colors duration-300">
              لیست سفارشات
            </h1>
            {items.length === 0 ? (
              <p className="text-xl text-center pb-4 text-slowgrayDark dark:text-slowgray">
                هیچ سفارشی وجود ندارد
              </p>
            ) : (
              items.map((item) => (
                <div key={item.order.id} className="animate-scale-up">
                  <OrderTable
                    id={item.order.id}
                    total_price={item.order.total_price}
                    table_number={item.order.table_number}
                    foods={item.foods}
                    time_added={item.order.time_added}
                    is_accepted={item.order.is_accepted}
                    acceptOrder={acceptOrder}
                    denyOrder={denyOrder}
                    doneOrder={doneOrder}
                    removingId={removingId}
                    setClickedButtonId={setClickedButtonId}
                    clickedButtonId={clickedButtonId}
                    fetchItems={fetchItems}
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
