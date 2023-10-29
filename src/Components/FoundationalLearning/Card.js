// Card.js
import React from "react";
import styles from "../../Pages/styles/FoundationalLearning.module.css";
import expandImg from "../../asstes/expand.png";

const Card = ({ imageSrc, title, text, openModal }) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImageContainer}>
        <img
          src={imageSrc}
          alt="Card Image"
          className={styles.cardImage}
          onClick={openModal}
        />
        <div className={styles.imageOverlay} onClick={openModal}>
          <img src={expandImg} alt="expandImg" />
          <p className={styles.viewFullPictureText}>View Full Picture</p>
        </div>
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardText}>{text}</p>
      <div className={styles.readMore}>
        <button className={styles.readMoreButton}>Read More</button>
      </div>
    </div>
  );
};

export default Card;
