import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyDetails } from "../../store/PropertyDetails/propertyDetailsAction";

function PropertyDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { propertyDetails, loading } = useSelector(
    (state) => state.propertyDetails
  );

  useEffect(() => {
    if (id) {
      dispatch(getPropertyDetails(id));
    }
  }, [dispatch, id]);

  if (loading || !propertyDetails) return <h2>Loading details...</h2>;

  return (
    <div className="property-details">
      <h1>{propertyDetails.propertyName}</h1>
      <p>{propertyDetails.description}</p>
      <p>Location: {propertyDetails.address}</p>
      <h3>Price: ${propertyDetails.price} / night</h3>
    </div>
  );
}

export default PropertyDetails;
