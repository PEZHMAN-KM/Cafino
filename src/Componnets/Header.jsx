const SearchIcon = () => {
  return (
    <svg
      className="w-7"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"></path>
      </g>
    </svg>
  );
};
const TopMenu = () => {
  return (
    <svg
      className="w-10"
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
              stroke="black"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <line
              x1={5}
              y1={17}
              x2={19}
              y2={17}
              id="Path"
              stroke="black"
              strokeWidth={2}
              strokeLinecap="round"
            />
            <line
              x1={5}
              y1={12}
              x2={19}
              y2={12}
              id="Path"
              stroke="black"
              strokeWidth={2}
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

function Header({ page, text }) {
  return (
    <>
      <div
        className={`flex justify-center items-center max-w-screen gap-3 p-5 py-3 bg-backgroundcolor ${
          page !== 1 ? "sticky top-0" : ""
        }`}>
        <div className="hidden md:flex-1/4 md:flex">
          <TopMenu />
        </div>
        {page == 1 ? (
          <div className="flex-3/4 flex justify-center items-center bg-slowgray p-1.5 gap-2 rounded-xl md:flex-2/4">
            <SearchIcon />
            <input
              className="w-full"
              type="text"
              placeholder="جستجو در کافی نو"
            />
          </div>
        ) : (
          <div className="flex-3/4">
            <h1 className="text-center text-2xl font-black">{text}</h1>
          </div>
        )}
        {page == 1 ? (
          <div className="flex-1/4 md:text-end text-xl font-bold">
            کافـی نـو
          </div>
        ) : (
          <div className="hidden md:flex-1/4 md:block md:text-end text-xl font-bold">
            کافـی نـو
          </div>
        )}
      </div>
    </>
  );
}

export default Header;
