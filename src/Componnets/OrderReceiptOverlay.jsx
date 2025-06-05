import React from "react";
import itemImage from "../../public/No_Item.png";

const Wallet = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 19 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
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
const ArrowIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};
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
                <ArrowIcon
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
                  src={itemImage}
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
                <Wallet className={"w-5 md:w-7 lg:w-10"} />
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
                  <TableIcon className="w-5 md:w-7 lg:w-10 fill-primary stroke-primary" />
                  <span className="text-black dark:text-white text-sm lg:text-2xl">
                    میز شماره
                  </span>
                  <span className="text-primary text-xl font-bold lg:text-3xl lg:font-extrabold">
                    {tableNumber}
                  </span>
                </div>
                {/* Order Add Time */}
                <div className="flex justify-center w-full h-10 md:h-12 lg:h-14 items-center gap-2 text-lg font-bold border-2 border-slowgrayDark dark:border-slowgray py-1 px-3 rounded-2xl">
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
