import React from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';
import { postUserStratigys } from '../../services/userStratigy';
import './modal.css'
const AproveReqModal = (props) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const handleAccept = () => {
    setIsLoading(true)
    postUserStratigys(props.data)
      .then(res => {
        res && toast.success('Request Sent!', {
          duration: 4000
        });
        props.setModalShow(false)
        setIsLoading(false)
      })
      .catch(err => {
        setIsLoading(false)
      })
  }
  return (
    <div>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <span onClick={props.onHide} style={{ cursor: "pointer" }} className="text-end pe-5 pt-4">&#10005;</span>
        <Modal.Body className='px-4'>
          <p className='re_mod_title'>Thank you for uploading your teaching strategy. <br />
            Your contribution to the teaching community is appreciated.
          </p>
          <div className='mod_body'>
            <p className='note-text'>Please note: </p>
            <ol>
              <li>Your strategy will be uploaded subject to approval from the administrator at Things Education.</li>
              <li> Your strategy may be modified for accuracy and language before approval.</li>
              <li> Your strategy, once approved, will be put in the public domain and will be accessible to all members of the TEPS community.</li>
            </ol>
          </div>
          <div className='d-flex justify-content-center my-4'>
            <div>
              <button disabled={isLoading} onClick={handleAccept} className='accept_btn'> Accept</button>
            </div>
            <div>
              <button onClick={props.onHide} className='cancel_btn'>Cancel</button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AproveReqModal;