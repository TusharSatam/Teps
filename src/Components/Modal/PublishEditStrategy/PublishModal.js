import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { t } from "i18next";
import { postUserStratigys } from "../../../services/userStratigy";
import { postUserStratigysHi } from "../../../services/userStratigyHi";
import { useAuth } from "../../../Context/AuthContext";

// Subcomponent for each modal content
const ModalContent = ({ text, buttonText, onClick,onClickNo }) => {
  return (
    <div className="modal-content noBorder">
      <p>{text}</p>
      <div className="buttons mx-auto">
        <button className="primaryButton my-2" onClick={onClick}>
          {buttonText}
        </button>
        {buttonText === "Yes" && (
          <button className="secondaryButton my-2" onClick={onClickNo}>
            No
          </button>
        )}
      </div>
    </div>
  );
};

const PublishModal = ({
  show,
  handleClose,
  setisStrategyPublic,
  seteditedDatas,
  editedDatas,
}) => {
  const [currentModal, setCurrentModal] = useState(1);
const {selectLang}=useAuth()
  const handleYes = () => {
    // Update isPublic to true
    const updatedData = { ...editedDatas, isPublic: true };
    console.log("Updated Data:", updatedData); // Log the updated data
    seteditedDatas(updatedData);

    // Call postUserStratigys with updated data
    if(selectLang=="en"){
      postUserStratigys(updatedData).then((res) => {
        console.log("Response from postUserStratigys:", res);
      });
    }
    else{
      postUserStratigysHi(updatedData).then((res) => {
        console.log("Response from postUserStratigys:", res);
      });
    }
    setCurrentModal(2);

  };

  const handleNo = () => {
    // Update isPublic to false
    const updatedData = { ...editedDatas, isPublic: false };
    console.log("Updated Data No: ", updatedData); // Log the updated data
    seteditedDatas(updatedData);

    // Call postUserStratigys with updated data
    postUserStratigys(updatedData).then((res) => {
      console.log("Response from postUserStratigys:", res);
    });

    setCurrentModal(2);

  };

  const handleModal2 = () => {
    setCurrentModal(3);
  };

  const handleModal3 = () => {
    handleClose();
  };

  const getModalContent = () => {
    switch (currentModal) {
      case 1:
        return (
          <ModalContent
            text={t("Do you want to make this strategy public?")}
            buttonText="Yes"
            onClick={handleYes}
            onClickNo={handleNo}
          />
        );
      case 2:
        return (
          <ModalContent
            text={t(
              "Your edited strategy is in your Edited Strategies list on the Profile Page."
            )}
            buttonText="Okay"
            onClick={handleModal2}
          />
        );
      case 3:
        return (
          <ModalContent
            text={t(
              "Your edited strategy will be reviewed by the TEPS team before it is published. You will have your strategy in your Edited Strategies list on the Profile Page."
            )}
            buttonText="Okay"
            onClick={handleModal3}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="mt-5 mt-md-0 px-2 px-md-0"
      >
        <Modal.Body className="signIn_body optionModal d-flex flex-column justify-content-center align-items-center">
          <div>
            <div className="d-flex flex-column justify-content-center align-items-center gap-4 ratingWrap">
              {getModalContent()}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PublishModal;
