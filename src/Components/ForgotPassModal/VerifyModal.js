import React from 'react';
import { Modal } from 'react-bootstrap';
import './forgotmodal.css'
const VerifyModal = ({ show, setShow, wrong, noti1, noti2 }) => {
  const handleClose = () => setShow(false);
  return (
    <div className='mx-5'>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="verify-modal"
      >

        <Modal.Body>
          <p onClick={handleClose} style={{ cursor: 'pointer', color: '#6D747A' }} className='mb-0 me-1 fs-md-5 text-end '>&#10006;</p>
          {
            !wrong ?
              <div className='text-center'>
                <div className={!noti1 && "px-4 px-md-5 mb-4"}>
                  <h3 className="verify_head">{noti1 ? noti1 : "Verify your email address!"}</h3>
                  <p className={noti1 ? "verify_subhead px-md-5" : "verify_subhead px-4"}>We've emailed you a verification link. Please check your inbox.</p>
                </div>
                {!noti1 && <hr style={{ border: "1px solid #CED4DA", marginTop: '0px', marginBottom: "0px", marginLeft: "40px", marginRight: "40px" }} />}
                <p className={noti2 ? "verify_footerT px-2 py-2" : "verify_footerT py-md-3 pt-2"}>{noti2 ? noti2 : <>Note: Please sign-in with your registered Email after verifying the Email.</>}</p>
                {/* <p className={noti2 ? "verify_footerT px-2 py-2" : "verify_footerT"}>{noti2 ? noti2 : <><span className="verify_footer">Note: </span>"Please sign-in with your registered Email after verifying the Email."</>}</p> */}
              </div> :
              <div className='text-center'>
                <div className='px-5'>
                  <h3 className="verify_head">Wrong Email Address!</h3>
                  <p className="verify_subhead">{wrong}</p>
                </div>
                <hr style={{ border: "1px solid #CED4DA", marginTop: '0px', marginBottom: "0px", marginLeft: "40px", marginRight: "40px" }} />
                <p className="verify_footerT">Please add a valid email address</p>
              </div>
          }

        </Modal.Body>
      </Modal>
    </div>
  );
};

export default VerifyModal;