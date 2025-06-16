import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { BASE_PATH } from "../constants/paths.js";
import Header from "../Componnets/Header.jsx";
import Footer from "../Componnets/Footer.jsx";
import Card from "../Componnets/Card.jsx";

function FavoritePage() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const [orderCounts, setOrderCounts] = useState({});

  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);

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
    window.dispatchEvent(new Event("orderUpdated"));
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
    // For flashing on LOADING PAGE
    setIsPageLoaded(true);
  }, []);

  useEffect(() => {
    const lided_food = localStorage.getItem("liked_items");

    async function fetchItems() {
      setError(null);
      try {
        const response = await axios.post(
          `${BASE_PATH}/food/get_food_list_by_id`,
          lided_food,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setItems([...response.data]);
      } catch (err) {
        setError("آیتمی یافت نشد!");
      }
    }

    fetchItems();
  }, []);

  return (
    <>
      <div
        className={`${
          isPageLoaded
            ? "transition-colors duration-300"
            : "transition-none duration-0"
        } bg-backgroundcolor dark:bg-backgroundcolorDark w-screen h-screen overflow-y-auto scrollbar scrollbar-none overflow-x-hidden pb-26 md:pb-3`}>
        <Header
          page={2}
          text={"علاقه مندی ها"}
          showMenu={headerMenuOpen}
          setShowMenu={setHeaderMenuOpen}
        />
        {error && <p className="text-center my-4 text-primary">{error}</p>}
        {!error && (
          <div className="grid max-xs:grid-cols-1 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 3xl:grid-cols-10 4xl:grid-cols-12 gap-y-4 gap-x-2 mt-2 justify-center items-center">
            {items.map((item) => (
              <Card
                key={item.id}
                id={item.id}
                in_sale={item.in_sale}
                pic_url={item.pic_url}
                name={item.name}
                description={item.description}
                price={item.price}
                sale_price={item.sale_price}
                updateOrder={updateOrder}
                count={orderCounts[item.id] || 0}
              />
            ))}
          </div>
        )}
        <Footer page={2} />
      </div>
    </>
  );
}

export default FavoritePage;
