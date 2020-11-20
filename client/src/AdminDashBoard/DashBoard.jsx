import React from "react";
import HomeDashContent from "./HomeDashContent";
import SideBar from "./SideBar";
import "../StyleSheet/DashBoard.css";
const DashBoard = () => {
  return (
    <div className="DashBoard">
      <div className="DashBoard__mainWindow">
        <SideBar />
        <HomeDashContent />
      </div>
    </div>
  );
};

export default DashBoard;
