import React, { useState, useEffect, useRef } from "react";

import Header from "../Componnets/Header.jsx";
import Footer from "../Componnets/Footer.jsx";
import SubHeder from "../Componnets/SubHeder.jsx";
import Card from "../Componnets/Card.jsx";

import bannerImage from "../../public/Banner.jpg";

import { BASE_PATH } from "../constants/paths.js";
import axios from "axios";

function Home() {
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const [hideIcons, setHideIcons] = useState(false);
  const scrollContainerRef = useRef(null);
  const headerRef = useRef(null);
  const headerInputRef = useRef(null);

  const [selectedCategory, setSelectedCategory] = useState(1);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  const [orderCounts, setOrderCounts] = useState({});

  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);
  const [subHeaderMenuOpen, setSubHeaderMenuOpen] = useState(false);

  const [searchActive, setSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const fetchSearchResults = async () => {
    try {
      const response = await axios.post(
        `${BASE_PATH}/food/search_food`,
        {},
        {
          params: { search: searchTerm },
          headers: { accept: "application/json" },
        }
      );
      if (response.status === 204 || !Array.isArray(response.data)) {
        setItems([]);
        setError("نتیجه‌ای یافت نشد");
      } else {
        setItems(response.data);
        setError(null);
      }
    } catch (err) {
      setError("خطا در دریافت نتایج جستجو");
      setItems([]);
    }
  };

  function scrollToTopAndFocus() {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (headerInputRef.current) {
      headerInputRef.current.focus();
    }
  }

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
    if (searchActive) {
      if (searchTerm.trim() === "") {
        setItems([]);
        return;
      }
      fetchSearchResults();
    } else {
      if (!selectedCategory) return;
      fetchItems();
    }
  }, [searchActive, searchTerm, selectedCategory]);

  return (
    <>
      <div
        ref={scrollContainerRef}
        className={`${
          isPageLoaded
            ? "transition-colors duration-300"
            : "transition-none duration-0"
        } bg-backgroundcolor dark:bg-backgroundcolorDark w-screen h-screen overflow-y-auto scrollbar scrollbar-none overflow-x-hidden pb-26 md:pb-5 ${
          !hideIcons ? "pb-60 md:pb-5" : "pb-26 md:pb-49"
        }`}>
        <Header
          page={1}
          showMenu={headerMenuOpen}
          setShowMenu={setHeaderMenuOpen}
          searchActive={searchActive}
          setSearchActive={setSearchActive}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          fetchItems={fetchItems}
          ref={headerRef}
          headerInputRef={headerInputRef}
        />

        <div className="animate-scale-up">
          {!searchActive && (
            <SubHeder
              onCategorySelect={setSelectedCategory}
              hideIcons={hideIcons}
              showMenu={subHeaderMenuOpen}
              onSearchClick={scrollToTopAndFocus}
              setShowMenu={setSubHeaderMenuOpen}
              setSearchActive={setSearchActive}
              className={`${
                isPageLoaded
                  ? "transition-colors duration-300"
                  : "transition-none duration-0"
              } sticky top-0 z-10 w-screen bg-backgroundcolor dark:bg-backgroundcolorDark ${
                !hideIcons ? "h-34 md:h-44" : "h-17"
              }`}
            />
          )}
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
        </div>
        <Footer page={1} />
      </div>
    </>
  );
}

export default Home;
