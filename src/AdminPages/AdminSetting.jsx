import { useEffect, useState } from "react";
import ProfileImage from "../../public/Profile.png";
import { Icons } from "../Componnets/Icons";

const Profile_Control = ({ userData, setCurrentPage, profilePic }) => {
  return (
    <div className="m-2 w-full p-3 rounded-3xl bg-backgroundcolor dark:bg-backgroundcolorDark text-black dark:text-white">
      <div className="flex justify-between items-center">
        <div className="flex justify-center gap-3 items-center">
          <img
            src={userData.pic_url ? profilePic : ProfileImage}
            className="size-15 aspect-square object-cover rounded-2xl"
            alt="Profile Picture"
          />
          <div>
            <h1 className="font-bold text-xl text-black dark:text-white">
              {userData.full_name}
            </h1>
            <h1 className="text-md text-black dark:text-white">
              {userData.username}
            </h1>
          </div>
        </div>
        <button
          onClick={() => setCurrentPage(5)}
          className="ml-2 bg-graypallete dark:bg-graypalleteDark p-1 rounded-xl hover:scale-105 hover:bg-slowgray hover:dark:bg-slowgrayDark transition-all duration-300">
          <Icons.edit className="w-8 stroke-black dark:stroke-white transition-colors duration-300" />
        </button>
      </div>
    </div>
  );
};

const Animation_control = () => {
  const [animationControl, setAnimationControl] = useState(null);

  useEffect(() => {
    const savedAnimationControl = localStorage.getItem("animationControl");
    if (savedAnimationControl === "True") {
      setAnimationControl(true);
    } else if (savedAnimationControl === "False") {
      setAnimationControl(false);
    } else {
      setAnimationControl(null);
    }
  }, []);

  const handleAuto = () => {
    localStorage.removeItem("animationControl");
    setAnimationControl(null);
  };

  const handleOff = () => {
    localStorage.setItem("animationControl", "False");
    setAnimationControl(false);
  };

  const handleOn = () => {
    localStorage.setItem("animationControl", "True");
    setAnimationControl(true);
  };

  return (
    <div className="m-2 w-full p-2 border rounded-3xl border-highgray dark:border-graypalleteDark text-black dark:text-white">
      <h1 className="text-xl font-bold">تنظیم بخش انیمیشن</h1>
      <p className="text-xs font-light">
        با انتخاب هر کدام بخش انیمیشن برنامه تغییر میکند
      </p>
      <div className="flex justify-around items-center gap-2 pt-2">
        <button
          onClick={() => handleAuto()}
          className={`${
            animationControl == null
              ? "bg-adminAction border-black dark:border-white text-white"
              : "bg-slowAdminPrimary dark:bg-slowAdminPrimaryDark  border-adminAction text-adminAction"
          }  w-full border rounded-full transition-colors duration-300`}>
          خودکار
        </button>
        <button
          onClick={() => handleOff()}
          className={`${
            animationControl == false
              ? "bg-adminAction border-black dark:border-white text-white"
              : "bg-graypallete dark:bg-graypalleteDark border-highgray dark:border-graypalleteDark"
          } w-full border rounded-full transition-colors duration-300`}>
          غیر فعال
        </button>
        <button
          onClick={() => handleOn()}
          className={`${
            animationControl == true
              ? "bg-adminAction border-black dark:border-white text-white"
              : "bg-graypallete dark:bg-graypalleteDark border-highgray dark:border-graypalleteDark"
          } w-full border rounded-full transition-colors duration-300`}>
          فعال
        </button>
      </div>
    </div>
  );
};

const Blur_control = () => {
  const [blurControl, setBlurControl] = useState(null);

  useEffect(() => {
    const savedBlurControl = localStorage.getItem("blurControl");
    if (savedBlurControl === "True") {
      setBlurControl(true);
    } else if (savedBlurControl === "False") {
      setBlurControl(false);
    } else {
      setBlurControl(null);
    }
  }, []);

  const handleAuto = () => {
    localStorage.removeItem("blurControl");
    setBlurControl(null);
  };

  const handleOff = () => {
    localStorage.setItem("blurControl", "False");
    setBlurControl(false);
  };

  const handleOn = () => {
    localStorage.setItem("blurControl", "True");
    setBlurControl(true);
  };

  return (
    <div className="m-2 w-full p-2 border rounded-3xl border-highgray dark:border-graypalleteDark text-black dark:text-white">
      <h1 className="text-xl font-bold">تنظیم حالت شیشه ای</h1>
      <p className="text-xs font-light">
        با انتخاب هر کدام حالت شیشه ای برنامه تغییر میکند
      </p>
      <div className="flex justify-around items-center gap-2 pt-2">
        <button
          onClick={() => handleAuto()}
          className={`${
            blurControl == null
              ? "bg-adminAction border-black dark:border-white text-white"
              : "bg-slowAdminPrimary dark:bg-slowAdminPrimaryDark  border-adminAction text-adminAction"
          }  w-full border rounded-full transition-colors duration-300`}>
          خودکار
        </button>
        <button
          onClick={() => handleOff()}
          className={`${
            blurControl == false
              ? "bg-adminAction border-black dark:border-white text-white"
              : "bg-graypallete dark:bg-graypalleteDark border-highgray dark:border-graypalleteDark"
          } w-full border rounded-full transition-colors duration-300`}>
          ساده
        </button>
        <button
          onClick={() => handleOn()}
          className={`${
            blurControl == true
              ? "bg-adminAction border-black dark:border-white text-white"
              : "bg-graypallete dark:bg-graypalleteDark border-highgray dark:border-graypalleteDark"
          } w-full border rounded-full transition-colors duration-300`}>
          شیشه ای
        </button>
      </div>
    </div>
  );
};

