import React from "react";
import BreadCrumb from "./BreadCrumb";
import MainBlog from "./MainBlog";
import BlogsProducts from "./BlogsProducts";
import GetApp from "../About/GetApp";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

const Blog = () => {
  return (
    <>
      <Navbar />
      <div className="container">
        <BreadCrumb />
        <MainBlog />
        <BlogsProducts />
        <GetApp />
      </div>
      <Footer />
    </>
  );
};

export default Blog;
