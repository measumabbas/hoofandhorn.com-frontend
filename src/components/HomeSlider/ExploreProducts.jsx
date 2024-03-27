import React from "react";
import "./ExploreProducts.css";

const ExploreProducts = () => {
  return (
    <div className="Explore-main">
      <div className="head">
        <h3>Explore Products by farmGhar</h3>
      </div>

      <div className="squares">
        <div className="square">
            <div className="icon">
                <img src="/images/tick.svg" alt="" />
            </div>
            <div className="form-text">
            <h4>farmGhar</h4>
            </div>
            <div className="form-text">
            <h4>Verified</h4>
            </div>
        </div>
        <div className="square">
            <div className="icon">
                <img src="/images/form.svg" alt="" />
            </div>
            <div className="form-text">
            <h4>farmGhar</h4>
            </div>
            <div className="form-text">
            <h4>Home Delivery</h4>
            </div>
        </div>
        <div className="square">
            <div className="icon">
                <img src="/images/ghar.svg" alt="" />
            </div>
            <div className="form-text">
            <h4>farmGhar</h4>
            </div>
            <div className="form-text">
            <h4>Delivery Gurantee</h4>
            </div>
        </div>        
      </div>
    </div>
  ); 
};

export default ExploreProducts;
