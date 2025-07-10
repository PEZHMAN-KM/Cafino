import React, { useRef, useState, lazy, Suspense, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimationContext } from "../constants/AnimationContext.jsx";
import LoadingIcon from "../../public/Icon.svg";

import AdminLogin from "./AdminLogin.jsx";

import WaiterHeader from "./WaiterHeader.jsx";
import WaiterFooter from "./WaiterFooter.jsx";

import AdminHeader from "./AdminHeader.jsx";
import AdminFooter from "./AdminFooter.jsx";

const AdminHome = lazy(() => import("./AdminHome.jsx"));
const ItemManager = lazy(() => import("./ItemManager.jsx"));
const AddItem = lazy(() => import("./AddItem.jsx"));
const EditItem = lazy(() => import("./EditItem.jsx"));
const ChangeUserInfo = lazy(() => import("./ChangeUserInfo.jsx"));
const AddWaiter = lazy(() => import("./AddWaiter.jsx"));
const WaiterPage = lazy(() => import("./WaiterPage.jsx"));
const WaiterOrder = lazy(() => import("./WaiterOrder.jsx"));
const AdminSetting = lazy(() => import("./AdminSetting.jsx"));

const Admin = () => {
  // ANIMATION CONTROLLER --------------------------------------------------------
  const [shouldAnimate, setShouldAnimate] = useState(true);

  useEffect(() => {
    const isNoAnim = document.body.classList.contains("no-anim");
    setShouldAnimate(!isNoAnim);
  }, []);

  const MotionOrDiv = shouldAnimate ? motion.div : "div";
  //--------------------------------------------------------------------------------

  const [footerShrink, setFooterShrink] = useState(false);
  const [headerShrink, setHeaderShrink] = useState(false);
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [isDark, setIsDark] = useState(false);

  const [userData, setUserData] = useState(Object);
  const [profilePic, setProfilePic] = useState(null);

  // BACK TO LOGIN -------------------------------------------------
  const logOut = () => {
    localStorage.removeItem("user_data");
    setCurrentPage(0);
  };
  //---------------------------------------------------------------

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return <AdminLogin setCurrentPage={setCurrentPage} />;
      case 1:
        return (
          <AdminHome
            setHeaderShrink={setHeaderShrink}
            setFooterShrink={setFooterShrink}
            setHeaderMenuOpen={setHeaderMenuOpen}
          />
        );
      case 2:
        return (
          <ItemManager
            setCurrentPage={setCurrentPage}
            setHeaderShrink={setHeaderShrink}
            setFooterShrink={setFooterShrink}
            setHeaderMenuOpen={setHeaderMenuOpen}
          />
        );
      case 3:
        return <AddItem setCurrentPage={setCurrentPage} />;
      case 4:
        return <EditItem setCurrentPage={setCurrentPage} />;
      case 5:
        return <ChangeUserInfo setCurrentPage={setCurrentPage} />;
      case 6:
        return <AddWaiter setCurrentPage={setCurrentPage} />;
      case 7:
        return (
          <WaiterPage
            setFooterShrink={setFooterShrink}
            userData={userData}
            setHeaderShrink={setHeaderShrink}
            setHeaderMenuOpen={setHeaderMenuOpen}
          />
        );
      case 8:
        return (
          <WaiterOrder
            setFooterShrink={setFooterShrink}
            setHeaderMenuOpen={setHeaderMenuOpen}
            setHeaderShrink={setHeaderShrink}
            footerShrink={footerShrink}
          />
        );
      case 9:
        return (
          <AdminSetting
            setIsDark={setIsDark}
            userData={userData}
            setCurrentPage={setCurrentPage}
            profilePic={profilePic}
          />
        );
      case 10:
        return (
          // <AdminSetting
          //   setIsDark={setIsDark}
          //   userData={userData}
          //   setCurrentPage={setCurrentPage}
          //   profilePic={profilePic}
          // />
          // REPORT ----------------------------
          <div></div>
        );
      case 11:
        return (
          <WaiterOrder
            setFooterShrink={setFooterShrink}
            setHeaderMenuOpen={setHeaderMenuOpen}
            setHeaderShrink={setHeaderShrink}
            footerShrink={footerShrink}
          />
        );
      default:
        return <div></div>;
    }
  };

  return (
    <AnimationContext.Provider value={shouldAnimate}>
      <div className="relative w-full min-h-screen bg-adminBackgroundColor dark:bg-adminBackgroundColorDark">
        {(currentPage == 1 ||
          currentPage == 2 ||
          currentPage == 10 ||
          currentPage == 11) && (
          <AdminHeader
            page={currentPage}
            setCurrentPage={setCurrentPage}
            headerShrink={headerShrink}
            setShowMenu={setHeaderMenuOpen}
            showMenu={headerMenuOpen}
            setUserData={setUserData}
            userData={userData}
            setIsDark={setIsDark}
            isDark={isDark}
            setProfilePic={setProfilePic}
            profilePic={profilePic}
            logOut={logOut}
          />
        )}

        {(currentPage == 7 || currentPage == 8) && (
          <WaiterHeader
            page={currentPage}
            headerShrink={headerShrink}
            setCurrentPage={setCurrentPage}
            setShowMenu={setHeaderMenuOpen}
            showMenu={headerMenuOpen}
            setUserData={setUserData}
            userData={userData}
            shouldAnimate={shouldAnimate}
            setIsDark={setIsDark}
            isDark={isDark}
            setProfilePic={setProfilePic}
            profilePic={profilePic}
            logOut={logOut}
          />
        )}

        <Suspense
          fallback={
            <div className="relative w-full min-h-screen flex justify-center items-center">
              <img
                className="size-40"
                src={LoadingIcon}
                alt="App Logo For Loading"
              />
            </div>
          }>
          <AnimatePresence mode="wait">
            <MotionOrDiv
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="relative w-full min-h-screen">
              {renderPage()}
            </MotionOrDiv>
          </AnimatePresence>
        </Suspense>

        {(currentPage == 1 ||
          currentPage == 2 ||
          currentPage == 10 ||
          currentPage == 11) && (
          <AdminFooter
            shouldAnimate={shouldAnimate}
            page={currentPage}
            setPage={setCurrentPage}
            shrink={footerShrink}
            setFooterShrink={setFooterShrink}
            setHeaderShrink={setHeaderShrink}
            setHeaderMenuOpen={setHeaderMenuOpen}
          />
        )}

        {(currentPage == 7 || currentPage == 8) && (
          <WaiterFooter
            shouldAnimate={shouldAnimate}
            page={currentPage}
            setPage={setCurrentPage}
            shrink={footerShrink}
            setFooterShrink={setFooterShrink}
            setHeaderShrink={setHeaderShrink}
            setHeaderMenuOpen={setHeaderMenuOpen}
          />
        )}
      </div>
    </AnimationContext.Provider>
  );
};

export default Admin;
