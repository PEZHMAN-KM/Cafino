import AdminHeader from "./AdminHeader";
import { useState } from "react";

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

function AddItem() {
  const [showOffValue, setShowOffValue] = useState(false);

  const handleOffChange = (e) => {
    setShowOffValue(e.target.checked);
  };
  return (
    <>
      <div className="bg-adminBackgroundColor h-full">
        <div className="bg-adminBackgroundColor h-screen overflow-y-auto overflow-x-hidden">
          <AdminHeader />
          <div className="grid grid-cols-1 md:flex justify-center w-screen">
            <div className="bg-white m-2 rounded-2xl">
              <div className="flex justify-between items-center pl-4 pt-3">
                <h1 className="text-3xl font-extrabold pr-8 py-4">
                  اضافه کردن آیتم
                </h1>
                <a href="/Itemmanager">
                  <div className="bg-white border-2 p-2 rounded-2xl">
                    <ArrowIcon
                      className={"w-8 rotate-180 stroke-3 stroke-black"}
                    />
                  </div>
                </a>
              </div>
              <form className="flex flex-col gap-4 px-8 py-4">
                <input
                  type="text"
                  placeholder="نام آیتم"
                  className="border border-gray-300 rounded-lg p-2"
                />
                <textarea
                  rows="4"
                  cols="50"
                  placeholder="توضیحات"
                  className="border border-gray-300 rounded-lg p-2"
                />
                <div className="flex items-center gap-2">
                  <select
                    name="category"
                    id="category"
                    className="border w-1/2 border-gray-300 rounded-lg p-2 text-gray-600"
                    defaultValue="">
                    <option value="" disabled>
                      دسته بندی
                    </option>
                    <option value="کافه">کافه</option>
                    <option value="کیک و دسر">کیک و دسر</option>
                    <option value="نوشیدنی گرم">نوشیدنی گرم</option>
                    <option value="نوشیدنی سرد">نوشیدنی سرد</option>
                    <option value="غذا">غذا</option>
                  </select>
                  <input
                    type="text"
                    placeholder="قیمت"
                    className="border w-1/2 border-gray-300 rounded-lg p-2"
                  />
                </div>
                <div className="max-h-fit">
                  <div className="flex items-center gap-2 pb-2">
                    <label htmlFor="off">تخفیف ویژه</label>
                    <input
                      type="checkbox"
                      name="off"
                      id="off"
                      onChange={handleOffChange}
                      checked={showOffValue}
                    />
                  </div>
                  <input
                    type="text"
                    name="offValue"
                    placeholder="قیمت با تخفیف"
                    className={`border border-gray-300 rounded-lg p-2 transition-all duration-200 ${
                      showOffValue
                        ? "opacity-100 scale-100"
                        : "opacity-0 !max-h-0 scale-0 overflow-hidden"
                    }`}
                  />
                </div>
                <button className="bg-adminAction text-white py-2 rounded-lg hover:bg-adminActionHover transition-all">
                  اضافه کردن
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddItem;
