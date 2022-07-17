import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const ResetPass = () => {
  const { t } = useTranslation()
  const [error, setError] = useState('');
  const [show, setShow] = useState(true);
  const [getEmail, setGetEmail] = useState(true);
  const [passError, setPassError] = React.useState('');
  const navigate = useNavigate();


  const handleClose = () => setShow(false);
  useEffect(() => {
    setGetEmail(JSON.parse(localStorage.getItem('email')));
  }, [])
  const handleSIgnIn = (e) => {
    e.preventDefault();
    if (e.target.password.value.length > 4 && e.target.confirm_password.value.length > 4) {
      if (e.target.password.value === e.target.confirm_password.value) {
        setError('')
        const data = {
          'email': getEmail,
          'password': e.target.password.value,
        }
        axios.post("/forget/update", data)
          .then(res => {
            toast.success(`${t('success_reset')}`)
            e.target.reset()
            navigate('/')
          })
          .catch(err => {
            console.log(err);
          })
      }
      else {
        setError(`${t('password_match')}`)
      }
    }
    else {
      setPassError(`${t('password_five')}`)
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
                    <label htmlFor="">{t("password")}</label><br />
                    <input placeholder='1234567#' className='login_input' type="password" name='password' /><br />
                  </div>
                  <div className='my-3'>
                    <label htmlFor="">{t("confirm_password")}</label><br />
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