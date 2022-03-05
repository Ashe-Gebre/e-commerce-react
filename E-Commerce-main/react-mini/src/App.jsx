import React from "react";
import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { BrowserRouter, Switch, Route, Routes, Link } from "react-router-dom";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.currentUser);

  console.log(user);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        {/* <Route path="/products/" exact element={<ProductList />} /> */}
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
