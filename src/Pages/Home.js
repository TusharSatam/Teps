import React from 'react';
import Footer from '../Components/Footer/Footer';
import HeroSection from '../Components/Home/HeroSection';
import HomeLayout from '../Components/Home/HomeLayout';
import Navbar from '../Components/Navbar/Navbar';
const Home = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <HomeLayout />
            <Footer />

        </>
    );
};

export default Home;