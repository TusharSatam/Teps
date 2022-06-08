import React from 'react';
import './footer.css'
import Logo from '../../asstes/White on Transparent 2.png'

const Footer = () => {
    return (
        <section className='footer_content '>
            <div className='d-flex justify-content-between mx-4 mx-md-5 px-md-1'>
                <div className='footer_text'>
                    <p>Teacher Professional Development</p>
                    <p>unboxED</p>
                    <p>Newsletter</p>
                    <p>Blogs</p>
                    <p className=' last_content'>Contact Us</p>
                </div>
                <div>
                    <img className='footer_logo' src={Logo} alt="logo" />
                </div>
            </div>

        </section>
    );
};

export default Footer;