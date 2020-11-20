import React from "react";
import OnGoingShipments from "./OnGoingShipments";
import SideBar from "./SideBar";
import "../StyleSheet/PendingShipments.css";
const PendingShipments = () => {
  return (
    <div className="Pending">
      <SideBar />
      <OnGoingShipments />
    </div>
  );
};

export default PendingShipments;
