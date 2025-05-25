import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { BASE_PATH } from "./constants/paths";

function UseAuth() {
  // const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("user_data"));
    async function Authorize() {
      if (!token) {
        // navigate("/adminlogin");
        setIsAuthenticated(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_PATH}/user/get_self_info`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        });

        if (response.status === 200) {
          console.log("توکن اکسپایر نشده");
          setIsAuthenticated(true);
        } else if (response.status === 401) {
          await refreshToken();
        } else {
          logout();
        }
      } catch (error) {
        console.error("خطا در بررسی توکن:", error);
        logout();
      }
    }

    async function refreshToken() {
      try {
        const response = await fetch(
          `${BASE_PATH}/authentication/refresh_token`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token.refresh_token}`,
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          localStorage.setItem("user_data", JSON.stringify(data));
          console.log("توکن رفرش شده است");
          setIsAuthenticated(true);
        } else {
          logout();
        }
      } catch (error) {
        console.error("خطا در رفرش توکن:", error);
        logout();
      }
    }

    function logout() {
      console.log("توکن ها مشکل دارن");
      localStorage.removeItem("user_data");
      // navigate("/adminlogin");
    }

    Authorize();
  });

  return { isAuthenticated };
}

export default UseAuth;
