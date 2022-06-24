import axios from 'axios';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './forgotmodal.css'
import ResetPass from './ResetPass';
import emailjs from '@emailjs/browser';
import SenEmailModal from './SenEmailModal';

const ForgotModal = ({ show, setShow }) => {
    const [error, setError] = useState('');
    const [sendEmail, setSendEmail] = useState(false);
    const handleClose = () => setShow(false);
    const handleForgot = (e) => {
        e.preventDefault();
        const data = {
            'email': e.target.email.value
        }

        axios.post("https://guarded-river-11707.herokuapp.com/api/forget", data)
            .then(res => {
                if (res.data.message === "Have an User") {
                    setShow(false);
                    setError('')
                    window.localStorage.setItem('email', JSON.stringify(e.target.email.value));
                    emailjs.send('service_8qg6csq', 'template_t23v1vr', {
                        "reply_to": e.target.email.value
                    }, 'RetawD6Qlh_S7pi-n')
                        .then((result) => {
                            setSendEmail(true)
                            console.log(result.text);
                        }, (error) => {
                            console.log(error.text);
                        });
                }
            })
            .catch(err => {
                if (err) {
                    setError("Didn't have any account!")
                }
            })

    }
    return (
        <>
            <SenEmailModal
                show={sendEmail}
                setShow={setSendEmail}
            />
            {/* <ResetPass
                show={pass}
                setShow={setPass}
            /> */}
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >

                <Modal.Body
                    className=""
                >
                    <div>
                        <div>
                            <p onClick={handleClose} style={{ cursor: 'pointer', color: '#6D747A' }} className=' me-1 fs-5 text-end'>&#10006;</p>
                            <p className='text-center forgot_header mt-3'>Forgot your password? Don’t worry. </p>
                            <p className='text-center forgot_subheader mt-3'>Reset your password to continue! </p>
                        </div>
                        <form onSubmit={handleForgot}>
                            <div className='d-flex justify-content-center'>
                                <div>
                                    <div className='my-3'>
                                        <label htmlFor="">Email</label><br />
                                        <input placeholder='LilyBlom201@gmail.com' name='email' className='login_input' type="email" />
                                    </div>
                                    {error ? <p className='text-danger'>{error}</p> : ''}
                                    <div className='d-flex justify-content-center my-5'>
                                        <button className='submit_btn'>Continue </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ForgotModal;