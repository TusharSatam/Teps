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
import { OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import VerifyModal from '../ForgotPassModal/VerifyModal';

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
  const [show, setShow] = React.useState(false)
  const [success, setSuccess] = React.useState(false)



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

  // edit Email handler
  const [editEmail, setEditEmail] = useState(false)
  const handleEmailEdit = () => {
    if (editEmail === false) {
      setEditEmail(true);
    }
    else setEditEmail(false);
  }

  // edit all handler
  const [editAll, setEditAll] = useState(false)
  const handleAllEdit = () => {
    if (editAll === false) {
      setEditAll(true);
    }
    else setEditAll(false);
  }

  // pincode handler
  const [cityFound, setCityFound] = React.useState(true)
  const [liveDetails, setLiveDetails] = React.useState()
  const handlePincode = (e) => {
    if (e.target.value === '') {
      setCityFound(false)
    }
    axios.get(`https://api.postalpincode.in/pincode/${e.target.value}`)
      .then(res => {
        if (res?.data[0].Message !== "No records found") {
          setLiveDetails(res?.data[0]?.PostOffice[0]);
          setCityFound(true)
          console.log(res?.data[0]?.PostOffice[0]?.Country);
        }
        else {
          setCityFound(false)
        }
      })
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
  // gamil handler
  const [getEmail, setGetEmail] = useState()
  const handleEmail = (e) => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (e.target.value.match(pattern)) {
      setEmailErr('');
      setGetEmail(e.target.value)
    }
    else {
      setIsLoading(false);
    }
  }
  const token = JSON.stringify(localStorage.getItem('jwt'));
  const doneEmail = () => {
    const data = {
      "to": getEmail,
      'subject': "Please Verified Your Account -TEPS",
      "html": `
      <p>Hello and welcome to Things Education’s Pedagogical Strategies</p>
      <p>Please click this link to verify your email address before you get started. Once verified, you will be able to log in to the site.</p>
      <p>https://phase1-teps.netlify.app/emailverify?ajhsdfjahb=${getEmail}&sdfbkjfewihuf=${user?._id}&pfgvsckvnlksfwe=${token}</p><br/>
      <p>Regards,</p>
      <p>Things Education</p>
      `
    }
    axios.post('email', data)
      .then(res => {
        if (res) {
          setShow(true);
          setEditEmail(false);
        }
      })
      .catch(err => console.log(err))
  }
  const [selectedCountry, setSelectedCountry] = React.useState({
    city: user?.city,
    state: user?.state
  });
  const handleCountry = (e) => {
    if (e.target.value !== "India") {
      setSelectedCountry(
        {
          city: "International",
          state: "International"
        }
      )
    }
    else {
      setSelectedCountry(user?.city)
    }
  }
  // update all data
  const handleUpdate = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append('organization', e.target.organization.value);
    formData.append('designation', e.target.designation.value);
    formData.append('city', liveDetails ? liveDetails?.Block : user.city);
    formData.append('state', liveDetails ? liveDetails?.State : user.state);
    formData.append('pincode', e.target.pincode.value);
    formData.append('country', e.target.country.value);
    updateUser(user._id, formData)
      .then(res => {
        getSingleUser(user._id)
          .then(res => {
            const data = {
              "to": getEmail,
              'subject': "Profile details - TEPS",
              "html": `
                  <p>Hello,</p>
                  <p>Your profile details have been successfully updated!</p><br />
                  <p>Regards,</p>
                  <p>Things Education</p>
                  `
            }
            axios.post('email', data)
              .then(ress => {
                if (ress) {
                  window.localStorage.setItem('data', JSON.stringify(res.data[0]));
                  setUser(res.data[0]);
                  toast.success(`${t('update_profile_messege')}`)
                  setIsLoading(false);
                  setEditAll(false);
                  console.log("habdaud");
                }
              })
              .catch(err => console.log(err))

          })
      })
      .catch(err => {
        toast.error('Something is wrong please try again!')
        setIsLoading(false);
      })

  }
  return (
    <>
      <VerifyModal
        show={show}
        setShow={setShow}
        noti1={'Your email has been changed!'}
        noti2={"Note: Please log in with your new email ID after verification."}
      />
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
        <div className='d-block d-md-none text-start mx-3 mt-3 bg-light'>
          <div className='d-flex align-items-start prfile_pic' style={{ height: '120px' }}>
            <div className="button-wrapperr">
              {
                profileImage?.image ? <img className='label' style={{ width: "40px", borderRadius: '1000px' }} src={`data:${profileImage?.image?.contentType};base64,${Buffer.from(profileImage?.image?.data?.data).toString('base64')}`} alt="" /> :
                  user?.image ? <img className='label' style={{ width: "40px", borderRadius: '1000px' }} src={`data:${user?.image?.contentType};base64,${Buffer.from(user?.image?.data?.data).toString('base64')}`} alt="" /> :
                    <img width={'40px'} className='label' src={defaultProfile} alt="" />
              }
              <input id="upload" onChange={handleProfile} className='upload-box' type="file" accept='image/png, image/gif, image/jpeg' name="" />
            </div>
            <div>
              <div className='profile_school mt-4'>
                <p className='res_userName' >{user?.firstName} {user?.lastName}</p>
                <p className='res_userName' style={{ marginTop: "-12px" }}>{user?.organization}</p>
              </div>
              <div style={{ marginTop: "-5px" }}>
                <button onClick={handleForgotShow} className='change_btn'>{t('Change Password')}</button>
              </div>
            </div>
          </div>
        </div>
        <div className='d-block d-md-none mx-3 mt-md-4'>
          <hr style={{ border: "1px solid #CED4DA", marginTop: "5px", marginBottom: '0px', marginLeft: "15px", marginRight: "15px" }} />
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
            <form className='p-1 p-md-5 mx-3 mx-md-0' onSubmit={handleUpdate}>
              <div className='w-100'>
                <div className='d-flex justify-content-between align-items-center mt-0 my-md-3'>
                  <div>
                    <h4 className='input_label'>{t('Email')}:</h4>
                  </div>
                  <div className='mt-3'>
                    <input onChange={handleEmail} disabled={!editEmail} className={emailErr ? 'border-danger text-danger profile_input mt-md-2' : editEmail ? 'profile_input  mt-md-2' : 'border-0 profile_input mt-md-2'} type="text" defaultValue={user.email} name="email" id="" />
                    <div className=' d-flex'>
                      <div onClick={handleEmailEdit} className={editEmail ? "d-none Email_Edit ms-md-2" : "d-block Email_Edit ms-md-2"}>{t('Edit')}</div>
                      <div onClick={doneEmail} className={!editEmail ? "d-none Email_Edit" : "d-block Email_Edit"}>{t('Save Email')}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='d-flex justify-content-between align-items-center input_div'>
                    <h4 className='input_label'>{t('School/Organization')}:</h4>
                    <div>
                      <input disabled={!editAll} className={!editAll ? "border-0 profile_input " : "profile_input"} type="text" defaultValue={user?.organization} name="organization" id="" />
                    </div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center input_div'>
                    <h4 className='input_label'>{t('Designation')}:</h4>
                    <div>
                      <input disabled={!editAll} className={!editAll ? "border-0 profile_input  " : "profile_input "} type="text" defaultValue={user.designation} name="designation" id="" />
                    </div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center input_div'>
                    <h4 className='input_label'>{t('Pincode')}:</h4>
                    {
                      <div>
                        <input disabled={!editAll} className={!editAll ? "border-0 profile_input" : !cityFound && selectedCountry.city !== "International" ? "border-danger profile_input" : "profile_input"} title={cityFound ? '' : "No city/town found"} onChange={handlePincode} defaultValue={user?.pincode} type="text" name="pincode" id="" />
                      </div>
                    }
                  </div>
                  <div className='d-flex justify-content-between align-items-center input_div'>
                    <h4 className='input_label'>{t('City/Town')}:</h4>
                    {
                      selectedCountry?.city === "International" ?
                        <div>
                          < input disabled={!editAll} className={!editAll ? "border-0 profile_input" : "profile_input"} type="text" defaultValue={selectedCountry} name="city" id="" />
                        </div> : <div>
                          <input disabled={!editAll} className={!editAll ? "border-0 profile_input" : "profile_input"} type="text" value={liveDetails ? liveDetails?.Block : user.city} name="city" id="" />
                        </div>
                    }
                  </div>
                  <div className='d-flex justify-content-between align-items-center input_div'>
                    <h4 className='input_label'>{t('state')}:</h4>
                    <div>
                      {selectedCountry?.city === "International" ?
                        <input disabled={!editAll} className={!editAll ? "border-0 profile_input" : "profile_input"} type="text" defaultValue={selectedCountry?.state} name="state" id="" />
                        :
                        <input disabled={!editAll} className={!editAll ? "border-0 profile_input" : "profile_input"} type="text" value={liveDetails ? liveDetails?.State : user?.state} name="state" id="" />
                      }
                    </div>
                  </div>
                  <div className='d-flex justify-content-between align-items-center input_div'>
                    <h4 className=' input_label'>{t('country')}:</h4>
                    <div className='select_div'>
                      {
                        liveDetails ?
                          <select value={liveDetails?.country} onChange={handleCountry} disabled={!editAll} className='profile_input ' name="country" id="">
                            <option className='' >{user.country ? user.country : 'Country'}</option>
                            {
                              country?.map((item, index) => (
                                <option className='' >{item?.name}</option>
                              ))
                            }
                          </select> :
                          <select onChange={handleCountry} disabled={!editAll} className='profile_input ' name="country" id="">
                            <option className='' >{user.country ? user.country : 'Country'}</option>
                            {
                              country?.map((item, index) => (
                                <option className='' >{item?.name}</option>
                              ))
                            }
                          </select>
                      }

                    </div>
                  </div>
                </div>
                <div className='d-flex justify-content-center button_div'>
                  <div className='edit_al me-4' onClick={handleAllEdit}>{t('Edit')} </div>
                  <button disabled={isLoading || !editAll} type='submit' className='save_change_btn'>
                    {
                      isLoading ? <Spinner className="text-success " animation="border" /> : t('save_changes')
                    }
                  </button>
                </div>
                <div className='d-block d-md-none'>
                  <div className='d-flex justify-content-center mt-3'>
                    <div>
                      <button className="profileBtn me-3" >{t('favourites')}</button>
                    </div>
                    <div>
                      <button className='profileBtn'>
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