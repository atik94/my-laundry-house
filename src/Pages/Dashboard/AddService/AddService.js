import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import useTitle from "../../../hooks/useTitle";

const AddService = () => {
  useTitle("Add-Service");
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { user } = useContext(AuthContext);
  const imageHostKey = process.env.REACT_APP_imgbb_key;

  const navigate = useNavigate();
  const handleAddService = (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          console.log(imgData.data.url);
          const addService = {
            title: data.title,
            image: imgData.data.url,
            price: parseFloat(data.price),
            rating: data.rating,
            description: data.description,
          };
          fetch("http://localhost:5000/services", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(addService),
          })
            .then((res) => res.json())
            .then((result) => {
              toast.success("Service added successfully");
              //   navigate("/dashboard/myService");
            });
        }
      });
  };

  return (
    <div className="w-96 p-7 mx-auto">
      <h2 className="text-5xl">Add a Service</h2>
      <form onSubmit={handleSubmit(handleAddService)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            type="text"
            {...register("price", { required: true })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Ratings</span>
          </label>
          <input
            type="text"
            {...register("rating", { required: true })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <input
            type="text"
            {...register("description", { required: true })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            type="file"
            placeholder="image url here"
            {...register("image", { required: true })}
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <input className="btn btn-accent w-full mt-4" value="Add Product" type="submit" />
      </form>
    </div>
  );
};

export default AddService;
