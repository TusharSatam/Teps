import React from 'react';
import './footer.css'
import Logo from '../../asstes/White on Transparent 2.png'
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation()
  return (
    <div className={location.pathname !== '/profile' ? 'footer_top_margin' : 'footer_top_margin_res'}>
      <div className={location.pathname !== '/profile' ? 'footer_content' : 'footer_res_content'}>
        <div className=' d-flex justify-content-between mx-4 mx-md-5 px-md-1'>
          <div className='footer_text'>
            <p> <a href='https://www.things-education.com/teachers' target="_blank" rel="noreferrer">Teacher Professional Development</a></p>
            <p> <a href='https://www.things-education.com/unboxed' target="_blank" rel="noreferrer">unboxED</a></p>
            <p><a href='https://www.things-education.com/newsletter' target="_blank" rel="noreferrer">Newsletter</a></p>
            <p><a href='https://www.things-education.com/blog' target="_blank" rel="noreferrer">Blogs</a></p>
            <p><a href='https://www.things-education.com/contact' target="_blank" className=' last_content' rel="noreferrer">Contact Us</a></p>
          </div>
          <div>
            <a href="https://www.things-education.com/" target="_blank" rel="noreferrer">
              <img className='footer_logo' src={Logo} alt="logo" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;