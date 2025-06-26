import axios from "axios";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import UseAuth from "../UseAuth";
import { BASE_PATH } from "../constants/paths";

function AdminLogin({ setCurrentPage }) {
  // const navigate = useNavigate();
  const [textError, setTextError] = useState(null);
  const { isAuthenticated } = UseAuth();

  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const data = JSON.parse(localStorage.getItem("user_data"));
      if (data.is_admin == true) {
        // navigate("/adminhome");
        setCurrentPage(1);
      } else if (data.is_waitress == true) {
        // navigate("/waiterpage");
        setCurrentPage(7);
      }
    }
  });

  async function login(e) {
    e.preventDefault();
    try {
      const formData = new FormData();

      const form = e.target;

      if (!form.username.value.trim()) {
        setTextError("نام کاربری نمی‌تواند خالی باشد.");
        setNameError(true);
        return;
      }
      formData.append("username", form.username.value);

      if (!form.password.value.trim()) {
        setTextError("پسورد نمی‌تواند خالی باشد.");
        setPasswordError(true);
        return;
      }
      formData.append("password", form.password.value);

      const data = Object.fromEntries(formData.entries());

      const response = await axios.post(
        `${BASE_PATH}/authentication/token`,
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("user_data", JSON.stringify(response.data));
        if (response.data.is_admin == true) {
          // navigate("/adminhome");
          setCurrentPage(1);
        } else if (response.data.is_waitress == true) {
          // navigate("/waiterpage");
          setCurrentPage(7);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.status === 404) {
        localStorage.removeItem("user_data");
        if (error.response?.data.detail == "Invalid Username.") {
          setTextError("نام کاربری اشتباه است.");
        } else if (error.response?.data.detail == "Invalid Password.") {
          setTextError("پسورد اشتباه است.");
        }
      }
    }
  }

  return (
    <>
      <div className="bg-adminBackgroundColor dark:bg-adminBackgroundColorDark min-h-screen flex justify-center items-center transition-colors duration-300">
        <div className="bg-white dark:bg-darkpalleteDark p-8 rounded-3xl shadow-lg max-w-md w-full mx-4 transition-colors">
          <h1 className="text-4xl font-extrabold text-center mb-8 text-darkpallete dark:text-white">
            ورود مدیریت
          </h1>
          <form className="flex flex-col gap-4" onSubmit={login}>
            <div>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="نام کاربری"
                className={`w-full p-3 rounded-xl border-2 bg-white dark:bg-darkpalleteDark text-darkpallete dark:text-white focus:border-adminPrimary dark:focus:border-adminPrimaryDark  outline-none transition-all ${
                  nameError
                    ? "border-adminError dark:border-adminErrorDark placeholder:text-adminError placeholder:dark:*:text-adminErrorDark"
                    : "border-adminBackgroundColor dark:border-graypalleteDark"
                }`}
              />
            </div>

            <div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="رمز عبور"
                className={`w-full p-3 rounded-xl border-2 bg-white dark:bg-darkpalleteDark text-darkpallete dark:text-white focus:border-adminPrimary dark:focus:border-adminPrimaryDark  outline-none transition-all ${
                  passwordError
                    ? "border-adminError dark:border-adminErrorDark placeholder:text-adminError placeholder:dark:*:text-adminErrorDark"
                    : "border-adminBackgroundColor dark:border-graypalleteDark"
                }`}
              />
            </div>

            <button
              type="submit"
              className="bg-adminAction hover:bg-adminActionHover dark:bg-adminActionDark dark:hover:bg-adminActionDark text-white font-bold py-3 rounded-xl transition-colors mt-4">
              ورود
            </button>
            <p className="text-black dark:text-white">{textError}</p>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
