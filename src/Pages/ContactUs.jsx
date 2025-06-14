import Header from "../Componnets/Header.jsx";
import Footer from "../Componnets/Footer.jsx";

import itemImage from "../../public/2.jpg";
import { BASE_PATH } from "../constants/paths";
import { useState, useEffect } from "react";
import { Icons } from "../Componnets/Icons.jsx";
import axios from "axios";

const Waiter = ({
  addNotification,
  tableNumber,
  setTableNumber,
  error,
  isPageLoaded,
}) => (
  <div
    className={`${
      isPageLoaded
        ? "transition-colors duration-300"
        : "transition-none duration-0"
    } bg-white dark:bg-darkpalleteDark flex justify-between gap-1 items-center w-screen m-5 my-2 py-3 px-3 rounded-3xl border-2 border-highgray dark:border-graypalleteDark`}>
    <div>
      <h1 className="text-lg md:text-2xl lg:text-3xl font-extrabold dark:text-white transition-colors duration-300">
        تماس با سالندار
      </h1>
      <h3 className="text-xs md:text-sm lg:text-lg text-slowgrayDark dark:text-slowgray transition-colors duration-300">
        از درست بودن شماره میز اطمینان حاصل کنید
        <br />
        {error && <span className="text-Start my-4 text-primary">{error}</span>}
      </h3>
    </div>
    <div className="flex items-center gap-2">
      <div>
        <input
          className={`${
            isPageLoaded
              ? "transition-colors duration-300"
              : "transition-none duration-0"
          } w-15 h-15 text-4xl font-bold text-center border-2 border-slowgray dark:border-graypalleteDark bg-white dark:bg-darkpalleteDark text-highgray dark:text-slowgray rounded-2xl`}
          type="number"
          // defaultValue={tableNumber}
          onChange={(e) => setTableNumber(Number(e.target.value))}
        />
      </div>
      <button
        onClick={() => addNotification(tableNumber)}
        className="w-15 h-15 bg-primary dark:bg-primaryDark hover:bg-primaryDark dark:hover:bg-primary rounded-2xl flex items-center justify-center transition-colors duration-300">
        <Icons.bell className={"w-10 stroke-white"} />
      </button>
    </div>
  </div>
);
const Location = () => (
  <button className="bg-darkpallete dark:bg-darkpalleteDark p-5 pb-3 rounded-3xl transition-colors duration-300">
    <img className="rounded-2xl w-50" src={itemImage} alt="" />
    <div className="flex justify-between items-center px-4 text-white pt-2">
      <Icons.location className={"w-8"} />
      <h1 className="text-xl font-bold">آدرس کـــــــــافه</h1>
    </div>
  </button>
);
const PhoneNumber = () => (
  <a
    href="tel:09114605574"
    className="bg-primary dark:bg-primaryDark hover:bg-primaryDark dark:hover:bg-primary w-60 px-8 py-2 rounded-2xl flex items-center justify-between transition-colors duration-300">
    <Icons.call className="stroke-white fill-white w-8" />
    <h1 className="text-xl font-bold text-white">0911-460-5574</h1>
  </a>
);
const InstagramPage = () => (
  <button className="bg-purple-700 dark:bg-purple-800 hover:bg-purple-900 dark:hover:bg-purple-600 w-60 px-8 py-2 rounded-2xl flex items-center justify-between transition-colors duration-300">
    <Icons.instagram className={"stroke-white"} />
    <h1 className="text-xl font-bold text-white">KMP STUDIO</h1>
  </button>
);

function ContactUs() {
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [tableNumber, setTableNumber] = useState(0);
  const [error, setError] = useState(null);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // For flashing on LOADING PAGE
    setIsPageLoaded(true);
  }, []);

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
      <div
        className={`${
          isPageLoaded
            ? "transition-colors duration-300"
            : "transition-none duration-0"
        } bg-backgroundcolor dark:bg-backgroundcolorDark h-screen w-screen overflow-y-auto scrollbar scrollbar-none`}>
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
              isPageLoaded={isPageLoaded}
            />
          </div>
          <div className="col-span-1 flex justify-center animate-move-up">
            <Location />
          </div>
          <div className="col-span-1 flex justify-center items-center mt-2 animate-move-up delay-1">
            <PhoneNumber />
          </div>
          <div className="col-span-1 flex justify-center items-center mt-2 animate-move-up delay-2">
            <InstagramPage />
          </div>
        </div>
      </div>
      <Footer page={4} />
    </>
  );
}

export default ContactUs;
