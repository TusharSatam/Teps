import React from 'react';
import './footer.css'
import Logo from '../../asstes/White on Transparent 2.png'
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation()
  return (<>
    <div className='footerSizeTaker'></div>
    <div className={location.pathname !== '/profile' ? 'footer_top_margin' : 'footer_top_margin_res'}>
      <div className={location.pathname !== '/profile' ? 'footer_content' : 'footer_res_content'}>
        <div className=' d-flex justify-content-between align-items-center mx-4 mx-md-5 px-md-1'>
          <div className='footer_text'>
            <p className='mb-md-1'> <a href='https://www.things-education.com/teachers' target="_blank" rel="noreferrer">Teacher Professional Development</a></p>
            <p className='mb-md-1'> <a href='https://www.things-education.com/unboxed' target="_blank" rel="noreferrer">unboxED</a></p>
            <p className='mb-md-1'><a href='https://www.things-education.com/newsletter' target="_blank" rel="noreferrer">Newsletter</a></p>
            <p className='mb-md-1'><a href='https://www.things-education.com/blog' target="_blank" rel="noreferrer">Blogs</a></p>
            <p className='mb-md-1'><a href='https://www.things-education.com/contact' target="_blank" className=' last_content' rel="noreferrer">Contact Us</a></p>
            <p className='mb-md-1'><a href='/privacy-policy' target="_blank" className=' last_content' rel="noreferrer">Privacy Policy</a></p>
            <p className='mb-md-1'><a href='/terms-conditions' target="_blank" className=' last_content' rel="noreferrer">Terms & Conditions</a></p>
            <p className='mb-md-1'><a href='/payment-terms' target="_blank" className=' last_content' rel="noreferrer">Payment Terms</a></p>

          </div>
          <div>
            <a href="https://www.things-education.com/" target="_blank" rel="noreferrer">
              <img className='footer_logo' src={Logo} alt="logo" />
            </a>
          </div>
        </div>
        <div className="text-center copyrightFooterText">
        © Things Education LLP 2023
        </div>
      </div>
    </div>
  </>);
};

export default Footer;