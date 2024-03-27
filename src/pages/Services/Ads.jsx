import React from 'react'
import './Ads.css'
import { IoLocationOutline } from "react-icons/io5";
import { TiEye } from "react-icons/ti";
function Ads() {
  return (
    <div className='ads'>
        <div className='service-head'>
            <h2>Services</h2>
        </div>
        <div className="service-cards">
        <div className="service-product-first">
          
        </div>
        <div className="service-product-list">
          <div className="service-image">
            <img src="/images/cow.ads.png" alt="" />
          </div>
          <div className="service-details">
            <h2>Paid Ads</h2>
            <p>More Info</p>
          </div>
        </div>
        <div className="service-product-list">
          <div className="service-image">
            <img src="/images/cow.ads.png" alt="" />
          </div>
          <div className="service-details">
            <h2>Star Ads</h2>
            <p>More Info</p>
          </div>
        </div>
        <div className="service-product-list">
          <div className="service-image">
            <img src="/images/cow.ads.png" alt="" />
          </div>
          <div className="service-details">
            <h2>Verified Ads</h2>
            <p>More Info</p>
          </div>
        </div>
        </div>


        <div className="service-cards">
        <div className="service-product-first">
          
        </div>
        <div className="service-product-list">
          <div className="service-image">
            <img src="/images/cow.ads.png" alt="" />
          </div>
          <div className="service-details">
            <h2>Banner Ads</h2>
            <p>More Info</p>
          </div>
        </div>
        <div className="service-product-list">
          <div className="service-image">
            <img src="/images/cow.ads.png" alt="" />
          </div>
          <div className="service-details">
            <h2>FarmGhar self</h2>
            <p>More Info</p>
          </div>
        </div>
        <div className="service-product-list">
          <div className="service-image">
            <img src="/images/cow.ads.png" alt="" />
          </div>
          <div className="service-details">
            <h2>Payment with</h2>
            <p>More Info</p>
          </div>
        </div>
        </div>

    </div>
  )
}

export default Ads