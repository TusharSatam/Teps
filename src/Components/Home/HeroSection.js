import React from 'react';
import { useAuth } from '../../Context/AuthContext';
import './homelayout.css'
const HeroSection = () => {
    const { user } = useAuth();
    return (
        <>
            <div className='heroImage d-none d-md-block' >
                <h1 className='text-white text-center heroTitleName' >Welcome {user.firstName} {user.lastName}!</h1>
            </div>
            <div className='heroImageRes d-block d-md-none' >
                <h1 className='text-white text-center heroTitleName' >Welcome {user.firstName} {user.lastName}!</h1>
            </div>
        </>
    );
};

export default HeroSection;