import React from "react";
import "../StyleSheet/MainDashBaordWindow.css";
import { Link } from "react-router-dom";
const HomeDashContent = () => {
  return (
    <div className="DashBoardContent">
      <h1 className="DashBoardContent__header">Welcome Back!</h1>
      <div className="DashBoarContent__mainWindow">
        <Link to="/admin-dashboard/pending-shipments">
          <div className="mainWindow__cards left-card">
            <h2>On Going Shipments</h2>
          </div>
        </Link>
        <Link to="/admin-dashboard/finihed-shipments">
          <div className="mainWindow__cards right-card">
            <h2>Finished Shipments</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default HomeDashContent;
