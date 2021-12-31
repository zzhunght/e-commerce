import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination,Navigation } from 'swiper';
import ssBanner from '../../../asset/ss-banner.jpg'
import xiaomiBanner from '../../../asset/xiaomi-banner.jpg'
import apBanner from '../../../asset/banner-ip-12.jpg'
import ipBanner from '../../../asset/apple-watch-banner.jpg'

import './Carouselstyle.css'
SwiperCore.use([Pagination,Navigation]);
function Carousel() {
    return (
        <div className="carousel-wr">
            <Swiper
             autoplay={true}
             slidesPerView={1} 
             spaceBetween={30} 
             loop={true} 
             pagination={{"clickable": true}} 
             navigation={true} 
             className="mySwiper my-carousel"
            >
                <SwiperSlide>
                    <div className="carousel-img">
                        <img src={ssBanner} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="carousel-img">
                        <img src={ipBanner} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="carousel-img">
                        <img src={apBanner} alt="" />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="carousel-img">
                        <img src={xiaomiBanner} alt="" />
                    </div>
                </SwiperSlide>
                
            </Swiper>   
        </div>
    )
}

export default Carousel
