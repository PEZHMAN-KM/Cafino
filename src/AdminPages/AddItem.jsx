import AdminHeader from "./AdminHeader";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    ConectToBack();
  });

  async function ConectToBack() {
    const token = localStorage.getItem("access_token");
    const response = await fetch("http://127.0.0.1:8000/check-token", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      navigate("/adminlogin");
      localStorage.clear();
    }
  }

  async function addFood(e) {
    e.preventDefault();

    try {
      // const formData = new FormData(e.target);
      // formData.append("profile_image", e.target.profile_image.files[0]);

      // formData.append("name", e.target.name.value);
      // formData.append("description", e.target.description.value);
      // formData.append("category_id", Number(e.target.category_id.value));
      // formData.append("price", Number(e.target.price.value));
      // formData.append(
      //   "discount_price",
      //   Number(e.target.discount_price.value) || ""
      // );
      // فرض می‌کنیم اطلاعات غذای جدید داخل این متغیرها هست
      const foodData = {
        name: "Pizza Margherita", // نام غذا
        description: "A classic pizza with fresh tomatoes and mozzarella.", // توضیحات
        price: 15.99, // قیمت
        discount_price: 12.99, // قیمت تخفیف خورده
        category_id: 1, // دسته‌بندی غذا
      };

      // گرفتن فایل عکس (اگر موجود باشه)
      const foodImage = null;

      const formData = new FormData();
      formData.append("name", foodData.name);
      formData.append("description", foodData.description);
      formData.append("price", foodData.price);
      formData.append("discount_price", foodData.discount_price);
      formData.append("category_id", foodData.category_id);

      if (foodImage) {
        formData.append("profile_image", foodImage);
      }

      const token = localStorage.getItem("access_token");

      // ارسال درخواست POST به بک‌اند برای اضافه کردن غذا
      const response = axios.post("http://127.0.0.1:8001/add-food", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // نوع محتوا برای ارسال فایل
        },
      });

      if (response.status === 200) {
        console.log("Item added successfully:", response.data);
        // navigate("/itemmanager");
      }
    } catch (error) {
      console.error("Add item error:", error);
      if (error.response?.status === 401) {
        // localStorage.clear();
        // navigate("/adminlogin");
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
                  className="border border-gray-300 rounded-lg p-2"
                />
                <textarea
                  rows="4"
                  cols="50"
                  name="description"
                  id="description"
                  placeholder="توضیحات"
                  className="border border-gray-300 rounded-lg p-2"
                />
                <div className="flex items-center gap-2">
                  <select
                    name="category_id"
                    id="category_id"
                    className="border w-1/2 border-gray-300 rounded-lg p-2 text-gray-600"
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
                    name="discount_price"
                    id="discount_price"
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
