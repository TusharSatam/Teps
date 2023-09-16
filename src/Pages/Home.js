import React, { Suspense, lazy } from 'react';
import HeroSection from '../Components/Home/HeroSection';
import { useAuth } from '../Context/AuthContext';

const HomeHindiLayout = lazy(() => import('../Components/Home/HomeHindiLayout'));
const HomeLayout = lazy(() => import('../Components/Home/HomeLayout'));
const Article = lazy(() => import('../Components/LandingArticle/Article'));

const Home = () => {
    const { selectLang } = useAuth();

    return (
        <>
            <HeroSection />
            <Suspense fallback={<div>Loading...</div>}>
                {selectLang === 'hindi' ? <HomeHindiLayout /> : <HomeLayout />}
                <Article />
            </Suspense>
        </>
    );
};

export default Home;