import React from "react";
import { Link } from "react-router-dom";
import notfound from "../../../assets/Images/NotFound/notfound.jpg";

const NotFound = () => {
  return (
    <section>
      <div>
        <img className="lg:w-1/2 mx-auto mt-10" src={notfound} alt="" />
        <Link to="/">
          <button style={{ marginLeft: "45%" }} className="btn btn-info mt-4">
            Go to Home
          </button>
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
