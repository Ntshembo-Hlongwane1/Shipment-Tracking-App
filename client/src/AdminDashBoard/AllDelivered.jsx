import React from "react";
import FinishedShipments from "./FinishedShipments";
import SideBar from "./SideBar";
import "../StyleSheet/AllDelevered.css";
import { BrowserView } from "react-device-detect";
const AllDelivered = () => {
  return (
    <div className="Delivered">
      <BrowserView>
        <SideBar />
      </BrowserView>
      <FinishedShipments />
    </div>
  );
};

export default AllDelivered;
