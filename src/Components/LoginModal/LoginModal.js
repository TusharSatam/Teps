import React, { useState,useRef,useEffect } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../services/auth';
import { useAuth } from '../../Context/AuthContext';
import ForgotModal from '../ForgotPassModal/ForgotModal';
import './loginModal.css'
import VerifyModal from '../ForgotPassModal/VerifyModal';
import emailjs from '@emailjs/browser';
import axios from 'axios';

const LoginModal = ({ show, setShow }) => {
  const { t } = useTranslation()
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth();
  const [forgot, setForgot] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [checkError, setCheckError] = React.useState('');
  const [verifyModal, setVerifyModal] = React.useState(false)
  const [isOTPLoginOpen, setisOTPLoginOpen] = useState(false)
  const [phoneValue, setPhoneValue] = React.useState('');
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [showOTPInputs, setshowOTPInputs] = useState(false)
  const inputRefs = useRef([]);

  const handleGetOTP = (e) => {
    if (phoneValue.length < 10) {
      // Show an error message for invalid phone number
      setCheckError('Phone number must be 10 digits');
    } else {
      // Phone number is valid, proceed to OTP input
      setCheckError(''); // Clear any previous error messages
      setshowOTPInputs(true);
    }
  };
  const handlePhoneInput = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-digit characters
    if (inputValue.length <= 10) {
      setPhoneValue(inputValue); // Update the state with the cleaned input value
    } else {
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1); // Limit input to a single character
    }

    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleInputKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

