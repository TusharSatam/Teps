import React from 'react';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { userRegister } from '../../apis/auth';
import CrossIcon from '../../asstes/cross-icon.png'
import { useAuth } from '../../Context/AuthContext';
import ForgotModal from '../ForgotPassModal/ForgotModal';
import './signUpModal.css'

const SignUpModal = ({ handleClose, show, setShow }) => {
    const { t } = useTranslation()
    const [error, setError] = React.useState('');
    const [required, setRequired] = React.useState('');
    const [emailError, setEmailError] = React.useState('');
    const [citys, setCitys] = React.useState('');
    const [cityDisable, setCityDisable] = React.useState(false);
    const [interNAtionalDisable, setInterNAtionalDisable] = React.useState(false);
    const [checked, setChecked] = React.useState(false);
    const [display, setDisplay] = React.useState('d-none');
    const [forgot, setForgot] = React.useState(false);
    const [checkError, setCheckError] = React.useState('');
    const [passError, setPassError] = React.useState('');

    const navigate = useNavigate();
    const { setIsAuthenticated, setUser } = useAuth();

    React.useEffect(() => {
        const url = "./citys.json"
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const res = await response.json();
                setCitys(res.cities);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    }, [])
    const handleOnchange = (e) => {
        const city = e.target.value;
        if (city) {
            setInterNAtionalDisable(true);
            setCityDisable(false);
        }
        if (city === 'City/Town') {
            setInterNAtionalDisable(false);
        }
    }
    React.useEffect(() => {
        if (checked) {
            setCityDisable(true);
            setInterNAtionalDisable(false)
        }
        else {
            setCityDisable(false);
        }
    }, [checked])


    const handleSignUp = (e) => {
        e.preventDefault();
        let equalPass;
        if (e.target.checkmark.checked === true) {
            setCheckError('');
            if (e.target.password.value.length > 4 && e.target.confirm_password.value.length > 4) {
                if (e.target.firstName.value && e.target.lastName.value && e.target.email.value && e.target.designation.value &&
                    e.target.organization.value && (e.target.city.value !== 'City/Town' || checked) && e.target.pincode.value && equalPass !== ''
                ) {
                    setRequired("");
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
                        // formData.append('image', e.target.img.files[0]);
                        userRegister(formData)
                            .then(res => {
                                e.target.reset();
                                setShow(false)
                                setUser(res.data.data);
                                setIsAuthenticated(true);
                                window.localStorage.setItem('jwt', JSON.stringify(res.data.jwt));
                                window.localStorage.setItem('data', JSON.stringify(res.data.data));
                                navigate('/home')
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
                    setRequired(`${t('fill_all_box')}`)
                }
            }
            else {
                setPassError(`${t('password_five')}`)
            }
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
                        <p className='text-center sign_up'>{t('register')}</p>
                    </div>
                    <div className='mx-4 mt-4'>
                        <form className='ms-md-3 ms-xxl-5' onSubmit={handleSignUp}>
                            <div className='d-flex '>
                                <div className='me-5'>
                                    <label htmlFor="">{t('first_name')}<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='firstName' placeholder='Lily' type="text" />
                                </div>
                                <div>
                                    <label htmlFor="">{t('last_name')}<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='lastName' placeholder='Blom' type="text" />
                                </div>
                            </div>
                            <div className='my-3'>
                                <label className={emailError ? "text-danger" : ""} htmlFor="">{t('email')}<span style={{ fontSize: "14px" }} className='text-danger'>&#x2736; {emailError ? emailError : ''}</span></label> <br />
                                <input className={emailError ? "signup_Input border-danger text-danger" : "signup_Input"} name='email' placeholder='Lilyblom201@gmail.com' type="email" />
                                <a href="#" className={display} onClick={handleForgotShow} ><p className='text-start forgot_pass mt-1' style={{ fontSize: "12px" }}>{t('retrieve_password')}</p></a>
                            </div>
                            <div className='d-flex  my-3'>
                                <div className='me-5'>
                                    <label htmlFor="">{t('designation')}<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='designation' placeholder={t('designation')} type="text" />
                                </div>
                                <div>
                                    <label htmlFor="">{t('scl_org')}<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='organization' placeholder={t('scl_org')} type="text" />
                                </div>
                            </div>
                            <div className='d-flex  my-3'>
                                <div className='me-5'>
                                    <label htmlFor="">{t('city')}{!checked ? <span className='text-danger'>&#x2736;</span> : ''}</label><br />
                                    <select onChange={handleOnchange} disabled={cityDisable} className='select_input' name='city' title="City">
                                        <option value="City/Town" selected >{t('city')}</option>
                                        {
                                            !citys ? <option value="City/Town" selected >{t('city')}</option> :
                                                citys.map((data, index) => (
                                                    <option key={index}>{data.City}</option>
                                                ))
                                        }
                                    </select><br />
                                    <input defaultChecked={checked} onChange={() => setChecked(!checked)} disabled={interNAtionalDisable} type="checkbox" name="International" id="" />
                                    <label htmlFor="">&nbsp;{t('international')}</label>
                                </div>
                                <div>
                                    <label htmlFor="">{t('pincode')}<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' min="0" name='pincode' placeholder={t('pincode')} type="number" />
                                </div>
                            </div>
                            <div className='d-flex my-3'>
                                <div className='me-5'>
                                    <label htmlFor="">{t('password')}</label> <br />
                                    <input required className='signup_Input' min="0" name='password' placeholder={t('password')} type="password" step="1" />
                                </div>
                                <div>
                                    <label htmlFor="">{t('confirm_password')}</label> <br />
                                    <input required className='signup_Input' name='confirm_password' placeholder={t('confirm_password')} type="password" />
                                </div>
                            </div>
                            <div className='d-flex'>
                                <div className='mt-1 d-none d-md-block'>
                                    <label class="containerr">
                                        <input name='checkmark' type="checkbox" />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                                <p style={{ marginTop: "2px", marginLeft: "-6px" }}>{t("robot")}</p>
                            </div>
                            {required ? <p className='text-danger text-center me-5 pe-4'>{required}</p> : ""}
                            {error ? <p className='text-danger text-center me-5 pe-4'>{error}</p> : ""}
                            <p className='text-danger '>{checkError ? checkError : ""}</p>
                            <p className='text-danger text-center me-5 pe-4'>{passError ? passError : ""}</p>
                            <div className='d-flex justify-content-center me-5 pe-4'>
                                <button className='submit_btn'>{t('submit')}</button>
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
                className="d-block d-md-none mt-5 pt-3 px-2"

            >
                <Modal.Body
                    className="res_modal "
                    style={{ height: "651px" }}
                >
                    <div>
                        <div>
                            <span onClick={handleClose} style={{ cursor: 'pointer' }} className='d-flex justify-content-end '><img width='15px' src={CrossIcon} alt="" /></span>
                            <p className='text-center sign_up' style={{ fontSize: "20px" }}>{t('register')}</p>
                        </div>
                        <div className='mx-4 d-flex justify-content-center'>
                            <form onSubmit={handleSignUp}>
                                <div className='mt-3'>
                                    <label htmlFor="">{t('first_name')}<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='firstName' placeholder='Lily' type="text" />
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="">{t('last_name')}<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='lastName' placeholder='Blom' type="text" />
                                </div>
                                <div className='mt-3'>
                                    <label className={emailError ? "text-danger" : ""} htmlFor="">{t('email')}<span style={{ fontSize: "14px" }} className='text-danger mt-5'>&#x2736; {emailError ? emailError : ''}</span></label> <br />
                                    <input className={emailError ? "signup_Input border-danger text-danger" : "signup_Input"} name='email' placeholder='Lilyblom201@gmail.com' type="email" />
                                    <a href="#" className={display} style={{ fontSize: "12px" }} onClick={handleForgotShow}><p className='text-start forgot_pass mt-1'>{t('retrieve_password')}</p></a>
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="">{t('designation')}<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='designation' placeholder={t('designation')} type="text" />
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="">{t('scl_org')}<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='organization' placeholder={t('scl_org')} type="text" />
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="">{t('city')}{!checked ? <span className='text-danger'>&#x2736;</span> : ''}</label><br />
                                    <select onChange={handleOnchange} disabled={cityDisable} className='select_input' name='city' title="City">
                                        <option value="City/Town" selected >{t('city')}</option>
                                        {
                                            !citys ? <option value="City/Town" selected >{t('city')}</option> :
                                                citys.map((data, index) => (
                                                    <option key={index}>{data.City}</option>
                                                ))
                                        }
                                    </select><br />
                                    <input defaultChecked={checked} onChange={() => setChecked(!checked)} disabled={interNAtionalDisable} type="checkbox" name="International" id="" />
                                    <label htmlFor="">&nbsp;{t('international')}</label>
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="">{t('pincode')}<span className='text-danger'>&#x2736;</span></label> <br />
                                    <input className='signup_Input' name='pincode' min="0" placeholder={t('pincode')} type="number" />
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="">{t('password')}</label> <br />
                                    <input className='signup_Input' name='password' placeholder={t('password')} type="password" />
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="">{t('confirm_password')}</label> <br />
                                    <input className='signup_Input' name='confirm_password' placeholder={t('confirm_password')} type="password" />
                                </div>
                                <div className='d-flex my-3'>
                                    <div className='mt-1 d-block d-md-none'>
                                        <label class="containerr">
                                            <input name='checkmark' type="checkbox" />
                                            <span class="checkmark"></span>
                                        </label>
                                    </div>
                                    <p style={{ marginTop: "2px", marginLeft: "-6px" }}>{t("robot")}</p>
                                </div>
                                {required ? <p className='text-danger text-center'>{required}</p> : ""}
                                {error ? <p className='text-danger text-center'>{error}</p> : ""}
                                <p className='text-danger '>{checkError ? checkError : ""}</p>
                                <div className='d-flex justify-content-center my-5'>
                                    <button className='submit_btn'>{t('submit')}</button>
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