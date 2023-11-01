import React, { useState } from "react";
import styles from "./styles/FoundationalLearning.module.css";
import FoundationalCardImg from "../asstes/FoundationalLearning.png";
import ModalImg from "../Components/Modal/FoundationLearning/ModalImg";
import InfiniteScroll from "react-infinite-scroll-component";
import { css } from "react-spinners";
import Card from "../Components/FoundationalLearning/Card";
import backArrow from "../asstes/icons/backArrow.svg";
import { t } from "i18next";
const FoundationalLearning = () => {
  const cardData = [
    {
      id: 1,
      imageSrc: FoundationalCardImg,
      title: "Title text",
      text: "Lorem ipsum dolor sit amet consectetur. Placerat erat imperdiet arcu pellentesque dictumst. Vestibulum  1.",
    },
    {
      id: 2,
      imageSrc: FoundationalCardImg,
      title: "Title text",
      text: "Lorem ipsum dolor sit amet consectetur. Placerat erat imperdiet arcu pellentesque dictumst. Vestibulum  2.",
    },
  ];

  const initialItems = 21; // Initial number of items
  const itemsPerLoad = 20; // Number of items to load with each request

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ imageSrc: "", text: "" });

  const [items, setItems] = useState(
    Array.from({ length: initialItems }).map((_, index) => ({
      id: index,
      cardData: cardData[index % cardData.length],
    }))
  );

  const openModal = (imageSrc, text) => {
    setModalData({ imageSrc, text });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleBackClick = () => {
    window.history.go(-1);
  };
  const fetchMoreData = () => {
    // Simulate a fake async API call to load more items
    setTimeout(() => {
      const newItems = Array.from({ length: itemsPerLoad }).map((_, index) => ({
        id: items.length + index,
        cardData: cardData[index % cardData.length],
      }));

      setItems([...items, ...newItems]);
    }, 1000);
  };

  return (
    <div>
      <div className=" d-flex justify-content-center align-items-center mb-1 position-relative HeadLine ">
        <button className="backbutton" onClick={handleBackClick}>
          <img src={backArrow} alt="backArrow" className="mb-md-1" />
          {`${t("Back")}`}
        </button>
        <hr className="line" />
    
        <hr className="line" />
      </div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={true} // Set to true if you have more items to load
        loader={
          <div
            className={styles.loading}
            style={{
              gridColumn: "span 3", // Make the loader span 3 columns
              width: "100%",
            }}
          >
            Loading...
          </div>
        }
        className={styles.FoundationalPage}
      >
        {items.map(({ id, cardData }) => (
          <Card
            key={id}
            imageSrc={cardData.imageSrc}
            title={cardData.title}
            text={cardData.text}
            openModal={() => openModal(cardData.imageSrc, cardData.text)}
          />
        ))}
      </InfiniteScroll>

      <ModalImg
        isOpen={isModalOpen}
        onClose={closeModal}
        imageSrc={modalData.imageSrc}
        text={modalData.text}
      />
    </div>
  );
};

export default FoundationalLearning;
