import React from "react";
import { Modal } from "react-bootstrap";
import ratingStar from "../../../asstes/icons/ratingStar.svg"
import ratingStarFill from "../../../asstes/icons/ratingStarFill.svg"
import { t } from "i18next";
import "./RatingModal.css"
const RatingModal = ({show,handleClose,handleStarClick,setRating,rating}) => {
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="mt-5 mt-md-0 px-2 px-md-0 "
      >
        <Modal.Body className="signIn_body optionModal">
          <div>
            <div>
              <p
                onClick={handleClose}
                className=" me-1 fs-5 text-end closebutton"
              >
                &#10006;
              </p>
     
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center gap-4 ratingWrap">
              <h4>{t("Rate this strategy")}</h4>
               <div className='rateStrategy'>
                  {[1, 2, 3, 4, 5].map((starIndex) => (
                    <img
                      key={starIndex}
                      src={starIndex <= rating ? ratingStarFill : ratingStar}
                      alt={`Star ${starIndex}`}
                      onClick={() => handleStarClick(starIndex)}
                      className="ratingStar"
                    />
                  ))}
                </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default RatingModal;
