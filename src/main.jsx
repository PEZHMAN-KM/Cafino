import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./Pages/Home.jsx";
import Landing from "./Pages/Landing.jsx";
import Item from "./Pages/Item.jsx";
import Order from "./Pages/Order.jsx";
import ContactUs from "./Pages/ContactUs.jsx";
import FavoritePage from "./Pages/FavoritePage.jsx";
import AdminHome from "./AdminPages/AdminHome.jsx";
import AddItem from "./AdminPages/AddItem.jsx";
import EditItem from "./AdminPages/EditItem.jsx";
import ItemManager from "./AdminPages/ItemManager.jsx";
import WaiterPage from "./AdminPages/WaiterPage.jsx";
import AdminLogin from "./AdminPages/AdminLogin.jsx";
import ChangeUserInfo from "./AdminPages/ChangeUserInfo.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Landing" element={<Landing />}></Route>
        <Route path="/Item" element={<Item />}></Route>
        <Route path="/Order" element={<Order />}></Route>
        <Route path="/ContactUs" element={<ContactUs />}></Route>
        <Route path="/FavoritePage" element={<FavoritePage />}></Route>
        <Route path="/AdminHome" element={<AdminHome />}></Route>
        <Route path="/AddItem" element={<AddItem />}></Route>
        <Route path="/EditItem" element={<EditItem />}></Route>
        <Route path="/ItemManager" element={<ItemManager />}></Route>
        <Route path="/WaiterPage" element={<WaiterPage />}></Route>
        <Route path="/AdminLogin" element={<AdminLogin />}></Route>
        <Route path="/ChangeUserInfo" element={<ChangeUserInfo />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
