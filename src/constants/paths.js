export const BASE_PATH = "http://192.168.100.7:8000";
// FOR TESTING MOBILE ON LOCAL HOST | http://192.168.100.7:8000
// ORGINALY http://127.0.0.1:8000

// FOR TABLE NUMBER & ITEM NUMBER INPUT ------------------------------
export const LIMIT_DATA = 99;

// USER PAGE NAME ---------------------------------------------------
export const PAGE_TITLES = {
  1: "خونه",
  2: "علاقه‌مندی",
  3: "سبد خرید",
  4: "تماس با ما",
  5: "تنظیمات",
};

// USER CONTACT US PAGE (ADDRESS IMAGE) ----------------------------------------
export const LOCATION =
  "https://neshan.org/maps/iframe/places/_bfkwn5FLuBe#c36.561-52.682-19z-0p/36.56149031045909/52.6821188915234";

// TABLE NUMBER FROM LINK (QR CODE) USER SIDE -----------------------------------
let tableNumber = null;
export const GET_TABLE_NUMBER = () => {
  return tableNumber;
};
export const SET_TABLE_NUMBER = (newNumber) => {
  tableNumber = newNumber;
};

// ADMIN PAGE NAME ---------------------------------------------------
export const ADMIN_PAGE_TITLES = {
  1: "خانه",
  2: "آیتم‌ها",
  3: "",
  4: "",
  5: "",
  6: "",
  7: "سالن‌دار",
  8: "سفارش‌گیری",
  9: "",
  10: "گزارش‌گیری",
  11: "سفارش‌گیری",
};
