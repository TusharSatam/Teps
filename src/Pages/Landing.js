import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Article from '../Components/LandingArticle/Article';
import LandingCarousel from '../Components/LandingCarousel/LandingCarousel';
import SignUpModal from '../Components/SignUpModal/SignUpModal';
import { useAuth } from '../Context/AuthContext';

const Landing = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        isAuthenticated && navigate('/home')
    })
    return (
        <>
            <LandingCarousel />
            <Article />
            <SignUpModal />
        </>
    );
};

export default Landing;