import itemImage from "../../public/Banner.jpg";
import { useEffect, useState } from "react";

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
const Like = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <path d="M8.96173 18.9109L9.42605 18.3219L8.96173 18.9109ZM12 5.50063L11.4596 6.02073C11.601 6.16763 11.7961 6.25063 12 6.25063C12.2039 6.25063 12.399 6.16763 12.5404 6.02073L12 5.50063ZM15.0383 18.9109L15.5026 19.4999L15.0383 18.9109ZM9.42605 18.3219C7.91039 17.1271 6.25307 15.9603 4.93829 14.4798C3.64922 13.0282 2.75 11.3345 2.75 9.1371H1.25C1.25 11.8026 2.3605 13.8361 3.81672 15.4758C5.24723 17.0866 7.07077 18.3752 8.49742 19.4999L9.42605 18.3219ZM2.75 9.1371C2.75 6.98623 3.96537 5.18252 5.62436 4.42419C7.23607 3.68748 9.40166 3.88258 11.4596 6.02073L12.5404 4.98053C10.0985 2.44352 7.26409 2.02539 5.00076 3.05996C2.78471 4.07292 1.25 6.42503 1.25 9.1371H2.75ZM8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.6599C10.6739 20.9854 11.3096 21.25 12 21.25V19.75C11.6904 19.75 11.3261 19.6293 10.8736 19.3648C10.4213 19.1005 9.95208 18.7366 9.42605 18.3219L8.49742 19.4999ZM15.5026 19.4999C16.9292 18.3752 18.7528 17.0866 20.1833 15.4758C21.6395 13.8361 22.75 11.8026 22.75 9.1371H21.25C21.25 11.3345 20.3508 13.0282 19.0617 14.4798C17.7469 15.9603 16.0896 17.1271 14.574 18.3219L15.5026 19.4999ZM22.75 9.1371C22.75 6.42503 21.2153 4.07292 18.9992 3.05996C16.7359 2.02539 13.9015 2.44352 11.4596 4.98053L12.5404 6.02073C14.5983 3.88258 16.7639 3.68748 18.3756 4.42419C20.0346 5.18252 21.25 6.98623 21.25 9.1371H22.75ZM14.574 18.3219C14.0479 18.7366 13.5787 19.1005 13.1264 19.3648C12.6739 19.6293 12.3096 19.75 12 19.75V21.25C12.6904 21.25 13.3261 20.9854 13.8832 20.6599C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999L14.574 18.3219Z"></path>{" "}
    </g>
  </svg>
);

// This component is used to display the size options for the item. (Not used in the current version)
const Size = () => (
  <div className="p-2">
    <h1 className="text-2xl font-bold p-1 dark:text-white transition-colors duration-300">
      اندازه
    </h1>
    <div className="flex justify-between items-center px-2 pt-3">
      <button className="border-2 border-primary dark:border-primaryDark bg-slowprimary dark:bg-subprimaryDark w-30 px-8 py-3 rounded-2xl transition-colors duration-300">
        کوچک
      </button>
      <button className="border-2 border-slowgray dark:border-graypalleteDark bg-white dark:bg-darkpalleteDark w-30 px-8 py-3 rounded-2xl transition-colors duration-300">
        متوسط
      </button>
      <button className="border-2 border-slowgray dark:border-graypalleteDark bg-white dark:bg-darkpalleteDark w-30 px-8 py-3 rounded-2xl transition-colors duration-300">
        بزرگ
      </button>
    </div>
  </div>
);

const NamePanel = ({ className }) => (
  <div className={className}>
    <div className="p-2 bg-slowprimary dark:bg-subprimaryDark rounded-2xl border-1 border-primary dark:border-primaryDark transition-colors duration-300">
      <h1 className="text-2xl font-extrabold p-1 dark:text-white transition-colors duration-300">
        کافه موکا
      </h1>
      <h3 className="text-xl font-bold p-1 pt-0 dark:text-slowgray transition-colors duration-300">
        گرم
      </h3>
    </div>
  </div>
);

const Description = ({ className }) => (
  <div className={className}>
    <div className="p-2">
      <h1 className="text-2xl font-bold p-1 dark:text-white transition-colors duration-300">
        توضیحات
      </h1>
      <p className="px-3 pt-1 dark:text-slowgray transition-colors duration-300">
        250 میلی لیتر. یک شات اسپرسو 20% عربیکا و 80% روبوستا. شیر. سیروپ کارامل
      </p>
    </div>
  </div>
);

