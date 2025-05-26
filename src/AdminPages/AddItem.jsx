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
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const [textError, setTextError] = useState(null);
  const navigate = useNavigate();

  const [nameError, setNameError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);

  async function addFood(e) {
    e.preventDefault();

    try {
      const formData = new FormData();

      const form = e.target;
      if (!form.name.value.trim()) {
        setTextError("نام آیتم نمی‌تواند خالی باشد.");
        setNameError(true);
        return;
      }
      formData.append("name", form.name.value);
      formData.append("description", form.description.value);
      formData.append("category_id", Number(form.category_id.value));
      formData.append("price", Number(form.price.value));
      if (!form.price.value.trim()) {
        setTextError("قیمت نمی‌تواند خالی باشد.");
        setPriceError(true);
        return;
      }

      if (form.sale.checked) {
        formData.append("in_sale", true);
        formData.append("sale_price", Number(form.sale_price.value));
      } else {
        formData.append("in_sale", false);
        // formData.append("sale_price", null);
      }
      if (form.profile_image.files.length > 0) {
        formData.append("pic_url", form.profile_image.files[0]);
      }
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
        console.log("Item added successfully:", response.data);
        navigate("/ItemManager");
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
  }

  const handleOffChange = (e) => {
    setShowOffValue(e.target.checked);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-adminAction");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-adminAction");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-adminAction");
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewUrl(imageUrl);
    }
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
                  <div className="bg-white dark:bg-darkpalleteDark border-2 p-2 rounded-2xl transition-colors duration-300">
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
                <div
                  className="border-2 border-dashed border-gray-300 dark:border-graypalleteDark rounded-lg p-4 text-center cursor-pointer hover:border-adminAction dark:hover:border-adminActionDark transition-colors"
                  onClick={() => fileInputRef.current.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}>
                  <input
                    type="file"
                    accept="image/*"
                    name="profile_image"
                    id="profile_image"
                    className="hidden"
                    onChange={handleImageSelect}
                    ref={fileInputRef}
                  />
                  {previewUrl ? (
                    <div className="relative group">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                        <span className="text-white">تغییر تصویر</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-500 dark:text-gray-400">
                      <p>برای آپلود تصویر کلیک کنید</p>
                      <p className="text-sm">یا تصویر را اینجا رها کنید</p>
                    </div>
                  )}
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
                      nameError
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
                <button className="bg-adminAction text-white py-2 rounded-lg hover:bg-adminActionHover transition-all">
                  اضافه کردن
                </button>
                <p className="dark:text-white transition-colors duration-300">
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
