import React, { useEffect, useState } from "react";
import styles from "./styles/FoundationalLearning.module.css";
import ModalImg from "../Components/Modal/FoundationLearning/ModalImg";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../Components/FoundationalLearning/Card";
import backArrow from "../asstes/icons/backArrow.svg";
import { t } from "i18next";
import { getAllResource } from "../services/Resources";
import { useAuth } from "../Context/AuthContext";

const Resources = () => {
  const [cardData, setCardData] = useState([]); // Data fetched from the API
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({ imageSrc: "", text: "" });
  const [selectedOption, setSelectedOption] = useState("Constructivism");
  const [showNoItemsMessage, setShowNoItemsMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const { selectedResource } = useAuth();
  const initialItems = 9; // Initial number of items
  const itemsPerLoad = 9; // Number of items to load with each request
  const hasMore = cardData.length > items.length; // Determine if there are more items to load

  const openModal = (imageSrc, text, link) => {
    setModalData({ imageSrc, text, link });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBackClick = () => {
    window.history.go(-1);
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const fetchMoreData = () => {
    if (loading) {
      // Return if loading is already in progress
      return;
    }

    setLoading(true);

    // Simulate a fake async API call to load more items
    setTimeout(() => {
      const newItems = cardData
        .slice(items.length, items.length + itemsPerLoad)
        .map((card, index) => ({
          id: items.length + index,
          cardData: card,
        }));

      setItems([...items, ...newItems]);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    if (selectedResource) {
      setSelectedOption(selectedResource);
    }
  }, [selectedResource]);

  useEffect(() => {
    // Check if there are no items and set a delay before showing the message
    if (items.length === 0) {
      const delayToShowNoItemsMessage = setTimeout(() => {
        setShowNoItemsMessage(true);
      }, 1000); // Adjust the delay time (in milliseconds) as needed

      // Clear the timeout if the component unmounts
      return () => clearTimeout(delayToShowNoItemsMessage);
    } else {
      setShowNoItemsMessage(false);
    }
  }, [items]);
  useEffect(() => {
    getAllResource().then((res) => {
      let filterResponse = res?.data.cards.filter(
        (card) => card.category === selectedOption
      );
      setCardData(filterResponse);

      // After fetching data, you can populate the initial items
      const initialData = filterResponse
        ?.slice(0, initialItems)
        .map((card, index) => ({
          id: index,
          cardData: card,
        }));
      setItems(initialData);
    });
  }, [selectedOption]);

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center mb-1 position-relative HeadLine">
        <button className="backbutton" onClick={handleBackClick}>
          <img src={backArrow} alt="backArrow" className="mb-md-1" />
          {`${t("Back")}`}
        </button>
        <hr className="line" />
        <hr className="line" />
      </div>

      <div className={styles.selectedOptions}>
        <select
          className={styles.selectTag}
          onChange={handleSelectChange}
          value={selectedOption}
        >
          <option value="Constructivism">Constructivism</option>
          <option value="Inquiry-based Learning">Inquiry-based Learning</option>
          <option value="Project-based Learning">Project-based Learning</option>
        </select>
      </div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<div className={styles.loading}>Loading...</div>}
        className={styles.FoundationalPage}
      >
        {items.map(({ id, cardData }) => (
          <Card
            key={id}
            imageSrc={cardData.image}
            title={cardData.title}
            text={cardData.paragraph}
            readMore={cardData.link_to_readmore}
            openModal={() =>
              openModal(
                cardData.image,
                cardData.paragraph,
                cardData.link_to_readmore
              )
            }
          />
        ))}
      </InfiniteScroll>
      {showNoItemsMessage && (
        <p className={styles.noItemsText}>{showNoItemsMessage && "No resources to show."}</p>
      )}
      <ModalImg
        isOpen={isModalOpen}
        onClose={closeModal}
        imageSrc={modalData.imageSrc}
        text={modalData.text}
        readMore={modalData.link}
      />
    </div>
  );
};

export default Resources;
