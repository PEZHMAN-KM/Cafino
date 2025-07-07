import { useEffect, useRef, useState } from "react";

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
              ? "bg-primary border-black dark:border-white text-white"
              : "bg-slowprimary dark:bg-slowprimaryDark  border-primary text-primary"
          }  w-full border rounded-full transition-colors duration-300`}>
          خودکار
        </button>
        <button
          onClick={() => handleOff()}
          className={`${
            animationControl == false
              ? "bg-primary border-black dark:border-white text-white"
              : "bg-graypallete dark:bg-graypalleteDark border-highgray dark:border-graypalleteDark"
          } w-full border rounded-full transition-colors duration-300`}>
          غیر فعال
        </button>
        <button
          onClick={() => handleOn()}
          className={`${
            animationControl == true
              ? "bg-primary border-black dark:border-white text-white"
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
              ? "bg-primary border-black dark:border-white text-white"
              : "bg-slowprimary dark:bg-slowprimaryDark  border-primary text-primary"
          }  w-full border rounded-full transition-colors duration-300`}>
          خودکار
        </button>
        <button
          onClick={() => handleOff()}
          className={`${
            blurControl == false
              ? "bg-primary border-black dark:border-white text-white"
              : "bg-graypallete dark:bg-graypalleteDark border-highgray dark:border-graypalleteDark"
          } w-full border rounded-full transition-colors duration-300`}>
          ساده
        </button>
        <button
          onClick={() => handleOn()}
          className={`${
            blurControl == true
              ? "bg-primary border-black dark:border-white text-white"
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
              ? "bg-primary border-black dark:border-white text-white"
              : "bg-slowprimary dark:bg-slowprimaryDark  border-primary text-primary"
          }  w-full border rounded-full transition-colors duration-300`}>
          خودکار
        </button>
        {/* <button
          onClick={() => handleAuto()}
          className={`${
            themeControl == null
              ? "bg-primary border-black dark:border-white text-white"
              : "bg-slowprimary dark:bg-slowprimaryDark  border-primary text-primary"
          } hidden lg:block w-full border rounded-full transition-colors duration-300`}>
          دستی
        </button> */}
        <button
          onClick={() => handleOff()}
          className={`${
            themeControl == "light"
              ? "bg-primary border-black dark:border-white text-white"
              : "bg-graypallete dark:bg-graypalleteDark border-highgray dark:border-graypalleteDark"
          } w-full border rounded-full transition-colors duration-300`}>
          روشن
        </button>
        <button
          onClick={() => handleOn()}
          className={`${
            themeControl == "dark"
              ? "bg-primary border-black dark:border-white text-white"
              : "bg-graypallete dark:bg-graypalleteDark border-highgray dark:border-graypalleteDark"
          } w-full border rounded-full transition-colors duration-300`}>
          تاریک
        </button>
      </div>
    </div>
  );
};

export default function Setting({
  setFooterShrink,
  setHeaderMenuOpen,
  setHeaderShrink,
  setIsDark,
}) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // SCROLL FOOTER -------------------------------------------------
  const lastScrollTop = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollTop =
            window.pageYOffset || document.documentElement.scrollTop;

          const scrollingDown = currentScrollTop > lastScrollTop.current + 2;
          const scrollingUp = currentScrollTop < lastScrollTop.current - 2;

          if (currentScrollTop <= 20) {
            setHeaderShrink(false);
          } else {
            setHeaderShrink(true);
          }

          if (scrollingDown) {
            setFooterShrink(true);
            setHeaderMenuOpen(false);
          } else if (scrollingUp) {
            setFooterShrink(false);
            setHeaderMenuOpen(false);
          }

          lastScrollTop.current = Math.max(0, currentScrollTop);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // ----------------------------------------------------------------

  useEffect(() => {
    // For flashing on LOADING PAGE
    setIsPageLoaded(true);
  }, []);

  return (
    <>
      <div
        style={{ WebkitOverflowScrolling: "touch" }}
        className={`${
          isPageLoaded
            ? "transition-colors duration-300"
            : "transition-none duration-0"
        } bg-backgroundcolor dark:bg-backgroundcolorDark w-screen min-h-screen overflow-x-hidden h-full pb-22 pt-18 md:pt-20`}>
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {/* ------------------------------------------ Profile BUTTON ------------------------------------------ */}
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
    </>
  );
}
