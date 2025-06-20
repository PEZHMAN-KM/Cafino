import landingImage from "../../public/landing.jpg";

function Landing({ setCurrentPage }) {
  return (
    <>
      <div className="flex justify-baseline items-center flex-col bg-black w-screen h-screen overflow-hidden">
        <div className="flex justify-center items-center md:items-start w-screen">
          <img
            className="object-cover w-screen h-full md:w-3/4 md:h-2/3 md:object-bottom"
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
            <button
              onClick={() => {
                if ("vibrate" in navigator && typeof window !== "undefined") {
                  navigator.vibrate(10);
                }
                setCurrentPage(1);
              }}
              className="px-15 py-3 bg-primary mt-5 rounded-2xl text-2xl font-medium  hover:bg-subprimary hover:text-primaryDark transition-colors duration-300">
              منوی سفارشات
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
