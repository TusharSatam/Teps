import React from "react";
import styles from "./ModalImg.module.css";
import closeModalImg from "../../../asstes/icons/closeModal.svg";
const ModalImg = ({ isOpen, onClose, imageSrc, text,readMore }) => {
  if (!isOpen) return null;
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
          <a href={readMore} target="_blank" rel="noopener noreferrer" className={styles.readMoreButton}>Read more</a>
        </div>
      </div>
    </div>
  );
};

export default ModalImg;
