import React, { useState } from 'react';
import { Buffer } from 'buffer';
import { updateInfo } from '../../services/auth';
import { getSingleUser, updateUser } from '../../services/dashboardUsers';
import defaultProfile from '../../asstes/defaultProfile.png'
import { useAuth } from '../../Context/AuthContext';
import ChangePass from '../ForgotPassModal/ChangePass';
import HeroSection from '../Home/HeroSection';
import toast, { Toaster } from 'react-hot-toast';
import './profile.css'
import { useTranslation } from 'react-i18next';
import { Spinner } from 'react-bootstrap';

const Profile = () => {
  const { t } = useTranslation();
  const { user, setUser } = useAuth();
  const [forgot, setForgot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState([]);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [citys, setCitys] = React.useState('');
  const [emailErr, setEmailErr] = React.useState('');
  const handleForgotShow = () => {
    setForgot(true);
  }
  const handleProfile = (e) => {
    let formData = new FormData();
    formData.append('img', e.target.files[0]);
    updateInfo(user._id, formData)
      .then(res => {
        getSingleUser(user._id)
          .then(res => {
            window.localStorage.setItem('data', JSON.stringify(res.data[0]));
            setUser(res.data[0])
          })
      })
  }
  React.useEffect(() => {
    const url = "./countrys.json"
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const res = await response.json();
        setCountry(res.countrys);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [])

  React.useEffect(() => {
    const url = "./state.json"
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const res = await response.json();
        setState(res.states);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [])
  const handleUpdate = (e) => {
    setIsLoading(true);
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    e.preventDefault();
    if (e.target.email.value.match(pattern)) {
      setEmailErr('');
      const formData = new FormData();
      formData.append('organization', e.target.organization.value);
      formData.append('email', e.target.email.value);
      formData.append('designation', e.target.designation.value);
      formData.append('city', e.target.city.value);
      formData.append('state', e.target.state.value);
      formData.append('pincode', e.target.pincode.value);
      formData.append('country', e.target.country.value);
      updateUser(user._id, formData)
        .then(res => {
          getSingleUser(user._id)
            .then(res => {
              window.localStorage.setItem('data', JSON.stringify(res.data[0]));
              setUser(res.data[0]);
              toast.success(`${t('update_profile_messege')}`)
              setIsLoading(false);
            })
        })
        .catch(err => {
          toast.error('Something is wrong please try again!')
          setIsLoading(false);
        })
    }
    else {
      setIsLoading(false);
      setEmailErr(t('Email_Error'));
    }

  }
  React.useEffect(() => {
    const url = "./citys.json"
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const res = await response.json();
        setCitys(res.cities);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [])

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <ChangePass
        show={forgot}
        setShow={setForgot}
      />
      <HeroSection />
      <section className='profile_container pb-5'>
        <div style={{ height: "10px" }}></div>
        <div className='d-block d-md-none text-start mx-3 mt-5 bg-light'>
          <div className='d-flex align-items-start prfile_pic' style={{ height: '92px' }}>
            <div className="button-wrapperr">
              {
                profileImage?.image ? <img className='label' style={{ width: "34px", borderRadius: '1000px' }} src={`data:${profileImage?.image?.contentType};base64,${Buffer.from(profileImage?.image?.data?.data).toString('base64')}`} alt="" /> :
                  user?.image ? <img className='label' style={{ width: "34px", borderRadius: '1000px' }} src={`data:${user?.image?.contentType};base64,${Buffer.from(user?.image?.data?.data).toString('base64')}`} alt="" /> :
                    <img width={'34px'} className='label' src={defaultProfile} alt="" />
              }
              <input id="upload" className='upload-box' type="file" accept='image/png, image/gif, image/jpeg' name="" />
            </div>
            <div>
              <div className='profile_school mt-4'>
                <p style={{ fontSize: "8px", fontWeight: "400", lineHeight: "9px" }} >{user?.firstName} {user?.lastName}</p>
                <p style={{ fontSize: "8px", marginTop: "-14px", fontWeight: "400", lineHeight: "9px" }} >{user?.organization}</p>
                {/* <p style={{ fontSize: "8px", marginTop: "-14px", fontWeight: "400", lineHeight: "9px" }} >Teacher At Abc school</p> */}
              </div>
              <div style={{ marginTop: "-25px" }}>
                <button onClick={handleForgotShow} className='change_btn'>{t('Change Password')}</button>
              </div>
            </div>
          </div>
        </div>
        <div className='d-block d-md-none mx-3 mt-4'>
          <hr style={{ border: "1px solid #CED4DA" }} />
        </div>
        <div className='container p-md-5 d-md-flex ' >
          <div className='px-4 side_profile d-none d-md-flex justify-content-center align-items-center text-center '>
            <div className='pb-4'>
              <div className="button-wrapper">
                {
                  profileImage?.image ? <img className='label' style={{ width: "120px", borderRadius: '1000px' }} src={`data:${profileImage?.image?.contentType};base64,${Buffer.from(profileImage?.image?.data?.data).toString('base64')}`} alt="" /> :
                    user?.image ? <img className='label' style={{ width: "120px", borderRadius: '1000px' }} src={`data:${user?.image?.contentType};base64,${Buffer.from(user?.image?.data?.data).toString('base64')}`} alt="" /> :
                      <img className='label' width={'120px'} src={defaultProfile} alt="" />
                }

                <input accept='image/png, image/gif, image/jpeg' onChange={handleProfile} id="upload" className='upload-box' type="file" name="" />
              </div>
              <div className='profile_school mt-5'>
                <p>{user.firstName} {user.lastName} </p> <p> {user.organization}</p>
              </div>
              <div style={{ marginTop: "110px" }}>
                <div className='d-flex justify-content-center py-5'>
                  <button onClick={handleForgotShow} className='submit_btn'>{t('Change Password')}</button>
                </div>
                <div className='d-flex'>
                  <div>
                    <button className="authBtn me-3" >{t('favourites')}</button>
                  </div>
                  <div>
                    <button className='authBtn'>{t('saved')}</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='ms-md-5 form_container mt-0 mb-5'>
            <form className='p-1 p-md-5' onSubmit={handleUpdate}>
              <div className='w-100'>
                <div className='d-flex justify-content-between align-items-center mt-0 mt-md-4'>
                  <h4 className='pe-5 input_label'>{t('School/Organization')}:</h4>
                  <div className='mt-md-2'>
                    <input className='profile_input w-100' type="text" defaultValue={user?.organization} name="organization" id="" />
                  </div>
                  {/* <p className='mt-1'>abc school</p> */}
                </div>
                <div className='d-flex justify-content-between align-items-center mt-0 mt-md-3'>
                  <h4 className='input_label'>{t('Email')}:</h4>
                  <div className='mt-md-2'>
                    <input className={emailErr ? 'border-danger text-danger profile_input' : 'profile_input'} type="text" defaultValue={user.email} name="email" id="" />
                  </div>
                  {/* <p className='mt-1'>abc school</p> */}
                </div>
                <div className='text-danger' style={{ textAlign: 'center', fontSize: "15px" }}>{emailErr ? emailErr : ''}</div>
                <div className='d-flex justify-content-between align-items-center mt-0 mt-md-3'>
                  <h4 className='input_label'>{t('Designation')}:</h4>
                  {/* <p className='mt-1'>abc school</p> */}
                  <div className='mt-md-2'>
                    <input className='profile_input' type="text" defaultValue={user.designation} name="designation" id="" />
                  </div>
                </div>
                <div className='d-flex justify-content-between align-items-center mt-0 mt-md-3'>
                  <h4 className='input_label'>{t('City/Town')}:</h4>
                  {/* <p className='mt-1'>abc school</p> */}
                  <div className='mt-md-2'>
                    {
                      user?.city === "International" ?
                        < input className='profile_input' type="text" defaultValue={user.city} name="city" id="" /> :
                        <select className='ps-1 pe-4 py-1 city-profile' name="city" id="">
                          <option className='' >{user.city}</option>
                          {
                            citys && citys?.map((data, index) => (
                              <option key={index} >{data.City}</option>
                            ))
                          }
                        </select>
                    }
                  </div>
                </div>
                <div className='d-flex justify-content-between align-items-center mt-0 mt-md-3'>
                  <h4 className='input_label'>{t('state')}:</h4>
                  {user.city === "International" ?
                    <div className='mt-md-2'>
                      <input className='profile_input' type="text" defaultValue={user?.state} name="state" id="" />
                    </div> : <select className='ps-1 pe-4 py-1 state_input' defaultValue={user?.state} name="state" id="">
                      <option className='' >{user.state ? user.state : 'State'}</option>
                      {
                        state?.map((data, index) => (
                          <option key={index} >{data.name}</option>
                        ))
                      }
                    </select>
                  }

                </div>
                <div className='d-flex justify-content-between align-items-center mt-0 mt-md-3'>
                  <h4 className='input_label'>{t('Pincode')}:</h4>
                  {/* <p className='mt-1'>abc school</p> */}
                  <div className='mt-md-2'>
                    <input className='profile_input' type="text" defaultValue={user.pincode} name="pincode" id="" />
                  </div>
                </div>
                <div className='d-flex justify-content-between align-items-center mt-0 mt-md-3'>
                  <h4 className='input_label'>{t('country')}:</h4>
                  <select className='ps-2 pe-5 py-1 state_input' name="country" id="">
                    <option className='' >{user.country ? user.country : 'Country'}</option>
                    {
                      country?.map((item, index) => (
                        <option className='' >{item?.name}</option>
                      ))
                    }
                  </select>
                </div>
                <div className='d-flex justify-content-center mt-4 mt-md-5 py-md-2 '>
                  <button disabled={isLoading} type='submit' className='save_change_btn'>
                    {
                      isLoading ? <Spinner className="text-success " animation="border" /> : t('save_changes')
                    }
                  </button>
                </div>
                <div className='d-block d-md-none'>
                  <div className='d-flex justify-content-center mt-4'>
                    <div>
                      <button className="authBtn me-3" >{t('favourites')}</button>
                    </div>
                    <div>
                      <button className='authBtn'>
                        {t('saved')}
                      </button>
                    </div>
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