import React from "react";
import Logo from "../images/logo.png";
import "../StyleSheet/DesktopHeader.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
const DesktopHeader = ({ isAuthenticated, isAdmin, isCustomer }) => {
  const history = useHistory();
  const LogOut = () => {
    axios
      .get("/api/logout")
      .then((response) => {
        history.push("/");
        window.location.reload(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="DesktopHeader">
      <div className="DesktopHeader__left">
        <Link to="/">
          <img src={Logo} alt="Company Logo" className="left__logo" />
        </Link>
      </div>
      <div className="DesktopHeader__right">
        {isAuthenticated === true ? (
          <h4 className="right__navLink logout-btn" onClick={LogOut}>
            Logout
          </h4>
        ) : (
          <Link className="Router__link" to="/user-signup">
            <h4 className="right__navLink">SIgnup</h4>
          </Link>
        )}
        <Link to="/customer-support" className="Router__link">
          <h4 className="right__navLink">Customer Support</h4>
        </Link>
        {isAdmin === true ? (
          <Link className="Router__link" to="/admin-dashboard">
            <h4>Admin DashBoard</h4>
          </Link>
        ) : isCustomer === true ? (
          <Link className="Router__link" to="/track-shipment">
            <h4 className="right__navLink">Track Shipment</h4>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default DesktopHeader;
