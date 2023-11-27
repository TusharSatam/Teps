import styles from "./LoadingCarousel.module.css";
import { useState } from "react";
import Slider from "react-slick";
import img1 from "../../asstes/carouselImg1.png";
import img2 from "../../asstes/carouselImg2.png";
import img3 from "../../asstes/carouselImg3.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [img1, img2, img3, img1, img2,img3];

function LoadingCarousel() {
  const isDesktop = window.innerWidth >= 767;
  const [imageIndex, setImageIndex] = useState(0);

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 1000,
    slidesToShow: isDesktop?3:1,
    centerMode: true,
    centerPadding: 0,
    beforeChange: (current, next) => setImageIndex(next),
    autoplay:true,
    autoplaySpeed:8000,
    pauseOnHover:false,
    pauseOnFocus:false
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.container}>
        <p>Loading... Stay with us!</p>
        <Slider {...settings}>
          {images.map((img, idx) => (
            <div
              key={idx}
              className={
                idx === imageIndex
                  ? styles.slide + " slide activeSlide " + styles.activeSlide
                  : styles.slide + " slide"
              }
              style={{
                transform:
                  idx === imageIndex
                    ? "perspective(1000px) rotateY(0deg)"
                    : idx < imageIndex
                    ? "perspective(1000px) rotateY(-30deg)"
                    : "perspective(1000px) rotateY(30deg)",
                zIndex: idx === imageIndex ? 2 : 1,
              }}
            >
              <img src={img} alt={"image"} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default LoadingCarousel;
