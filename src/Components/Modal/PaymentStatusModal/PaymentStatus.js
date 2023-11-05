import React, { useEffect } from "react";
import { Modal } from "react-bootstrap";
import printerIcon from "../../../asstes/icons/printer.svg";
import SuccessIcon from "../../../asstes/icons/paymentSuccessIcon.svg";

import PaymentSpinner from "../../../asstes/icons/PaymentSpinner.svg";
import styles from "./PaymentStatus.module.css";
import { useState } from "react";
const PaymentStatus = ({
  show,
  setShow,
  handleClose,
  isPending,
  setisPending,
}) => {

  useEffect(() => {
    setTimeout(() => {
      setisPending(false);
    }, 5000);
  }, [show]);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={`mt-5 mt-md-0 px-2 px-md-0  statusModal`}
      >
        <Modal.Body>
          {isPending ? (
            <div className={styles.pending}>
              <img
                src={PaymentSpinner}
                alt="PaymentSpinner"
                className={styles.PaymentSpinner}
              />
              <h1>Payment is processing...</h1>
              <p>Please wait and don’t close this screen</p>
            </div>
          ) : (
            <div className={styles.success}>
              <div className={styles.imagebg}></div>
              <img
                src={SuccessIcon}
                alt="SuccessIcon"
                className={styles.SuccessIcon}
              />
              <h1>Thank you for your payment</h1>
              <h3>Total Payment amount</h3>
              <h2>1111₹</h2>
              <h4>Payment method: UPI Transaction</h4>
              <button className="primaryButton" onClick={() => setShow(false)}>
                Okay
              </button>
              <button className={styles.receipt}>
                <img
                  src={printerIcon}
                  alt="printerIcon"
                  className={printerIcon}
                />
                Click here to print a receipt for additional details{" "}
              </button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PaymentStatus;