const Theme_control = ({ setIsDark }) => {
  const [themeControl, setThemeControl] = useState(null);
  const root = document.documentElement;

  useEffect(() => {
    const savedThemeControl = localStorage.getItem("theme");
    if (savedThemeControl === "dark") {
      setThemeControl("dark");
    } else if (savedThemeControl === "light") {
      setThemeControl("light");
    } else {
      setThemeControl(null);
    }
  }, []);

  const handleAuto = () => {
    localStorage.removeItem("theme");
    setThemeControl(null);

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (prefersDark) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  };

  const handleOff = () => {
    localStorage.setItem("theme", "light");
    setThemeControl("light");
    root.classList.remove("dark");
    setIsDark(false);
  };

  const handleOn = () => {
    localStorage.setItem("theme", "dark");
    setThemeControl("dark");
    root.classList.add("dark");
    setIsDark(true);
  };

  return (
    <div className="m-2 w-full p-2 border rounded-3xl border-highgray dark:border-graypalleteDark text-black dark:text-white">
      <h1 className="text-xl font-bold">تنظیم بخش حالت تیره</h1>
      <p className="text-xs font-light">
        با انتخاب هر کدام بخش حالت تیره برنامه تغییر میکند
      </p>
      <div className="flex justify-around items-center gap-2 pt-2">
        <button
          onClick={() => handleAuto()}
          className={`${
            themeControl == null
              ? "bg-adminAction border-black dark:border-white text-white"
              : "bg-slowAdminPrimary dark:bg-slowAdminPrimaryDark  border-adminAction text-adminAction"
          }  w-full border rounded-full transition-colors duration-300`}>
          خودکار
        </button>
        {/* <button
          onClick={() => handleAuto()}
          className={`${
            themeControl == null
              ? "bg-adminAction border-black dark:border-white text-white"
              : "bg-slowAdminPrimary dark:bg-slowAdminPrimaryDark  border-adminAction text-adminAction"
          } hidden lg:block w-full border rounded-full transition-colors duration-300`}>
          دستی
        </button> */}
        <button
          onClick={() => handleOff()}
          className={`${
            themeControl == "light"
              ? "bg-adminAction border-black dark:border-white text-white"
              : "bg-graypallete dark:bg-graypalleteDark border-highgray dark:border-graypalleteDark"
          } w-full border rounded-full transition-colors duration-300`}>
          روشن
        </button>
        <button
          onClick={() => handleOn()}
          className={`${
            themeControl == "dark"
              ? "bg-adminAction border-black dark:border-white text-white"
              : "bg-graypallete dark:bg-graypalleteDark border-highgray dark:border-graypalleteDark"
          } w-full border rounded-full transition-colors duration-300`}>
          تاریک
        </button>
      </div>
    </div>
  );
};

export default function AdminSetting({
  setIsDark,
  userData,
  setCurrentPage,
  profilePic,
}) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // For flashing on LOADING PAGE
    setIsPageLoaded(true);
  }, []);

  return (
    <>
      <div
        className={`${
          isPageLoaded
            ? "transition-colors duration-300"
            : "transition-none duration-0"
        } bg-adminBackgroundColor dark:bg-adminBackgroundColorDark w-screen min-h-screen`}>
        <div className="w-full flex justify-center items-center">
          <div className="grid grid-cols-1 w-full m-3 md:w-1/2 xl:w-1/3 bg-slowgray dark:bg-slowgrayDark rounded-3xl">
            <div className="flex justify-between items-center m-6">
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
            <div className="col-span-1 flex justify-center items-start w-full animate-move-up">
              <Profile_Control
                userData={userData}
                setCurrentPage={setCurrentPage}
                profilePic={profilePic}
              />
            </div>
            <div className="col-span-1 flex justify-center items-start w-full animate-move-up">
              <Animation_control />
            </div>
            <div className="col-span-1 flex justify-center items-start w-full animate-move-up delay-1">
              <Blur_control />
            </div>
            <div className="col-span-1 flex justify-center items-start w-full animate-move-up delay-2">
              <Theme_control setIsDark={setIsDark} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
