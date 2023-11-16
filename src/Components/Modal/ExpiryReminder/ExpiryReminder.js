import React from "react";
import styles from "./ExpiryReminder.module.css";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const ExpiryReminder = ({ show, setShow, handleClose }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.Container}>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={`mt-5 mt-md-0 px-2 px-md-0  statusModal`}
      >
        <Modal.Body>
          <div className={styles.Container}>
            <div className={styles.closeButton}>
              <p
                onClick={handleClose}
                className=" me-1 fs-5 text-end closebutton mb-3"
              >
                &#10006;
              </p>
            </div>
            <div className={styles.buttons}>
              <h1 className="mx-3">
                Hi there! It looks like your plan has run out. Don't worry, you
                can easily renew it to keep enjoying our services
              </h1>
              <button
                className={`${styles.primaryButton}`}
                onClick={() => {
                  navigate("/subscription");
                  setShow(false);
                }}
              >
                Subscribe now!
              </button>
              <button
                className={styles.secondaryButton}
                onClick={() => setShow(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ExpiryReminder;
