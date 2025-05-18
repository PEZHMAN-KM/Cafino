import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
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

    if (response.status === 200) {
      navigate("/adminhome");
    } else if (response.status === 401) {
      localStorage.clear();
    }
  }

  async function login(e) {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      const response = await axios.post("http://127.0.0.1:8000/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        localStorage.setItem("access_token", response.data.access_token);
        navigate("/adminhome");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.status === 401) {
        localStorage.clear();
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
                className="w-full p-3 rounded-xl border-2 border-adminBackgroundColor dark:border-graypalleteDark bg-white dark:bg-darkpalleteDark text-darkpallete dark:text-white focus:border-adminPrimary dark:focus:border-adminPrimaryDark outline-none transition-all"
              />
            </div>

            <div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="رمز عبور"
                className="w-full p-3 rounded-xl border-2 border-adminBackgroundColor dark:border-graypalleteDark bg-white dark:bg-darkpalleteDark text-darkpallete dark:text-white focus:border-adminPrimary dark:focus:border-adminPrimaryDark outline-none transition-all"
              />
            </div>

            <button
              type="submit"
              className="bg-adminAction hover:bg-adminActionHover dark:bg-adminActionDark dark:hover:bg-adminActionDark text-white font-bold py-3 rounded-xl transition-colors mt-4">
              ورود
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
