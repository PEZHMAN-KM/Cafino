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
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
