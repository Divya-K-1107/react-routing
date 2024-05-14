import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Products from "./Products/Products";
import SingleProduct from "./Products/SingleProduct";
import Articles from "./Articles/Articles";
import Admin from "./Admin/Admin";
import Sales from "./Admin/Sales";
import Sellers from "./Admin/Sellers";
import NotFound from "./NotFound/NotFound";

const AllRouting = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/products" element={<Products />}></Route>
      <Route path="/products/:id" element={<SingleProduct />}></Route>
      <Route path="/articles" element={<Articles />}></Route>
      <Route path="/admin" element={<Admin />}>
        <Route path="sales" element={<Sales />}></Route>
        <Route path="sellers" element={<Sellers />}></Route>
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};

export default AllRouting;
