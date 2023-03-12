import React from "react";
import useTitle from "../../../hooks/useTitle";
import Banner from "../Banner/Banner";
import LanundryNews from "../LaundryNews/LaundryNews";
import Services from "../Services/Services";
const Home = () => {
  useTitle("Home");
  return (
    <div className="mx-5 mt-5">
      <Banner></Banner>
      <Services></Services>
      <LanundryNews></LanundryNews>
    </div>
  );
};

export default Home;
