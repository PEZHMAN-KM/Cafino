import itemImage from "../../public/Banner.jpg";

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

function Item() {
  return (
    <>
      <div className="lg:flex">
        <div className="overflow-auto lg:flex-2/3 xl:flex-1/3 bg-backgroundcolor pb-30 lg:pb-0 h-screen overflow-x-hidden">
          <div className="relative">
            <img
              className="w-screen aspect-square object-cover p-2 rounded-3xl"
              src={itemImage}
              alt=""
            />
            <div className="flex lg:justify-between lg:items-center lg:gap-3">
              <div className="absolute lg:static lg:top-auto lg:left-auto lg:w-1/2 lg:p-2 lg:pt-0 top-5 right-5">
                <button className="bg-white p-5 rounded-2xl lg:w-full flex items-center gap-3">
                  <Like className={"w-8 stroke-highgray fill-highgray"} />
                  <h1 className="hidden lg:block text-2xl font-bold text-highgray">
                    علاقه مندی
                  </h1>
                </button>
              </div>
              <div className="absolute lg:static lg:top-auto lg:right-auto lg:w-1/2 lg:p-2 lg:pt-0 top-5 left-5">
                <a href="Home">
                  <div className="bg-white p-5 rounded-2xl lg:w-full flex items-center gap-3">
                    <ArrowIcon
                      className={"w-8 rotate-180 stroke-3 stroke-highgray"}
                    />
                    <h1 className="hidden lg:block text-2xl font-bold text-highgray">
                      برگشت
                    </h1>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="w-screen lg:w-auto p-2 pt-0">
              <div className="p-2 bg-slowprimary rounded-2xl border-1 border-primary">
                <h1 className="text-2xl font-extrabold p-1">کافه موکا</h1>
                <h3 className="text-xl font-bold p-1 pt-0">گرم</h3>
              </div>
              <div className="p-2">
                <h1 className="text-2xl font-bold p-1">توضیحات</h1>
                <p className="px-3 pt-1">
                  250 میلی لیتر. یک شات اسپرسو 20% عربیکا و 80% روبوستا. شیر.
                  سیروپ کارامل
                </p>
              </div>
              <div className="p-2">
                <h1 className="text-2xl font-bold p-1">اندازه</h1>
                <div className="flex justify-between items-center px-2 pt-3">
                  <button className="border-2 border-primary bg-slowprimary w-30 px-8 py-3 rounded-2xl">
                    کوچک
                  </button>
                  <button className="border-2 border-slowgray bg-white w-30 px-8 py-3 rounded-2xl">
                    متوسط
                  </button>
                  <button className="border-2  border-slowgray bg-white w-30 px-8 py-3 rounded-2xl">
                    بزرگ
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:flex-1/3 xl:flex-2/3 flex lg:flex-col-reverse lg:justify-center fixed bottom-0 w-screen p-5 bg-white lg:bg-backgroundcolor rounded-t-2xl lg:static lg:bottom-auto lg:w-auto">
          <div className="flex justify-between w-full items-center lg:flex-col-reverse lg:justify-center lg:gap-8 bg-white lg:px-3 lg:py-6 lg:rounded-3xl">
            <div>
              <button className="bg-primary text-white text-2xl font-bold px-5 py-3 rounded-2xl">
                افزودن به سبد خرید
              </button>
            </div>
            <div className="w-20 lg:w-auto">
              <h1 className="text-xl font-bold lg:text-6xl">قیمت</h1>
              <div className="flex justify-baseline items-center gap-1 lg:pt-5">
                <h1 className="text-3xl font-extrabold lg:text-9xl">85</h1>
                <h3 className="font-normal lg:text-5xl">تومان</h3>
              </div>
            </div>
            <div className="hidden lg:block w-full ">
              <h1 className="text-4xl text-center pb-4">کافی نو</h1>
              <hr className="border-1 border-highgray" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Item;
