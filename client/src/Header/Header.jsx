import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import DesktopHeader from "./DesktopHeader";
import "../StyleSheet/Header.css";
const Header = () => {
  return (
    <div className="Header">
      <BrowserView>
        <DesktopHeader />
      </BrowserView>
    </div>
  );
};

export default Header;
