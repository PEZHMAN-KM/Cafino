import Header from "../Componnets/Header.jsx";
import Footer from "../Componnets/Footer.jsx";

import itemImage from "../../public/2.jpg";
import { BASE_PATH } from "../constants/paths";
import { useState } from "react";
import axios from "axios";

const BellIcon = ({ className }) => {
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
        d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
      />
    </svg>
  );
};
const LocationIcon = ({ className }) => {
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
        d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
      />
    </svg>
  );
};
const Call = ({ className }) => (
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.00745 3.40686C7.68752 1.72679 10.5227 1.85451 11.6925 3.95063L12.3415 5.11356C13.1054 6.48238 12.7799 8.20946 11.6616 9.34143C11.6467 9.36184 11.5677 9.47677 11.5579 9.67758C11.5454 9.93391 11.6364 10.5267 12.5548 11.4451C13.4729 12.3632 14.0656 12.4545 14.3221 12.442C14.5231 12.4322 14.6381 12.3533 14.6585 12.3383C15.7905 11.2201 17.5176 10.8945 18.8864 11.6584L20.0493 12.3075C22.1454 13.4773 22.2731 16.3124 20.5931 17.9925C19.6944 18.8911 18.4995 19.6896 17.0953 19.7429C15.0144 19.8218 11.5591 19.2844 8.13735 15.8626C4.71556 12.4408 4.17818 8.98556 4.25706 6.90463C4.3103 5.50044 5.10879 4.30552 6.00745 3.40686ZM10.3827 4.68163C9.78363 3.60828 8.17394 3.36169 7.06811 4.46752C6.29276 5.24287 5.7887 6.09868 5.75599 6.96146C5.6902 8.6968 6.11864 11.7226 9.19801 14.8019C12.2774 17.8813 15.3031 18.3097 17.0385 18.2439C17.9013 18.2112 18.7571 17.7072 19.5324 16.9318C20.6382 15.826 20.3916 14.2163 19.3183 13.6173L18.1554 12.9683C17.432 12.5645 16.4158 12.7023 15.7025 13.4156L15.7023 13.4158C15.6322 13.4858 15.1864 13.9018 14.395 13.9403C13.5847 13.9797 12.604 13.6156 11.4942 12.5058C10.384 11.3956 10.02 10.4146 10.0597 9.60423C10.0985 8.81271 10.5147 8.36711 10.5843 8.29746L10.5844 8.29743C11.2977 7.58411 11.4354 6.56797 11.0317 5.84456L10.3827 4.68163Z"></path>
    </g>
  </svg>
);
const Instagram = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    className="w-8"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Waiter = ({ addNotification, tableNumber, setTableNumber, error }) => (
  <div className="bg-white dark:bg-darkpalleteDark flex justify-between gap-1 items-center w-screen m-5 my-2 py-3 px-4 rounded-3xl border-2 border-highgray dark:border-graypalleteDark transition-colors duration-300">
    <div>
      <h1 className="text-2xl font-extrabold dark:text-white transition-colors duration-300">
        تماس با سالندار
      </h1>
      <h3 className="text-sm text-slowgrayDark dark:text-slowgray transition-colors duration-300">
        از درست بودن شماره میز اطمینان حاصل کنید
        <br />
        {error && <span className="text-Start my-4 text-primary">{error}</span>}
      </h3>
    </div>
    <div className="flex items-center gap-3">
      <div>
        <input
          className="w-15 h-15 text-4xl font-bold text-center border-2 border-slowgray dark:border-graypalleteDark bg-white dark:bg-darkpalleteDark text-highgray dark:text-slowgray rounded-2xl transition-colors duration-300"
          type="number"
          defaultValue={tableNumber}
          onChange={(e) => setTableNumber(Number(e.target.value))}
        />
      </div>
      <button
        onClick={() => addNotification(tableNumber)}
        className="w-15 h-15 bg-primary dark:bg-primaryDark hover:bg-primaryDark dark:hover:bg-primary rounded-2xl flex items-center justify-center transition-colors duration-300">
        <BellIcon className={"w-10 stroke-white"} />
      </button>
    </div>
  </div>
);
const Location = () => (
  <button className="bg-darkpallete dark:bg-darkpalleteDark p-5 pb-3 rounded-3xl transition-colors duration-300">
    <img className="rounded-2xl w-50" src={itemImage} alt="" />
    <div className="flex justify-between items-center px-4 text-white pt-2">
      <LocationIcon className={"w-8"} />
      <h1 className="text-xl font-bold">آدرس کـــــــــافه</h1>
    </div>
  </button>
);
const PhoneNumber = () => (
  <button className="bg-primary dark:bg-primaryDark hover:bg-primaryDark dark:hover:bg-primary w-60 px-8 py-2 rounded-2xl flex items-center justify-between transition-colors duration-300">
    <Call className="stroke-white fill-white w-8" />
    <h1 className="text-xl font-bold text-white">0912-345-6789</h1>
  </button>
);
const InstagramPage = () => (
  <button className="bg-purple-700 dark:bg-purple-800 hover:bg-purple-900 dark:hover:bg-purple-600 w-60 px-8 py-2 rounded-2xl flex items-center justify-between transition-colors duration-300">
    <Instagram />
    <h1 className="text-xl font-bold text-white">KMP STUDIO</h1>
  </button>
);

function ContactUs() {
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState(0);
  const [error, setError] = useState(null);

  async function addNotification(tableNumber) {
    if (tableNumber <= 0) {
      setError("لطفا شماره میز را درست وارد کنید!");
      setTimeout(() => {
        setError(null);
      }, 2000);
      return;
    }
    setError(null);
    try {
      const response = await axios.post(
        `${BASE_PATH}/notification/add_notif`,
        { table_number: tableNumber },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setError("اطلاع داده شد. تا چند لحظه دیگه سالن‌دار میاد");
      setTimeout(() => {
        setError(null);
      }, 5000);
    } catch (err) {
      setError("خطا در تماس با سالن‌دار");
      setTimeout(() => {
        setError(null);
      }, 10000);
    }
  }

  return (
    <>
      <div className="bg-backgroundcolor dark:bg-backgroundcolorDark transition-colors duration-300 h-screen w-screen overflow-y-auto scrollbar scrollbar-none pb-26 md:pb-0">
        <Header
          page={4}
          text={"تماس با ما"}
          showMenu={headerMenuOpen}
          setShowMenu={setHeaderMenuOpen}
        />
        <div className="grid grid-cols-1">
          <div className="col-span-1 flex justify-center items-start">
            <Waiter
              tableNumber={tableNumber}
              setTableNumber={setTableNumber}
              addNotification={addNotification}
              error={error}
            />
          </div>
          <div className="col-span-1 flex justify-center">
            <Location />
          </div>
          <div className="col-span-1 flex justify-center items-center mt-2">
            <PhoneNumber />
          </div>
          <div className="col-span-1 flex justify-center items-center mt-2">
            <InstagramPage />
          </div>
        </div>
      </div>
      <Footer page={4} />
    </>
  );
}

export default ContactUs;
