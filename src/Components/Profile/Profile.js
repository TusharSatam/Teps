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
        }
        else {
          setCityFound(false)
        }
      })
  }

  // update all data
  const handleUpdate = (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (cityFound) {
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
              (emailjs.send('service_3dqr8xq', 'template_thnjhcj', {
                "reply_to": user?.email,
                "submit_text": "Your Data Updated successfully"
              }, 'Iu315MdRwOR7T8GsW')
                .then((result) => {
                  window.localStorage.setItem('data', JSON.stringify(res.data[0]));
                  setUser(res.data[0]);
                  toast.success(`${t('update_profile_messege')}`)
                  setIsLoading(false);
                  setEditAll(false);
                }, (error) => {
                  console.log(error.text);
                }))

            })
        })
        .catch(err => {
          toast.error('Something is wrong please try again!')
          setIsLoading(false);
        })
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
    (emailjs.send('service_3dqr8xq', 'template_a9b4hsz', {
      "reply_to": getEmail,
      "verify_link": `https://ornate-malabi-fd3b4c.netlify.app/emailverify?ajhsdfjahb=${getEmail}&sdfbkjfewihuf=${user?._id}&pfgvsckvnlksfwe=${token}`,
      "from": "things@ecu.org"
    }, 'Iu315MdRwOR7T8GsW')
      .then((result) => {
        setShow(true);
        setEditEmail(false);
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      }))
    console.log(getEmail);
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      City/Town Not Found
    </Tooltip>
  );
  return (
    <>
      <VerifyModal
        show={show}
        setShow={setShow}
        noti1={'You’re Email has been Changed!'}
        noti2={" Please note that once you change your email your account will be signed out and you have sign in once again with your new email id for further use."}
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
        <div className='d-block d-md-none text-start mx-3 mt-5 bg-light'>
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
                <div className='d-flex justify-content-between align-items-center mt-0 mt-md-3'>
                  <h4 className='input_label'>{t('Email')}:</h4>
                  <div className='mt-md-2'>
                    <input onChange={handleEmail} disabled={!editEmail} className={emailErr ? 'border-danger text-danger profile_input me-3 me-md-0 mt-2' : 'profile_input me-3 me-md-0 mt-2'} type="text" defaultValue={user.email} name="email" id="" />
                  </div>
                </div>
                <div className=' d-flex mb-2'>
                  <div onClick={handleEmailEdit} className='Email_Edit me-3'>Edit</div>
                  <div onClick={doneEmail} className='Email_Edit me-3'>Save Email</div>
                </div>
                <div className='text-danger' style={{ textAlign: 'center', fontSize: "15px" }}>{emailErr ? emailErr : ''}</div>
                <div className='d-flex'>
                  <div>
                    <div className='d-flex justify-content-between align-items-center mt-0 mt-md-4'>
                      <h4 className='mt-md-3 pe-5 input_label'>{t('School/Organization')}:</h4>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mt-0 mt-md-3'>
                      <h4 className='mt-md-3 input_label'>{t('Designation')}:</h4>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mt-0 mt-md-3'>
                      <h4 className='mt-md-3 input_label'>{t('Pincode')}:</h4>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mt-0 mt-md-3'>
                      <h4 className='mt-md-3 input_label'>{t('City/Town')}:</h4>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mt-0 mt-md-3'>
                      <h4 className='mt-md-3 input_label'>{t('state')}:</h4>
                    </div>
                    <div className='d-flex justify-content-between align-items-center mt-0 mt-md-3'>
                      <h4 className='mt-md-3 input_label'>{t('country')}:</h4>
                    </div>
                  </div>
                  <div>
                    <div className='mt-md-3'>
                      <input disabled={!editAll} className={!editAll ? "border-0 profile_input mt-md-4 mt-1" : "profile_input mt-md-4 mt-1"} type="text" defaultValue={user?.organization} name="organization" id="" />
                    </div>
                    <div className='mt-md-3'>
                      <input disabled={!editAll} className={!editAll ? "border-0 profile_input  " : "profile_input "} type="text" defaultValue={user.designation} name="designation" id="" />
                    </div>
                    {
                      !cityFound ?
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <div className='mt-md-3'>
                            <input disabled={!editAll} className={!editAll ? "border-0 profile_input" : cityFound ? "profile_input" : "border-danger text-danger profile_input"} onChange={handlePincode} type="text" defaultValue={user.pincode} name="pincode" id="" />
                          </div>
                        </OverlayTrigger> :
                        <div className='mt-md-3'>
                          <input disabled={!editAll} className={!editAll ? "border-0 profile_input" : cityFound ? "profile_input" : "border-danger text-danger profile_input"} onChange={handlePincode} type="text" defaultValue={user.pincode} name="pincode" id="" />
                        </div>
                    }
                    <div className='mt-md-3'>
                      {
                        user?.city === "International" ?
                          < input disabled={!editAll} className={!editAll ? "border-0 profile_input" : "profile_input"} type="text" defaultValue={user.city} name="city" id="" /> :
                          <p className='static_data mt-2'>{liveDetails ? liveDetails?.Block : user.city}</p>
                      }
                    </div>
                    <div className='mt-md-3'>
                      {user.city === "International" ?
                        <input disabled={!editAll} className={!editAll ? "border-0 profile_input" : "profile_input"} type="text" defaultValue={user?.state} name="state" id="" />
                        : <p className='static_data mt-md-5 mt-4'>{liveDetails ? liveDetails?.State : user.state}</p>
                      }
                    </div>
                    <select disabled={!editAll} className='ps-2 pe-5 py-1 mt-md-4 mt-2 profile_input ' name="country" id="">
                      <option className='' >{user.country ? user.country : 'Country'}</option>
                      {
                        country?.map((item, index) => (
                          <option className='' >{item?.name}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                <div className='d-flex justify-content-center mt-4 mt-md-5 py-md-2 '>
                  <div className='edit_al me-4' onClick={handleAllEdit}>Edit </div>
                  <button disabled={isLoading || !editAll} type='submit' className='save_change_btn'>
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