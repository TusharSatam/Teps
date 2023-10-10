import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import Logo from '../../asstes/TEPSlogo.png'
import ResLogo from '../../asstes/res-logo.svg'
import { Buffer } from 'buffer';
import { useAuth } from '../../Context/AuthContext';
import LoginModal from '../LoginModal/LoginModal';
import SignUpModal from '../SignUpModal/SignUpModal';
import defaulProfile from '../../asstes/icons/defaultProfileIcon.svg'
import userLogo from '../../asstes/user.svg'
import saveLogo from '../../asstes/save.svg'
import favLogo from '../../asstes/favourite.svg'
import signoutLogo from '../../asstes/signOut.svg'
import './navbar.css'
import { Link } from 'react-router-dom';
import LanguageSelect from '../../languageSelect';
import { useTranslation } from 'react-i18next';
import LeftArrow from '../../asstes/left-arrow.svg'
const Navbar = ({ displayProfile, setDisplayProfile }) => {
  const location = useLocation()
  const { t } = useTranslation()
  const [show, setShow] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseloginModal = () => setLoginModal(false);
  const handleShowloginModal = () => setLoginModal(true);
  const { user, isAuthenticated, logout, setStratigyFilData } = useAuth();
  const profileId = document.getElementById('profile')
  const handleClick = (e) => {
    displayProfile === 'd-none' ?
      setDisplayProfile('d-block') : setDisplayProfile('d-none');
  }
  const navClick = (e) => {
    if (profileId) {
      displayProfile === 'd-block' &&
        setDisplayProfile('d-none')
    }
  }
  const handleStr = () => {
    setDisplayProfile("d-none")
    localStorage.removeItem("filterData")
    setStratigyFilData([])
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
      <section onClick={navClick} className={location.pathname === '/profile' ? "mx-3 mx-md-5 my-3 mt-md-5 d-flex justify-content-between align-items-center " : "mx-3 mx-md-5 my-3 my-md-4 d-flex justify-content-between align-items-center "}>
        <div>
          <Link to={location.pathname !== '/' && '/home'}>
            <div className='d-none d-md-block logo_aligh '>
              <img className='logo2_img' src={Logo} alt="logo2" />
            </div>
            <div className='d-block d-md-none logo_aligh mb-md-0'>
              <img className='logo-res' src={Logo} alt="logo2" />
            </div>
          </Link>
        </div>
        <div className={location.pathname === "/profile" ? "d-flex align-items-center mb-md-5" : 'd-flex align-items-center'}>
        {/* <div className={/(^\/(profile|user-created-strategy|user-edited-strategy|home|search|saveStratigy|favouriteStratigy|addForm|)$)|(^\/single\/[^/]+$)|(^\/editStrategyform\/[^/]+$)|(^\/singleUserStratigy\/[^/]+$)|(^\/singleHi\/[^/]+$)|(^\/editStrategyform\/[a-zA-Z0-9]+\/user$)/.test(location.pathname) ? 'd-block' : 'd-none'}>
          <LanguageSelect />
        </div> */}
          {
            !isAuthenticated ?
              <div className='d-flex me-1 me-md-4'>
                <div>
                  <button onClick={handleShowloginModal} className="authBtnn me-1" >{t('Login')}</button>
                </div>
                <div>
                  <button onClick={handleShow} className='authBtn'>{t('Register')}</button>
                </div>
              </div> :
              <div id='profile' className={location.pathname !== '/' ? 'profile_a' : 'profile_a mx-3 mx-md-5'} onClick={handleClick} >
                {
                  user?.image ? <>
                    <img className='d-none d-md-block profileImg' src={`data:${user?.image?.contentType};base64,${Buffer.from(user?.image?.data?.data).toString('base64')}`} alt="profileImg" />
                    <img className='d-block d-md-none profileImg'  src={`data:${user?.image?.contentType};base64,${Buffer.from(user?.image?.data?.data).toString('base64')}`} alt="profileImg" />
                  </> : <>
                    <img className='d-none d-md-block profileImg'  src={defaulProfile} alt="profileImg" />
                    <img className='d-block d-md-none profileImg'  src={defaulProfile} alt="profileImg" />
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
              <img className="drop_down_icon" src={userLogo} alt="userLogo" />
              <div className='ms-3 mt-3'>
                <p >{t('Profile')}</p>
              </div>
            </div>
          </Link>
          <div onClick={logout} className="mt-2 navLink">
            <div className='d-flex align-items-center' onClick={() => setDisplayProfile('d-none')} role="button">
              <img className="drop_down_icon" src={signoutLogo} alt="signoutLogo" />
              <div className='ms-3 mt-3'>
                <p>{t('Log out')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default Navbar;