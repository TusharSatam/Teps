import React, { useState } from "react";
import PageHeading from "../Components/PageHeading/PageHeading";
import styles from "./styles/Subscription.module.css";
import SubscriptionCard from "../Components/Subscription/SubscriptionCard";
import checkMark from "../asstes/icons/checkMark.svg";
const Subscription = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(2);
  let cardDetails = [
    { month: 1, amount: 549, amountPerMonths: 549 },
    { month: 3, amount: 1099, amountPerMonths: 366 },
    { month: 6, amount: 1699, amountPerMonths: 283 },
    { month: 12, amount: 3099, amountPerMonths: 258 },
  ];
  const handleCardClick = (index) => {
    setActiveCardIndex(index);
  };
  return (
    <div>
      <PageHeading title="Subscription" />
      <div className={styles.SubscriptionWrapper}>
        <h1 className={styles.subHeading}>Features:</h1>
        <div className={styles.features}>
          <div>
            <h2 className={styles.subTitle}>Free TEPS includes</h2>
            <ul>
              <li>
                <img
                  src={checkMark}
                  alt="checkIcon"
                  className={styles.checkMark}
                />
                Your Profile page
              </li>
              <li>
                <img
                  src={checkMark}
                  alt="checkIcon"
                  className={styles.checkMark}
                />
                Create Strategies
              </li>
              <li>
                <img
                  src={checkMark}
                  alt="checkIcon"
                  className={styles.checkMark}
                />
                Maintain a portfolio of your created strategies
              </li>
            </ul>
          </div>
          <div>
            <h2 className={styles.subTitle}>Paid TEPS includes</h2>
            <ul>
              <li>
                <img
                  src={checkMark}
                  alt="checkIcon"
                  className={styles.checkMark}
                />
                Your Profile page
              </li>
              <li>
                <img
                  src={checkMark}
                  alt="checkIcon"
                  className={styles.checkMark}
                />
                Create Strategies
              </li>
              <li>
                <img
                  src={checkMark}
                  alt="checkIcon"
                  className={styles.checkMark}
                />
                Maintain a portfolio of your created strategies
              </li>
              <li>
                <img
                  src={checkMark}
                  alt="checkIcon"
                  className={styles.checkMark}
                />
                Access to more than 50,000 strategies from all subjects and up
                to grade 10
              </li>
              <li>
                <img
                  src={checkMark}
                  alt="checkIcon"
                  className={styles.checkMark}
                />
                Edit existing strategies and maintain them in your portfolio
              </li>
              <li>
                <img
                  src={checkMark}
                  alt="checkIcon"
                  className={styles.checkMark}
                />
                Like, Save strategies to bookmark them for later use
              </li>
              <li>
                <img
                  src={checkMark}
                  alt="checkIcon"
                  className={styles.checkMark}
                />
                Get possible misconceptions, checks for understanding, lesson
                plans ad more based on existing teaching strategies or
                strategies that you create
              </li>
              <li>
                <img
                  src={checkMark}
                  alt="checkIcon"
                  className={styles.checkMark}
                />
                Be part of a communty of educatores
              </li>
              <li>
                <img
                  src={checkMark}
                  alt="checkIcon"
                  className={styles.checkMark}
                />
                View teaching strategies made by other educators
              </li>
              <li>
                <img
                  src={checkMark}
                  alt="checkIcon"
                  className={styles.checkMark}
                />
                Options to share your teaching strategies with the other
                educators in the community
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.cardWrapper}>
          {cardDetails.map((card, i) => (
            <SubscriptionCard
              key={i}
              month={card.month}
              amount={card.amount}
              amountPerMonths={card.amountPerMonths}
              index={i}
              isActive={i === activeCardIndex}
              onCardClick={() => handleCardClick(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
