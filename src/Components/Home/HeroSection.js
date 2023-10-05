import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../Context/AuthContext';
import './homelayout.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick/lib/slider';
import Carousel2 from '../../asstes/carousel2.jpg'
import Carousel3 from '../../asstes/carousel3.jpg'

import "../LandingCarousel/carousel.css"

const HeroSection = () => {
  const { user } = useAuth();
  const { t } = useTranslation()
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1
}


  return (

    <div className='mx-xl-0'>
        <Slider {...settings} className="d-none d-md-block">
        <div className='heroImage d-none d-md-block' >
         <h1 className='text-white text-center heroTitleName' >{t('Welcome')} {user.firstName} {user.lastName}!</h1>
    </div>
            <div  className='heroImage1 d-none d-md-block'>
            <h1 className='text-white text-center heroTitleName' >Choose from over 5000 strategies</h1>
            </div>
            <div className='d-flex justify-content-center'>
                <img id="iim" className='slider_img' src={Carousel3} alt="image" />
            </div>
            <div className='d-flex justify-content-center'>
                <img id="iim" className='slider_img' src={Carousel2} alt="image" />
            </div>
        </Slider>
      
    </div>
);
};

export default HeroSection;