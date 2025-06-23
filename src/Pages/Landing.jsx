import { useEffect, useState } from "react";
import landingImage from "../../public/landing.jpg";

function Landing({ setCurrentPage, setHeaderMenuOpen, goHome }) {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    window.addEventListener("load", () => {
      setShowImage(true);
    });
  }, []);

  return (
    <>
      <div className="flex justify-baseline items-center flex-col bg-black w-screen h-screen overflow-hidden">
        <div className="flex justify-center items-center md:items-start w-screen">
          <img
            className="object-cover w-screen h-full md:w-3/4 md:h-2/3 md:object-bottom pointer-events-none touch-none animate-opacity-up"
            src={landingImage}
            alt=""
          />
        </div>
        <div className="flex justify-center items-center flex-col absolute bottom-0 pb-20 w-screen pt-20 text-white bg-gradient-to-b from-0% to-black">
          <div className="flex justify-center items-center flex-col">
            <div className="flex justify-center items-center flex-col gap-2.5">
              <h1 className="text-6xl font-black">کافـی نـو</h1>
              <h3 className="text-base">لوکیشن: مازندران. بـابل. نوشیروانی</h3>
              <h3 className="text-sm text-highgray">
                همه روزه ساعت 9 الی 23 شب
              </h3>
            </div>
            {/* --------------------------- WELCOME BUTTON -------------------------- */}
            <button
              onClick={() => {
                if ("vibrate" in navigator && typeof window !== "undefined") {
                  navigator.vibrate(10);
                }
                setCurrentPage(1);
                goHome();
                setHeaderMenuOpen(false);
              }}
              className="px-15 py-3 bg-primary mt-5 rounded-2xl text-2xl font-medium hover:bg-subprimary hover:text-primaryDark transition-colors duration-300">
              منوی سفارشات
            </button>
            {/* ----------------------------- EASY MODE ----------------------------- */}
            <button
              onClick={() => {
                if ("vibrate" in navigator && typeof window !== "undefined") {
                  navigator.vibrate(10);
                }
                setCurrentPage(6);
              }}
              className="mt-2 text-base font-normal bg-darkpallete hover:bg-darkpalleteDark px-3 py-1 rounded-3xl hover:scale-105 transition-all duration-300">
              لیست ساده غذاها
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
