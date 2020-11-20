import React from "react";
import "../StyleSheet/SideBarLayOut.css";
const SideLayOut = ({ Icon, text }) => {
  return (
    <div className="SideBarLayOut">
      <Icon />
      <h4>{text}</h4>
    </div>
  );
};

export default SideLayOut;
