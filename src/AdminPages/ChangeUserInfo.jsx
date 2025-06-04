import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import axios from "axios";
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

function ChangeUserInfo() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    full_name: "",
    pic_url: null,
  });
  const fileInputRef = useRef(null);

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
      handleImageChange({ target: { files: [file] } });
    }
  };
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user_data"));
      const response = await fetch(`${BASE_PATH}/user/get_self_info`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserInfo(data);
        if (data.pic_url) setPreview(data.pic_url);
      }
    } catch (error) {
      console.error("مشکل در خواندن اطلاعات:", error);
    }
  };

  const handleDeleteImage = () => {
    setUserInfo({ ...userInfo, pic_url: null });
    setPreview(null);
  };

  const handleUnEmplymentUser = async () => {
    if (window.confirm("آیا از حذف حساب کاربری خود مطمئن هستید؟")) {
      try {
        const token = JSON.parse(localStorage.getItem("user_data"));

        const response = await fetch(`${BASE_PATH}/user/self_unemplyment`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        });

        if (response.ok) {
          localStorage.removeItem("user_data");
          navigate("/adminlogin");
        }
      } catch (error) {
        console.error("مشکل در استعفا دادن کاربر:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (userInfo.username) formData.append("username", userInfo.username);
    if (userInfo.full_name) formData.append("full_name", userInfo.password);
    if (userInfo.password) formData.append("password", userInfo.password);

    // Handle image upload
    if (userInfo.pic_url instanceof File) {
      formData.append("pic_url", userInfo.pic_url);
    }

    const token = JSON.parse(localStorage.getItem("user_data"));
    // try {
    //   const response = await fetch(
    //     `${BASE_PATH}/user/update_self_info`,
    //     {
    //       method: "PUT",
    //       headers: {
    //         Authorization: `Bearer ${token.access_token}`,
    //       },
    //       body: formData,
    //     }
    //   );

    //   if (response.ok) {
    //     alert("اطلاعات با موفقیت بروزرسانی شد");
    //     getUserInfo();
    //   }
    // } catch (error) {
    //   console.error("مشکل در بروز رسانی اطلاعات کاربری:", error);
    // }

    try {
      const response = await axios.put(`${BASE_PATH}/user/update_user_pic`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token.access_token}`,
        },
        body: userInfo.pic_url,
      });

      if (response.ok) {
        alert("اطلاعات با موفقیت بروزرسانی شد");
        getUserInfo();
      }
    } catch (error) {
      console.error("مشکل در بروز رسانی اطلاعات کاربری:", error);
    }
  };

  // Update handleImageChange function
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      // Store the actual file object
      setUserInfo({ ...userInfo, pic_url: file });
      // Create preview URL
      setPreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (localStorage.getItem("theme") == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/adminhome"); // fallback
    }
  };

  return (
    <div className="min-h-screen bg-adminBackgroundColor dark:bg-adminBackgroundColorDark transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-darkpalleteDark rounded-3xl shadow-lg p-6 transition-colors duration-300">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-extrabold text-center dark:text-white transition-colors duration-300">
              تنظیمات
            </h1>
            <button onClick={goBack}>
              <div className="bg-white dark:bg-darkpalleteDark border-2 border-black dark:border-white p-2 rounded-2xl transition-colors duration-300">
                <ArrowIcon className="w-8 rotate-180 stroke-3 stroke-black dark:stroke-white" />
              </div>
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
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
                      alt="Profile"
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

            {/* Username Field */}
            <div>
              <label className="block text-gray-700 dark:text-white mb-2">
                نام کاربری
              </label>
              <input
                type="text"
                value={userInfo.username || ""}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, username: e.target.value })
                }
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-adminPrimary dark:focus:ring-adminPrimaryDark"
              />
            </div>

            {/* full_name Field */}
            <div>
              <label className="block text-gray-700 dark:text-white mb-2">
                نام و نام خانوادگی
              </label>
              <input
                type="text"
                value={userInfo.full_name || ""}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, full_name: e.target.value })
                }
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-adminPrimary dark:focus:ring-adminPrimaryDark"
              />
            </div>

            {/* Password Field */}
            <div className="bg-adminBackgroundColor dark:bg-adminBackgroundColorDark rounded-3xl bg p-4">
              <label className="block text-gray-700 dark:text-white mb-2">
                رمز عبور جدید
              </label>
              <input
                type="password"
                onChange={(e) =>
                  setUserInfo({ ...userInfo, password: e.target.value })
                }
                className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-adminPrimary dark:focus:ring-adminPrimaryDark"
              />
              <p className="text-sm font-light text-slowgrayDark dark:text-slowprimary pt-1">
                در صورتی که مایل به تغییر پسورد هستید این بخش را با پسورد جدید
                پر کنید
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <button
                type="submit"
                className="bg-adminAction dark:bg-adminActionDark px-3 py-2 rounded-xl text-xl text-white hover:bg-adminActionDark dark:hover:bg-adminAction transition-colors duration-300">
                ذخیره تغییرات
              </button>
              <button
                type="button"
                onClick={handleUnEmplymentUser}
                className="bg-white dark:bg-darkpalleteDark border-adminError dark:border-adminErrorDark border-2 px-3 py-2 rounded-xl text-xl text-adminError dark:text-adminErrorDark hover:bg-adminError hover:text-white dark:hover:bg-adminErrorDark transition-all duration-300">
                حذف حساب کاربری
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangeUserInfo;
