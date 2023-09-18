import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Article from '../Components/LandingArticle/Article';
import LandingCarousel from '../Components/LandingCarousel/LandingCarousel';
import SignUpModal from '../Components/SignUpModal/SignUpModal';
import { useAuth } from '../Context/AuthContext';
import FilterStr from '../Components/Home/FilterStr';

const Landing = () => {
    const { isAuthenticated,allStrategies,selectLang,allHindiStrategies } = useAuth();
    const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    const navigate = useNavigate();
    useEffect(() => {
        isAuthenticated && navigate('/home')
    })
    return (
        <>
            <LandingCarousel />
            <FilterStr stratigy={selectLang=="english"?allStrategies:allHindiStrategies} handleShow={handleShow}/>
            <Article />
            <SignUpModal 
                    key={'1'}
                    handleClose={handleClose}
                    show={show}
                    setShow={setShow}
            />

        </>
    );
};

export default Landing;