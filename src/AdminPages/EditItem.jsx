import { useState, useEffect, useRef } from "react";
import { BASE_PATH } from "../constants/paths";
import axios from "axios";
import { Icons } from "../Componnets/Icons";

const ArrowIcon = ({ className }) => {
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
        d="m8.25 4.5 7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};

function EditItem({ setCurrentPage }) {
  const id = Number(localStorage.getItem("edit_food"));
  const [showOffValue, setShowOffValue] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null);
  const [textError, setTextError] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("");
  const [inSale, setInSale] = useState(false);
  const [salePrice, setSalePrice] = useState("");

  useEffect(() => {
    async function fetchItem() {
      try {
        const response = await axios.post(
          `${BASE_PATH}/food/get_food_list_by_id`,
          [id],
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data[0];
        console.log(response);

        setName(data.name || "");
        setDescription(data.description || "");
        setCategoryId(data.category_id?.toString() || "");
        setPrice(data.price?.toString() || "");
        setInSale(data.in_sale || false);
        setShowOffValue(data.in_sale || false);
        setSalePrice(data.sale_price?.toString() || "");
        if (data.pic_url) {
          setPreviewUrl(data.pic_url);
          setPreview(`${BASE_PATH}/files/${data.pic_url.split("/").pop()}`);
        }
      } catch (error) {
        console.error("Error loading item:", error);
      }
    }

    if (id) fetchItem();
  }, [id]);

  async function updateFood(e) {
    e.preventDefault();

    try {
      const dataToSend = {
        food_id: id,
        name: name,
        description: description,
        category_id: Number(categoryId),
        price: Number(price),
        in_sale: inSale,
        sale_price: inSale ? Number(salePrice) : 0,
        pic_url: selectedImage,
      };

      const token = JSON.parse(localStorage.getItem("user_data"));

      const response = await axios.put(
        `${BASE_PATH}/admin/food/update_food`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );
      exit();
    } catch (error) {
      setTextError(error.response?.data.detail || "خطایی رخ داد");
    }
  }

  function exit() {
    localStorage.removeItem("edit_food");
    setCurrentPage(2);
  }

  // Update handleImageChange function
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      // Store the actual file object
      setSelectedImage(file);
      // Create preview URL
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add(
      "border-adminAction",
      "dark:border-adminActionDark"
    );
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove(
      "border-adminAction",
      "dark:border-adminActionDark"
    );
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove(
      "border-adminAction",
      "dark:border-adminActionDark"
    );

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleImageChange({ target: { files: [file] } });
    }
  };

  return (
    <>
      <div className="bg-adminBackgroundColor dark:bg-adminBackgroundColorDark h-full transition-colors duration-300">
        <div className="bg-adminBackgroundColor dark:bg-adminBackgroundColorDark h-screen overflow-y-auto scrollbar scrollbar-none overflow-x-hidden transition-colors duration-300">
          <div className="grid grid-cols-1 md:flex justify-center w-screen">
            <div className="bg-white dark:bg-darkpalleteDark m-2 rounded-2xl transition-colors duration-300">
              <div className="flex justify-between items-center pl-4 pt-3">
                <h1 className="text-3xl font-extrabold pr-8 py-4 dark:text-white transition-colors duration-300">
                  اصلاح کردن آیتم
                </h1>
                <button className="cursor-pointer" onClick={() => exit()}>
                  <div className="bg-white dark:bg-darkpalleteDark border-2 border-black dark:border-white p-2 rounded-2xl transition-colors duration-300">
                    <ArrowIcon
                      className={
                        "w-8 rotate-180 stroke-3 stroke-black dark:stroke-white"
                      }
                    />
                  </div>
                </button>
              </div>
              <form
                className="flex flex-col gap-4 px-8 py-4"
                onSubmit={updateFood}>
                <div
                  className="border-2 border-dashed border-gray-300 dark:border-graypalleteDark rounded-lg p-4 text-center cursor-pointer hover:border-adminAction dark:hover:border-adminActionDark transition-colors w-full max-w-md"
                  onClick={() => fileInputRef.current.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    ref={fileInputRef}
                  />

                  {preview ? (
                    <div className="relative group">
                      <img
                        src={preview}
                        alt="Profile"
                        className="max-h-48 mx-auto rounded-lg object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                        <span className="text-white">تغییر تصویر</span>
                      </div>
                      {preview && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteImage();
                          }}
                          className="absolute -top-2 -right-2 bg-red-500 text-white text-xl font-bold rounded-full flex items-center justify-center w-10 h-10 hover:bg-red-600 transition-colors duration-300">
                          ✕
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-500 dark:text-gray-400 py-8">
                      <Icons.addImage className="mx-auto h-12 w-12 mb-4" />
                      <p className="text-sm">برای آپلود تصویر کلیک کنید</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">
                        یا تصویر را اینجا رها کنید
                      </p>
                    </div>
                  )}
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="نام آیتم"
                  className="border rounded-lg p-2  dark:text-white dark:bg-darkpalleteDark transition-all duration-300 border-gray-300 dark:border-graypalleteDark"
                />
                <textarea
                  rows="4"
                  cols="50"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  placeholder="توضیحات"
                  className="border border-gray-300 dark:border-graypalleteDark rounded-lg p-2 dark:bg-darkpalleteDark dark:text-white transition-colors duration-300"
                />
                <div className="flex flex-col md:flex-row items-center gap-2">
                  <select
                    name="category_id"
                    id="category_id"
                    value={categoryId}
                    className="border w-full md:w-1/2 rounded-lg p-2 text-gray-600 dark:text-gray-300 dark:bg-darkpalleteDark transition-all duration-300 border-gray-300 dark:border-graypalleteDark"
                    onChange={(e) => setCategoryId(e.target.value)}>
                    <option value="1">کافه</option>
                    <option value="2">کیک و دسر</option>
                    <option value="3">نوشیدنی گرم</option>
                    <option value="4">نوشیدنی سرد</option>
                    <option value="5">غذا</option>
                  </select>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                    placeholder="قیمت"
                    className="border w-full md:w-1/2 rounded-lg p-2 dark:text-white dark:bg-darkpalleteDark transition-all duration-300 border-gray-300 dark:border-graypalleteDark"
                  />
                </div>
                <div className="max-h-fit">
                  <div className="flex items-center gap-2 pb-2">
                    <label
                      htmlFor="off"
                      className="dark:text-white transition-colors duration-300">
                      تخفیف ویژه
                    </label>
                    <input
                      type="checkbox"
                      name="sale"
                      id="sale"
                      onChange={(e) => {
                        setInSale(e.target.checked);
                        setShowOffValue(e.target.checked); // اگر لازم است
                      }}
                      checked={showOffValue}
                    />
                  </div>
                  <input
                    type="text"
                    name="sale_price"
                    id="sale_price"
                    placeholder="قیمت با تخفیف"
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    className={`border border-gray-300 dark:border-graypalleteDark rounded-lg p-2 dark:bg-darkpalleteDark dark:text-white transition-colors duration-300 ${
                      showOffValue
                        ? "opacity-100 scale-100"
                        : "opacity-0 !max-h-0 scale-0 overflow-hidden"
                    }`}
                  />
                </div>
                <button className="w-full bg-adminAction dark:bg-adminActionDark px-3 py-2 rounded-xl text-xl text-white hover:bg-adminActionDark dark:hover:bg-adminAction transition-colors duration-300">
                  اصلاح کردن
                </button>
                <p className="text-adminError transition-colors duration-300">
                  {textError}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditItem;