const handleLoginForm=()=>{
  setisOTPLoginOpen(!isOTPLoginOpen)
  setIsLoading(false)
}

  const handleClose = () => {
    setShow(false)
    setCheckError('')
    setError('')
  }
  const handleSIgnIn = (e) => {
    e.preventDefault();
    if (!isOTPLoginOpen) {
      setIsLoading(true);
      setCheckError('');
      const data = {
        'email': e.target.email.value,
        'password': e.target.password.value
      }
      userLogin(data)
        .then(res => {
          if (res) {
            if (res?.data?.varified) {
              setIsLoading(false);
              setShow(false)
              setUser(res.data);
              setIsAuthenticated(true);
              window.localStorage.setItem('jwt', JSON.stringify(res.jwt));
              window.localStorage.setItem('data', JSON.stringify(res.data));
              navigate('/home');
            }
            else {
              const data = {
                "to": res?.data?.email,
                'subject': "Email verification - TEPS",
                "html": `
                  <p>Hello and welcome to Things Education’s Pedagogical Strategies</p>
                  <p>Please click this link to verify your email address before you get started. Once verified, you will be able to log in to the site.</p>
                  <p>https://teps.school/verify?sdfbkjfewihuf=${res?.data?._id}&pfgvsckvnlksfwe=${res?.jwt}</p><br/>
                  <p>Regards,</p>
                  <p>Things Education</p>
                  `
              }
              axios.post('email', data)
                .then(res => {
                  if (res) {
                    setIsLoading(false);
                    setShow(false)
                    setVerifyModal(true)
                  }
                })
                .catch(err => console.log(err))

            }
          }
        })
        .catch(err => {
          setIsLoading(false);
          setError(err.response.data.message);
          setIsLoading(false)
        })
    }
    else  if (e.target.checkmark.checked === true && isOTPLoginOpen) {

    }
    else {
      setCheckError(`${t("checkbox_error")}`)
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
      <VerifyModal
        show={verifyModal}
        setShow={setVerifyModal}
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
              <p className='text-center log_in mt-3'>{t("Login now")}</p>
            </div>
            <form onSubmit={handleSIgnIn}>
              <div className='d-flex justify-content-center'>
                <div>
                  {
                    !isOTPLoginOpen ?
                    <>
                  <div className='my-3'>
                    <label htmlFor="" style={{ marginBottom: "-20px" }} className={error === 'Invalid Email' ? 'd-flex text-danger' : 'd-flex'}>{t("Email")} <span className={error === 'Invalid Email' ? 'd-block' : "d-none"}> &nbsp;{t("email_not_found")}</span></label><br />
                    <input placeholder='LilyBlom201@gmail.com' name='email' className={error === 'Invalid Email' ? "login_input text-danger border border-danger" : 'login_input'} type="email" />
                  </div>
           
                  <div className='my-4'>
                    <label htmlFor="" style={{ marginBottom: "-20px" }} className={error === 'Invalid Password' ? 'd-flex text-danger' : 'd-flex'}>{t("Password")} <span className={error === 'Invalid Password' ? 'd-block' : "d-none"}> &nbsp;{t('password_error')}</span></label><br />
                    <input id='authPass' placeholder='1234567#' className={error === 'Invalid Password' ? "login_input text-danger border border-danger" : 'login_input'} type="password" name='password' /><br />
                    <a href="#" onClick={handleForgotShow} ><p className='text-start forgot_pass mt-1'>{t("Forgot Password?")}</p></a>
                  </div>              
                    </>:<>                   
                  <div className='my-3'>
                    <label htmlFor="" style={{ marginBottom: "-20px" }} className={error === 'Invalid Phone' ? 'd-flex text-danger' : 'd-flex'}>{t("Phone Number")} <span className={error === 'Invalid Email' ? 'd-block' : "d-none"}> &nbsp;{t("email_not_found")}</span></label><br />
                    <input value={phoneValue} placeholder='Phone Number' name='phone' className={error === 'Invalid Phone' ? "login_input text-danger border border-danger" : 'login_input'} type="tel" pattern='[0-9]{10}' onChange={handlePhoneInput}/>
                  </div>
                  {showOTPInputs &&                
                  <div id="pin-input" className="pinInput">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onInput={(e) => {
                        // Use a regular expression to remove non-numeric characters
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      }}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleInputKeyDown(e, index)}
                      ref={(inputRef) => (inputRefs.current[index] = inputRef)}
                      style={{ width: "30px", marginRight: "10px" }}
                      className="OTPinput"
                      inputMode="numeric" // Specify numeric input mode
                      pattern="[0-9]*" // Allow only numeric input
                    />
                  ))}
                  <button className='resendOTP'>resend OTP</button>
                </div>
                  }

                    </>
                  }


                  {/* <div className='d-flex'>
                    <div className='mt-1'>
                      <label className="containerr">
                        <input name='checkmark' type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <p style={{ marginTop: "2px", marginLeft: "-6px" }}>{t("I am not a robot.")}</p>
                  </div> */}
                  {/* <input type="checkbox" required name="" id="" /> <span> </span> */}
                  <p className='text-danger'>{checkError ? checkError : ""}</p>
                  {
                    !isOTPLoginOpen?
                    <>
                  <div className='d-flex justify-content-center my-3'>
                      <button disabled={isLoading} className='submit_btn'>{isLoading ? <Spinner className="text-light " animation="border" /> : t("Login")}    </button>
                  </div>
       
                    </>:<>
          
                    </>
                  }
      
                </div>
              </div>
            </form>
            {isOTPLoginOpen?
            <>
                  {!showOTPInputs && <div className='d-flex justify-content-center my-3' onClick={handleGetOTP}>
                      <button  className='submit_btn'>{t("Get OTP")} </button>
                  </div>}
                  {
                    showOTPInputs && 
                    <div className='d-flex justify-content-center mb-3'>
                      <button disabled={isLoading} className='submitOTP_btn'>  {t("Submit")} </button>
                    </div>
                  }
                  <div className='d-flex justify-content-center mb-3'>
                      <button disabled={isLoading} className='signOTP_btn'  onClick={handleLoginForm}>  {t("Sign In with Gmail")} </button>
                  </div>
               
            </>
            :          
            <div className='d-flex justify-content-center mb-3'>
            <button disabled={isLoading} className='signOTP_btn' onClick={handleLoginForm}>  {t("Sign In with OTP")} </button>
            </div>
            }
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;