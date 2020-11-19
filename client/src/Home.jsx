import React from "react";
import Banner from "./Banner";
import Header from "./Header/Header";

const Home = ({ authenticated, isAdmin, isCustomer }) => {
  return (
    <div className="Home">
      <Header
        authenticated={authenticated}
        isAdmin={isAdmin}
        isCustomer={isCustomer}
      />
      <Banner />
    </div>
  );
};

export default Home;
