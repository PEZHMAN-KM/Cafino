import AdminHeader from "./AdminHeader";
import itemImage from "../../public/2.jpg";

const TableIcon = ({ stroke }) => (
  <svg
    width={25}
    height={24}
    viewBox="0 0 14 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 3.31377C14 1.53604 10.3929 0.575756 7.00152 0.575756C3.61016 0.575756 0 1.53604 0 3.31377C0 5.03681 3.38225 5.991 6.6794 6.04875V9.63156C6.67333 9.65284 6.66421 9.67107 6.65509 9.69232C6.52441 9.70144 6.412 9.79261 6.3816 9.92329C6.34818 10.0418 6.3026 10.1542 6.24485 10.2636C6.21445 10.2788 6.18103 10.2879 6.14762 10.294C5.79512 10.3396 5.29066 9.78959 5.10226 9.51609C5.00804 9.37629 4.8166 9.34287 4.67985 9.43709C4.5431 9.5313 4.50663 9.72275 4.60085 9.8595C4.66771 9.95673 5.18126 10.6861 5.82552 10.8623C5.45478 11.2634 4.85611 11.6706 3.8928 11.8196C3.72566 11.8439 3.61324 11.9988 3.63754 12.166C3.65882 12.3149 3.78947 12.4243 3.93839 12.4243C3.95357 12.4243 3.96878 12.4243 3.98397 12.4213C5.60367 12.1751 6.36946 11.2908 6.71287 10.6769C6.8162 10.5888 6.90737 10.4885 6.9803 10.373C7.05323 10.4855 7.1444 10.5888 7.24773 10.6769C7.59416 11.2908 8.35995 12.1751 9.97965 12.4213C9.99484 12.4243 10.01 12.4243 10.0252 12.4243C10.1924 12.4243 10.3291 12.2876 10.3291 12.1204C10.3291 11.9685 10.2197 11.8408 10.0708 11.8196C9.10446 11.6706 8.50277 11.2634 8.13506 10.8623C8.77928 10.683 9.29591 9.95371 9.36274 9.85645C9.45696 9.71665 9.42049 9.52825 9.28374 9.43404C9.14395 9.33983 8.95555 9.37629 8.86133 9.51304C8.67595 9.78654 8.17152 10.3396 7.81598 10.291C7.78256 10.2879 7.74609 10.2758 7.71569 10.2606C7.66099 10.1512 7.61541 10.0388 7.58199 9.92024C7.5516 9.79261 7.43918 9.69839 7.3085 9.69232C7.29938 9.67104 7.29331 9.65281 7.28419 9.63156L7.28724 6.05179C10.5935 6.00011 14 5.04287 14 3.31377ZM7.07446 5.44705C7.02583 5.42577 6.96811 5.42577 6.91948 5.44705C3.21208 5.42577 0.632092 4.3166 0.632092 3.31984C0.632092 2.31397 3.2516 1.19263 7.01369 1.19263C10.7758 1.19263 13.3953 2.31397 13.3953 3.31984C13.3953 4.31962 10.8031 5.43489 7.07446 5.44705Z"
      fill={stroke}
      stroke={stroke}
      strokeWidth={0.5}
    />
  </svg>
);
const Wallet = ({ stroke }) => (
  <svg
    width={25}
    viewBox="0 0 19 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.533 10.497h-3.374a2.244 2.244 0 0 1 0-4.485h3.374m-2.993 2.19h-.259"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      clipRule="evenodd"
      d="M5.957 1h7.202a4.373 4.373 0 0 1 4.373 4.373v5.98a4.373 4.373 0 0 1-4.373 4.374H5.957a4.373 4.373 0 0 1-4.373-4.373v-5.98A4.373 4.373 0 0 1 5.957 1"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.363 4.782h4.5"
      stroke={stroke}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const OrderItem = ({ title, description, count }) => (
  <div className="flex items-center justify-center px-5 py-2 gap-3">
    <div className="aspect-square size-[80px] shrink-0">
      <img className="p-2 rounded-3xl" src={itemImage} alt="" />
    </div>
    <div className="flex flex-col justify-center flex-1 overflow-hidden">
      <h1 className="text-xl font-extrabold truncate">{title}</h1>
      <h3 className="text-lg font-normal truncate">{description}</h3>
    </div>
    <div>
      <h1 className="text-3xl font-bold">X{count}</h1>
    </div>
  </div>
);

const TableNumber = ({ tableNumber }) => (
  <div className=" bg-white p-1 min-w-36 h-10 rounded-2xl border-2 border-adminBackgroundColor flex justify-center items-center gap-2">
    <TableIcon stroke={"#809FB8"} />
    <h1 className="text-lg font-bold text-center">میز شماره {tableNumber}</h1>
  </div>
);

const Cost = ({ CostNumber }) => (
  <div className=" bg-white p-1 min-w-50 h-10 rounded-2xl border-2 border-adminBackgroundColor flex justify-center items-center gap-2">
    <Wallet stroke={"#809FB8"} />
    <h1 className="text-lg font-bold text-center">
      مبلغ کل:
      <span className="text-adminPrimary text-xl font-bold">{CostNumber}</span>
      <span className="text-adminPrimary text-sm">تومان</span>
    </h1>
  </div>
);

const OrderTable = ({ name, cost, table }) => (
  <div className="m-2 border-2 border-adminPrimary rounded-3xl">
    <div className="border-b-4 border-adminBackgroundColor ">
      {[
        {
          id: 0,
          title: "کافه موکا",
          description: "توضیحات کوتاه",
          count: "3",
        },
        {
          id: 1,
          title: "لاته",
          description: "توضیحات کوتاه",
          count: "1",
        },
      ].map((item) => (
        <div key={item.id}>
          <OrderItem
            title={item.title}
            description={item.description}
            count={item.count}
          />
        </div>
      ))}
    </div>
    <div className="py-2 px-1 flex justify-between items-center gap-1">
      <TableNumber tableNumber={table} />
      <Cost CostNumber={cost} />
    </div>
    <div className="flex justify-center items-center flex-col pb-2">
      <h1 className="text-xl font-normal text-center pb-2">
        به نام:
        <span className="text-2xl font-bold "> {name}</span>
      </h1>
      <button className="bg-white border-adminAction border-2 px-3 py-2 rounded-xl text-xl text-adminAction hover:bg-adminAction hover:border-white hover:text-white transition-all">
        سفارش آماده شد
      </button>
    </div>
  </div>
);

function AdminHome() {
  return (
    <>
      <div className="bg-adminBackgroundColor h-screen w-screen">
        <AdminHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <div className="bg-white rounded-2xl">
            <h1 className="text-3xl font-extrabold pr-8 pt-4">لیست سفارشات</h1>
            {[
              {
                id: 0,
                name: "پژمان کاظمی میر",
                cost: "2615",
                table: "3",
              },
              {
                id: 0,
                name: "سید حسین کاظمی میر",
                cost: "7878",
                table: "23",
              },
            ].map((item) => (
              <div key={item.id}>
                <OrderTable
                  name={item.name}
                  cost={item.cost}
                  table={item.table}
                />
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </>
  );
}

export default AdminHome;
