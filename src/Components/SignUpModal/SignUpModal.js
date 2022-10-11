import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../../services/auth';
import CrossIcon from '../../asstes/cross-icon.png'
import { useAuth } from '../../Context/AuthContext';
import ForgotModal from '../ForgotPassModal/ForgotModal';
import './signUpModal.css'
import axios from 'axios';
import emailjs from '@emailjs/browser';
import VerifyModal from '../ForgotPassModal/VerifyModal';

const SignUpModal = ({ handleClose, show, setShow }) => {
  const { t } = useTranslation()
  const [error, setError] = React.useState('');
  const [required, setRequired] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [town, setTown] = React.useState('');
  const [cityDisable, setCityDisable] = React.useState(false);
  const [interNAtionalDisable, setInterNAtionalDisable] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [display, setDisplay] = React.useState('d-none');
  const [forgot, setForgot] = React.useState(false);
  const [checkError, setCheckError] = React.useState('');
  const [passError, setPassError] = React.useState('');
  const [emailErr, setEmailErr] = React.useState('');
  const [verifyModal, setVerifyModal] = React.useState(false)
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth();


  React.useEffect(() => {
    if (checked) {
      setCityDisable(true);
      setInterNAtionalDisable(false)
    }
    else {
      setCityDisable(false);
    }
    if (show === false) {
      setError('')
      setRequired('')
      setEmailError('')
      setCheckError('')
      setPassError('')
      setEmailErr('')
      setChecked(false)
      setCityFound('')
      setTown('')
    }
  }, [checked, show])
  const [cityFound, setCityFound] = React.useState("")
  const [liveDetails, setLiveDetails] = React.useState()
  const handlePincode = (e) => {
    if (e.target.value === '') {
      setTown('')
      setCityFound('')
    }
    axios.get(`https://api.postalpincode.in/pincode/${e.target.value}`)
      .then(res => {
        if (res?.data[0].Message !== "No records found") {
          setLiveDetails(res?.data[0]?.PostOffice[0]);
          setCityFound('')
          setTown(res?.data[0]?.PostOffice[0]?.Block);
        }
        else {
          if (!checked)
            setTown('')
          setCityFound("No city/Town found")
        }
      })
  }
  const wrongEmail = "Your email could not be found, please register with the correct email."
  const [wrongEMailfound, setWrongEMailfound] = React.useState()
  const handleSignUp = (e) => {
    e.preventDefault();
    let equalPass;
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (e.target.firstName.value && e.target.lastName.value && e.target.email.value && e.target.designation.value &&
      e.target.organization.value && (e.target.city.value || checked) && e.target.pincode.value && equalPass !== ''
    ) {
      setRequired("");
      if (e.target.email.value.match(pattern)) {
        setEmailErr('')
        if (e.target.checkmark.checked === true) {
          setCheckError('');
          if (e.target.password.value.length > 4 && e.target.confirm_password.value.length > 4) {
            setPassError(``)
            if (e.target.password.value === e.target.confirm_password.value) {
              setError("");
              setEmailError("")
              equalPass = e.target.password.value;
              const city = e.target.city.value;
              const formData = new FormData();
              formData.append('firstName', e.target.firstName.value);
              formData.append('lastName', e.target.lastName.value);
              formData.append('email', e.target.email.value);
              formData.append('designation', e.target.designation.value);
              formData.append('organization', e.target.organization.value);
              formData.append('city', checked ? "International" : city);
              formData.append('pincode', e.target.pincode.value);
              formData.append('password', equalPass);
              formData.append('state', !checked ? liveDetails?.State : '');
              formData.append('country', !checked ? liveDetails?.Country : '');
              userRegister(formData)
                .then(res => {
                  e.target.reset();
                  setShow(false)
                  console.log(res);
                  // kfjdslknfdknfkdanf
                  const data = {
                    "to": res?.data?.data?.email,
                    'subject': "Email verification",
                    "html": `
                    <p>Hello and welcome to Things Education’s Pedagogical Strategies</p>
                    <p>Please click this link to verify your email address before you get started. Once verified, you will be able to log in to the site.</p>
                    <p>https://te-third-cycle.netlify.app/verify?sdfbkjfewihuf=${res?.data?.data?._id}&pfgvsckvnlksfwe=${res.data.jwt}</p><br/>
                    <p>Regards,</p>
                    <p>Things Education</p>
                    `
                  }
                  axios.post('email', data)
                    .then(res => {
                      if (res) {
                        setVerifyModal(true)
                        setWrongEMailfound('')
                        console.log(res);
                      }
                    })
                    .catch(err => setWrongEMailfound(wrongEmail))
                  // fckmlksdfmn.lsdknf.lkasndf
                  // (emailjs.send('service_a3rzkzf', 'template_td2c1hk', {
                  //   "reply_to": res?.data?.data?.email,
                  //   "verify_link": `https://te-third-cycle.netlify.app/verify?sdfbkjfewihuf=${res?.data?.data?._id}&pfgvsckvnlksfwe=${res.data.jwt}`,
                  //   "from": "things@ecu.org"
                  // }, '8zEAglGBvaOwqdqTd')
                  //   .then((result) => {
                  //     setVerifyModal(true)
                  //     setWrongEMailfound('')
                  //     console.log(result.text);
                  //   }, (error) => {
                  //     console.log(error.text);
                  //     setWrongEMailfound(wrongEmail)
                  //   }))
                })
                .catch(err => {
                  if (err.response.status === 409) {
                    setEmailError(`${t('already_email')}`)
                    setDisplay("d-block")
                  }
                  else console.log(err);
                })

            }
            else {
              setError(`${t('password_match')}`);
            }

          }
          else {
            setPassError(`${t('password_five')}`)
            setError(``);
          }
        }
        else {
          setCheckError(`${t("checkbox_error")}`)
          setPassError('')
          setError(``)
          setRequired(``)
        }
      }
      else {
        setEmailErr(t('Email_Error'));
        setCheckError(``)
        setPassError('')
        setError(``)
        setRequired(``)
      }
    }
    else {
      setRequired(`${t('fill_all_box')}`)
      setPassError('')
      setError(``)
    }
  }
  const handleForgotShow = () => {
    setForgot(true);
    setShow(false);
  }
  const handleEmailError = (e) => {
    if (e.target.value) {
      setEmailError('')
      setPassError(``)
    }
  }
  console.log(town);
  return (
    <>
      <ForgotModal
        show={forgot}
        setShow={setForgot}
      />
      <VerifyModal
        show={verifyModal}
        setShow={setVerifyModal}
        wrong={wrongEMailfound}
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
            <p className='text-center sign_up'>{t('Register')}</p>
          </div>
          <div className='mx-4 mt-4'>
            <form className='ms-md-3 ms-xxl-5' onSubmit={handleSignUp}>
              <div className='d-flex '>
                <div className='me-5'>
                  <label htmlFor="">{t('First Name')}<span className='text-danger'>&#x2736;</span></label> <br />
                  <input className='signup_Input' name='firstName' placeholder='Lily' type="text" />
                </div>
                <div>
                  <label htmlFor="">{t('Last Name')}<span className='text-danger'>&#x2736;</span></label> <br />
                  <input className='signup_Input' name='lastName' placeholder='Blom' type="text" />
                </div>
              </div>
              <div className='my-3'>
                <label className={emailError || emailErr ? "text-danger" : ""} htmlFor="">{t('Email')}<span style={{ fontSize: "14px" }} className='text-danger'>&#x2736; 	&nbsp;&nbsp;{emailError ? emailError : ''}</span></label> <br />
                <input onChange={handleEmailError} className={emailError || emailErr ? "signup_Input border-danger text-danger" : "signup_Input"} name='email' placeholder='Lilyblom201@gmail.com' type="text" />
                <a href="#" className={emailError ? 'd-block' : 'd-none'} onClick={handleForgotShow} ><p className='text-start forgot_pass mt-1' style={{ fontSize: "12px" }}>{t('retrieve_password')}</p></a>
              </div>
              <div className='d-flex  my-3'>
                <div className='me-5'>
                  <label htmlFor="">{t('Designation')}<span className='text-danger'>&#x2736;</span></label> <br />
                  <input className='signup_Input' name='designation' placeholder={t('Designation')} type="text" />
                </div>
                <div>
                  <label htmlFor="">{t('School/Organization')}<span className='text-danger'>&#x2736;</span></label> <br />
                  <input className='signup_Input' name='organization' placeholder={t('School/Organization')} type="text" />
                </div>
              </div>
              <div className='d-flex  my-3'>
                <div className='me-5'>
                  <label htmlFor="">{t('Pincode')}<span className='text-danger'>&#x2736;</span></label> <br />
                  <input onChange={handlePincode} className='signup_Input' min="0" name='pincode' placeholder={t('Pincode')} type="number" />
                  <br />
                  <input defaultChecked={checked} onChange={() => setChecked(!checked)} disabled={interNAtionalDisable} type="checkbox" name="International" id="" />
                  <label htmlFor="">&nbsp;{t('International')}</label>
                </div>
                <div>
                  <label className={cityFound && !cityDisable ? "text-danger" : ""} htmlFor="">{t('City/Town')}{!checked ? <span className='text-danger'>&#x2736; {cityFound}</span> : ''}</label><br />
                  {
                    !cityDisable ?
                      <input value={town} className={cityFound && !cityDisable ? "signup_Input border-danger text-danger" : "signup_Input"} name='city' placeholder={t('City/Town')} type="text" /> :
                      <input className={cityFound && !cityDisable ? "signup_Input border-danger text-danger" : "signup_Input"} name='city' placeholder={t('City/Town')} type="text" />
                  }
                </div>
              </div>
              <div className='d-flex my-3'>
                <div className='me-5'>
                  <label htmlFor="">{t('Password')}</label> <br />
                  <input className='signup_Input' min="0" name='password' placeholder={t('Password')} type="password" step="1" />
                </div>
                <div>
                  <label htmlFor="">{t('Confirm Password')}</label> <br />
                  <input className='signup_Input' name='confirm_password' placeholder={t('Confirm Password')} type="password" />
                </div>
              </div>
              <div className='d-flex'>
                <div className='mt-1 d-none d-md-block'>
                  <label className="containerr">
                    <input name='checkmark' type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <p style={{ marginTop: "2px", marginLeft: "-6px" }}>{t("I am not a robot.")}</p>
              </div>
              {required ? <p className='text-danger text-center me-5 pe-4 mb-4'>{required}</p> : ""}
              {error ? <p className='text-danger text-center me-5 pe-4'>{error}</p> : ""}
              <div className='text-danger me-5 pe-4 text-center' style={{ fontSize: "15px" }}>{emailErr ? emailErr : ''}</div>
              <p className='text-danger '>{checkError ? checkError : ""}</p>
              <p className='text-danger text-center me-5 pe-4'>{passError ? passError : ""}</p>
              <div className='d-flex justify-content-center me-5 pe-4'>
                <button className='submit_btn'>{t('Submit')}</button>
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
        className="d-block d-md-none mt-5 pt-2 px-2"

      >
        <Modal.Body
          className="res_modal "
          style={{ height: "651px" }}
        >
          <div>
            <div>
              <span onClick={handleClose} style={{ cursor: 'pointer' }} className='d-flex justify-content-end '><img width='15px' src={CrossIcon} alt="" /></span>
              <p className='text-center sign_up' style={{ fontSize: "20px" }}>{t('Register')}</p>
            </div>
            <div className='mx-4 d-flex justify-content-center'>
              <form onSubmit={handleSignUp}>
                <div className=''>
                  <label className='res-label ' htmlFor="">{t('First Name')}<span className='text-danger'>&#x2736;</span></label> <br />
                  <input className='signup_Input' name='firstName' placeholder='Lily' type="text" />
                </div>
                <div className='mt-3'>
                  <label className='res-label ' htmlFor="">{t('Last Name')}<span className='text-danger'>&#x2736;</span></label> <br />
                  <input className='signup_Input' name='lastName' placeholder='Blom' type="text" />
                </div>
                <div className='mt-3'>
                  <label className={emailError || emailErr ? "text-danger res-label" : "res-label"} htmlFor="">{t('Email')}<span style={{ fontSize: "14px" }} className='text-danger mt-5'>&#x2736; {emailError ? emailError : ''}</span></label> <br />
                  <input onChange={handleEmailError} className={emailError || emailErr ? "signup_Input border-danger text-danger" : "signup_Input"} name='email' placeholder='Lilyblom201@gmail.com' type="text" />
                  <a href="#" className={emailError ? 'd-block' : 'd-none'} style={{ fontSize: "10px" }} onClick={handleForgotShow}><p className='text-start forgot_passs mt-1'>{t('retrieve_password')}</p></a>
                </div>
                <div className='mt-3'>
                  <label className='res-label ' htmlFor="">{t('Designation')}<span className='text-danger'>&#x2736;</span></label> <br />
                  <input className='signup_Input' name='designation' placeholder={t('Designation')} type="text" />
                </div>
                <div className='mt-3'>
                  <label className='res-label ' htmlFor="">{t('School/Organization')}<span className='text-danger'>&#x2736;</span></label> <br />
                  <input className='signup_Input' name='organization' placeholder={t('School/Organization')} type="text" />
                </div>
                <div className='mt-3'>
                  <label className='res-label ' htmlFor="">{t('Pincode')}<span className='text-danger'>&#x2736;</span></label> <br />
                  <input onChange={handlePincode} className='signup_Input' min="0" name='pincode' placeholder={t('Pincode')} type="number" />
                  <br />
                  <input defaultChecked={checked} onChange={() => setChecked(!checked)} disabled={interNAtionalDisable} type="checkbox" name="International" id="" />
                  <label className='res-label ' htmlFor="">&nbsp;{t('International')}</label>
                </div>
                <div className='mt-3'>
                  <label className={cityFound && !cityDisable ? "text-danger res-label " : "res-label "} htmlFor="">{t('City/Town')}{!checked ? <span className='text-danger'>&#x2736; {cityFound}</span> : ''}</label><br />
                  <input value={!cityDisable ? town : ''} disabled={cityDisable} className={cityFound && !cityDisable ? "signup_Input border-danger text-danger" : "signup_Input"} name='city' placeholder={t('City/Town')} type="text" />
                </div>
                <div className='mt-3'>
                  <label className='res-label ' htmlFor="">{t('Password')}</label> <br />
                  <input className='signup_Input' name='password' placeholder={t('Password')} type="password" />
                </div>
                <div className='mt-3'>
                  <label className='res-label ' htmlFor="">{t('Confirm Password')}</label> <br />
                  <input className='signup_Input' name='confirm_password' placeholder={t('Confirm Password')} type="password" />
                </div>
                <div className='d-flex my-3'>
                  <div className='mt-1 d-block d-md-none'>
                    <label className="containerr">
                      <input name='checkmark' type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <p style={{ marginTop: "2px", marginLeft: "-6px" }}>{t("I am not a robot.")}</p>
                </div>
                {required ? <p className='text-danger text-center'>{required}</p> : ""}
                {error ? <p className='text-danger text-center'>{error}</p> : ""}
                <div className='text-danger' style={{ textAlign: 'center', fontSize: "15px" }}>{emailErr ? emailErr : ''}</div>
                <p className='text-danger '>{checkError ? checkError : ""}</p>
                <p className='text-danger text-center' style={{ fontSize: "10px" }}>{passError ? passError : ""}</p>
                <div className='d-flex justify-content-center my-5'>
                  <button className='submit_btn'>{t('Submit')}</button>
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