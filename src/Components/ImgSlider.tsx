import React from "react";
import styled from "styled-components";
import { Swiper , SwiperSlide } from "swiper/react";
import { Link, NavLink } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination,Autoplay } from 'swiper/modules';


const ImgSlider:React.FC=()=>{

    return(
        <>
        <SwiperContainer>
        <StyledSwiper 
        modules={[Navigation,Pagination,Autoplay]}
        navigation
        pagination={{clickable:true}}
        autoplay={{delay:3000}}
        loop={true}
        speed={500}
        slidesPerView={1}  
        spaceBetween={20} 
        >
            
            <SwiperSlide>
                <NavLink to="/movies">
                    <SlideImg src="images/slider-badag.jpg" alt="badag " />
                </NavLink>
                
            </SwiperSlide>
            <SwiperSlide>
                <NavLink to="/movies">
                <SlideImg src="images/slider-badging.jpg" alt="badag " />
                </NavLink>
            </SwiperSlide>

            <SwiperSlide>
                <NavLink to="/movies">
                    <SlideImg src="images/slider-scale.jpg" alt="badag " />
                </NavLink>
                
            </SwiperSlide>
            <SwiperSlide>
                <NavLink to="/movies">
                <SlideImg src="images/slider-scales.jpg" alt="badag " />
                </NavLink>
            </SwiperSlide>
            
        </StyledSwiper>
        </SwiperContainer>

        </>
    )

}

const SwiperContainer=styled.div`
   width: 100%;
  min-width: 350px; /* Adjust as per requirement */
  margin: auto;
  margin-top:30px;
  position: relative;

 &:hover{
 outline: 2px solid white; /* Outline instead of border */}
`;



const StyledSwiper=styled(Swiper)`


.swiper-button-prev,
.swiper-button-next {
  opacity: 0;
  height: 100%;
  width: 5vw;
  z-index: 1;
}

&:hover .swiper-button-prev,
&:hover .swiper-button-next {
padding-bottom:90vw;
  opacity: 1;
  
  transition: opacity 0.3s ease 0s;
  color: white;
}



.swiper-pagination-bullet {
  background: gray;
  height: 12px;
  width: 12px;
  opacity: 0.6;
}

.swiper-pagination-bullet-active {
  background: white;
  opacity: 1;
}


`;

const SlideImg = styled.img`
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
  margin: auto;
  object-fit: cover;
  border-radius: 5px;
  transition: all 0.3s ease-in-out;

  &:hover {
    
    outline-offset: -2px; /* Keeps it close to the image */
    box-shadow: 10px 10px 5px lightblue;
  }
`;


export default ImgSlider;