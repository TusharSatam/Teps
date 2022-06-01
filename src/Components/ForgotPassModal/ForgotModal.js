import axios from 'axios';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './forgotmodal.css'
import ResetPass from './ResetPass';

const ForgotModal = ({ show, setShow }) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState(false);
    const [error, setError] = useState('');
    const handleClose = () => setShow(false);
    const handleForgot = (e) => {
        e.preventDefault();
        const data = {
            'email': e.target.email.value
        }
        setEmail(e.target.email.value)
        axios.post("https://guarded-river-11707.herokuapp.com/api/forget", data)
            .then(res => {
                if (res.data.message === "Have an User") {
                    setPass(true);
                    setShow(false);
                    setError('')
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
            <ResetPass
                show={pass}
                setShow={setPass}
                email={email}
            />
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