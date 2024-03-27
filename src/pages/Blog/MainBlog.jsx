import './MainBlog.css'
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const paragraphStyles = {
    WebkitLineClamp:8,
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
const MainBlog = () => {

  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate();

  const handleReadMore = () =>{
    navigate('/about');
  }
  return (
    <div className='Blog-Main-product'>
            <div className="main-image">
                <img src="/images/qurbani.jpg" alt="" />
            </div>
            <div className="text-right">
                <h2 style={  isOpen ? null : headingStyles}>Traditional Bakra Mandi 2024 vs farmGhar Qurbani...</h2>
                <p style={isOpen ? null : paragraphStyles}>Muslim communities worldwide excitedly await the tradition of Qurbani. There has been a noticeable change in the way individuals go about buying sacrificial animals in recent years, as new platforms such as farmGhar have emerged to challenge the traditional methods of the Traditi...</p>

                <div className='read-more-button'>
                <p onClick={handleReadMore}>Read More</p>
                </div>
            </div>

    </div>
  )
}

export default MainBlog