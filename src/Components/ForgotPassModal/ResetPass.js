import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import emailjs from '@emailjs/browser';
import { getTemplateByName } from '../../services/emailTemplate';

const ResetPass = () => {
  const { t } = useTranslation()
  const [error, setError] = useState('');
  const [show, setShow] = useState(true);
  const [passError, setPassError] = React.useState('');
  const navigate = useNavigate();
  const search = useLocation().search;
  const email = new URLSearchParams(search).get('email');

  const handleClose = () => setShow(false);
  const handleSIgnIn = (e) => {
    e.preventDefault();
    if (e.target.password.value.length > 4 && e.target.confirm_password.value.length > 4) {
      if (e.target.password.value === e.target.confirm_password.value) {
        setError('')
        const data = {
          'email': email,
          'password': e.target.password.value,
        }
        axios.post("/forget/update", data)
          .then(res => {
        getTemplateByName("Reset Password Template").then((res2)=>{
            const data = {
              "to": email,
              'subject': "Password reset - TEPS",
              "html": res2?.html
            }
            axios.post('email', data)
              .then(res => {
                console.log('success');
              })
              .catch(err => console.log(err))
            e.target.reset()
            alert("Password changed successfully")
            navigate('/')

        }).catch((err)=>{
          console.log({err})
        });
          })
          .catch(err => {
            console.log(err);
          })
      }
      else {
        setError(`${t('password_match')}`)
        setPassError('')
      }
    }
    else {
      setPassError(`${t('password_five')}`)
      setError('')
    }

  }
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >

        <Modal.Body
        >
          <div>
            <div>
              <p className='text-center forgot_header mt-5'>{t("forgot_pass_ques")} </p>
              <p className='text-center forgot_subheader mt-3'>{t("reset_pass_cont")} </p>
            </div>
            <form onSubmit={handleSIgnIn}>
              <div className='d-flex justify-content-center'>
                <div>
                  <div className='my-3'>
                    <label htmlFor="">{t("Password")}</label><br />
                    <input placeholder='1234567#' className='login_input' type="password" name='password' /><br />
                  </div>
                  <div className='my-3'>
                    <label htmlFor="">{t("Confirm Password")}</label><br />
                    <input placeholder='1234567#' className='login_input' type="password" name='confirm_password' /><br />
                  </div>
                  {error ? <p className='text-danger'>{error}</p> : ''}
                  {passError ? <p style={{ fontSize: "12px" }} className='text-danger'>{passError}</p> : ""}
                  {/* <p className='text-danger me-5 pe-4'>{passError ? passError : ""}</p> */}
                  <div className='d-flex justify-content-center my-5'>
                    <button className='submit_btn'>{t("reset_pass")}</button>
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

export default ResetPass;