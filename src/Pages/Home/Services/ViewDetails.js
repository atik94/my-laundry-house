import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import useTitle from "../../../hooks/useTitle";
import ReviewCard from "./ReviewCard";

const ViewDetails = () => {
  const { user } = useContext(AuthContext);
  const { _id, title, image, price, description, rating } = useLoaderData();

  //Show reviews for a single service in a different users.
  const [reviews, setReviews] = useState([]);
  useTitle("Reviews");
  useEffect(() => {
    fetch(`http://localhost:5000/reviews?id=${_id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [_id]);

  const handleReview = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = user?.displayName;
    const email = user?.email || "Unregistered";
    // const image = form.image.value;
    const message = form.message.value;
    const review = {
      service: _id,
      serviceName: title,
      customer: name,
      email,
      message,
    };
    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("Review submit successfully");
          form.reset();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section>
      <div className="card card-compact bg-base-100 shadow-xl">
        <figure>
          <img className="w-screen" src={image} alt="" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Service Name: {title}</h2>
          <h2 className="text-3xl text-orange-700">Price: {price}TK</h2>
          <h3>Rating: {rating}</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <h2>Reviews and ratings</h2>
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review}></ReviewCard>
          ))}
        </div>
        <div>
          {user?.uid ? (
            <>
              <h2 className="text-2xl">Write your Review here</h2>
              <form onSubmit={handleReview}>
                {/* <Link to="/login">Login</Link> */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
                  {/* <input
                    name="firstName"
                    type="text"
                    placeholder="First name"
                    className="input input-bordered w-full"
                  />
                  <input name="lastName" type="text" placeholder="Last name" className="input input-bordered w-full" />
                  <input name="image" type="text" placeholder="your img url" className="input input-bordered w-full" /> */}
                  <input
                    name="name"
                    type="text"
                    placeholder="your name"
                    defaultValue={user?.displayName}
                    className="input input-bordered w-full"
                    readOnly
                  />
                  <input
                    name="email"
                    type="text"
                    placeholder="your email"
                    defaultValue={user?.email}
                    className="input input-bordered w-full"
                    readOnly
                  />
                </div>
                <textarea
                  name="message"
                  className="textarea textarea-bordered h-24 w-full"
                  placeholder="Write your review here:"
                ></textarea>
                <input className="btn btn-primary" type="submit" value="submit" />
              </form>
            </>
          ) : (
            <p>
              please login to write a review
              <button className="btn">
                <Link to="/login">Login</Link>
              </button>
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ViewDetails;
