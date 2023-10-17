import React from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const PofileReminderModal = ({ show, setShow }) => {
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  return (
    <div className="mx-5">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <p
            onClick={handleClose}
            style={{ cursor: "pointer", color: "#6D747A" }}
            className="mb-0 me-1 fs-md-5 text-end "
          >
            &#10006;
          </p>
          <div className="d-flex flex-column gap-4 profileModal">
            <button
              className="primaryButton subBtn"
              onClick={() => navigate("/profile")}
            >
              My profile
            </button>
            <button className="secondaryButton subBtn" onClick={handleClose}>
              Remind me later
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PofileReminderModal;
