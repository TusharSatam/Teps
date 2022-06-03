import React, { useState } from 'react';
import defaultProfile from '../../asstes/defaultProfile.png'
import ForgotModal from '../ForgotPassModal/ForgotModal';
import HeroSection from '../Home/HeroSection';
import './profile.css'
const Profile = () => {
    const [forgot, setForgot] = useState(false);
    const handleForgotShow = () => {
        setForgot(true);
    }
    return (
        <>
            <ForgotModal
                show={forgot}
                setShow={setForgot}
            />
            <HeroSection />
            <section style={{ background: "#E5E5E5" }}>
                <div className='container p-5 d-flex ' >
                    <div className='px-4 w-25 d-flex justify-content-center align-items-center text-center bg-light '>
                        <div className='py-4'>
                            <div className="button-wrapper">
                                <img className='label' src={defaultProfile} alt="" />
                                <input id="upload" className='upload-box' type="file" name="" />
                            </div>
                            <div className='profile_school mt-3'>
                                <p>Lilyblom <br /> Abc school</p>
                            </div>
                            <div className='d-flex justify-content-center py-5 my-5'>
                                <button onClick={handleForgotShow} className='submit_btn'>Change Password</button>
                            </div>
                        </div>
                    </div>
                    <div className='bg-light ms-5 w-75'>
                        <form className='p-5'>
                            <div className='w-100'>
                                <div className='d-flex justify-content-between align-items-center mt-4'>
                                    <h4 className='pe-5'>School/Organization:</h4>
                                    <p className='mt-1'>abc school</p>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mt-4'>
                                    <h4>Email ID:</h4>
                                    <p className='mt-1'>abc school</p>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mt-4'>
                                    <h4>Designation:</h4>
                                    <p className='mt-1'>abc school</p>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mt-4'>
                                    <h4>City/Town:</h4>
                                    <p className='mt-1'>abc school</p>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mt-4'>
                                    <h4>State:</h4>
                                    <select className='ps-2 pe-5 py-1' name="" id="">
                                        <option value="">Mumbai&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                                        <option value="">Mumbai</option>
                                        <option value="">Mumbai</option>
                                    </select>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mt-4'>
                                    <h4>Pincode:</h4>
                                    <p className='mt-1'>abc school</p>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mt-4'>
                                    <h4>Country:</h4>
                                    <select className='ps-2 pe-5 py-1' name="" id="">
                                        <option value="">India&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                                        <option value="">Australia</option>
                                        <option value="">Usa</option>
                                    </select>
                                </div>
                                <div className='d-flex mt-5'>
                                    <div>
                                        <button className="authBtn me-3" >Favourites</button>
                                    </div>
                                    <div>
                                        <button className='authBtn'>Saved</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Profile;