import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../../apis/auth';
import CrossIcon from '../../asstes/cross-icon.png'
import { useAuth } from '../../Context/AuthContext';
import ForgotModal from '../ForgotPassModal/ForgotModal';
import './signUpModal.css'

const SignUpModal = ({ handleClose, show, setShow }) => {
    const [error, setError] = useState('');
    const [required, setRequired] = useState('');
    const [emailError, setEmailError] = useState('');
    const [citys, setCitys] = useState('');
    const [cityDisable, setCityDisable] = useState(false);
    const [interNAtionalDisable, setInterNAtionalDisable] = useState(false);
    const [checked, setChecked] = useState(false);
    const [display, setDisplay] = useState('d-none');
    const [forgot, setForgot] = useState(false);
    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useAuth();

    useEffect(() => {
        const url = "./citys.json"
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const res = await response.json();
                setCitys(res.cities);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, [])
    const handleOnchange = (e) => {
        const city = e.target.value;
        if (city) {
            setInterNAtionalDisable(true);
            setCityDisable(false);
        }
        if (city === 'City/Town') {
            setInterNAtionalDisable(false);
        }
    }
    useEffect(() => {
        if (checked) {
            setCityDisable(true);
            setInterNAtionalDisable(false)
        }
        else {
            setCityDisable(false);
        }
    }, [checked])


    const handleSignUp = (e) => {
        e.preventDefault();
        let equalPass;
        if (e.target.firstName.value && e.target.lastName.value && e.target.email.value && e.target.designation.value &&
            e.target.organization.value && (e.target.city.value !== 'City/Town' || checked) && e.target.pincode.value && equalPass !== ''
        ) {
            setRequired("");
            if (e.target.password.value === e.target.confirm_password.value) {
                setError("");
                setEmailError("")
                equalPass = e.target.password.value;
                const city = e.target.city.value;
                const data = {
                    'firstName': e.target.firstName.value,
                    'lastName': e.target.lastName.value,
                    'email': e.target.email.value,
                    'designation': e.target.designation.value,
                    'organization': e.target.organization.value,
                    'city': checked ? "International" : city,
                    'pincode': e.target.pincode.value,
                    'password': equalPass
                }
                userRegister(data)
                    .then(res => {
                        e.target.reset();
                        setShow(false)
                        // setUser(res.data.data);
                        // setIsAuthenticated(true);
                        // window.localStorage.setItem('jwt', JSON.stringify(res.data.jwt));
                        // navigate('/home')
                        alert("Registration Success");
                    })
                    .catch(err => {
                        if (err.response.status === 409) {
                            setEmailError("(This email is already in use.)")
                            setDisplay("d-block")
                        }
                        else console.log(err);
                    })

            }
            else {
                setError("Password Didn't Match");
            }

        }
        else {
            setRequired("Please fill all the fields above ")
        }
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
                className="modal_full d-none d-md-block"
            >
                <Modal.Body
                    className="modal_body"
                >
                    <div>
                        <span className='d-none d-md-block d-xxl-none' onClick={handleClose} style={{ cursor: 'pointer', marginLeft: "800px" }} ><img width='15px' src={CrossIcon} alt="" /></span>
                        <span className='d-md-none d-xxl-block' onClick={handleClose} style={{ cursor: 'pointer', marginLeft: "850px" }} ><img width='15px' src={CrossIcon} alt="" /></span>
                        <p className='text-center sign_up'>Register</p>
                    </div>
                    <div className='mx-4 mt-4'>
                        <form className='ms-md-3 ms-xxl-5' onSubmit={handleSignUp}>
                            <div className='d-flex '>
                                <div className='me-5'>
                                    <label htmlFor="">First Name<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='firstName' placeholder='Lily' type="text" />
                                </div>
                                <div>
                                    <label htmlFor="">Last Name<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='lastName' placeholder='Blom' type="text" />
                                </div>
                            </div>
                            <div className='my-3'>
                                <label className={emailError ? "text-danger" : ""} htmlFor="">Email<span style={{ fontSize: "14px" }} className='text-danger'>&#x2736; {emailError ? emailError : ''}</span></label> <br />
                                <input className={emailError ? "signup_Input border-danger text-danger" : "signup_Input"} name='email' placeholder='Lilyblom201@gmail.com' type="email" />
                                <a href="#" className={display}  ><p className='text-start forgot_pass mt-1' style={{ fontSize: "12px" }}>Do you want to retrieve your password?</p></a>
                            </div>
                            <div className='d-flex  my-3'>
                                <div className='me-5'>
                                    <label htmlFor="">Designation<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='designation' placeholder='Designation' type="text" />
                                </div>
                                <div>
                                    <label htmlFor="">School/Organization<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='organization' placeholder='School/Organization' type="text" />
                                </div>
                            </div>
                            <div className='d-flex  my-3'>
                                <div className='me-5'>
                                    <label htmlFor="">City/Town{!checked ? <span className='text-danger'>&#x2736;</span> : ''}</label><br />
                                    <select onChange={handleOnchange} disabled={cityDisable} className='select_input' name='city' title="City">
                                        <option value="City/Town" selected >City/Town</option>
                                        {
                                            !citys ? <option value="City/Town" selected >City/Town</option> :
                                                citys.map((data, index) => (
                                                    <option key={index}>{data.City}</option>
                                                ))
                                        }
                                    </select><br />
                                    <input defaultChecked={checked} onChange={() => setChecked(!checked)} disabled={interNAtionalDisable} type="checkbox" name="International" id="" />
                                    <label htmlFor="">&nbsp;International</label>
                                </div>
                                <div>
                                    <label htmlFor="">Pincode<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' min="0" name='pincode' placeholder='Pincode' type="number" />
                                </div>
                            </div>
                            <div className='d-flex my-3'>
                                <div className='me-5'>
                                    <label htmlFor="">Password</label> <br />
                                    <input required className='signup_Input' min="0" name='password' placeholder='Password' type="password" step="1" />
                                </div>
                                <div>
                                    <label htmlFor="">Confirm password</label> <br />
                                    <input required className='signup_Input' name='confirm_password' placeholder='Confirm password' type="password" />
                                </div>
                            </div>
                            <div className='mt-3'>
                                <input type="checkbox" required name="" id="" /> <span>I am not a robot </span>
                                <span className="checkmark"></span>
                            </div>
                            {required ? <p className='text-danger text-center me-5 pe-4'>{required}</p> : ""}
                            {error ? <p className='text-danger text-center me-5 pe-4'>{error}</p> : ""}
                            <div className='d-flex justify-content-center me-5 pe-4'>
                                <button className='submit_btn'>Submit</button>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className="d-block d-md-none mt-5 pt-3 px-2"

            >
                <Modal.Body
                    className="res_modal "
                    style={{ height: "651px" }}
                >
                    <div>
                        <div>
                            <span onClick={handleClose} style={{ cursor: 'pointer' }} className='d-flex justify-content-end '><img width='15px' src={CrossIcon} alt="" /></span>
                            <p className='text-center sign_up' style={{ fontSize: "20px" }}>Register</p>
                        </div>
                        <div className='mx-4 d-flex justify-content-center'>
                            <form onSubmit={handleSignUp}>
                                <div className='mt-3'>
                                    <label htmlFor="">First Name<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='firstName' placeholder='Lily' type="text" />
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="">Last Name<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='lastName' placeholder='Blom' type="text" />
                                </div>
                                <div className='mt-3'>
                                    <label className={emailError ? "text-danger" : ""} htmlFor="">Email<span style={{ fontSize: "14px" }} className='text-danger mt-5'>&#x2736; {emailError ? emailError : ''}</span></label> <br />
                                    <input className={emailError ? "signup_Input border-danger text-danger" : "signup_Input"} name='email' placeholder='Lilyblom201@gmail.com' type="email" />
                                    <a href="#" className={display} style={{ fontSize: "12px" }} ><p className='text-start forgot_pass mt-1'>Do you want to retrieve your password?</p></a>
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="">Designation<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='designation' placeholder='Designation' type="text" />
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="">School/Organization<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='organization' placeholder='School/Organization' type="text" />
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="">City/Town{!checked ? <span className='text-danger'>&#x2736;</span> : ''}</label><br />
                                    <select onChange={handleOnchange} disabled={cityDisable} className='select_input' name='city' title="City">
                                        <option value="City/Town" selected >City/Town</option>
                                        {
                                            !citys ? <option value="City/Town" selected >City/Town</option> :
                                                citys.map((data, index) => (
                                                    <option key={index}>{data.City}</option>
                                                ))
                                        }
                                    </select><br />
                                    <input defaultChecked={checked} onChange={() => setChecked(!checked)} disabled={interNAtionalDisable} type="checkbox" name="International" id="" />
                                    <label htmlFor="">&nbsp;International</label>
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="">Pincode<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='pincode' min="0" placeholder='Pincode' type="number" />
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="">Password</label> <br />
                                    <input className='signup_Input' name='password' placeholder='Password' type="password" />
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="">Confirm password</label> <br />
                                    <input className='signup_Input' name='confirm_password' placeholder='Confirm password' type="password" />
                                </div>
                                <div className='my-3'>
                                    <input type="checkbox" name="" id="" /> <span>I am not a robot </span>
                                    <span className="checkmark"></span>
                                </div>
                                {required ? <p className='text-danger text-center'>{required}</p> : ""}
                                {error ? <p className='text-danger text-center'>{error}</p> : ""}
                                <div className='d-flex justify-content-center my-5'>
                                    <button className='submit_btn'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>

    );
};

export default SignUpModal;