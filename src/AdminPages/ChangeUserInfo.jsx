import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BASE_PATH } from "../constants/paths";
import { Icons } from "../Componnets/Icons";

function ChangeUserInfo({ setCurrentPage }) {
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
        console.log();

        setUserInfo(data);
        if (data.pic_url) getProfilePic();
      }
    } catch (error) {
      console.error("مشکل در خواندن اطلاعات:", error);
    }
  };

  async function getProfilePic() {
    try {
      const token = JSON.parse(localStorage.getItem("user_data"));
      const response = await axios.post(
        `${BASE_PATH}/userget_user_picture`,
        { user_id: token.userID },
        {
          headers: { "Content-Type": "application/json" },
          responseType: "blob",
        }
      );

      const imageBlob = response.data;
      const imageUrl = URL.createObjectURL(imageBlob);
      setPreview(imageUrl);
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  }

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
          setCurrentPage(0);
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
      formData.append("pic", userInfo.pic_url);
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

    if (formData.pic !== null) {
      try {
        const response = await axios.put(
          `${BASE_PATH}/user/update_user_pic`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token.access_token}`,
            },
          }
        );
        if (response.status === 200) {
          setCurrentPage(0);
        }
      } catch (error) {
        console.error(
          "مشکل در بروز رسانی اطلاعات کاربری:",
          error.response?.data || error.message
        );
      }
    } else {
      try {
        const response = await axios.put(
          `${BASE_PATH}/user/delete_user_pic`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access_token}`,
            },
          }
        );
        if (response.status === 200) {
          setCurrentPage(0);
        }
      } catch (error) {
        console.error(
          "مشکل در بروز رسانی اطلاعات کاربری:",
          error.response?.data || error.message
        );
      }
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

  return (
    <div className="min-h-screen bg-adminBackgroundColor dark:bg-adminBackgroundColorDark transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white dark:bg-darkpalleteDark rounded-3xl shadow-lg p-6 transition-colors duration-300">
          <div className="flex justify-between items-center my-6">
            <h1 className="text-3xl font-extrabold text-center dark:text-white transition-colors duration-300">
              تنظیمات
            </h1>
            <button
              onClick={() => {
                setCurrentPage(0);
              }}
              className="bg-white dark:bg-darkpalleteDark border-2 border-black dark:border-white p-2 rounded-2xl transition-colors duration-300">
              <Icons.arrow className="w-8 rotate-180 stroke-3 stroke-black dark:stroke-white" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3">
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

            <div className="flex flex-col justify-center gap-3 md:flex-row max-w-full">
              {/* Username Field */}
              <div className="w-full">
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
              <div className="w-full">
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
            </div>

            {/* Password Field */}
            <div className="bg-adminBackgroundColor dark:bg-adminBackgroundColorDark rounded-3xl bg p-3">
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
