import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "./HomeSlider.css";
// import required modules
import { Navigation } from "swiper/modules";

const HomeSlider = ({ setCategory }) => {
  return (
    <div className="Home-Slider-main">
      <h2>Categories</h2>
      <div className="home-slider-inner">
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
            <div
              className="home-slider-content"
              onClick={() => setCategory("cow")}
            >
              <img src="/images/cow.png" alt="" />
              <div className="number-description">
                <h4>Cows</h4>
                <p>30</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="home-slider-content"
              onClick={() => setCategory("sheep")}
            >
              <img src="/images/sheep.png" alt="" />
              <div className="number-description">
                <h4>Sheep</h4>
                <p>37</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="home-slider-content"
              onClick={() => setCategory("horse")}
            >
              <img src="/images/horse.png" alt="" />
              <div className="number-description">
                <h4>Horse</h4>
                <p>19</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="home-slider-content"
              onClick={() => setCategory("goat")}
            >
              <img src="/images/goat.png" alt="" />
              <div className="number-description">
                <h4>Goat</h4>
                <p>50</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div
              className="home-slider-content"
              onClick={() => setCategory("donkey")}
            >
              <img src="/images/donkey.png" alt="" />
              <div className="number-description">
                <h4>Donkey</h4>
                <p>12</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="home-slider-content" onClick={() => setCategory("milk")}>
              <img src="/images/milk.png" alt="" />
              <div className="number-description">
                <h4>Milk</h4>
                <p>10 kg</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="home-slider-content" onClick={() => setCategory("butter")}>
              <img src="/images/butter.png" alt="" />
              <div className="number-description">
                <h4>Butter</h4>
                <p>8 kg</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="home-slider-content" onClick={() => setCategory("cheese")}>
              <img src="/images/cheese.png" alt="" />
              <div className="number-description">
                <h4>Cheese</h4>
                <p>15 kg</p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="home-slider-content" onClick={() => setCategory("yogurt")}>
              <img src="/images/yogurt.png" alt="" />
              <div className="number-description">
                <h4>Yogurt</h4>
                <p>11 kg</p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;
