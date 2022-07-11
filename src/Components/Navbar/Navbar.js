import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Logo from '../../asstes/things_logo.svg'
import { Buffer } from 'buffer';
import { useAuth } from '../../Context/AuthContext';
import LoginModal from '../LoginModal/LoginModal';
import SignUpModal from '../SignUpModal/SignUpModal';
import defaulProfile from '../../asstes/Group 51.svg'
import userLogo from '../../asstes/user.svg'
import saveLogo from '../../asstes/save.svg'
import favLogo from '../../asstes/favourite.svg'
import signoutLogo from '../../asstes/signOut.svg'
import './navbar.css'
import { Link } from 'react-router-dom';
import LanguageSelect from '../../languageSelect';
import { useTranslation } from 'react-i18next';
const Navbar = ({ displayProfile, setDisplayProfile }) => {
    const location = useLocation()
    const { t } = useTranslation()
    const [show, setShow] = useState(false);
    const [loginModal, setLoginModal] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseloginModal = () => setLoginModal(false);
    const handleShowloginModal = () => setLoginModal(true);
    const { user, isAuthenticated, logout } = useAuth();
    const handleClick = () => {
        displayProfile === 'd-none' ?
            setDisplayProfile('d-block') : setDisplayProfile('d-none')
    }
    return (
        <>
            <SignUpModal
                key={'1'}
                handleClose={handleClose}
                show={show}
                setShow={setShow}
            />
            <LoginModal
                key={'2'}
                handleClose={handleCloseloginModal}
                show={loginModal}
                setShow={setLoginModal}
            />
            <section className='mx-3 mx-md-5 my-3 my-md-5 d-flex justify-content-between align-items-center '>
                <div className='d-flex'>
                    {/* <div>
                        <img className='logo_img' src={Logo} alt="logo" />
                    </div> */}
                    <Link to="/home">
                        <div className='logo_aligh '>
                            <img className='logo2_img' src={Logo} alt="logo2" />
                        </div></Link>
                </div>
                <div className='d-flex align-items-center'>
                    <div className={location.pathname === '/profile' ? 'd-block' : 'd-none'}>
                        <LanguageSelect />
                    </div>
                    {
                        !isAuthenticated ?
                            <div className='d-flex me-1 me-md-3'>
                                <div>
                                    <button onClick={handleShowloginModal} className="authBtnn me-3" >{t('login')}</button>
                                </div>
                                <div>
                                    <button onClick={handleShow} className='authBtn'>{t('register')}</button>
                                </div>
                            </div> :
                            <div id='profile' className={location.pathname !== '/' ? 'profile_a' : 'profile_a mx-3 mx-md-5'} onClick={handleClick} >
                                {
                                    user?.image ? <>
                                        <img className='d-none d-md-block' style={{ width: "60px", borderRadius: '1000px' }} src={`data:${user?.image?.contentType};base64,${Buffer.from(user?.image?.data?.data).toString('base64')}`} alt="" />
                                        <img className='d-block d-md-none' style={{ width: "40px", borderRadius: '1000px' }} src={`data:${user?.image?.contentType};base64,${Buffer.from(user?.image?.data?.data).toString('base64')}`} alt="" />
                                        {/* <img className='d-block d-md-none' src={defaulProfile} alt="" /> */}
                                    </> : <>
                                        <img className='d-none d-md-block' width="60px" src={defaulProfile} alt="" />
                                        <img className='d-block d-md-none' src={defaulProfile} alt="" />
                                    </>
                                }


                            </div>
                    }
                </div>
            </section>
            <div className={`profile_section + ${displayProfile}`}>
                <div className='ps-3 py-3'>
                    <Link to="/profile" className='navLink' onClick={() => setDisplayProfile("d-none")}>
                        <div className='d-flex align-items-center'>
                            <img className="drop_down_icon" src={userLogo} alt="" />
                            <div className='ms-3 mt-2'>
                                <p >{t('profile')}</p>
                            </div>
                        </div>
                    </Link>
                    <div className='d-flex align-items-center mt-2'>
                        <img className="drop_down_icon" src={saveLogo} alt="" />
                        <div className='ms-3 mt-2'>
                            <p >{t('saved_strategies')}</p>
                        </div>
                    </div>
                    <div className='d-flex align-items-center mt-2'>
                        <img className="drop_down_icon" src={favLogo} alt="" />
                        <div className='ms-3 mt-2'>
                            <p >{t('favourite_strategies')}</p>
                        </div>
                    </div>
                    <div onClick={logout} className="mt-2">
                        <div className='d-flex align-items-center' onClick={() => setDisplayProfile('d-none')} role="button">
                            <img className="drop_down_icon" src={signoutLogo} alt="" />
                            <div className='ms-3 mt-2'>
                                <p>{t('log_out')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Navbar;