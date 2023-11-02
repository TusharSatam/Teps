import React from "react";
import styles from "../../Pages/styles/Subscription.module.css";
const SubscriptionCard = (props) => {
  const { month, amount, amountPerMonths, index,isActive, onCardClick } = props;
  return (
    <div  className={`${styles.SubscriptionCard} ${isActive ? styles.activeCard : ""}`} onClick={onCardClick}>
      {month==6 && <div className={styles.discount}>save 10%</div>}
      <h1 className={styles.months}>{month} months</h1>
      <div className={styles.amountWrapper}>
        <h2 className={styles.amount}>
          ₹ {amount.toLocaleString()}
          <span>{index>0?'/per month':" for 1 month"}</span>
        </h2>
        <p className={styles.amountPerMonths}>
          {index > 0 ? ` ₹${amountPerMonths} for ${month} months` : ""}
        </p>
      </div>
      <button  className={`${styles.subscribeButton} ${isActive ? styles.activeBtn : ""}`}>Subscribe</button>
    </div>
  );
};

export default SubscriptionCard;
