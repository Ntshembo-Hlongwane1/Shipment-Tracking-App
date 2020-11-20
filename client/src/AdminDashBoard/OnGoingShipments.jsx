import React, { useEffect, useState } from "react";
import "../StyleSheet/OnGoingShipments.css";
import axios from "axios";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
const OnGoingShipments = () => {
  const [shipments, setShipments] = useState(null);

  useEffect(() => {
    const url = "/api/all-pending-shipments";

    axios
      .get(url)
      .then((response) => {
        setShipments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const ChangeStatus = (ID, status) => {
    const url = `/api/update-status/${ID}`;
    const data = new FormData();
    data.append("status", status);

    axios
      .post(url, data)
      .then((response) => {
        alert(response.data.msg);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="OnGoingShipments">
      {shipments && (
        <div className="OnGoingShipments__details">
          {shipments.map((info) => {
            return (
              <div className="detail" key={info._id}>
                <div className="detail__locations">
                  <h3 className="locations-current">{`Current Location: ${info.current_location}`}</h3>
                  <ArrowRightAltIcon />
                  <h3 className="locations-destination">{`Destination: ${info.shipment_orders.fullAddress}`}</h3>
                </div>
                <div className="detail__status">
                  <h4>{`Status: ${info.shipment_orders.status}`}</h4>
                </div>
                <div className="detail__owner">
                  <h5>{`Owner: Mr/Mrs ${info.owner_lastname} ${info.owner_firstname}`}</h5>
                </div>
                <div className="detail__ownermail">
                  <h5>{`Email: ${info.owner_email}`}</h5>
                </div>
                <button
                  className="btn btn-leftwarehouse"
                  disabled={info.shipment_orders.status === "Left Warehouse"}
                  onClick={() => ChangeStatus(info._id, "Left Warehouse")}
                >
                  Left Warehouse
                </button>
                <button
                  className="btn btn-delivered"
                  disabled={info.shipment_orders.status === "Delivered"}
                  onClick={() => ChangeStatus(info._id, "Delivered")}
                >
                  Delivered
                </button>
                <button
                  className="btn btn-cancel"
                  disabled={info.shipment_orders.status === "Canceled"}
                  onClick={() => ChangeStatus(info._id, "Canceled")}
                >
                  Cancel
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OnGoingShipments;
