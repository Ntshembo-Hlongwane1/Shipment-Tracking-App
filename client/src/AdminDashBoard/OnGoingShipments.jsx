import React, { useEffect, useState } from "react";
import "../StyleSheet/OnGoingShipments.css";
import axios from "axios";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
const OnGoingShipments = () => {
  const [shipments, setShipments] = useState(null);

  useEffect(() => {
    const url = "/api/all-pending-shipments";

    axios
      .get(url, { withCredentials: true })
      .then((response) => {
        setShipments(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const ChangeStatus = (ID, status) => {
    let driver_picking_up_order = "";
    let pickup_time = "";
    let arrival_time = "";
    const date = new Date();
    if (status === "Left Warehouse") {
      driver_picking_up_order = prompt(
        "What is the name of the driver picking up shipment order?"
      );
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      hours %= 12;
      hours = hours || 12;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      pickup_time = `${hours}:${minutes} ${ampm}`;

      const url = `/api/update-status/${ID}/${pickup_time}/${driver_picking_up_order}`;
      const data = new FormData();
      data.append("status", status);
      data.append("pickup_time", pickup_time);
      axios
        .post(url, data)
        .then((response) => {
          alert(response.data.msg);
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (status === "Delivered") {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";

      hours %= 12;
      hours = hours || 12;
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      arrival_time = `${hours}:${minutes} ${ampm}`;

      const url = `/api/update-status/${ID}/${arrival_time}/${null}`;
      const data = new FormData();
      data.append("status", status);
      data.append("arrival_time", arrival_time);
      axios
        .post(url, data)
        .then((response) => {
          alert(response.data.msg);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const url = `/api/update-status/${ID}/${null}/${null}`;
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
    }
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
                <div className="detail__pickupTime">
                  {info.pickup_time === "" ? (
                    <h4>Parcel waiting awaiting pickup</h4>
                  ) : (
                    <h4>{`Picked up at: ${info.pickup_time}`}</h4>
                  )}
                </div>
                <div className="detail__driver">
                  {info.deliverer === "" ? (
                    <h4>No Driver Assigned Yet</h4>
                  ) : (
                    <h4>{`Driver: ${info.deliverer}`}</h4>
                  )}
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
