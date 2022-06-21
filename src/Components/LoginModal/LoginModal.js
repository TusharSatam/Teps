import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../apis/auth';
import { useAuth } from '../../Context/AuthContext';
import ForgotModal from '../ForgotPassModal/ForgotModal';
import './loginModal.css'
const LoginModal = ({ handleClose, show, setShow }) => {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useAuth();
    const [forgot, setForgot] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const handleSIgnIn = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const data = {
            'email': e.target.email.value,
            'password': e.target.password.value
        }
        userLogin(data)
            .then(res => {
                if (res) {
                    setShow(false)
                    setUser(res);
                    setIsAuthenticated(true);
                    window.localStorage.setItem('jwt', JSON.stringify(res.jwt));
                    window.localStorage.setItem('data', JSON.stringify(res.data));
                    navigate('/home');
                }
                setIsLoading(false)
            })
            .catch(err => {
                setError(err.response.data.message);
                setIsLoading(false)
            })
    }
    const handleForgotShow = () => {
        setForgot(true);
        setShow(false);
    }
    return (
        <>
            <ForgotModal
                show={forgot}
                setShow={setForgot}
            />
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="mt-5 mt-md-0 px-2 px-md-0"
            >

                <Modal.Body
                    className="signIn_body"
                >
                    <div>
                        <div>
                            <p onClick={handleClose} style={{ cursor: 'pointer', color: '#6D747A' }} className=' me-1 fs-5 text-end'>&#10006;</p>
                            <p className='text-center log_in mt-3'>Let’s get started!</p>
                        </div>
                        <form onSubmit={handleSIgnIn}>
                            <div className='d-flex justify-content-center'>
                                <div>
                                    <div className='my-3'>
                                        <label htmlFor="" style={{ marginBottom: "-20px" }} className={error === 'Invalid Email' ? 'd-flex text-danger' : 'd-flex'}>Email <span className={error === 'Invalid Email' ? 'd-block' : "d-none"}> &nbsp;(Email not found.)</span></label><br />
                                        <input placeholder='LilyBlom201@gmail.com' name='email' className={error === 'Invalid Email' ? "login_input text-danger border border-danger" : 'login_input'} type="email" />
                                    </div>

                                    <div className='my-4'>
                                        <label htmlFor="" style={{ marginBottom: "-20px" }} className={error === 'Invalid Password' ? 'd-flex text-danger' : 'd-flex'}>Password <span className={error === 'Invalid Password' ? 'd-block' : "d-none"}> &nbsp;(Password is incorrect.)</span></label><br />
                                        <input id='authPass' placeholder='1234567#' className={error === 'Invalid Password' ? "login_input text-danger border border-danger" : 'login_input'} type="password" name='password' /><br />
                                        <a href="#" onClick={handleForgotShow} ><p className='text-end forgot_pass mt-1'>Forgot Password?</p></a>
                                    </div>
                                    <input type="checkbox" required name="" id="" /> <span>I am not a robot </span>
                                    <div className='d-flex justify-content-center my-5'>
                                        {
                                            // isLoading ? <button disabled={isLoading} className='submit_btn'>Login</button> :
                                            <button className='submit_btn'>Login</button>
                                        }

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