function Item() {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("theme") == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  });

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };
  return (
    <>
      <div className="lg:flex">
        <div className="overflow-auto lg:flex-1/2 xl:flex-1/3 lg:flex lg:justify-center lg:items-center bg-backgroundcolor dark:bg-backgroundcolorDark pb-25 lg:pb-0 h-screen overflow-x-hidden transition-colors duration-300">
          <div className="relative lg:absolute">
            <img
              className="w-screen aspect-square object-cover p-2 rounded-3xl"
              src={itemImage}
              alt=""
            />
            <div className="flex lg:justify-between p-2 lg:items-center lg:gap-2">
              <div className="absolute lg:static lg:top-auto lg:left-auto lg:w-1/2 lg:pt-0 top-5 right-5">
                <button
                  onClick={handleLikeClick}
                  className={`bg-white dark:bg-darkpalleteDark p-5 rounded-2xl lg:w-full flex items-center gap-3 text-highgray dark:text-highgrayDark transition-all duration-200 group
                  ${
                    isLiked
                      ? "bg-slowprimary dark:bg-darkpalleteDark text-red-500"
                      : "hover:bg-slowprimary dark:hover:bg-subprimaryDark hover:text-black dark:hover:text-white"
                  }`}>
                  <Like
                    className={`w-8 transition-all duration-200 
                    ${
                      isLiked
                        ? "stroke-red-500 fill-red-500"
                        : "stroke-highgray dark:stroke-highgrayDark fill-highgray dark:fill-highgrayDark group-hover:fill-black dark:group-hover:fill-white group-hover:stroke-black dark:group-hover:stroke-white"
                    }`}
                  />
                  <h1 className="hidden lg:block text-2xl font-bold dark:text-white">
                    علاقه مندی
                  </h1>
                </button>
              </div>
              <div className="absolute lg:static lg:top-auto lg:right-auto lg:w-1/2 lg:pt-0 top-5 left-5">
                <a href="Home">
                  <div className="bg-white dark:bg-darkpalleteDark p-5 rounded-2xl lg:w-full flex items-center text-highgray dark:text-highgrayDark gap-3 hover:bg-slowprimary dark:hover:bg-subprimaryDark hover:text-black dark:hover:text-white transition-all duration-200">
                    <ArrowIcon className="w-8 rotate-180 stroke-3  dark:hover:text-white" />
                    <h1 className="hidden lg:block text-2xl font-bold dark:text-white">
                      برگشت
                    </h1>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="w-screen lg:w-auto p-2 pt-0">
              <NamePanel className={"block lg:hidden"} />
              <Description className={"block lg:hidden"} />
              {/* <Size /> */}
            </div>
          </div>
        </div>
        <div className="lg:flex-1/2 xl:flex-2/3 flex md:flex-col-reverse md:justify-center fixed bottom-0 w-screen p-5 lg:p-2 bg-white rounded-t-2xl lg:rounded-none lg:bg-backgroundcolor dark:bg-darkpalleteDark lg:dark:bg-backgroundcolorDark lg:static lg:bottom-auto lg:w-auto transition-colors duration-300">
          <div className="flex justify-between w-full items-center lg:flex-col-reverse lg:justify-center lg:gap-4 bg-white dark:bg-darkpalleteDark lg:bg-white dark:lg:bg-darkpalleteDark lg:px-3 lg:py-6 lg:rounded-3xl transition-colors duration-300">
            <div>
              <button className="bg-primary dark:bg-primaryDark hover:bg-primaryDark dark:hover:bg-primary text-white text-2xl font-bold px-5 py-3 rounded-2xl transition-colors duration-300">
                افزودن به سبد خرید
              </button>
            </div>
            <div className="w-20 lg:w-auto">
              <h1 className="text-xl font-bold lg:text-6xl dark:text-white transition-colors duration-300">
                قیمت
              </h1>
              <div className="flex justify-baseline items-center gap-1 lg:pt-5">
                <h1 className="text-3xl font-extrabold lg:text-9xl dark:text-white transition-colors duration-300">
                  85
                </h1>
                <h3 className="font-normal lg:text-5xl dark:text-slowgray transition-colors duration-300">
                  تومان
                </h3>
              </div>
            </div>
            <Description className={"hidden lg:block w-full"} />
            <NamePanel className={"hidden lg:block w-full"} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Item;
