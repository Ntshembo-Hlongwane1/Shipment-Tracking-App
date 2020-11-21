import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import Logo from "../images/logo.png";
import "../StyleSheet/MobileHeader.css";

const MobileHeader = ({ isAuthenticated, isAdmin, isCustomer }) => {
  const [isOpened, setIsOpened] = useState(false);

  const OpenMenu = () => {
    setIsOpened(!isOpened);
  };
  return (
    <div className="MobileHeader">
      <div className="MobileHeader__left">
        {isOpened === false ? (
          <img src={Logo} alt="Company Logo" className="MobileHeader__logo" />
        ) : null}
      </div>
      <div className="MobileHeader__right">
        {isOpened === false ? (
          <MenuIcon className="openingIcon" onClick={OpenMenu} />
        ) : (
          <div className="MobileHeader__menu">
            <div className="menu__right">
              <div className="right__userAuth">
                {isAuthenticated ? (
                  <h4>Logout</h4>
                ) : (
                  <Link
                    to="/user-signup"
                    className="Router__link"
                    onClick={OpenMenu}
                  >
                    <h4>Signup</h4>
                  </Link>
                )}
              </div>
              <Link
                to="/customer-support"
                className="Router__link"
                onClick={OpenMenu}
              >
                <h4 className="right__customerSupport">Customer Support</h4>
              </Link>
              {isAdmin ? (
                <Link
                  to="/admin-dashboard"
                  className="Router__link"
                  onClick={OpenMenu}
                >
                  <h4>Admin Dashboard</h4>
                </Link>
              ) : isCustomer ? (
                <Link
                  to="/track-shipment"
                  className="Router__link"
                  onClick={OpenMenu}
                >
                  <h4>Track Shipment</h4>
                </Link>
              ) : null}
            </div>
            <div className="menu__lefy">
              <CloseIcon onClick={OpenMenu} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
