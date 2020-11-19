import React from "react";
import Logo from "../images/logo.png";
import "../StyleSheet/DesktopHeader.css";
import { Link } from "react-router-dom";

const DesktopHeader = ({ isAuthenticated, isAdmin, isCustomer }) => {
  return (
    <div className="DesktopHeader">
      <div className="DesktopHeader__left">
        <Link to="/">
          <img src={Logo} alt="Company Logo" className="left__logo" />
        </Link>
      </div>
      <div className="DesktopHeader__right">
        {isAuthenticated && isAuthenticated ? (
          <Link to="/user-signup" className="Router__link">
            <h4 className="right__navLink">SignUp</h4>
          </Link>
        ) : (
          <h4 className="right__navLink">Logout</h4>
        )}
        <Link to="/customer-support" className="Router__link">
          <h4 className="right__navLink">Customer Support</h4>
        </Link>
        {isAdmin && isCustomer && isAdmin === "true" ? (
          <Link className="Router__link">
            <h4>Admin DashBoard</h4>
          </Link>
        ) : (
          <Link className="Router__link">
            <h4 className="right__navLink">Customer Dashboard</h4>
          </Link>
        )}
      </div>
    </div>
  );
};

export default DesktopHeader;
