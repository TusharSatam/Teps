import axios from 'axios';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './forgotmodal.css'
import ResetPass from './ResetPass';
import emailjs from '@emailjs/browser';
import SenEmailModal from './SenEmailModal';
import { useTranslation } from 'react-i18next';
import { getTemplateByName } from '../../services/emailTemplate';
import toast,{ Toaster } from 'react-hot-toast';

const ForgotModal = ({ show, setShow }) => {
  const { t } = useTranslation()
  const [error, setError] = useState('');
  const [sendEmail, setSendEmail] = useState(false);
  const handleClose = () => {
    setError('');
    setShow(false);
  }
  const handleForgot = (e) => {
    e.preventDefault();
    const data = {
      'email': e.target.email.value
    }
    axios.post("/forget", data)
      .then(res => {
        if (res.data.message === "Have an User") {
          setError('');
          getTemplateByName("Forgot Password Template").then((res2)=>{
          const newHtml = res2?.html?.replace(/{{userEmail}}/g,e.target.email.value);
          const data = {
            "to": e.target.email.value,
            'subject': "Reset your password - TEPS",
            "html":newHtml
          }
          axios.post('email', data)
            .then(res => {
              if (res) {
                setSendEmail(true)
              }
              setShow(false);
            })
            .catch(err => {
              console.log(err)
              setShow(false);
            })

          }).catch((err)=>{
          setShow(false);
          console.log({err});
          });
        }
      })
      .catch(err => {
        if (err) {
          setError("Didn't have any account!")
        }
      })

  }
  return (
    <>
    <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <SenEmailModal
        show={sendEmail}
        setShow={setSendEmail}
      />
      {/* <ResetPass
                show={pass}
                setShow={setPass}
            /> */}
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >

        <Modal.Body
          className=""
        >
          <div>
            <div>
              <p onClick={handleClose} style={{ cursor: 'pointer', color: '#6D747A' }} className=' me-1 fs-5 text-end'>&#10006;</p>
              <p className='text-center forgot_header mt-3'>{t("forgot_pass_ques")} </p>
              <p className='text-center forgot_subheader mt-3'>{t("reset_pass_cont")} </p>
            </div>
            <form onSubmit={handleForgot}>
              <div className='d-flex justify-content-center'>
                <div>
                  <div className='my-3'>
                    <label htmlFor="">{t("Email")}</label><br />
                    <input placeholder='LilyBlom201@gmail.com' name='email' className='login_input' type="email" />
                  </div>
                  {error ? <p className='text-danger'>{error}</p> : ''}
                  <div className='d-flex justify-content-center my-5 pb-5'>
                    <button className='submit_btn'>{t("continue")} </button>
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

export default ForgotModal;