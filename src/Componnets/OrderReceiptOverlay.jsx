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

const formatPrice = (num) =>
  num == null || isNaN(num) ? "" : Number(num).toLocaleString("en-US");

export default function OrderReceiptOverlay({
  visible,
  items,
  totalPrice,
  refreshAllData,
}) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-backgroundcolor dark:bg-backgroundcolorDark w-[90%] max-w-md lg:max-w-lg rounded-2xl shadow-lg overflow-hidden">
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
          <div className="divide-y mt-2 max-h-[50vh] overflow-y-auto scrollbar scrollbar-none">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2">
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
                <Wallet className={"w-5 lg:w-10"} />
                <span className="text-black dark:text-white text-lg lg:text-2xl">
                  مبلغ کل سفارش
                </span>
              </div>
              <span className="text-primary text-lg font-bold lg:text-3xl lg:font-extrabold">
                {formatPrice(totalPrice)}{" "}
                <span className="text-sm font-normal lg:text-xl">تومان</span>
              </span>
            </div>
            <p className="text-center text-xs md:text-base lg:text-lg text-slowgrayDark dark:text-slowgray mt-2">
              لطفا سفارش خود را به سالن‌دار یا صندوق‌دار اطلاع دهید
            </p>
            <button className="mt-4 w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primaryDark">
              اشتراک‌گذاری
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
