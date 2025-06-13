import { useState, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import itemImage from "../../public/No_Item.png";
import axios from "axios";
import { BASE_PATH } from "../constants/paths";
import { Icons } from "../Componnets/Icons";

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

// ORDER CONTROL ---------------------------------------------

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
    } my-2 mx-3 rounded-3xl hover:scale-101 transition-all duration-300 ${
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
          onClick={() => doneOrder(id, table_number)}
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

const TotalCost = ({ total_price }) => (
  <div className="flex justify-between items-center text-lg font-bold border-2 border-graypalleteDark dark:border-graypallete p-2 rounded-2xl">
    <div className="flex gap-2">
      <Icons.wallet className={"w-5 md:w-7 lg:w-10  stroke-adminPrimary"} />
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
  <div className="flex justify-center w-full h-10 md:h-12 lg:h-14 items-center gap-2 text-lg font-bold border-2 border-graypalleteDark dark:border-graypallete py-1 px-2 rounded-2xl">
    <Icons.table className="w-5 md:w-7 lg:w-10 fill-adminPrimary stroke-adminPrimary" />
    <span className="text-black dark:text-white text-sm lg:text-2xl">
      میز شماره
    </span>
    <span className="text-adminPrimary text-xl font-bold lg:text-3xl lg:font-extrabold">
      {table_number}
    </span>
  </div>
);

const OrderTime = ({ time_added }) => (
  <div className="flex justify-center w-full h-10 md:h-12 lg:h-14 items-center text-lg font-bold border-2 border-graypalleteDark dark:border-graypallete py-1 px-2 rounded-2xl">
    <span className="text-xs md:text-sm lg:text-lg text-slowgrayDark dark:text-slowgray">
      {formatDateTime(time_added)}
    </span>
  </div>
);

// NOTIFICATION CONTROL ----------------------------------------

const WaiterRequest = ({
  tableNumber,
  id,
  message,
  inProgress,
  waitress_name,
  progressNotification,
  unProgressNotification,
  removingId,
  setClickedButtonId,
  clickedButtonId,
  getNOtification,
}) => (
  <div
    className={`flex flex-col justify-center items-center w-full ${
      removingId === id ? "animate-scale-out" : ""
    } ${clickedButtonId === id ? "animate-scale-out" : ""}`}>
    <div
      className={` transition-all hover:scale-102 duration-300 w-full px-7 py-2 rounded-3xl ${
        message
          ? "bg-adminBackgroundColor dark:bg-adminBackgroundColorDark"
          : "bg-white dark:bg-darkpalleteDark"
      } ${
        !inProgress
          ? "border-2 border-adminPrimary dark:border-adminPrimaryDark"
          : "border-3 border-adminAction dark:border-adminActionDark"
      }`}>
      <h1 className="text-lg text-black dark:text-white transition-colors duration-300 pb-1">
        {message ? "تحویل سفارش" : "درخواست کمک"}
      </h1>
      <div className="flex flex-col justify-center items-center">
        <WaiterTableNumber table_number={tableNumber} />
      </div>
      <div className="flex justify-center items-center gap-2 py-2">
        {inProgress ? (
          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-center items-center py-2">
              <h1 className="text-xs lg:text-lg text-center text-black dark:text-white transition-colors duration-300">
                این درخواست به {waitress_name} واگذار شده
              </h1>
            </div>
            <button
              onClick={() => {
                setClickedButtonId(id);
                setTimeout(async () => {
                  await unProgressNotification(id);
                  await getNOtification();
                  setClickedButtonId(null);
                }, 300);
              }}
              className="bg-white dark:bg-darkpalleteDark border-adminError dark:border-adminErrorDark border-2 px-3 py-2 rounded-xl text-xl text-adminError dark:text-adminErrorDark hover:bg-adminError hover:text-white dark:hover:bg-adminErrorDark transition-all">
              لغو بررسی
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setClickedButtonId(id);
              setTimeout(async () => {
                await progressNotification(id);
                await getNOtification();
                setClickedButtonId(null);
              }, 300);
            }}
            className="bg-white dark:bg-darkpalleteDark border-adminAction dark:border-adminActionDark border-2 px-3 py-2 rounded-xl text-xl text-adminAction dark:text-adminActionDark hover:bg-adminAction hover:text-white dark:hover:bg-adminActionDark transition-all">
            انجام شد
          </button>
        )}
      </div>
    </div>
  </div>
);

const WaiterTableNumber = ({ table_number }) => (
  <div className="bg-white dark:bg-black text-black dark:text-white px-4 py-1 w-fit rounded-3xl border-2 border-adminBackgroundColor dark:border-adminBackgroundColorDark flex justify-center items-center gap-3 lg:gap-5 transition-colors duration-300">
    <Icons.table className="w-5 md:w-7 lg:w-10 fill-adminPrimary stroke-adminPrimary" />
    <span className="text-black dark:text-white text-sm lg:text-2xl">
      میز شماره
    </span>
    <span className="text-adminPrimary text-xl font-bold lg:text-3xl lg:font-extrabold">
      {table_number}
    </span>
  </div>
);

