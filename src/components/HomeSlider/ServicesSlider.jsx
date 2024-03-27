import React from "react";
import { Link } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./ServicesSlider.css";
// import required modules
import { Navigation } from "swiper/modules";

const ServicesSlider = () => {
  return (
    <div className="Service-Slider-main">
     <div className="Service-list-header">
        <h4>Animals</h4>
        <Link> View All Products</Link>
      </div>
      <div className="Service-slider-inner">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="Service-slider-content">
              <img src="/images/cow.png" alt="" />
              <div className="ads-description">
                <h5>Star ads</h5>
                <p>More info</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="Service-slider-content">
              <img src="/images/sheep.png" alt="" />
              <div className="ads-description">
              <h5>Star ads</h5>
                <p>More info</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="Service-slider-content">
              <img src="/images/horse.png" alt="" />
              <div className="ads-description">
              <h5>Star ads</h5>
                <p>More info</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="Service-slider-content">
              <img src="/images/goat.png" alt="" />
              <div className="ads-description">
              <h5>Star ads</h5>
                <p>More info</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="Service-slider-content">
              <img src="/images/donkey.png" alt="" />
              <div className="ads-description">
              <h5>Star ads</h5>
                <p>More info</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="Service-slider-content">
              <img src="/images/milk.png" alt="" />
              <div className="ads-description">
              <h5>Star ads</h5>
                <p>More info</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="Service-slider-content">
              <img src="/images/butter.png" alt="" />
              <div className="ads-description">
              <h5>Star ads</h5>
                <p>More info</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="Service-slider-content">
              <img src="/images/cheese.png" alt="" />
              <div className="ads-description">
              <h5>Star ads</h5>
                <p>More info</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="Service-slider-content">
              <img src="/images/yogurt.png" alt="" />
              <div className="ads-description">
              <h5>Star ads</h5>
                <p>More info</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default ServicesSlider;
