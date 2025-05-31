import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../Componnets/Header.jsx";
import Footer from "../Componnets/Footer.jsx";
import SubHeder from "../Componnets/SubHeder.jsx";

import itemImage from "../../public/No_Item.png";
import bannerImage from "../../public/Banner.jpg";

import { BASE_PATH } from "../constants/paths.js";
import axios from "axios";

const Plus = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M5 12h14m-7-7v14"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Minus = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="none">
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      fillRule="evenodd"
      d="M18 10a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h14a1 1 0 0 1 1 1"
    />
  </svg>
);

const formatPrice = (num) => {
  if (num == null || isNaN(num)) return "";
  return Number(num).toLocaleString("en-US");
};

function Home() {
  const [hideIcons, setHideIcons] = useState(false);
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(1);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const [orderCounts, setOrderCounts] = useState({});

  const [newlyAddedId, setNewlyAddedId] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [subHeaderMenuOpen, setSubHeaderMenuOpen] = useState(false);

  const updateOrder = (id, newCount) => {
    const updatedCounts = { ...orderCounts };

    if (newCount > 0) {
      updatedCounts[id] = newCount;
    } else {
      delete updatedCounts[id];
    }

    const orderArray = Object.entries(updatedCounts).map(([key, value]) => [
      Number(key),
      value,
    ]);
    localStorage.setItem("order", JSON.stringify(orderArray));
    setOrderCounts(updatedCounts);
  };

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem("order") || "[]");
    const counts = {};
    storedOrder.forEach(([id, count]) => {
      counts[id] = count;
    });
    setOrderCounts(counts);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollTop = scrollContainer.scrollTop;

          if (currentScrollTop <= 40) {
            setHideIcons(false);
            window.dispatchEvent(new CustomEvent("closeMenus"));
          } else {
            setHideIcons(true);
            // setHeaderMenuOpen(false);
            // setSubHeaderMenuOpen(false);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!selectedCategory) return;

    async function fetchItems() {
      setError(null);
      if (selectedCategory === -1) {
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

  const increaseCount = (id) => {
    const newCount = (orderCounts[id] || 0) + 1;
    updateOrder(id, newCount);
  };

  const decreaseCount = (id) => {
    const current = orderCounts[id] || 1;

    if (current === 1) {
      setRemovingId(id);
      setTimeout(() => {
        updateOrder(id, 0);
        setRemovingId(null);
      }, 400);
    } else {
      updateOrder(id, current - 1);
    }
  };

  const handleAddToOrder = (id) => {
    updateOrder(id, 1);
    setNewlyAddedId(id);
    setTimeout(() => setNewlyAddedId(null), 400);
  };

  function selectFood(food_id) {
    localStorage.setItem("show_food", food_id);
    navigate("/item");
  }

  return (
    <>
      <div
        ref={scrollContainerRef}
        className={`bg-backgroundcolor dark:bg-backgroundcolorDark w-screen h-screen overflow-y-auto scrollbar scrollbar-none overflow-x-hidden pb-26 md:pb-5 transition-colors duration-300 ${
          !hideIcons ? "pb-60 md:pb-5" : "pb-26 md:pb-49"
        }`}>
        <Header
          page={1}
          showMenu={headerMenuOpen}
          setShowMenu={setHeaderMenuOpen}
        />
        <SubHeder
          onCategorySelect={setSelectedCategory}
          hideIcons={hideIcons}
          showMenu={subHeaderMenuOpen}
          setShowMenu={setSubHeaderMenuOpen}
          className={`sticky top-0 z-10 w-screen bg-backgroundcolor dark:bg-backgroundcolorDark transition-colors duration-300 ${
            !hideIcons ? "h-34 md:h-44" : "h-17"
          }`}
        />

        {/* BANNER IMAGE */}
        {/* <div className="flex justify-center items-center w-screen">
            <img
              className="object-center object-cover p-4 rounded-4xl"
              src={bannerImage}
              alt=""
            />
          </div> */}

        {error && <p className="text-center my-4 text-primary">{error}</p>}

        {!error && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-9 gap-y-4 gap-x-2 mt-2 justify-center items-center">
            {items.map((item) => (
              <div
                onClick={() => selectFood(item.id)}
                href="/item"
                key={item.id}>
                <div
                  className={`${
                    item.in_sale
                      ? "bg-slowprimary dark:bg-slowprimaryDark"
                      : "bg-white dark:bg-darkpalleteDark"
                  } rounded-3xl w-ful h-fit p-3 m-auto text-start transition-all duration-300 hover:scale-102 hover:bg-highgray`}>
                  <img
                    className="w-full aspect-square object-cover rounded-2xl dark:opacity-90 transition-opacity duration-300"
                    src={item.pic_url ? item.pic_url : itemImage}
                    alt={item.name}
                  />
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-bold mt-2 dark:text-white transition-colors duration-300">
                        {item.name}
                      </h1>
                      <h3 className="text-balance mt-1 dark:text-slowgray transition-colors duration-300">
                        {item.description}
                      </h3>
                    </div>
                    {orderCounts[item.id] ? (
                      <div>
                        <h1
                          className={`bg-primary w-6 h-6 rounded-full flex justify-center items-center font-bold text-white ${
                            newlyAddedId === item.id
                              ? "animate-scale-up"
                              : removingId === item.id
                              ? "animate-scale-out"
                              : ""
                          }`}>
                          {orderCounts[item.id]}
                        </h1>
                      </div>
                    ) : null}
                  </div>
                  <div className="flex mt-3 h-20 justify-between items-center">
                    {orderCounts[item.id] ? (
                        <div
                          className={`flex items-center gap-2 transition-all duration-300 ${
                            newlyAddedId === item.id
                              ? "animate-scale-up"
                              : removingId === item.id
                              ? "animate-scale-out"
                              : ""
                          }`}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              increaseCount(item.id);
                            }}
                            className="w-7 h-7 flex items-center justify-center bg-primary dark:bg-primaryDark rounded-full hover:bg-primaryDark dark:hover:bg-primary transition-colors duration-300">
                            <Plus className={"w-7 stroke-white"} />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              decreaseCount(item.id);
                            }}
                            className="w-7 h-7 border-2 border-primary dark:border-primaryDark rounded-full flex items-center justify-center hover:bg-primary dark:hover:bg-primaryDark transition-colors duration-300">
                            <Minus
                              className={
                                "w-3 fill-black dark:fill-white hover:fill-white transition-colors duration-300"
                              }
                            />
                          </button>
                        </div>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddToOrder(item.id);
                        }}
                        className="flex justify-center items-center rounded-2xl bg-primary dark:bg-primaryDark hover:bg-primaryDark dark:hover:bg-primary w-13 h-13 transition-colors duration-300">
                        <Plus className={"w-10 stroke-white"} />
                      </button>
                    )}
                    <div>
                      {item.sale_price && (
                        <div className="flex justify-center items-end gap-1">
                          <h1 className="text-lg font-medium dark:text-white line-through transition-colors duration-300">
                            {formatPrice(item.price)} تومان
                          </h1>
                        </div>
                      )}
                      <div className="flex justify-center items-end gap-1">
                        <h1 className="text-3xl font-bold dark:text-white transition-colors duration-300">
                          {item.sale_price
                            ? formatPrice(item.sale_price)
                            : formatPrice(item.price)}
                        </h1>
                        <h3 className="dark:text-slowgray transition-colors duration-300">
                          تومان
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <Footer page={1} />
      </div>
    </>
  );
}

export default Home;
