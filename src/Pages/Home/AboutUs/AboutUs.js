import React from "react";
import aboutus from "../../../assets/Images/AboutUs/aboutus.jpg";
import useTitle from "../../../hooks/useTitle";

const AboutUs = () => {
  useTitle("About");
  return (
    <section
      className="text-center text-white py-12 mt-6"
      style={{
        background: `url(${aboutus})`,
        backgroundSize: "cover",
      }}
    >
      <h2 className="text-5xl font-bold">About Us</h2>
      <div className="mt-14">
        <h1 className="text-3xl font-bold">-VISION-</h1>
        <p>To be nationnally reconnised as an innovative mobile resal market.</p>
      </div>
      <div className="mt-14">
        <h1 className="text-3xl font-bold">-MISSON-</h1>
        <p>To be nationnally reconnised as an innovative mobile resal market.</p>
      </div>
      <div className="mt-14">
        <h1 className="text-3xl font-bold">-VALUES-</h1>
        <p>FIT | INNOVATION | QUALITY | SENSUALITY</p>
      </div>
    </section>
  );
};

export default AboutUs;
