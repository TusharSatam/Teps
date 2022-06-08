import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick/lib/slider';
import Carousel1 from '../../asstes/carousel1.png'
import Carousel2 from '../../asstes/carousel2.jpg'
import Carousel3 from '../../asstes/carousel3.jpg'
import Carousel4 from '../../asstes/carousel4.jpg'
import resCar1 from '../../asstes/resCar1.png'
import resCar2 from '../../asstes/rescar2.jpg'
import resCar3 from '../../asstes/rescarousel3.jpg'
import resCar4 from '../../asstes/20220519_104314.jpg'
import './carousel.css'

const LandingCarousel = () => {
    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1
    }
    return (
        <div className='mx-4 mx-md-4 mx-xl-0'>
            <Slider {...settings} className="d-none d-md-block">
                <div className='d-flex justify-content-center'>
                    <img className='slider_img' src={Carousel1} alt="" />
                </div>
                <div className='d-flex justify-content-center'>
                    <img className='slider_img' src={Carousel2} alt="" />
                </div>
                <div className='d-flex justify-content-center'>
                    <img className='slider_img' src={Carousel3} alt="" />
                </div>
                <div className='d-flex justify-content-center'>
                    <img className='slider_img' src={Carousel4} alt="" />
                </div>
            </Slider>
            <Slider {...settings} className="d-block d-md-none">
                <div className='d-flex justify-content-center'>
                    <img className='slider_img' src={resCar1} alt="" />
                </div>
                <div className='d-flex justify-content-center'>
                    <img className='slider_img' src={resCar2} alt="" />
                </div>
                <div className='d-flex justify-content-center'>
                    <img className='slider_img' src={resCar3} alt="" />
                </div>
                <div className='d-flex justify-content-center'>
                    <img className='slider_img' src={resCar4} alt="" />
                </div>
            </Slider>
        </div>
    );
};

export default LandingCarousel;