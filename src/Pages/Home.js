import React from 'react';
import HeroSection from '../Components/Home/HeroSection';
import HomeLayout from '../Components/Home/HomeLayout';
import Article from '../Components/LandingArticle/Article';
const Home = () => {
    return (
        <>
            <HeroSection />
            <HomeLayout />
            <Article />

        </>
    );
};

export default Home;