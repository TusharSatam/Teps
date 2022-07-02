import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../Context/AuthContext';
import './homelayout.css'
const HeroSection = () => {
    const { user } = useAuth();
    const { t } = useTranslation()
    return (
        <>
            <div className='heroImage d-none d-md-block' >
                <h1 className='text-white text-center heroTitleName' >{t('welcome')} {user.firstName} {user.lastName}!</h1>
            </div>
            <div className='heroImageRes d-block d-md-none' >
                <h1 className='text-white text-center heroTitleName' >{t('welcome')} {user.firstName} {user.lastName}!</h1>
            </div>
        </>
    );
};

export default HeroSection;