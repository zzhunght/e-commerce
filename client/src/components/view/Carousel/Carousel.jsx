import React, { useState } from 'react'
import {LeftOutlined, RightOutlined} from '@ant-design/icons'
import Slider from "react-slick";
import ssBanner from '../../../asset/ss-banner.jpg'
import xiaomiBanner from '../../../asset/xiaomi-banner.jpg'
import apBanner from '../../../asset/banner-ip-12.jpg'
import ipBanner from '../../../asset/apple-watch-banner.jpg'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Carouselstyle.css'
function Carousel() {
    // const NextArrow = ({onClick}) => (
    //     <div className="arrow next" onClick={onClick}>
    //         <RightOutlined />
    //     </div>
    // )
    // const PrevArrow = ({onClick}) => (
    //     <div className="arrow prev" onClick={onClick}>
    //         <LeftOutlined />
    //     </div>
    // )

    const [imageIndex,setImageIndex] = useState(0)
    const settings = {
        autoplay: true,
        infinite: true,
        speed: 1000,
        autoplaySpeed: 5000,
        slidesToShow: 3,
        centerPadding:0,
        // swipeToSlide: false,
        // draggable: false,
        centerMode:true,
        arrow: false,
        // nextArrow: <NextArrow /> ,
        // prevArrow: <PrevArrow /> ,
        slidesToScroll: 1,
        beforeChange: (current,next) => setImageIndex(next)
      };
    let slides = [
        ssBanner,
        xiaomiBanner,
        apBanner,
        ipBanner
    ]

    return (
        <div className="carousel-wr">
            <Slider {...settings}>
                {slides.map((img ,i ) =>(
                    <div className={`${ i === imageIndex ? "slide activeSlide" : "slide"}`} key={i}>
                        <img src={img} alt="" />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default Carousel
