import React from "react";
import { Link } from "react-router-dom";

const LanundryNews = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://media.istockphoto.com/id/1329135522/photo/stack-of-folded-clean-sheets-surgical-clothes-and-industrial-iron-in-an-industrial-laundry.jpg?s=612x612&w=0&k=20&c=0IEKirVnN0C9m2XHIRdDF0HQjruZx_E4fY5Df6qyqLc="
          alt=""
          className=" rounded-lg shadow-2xl"
        />
        <div>
          <h1 className="text-5xl font-bold mt-5">My service Info!</h1>
          <h1 className="text-5xl font-bold">Open Time! 10 AM - 10PM</h1>
          <p className="py-12">
            Provide customer good service and healthy prices.To know more please visit my laundry house. Thank you.
          </p>
          <Link to="/services">
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LanundryNews;