function AdminHome() {
  const [items, setItems] = useState([]);

  const [removingId, setRemovingId] = useState(null);
  const [clickedButtonId, setClickedButtonId] = useState(null);

  async function fetchItems() {
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
      console.log("خطا در دریافت داده‌ها");
    }
  }

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
  async function doneOrder(order_id, tableNumber) {
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
        addNotification(tableNumber);
        await fetchItems();
        await getNOtification();
      } catch (error) {
        console.error("خطا در اتمام وظیفه :", error);
      } finally {
        setRemovingId(null);
      }
    }, 300);
  }

  async function addNotification(tableNumber) {
    if (tableNumber <= 0) {
      console.log("شماره میز مشتری وارد نشده");
      return;
    }
    try {
      const response = await axios.post(
        `${BASE_PATH}/notification/add_notif`,
        { table_number: tableNumber, message: "تحویل سفارش" },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log("خطا در ثبت تحویل سفارش مشتری");
    }
  }

  // NOTIFICATION CONTROL ----------------------------------------
  const [allNotifications, setAllNotifications] = useState([]);

  async function getNOtification() {
    try {
      const response = await axios.get(
        `${BASE_PATH}/notification/get_notifs_to_show`,
        {
          headers: { accept: "application/json" },
        }
      );
      setAllNotifications([
        ...response.data.in_progress_notifs,
        ...response.data.requested_notifs,
      ]);
    } catch (error) {
      console.error("خطا در دریافت نوتفیکیشن ها:", error);
    }
  }
  async function progressNotification(notif_id) {
    const token = JSON.parse(localStorage.getItem("user_data"));
    try {
      const response = await axios.put(
        `${BASE_PATH}/waitress/notification/get_notif_in_progress`,
        {
          notif_id: notif_id,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
      doneNotification(notif_id);
    } catch (error) {
      console.error("خطا در پذیرش بررسی :", error);
    }
  }
  async function doneNotification(notif_id) {
    const token = JSON.parse(localStorage.getItem("user_data"));
    setRemovingId(notif_id);
    setTimeout(async () => {
      try {
        const response = await axios.put(
          `${BASE_PATH}/waitress/notification/get_notif_done`,
          {
            notif_id: notif_id,
          },
          {
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access_token}`,
            },
          }
        );
        await getNOtification();
      } catch (error) {
        console.error("خطا در اتمام وظیفه :", error);
      } finally {
        setRemovingId(null);
      }
    }, 300);
  }
  async function unProgressNotification(notif_id) {
    const token = JSON.parse(localStorage.getItem("user_data"));
    try {
      const response = await axios.put(
        `${BASE_PATH}/notification/get_out_of_progress`,
        {
          notif_id: notif_id,
        },
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );
    } catch (error) {
      console.error("خطا در لغو بررسی نوتیف:", error);
    }
  }

  useEffect(() => {
    fetchItems();
    getNOtification();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchItems();
      getNOtification();
    }, 7000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div className="bg-adminBackgroundColor dark:bg-adminBackgroundColorDark h-screen overflow-y-auto overflow-x-hidden scrollbar scrollbar-none transition-colors duration-300">
        <AdminHeader />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 bg-adminBackgroundColor dark:bg-adminBackgroundColorDark transition-colors duration-300">
          {/* ORDER CONTROL */}
          <div className="col-span-2 bg-white dark:bg-darkpalleteDark rounded-3xl transition-colors duration-300 h-fit max-h-[88svh] overflow-y-auto overflow-x-hidden scrollbar scrollbar-none">
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
          {/* NOTIFICATION CONTROL */}
          <div className="col-span-1 bg-white dark:bg-darkpalleteDark rounded-3xl transition-colors duration-300 h-fit pb-2 max-h-[88svh] overflow-y-auto overflow-x-hidden scrollbar scrollbar-none">
            <h1 className="text-3xl font-extrabold pr-8 py-4 dark:text-white transition-colors duration-300">
              لیست نوتیف ها
            </h1>
            {allNotifications.length === 0 ? (
              <p className="text-xl text-center pb-4 text-slowgrayDark dark:text-slowgray">
                هیچ درخواستی وجود ندارد
              </p>
            ) : (
              <div className="flex flex-col gap-3 mx-3">
                {allNotifications.map((item) => (
                  <div key={item.id} className="animate-scale-up">
                    <WaiterRequest
                      id={item.id}
                      tableNumber={item.table_number}
                      message={item.message}
                      inProgress={item.is_in_progress}
                      waitress_name={item.waitress_name}
                      progressNotification={progressNotification}
                      unProgressNotification={unProgressNotification}
                      doneNotification={doneNotification}
                      removingId={removingId}
                      setClickedButtonId={setClickedButtonId}
                      clickedButtonId={clickedButtonId}
                      getNOtification={getNOtification}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome;
