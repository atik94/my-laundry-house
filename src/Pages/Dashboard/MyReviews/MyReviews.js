import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import useTitle from "../../../hooks/useTitle";
import ConfirmationModal from "../../Shared/ConfirmationModal/ConfirmationModal";

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  useTitle("My Reviews");
  const [deleteReviews, setDeleteReviews] = useState(null);
  const closeModal = () => {
    setDeleteReviews(null);
  };

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/reviews?email=${user?.email}`, {
        headers: {
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  const handleDeleteReviews = (review) => {
    console.log(review);
    fetch(`http://localhost:5000/reviews/${review._id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          refetch();
          toast.success(`Review ${review.serviceName} deleted successfully`);
        }
      });
  };
  return (
    <div>
      <h2 className="text-5xl">My Reviews</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Service Title</th>
              <th>Reviews</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, i) => (
              <tr key={review._id}>
                <th>{i + 1}</th>
                <td>{review.customer}</td>
                <td>{review.serviceName}</td>
                <td>{review.message}</td>
                <td>
                  <label
                    onClick={() => setDeleteReviews(review)}
                    htmlFor="confirmation-modal"
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </label>
                  <Link to={`/dashboard/update/${review._id}`}>
                    <button className="btn btn-info btn-sm">Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteReviews && (
        <ConfirmationModal
          title={`Are you sure want to delete ?`}
          message={`If you delete ${deleteReviews.name}. It can not be undone.`}
          closeModal={closeModal}
          successAction={handleDeleteReviews}
          modalData={deleteReviews}
          successButtonName="Delete"
        ></ConfirmationModal>
      )}
    </div>
  );
};

export default MyReviews;
