import React from "react";
import styles from "./ModalImg.module.css";
import closeModalImg from "../../../asstes/icons/closeModal.svg";
const ModalImg = ({ isOpen, onClose, imageSrc, text }) => {
  if (!isOpen) return null;
  console.log("Modal");
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.closeButton}>
          <button className={styles.modalCloseButton} onClick={onClose}>
            <img src={closeModalImg} alt="closeIcon"  className={styles.closeIcon}/>
          </button>
        </div>
        <img src={imageSrc} alt="Card Image" className={styles.modalImage} />
        <div className={styles.readMore}>
          <button className={styles.readMoreButton}>Read more</button>
        </div>
      </div>
    </div>
  );
};

export default ModalImg;
