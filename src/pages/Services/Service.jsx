import React from "react";
import BreadCrumb from "./BreadCrumb";
import Ads from "./Ads";
import GetApp from "../About/GetApp";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Service = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <BreadCrumb />
        <Ads />
        <GetApp />
      </div>
      <Footer />
    </>
  );
};

export default Service;
