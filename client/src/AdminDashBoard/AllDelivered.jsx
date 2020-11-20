import React from "react";
import FinishedShipments from "./FinishedShipments";
import SideBar from "./SideBar";
import "../StyleSheet/AllDelevered.css";
const AllDelivered = () => {
  return (
    <div className="Delivered">
      <SideBar />
      <FinishedShipments />
    </div>
  );
};

export default AllDelivered;
