import React from "react";
import HomeDashContent from "./HomeDashContent";
import SideBar from "./SideBar";
import "../StyleSheet/DashBoard.css";
import { BrowserView } from "react-device-detect";
const DashBoard = () => {
  return (
    <div className="DashBoard">
      <div className="DashBoard__mainWindow">
        <BrowserView>
          <SideBar />
        </BrowserView>
        <HomeDashContent />
      </div>
    </div>
  );
};

export default DashBoard;
