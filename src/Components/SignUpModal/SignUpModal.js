import axios from 'axios';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import CrossIcon from '../../asstes/cross-icon.png'
import './signUpModal.css'

const SignUpModal = ({ handleClose, show }) => {
    const [error, setError] = useState('');
    const [required, setRequired] = useState('');
    const [emailError, setEmailError] = useState('');
    const handleSignUp = (e) => {
        e.preventDefault();
        let equalPass;
        if (e.target.firstName.value && e.target.lastName.value && e.target.email.value && e.target.designation.value &&
            e.target.organization.value && e.target.city.value && e.target.pincode.value && equalPass !== ''
        ) {
            setRequired("");
            if (e.target.password.value === e.target.confirm_password.value) {
                setError("");
                setEmailError("")
                equalPass = e.target.password.value;
                const data = {
                    'firstName': e.target.firstName.value,
                    'lastName': e.target.lastName.value,
                    'email': e.target.email.value,
                    'designation': e.target.designation.value,
                    'organization': e.target.organization.value,
                    'city': e.target.city.value,
                    'pincode': e.target.pincode.value,
                    'password': equalPass
                }
                axios.post("http://localhost:8080/api/reg", data)
                    .then(res => {
                        alert("Login Success")
                    })
                    .catch(err => {
                        if (err.response.status === 409) {
                            setEmailError("(This email is already in use. Please use different one)")
                        }
                        else console.log(err);
                    })
            }
            if (e.target.password.value !== "" && e.target.confirm_password.value !== "") {
                setError("Passowrd Didn't Match");
            }
        }
        else {
            setRequired("Please fill all the fields above ")
        }
    }
    if (emailError) {
        document.getElementById("emailLabel").style.color = "red";
        document.getElementById("emailInput").style.border = "1px solid red";
        document.getElementById("emailInput").style.color = "red";
    }
    // if (!emailError) {
    //     document.getElementById("emailLabel").style.color = "black";
    //     document.getElementById("emailInput").style.border = "none";
    //     document.getElementById("emailInput").style.color = "black";
    // }
    return (
        <>
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
                        <span onClick={handleClose} style={{ cursor: 'pointer' }} className='d-flex justify-content-end '><img width='15px' src={CrossIcon} alt="" /></span>
                        <p className='text-center sign_up'>Sign Up</p>
                    </div>
                    <div className='mx-4 mt-4'>
                        <form onSubmit={handleSignUp}>
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <label htmlFor="">First Name<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='firstName' placeholder='Lily' type="text" />
                                </div>
                                <div>
                                    <label htmlFor="">Last Name<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='lastName' placeholder='Blom' type="text" />
                                </div>
                            </div>
                            <div className='my-3'>
                                <label id='emailLabel' htmlFor="">Email<span className='text-danger'>&#x2736; {emailError ? emailError : ''}</span></label> <br />
                                <input id='emailInput' className='signup_Input' name='email' placeholder='Lilyblom201@gmail.com' type="email" />
                            </div>
                            <div className='d-flex justify-content-between my-3'>
                                <div>
                                    <label htmlFor="">Designation<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='designation' placeholder='Designation' type="text" />
                                </div>
                                <div>
                                    <label htmlFor="">School/Organization<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='organization' placeholder='School/Organization' type="text" />
                                </div>
                            </div>
                            <div className='d-flex justify-content-between my-3'>
                                <div>
                                    <label htmlFor="">City/Town<span className='text-danger'>&#x2736;</span></label><br />
                                    <select className='select_input' name='city' id="cars" title="cars">
                                        <option selected value="volvo" >City/Town</option>
                                        <option value="saab">Saab</option>
                                        <option value="fiat">Fiat</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="">Pincode<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='pincode' placeholder='Pincode' type="number" />
                                </div>
                            </div>
                            <div className='d-flex justify-content-between my-3'>
                                <div>
                                    <label htmlFor="">Password</label> <br />
                                    <input className='signup_Input' name='password' placeholder='Password' type="password" />
                                </div>
                                <div>
                                    <label htmlFor="">Confirm password</label> <br />
                                    <input className='signup_Input' name='confirm_password' placeholder='Confirm password' type="password" />
                                </div>
                            </div>
                            <div className='mt-3'>
                                <input type="checkbox" required name="" id="" /> <span>I am not a robot </span>
                                <span className="checkmark"></span>
                            </div>
                            {required ? <p className='text-danger text-center'>{required}</p> : ""}
                            {error ? <p className='text-danger text-center'>{error}</p> : ""}
                            <div className='d-flex justify-content-center'>
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
                className="d-block d-md-none"
            >
                <Modal.Body
                    className="res_modal "
                >
                    <div>
                        <div>
                            <span onClick={handleClose} style={{ cursor: 'pointer' }} className='d-flex justify-content-end '><img width='15px' src={CrossIcon} alt="" /></span>
                            <p className='text-center sign_up' style={{ fontSize: "20px" }}>Sign Up</p>
                        </div>
                        <div className='mx-4 d-flex justify-content-center'>
                            <form action="">
                                <div className='mt-2'>
                                    <label htmlFor="">First Name<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' placeholder='Lily' type="text" />
                                </div>
                                <div className='mt-2'>
                                    <label htmlFor="">Last Name<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' placeholder='Blom' type="text" />
                                </div>
                                <div className='mt-2'>
                                    <label htmlFor="">Email<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' placeholder='Lilyblom201@gmail.com' type="email" />
                                </div>
                                <div className='mt-2'>
                                    <label htmlFor="">Designation<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' placeholder='Designation' type="text" />
                                </div>
                                <div className='mt-2'>
                                    <label htmlFor="">School/Organization<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' placeholder='School/Organization' type="text" />
                                </div>
                                <div className='mt-2'>
                                    <label htmlFor="">City/Town<span className='text-danger'>&#x2736;</span></label><br />
                                    <select className='select_input' id="cars" name="cars">
                                        <option value="volvo" selected>City/Town</option>
                                        <option value="saab">Saab</option>
                                        <option value="fiat">Fiat</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </div>
                                <div className='mt-2'>
                                    <label htmlFor="">Pincode<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' placeholder='Pincode' type="number" />
                                </div>
                                <div className='mt-2'>
                                    <label htmlFor="">Password</label> <br />
                                    <input className='signup_Input' placeholder='Password' type="password" />
                                </div>
                                <div className='mt-2'>
                                    <label htmlFor="">Confirm password</label> <br />
                                    <input className='signup_Input' placeholder='Confirm password' type="password" />
                                </div>
                                <div className='my-3'>
                                    <input type="checkbox" name="" id="" /> <span>I am not a robot </span>
                                    <span className="checkmark"></span>
                                </div>
                                <div className='d-flex justify-content-center'>
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