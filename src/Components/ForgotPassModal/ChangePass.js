import axios from 'axios';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './forgotmodal.css'
import { useAuth } from '../../Context/AuthContext';
import { useTranslation } from 'react-i18next';
import toast, { Toaster } from 'react-hot-toast';

const ChangePass = ({ show, setShow }) => {
  const { user } = useAuth()
  const { t } = useTranslation()
  const [error, setError] = useState('');
  const [passError, setPassError] = React.useState('');
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.password.value.length > 4 && e.target.confirm_password.value.length > 4) {
      if (e.target.password.value === e.target.confirm_password.value) {
        setError('')
        const data = {
          'email': user.email,
          'password': e.target.password.value,
        }
        axios.post("/forget/update", data)
          .then(res => {
            setShow(false)
            toast.success(`${t('success_Change')}`)
            e.target.reset()
          })
          .catch(err => {
            console.log(err);
          })
      }
      else {
        setPassError(``)
        setError(`${t('password_match')}`)
      }
    }
    else {
      setPassError(`${t('password_five')}`)
      setError(``)
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
              <p onClick={handleClose} style={{ cursor: 'pointer', color: '#6D747A' }} className=' me-1 fs-5 text-end'>&#10006;</p>
              <p className='text-center forgot_header mt-5'>{t('pass_change')} </p>
              {/* <p className='text-center forgot_subheader mt-3'>{t("reset_pass_cont")} </p> */}
            </div>
            <form onSubmit={handleChange}>
              <div className='d-flex justify-content-center'>
                <div>
                  <div className='my-3'>
                    <label htmlFor="">{t('New Password')}</label><br />
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
                    <button className='submit_btn'>{t('Change Password')}</button>
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

export default ChangePass;