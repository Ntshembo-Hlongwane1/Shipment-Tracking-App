import React from "react";
import BannerImage from "./images/wallpaper.jpg";
import "./StyleSheet/Banner.css";
const Banner = () => {
  return (
    <div className="Banner">
      <img src={BannerImage} alt="Home Banner" className="Banner__image" />
      <div className="Banner__button">
        <button className="Banner__btn">Ship With Us Across The Globe</button>
      </div>
    </div>
  );
};

export default Banner;
