import React from "react";

const ReviewCard = ({ review }) => {
  const { customer, message } = review;
  return (
    <section>
      {/* <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{customer}</h2>
          <p>{message}</p>
        </div>
      </div> */}
      <div>
        <div>
          <h2>By {customer}</h2>
        </div>
        <p>{message}</p>
      </div>
    </section>
  );
};

export default ReviewCard;
