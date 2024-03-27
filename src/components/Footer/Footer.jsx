import React from "react";
import { Link } from "react-router-dom";
import { SlSocialFacebook } from "react-icons/sl";
import { SlSocialInstagram } from "react-icons/sl";
import { RiTwitterXLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="container">
      <div className="footer-section">
        <div className="footer-logo-side">
          <h2>HoofAndHorn.pk</h2>
          <p>
            Copyright 2024 FarmHouse. All <br></br>Right Reserved
          </p>
          <div className="footer-social-links">
            <div className="footer-icones">
              <SlSocialFacebook />
            </div>
            <div className="footer-icones1">
              <SlSocialInstagram />
            </div>
            <div className="footer-icones2">
              <RiTwitterXLine />
            </div>
            <div className="footer-icones3">
              <FaWhatsapp />
            </div>
            <div className="footer-icones4">
              <FiYoutube />
            </div>
          </div>
        </div>
        <div className="footer-menu">
          <h3>Menu</h3>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/home">Services</Link>
            </li>
            <li>
              <Link to="/home">Blog</Link>
            </li>
            <li>
              <Link to="/home">About</Link>
            </li>
          </ul>
        </div>
        <div className="footer-menu">
          <h3>Categories</h3>
          <ul>
            <li>
              <Link to="/home">All Categories</Link>
            </li>
            <li>
              <Link to="/home">Cows</Link>
            </li>
            <li>
              <Link to="/home">Sheeps</Link>
            </li>
            <li>
              <Link to="/home">Milk</Link>
            </li>
          </ul>
        </div>
        <div className="footer-menu">
          <h3>FarmHouse</h3>
          <ul>
            <li>
              <Link to="/home">Terms & Condition</Link>
            </li>
            <li>
              <Link to="/home">Payment Details</Link>
            </li>
            <li>
              <Link to="/home">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
