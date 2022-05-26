import React from 'react';
import './footer.css'
import Logo from '../../asstes/logo.png'

const Footer = () => {
    return (
        <section className=''>
            <div className='d-flex justify-content-between footer_content px-3 px-md-5 py-5'>
                <div>
                    <p>Teacher Professional Development</p>
                    <p>unboxED</p>
                    <p>Newsletter</p>
                    <p>Blogs</p>
                    <p className='last_content'>Contact Us</p>
                </div>
                <div>
                    <img className='footer_logo' src={Logo} alt="logo" />
                </div>
            </div>

        </section>
    );
};

export default Footer;