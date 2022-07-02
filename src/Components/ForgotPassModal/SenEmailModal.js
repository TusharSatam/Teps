import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import mailLogo from '../../asstes/Mail.svg'
import './forgotmodal.css'
const SenEmailModal = ({ show, setShow }) => {
    const { t } = useTranslation()
    const handleClose = () => setShow(false);
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="send_modal"
            >

                <Modal.Body
                    className="sendEmail_modal"
                >
                    <p onClick={handleClose} style={{ cursor: 'pointer', color: '#6D747A' }} className=' me-1 fs-5 text-end '>&#10006;</p>
                    <div>
                        <div className='d-flex justify-content-center'>
                            <img className='email_icon' style={{ marginTop: "100px" }} width={"110px"} height="110px" src={mailLogo} alt="" />
                        </div>
                        <div className='text-center sendMail_text'>
                            {t("recovery_mail")}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SenEmailModal;