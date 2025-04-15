import AdminHeader from "./AdminHeader";

const ADD = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <g id="Edit / Add_Plus">
          <path
            id="Vector"
            d="M6 12H12M12 12H18M12 12V18M12 12V6"
            stroke="#000000"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};
const Edit = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
          stroke="#292D32"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.04 3.02001L8.16 10.9C7.86 11.2 7.56 11.79 7.5 12.22L7.07 15.23C6.91 16.32 7.68 17.08 8.77 16.93L11.78 16.5C12.2 16.44 12.79 16.14 13.1 15.84L20.98 7.96001C22.34 6.60001 22.98 5.02001 20.98 3.02001C18.98 1.02001 17.4 1.66001 16.04 3.02001Z"
          stroke="#292D32"
          strokeWidth={1.5}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.91 4.1499C15.58 6.5399 17.45 8.4099 19.85 9.0899"
          stroke="#292D32"
          strokeWidth={1.5}
          strokeMiterlimit={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
const Delete = ({ className }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          d="M10 12V17"
          stroke="white"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 12V17"
          stroke="white"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4 7H20"
          stroke="white"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
          stroke="white"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
          stroke="white"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
// const Setting = ({ className }) => {
//   return (
//     <svg
//       className={className}
//       viewBox="0 0 24 24"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg">
//       <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
//       <g
//         id="SVGRepo_tracerCarrier"
//         stroke-linecap="round"
//         stroke-linejoin="round"></g>
//       <g id="SVGRepo_iconCarrier">
//         <path
//           d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
//           stroke-width="1.5"
//           stroke-miterlimit="10"
//           stroke-linecap="round"
//           stroke-linejoin="round"></path>
//         <path
//           d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z"
//           stroke-width="1.5"
//           stroke-miterlimit="10"
//           stroke-linecap="round"
//           stroke-linejoin="round"></path>
//       </g>
//     </svg>
//   );
// };

const ItemTable = ({ className, name, type, cost, off }) => {
  return (
    <div
      className={`grid grid-cols-4 items-center text-center text-sm md:text-xl font-bold gap-2 rounded-xl px-2 md:gap-5 ${
        off ? "bg-adminAction text-adminBackgroundColor" : "bg-white"
      }`}>
      <div>
        <h1>{name}</h1>
      </div>
      <div>
        <h1>{type}</h1>
      </div>
      <div>
        <h1 className="text-center">
          <span>{cost}</span>
          <span className="pr-1">تومان</span>
        </h1>
      </div>
      <div className="flex justify-center items-center gap-2 my-1 md:my-2">
        <button className="flex justify-center items-center bg-adminError md:px-1 md:py-0.5 text-white rounded-lg">
          <Delete className="w-8 md:w-6" />
          <h1 className="hidden md:block md:text-sm">پاک کردن</h1>
        </button>
        <button className="flex justify-center items-center bg-white md:px-1 md:py-0.5 text-black rounded-lg">
          <Edit className="w-8 md:w-6" />
          <h1 className="hidden md:block md:text-sm">اصلاح</h1>
        </button>
      </div>
    </div>
  );
};

const ItemManager = () => {
  return (
    <>
      <div className="bg-adminBackgroundColor h-full">
        <div className="bg-adminBackgroundColor h-screen overflow-y-auto overflow-x-hidden">
          <AdminHeader />
          <div className="grid grid-cols-1 md:flex justify-center w-screen">
            <div className="bg-white m-2 rounded-2xl">
              <div className="flex justify-between items-center pl-4 py-3">
                <h1 className="text-3xl font-extrabold pr-8 py-4">
                  مدیریت آیتم ها
                </h1>
                {/* <div className="flex gap-1 md:gap-2">
                  <a href="">
                    <div className="bg-white flex items-center justify-center gap-1 border-3 border-highgray text-highgray p-1 md:p-2 rounded-2xl font-bold">
                      <Setting className={"w-8 stroke-highgray "} />
                      <h1 className="hidden md:block">تنظیمات</h1>
                    </div>
                  </a>
                </div> */}
                <a href="/AddItem">
                  <div className="bg-white flex items-center justify-center gap-1 border-3 p-1 md:p-2 rounded-2xl font-bold">
                    <ADD className={"w-8 rotate-180 "} />
                    <h1 className="hidden md:block">اضافه کردن</h1>
                  </div>
                </a>
              </div>
              <div className="px-2">
                <div className="grid grid-cols-4 text-center text-balance md:text-xl font-bold gap-2 md:gap-5 pb-2 border-b-2">
                  <h1>نام آیتم</h1>
                  <h1>دسته بندی</h1>
                  <h1>هزینه</h1>
                  <h1>آپشن</h1>
                </div>
                <div>
                  {[
                    {
                      id: 0,
                      name: "کافه موکا",
                      type: "نوشیدنی گرم",
                      cost: "100",
                      off: 0,
                    },
                    {
                      id: 1,
                      name: "کافه موکا",
                      type: "نوشیدنی گرم",
                      cost: "3785",
                      off: 1,
                    },
                  ].map((item) => (
                    <div className="my-1" key={item.id}>
                      <ItemTable
                        name={item.name}
                        type={item.type}
                        cost={item.cost}
                        off={item.off}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemManager;
