import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_PATH } from "../constants/paths";

import AdminHeader from "./AdminHeader.jsx";

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

export default function AddWaiter() {
  const navigate = useNavigate();

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

    const token = JSON.parse(localStorage.getItem("user_data"));

    try {
      const response = await axios.post(
        `${BASE_PATH}/admin/waitress/create_waitress`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      navigate(-1);
    } catch (err) {
      setError("خطا در ثبت گارسون جدید");
    }
  };

  return (
    <div className="min-h-screen bg-adminBackgroundColor dark:bg-adminBackgroundColorDark transition-colors duration-300">
      <AdminHeader />

      <div className="flex-1 flex items-center justify-center px-2">
        <div className="w-full max-w-md bg-white dark:bg-darkpalleteDark rounded-2xl shadow-lg p-5 transition-colors duration-300 animate-scale-up">
          <div className="flex justify-between items-center pb-4">
            <h1 className="text-xl md:text-3xl font-extrabold dark:text-white transition-colors duration-300">
              افزودن گارسون جدید
            </h1>
            <a href="/itemmanager">
              <div className="bg-white dark:bg-darkpalleteDark border-2 border-black dark:border-white p-2 rounded-2xl transition-colors duration-300">
                <ArrowIcon
                  className={
                    "w-8 rotate-180 stroke-3 stroke-black dark:stroke-white"
                  }
                />
              </div>
            </a>
          </div>
          {/* <h1 className="text-2xl lg:text-4xl font-extrabold text-black dark:text-white text-center mb-6 transition-colors duration-300">
            افزودن گارسون جدید
          </h1> */}

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
