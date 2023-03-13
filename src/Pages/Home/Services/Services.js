import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Spinner from "../../../components/Spinner/Spinner";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
    setLoading(false);
  }, []);

  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className="my-20">
      <div className="text-center mb-2">
        <h2 className="text-5xl font-bold text-orange-600 my-20">All Our Services</h2>
      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {services.slice(0, 3).map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
      <div className="text-center mt-5 mb-5">
        <Link to="/services">
          <button className="btn btn-primary">See All</button>
        </Link>
      </div>
    </div>
  );
};

export default Services;
