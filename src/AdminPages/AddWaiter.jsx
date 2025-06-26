import React, { useRef, useState } from "react";
import axios from "axios";
import { BASE_PATH } from "../constants/paths";

import { Icons } from "../Componnets/Icons.jsx";

export default function AddWaiter({ setCurrentPage }) {
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [fullNameError, setFullNameError] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNameError(false);
    setFullNameError(false);
    setFullNameError(false);

    const formData = new FormData();
    const form = e.target;

    if (!form.username.value.trim()) {
      setError("نام کاربری نمی‌تواند خالی باشد.");
      setNameError(true);
      return;
    }
    if (!form.password.value.trim()) {
      setError("پسورد نباید خالی باشد");
      setPasswordError(true);
      return;
    }
    if (!form.full_name.value.trim()) {
      setError("نام و نام خانوادگی نباید خالی باشد.");
      setFullNameError(true);
      return;
    }
    formData.append("username", form.username.value);
    formData.append("password", form.password.value);
    formData.append("full_name", form.full_name.value);

    if (preview) {
      formData.append("pic", waiterImage);
    }

    const token = JSON.parse(localStorage.getItem("user_data"));

    try {
      const response = await axios.post(
        `${BASE_PATH}/admin/waitress/create_waitress`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setCurrentPage(2);
    } catch (err) {
      setError("خطا در ثبت گارسون جدید");
    }
  };

  // IMAGE INPUT HANDLEER -------------------------------
  const [waiterImage, setWaiterImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setWaiterImage(file);
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
      setWaiterImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleDeleteImage = () => {
    setWaiterImage(null);
    setPreview(null);
  };

  return (
    <div className="min-h-screen bg-adminBackgroundColor dark:bg-adminBackgroundColorDark transition-colors duration-300">
      <div className="flex-1 flex items-center justify-center px-2">
        <div className="w-full max-w-md bg-white dark:bg-darkpalleteDark rounded-2xl shadow-lg p-5 transition-colors duration-300 animate-scale-up">
          <div className="flex justify-between items-center pb-4">
            <h1 className="text-xl md:text-3xl font-extrabold dark:text-white transition-colors duration-300">
              افزودن گارسون جدید
            </h1>
            <button
              onClick={() => {
                setCurrentPage(2);
              }}>
              <div className="bg-white dark:bg-darkpalleteDark border-2 border-black dark:border-white p-2 rounded-2xl transition-colors duration-300">
                <Icons.arrow
                  className={
                    "w-8 rotate-180 stroke-3 stroke-black dark:stroke-white"
                  }
                />
              </div>
            </button>
          </div>
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
                <Icons.addImage className="mx-auto h-12 w-12 mb-4" />
                <p className="text-sm">برای آپلود تصویر کلیک کنید</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  یا تصویر را اینجا رها کنید
                </p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-lg font-bold text-black dark:text-white mb-2 transition-colors duration-300">
                نام کاربری
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="username"
                dir="ltr"
                className={`border w-full rounded-lg p-2 dark:text-white dark:bg-darkpalleteDark transition-all duration-300 ${
                  nameError
                    ? "border-adminError dark:border-adminErrorDark placeholder:text-adminError placeholder:dark:*:text-adminErrorDark"
                    : "border-gray-300 dark:border-graypalleteDark"
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-lg font-bold text-black dark:text-white mb-2 transition-colors duration-300">
                رمز عبور
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
                dir="ltr"
                className={`border w-full rounded-lg p-2 dark:text-white dark:bg-darkpalleteDark transition-all duration-300 ${
                  passwordError
                    ? "border-adminError dark:border-adminErrorDark placeholder:text-adminError placeholder:dark:*:text-adminErrorDark"
                    : "border-gray-300 dark:border-graypalleteDark"
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="full_name"
                className="block text-lg font-bold text-black dark:text-white mb-2 transition-colors duration-300">
                نام و نام خانوادگی
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                placeholder="نام و نام خانوادگی"
                className={`border w-full rounded-lg p-2 dark:text-white dark:bg-darkpalleteDark transition-all duration-300 ${
                  fullNameError
                    ? "border-adminError dark:border-adminErrorDark placeholder:text-adminError placeholder:dark:*:text-adminErrorDark"
                    : "border-gray-300 dark:border-graypalleteDark"
                }`}
              />
            </div>

            {error && (
              <p className="text-adminError transition-colors duration-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-adminAction dark:bg-adminActionDark px-3 py-2 rounded-xl text-xl text-white hover:bg-adminActionDark dark:hover:bg-adminAction transition-colors duration-300">
              افزودن گارسون
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
