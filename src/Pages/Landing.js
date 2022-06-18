import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import Article from '../Components/LandingArticle/Article';
import LandingCarousel from '../Components/LandingCarousel/LandingCarousel';
import Navbar from '../Components/Navbar/Navbar';
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
            <Navbar />
            <LandingCarousel />
            <Article />
            <SignUpModal />
            <Footer />

        </>
    );
};

export default Landing;