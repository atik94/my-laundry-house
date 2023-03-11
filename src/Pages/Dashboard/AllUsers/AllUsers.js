import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useTitle from "../../../hooks/useTitle";

const AllUsers = () => {
  useTitle("AllUser");
  const [user, setUser] = useState([]);
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      return data;
    },
  });

  const handleStatusUpdate = (id) => {
    fetch(`http://localhost:5000/users/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ role: "user" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          const remaining = user.filter((odr) => odr._id !== id);
          const approving = setUser.find((odr) => odr._id === id);
          approving.role = "user";

          const userVerify = [approving, ...remaining];
          return setUser(userVerify);
        }
      });
  };

  return (
    <div>
      <h2 className="text-3xl">All Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Verify</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleStatusUpdate(user._id)} className="btn btn-xs btn-primary">
                    {user.role ? user.role : "pending user"}
                  </button>
                </td>
                <td>
                  <button className="btn btn-xs btn-danger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
