import React from "react";
import { BrowserView, MobileView } from "react-device-detect";
import DesktopHeader from "./DesktopHeader";
import "../StyleSheet/Header.css";
import MobileHeader from "./MobileHeader";
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
      <MobileView>
        <MobileHeader
          isAuthenticated={authenticated}
          isAdmin={isAdmin}
          isCustomer={isCustomer}
        />
      </MobileView>
    </div>
  );
};

export default Header;
