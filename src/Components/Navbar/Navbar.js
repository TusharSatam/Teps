import React, { useEffect, useState } from 'react';
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
const Navbar = () => {
    const { t } = useTranslation()
    const [show, setShow] = useState(false);
    const [loginModal, setLoginModal] = useState(false);
    const [displayProfile, setDisplayProfile] = useState("d-none")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCloseloginModal = () => setLoginModal(false);
    const handleShowloginModal = () => setLoginModal(true);
    const { user, isAuthenticated, logout } = useAuth();

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
                    <div>
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
                            <div className='profile_a mx-3 mx-md-5' onClick={() => displayProfile === "d-none" ? setDisplayProfile("d-block") : setDisplayProfile("d-none")} >
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
                <div className='px-3 py-2'>
                    <Link to="/profile" className='navLink' onClick={() => setDisplayProfile("d-none")}>
                        <div className='d-flex align-items-center'>
                            <div>
                                <img className="w-75" src={userLogo} alt="" />
                            </div>
                            <div className='ms-2'>
                                <p className='mt-2 pt-md-1'>{t('profile')}</p>
                            </div>
                        </div>
                    </Link>
                    <div className='d-flex align-items-center'>
                        <div>
                            <img className="w-75" src={saveLogo} alt="" />
                        </div>
                        <div className='ms-2'>
                            <p className='mt-2 pt-md-1'>{t('saved_strategies')}</p>
                        </div>
                    </div>
                    <div className='d-flex align-items-center'>
                        <div>
                            <img className="w-75" src={favLogo} alt="" />
                        </div>
                        <div className='ms-2'>
                            <p className='mt-2 pt-md-1'>{t('favourite_strategies')}</p>
                        </div>
                    </div>
                    <div onClick={logout}>
                        <div className='d-flex align-items-center' onClick={() => setDisplayProfile('d-none')} role="button">
                            <div>
                                <img className="w-75" src={signoutLogo} alt="" />
                            </div>
                            <div className='ms-2'>
                                <p className='mt-2 pt-md-1'>{t('log_out')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Navbar;