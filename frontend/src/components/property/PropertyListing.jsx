import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProperties } from "../../store/Property/propertyAction";

function PropertyListing() {
  const dispatch = useDispatch();
  const { properties, loading } = useSelector(
    (state) => state.properties
  );

  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  if (loading) return <h2>Loading properties...</h2>;

  return (
    <div className="property-list">
      <h2>Property Listings</h2>
      <div className="grid">
        {properties &&
          properties.map((property) => (
            <div key={property._id} className="card">
              <h3>{property.propertyName}</h3>
              <p>{property.address}</p>
              <p>Price: ${property.price}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PropertyListing;
