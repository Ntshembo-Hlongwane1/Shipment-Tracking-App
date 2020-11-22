import React from "react";
import OnGoingShipments from "./OnGoingShipments";
import SideBar from "./SideBar";
import "../StyleSheet/PendingShipments.css";
import { BrowserView } from "react-device-detect";
const PendingShipments = () => {
  return (
    <div className="Pending">
      <BrowserView>
        <SideBar />
      </BrowserView>
      <OnGoingShipments />
    </div>
  );
};

export default PendingShipments;
