import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useLoaderData, useNavigate } from "react-router-dom";

const ReviewUpdate = () => {
  const storedReview = useLoaderData();
  const [refresh, setRefresh] = useState(false);
  const [review, setReview] = useState(storedReview);
  const navigate = useNavigate();
  const handleUpdateReview = (event) => {
    event.preventDefault();
    fetch(`http://localhost:5000/reviews/${storedReview._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("You updated your reviews successfully.");
          setRefresh(!refresh);
          navigate("/dashboard/myreview");
        }
      });
  };
  const handleInputChange = (event) => {
    const field = event.target.name;
    const value = event.target.value;
    const newReview = { ...review };
    newReview[field] = value;
    setReview(newReview);
  };
  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-600 mt-4 mb-4">Please Update your Review</h2>
      <form onSubmit={handleUpdateReview}>
        {/* <input
          className="input input-bordered w-full max-w-xs"
          onChange={handleInputChange}
          defaultValue={storedReview.message}
          type="text"
          name="message"
          placeholder="message"
          required
        /> */}
        <textarea
          className="input input-bordered w-full max-w-xs"
          onChange={handleInputChange}
          defaultValue={storedReview.message}
          type="text"
          name="message"
          placeholder="message"
          required
          cols="30"
          rows="10"
        ></textarea>
        <br />
        <button type="submit" className="btn btn-success mt-3">
          Update Review
        </button>
      </form>
    </div>
  );
};

export default ReviewUpdate;
