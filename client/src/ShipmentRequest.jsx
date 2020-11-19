import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Map from "./Map";
import "./StyleSheet/ShipmentRequest.css";
const ShipmentRequest = ({ authenticated, isCustomer }) => {
  const history = useHistory();
  const [weight, setWeight] = useState("");
  const [confirmedInformation, setConfirmedInformation] = useState(false);
  useEffect(() => {
    const RedirectUser = () => {
      alert("Cannot request shipment without an account or not logged in");
      history.push("/user-login");
    };

    if (!authenticated) {
      RedirectUser();
    }
  }, []);
  const RequestShipment = (e) => {
    e.preventDefault();

    const fullAddress = localStorage.getItem("fullAddress");
    const address = fullAddress.replace(",", " ");
    const city = localStorage.getItem("city");
    const province = localStorage.getItem("province");
    const area = localStorage.getItem("area");

    const confirmation = prompt(
      `Cofirm is this the address you want to ship to (Y/N)? Address: ${fullAddress}`
    );

    if (confirmation === null) {
      return window.location.reload(false);
    }

    const url = "/api/request-shipment";
  };
  return (
    <div className="ShipmentRequest">
      <form className="ShipmentRequest__form">
        <h3 className="form__header">Request Shipment</h3>
        <label>
          <span className="form__requiredField">*</span>Weight Of Products To Be
          shipped
        </label>
        <input
          type="number"
          className="form__inputField"
          onChange={(e) => setWeight(e.target.value)}
        />
        <label>
          <span className="form__requiredField">*</span>Delivery Location
        </label>
        <Map />
        <button className="form-btn" onClick={RequestShipment}>
          Send Request
        </button>
      </form>
    </div>
  );
};

export default ShipmentRequest;
