import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import ForgotModal from '../ForgotPassModal/ForgotModal';
import './loginModal.css'
const LoginModal = ({ handleClose, show, setShow }) => {
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useAuth();
    const [forgot, setForgot] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [display, setDisplay] = useState('d-none');
    const handleSIgnIn = (e) => {
        e.preventDefault();
        setIsLoading(true)
        const data = {
            'email': e.target.email.value,
            'password': e.target.password.value
        }
        axios.post("https://guarded-river-11707.herokuapp.com/api/signin", data)
            .then(res => {
                if (res.data) {
                    setShow(false)
                    // setUser(res.data.data);
                    // setIsAuthenticated(true);
                    // window.localStorage.setItem('jwt', JSON.stringify(res.data.jwt));
                    // window.localStorage.setItem('data', JSON.stringify(res.data.data));
                    // navigate('/home')
                    alert("Login Success")
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
    useEffect(() => {
        if (error === 'Invalid Password') {
            document.getElementById('authPass').style.color = "red"
            document.getElementById('labelCol').style.color = "red"
            document.getElementById('authPass').style.border = "1px solid red"
            setDisplay("d-block")
        }
    }, [error])
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
                                        <label htmlFor="">Email</label><br />
                                        <input placeholder='LilyBlom201@gmail.com' name='email' className='login_input' type="email" />
                                    </div>

                                    <div className='my-4'>
                                        <label id='labelCol' htmlFor="" style={{ marginBottom: "-20px" }} className='d-flex'>Password <span className={display}> &nbsp;(Password is incorrect.)</span></label><br />
                                        <input id='authPass' placeholder='1234567#' className='login_input' type="password" name='password' /><br />
                                        <a href="#"  ><p className='text-end forgot_pass mt-1'>Forgot Password?</p></a>
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