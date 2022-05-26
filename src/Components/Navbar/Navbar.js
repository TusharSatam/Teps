import React, { useState } from 'react';
import Logo from '../../asstes/logo.png'
import Logo2 from '../../asstes/logo2.png'
import LoginModal from '../LoginModal/LoginModal';
import SignUpModal from '../SignUpModal/SignUpModal';
import './navbar.css'
const Navbar = () => {
    const [show, setShow] = useState(false);
    const [loginModal, setLoginModal] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseloginModal = () => setLoginModal(false);
    const handleShowloginModal = () => setLoginModal(true);
    return (

        <>
            <SignUpModal
                key={'1'}
                handleClose={handleClose}
                show={show}
            />
            <LoginModal
                key={'2'}
                handleClose={handleCloseloginModal}
                show={loginModal}
            />
            <section className='mx-3 mx-md-5 my-4 d-flex justify-content-between align-items-center '>
                <div className='d-flex'>
                    {/* <div>
                        <img className='logo_img' src={Logo} alt="logo" />
                    </div> */}
                    <div className='logo_aligh mt-3'>
                        <img className='logo2_img' src={Logo2} alt="logo2" />
                    </div>
                </div>
                <div className='d-flex'>
                    <div>
                        <button onClick={handleShowloginModal} className="authBtn me-3" >Login</button>
                    </div>
                    <div>
                        <button onClick={handleShow} className='authBtn'>Register</button>
                    </div>
                </div>
            </section>
        </>

    );
};

export default Navbar;