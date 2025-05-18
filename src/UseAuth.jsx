import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UseAuth() {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(() => {
    return localStorage.getItem("access_token") || null;
  });

  useEffect(() => {
    async function Authorize() {
      const token = localStorage.getItem("access_token");
      if (!token) {
        navigate("/adminlogin");
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/check-token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          console.log("OK!!");
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
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        logout();
        return;
      }
      try {
        const response = await fetch("http://127.0.0.1:8000/refresh-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (response.status === 200) {
          const data = await response.json();
          localStorage.setItem("access_token", data.access_token);
          setUserToken(data.access_token);
          console.log("OK!!");
        } else {
          logout();
        }
      } catch (error) {
        console.error("خطا در رفرش توکن:", error);
        logout();
      }
    }

    function logout() {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      setUserToken(null);
      navigate("/adminlogin");
    }

    Authorize();
  }, [navigate]);

  return { userToken };
}

export default UseAuth;
