import Header from "../Componnets/Header.jsx";
import Footer from "../Componnets/Footer.jsx";

import itemImage from "../../public/2.jpg";

const FavItem = () => (
  <div className="bg-white dark:bg-darkpalleteDark rounded-3xl w-fit h-fit p-3 m-auto transition-colors duration-300">
    <img
      className="w-43 h-43 rounded-2xl dark:opacity-90 transition-opacity duration-300"
      src={itemImage}
      alt=""
    />
    <h1 className="text-2xl font-bold mt-2 dark:text-white transition-colors duration-300">
      کافه موکا
    </h1>
    <h3 className="text-balance mt-1 dark:text-slowgray transition-colors duration-300">
      مینی توضیحات
    </h3>
    <div className="flex mt-3 justify-between items-center">
      <button className="flex justify-center items-center text-2xl rounded-2xl bg-primary dark:bg-primaryDark hover:bg-primaryDark dark:hover:bg-primary text-white w-10 h-10 transition-colors duration-300">
        +
      </button>
      <div className="flex justify-center items-end gap-1">
        <h1 className="text-3xl font-bold dark:text-white transition-colors duration-300">
          85
        </h1>
        <h3 className="dark:text-slowgray transition-colors duration-300">
          تومان
        </h3>
      </div>
    </div>
  </div>
);

function FavoritePage() {
  return (
    <>
      <div className="bg-backgroundcolor dark:bg-backgroundcolorDark w-screen h-screen overflow-y-auto scrollbar scrollbar-none overflow-x-hidden pb-26 md:pb-3 transition-colors duration-300">
        <Header page={2} text={"علاقه مندی ها"} />
        <div className="grid md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9 grid-cols-2 gap-y-4 gap-x-2 mt-2 justify-evenly items-center">
          {[
            { id: 0 },
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
            { id: 7 },
            { id: 8 },
            { id: 9 },
            { id: 10 },
            { id: 11 },
            { id: 12 },
            { id: 13 },
            { id: 14 },
          ].map((item) => (
            <a href="Item" key={item.id}>
              <FavItem />
            </a>
          ))}
        </div>
        <Footer page={2} />
      </div>
    </>
  );
}

export default FavoritePage;
