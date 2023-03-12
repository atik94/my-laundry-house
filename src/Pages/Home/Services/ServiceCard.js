import React from "react";
import { Link } from "react-router-dom";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

const ServiceCard = ({ service }) => {
  const { _id, image, title, price, description } = service;
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
      <figure>
        <PhotoProvider
          bannerVisible={false}
          speed={() => 800}
          easing={(type) => (type === 2 ? "cubic-bezier(0.36, 0, 0.66, -0.56)" : "cubic-bezier(0.34, 1.56, 0.64, 1)")}
        >
          <PhotoView src={image}>
            <img className="w-screen" src={image} style={{ objectFit: "cover" }} alt="" />
          </PhotoView>
        </PhotoProvider>
      </figure>

      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <h2 className="text-3xl text-orange-600">Price: {price}TK</h2>
        <p>{description.length > 100 ? <>{description.slice(0, 100) + "..."}</> : description}</p>
        <div className="card-actions justify-end ">
          <Link to={`/viewDetails/${_id}`}>
            <button className="btn btn-primary">View Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
