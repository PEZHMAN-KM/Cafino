const TableIcon = ({ stroke }) => (
  <svg
    width={35}
    height={34}
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

const TableNumber = ({ tableNumber }) => (
  <div className=" bg-white px-4 h-13 w-fit rounded-3xl border-2 border-adminBackgroundColor flex justify-center items-center gap-5">
    <TableIcon stroke={"#809FB8"} />
    <h1 className="text-2xl font-bold text-center">
      میز شماره{" "}
      <span className="text-adminPrimary text-3xl">{tableNumber}</span>
    </h1>
  </div>
);

const WaiterHeader = () => (
  <div className="p-2 sticky top-0 z-10 bg-adminBackgroundColor">
    <h1 className="text-3xl font-extrabold text-center p-2 bg-white rounded-3xl">
      سالندار
    </h1>
  </div>
);

const WaiterRequest = ({ tableNumber }) => (
  <div className="flex flex-col justify-center items-center my-3">
    <div className=" bg-white w-5/6 px-7 py-3 rounded-3xl">
      <h1 className="text-lg pb-2">درخواست کمک</h1>
      <div className="flex flex-col justify-center items-center">
      <TableNumber tableNumber={tableNumber} />
      </div>
      <div className="flex justify-center items-center gap-2 py-4">
        <button className="bg-white border-adminAction border-2 px-3 py-2 rounded-xl text-xl text-adminAction hover:bg-adminAction hover:text-white transition-all">
          بررسی و انجام شد
        </button>
      </div>
    </div>
  </div>
);

function WaiterPage() {
  return (
    <>
      <div className="bg-adminBackgroundColor h-screen">
        <WaiterHeader />
        <div className="bg-adminBackgroundColor h-fit pb-2">
          {[
            { id: 0, tableNumber: 3 },
            { id: 1, tableNumber: 8 },
            { id: 2, tableNumber: 13 },
            { id: 3, tableNumber: 33 },
            { id: 4, tableNumber: 6 },
          ].map((item) => (
            <div key={item.id}>
              <WaiterRequest tableNumber={item.tableNumber} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default WaiterPage;
