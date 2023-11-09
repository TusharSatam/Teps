import React from "react";
import styles from "../../Pages/styles/Subscription.module.css";
import { useAuth } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
const SubscriptionCard = (props) => {
  const { month, amount, amountPerMonths, index,isActive, onCardClick } = props;
  const navigate = useNavigate();
const handleSubcribe=()=>{
  navigate('/payment-info')
}
  return (
    <div  className={`${styles.SubscriptionCard} ${isActive ? styles.activeCard : ""}`} onClick={onCardClick}>
      {month==6 && <div className={styles.discount}>save 10%</div>}
      <h1 className={styles.months}>{month} months</h1>
      <div className={styles.amountWrapper}>
        <h2 className={styles.amount}>
          ₹ {amountPerMonths.toLocaleString()}
          <span>{index>0?'/per month':" for 1 month"}</span>
        </h2>
        <p className={styles.amountPerMonths}>
          {index > 0 ? ` ₹${amount.toLocaleString()} for ${month} months` : ""}
        </p>
      </div>
      <button  className={`${styles.subscribeButton} ${isActive ? styles.activeBtn : ""}`} onClick={()=>handleSubcribe()}>Subscribe</button>
    </div>
  );
};

export default SubscriptionCard;
