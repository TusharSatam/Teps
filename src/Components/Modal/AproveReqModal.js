import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const AproveReqModal = (props) => {
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <span onClick={props.onHide} style={{ cursor: "pointer" }} className="text-end p-4">&#10005;</span>
        <Modal.Body>
          <p>Thank you for uploading your teaching strategy.</p>
          <p>
            Your contribution to the teaching community is appreciated.
          </p>
          <div>
            <p>Please note: </p>
            <ol>
              <li>Your strategy will be uploaded subject to approval from the administrator at Things Education.</li>
              <li> Your strategy may be modified for accuracy and language before approval.</li>
              <li> Your strategy, once approved, will be put in the public domain and will be accessible to all members of the TEPS community.</li>
            </ol>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AproveReqModal;