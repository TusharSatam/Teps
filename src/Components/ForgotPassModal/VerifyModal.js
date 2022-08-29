import React from 'react';
import { Modal } from 'react-bootstrap';
import './forgotmodal.css'
const VerifyModal = ({ show, setShow, wrong }) => {
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="verify-modal"
      >

        <Modal.Body >
          <p onClick={handleClose} style={{ cursor: 'pointer', color: '#6D747A' }} className=' me-1 fs-5 text-end '>&#10006;</p>
          {
            !wrong ?
              <div className='text-center'>
                <div className='px-5'>
                  <h3 className="verify_head">Verify your Email Address!</h3>
                  <p className="verify_subhead">we have sent a verification link to your email,Please check your Inbox.</p>
                </div>
                <hr />
                <p className="verify_footerT"><span className="verify_footer">Note: </span>Please sign-in with your registered Email after verifying the Email.</p>
              </div> :
              <div className='text-center'>
                <div className='px-5'>
                  <h3 className="verify_head">Wrong Email Address!</h3>
                  <p className="verify_subhead">{wrong}</p>
                </div>
                <hr />
                <p className="verify_footerT"><span className="verify_footer">Note: </span>Please sign-in with your registered Email after verifying the Email.</p>
              </div>
          }

        </Modal.Body>
      </Modal>
    </>
  );
};

export default VerifyModal;