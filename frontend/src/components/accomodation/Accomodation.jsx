import React, { useEffect, useState } from "react";
import "../../css/Accomodation.css";
import ProgressSteps from "../ProgressSteps";
import MyAccomodation from "./MyAccomodation";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner";
import { axiosInstance } from "../../utils/axios";

const Accomodation = () => {
  const [accomodation, setAccomodation] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMyAccommodations = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get("/v1/rent/listing/my-accommodations");
        setAccomodation(data.data || []);
      } catch (error) {
        console.error("Could not fetch accommodations", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMyAccommodations();
  }, []);

  return (
    <>
      <ProgressSteps accomodation />
      <div className="accom-container">
        <Link to="/accomodationform">
          <button className="add-new-place">+ Add new place</button>
        </Link>
        {loading && <LoadingSpinner />}
        {accomodation.length === 0 && !loading && (
          <p>Accomodation not available</p>
        )}
        {accomodation.length > 0 && !loading && (
          <MyAccomodation accomodation={accomodation} loading={loading} />
        )}
      </div>
    </>
  );
};

export default Accomodation;
