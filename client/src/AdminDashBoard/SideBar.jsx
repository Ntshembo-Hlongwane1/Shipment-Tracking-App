import React from "react";
import FlightTakeoffIcon from "@material-ui/icons/FlightTakeoff";
import FlightLandIcon from "@material-ui/icons/FlightLand";
import HomeIcon from "@material-ui/icons/Home";
import SideLayOut from "./SideLayOut";
import "../StyleSheet/SideBar.css";
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <div className="SideBar">
      <Link to="/admin-dashboard">
        <SideLayOut Icon={HomeIcon} text={`Home`} />
      </Link>
      <Link to="/admin-dashboard/pending-shipments">
        <SideLayOut Icon={FlightTakeoffIcon} text={`On going shipments`} />
      </Link>
      <Link to="/admin-dashboard/finihed-shipments">
        <SideLayOut Icon={FlightLandIcon} text={`Finished Shipments`} />
      </Link>
    </div>
  );
};

export default SideBar;
