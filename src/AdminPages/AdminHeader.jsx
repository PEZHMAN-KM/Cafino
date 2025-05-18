import { useEffect, useState } from "react";
import ProfileImage from "../../public/Profile.jpg";

const TopMenu = ({ className, stroke }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      fill="black">
      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <title>{"Menu"}</title>
        <g
          id="Page-1"
          stroke="none"
          strokeWidth={1}
          fill="none"
          fillRule="evenodd">
          <g id="Menu">
            <rect
              id="Rectangle"
              fillRule="nonzero"
              x={0}
              y={0}
              width={40}
              height={40}
            />
            <line
              x1={5}
              y1={7}
              x2={19}
              y2={7}
              id="Path"
              className="dark:stroke-white transition-colors duration-300"
              stroke={stroke}
              strokeWidth={2}
              strokeLinecap="round"
            />
            <line
              x1={5}
              y1={17}
              x2={19}
              y2={17}
              id="Path"
              className="dark:stroke-white transition-colors duration-300"
              stroke={stroke}
              strokeWidth={2}
              strokeLinecap="round"
            />
            <line
              x1={5}
              y1={12}
              x2={19}
              y2={12}
              id="Path"
              className="dark:stroke-white transition-colors duration-300"
              stroke={stroke}
              strokeWidth={2}
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

function AdminHeader() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    }
  }, []);

  return (
    <>
      <div className="p-2 sticky top-0 z-10 bg-adminBackgroundColor dark:bg-adminBackgroundColorDark transition-colors duration-300 rounded-b-3xl">
        <div className="bg-white dark:bg-darkpalleteDark transition-colors duration-300 w-full rounded-3xl py-3 px-4 flex justify-between items-center">
          <div className="hidden md:flex gap-4 text-xl font-bold">
            <a
              href="/adminhome"
              className="text-darkpallete dark:text-white hover:text-adminPrimary dark:hover:text-adminPrimaryDark transition-colors duration-300">
              خانه
            </a>
            <a
              href="/itemmanager"
              className="text-darkpallete dark:text-white hover:text-adminPrimary dark:hover:text-adminPrimaryDark transition-colors duration-300">
              آیتم ها
            </a>
            <a
              href=""
              className="text-darkpallete dark:text-white hover:text-adminPrimary dark:hover:text-adminPrimaryDark transition-colors duration-300">
              گزارش گیری
            </a>
          </div>
          <div className="flex md:hidden">
            <TopMenu
              className="w-15 bg-adminBackgroundColor dark:bg-darkpalleteDark rounded-2xl transition-colors duration-300"
              stroke={isDark ? "#fff" : "#809FB8"}
            />
          </div>
          <div className="text-xl font-semibold md:hidden text-darkpallete dark:text-white transition-colors duration-300">
            کافـی نـو
          </div>
          <div>
            <img
              className="w-15 rounded-full border-2 border-transparent hover:border-adminPrimary dark:hover:border-adminPrimaryDark transition-all duration-300"
              src={ProfileImage}
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHeader;
