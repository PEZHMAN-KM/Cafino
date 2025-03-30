import Header from "../Componnets/Header.jsx";
import Footer from "../Componnets/Footer.jsx";

import itemImage from "../../public/2.jpg";

const FavItem = () => (
  <div className="bg-white rounded-3xl w-fit h-fit p-3 m-auto">
    <img className="w-43 h-43 rounded-2xl" src={itemImage} alt="" />
    <h1 className="text-2xl font-bold mt-2">کافه موکا</h1>
    <h3 className="text-balance mt-1">مینی توضیحات</h3>
    <div className="flex mt-3 justify-between items-center">
      <button className="flex justify-center items-center text-2xl rounded-2xl bg-primary text-white w-10 h-10">
        +
      </button>
      <div className="flex justify-center items-end gap-1">
        <h1 className="text-3xl font-bold">85</h1>
        <h3>تومان</h3>
      </div>
    </div>
  </div>
);

function FavoritePage() {
  return (
    <>
      <div className="bg-backgroundcolor w-screen h-screen overflow-y-auto overflow-x-hidden pb-26 md:pb-3">
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
