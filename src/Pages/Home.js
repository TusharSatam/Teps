import React from 'react';
import HeroSection from '../Components/Home/HeroSection';
import HomeHindiLayout from '../Components/Home/HomeHindiLayout';
import HomeLayout from '../Components/Home/HomeLayout';
import Article from '../Components/LandingArticle/Article';
import { useAuth } from '../Context/AuthContext';
const Home = () => {
    const { selectLang } = useAuth();
    return (
        <>
            <HeroSection />
            {
                selectLang === 'hindi' ?
                    <HomeHindiLayout /> :
                    <HomeLayout />
            }
            <Article />

        </>
    );
};

export default Home;