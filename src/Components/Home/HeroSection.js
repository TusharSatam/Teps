import React from 'react';
import heroImage from '../../asstes/image screen.png'

const HeroSection = () => {
    return (
        <>
            <div>
                <img className='w-100' src={heroImage} alt="" />
            </div>
        </>
    );
};

export default HeroSection;