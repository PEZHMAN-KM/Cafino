import itemImage from "../../public/2.jpg";

import Footer from "../Componnets/Footer.jsx";
import Header from "../Componnets/Header.jsx";

const ArrowIcon = ({ className, ...props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      {...props}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};

// plus
{
  /* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg> */
}

// minus

{
  /* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
</svg> */
}

// heroicon
// هیرو ایکون معروف واس ایکون ولی کامل نیست
// https://lucide.dev/icons/
// این هم معروف

const OrderItem = ({ title, description }) => (
  <div className="flex items-center px-5 py-2 gap-3">
    <div className="aspect-square size-[100px] shrink-0">
      <img className="p-2 rounded-3xl" src={itemImage} alt="" />
    </div>
    <div className="flex flex-col justify-center flex-1 overflow-hidden">
      <h1 className="text-2xl font-extrabold truncate">{title}</h1>
      <h3 className="text-lg font-normal truncate">{description}</h3>
    </div>
    <div className="shrink-0 pl-3">
      <div className="flex items-center">
        <ArrowIcon className="size-6" />
        <h1 className="text-2xl font-bold">3</h1>
        <ArrowIcon className="size-6 rotate-180" />
      </div>
    </div>
  </div>
);

const OrderBox = () => (
  <div className="pt-8 mb-4 border-b-4 border-slowprimary">
    <h2 className="font-extrabold text-3xl px-8">آیتم های خرید</h2>
    <div className="divide-y lg:divide-x divide-highgray grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 lg:border-b-1 lg:border-highgray">
      {[
        { id: 0, title: "کافه موکا", description: "توضیحات کوتاه" },
        { id: 1, title: "لاته", description: "توضیحات کوتاه" },
        { id: 2, title: "کافه موکا", description: "توضیحات کوتاه" },
      ].map((item) => (
        <div key={item.id}>
          <OrderItem title={item.title} description={item.description} />
        </div>
      ))}
    </div>
  </div>
);

const UserNumber = () => (
  <div className=" bg-white w-screen p-5 mx-5 rounded-2xl border-1 border-highgray flex justify-between items-center text-2xl font-bold">
    <div>سفارش برای میز :</div>
    <div>
      <input
        className="w-13 h-13 text-3xl font-bold text-center border-2 border-slowgray text-highgray rounded-2xl"
        type="number"
        defaultValue={3}
      />
    </div>
  </div>
);

const CheckOutItem = ({ title, count, value, off }) => (
  <div className="flex justify-between px-10">
    <div className="flex gap-3">
      <h1 className="text-2xl font-bold">{title}</h1>
      {count != "" ? <h1 className="font-light text-xl">{count}x</h1> : null}
    </div>
    <div>
      {off == "" ? (
        <h1 className="font-bold">{value} تومان</h1>
      ) : (
        <div className="flex gap-4">
          <h1 className="decoration-1 line-through text-highgray">
            {value} تومان
          </h1>
          <h1 className="font-bold">{off} تومان</h1>
        </div>
      )}
    </div>
  </div>
);

const Checkout = () => (
  <div>
    <h1 className="font-extrabold text-3xl px-8 py-3">فاکتور سفارشات شما</h1>
    {[
      { id: 0, title: "کافه موکا", count: "2", value: "130", off: "85" },
      { id: 1, title: "لاته", count: "", value: "130", off: "" },
    ].map((item) => (
      <div key={item.id}>
        <CheckOutItem
          title={item.title}
          count={item.count}
          value={item.value}
          off={item.off}
        />
      </div>
    ))}
  </div>
);

function Order() {
  return (
    <>
      <Header page={3} text={"سبد خرید"} />
      <div className="bg-backgroundcolor h-full overflow-y-auto pb-60 md:pb-5">
        <div className="grid grid-cols-1">
          <div className="col-span-1">
            <OrderBox />
          </div>
          <div className="col-span-1 flex justify-center items-start">
            <UserNumber />
          </div>
          <div className="col-span-1 pt-4">
            <Checkout />
          </div>
        </div>
      </div>
      <Footer page={3} />
    </>
  );
}

export default Order;
