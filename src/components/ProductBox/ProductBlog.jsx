
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Product.css";
import "./ProductBlog.css"

 const paragraphStyles = {
    WebkitLineClamp:1,
    WebkitBoxOrient:'vertical',
    overflow:'hidden',
    display:'-webkit-box', 
 }

 const headingStyles = {
    WebkitLineClamp:2,
    WebkitBoxOrient:'vertical',
    overflow:'hidden',
    display:'-webkit-box',
 }
const ProductBlog = () => {

  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate();

  const handleReadMore = () =>{
    navigate('/blog');
  }

  return (
    <div className="product-outer-div">
      <div className="product-list-header">
        <h4>Our Blogs</h4>
        <Link> View All Blogs</Link>
      </div>
      <div className="product-list-outer">
        <div className="animal-product-list">
          <div className="product-image">
            <img src="/img/1.jpeg" alt="" />
          </div>
          <div className="product-details-price">
            <div className="animal-name-des">
              <h3 style={  isOpen ? null :paragraphStyles}>A Comprehensive Guide On The Difference Between Friesian And Holstein Cows</h3>
            </div>
            <div className="posted-place-animal">
              <p style={isOpen ? null : headingStyles} >A Comprehensive Guide On The Difference Between Friesian And Holstein Cows </p>
            </div>
            <div className="location-view">
              <div className="location-icon-place">
                <p onClick={handleReadMore}>Read More</p>
              </div>
            </div>
          </div>
        </div>
        <div className="animal-product-list">
          <div className="product-image">
            <img src="/img/2.jpeg" alt="" />
          </div>
          <div className="product-details-price">
            <div className="animal-name-des">
              <h3 style={  isOpen ? null :paragraphStyles}>Domestic Animals Vs Wild Animals - Importance And Benefits</h3>
            </div>
            <div className="posted-place-animal">
              <p style={isOpen ? null : headingStyles}>Domestic Animals Vs Wild Animals - Importance And Benefits</p>
            </div>
            <div className="location-view">
              <div className="location-icon-place">
                <p onClick={handleReadMore}>Read More</p>
              </div>
            </div>
          </div>
        </div>
        <div className="animal-product-list">
          <div className="product-image">
            <img src="/img/3.jpeg" alt="" />
          </div>
          <div className="product-details-price">
            <div className="animal-name-des">
              <h3 style={  isOpen ? null :paragraphStyles}>What Are The Farm Animals Name? A Detailed Guide</h3>
            </div>
            <div className="posted-place-animal">
              <p style={isOpen ? null : headingStyles}>What Are The Farm Animals Name? A Detailed Guide</p>
            </div>
            <div className="location-view">
              <div className="location-icon-place">
                <p onClick={handleReadMore}>Read More</p>
              </div>
            </div>
          </div>
        </div>
        <div className="animal-product-list">
          <div className="product-image">
            <img src="/img/4.jpeg" alt="" />
          </div>
          <div className="product-details-price">
            <div className="animal-name-des">
              <h3 style={  isOpen ? null :paragraphStyles}>What Should I Consider Before Booking Qurbani 2024?</h3>
            </div>
            <div className="posted-place-animal">
              <p style={isOpen ? null : headingStyles}>What Should I Consider Before Booking Qurbani 2024?</p>
            </div>
            <div className="location-view">
              <div className="location-icon-place">
                <p onClick={handleReadMore}>Read More</p>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="animal-product-list">
          <div className="product-image">
            <img src="https://portal.farmghar.com/images/seo-pages/170979787328539924.jpg" alt="" />
          </div>
          <div className="product-details-price">
            <div className="animal-name-des">
              <h3 style={  isOpen ? null :paragraphStyles}>Halal Slaughtering Guidelines: Australian Friesian Cows on Eid Ul Azha</h3>
            </div>
            <div className="posted-place-animal">
              <p style={isOpen ? null : headingStyles}>Halal Slaughtering Guidelines: Australian Friesian Cows on Eid Ul Azha</p>
            </div>
            <div className="location-view">
              <div className="location-icon-place">
                <p onClick={handleReadMore}>Read More</p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProductBlog;
