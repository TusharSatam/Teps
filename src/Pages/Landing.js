import React from 'react';
import Footer from '../Components/Footer/Footer';
import Article from '../Components/LandingArticle/Article';
import LandingCarousel from '../Components/LandingCarousel/LandingCarousel';
import Navbar from '../Components/Navbar/Navbar';
import SignUpModal from '../Components/SignUpModal/SignUpModal';

const Landing = () => {
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