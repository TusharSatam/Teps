import React, { useState } from 'react';
import defaultProfile from '../../asstes/defaultProfile.png'
import { useAuth } from '../../Context/AuthContext';
import ChangePass from '../ForgotPassModal/ChangePass';
import HeroSection from '../Home/HeroSection';
import './profile.css'
const Profile = () => {
    const { user } = useAuth();
    console.log(user);



    const [forgot, setForgot] = useState(false);
    const handleForgotShow = () => {
        setForgot(true);
    }
    return (
        <>
            <ChangePass
                show={forgot}
                setShow={setForgot}
            />
            <HeroSection />
            <section className='profile_container'>
                <div style={{ height: "10px" }}></div>
                <div className='d-block d-md-none text-start mx-3 mt-5 bg-light shadow'>
                    <div className='d-flex align-items-center'>
                        <div className="button-wrapper">
                            <img className='label' src={defaultProfile} alt="" />
                            <input id="upload" className='upload-box' type="file" name="" />
                        </div>
                        <div>
                            <div className='profile_school mt-3'>
                                <p>Lilyblom <br /> Abc school</p>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <button onClick={handleForgotShow} className='submit_btn'>Change Password</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='d-block d-md-none mx-3 mt-4'>
                    <hr />
                </div>
                <div className='container p-md-5 d-md-flex ' >
                    <div className='px-4 w-25 side_profile d-none d-md-flex justify-content-center align-items-center text-center bg-light '>
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
                    <div className='ms-md-5 form_container mt-5 mt-md-0 mb-5'>
                        <form className='p-1 p-md-5'>
                            <div className='w-100'>
                                <div className='d-flex justify-content-between align-items-center mt-4'>
                                    <h4 className='pe-5'>School/Organization:</h4>
                                    <div >
                                        <input className='profile_input' type="text" defaultValue={user.organization} name="" id="" />
                                    </div>
                                    {/* <p className='mt-1'>abc school</p> */}
                                </div>
                                <div className='d-flex justify-content-between align-items-center mt-4'>
                                    <h4>Email ID:</h4>
                                    <div >
                                        <input className='profile_input' type="text" defaultValue={user.email} name="" id="" />
                                    </div>
                                    {/* <p className='mt-1'>abc school</p> */}
                                </div>
                                <div className='d-flex justify-content-between align-items-center mt-4'>
                                    <h4>Designation:</h4>
                                    {/* <p className='mt-1'>abc school</p> */}
                                    <div >
                                        <input className='profile_input' type="text" defaultValue={user.designation} name="" id="" />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mt-4'>
                                    <h4>City/Town:</h4>
                                    {/* <p className='mt-1'>abc school</p> */}
                                    <div >
                                        <input className='profile_input' type="text" defaultValue={user.city} name="" id="" />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mt-4'>
                                    <h4>State:</h4>
                                    <select className='ps-2 pe-5 py-1' name="" id="">
                                        <option value="">Mumbai</option>
                                        <option value="">Mumbai</option>
                                        <option value="">Mumbai</option>
                                    </select>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mt-4'>
                                    <h4>Pincode:</h4>
                                    {/* <p className='mt-1'>abc school</p> */}
                                    <div >
                                        <input className='profile_input' type="text" defaultValue={"abc school"} name="" id="" />
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between align-items-center mt-4'>
                                    <h4>Country:</h4>
                                    <select className='ps-2 pe-5 py-1' name="" id="">
                                        <option value="">India</option>
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
                    <div style={{ height: "10px" }}></div>
                </div>
            </section>
        </>
    );
};

export default Profile;