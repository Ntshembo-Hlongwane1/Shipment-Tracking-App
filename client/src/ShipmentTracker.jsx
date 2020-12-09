import React, { useState } from "react";
import axios from "axios";
import "./StyleSheet/ShipmentTracker.css";
import TrackerMap from "./TrackerMap";
const ShipmentTracker = () => {
  const [shipmentOrder, setShipmentOrder] = useState(null);
  const [shipmentDetails, setShipmentDetails] = useState(null);
  const TrackOrder = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("shipment_id", shipmentOrder);

    const url = "http://localhost:5000/api/track-shipment";
    axios
      .post(url, data, { withCredentials: true })
      .then((response) => {
        setShipmentDetails(response.data);
      })
      .catch((error) => {
        alert(error.response.data.msg);
        console.log(error.response.data);
      });
  };
  return (
    <>
      {shipmentDetails === null ? (
        <div className="ShipmentTracker">
          <h1>Track Your Order.</h1>
          <input
            type="text"
            placeholder="Enter your tracking ID"
            onChange={(e) => setShipmentOrder(e.target.value)}
            className="ShipmentTracker__inputField"
          />
          <button onClick={TrackOrder}>Track Order</button>
        </div>
      ) : (
        <div className="ShipmentTracker__details">
          <div className="details__destination">
            <h2 className="location-current">{`Current Location: ${shipmentDetails.current_location}`}</h2>
            <h2>
              <span>:</span>
            </h2>
            <h2 className="location-destination">{`Destination: ${shipmentDetails.shipment_orders.fullAddress}`}</h2>
          </div>
          <div className="details__shipmentDetails">
            <h3>Shipment Details</h3>
            <div className="shipmentDetails__status">
              <h4>{`Status: ${shipmentDetails.shipment_orders.status}`}</h4>
            </div>
            <h4>{`Shipment ID: ${shipmentDetails._id}`}</h4>
            <h4>{`Shipment Total Weight: ${shipmentDetails.shipment_orders.weight}Kg`}</h4>
          </div>
          <TrackerMap location={shipmentDetails.current_location} />
        </div>
      )}
    </>
  );
};

export default ShipmentTracker;
