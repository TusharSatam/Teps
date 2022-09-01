import React from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../services/auth';
import { useAuth } from '../../Context/AuthContext';
import ForgotModal from '../ForgotPassModal/ForgotModal';
import './loginModal.css'
import VerifyModal from '../ForgotPassModal/VerifyModal';
import emailjs from '@emailjs/browser';

const LoginModal = ({ show, setShow }) => {
  const { t } = useTranslation()
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth();
  const [forgot, setForgot] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [checkError, setCheckError] = React.useState('');
  const [verifyModal, setVerifyModal] = React.useState(false)
  const handleClose = () => {
    setShow(false)
    setCheckError('')
    setError('')
  }
  const handleSIgnIn = (e) => {
    e.preventDefault();
    if (e.target.checkmark.checked === true) {
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
              (emailjs.send('service_3dqr8xq', 'template_a9b4hsz', {
                "reply_to": res?.data?.email,
                "verify_link": `https://ornate-malabi-fd3b4c.netlify.app/verify?sdfbkjfewihuf=${res?.data?._id}&pfgvsckvnlksfwe=${res?.jwt}`,
                "from": "things@ecu.org"
              }, 'Iu315MdRwOR7T8GsW')
                .then((result) => {
                  setIsLoading(false);
                  setShow(false)
                  setVerifyModal(true)
                  console.log(result.text);
                }, (error) => {
                  console.log(error.text);
                }))
            }
          }
        })
        .catch(err => {
          setIsLoading(false);
          setError(err.response.data.message);
          setIsLoading(false)
        })
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
              <p className='text-center log_in mt-3'>{t("Let’s get started!")}</p>
            </div>
            <form onSubmit={handleSIgnIn}>
              <div className='d-flex justify-content-center'>
                <div>
                  <div className='my-3'>
                    <label htmlFor="" style={{ marginBottom: "-20px" }} className={error === 'Invalid Email' ? 'd-flex text-danger' : 'd-flex'}>{t("Email")} <span className={error === 'Invalid Email' ? 'd-block' : "d-none"}> &nbsp;{t("email_not_found")}</span></label><br />
                    <input placeholder='LilyBlom201@gmail.com' name='email' className={error === 'Invalid Email' ? "login_input text-danger border border-danger" : 'login_input'} type="email" />
                  </div>

                  <div className='my-4'>
                    <label htmlFor="" style={{ marginBottom: "-20px" }} className={error === 'Invalid Password' ? 'd-flex text-danger' : 'd-flex'}>{t("Password")} <span className={error === 'Invalid Password' ? 'd-block' : "d-none"}> &nbsp;{t('password_error')}</span></label><br />
                    <input id='authPass' placeholder='1234567#' className={error === 'Invalid Password' ? "login_input text-danger border border-danger" : 'login_input'} type="password" name='password' /><br />
                    <a href="#" onClick={handleForgotShow} ><p className='text-end forgot_pass mt-1'>{t("Forgot Password?")}</p></a>
                  </div>
                  <div className='d-flex'>
                    <div className='mt-1'>
                      <label className="containerr">
                        <input name='checkmark' type="checkbox" />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <p style={{ marginTop: "2px", marginLeft: "-6px" }}>{t("I am not a robot.")}</p>
                  </div>
                  {/* <input type="checkbox" required name="" id="" /> <span> </span> */}
                  <p className='text-danger'>{checkError ? checkError : ""}</p>
                  <div className='d-flex justify-content-center my-5'>
                    {
                      // isLoading ? <button disabled={isLoading} className='submit_btn'>Login</button> :
                      <button disabled={isLoading} className='submit_btn'>{isLoading ? <Spinner className="text-light " animation="border" /> : t("Login")}    </button>
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