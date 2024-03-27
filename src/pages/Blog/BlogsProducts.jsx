import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { TiEye } from "react-icons/ti";
import "./BlogsProducts.css";
// import "./Product.css";
// import "./ProductBlog.css"

const paragraphStyles = {
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};

const headingStyles = {
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
  display: "-webkit-box",
};
const BlogsProducts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate("/home");
  };

  return (
    <div>
      <div className="blog-outer-div">
        <div className="blog-list-outer">
          <div className="blog-product-list">
            <div className="blog-image">
              <img src="/images/blog-image.jpg" alt="" />
            </div>
            <div className="blog-details-text">
              <div className="animal-name-des">
                <h3 style={isOpen ? null : headingStyles}>15 care tips for</h3>
              </div>
              <div className="posted-place-animal">
                <p style={isOpen ? null : paragraphStyles}>
                  The problem that face hjjhjdskjkjds jdskfhksd sjjhs ddsjcbsk
                  skkjjjbsdd sd
                </p>
              </div>
              <div className="location-view">
                <div className="location-icon-place">
                  <p onClick={handleReadMore}>Read More</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-list-outer">
          <div className="blog-product-list">
            <div className="blog-image">
              <img src="/images/blog-image.jpg" alt="" />
            </div>
            <div className="blog-details-text">
              <div className="animal-name-des">
                <h3 style={isOpen ? null : headingStyles}>15 care tips for</h3>
              </div>
              <div className="posted-place-animal">
                <p style={isOpen ? null : paragraphStyles}>
                  The problem that face hjjhjdskjkjds jdskfhksd sjjhs ddsjcbsk
                  skkjjjbsdd sd
                </p>
              </div>
              <div className="location-view">
                <div className="location-icon-place">
                  <p onClick={handleReadMore}>Read More</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-list-outer">
          <div className="blog-product-list">
            <div className="blog-image">
              <img src="/images/blog-image.jpg" alt="" />
            </div>
            <div className="blog-details-text">
              <div className="animal-name-des">
                <h3 style={isOpen ? null : headingStyles}>15 care tips for</h3>
              </div>
              <div className="posted-place-animal">
                <p style={isOpen ? null : paragraphStyles}>
                  The problem that face hjjhjdskjkjds jdskfhksd sjjhs ddsjcbsk
                  skkjjjbsdd sd
                </p>
              </div>
              <div className="location-view">
                <div className="location-icon-place">
                  <p onClick={handleReadMore}>Read More</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blog-outer-div">
        <div className="blog-list-outer">
          <div className="blog-product-list">
            <div className="blog-image">
              <img src="/images/blog-image.jpg" alt="" />
            </div>
            <div className="blog-details-text">
              <div className="animal-name-des">
                <h3 style={isOpen ? null : headingStyles}>15 care tips for</h3>
              </div>
              <div className="posted-place-animal">
                <p style={isOpen ? null : paragraphStyles}>
                  The problem that face hjjhjdskjkjds jdskfhksd sjjhs ddsjcbsk
                  skkjjjbsdd sd
                </p>
              </div>
              <div className="location-view">
                <div className="location-icon-place">
                  <p onClick={handleReadMore}>Read More</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-list-outer">
          <div className="blog-product-list">
            <div className="blog-image">
              <img src="/images/blog-image.jpg" alt="" />
            </div>
            <div className="blog-details-text">
              <div className="animal-name-des">
                <h3 style={isOpen ? null : headingStyles}>15 care tips for</h3>
              </div>
              <div className="posted-place-animal">
                <p style={isOpen ? null : paragraphStyles}>
                  The problem that face hjjhjdskjkjds jdskfhksd sjjhs ddsjcbsk
                  skkjjjbsdd sd
                </p>
              </div>
              <div className="location-view">
                <div className="location-icon-place">
                  <p onClick={handleReadMore}>Read More</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-list-outer">
          <div className="blog-product-list">
            <div className="blog-image">
              <img src="/images/blog-image.jpg" alt="" />
            </div>
            <div className="blog-details-text">
              <div className="animal-name-des">
                <h3 style={isOpen ? null : headingStyles}>15 care tips for</h3>
              </div>
              <div className="posted-place-animal">
                <p style={isOpen ? null : paragraphStyles}>
                  The problem that face hjjhjdskjkjds jdskfhksd sjjhs ddsjcbsk
                  skkjjjbsdd sd
                </p>
              </div>
              <div className="location-view">
                <div className="location-icon-place">
                  <p onClick={handleReadMore}>Read More</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="blog-outer-div">
        <div className="blog-list-outer">
          <div className="blog-product-list">
            <div className="blog-image">
              <img src="/images/blog-image.jpg" alt="" />
            </div>
            <div className="blog-details-text">
              <div className="animal-name-des">
                <h3 style={isOpen ? null : headingStyles}>15 care tips for</h3>
              </div>
              <div className="posted-place-animal">
                <p style={isOpen ? null : paragraphStyles}>
                  The problem that face hjjhjdskjkjds jdskfhksd sjjhs ddsjcbsk
                  skkjjjbsdd sd
                </p>
              </div>
              <div className="location-view">
                <div className="location-icon-place">
                  <p onClick={handleReadMore}>Read More</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-list-outer">
          <div className="blog-product-list">
            <div className="blog-image">
              <img src="/images/blog-image.jpg" alt="" />
            </div>
            <div className="blog-details-text">
              <div className="animal-name-des">
                <h3 style={isOpen ? null : headingStyles}>15 care tips for</h3>
              </div>
              <div className="posted-place-animal">
                <p style={isOpen ? null : paragraphStyles}>
                  The problem that face hjjhjdskjkjds jdskfhksd sjjhs ddsjcbsk
                  skkjjjbsdd sd
                </p>
              </div>
              <div className="location-view">
                <div className="location-icon-place">
                  <p onClick={handleReadMore}>Read More</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="blog-list-outer">
          <div className="blog-product-list">
            <div className="blog-image">
              <img src="/images/blog-image.jpg" alt="" />
            </div>
            <div className="blog-details-text">
              <div className="animal-name-des">
                <h3 style={isOpen ? null : headingStyles}>15 care tips for</h3>
              </div>
              <div className="posted-place-animal">
                <p style={isOpen ? null : paragraphStyles}>
                  The problem that face hjjhjdskjkjds jdskfhksd sjjhs ddsjcbsk
                  skkjjjbsdd sd
                </p>
              </div>
              <div className="location-view">
                <div className="location-icon-place">
                  <p onClick={handleReadMore}>Read More</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogsProducts;
