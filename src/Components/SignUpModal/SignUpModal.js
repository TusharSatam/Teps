import React from 'react';
import { Modal } from 'react-bootstrap';
import CrossIcon from '../../asstes/cross-icon.png'
import './signUpModal.css'

const SignUpModal = ({ handleClose, show }) => {
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
                        <form action="">
                            <div className='d-flex justify-content-between'>
                                <div>
                                    <label htmlFor="">First Name<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' placeholder='Lily' type="text" />
                                </div>
                                <div>
                                    <label htmlFor="">Last Name<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' placeholder='Blom' type="text" />
                                </div>
                            </div>
                            <div className='my-3'>
                                <label htmlFor="">Email<span className='text-danger'>&#x2736;</span></label> <br />
                                <input className='signup_Input' placeholder='Lilyblom201@gmail.com' type="email" />
                            </div>
                            <div className='d-flex justify-content-between my-3'>
                                <div>
                                    <label htmlFor="">Designation<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' placeholder='Designation' type="text" />
                                </div>
                                <div>
                                    <label htmlFor="">School/Organization<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' placeholder='School/Organization' type="text" />
                                </div>
                            </div>
                            <div className='d-flex justify-content-between my-3'>
                                <div>
                                    <label htmlFor="">City/Town<span className='text-danger'>&#x2736;</span></label><br />
                                    <select className='select_input' id="cars" name="cars">
                                        <option value="volvo" selected>City/Town</option>
                                        <option value="saab">Saab</option>
                                        <option value="fiat">Fiat</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="">Pincode<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' placeholder='Pincode' type="number" />
                                </div>
                            </div>
                            <div className='d-flex justify-content-between my-3'>
                                <div>
                                    <label htmlFor="">Password</label> <br />
                                    <input className='signup_Input' placeholder='Password' type="password" />
                                </div>
                                <div>
                                    <label htmlFor="">Confirm password</label> <br />
                                    <input className='signup_Input' placeholder='Confirm password' type="password" />
                                </div>
                            </div>
                            <div className='my-3'>
                                <input type="checkbox" name="" id="" /> <span>I am not a robot </span>
                                <span class="checkmark"></span>
                            </div>
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
                                    <span class="checkmark"></span>
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