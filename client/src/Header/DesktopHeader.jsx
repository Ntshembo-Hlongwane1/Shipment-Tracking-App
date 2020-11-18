import React from "react";
import Logo from "../images/logo.png";
import "../StyleSheet/DesktopHeader.css";
import { Link } from "react-router-dom";
const DesktopHeader = () => {
  return (
    <div className="DesktopHeader">
      <div className="DesktopHeader__left">
        <img src={Logo} alt="Company Logo" className="left__logo" />
      </div>
      <div className="DesktopHeader__right">
        <Link to="/user-signup" className="Router__link">
          <h4 className="right__navLink">SignUp</h4>
        </Link>
        <Link to="/customer-support" className="Router__link">
          <h4 className="right__navLink">Customer Support</h4>
        </Link>
      </div>
    </div>
  );
};

export default DesktopHeader;
