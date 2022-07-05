import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import city from "../../images/city.jpg";
import mountain from "../../images/mountain.jpg";
import sunrise from "../../images/sunriseBeach.jpg";

const SliderWrapper = styled.div`
  box-sizing: border-box;
  height: 250px;
  width: 350px;
  img {
    height: 250px;
    width: 350px;
    border-radius: 70px;
    outline: 2px solid #3a9ad6;
  }
`;

export const Slider = () => {
  return (
    <SliderWrapper>
      <Swiper
        spaceBetween={30}
        effect={"fade"}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={city} alt="city" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={mountain} alt="mountain" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={sunrise} alt="sunrise" />
        </SwiperSlide>
      </Swiper>
    </SliderWrapper>
  );
};
