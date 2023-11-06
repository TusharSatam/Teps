import React, { useState } from "react";
import styles from "./CreditCard.module.css";
import calenderIcon from "../../../asstes/icons/calenderIcon.svg";
const CreditCard = ({
  setCardHolderName,
  setCardNumber,
  setExpiryDate,
  setCVV,
  cvv,
  cardHolderName,
  cardNumber,
  expiryDate,
}) => {
  return (
    <div className={styles.cardContainer}>
      <label>Cardholder's Name:</label>
      <input
        type="text"
        value={cardHolderName}
        onChange={(e) => setCardHolderName(e.target.value)}
        placeholder="Cardholder Name"
      />

      <label>Card Number:</label>
      <input
        type="text"
        value={cardNumber}
        onChange={(e) => setCardNumber(e.target.value)}
        placeholder="1234 5678 9101 1213"
      />
      <div className={styles.expiryDate_CVV}>
        <div className={styles.expiryDateWrap}>
          <label>Expiration:</label>
          <div className={styles.expiryInput}>
            <input
              type="text"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              placeholder="MM/YYYY"
            />
            <img
              src={calenderIcon}
              alt="calenderIcon"
              className={styles.calenderIcon}
            />
          </div>
        </div>
        <div className={styles.cvvWrap}>
          <label>CVV:</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCVV(e.target.value)}
            placeholder="123"
          />
        </div>
      </div>
    </div>
  );
};

export default CreditCard;
