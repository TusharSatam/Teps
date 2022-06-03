import axios from 'axios';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import ForgotModal from '../ForgotPassModal/ForgotModal';
import './loginModal.css'
const LoginModal = ({ handleClose, show, setShow }) => {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useAuth();
    const [forgot, setForgot] = useState(false);

    const handleSIgnIn = (e) => {
        e.preventDefault();
        const data = {
            'email': e.target.email.value,
            'password': e.target.password.value
        }
        axios.post("http://localhost:8080/api/signin", data)
            .then(res => {
                if (res.data) {
                    setShow(false)
                    setUser(res.data.data);
                    setIsAuthenticated(true);
                    window.localStorage.setItem('jwt', JSON.stringify(res.data.jwt));
                    window.localStorage.setItem('data', JSON.stringify(res.data.data));
                    navigate('/home')
                }
            })
            .catch(err => {
                console.log(err);
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
            >

                <Modal.Body
                    className="signIn_body"
                >
                    <div>
                        <div>
                            <p onClick={handleClose} style={{ cursor: 'pointer', color: '#6D747A' }} className=' me-1 fs-5 text-end'>&#10006;</p>
                            <p className='text-center log_in mt-3'>Let’s get started</p>
                        </div>
                        <form onSubmit={handleSIgnIn}>
                            <div className='d-flex justify-content-center'>
                                <div>
                                    <div className='my-3'>
                                        <label htmlFor="">Email</label><br />
                                        <input placeholder='LilyBlom201@gmail.com' name='email' className='login_input' type="email" />
                                    </div>

                                    <div className='my-3'>
                                        <label htmlFor="">Password</label><br />
                                        <input placeholder='1234567#' className='login_input' type="password" name='password' /><br />
                                        <a href="#" onClick={handleForgotShow}><p className='text-end forgot_pass mt-1'>Forgot Password?</p></a>
                                    </div>
                                    <input type="checkbox" required name="" id="" /> <span>I am not a robot </span>
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