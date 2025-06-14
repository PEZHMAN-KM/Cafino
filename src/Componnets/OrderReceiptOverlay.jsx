import React from "react";
import itemImage from "../../public/No_Item.png";
import { Icons } from "./Icons";
import { BASE_PATH } from "../constants/paths";

const formatPrice = (num) =>
  num == null || isNaN(num) ? "" : Number(num).toLocaleString("en-US");

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

export default function OrderReceiptOverlay({
  visible,
  items,
  totalPrice,
  tableNumber,
  timeAdded,
  refreshAllData,
}) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center transition-colors duration-300">
      <div className="bg-backgroundcolor dark:bg-backgroundcolorDark w-full mx-2 max-w-md lg:max-w-lg rounded-2xl shadow-lg overflow-hidden animate-scale-up">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <h2 className="text-black dark:text-white text-2xl font-extrabold">
              رسید سفارش
            </h2>
            <button onClick={() => refreshAllData()} className="cursor-pointer">
              <div className="bg-white dark:bg-darkpalleteDark border-2 border-black dark:border-white p-2 rounded-2xl transition-colors duration-300">
                <Icons.arrow
                  className={
                    "w-8 rotate-180 stroke-3 stroke-black dark:stroke-white"
                  }
                />
              </div>
            </button>
          </div>
          <div className="divide-y mt-2 max-h-[42vh] md:max-h-[55vh] overflow-y-auto scrollbar scrollbar-none">
            {items.map((item, index) => (
              <div
                key={index}
                className={` ${
                  item.in_sale ? "bg-slowprimary dark:bg-slowprimaryDark" : ""
                } flex items-center justify-between px-1 py-2 rounded-2xl`}>
                <img
                  src={
                    item.pic_url
                      ? `${BASE_PATH}/files/${item.pic_url.split("/").pop()}`
                      : itemImage
                  }
                  alt={item.name}
                  className="w-12 h-12 lg:w-18 lg:h-18 rounded-xl object-cover"
                />
                <div className="flex-1 mx-3">
                  <div className="font-bold text-black lg:text-2xl dark:text-white flex gap-2 justify-start items-center">
                    <h1>{item.name}</h1>
                    <h1 className="text-sm font-medium lg:text-xl text-black dark:text-white">
                      {item.count}x
                    </h1>
                  </div>
                  <p className="text-sm lg:text-xl text-slowgrayDark dark:text-slowgray">
                    {item.category_name}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex justify-center items-center gap-1">
                    <span className="text-lg font-normal lg:text-3xl lg:font-extrabold text-slowgrayDark dark:text-slowgray">
                      {formatPrice(item.price)}
                    </span>
                    <span className="text-xs font-light lg:text-xl lg:font-normal text-slowgrayDark dark:text-slowgray">
                      تومان
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t pt-3">
            <div className="flex justify-between items-center text-lg font-bold border-2 border-slowgrayDark dark:border-slowgray p-2 rounded-2xl">
              <div className="flex gap-2">
                <Icons.wallet className={"w-5 md:w-7 lg:w-10 stroke-primary"} />
                <span className="text-black dark:text-white text-lg lg:text-2xl">
                  مبلغ کل سفارش
                </span>
              </div>
              <span className="text-primary text-lg font-bold lg:text-3xl lg:font-extrabold">
                {formatPrice(totalPrice)}
                <span className="text-sm font-normal lg:text-xl">تومان</span>
              </span>
            </div>
            <div className="flex justify-center w-full items-center mt-2">
              <div className="flex justify-center w-full items-center gap-1">
                {/* Table Number */}
                <div className="flex justify-center w-full h-10 md:h-12 lg:h-14 items-center gap-2 text-lg font-bold border-2 border-slowgrayDark dark:border-slowgray py-1 px-3 rounded-2xl">
                  <Icons.table className="w-5 md:w-7 lg:w-10 fill-primary stroke-primary" />
                  <span className="text-black dark:text-white text-sm lg:text-2xl">
                    میز شماره
                  </span>
                  <span className="text-primary text-xl font-bold lg:text-3xl lg:font-extrabold">
                    {tableNumber}
                  </span>
                </div>
                {/* Order Add Time */}
                <div className="flex justify-center w-full h-10 md:h-12 lg:h-14 items-center text-lg font-bold border-2 border-slowgrayDark dark:border-slowgray py-1 px-2 rounded-2xl">
                  <span className="text-xs md:text-sm lg:text-lg text-slowgrayDark dark:text-slowgray">
                    {formatDateTime(timeAdded)}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-center text-xs md:text-base lg:text-lg text-slowgrayDark dark:text-slowgray mt-3">
              لطفا سفارش خود را به سالن‌دار یا صندوق‌دار اطلاع دهید
            </p>
            <button className="mt-3 w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primaryDark">
              اشتراک‌گذاری
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
