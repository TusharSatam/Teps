import React from 'react';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../apis/adminLogin';
import { useAuth } from '../../Context/AuthContext';

const AdminAuth = () => {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const { setIsAuthenticatedAdmin, setAdmin } = useAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState('');
    const [checkError, setCheckError] = React.useState('');
    const handleSIgnIn = (e) => {
        e.preventDefault();
        if (e.target.checkmark.checked === true) {
            setIsLoading(true);
            setCheckError('');
            const data = {
                'email': e.target.email.value,
                'password': e.target.password.value
            }
            adminLogin(data)
                .then(res => {
                    if (res) {
                        console.log(res);
                        setIsLoading(false);
                        setAdmin(res.data);
                        setIsAuthenticatedAdmin(true);
                        window.localStorage.setItem('adminJwt', JSON.stringify(res.jwt));
                        window.localStorage.setItem('adminData', JSON.stringify(res.data));
                        navigate('/admin-home');
                    }
                    setIsLoading(false)
                })
                .catch(err => {
                    setError(err.response.data?.message);
                    console.log(err);
                    setIsLoading(false)
                })
        }
        else {
            setCheckError("Please check the box if you want to proceed")
        }
    }

    return (
        <>
            <div className='mt-5 pt-5'>
                <div>
                    <p className='text-center log_in mt-3'>Admin Login</p>
                </div>
                <form onSubmit={handleSIgnIn}>
                    <div className='d-flex justify-content-center'>
                        <div>
                            <div className='my-3'>
                                <label htmlFor="" style={{ marginBottom: "-20px" }} className={error === 'Invalid Email' ? 'd-flex text-danger' : 'd-flex'}>{t("email")} <span className={error === 'Invalid Email' ? 'd-block' : "d-none"}> &nbsp;(Email not found.)</span></label><br />
                                <input placeholder='LilyBlom201@gmail.com' name='email' className={error === 'Invalid Email' ? "login_input text-danger border border-danger" : 'login_input'} type="email" />
                            </div>

                            <div className='my-4'>
                                <label htmlFor="" style={{ marginBottom: "-20px" }} className={error === 'Invalid Password' ? 'd-flex text-danger' : 'd-flex'}>{t("password")} <span className={error === 'Invalid Password' ? 'd-block' : "d-none"}> &nbsp;{t('password_error')}</span></label><br />
                                <input id='authPass' placeholder='1234567#' className={error === 'Invalid Password' ? "login_input text-danger border border-danger" : 'login_input'} type="password" name='password' /><br />
                            </div>
                            <div className='d-flex'>
                                <div className='mt-1'>
                                    <label className="containerr">
                                        <input name='checkmark' type="checkbox" />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>
                                <p style={{ marginTop: "2px", marginLeft: "-6px" }}>{t("robot")}</p>
                            </div>
                            <p className='text-danger'>{checkError ? checkError : ""}</p>
                            <div className='d-flex justify-content-center my-5'>
                                {
                                    <button disabled={isLoading} className='submit_btn'>{isLoading ? <Spinner className="text-light " animation="border" /> : t("login")}    </button>
                                }

                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AdminAuth;