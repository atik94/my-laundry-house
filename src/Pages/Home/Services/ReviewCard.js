import React from "react";

const ReviewCard = ({ review }) => {
  const { customer, message, customerPhoto } = review;
  return (
    <section>
      <div>
        <div className="flex justify-start ml-5 gap-6">
          <div className="avatar">
            <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={customerPhoto} alt="" />
            </div>
          </div>
          <h2>
            By <span className="text-xl font-semibold">{customer}</span>
          </h2>
        </div>
        <p className="mt-5 ml-5 mb-10 font-semibold">{message}</p>
      </div>
    </section>
  );
};

export default ReviewCard;
