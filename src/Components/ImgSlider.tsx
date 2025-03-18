import styled from "styled-components";
import { Swiper , SwiperSlide } from "swiper/react";
import {NavLink } from "react-router-dom";
import "swiper/swiper-bundle.css";
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
        slidesPerView={1.05} 
        centeredSlides={true} 
        spaceBetween={20} 
        >
            
            <SwiperSlide>
                <NavLink to="/movies">
                   <Wrap>
                    <SlideImg src="images/slider-badag.jpg" alt="badag " />
                    </Wrap>
                </NavLink>
                
            </SwiperSlide>
            <SwiperSlide>
                <NavLink to="/movies">
                <Wrap>
                <SlideImg src="images/slider-badging.jpg" alt="badag " />
                </Wrap>
                </NavLink>
            </SwiperSlide>

            <SwiperSlide>
                <NavLink to="/movies">
                <Wrap>
                    <SlideImg src="images/slider-scale.jpg" alt="badag " />
                    </Wrap>
                </NavLink>
                
            </SwiperSlide>
            <SwiperSlide>
                <NavLink to="/movies">
                <Wrap>
                <SlideImg src="images/slider-scales.jpg" alt="badag " />
                </Wrap>
                </NavLink>
            </SwiperSlide>
            
        </StyledSwiper>
        </SwiperContainer>

        </>
    )

}

const SwiperContainer=styled.div`
   width: 100%;
  min-width: 350px; 
  margin: auto;
  margin-top:30px;
  position: relative;
 padding: 0px 10px;


 
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
  border-radius: 10px;
  transition: all 0.3s ease-in-out;
  
 
  
  
 border:4px solid transparent;


&:hover {
  border:4px solid white;
  
  }

  `;

const Wrap=styled.div`
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;
  margin-bottom:40px;
 box-shadow: rgb(0 0 0 / 35%) 0px 24px 30px -10px, 
            rgb(0 0 0 / 40%) 0px 18px 20px -8px;





`;

export default ImgSlider;