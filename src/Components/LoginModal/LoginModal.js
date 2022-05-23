import React from 'react';
import { Modal } from 'react-bootstrap';
import CrossIcon from '../../asstes/cross-icon.png'
import './loginModal.css'
const LoginModal = ({ handleClose, show }) => {
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >

                <Modal.Body
                    className="signIn_body"
                >
                    <div>
                        <div>
                            <p onClick={handleClose} style={{ cursor: 'pointer', color: '#6D747A' }} className=' me-1 fs-5 text-end'>&#10006;</p>
                            <p className='text-center log_in mt-3'>Let’s get started</p>
                        </div>
                        <form action="">
                            <div className='d-flex justify-content-center'>
                                <div>
                                    <div className='my-3'>
                                        <label htmlFor="">Email</label><br />
                                        <input placeholder='LilyBlom201@gmail.com' className='login_input' type="email" />
                                    </div>

                                    <div className='my-3'>
                                        <label htmlFor="">Password</label><br />
                                        <input placeholder='1234567#' className='login_input' type="password" /><br />
                                        <a href="#"><p className='text-end forgot_pass mt-1'>Forgot Password?</p></a>
                                    </div>
                                    <input type="checkbox" name="" id="" /> <span>I am not a robot </span>
                                    <div className='d-flex justify-content-center my-5'>
                                        <button className='submit_btn'>Login</button>
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

export default LoginModal;