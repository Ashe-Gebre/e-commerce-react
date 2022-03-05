import React from "react";
import Announcement from "../components/Announcement";
import Catagories from "../components/Catagories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import NewsLetter from "../components/NewsLetter";
import Products from "../components/Products";
import Slider from "../components/Slider";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Catagories />
      <Products />
      <NewsLetter />
      <Footer />
    </div>
  );
};

export default Home;
