import { useEffect, useState } from "react";
import itemImage from "../../public/No_Item.png";
import { useNavigate } from "react-router-dom";

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

function Card({
  id,
  in_sale,
  pic_url,
  name,
  description,
  price,
  sale_price,
  updateOrder,
  count,
}) {
  const navigate = useNavigate();
  const [newlyAddedId, setNewlyAddedId] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  function selectFood(food_id) {
    localStorage.setItem("show_food", food_id);
    navigate("/item");
  }

  const increaseCount = () => {
    updateOrder(id, count + 1);
  };

  const decreaseCount = (id) => {
    const current = count || 1;

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

  return (
    <>
      <div onClick={() => selectFood(id)} href="/item" key={id}>
        <div
          className={`${
            in_sale
              ? "bg-slowprimary dark:bg-slowprimaryDark"
              : "bg-white dark:bg-darkpalleteDark"
          } rounded-3xl w-ful h-fit p-3 m-auto text-start transition-all duration-300 md:hover:scale-102 md:hover:bg-highgray animate-scale-up touch-manipulation`}>
          <img
            className="w-full aspect-square object-cover rounded-2xl"
            src={pic_url ? pic_url : itemImage}
            alt={name}
          />
          <div className="flex justify-between items-center">
            <div className="overflow-hidden w-fit">
              <h1 className="text-2xl font-bold mt-2 dark:text-white truncate transition-colors duration-300">
                {name}
              </h1>
              <h3 className="text-balance mt-1 dark:text-slowgray truncate transition-colors duration-300">
                {description}
              </h3>
            </div>
            {count > 0 ? (
              <div>
                <h1
                  className={`bg-primary w-6 h-6 rounded-full flex justify-center items-center font-bold text-white ${
                    newlyAddedId === id
                      ? "animate-scale-up"
                      : removingId === id
                      ? "animate-scale-out"
                      : ""
                  }`}>
                  {count}
                </h1>
              </div>
            ) : null}
          </div>
          <div className="flex mt-3 h-20 justify-between items-center">
            {count > 0 ? (
              <div
                className={`flex items-center gap-2 transition-all duration-300 ${
                  newlyAddedId === id
                    ? "animate-scale-up"
                    : removingId === id
                    ? "animate-scale-out"
                    : ""
                }`}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    increaseCount(id);
                  }}
                  className="w-7 h-7 flex items-center justify-center bg-primary dark:bg-primaryDark rounded-full md:hover:bg-primaryDark md:dark:hover:bg-primary transition-colors duration-300 touch-manipulation">
                  <Plus className={"w-7 stroke-white"} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    decreaseCount(id);
                  }}
                  className="w-7 h-7 border-2 border-primary dark:border-primaryDark rounded-full flex items-center justify-center md:hover:bg-primary md:dark:hover:bg-primaryDark transition-colors duration-300 touch-manipulation">
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
                  handleAddToOrder(id);
                }}
                className="flex justify-center items-center rounded-2xl bg-primary dark:bg-primaryDark md:hover:bg-primaryDark md:dark:hover:bg-primary w-13 h-13 transition-colors duration-300 touch-manipulation">
                <Plus className={"w-10 stroke-white"} />
              </button>
            )}
            <div>
              {sale_price && (
                <div className="flex justify-center items-end gap-1">
                  <h1 className="text-lg font-medium dark:text-white line-through transition-colors duration-300">
                    {formatPrice(price)} تومان
                  </h1>
                </div>
              )}
              <div className="flex justify-center items-end gap-1">
                <h1 className="text-3xl font-bold dark:text-white transition-colors duration-300">
                  {sale_price ? formatPrice(sale_price) : formatPrice(price)}
                </h1>
                <h3 className="dark:text-slowgray transition-colors duration-300">
                  تومان
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
