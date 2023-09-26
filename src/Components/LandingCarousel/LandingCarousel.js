import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick/lib/slider";
import Carousel1 from "../../asstes/CarousalCard1.png";
import Carousel2 from "../../asstes/carousel2.jpg";
import Carousel3 from "../../asstes/carousel3.jpg";
import Carousel4 from "../../asstes/carousel4.jpg";
import resCar1 from "../../asstes/resCar1.png";
import resCar2 from "../../asstes/rescar2.jpg";
import resCar3 from "../../asstes/rescarousel3.jpg";
import resCar4 from "../../asstes/20220519_104314.jpg";
import "./carousel.css";

const LandingCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="mx-4 mx-md-4 mx-xl-0 carousalContainer">
      <Slider {...settings} className="">
        <div className="d-flex justify-content-center  align-items-center carousalCard">
          <img src={Carousel1} alt="Carousel1" className="carousalImage"/>
          <div className="carousalTextArea d-flex flex-column justify-content-center">
            <h1>Empowering Educators</h1>
            <div className="cardDetails">
              <p>
                Use the dropdown lists to find teaching strategies as per your
                grade, subject, topic and sub-topic.
              </p>
              <p>
                All our strategies are developed by our team of experts with
                years of experience in classroom teaching, lesson planning and
                research.
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center carousalCard">
          <div className="carousalTextArea d-flex flex-column innerWidth">
            <h1>Choose from 50,000+ teaching strategies! </h1>
            <div className="cardDetails">
              <p>
                Get strategies spread over various pedagogical approaches like
                inquiry-based learning, project-based learning, activity-based
                learning and many more.
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center carousalCard">
          <div className="carousalTextArea d-flex flex-column innerWidth">
            <h1>
              Get multiple teaching resources linked to specific teaching
              strategies! 
            </h1>
            <div className="cardDetails">
              <p>
                Use the dropdown lists to find teaching strategies as per your
                grade, subject, topic and sub-topic. All our strategies are
                developed by our team of experts with years of experience in
                classroom teaching, lesson planning and research.
              </p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center carousalCard">
          <div className="carousalTextArea d-flex flex-column innerWidth">
            <h1>
              Create your own teaching strategies and contribute to the TEPS
              community. 
            </h1>
            <div className="cardDetails">
              <p>
                Use the dropdown lists to find teaching strategies as per your
                grade, subject, topic and sub-topic. All our strategies are
                developed by our team of experts with years of experience in
                classroom teaching, lesson planning and research.
              </p>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default LandingCarousel;
