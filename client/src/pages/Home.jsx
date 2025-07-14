import React from "react";
import TopBanner from "../components/TopBanner";
import Categories from "../components/Categories";
import BestSellers from "../components/BestSellers";
import BottomBanner from "../components/BottomBanner";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <div>
      <TopBanner />
      <Categories />
      <BestSellers />
      <BottomBanner />
      <NewsLetter />
    </div>
  );
};

export default Home;
