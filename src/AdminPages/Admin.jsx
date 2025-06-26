import React, { useRef, useState, lazy, Suspense } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AnimationContext } from "../constants/AnimationContext.jsx";

// import Header from "./Componnets/Header.jsx";
import AdminHeader from "./AdminHeader.jsx";

import AdminLogin from "./AdminLogin.jsx";

const AdminHome = lazy(() => import("./AdminHome.jsx"));
const ItemManager = lazy(() => import("./ItemManager.jsx"));
const AddItem = lazy(() => import("./AddItem.jsx"));
const EditItem = lazy(() => import("./EditItem.jsx"));
const ChangeUserInfo = lazy(() => import("./ChangeUserInfo.jsx"));
const AddWaiter = lazy(() => import("./AddWaiter.jsx"));
const WaiterPage = lazy(() => import("./WaiterPage.jsx"));

// ANIMATION CONTROLLER --------------------------------------------------------
const shouldAnimate = !document.body.classList.contains("no-anim");
const MotionOrDiv = shouldAnimate ? motion.div : "div";

const Admin = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const renderPage = () => {
    switch (currentPage) {
      case 0:
        return <AdminLogin setCurrentPage={setCurrentPage} />;
      case 1:
        return <AdminHome />;
      case 2:
        return <ItemManager setCurrentPage={setCurrentPage} />;
      case 3:
        return <AddItem setCurrentPage={setCurrentPage} />;
      case 4:
        return <EditItem setCurrentPage={setCurrentPage} />;
      case 5:
        return <ChangeUserInfo setCurrentPage={setCurrentPage} />;
      case 6:
        return <AddWaiter setCurrentPage={setCurrentPage} />;
      case 7:
        return <WaiterPage setCurrentPage={setCurrentPage} />;
      default:
        return <div></div>;
    }
  };

  return (
    <AnimationContext.Provider value={shouldAnimate}>
      <div className="relative w-full min-h-screen bg-adminBackgroundColor dark:bg-adminBackgroundColorDark">
        {currentPage != 0 && currentPage != 5 && currentPage != 7 && (
          <AdminHeader setCurrentPage={setCurrentPage} />
        )}

        <Suspense
          fallback={<div className="p-5 text-center">در حال بارگذاری...</div>}>
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
      </div>
    </AnimationContext.Provider>
  );
};

export default Admin;
