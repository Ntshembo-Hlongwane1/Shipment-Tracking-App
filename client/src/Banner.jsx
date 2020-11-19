import React from "react";
import BannerImage from "./images/wallpaper.jpg";
import "./StyleSheet/Banner.css";
import { Link } from "react-router-dom";
const Banner = () => {
  return (
    <div className="Banner">
      <img src={BannerImage} alt="Home Banner" className="Banner__image" />
      <div className="Banner__button">
        <Link className="Router__link" to="/request-shipment">
          <button className="Banner__btn">Ship With Us Across The Globe</button>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
