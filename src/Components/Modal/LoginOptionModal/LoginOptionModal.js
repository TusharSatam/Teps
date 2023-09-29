import React from "react";
import { useTranslation } from "react-i18next";
import { Modal } from 'react-bootstrap';
import "./LoginOption.css"
const LoginOptionModal = ({show,handleClose,handleShow,handleRegisterForm,openLoginModal }) => {
    const { t } = useTranslation()
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
              <p className="text-center getStarted">{t("Get started by logging in or registering")}</p>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center gap-4 mt-5"> 
                <button className="primaryButton" onClick={openLoginModal}>{t("Login")}</button>
                <button className="secondaryButton" onClick={handleRegisterForm}>{t("Register")}</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default LoginOptionModal;
