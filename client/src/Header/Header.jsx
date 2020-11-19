import React from "react";
import { BrowserView } from "react-device-detect";
import DesktopHeader from "./DesktopHeader";
import "../StyleSheet/Header.css";
const Header = ({ authenticated, isAdmin, isCustomer }) => {
  return (
    <div className="Header">
      <BrowserView>
        <DesktopHeader
          isAuthenticated={authenticated}
          isAdmin={isAdmin}
          isCustomer={isCustomer}
        />
      </BrowserView>
    </div>
  );
};

export default Header;
