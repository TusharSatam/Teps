import React, { useEffect, useState } from 'react';
import Logo from '../../asstes/things_logo.svg'
import { useAuth } from '../../Context/AuthContext';
import LoginModal from '../LoginModal/LoginModal';
import SignUpModal from '../SignUpModal/SignUpModal';
import defaulProfile from '../../asstes/defaultProfile.png'
import userLogo from '../../asstes/user.svg'
import saveLogo from '../../asstes/save.svg'
import favLogo from '../../asstes/favourite.svg'
import signoutLogo from '../../asstes/signOut.svg'
import './navbar.css'
import { Link } from 'react-router-dom';
const Navbar = () => {
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
            <section className='mx-3 mx-md-5 my-5 d-flex justify-content-between align-items-center '>
                <div className='d-flex'>
                    {/* <div>
                        <img className='logo_img' src={Logo} alt="logo" />
                    </div> */}
                    <div className='logo_aligh '>
                        <img className='logo2_img' src={Logo} alt="logo2" />
                    </div>
                </div>
                {
                    !isAuthenticated ?
                        <div className='d-flex'>
                            <div>
                                <button onClick={handleShowloginModal} className="authBtnn me-3" >Login</button>
                            </div>
                            <div>
                                <button onClick={handleShow} className='authBtnn'>Register</button>
                            </div>
                        </div> :
                        <div className='profile_a' onClick={() => displayProfile === "d-none" ? setDisplayProfile("d-block") : setDisplayProfile("d-none")} >
                            <img width="50%" src={defaulProfile} alt="" />
                        </div>
                }
            </section>
            <div className={`profile_section + ${displayProfile}`}>
                <div className='px-3 py-2'>
                    <Link to="/profile" className='navLink' onClick={() => setDisplayProfile("d-none")}>
                        <div className='d-flex align-items-center'>
                            <div>
                                <img src={userLogo} alt="" />
                            </div>
                            <div className='ms-2'>
                                <p className='pt-3'>Profile</p>
                            </div>
                        </div>
                    </Link>
                    <div className='d-flex align-items-center'>
                        <div>
                            <img src={saveLogo} alt="" />
                        </div>
                        <div className='ms-2'>
                            <p className='pt-3'>Saved Strategies</p>
                        </div>
                    </div>
                    <div className='d-flex align-items-center'>
                        <div>
                            <img src={favLogo} alt="" />
                        </div>
                        <div className='ms-2'>
                            <p className='pt-3'>Favourite Strategies</p>
                        </div>
                    </div>
                    <div onClick={logout}>
                        <div className='d-flex align-items-center' onClick={() => setDisplayProfile('d-none')} role="button">
                            <div>
                                <img src={signoutLogo} alt="" />
                            </div>
                            <div className='ms-2'>
                                <p className='pt-3'>Log out</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

export default Navbar;