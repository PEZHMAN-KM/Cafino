import AdminHeader from "./AdminHeader";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_PATH } from "../constants/paths";

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
  const [preview, setPreview] = useState(null);
  const [textError, setTextError] = useState(null);
  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [foodImage, setFoodImage] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const addFood = async (e) => {
    e.preventDefault();
    try {
      setNameError(false);
      setPriceError(false);
      setCategoryError(false);

      const formData = new FormData();
      const form = e.target;

      if (!form.name.value.trim()) {
        setTextError("نام آیتم نمی‌تواند خالی باشد.");
        setNameError(true);
        return;
      }
      if (!form.price.value.trim()) {
        setTextError("قیمت نمی‌تواند خالی باشد.");
        setPriceError(true);
        return;
      }

      formData.append("name", form.name.value);
      formData.append("description", form.description.value);
      formData.append("category_id", Number(form.category_id.value));
      formData.append("price", Number(form.price.value));

      if (form.sale.checked) {
        formData.append("in_sale", true);
        formData.append("sale_price", Number(form.sale_price.value));
      } else {
        formData.append("in_sale", false);
      }
      formData.append("pic_url", preview);
      // if (preview) {
      //   formData.append("pic_url", preview);
      // }

      const token = JSON.parse(localStorage.getItem("user_data"));
      const response = await axios.post(
        `${BASE_PATH}/admin/food/add_food`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        console.log("Full response data:", response.data); // <--- Added this line for debugging
        const uploadedImageUrl = response.data.pic_url; // Adjust if backend uses a different key
        console.log("Uploaded Image URL:", uploadedImageUrl);

        // Optionally navigate or reset form here
        // navigate("/ItemManager");
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.status === 404) {
        setTextError("دسته بندی نباید خالی باشد");
        setCategoryError(true);
      } else if (error.response?.data?.detail) {
        setTextError(error.response.data.detail);
      } else {
        setTextError("خطا در ارسال اطلاعات");
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFoodImage(file);
      console.log("ssss", foodImage);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add(
      "border-adminAction",
      "dark:border-adminActionDark"
    );
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove(
      "border-adminAction",
      "dark:border-adminActionDark"
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove(
      "border-adminAction",
      "dark:border-adminActionDark"
    );
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setFoodImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleOffChange = (e) => {
    setShowOffValue(e.target.checked);
  };

  const handleDeleteImage = () => {
    setFoodImage(null);
    setPreview(null);
  };
  return (
    <>
      <div className="bg-adminBackgroundColor dark:bg-adminBackgroundColorDark h-full transition-colors duration-300">
        <div className="bg-adminBackgroundColor dark:bg-adminBackgroundColorDark h-screen overflow-y-auto scrollbar scrollbar-none overflow-x-hidden transition-colors duration-300">
          <AdminHeader />
          <div className="grid grid-cols-1 md:flex justify-center w-screen">
            <div className="bg-white dark:bg-darkpalleteDark m-2 rounded-2xl transition-colors duration-300">
              <div className="flex justify-between items-center pl-4 pt-3">
                <h1 className="text-3xl font-extrabold pr-8 py-4 dark:text-white transition-colors duration-300">
                  اضافه کردن آیتم
                </h1>
                <a href="/Itemmanager">
                  <div className="bg-white dark:bg-darkpalleteDark border-2 border-black dark:border-white p-2 rounded-2xl transition-colors duration-300">
                    <ArrowIcon
                      className={
                        "w-8 rotate-180 stroke-3 stroke-black dark:stroke-white"
                      }
                    />
                  </div>
                </a>
              </div>
              <form
                className="flex flex-col gap-4 px-8 py-4"
                onSubmit={addFood}>
                <div className="flex flex-col items-center space-y-4">
                  <div
                    className="border-2 border-dashed border-gray-300 dark:border-graypalleteDark rounded-lg p-4 text-center cursor-pointer hover:border-adminAction dark:hover:border-adminActionDark transition-colors w-full max-w-md"
                    onClick={() => fileInputRef.current.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      ref={fileInputRef}
                    />

                    {preview ? (
                      <div className="relative group">
                        <img
                          src={preview}
                          name="pic_url"
                          id="pic_url"
                          alt="pic_url"
                          className="max-h-48 mx-auto rounded-lg object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                          <span className="text-white">تغییر تصویر</span>
                        </div>
                        {preview && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteImage();
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white text-xl font-bold rounded-full flex items-center justify-center w-10 h-10 hover:bg-red-600 transition-colors duration-300">
                            ✕
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="text-gray-500 dark:text-gray-400 py-8">
                        <svg
                          className="mx-auto h-12 w-12 mb-4"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48">
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p className="text-sm">برای آپلود تصویر کلیک کنید</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          یا تصویر را اینجا رها کنید
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="نام آیتم"
                  className={`border rounded-lg p-2  dark:text-white dark:bg-darkpalleteDark transition-all duration-300 ${
                    nameError
                      ? "border-adminError dark:border-adminErrorDark placeholder:text-adminError placeholder:dark:*:text-adminErrorDark"
                      : "border-gray-300 dark:border-graypalleteDark"
                  }`}
                />
                <textarea
                  rows="4"
                  cols="50"
                  name="description"
                  id="description"
                  placeholder="توضیحات"
                  className="border border-gray-300 dark:border-graypalleteDark rounded-lg p-2 dark:bg-darkpalleteDark dark:text-white transition-colors duration-300"
                />
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <select
                    name="category_id"
                    id="category_id"
                    className={`border w-full md:w-1/2 rounded-lg p-2 text-gray-600 dark:text-gray-300 dark:bg-darkpalleteDark transition-all duration-300 ${
                      categoryError
                        ? "border-adminError dark:border-adminErrorDark"
                        : "border-gray-300 dark:border-graypalleteDark"
                    }`}
                    defaultValue="">
                    <option value="" disabled>
                      دسته بندی
                    </option>
                    <option value="1">کافه</option>
                    <option value="2">کیک و دسر</option>
                    <option value="3">نوشیدنی گرم</option>
                    <option value="4">نوشیدنی سرد</option>
                    <option value="5">غذا</option>
                  </select>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    placeholder="قیمت"
                    className={`border w-full md:w-1/2 rounded-lg p-2 dark:text-white dark:bg-darkpalleteDark transition-all duration-300 ${
                      priceError
                        ? "border-adminError dark:border-adminErrorDark placeholder:text-adminError placeholder:dark:*:text-adminErrorDark"
                        : "border-gray-300 dark:border-graypalleteDark"
                    }`}
                  />
                </div>
                <div className="max-h-fit">
                  <div className="flex items-center gap-2 pb-2">
                    <label
                      htmlFor="off"
                      className="dark:text-white transition-colors duration-300">
                      تخفیف ویژه
                    </label>
                    <input
                      type="checkbox"
                      name="sale"
                      id="sale"
                      onChange={handleOffChange}
                      checked={showOffValue}
                    />
                  </div>
                  <input
                    type="text"
                    name="sale_price"
                    id="sale_price"
                    placeholder="قیمت با تخفیف"
                    className={`border border-gray-300 dark:border-graypalleteDark rounded-lg p-2 dark:bg-darkpalleteDark dark:text-white transition-colors duration-300 ${
                      showOffValue
                        ? "opacity-100 scale-100"
                        : "opacity-0 !max-h-0 scale-0 overflow-hidden"
                    }`}
                  />
                </div>
                <button className="w-full bg-adminAction dark:bg-adminActionDark px-3 py-2 rounded-xl text-xl text-white hover:bg-adminActionDark dark:hover:bg-adminAction transition-colors duration-300">
                  اضافه کردن
                </button>
                <p className="text-adminError transition-colors duration-300">
                  {textError}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddItem;
