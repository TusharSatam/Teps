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
        {buttonText === t("Yes") && (
          <button className="secondaryButton my-2" onClick={onClickNo}>
            {t("No")}
          </button>
        )}
      </div>
    </div>
  );
};

const PublishStrModal = ({
  show,
  handleClose,
  setisStrategyPublic,
  setDatas,
  Datas,
  submitType,
}) => {
  const [currentModal, setCurrentModal] = useState(1);
  const [isStrPublic, setisStrPublic] = useState(false)
const {selectLang}=useAuth()
  const handleYes = () => {
    // Update isPublic to true
    setisStrategyPublic(true)
    setisStrPublic(true)
    const updatedData = { ...Datas, isPublic: true };
    console.log("Updated Data:", updatedData); // Log the updated data
    setDatas(updatedData);

    // Call postUserStratigys with updated data
    if(selectLang=="english"){
      postUserStratigys(updatedData).then((res) => {
        console.log("Response from postUserStratigys:", res);
      });
    }
    else if(selectLang=="hindi"){
      postUserStratigysHi(updatedData).then((res) => {
        console.log("Response from postUserStratigys:", res);
      });     
    }
    else{
      console.log("error");
    }
    setCurrentModal(2);

  };

  const handleNo = () => {
    // Update isPublic to false
    setisStrPublic(false)
    setisStrategyPublic(false)
    const updatedData = { ...Datas, isPublic: false };
    console.log("Updated Data No: ", updatedData); // Log the updated data
    setDatas(updatedData);

    // Call postUserStratigys with updated data
    if(selectLang=="english"){
      postUserStratigys(updatedData).then((res) => {
        console.log("Response from postUserStratigys:", res);
      });
    }
    else if(selectLang=="hindi"){
      postUserStratigysHi(updatedData).then((res) => {
        console.log("Response from postUserStratigys:", res);
      });     
    }
    else{
      console.log("error");
    }

    setCurrentModal(2);

  };

  const handleModal2 = () => {
    if(isStrPublic){
      setCurrentModal(3);
    }
    else{
      handleClose()
    }
  };

  const handleModal3 = () => {
    handleClose();
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
            <ModalContent
            text={submitType.buttonType==="Public"?t(
              `Your ${submitType.formType==="Edited"?"edited":"created"} strategy will be reviewed by the TEPS team before it is published. You will have your strategy in your ${submitType.formType==="Edited"?"Edited":"Created"} Strategies list on the Profile Page.`
            ):t(`Your ${submitType.formType==="Edited"?"edited":"created"} strategy is in your ${submitType.formType==="Edited"?"Edited":"Created"} Strategies list on the Profile Page.`)}
            buttonText={t("Okay")}
            onClick={handleModal3}
          />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PublishStrModal;
