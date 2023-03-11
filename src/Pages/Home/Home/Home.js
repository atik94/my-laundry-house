import React from "react";
import useTitle from "../../../hooks/useTitle";
const Home = () => {
  useTitle("Home");
  return (
    <div className="mx-5 mt-5">
      <h2>This is Home page</h2>
    </div>
  );
};

export default Home;
