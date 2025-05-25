import React, { useState, useEffect, useRef } from "react";

import Header from "../Componnets/Header.jsx";
import Footer from "../Componnets/Footer.jsx";
import SubHeder from "../Componnets/SubHeder.jsx";
import itemImage from "../../public/2.jpg";
import bannerImage from "../../public/Banner.jpg";
import { BASE_PATH } from "../constants/paths.js";
import axios from "axios";

const HomeItem = () => (
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

function Home() {
  const [hideIcons, setHideIcons] = useState(false);
  const scrollContainerRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState(1);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;

      if (scrollTop > 50) {
        setHideIcons(true);
      } else {
        setHideIcons(false);
      }
    };

    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    async function fetchItems() {
      console.log(selectedCategory);

      setError(null);
      if (selectedCategory == -1) {
        try {
          const response = await axios.get(
            `${BASE_PATH}/food/get_all_on_sale_foods`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          setItems(response.data);
        } catch (err) {
          setError("خطا در دریافت داده‌ها");
        }
      } else {
        try {
          const response = await axios.post(
            `${BASE_PATH}/food/show_category_foods`,
            { category_id: selectedCategory },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setItems([
            ...response.data.on_sale_food,
            ...response.data.not_on_sale_food,
          ]);
        } catch (err) {
          setError("خطا در دریافت داده‌ها");
        }
      }
    }

    fetchItems();
  }, [selectedCategory]);

  return (
    <>
      <div
        ref={scrollContainerRef}
        className="bg-backgroundcolor dark:bg-backgroundcolorDark w-screen h-screen overflow-y-auto overflow-x-hidden pb-26 md:pb-5 transition-colors duration-300">
        {!hideIcons ? <Header page={1} /> : <div></div>}
        <SubHeder
          onCategorySelect={setSelectedCategory}
          hideIcons={hideIcons}
          className={
            "sticky top-0 z-10 bg-backgroundcolor dark:bg-backgroundcolorDark transition-colors duration-300"
          }
        />

        {/* BANNER IMAGE */}
        <div className="flex justify-center items-center w-screen">
          <img
            className="object-center object-cover p-4 rounded-4xl"
            src={bannerImage}
            alt=""
          />
        </div>

        {error && <p className="text-center my-4 text-primary">{error}</p>}

        {!error && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9 gap-y-4 gap-x-2 mt-2 justify-center items-center">
            {items.map((item) => (
              <a href="/item" key={item.id}>
                <div
                  className={`${
                    item.in_sale
                      ? "bg-slowprimary dark:bg-slowprimaryDark"
                      : "bg-white dark:bg-darkpalleteDark"
                  } rounded-3xl w-ful h-fit p-3 m-auto transition-colors duration-300`}>
                  <img
                    className="w-full aspect-square object-cover rounded-2xl dark:opacity-90 transition-opacity duration-300"
                    src={item.pic_url || "../../public/2.jpg"}
                    alt={item.name}
                  />
                  <h1 className="text-2xl font-bold mt-2 dark:text-white transition-colors duration-300">
                    {item.name}
                  </h1>
                  <h3 className="text-balance mt-1 dark:text-slowgray transition-colors duration-300">
                    {item.description}
                  </h3>
                  <div className="flex mt-3 justify-between items-center">
                    <button className="flex justify-center items-center text-2xl rounded-2xl bg-primary dark:bg-primaryDark hover:bg-primaryDark dark:hover:bg-primary text-white w-13 h-13 transition-colors duration-300">
                      +
                    </button>
                    <div>
                      {item.sale_price && (
                        <div className="flex justify-center items-end gap-1">
                          <h1 className="text-lg font-medium dark:text-white line-through transition-colors duration-300">
                            {item.price} تومان
                          </h1>
                        </div>
                      )}
                      <div className="flex justify-center items-end gap-1">
                        <h1 className="text-3xl font-bold dark:text-white transition-colors duration-300">
                          {item.sale_price ? item.sale_price : item.price}
                        </h1>
                        <h3 className="dark:text-slowgray transition-colors duration-300">
                          تومان
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
        <Footer page={1} />
      </div>
    </>
  );
}

export default Home;
