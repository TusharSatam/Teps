import React from 'react';
import { Modal } from 'react-bootstrap';
import mailLogo from '../../asstes/Mail.svg'
import './forgotmodal.css'
const SenEmailModal = ({ show, setShow }) => {
    const handleClose = () => setShow(false);
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >

                <Modal.Body >
                    <p onClick={handleClose} style={{ cursor: 'pointer', color: '#6D747A' }} className=' me-1 fs-5 text-end '>&#10006;</p>
                    <div className='py-5'>
                        <div className='d-flex justify-content-center'>
                            <img width={"100px"} src={mailLogo} alt="" />
                        </div>
                        <div className='text-center sendMail_text'>
                            Recovery link has been sent to  your email please check your  inbox.
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SenEmailModal;