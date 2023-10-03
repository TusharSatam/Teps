import React, { useState } from 'react';
import { Buffer } from 'buffer';
import { updateInfo } from '../../services/auth';
import { getEdits } from '../../services/userEdited';
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
import { Link } from 'react-router-dom';
import {getLikes } from "../../services/userLikes";
import { getSaves } from '../../services/userSaves';
import { getUserCreated } from '../../services/userCreated';
import ProfileDataC from "../../Pages/ProfileDataC";
import ProfileDataE from "../../Pages/ProfileDataE";
import ProfileDataS from "../../Pages/ProfileDataS";
import ProfileDataF from "../../Pages/ProfileDataF";
const Profile = () => {
 
  const { t } = useTranslation();
  const { user, setUser } = useAuth();
  const [forgot, setForgot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState([]);
  const [isMyStrategies, setIsMyStrategies] = useState(false);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [citys, setCitys] = React.useState('');
  const [dropdownVisible, setDropdownVisible] = useState(true);
  const [emailErr, setEmailErr] = React.useState('');
  const [show, setShow] = React.useState(false)
  const [preview, setPreview] = React.useState(null)
  const [f, setF] = React.useState(0);
  const [l, setL] = React.useState(0);
  const [e, setE] = React.useState(0);
    const [c, setC] = React.useState(0);
    
const [pincode, setPincode] = useState(user?.pincode);
  React.useEffect(() => {
    getSaves()
    .then(res => {
      const saves = res?.data?.filter(ress => ress.user_id === user._id)
     setF(saves.length); 
    })
  }, []);
   React.useEffect(() => {
    getUserCreated(user._id)
    .then(res => {
      
     setC(res.data.length); 
    })
  }, []);
  React.useEffect(() => {
    getEdits(user._id)
    
    .then(res => {
      
      
     setE(res.data.length); 
    })
  }, []);

  React.useEffect(() => {
    getLikes().then((res) => {
      const like = res?.data?.filter((ress) => ress.user_id === user._id);
     setL(like.length);
    })})
  const handleForgotShow = () => {
    setForgot(true);
  }
  const handleProfile = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]))
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
  // const prof=()=>{setIsMyStrategies(true);}
  const toggleButton = () => {
    setDropdownVisible(!dropdownVisible);
    setIsMyStrategies(false);
  };
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
    setIsMyStrategies(true)
    if (editAll === false) {
      setEditAll(true);
    }
    else setEditAll(false);
  }

  // pincode handler
  const [cityFound, setCityFound] = React.useState(true)
  const [liveDetails, setLiveDetails] = React.useState()
  
const handlePincode = (e) => {
  const inputValue = e.target.value;
  const onlyDigits = /^\d+$/;

  if (onlyDigits.test(inputValue) || inputValue === '') {
    setPincode(inputValue);

    if (inputValue !== '') {
      axios.get(`https://api.postalpincode.in/pincode/${inputValue}`)
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
    const data = {
      "to": getEmail,
      'subject': "Email verification - TEPS",
      "html": `
      <p>Hello and welcome to Things Education’s Pedagogical Strategies</p>
      <p>Please click this link to verify your email address before you get started. Once verified, you will be able to log in to the site.</p>
      <p>https://teps.school/emailverify?ajhsdfjahb=${getEmail}&sdfbkjfewihuf=${user?._id}&pfgvsckvnlksfwe=${token}</p><br/>
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
    if (e.target.value !== " ") {
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
    const formData= {
      organization: e.target.organization.value,
      designation: e.target.designation.value,
      city: liveDetails ? liveDetails.Block : user.city,
      state: liveDetails ? liveDetails.State : user.state,
      pincode: e.target.pincode.value,
      country: e.target.country.value,
    };
    
    updateUser(user._id, formData)
      .then(res => {
           getSingleUser(user._id)
          .then(res => {
            let f=user.email;
            const data = {
              "to": f,
              'subject': "Profile details - TEPS",
              "html": `
                  <p>Hello,</p>
                  <p>Your profile details have been successfully updated!</p><br />
                  <p>Regards,</p>
                  <p>Things Education</p>
                  `
            }
            
            axios.post('email', data)
              .then(res => {
               
                if (res) {
                  getSingleUser(user._id).then(res => {
                   
                    window.localStorage.setItem('data', JSON.stringify(res.data[0]));
                    setUser(res.data[0])
                 toast.success(`${t('update_profile_messege')}`)
                  setIsLoading(false);
                  setEditAll(false);})
                }
              })
              .catch(err => console.log(err))

          })
      })
      .catch(err => {
        toast.error('Something is wrong please try again!',err  )
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
            <div className="button-wrapper">
              {
                preview ? <img src={preview} alt="" /> :
                  profileImage?.image ? <img className='label' style={{ width: "40px", borderRadius: '1000px' }} src={`data:${profileImage?.image?.contentType};base64,${Buffer.from(profileImage?.image?.data?.data).toString('base64')}`} alt="" /> :
                    user?.image ? <img className='label' style={{ width: "40px", borderRadius: '1000px'}} src={`data:${user?.image?.contentType};base64,${Buffer.from(user?.image?.data?.data).toString('base64')}`} alt="" /> :
                      <img width={'40px'} className='label' src={defaultProfile} alt="" />
              }
              <input id="upload" onChange={handleProfile} className='upload-box' type="file" accept='image/png, image/gif, image/jpeg' name="" />
            </div>
            <div >
              <div className='profile_school mt-6'>
                <p className='res_userName' >{user?.firstName} {user?.lastName}</p>
                <p className='res_userName' style={{ marginTop: "-12px" }}>{user?.organization}</p>
              </div>
              <div style={{display:"grid" ,gap:"14px",marginTop: "-20px" }}>
             
                <button
        style={{ padding: '1%', marginTop:"10px" }}
        className={`change_btn`}
        onClick={toggleButton}
      >
          {t('View My Strategies')}
          <span className={`arrow ${dropdownVisible ? 'up' : 'down'}`}></span>
      </button>
          
                </div>
                {/* <button className='btn btn-primary'>{t('My Strategies')}</button> */}
             </div>  
          </div>
        </div>
        
        <div className='d-block d-md-none mx-3 mt-md-4'>
          <hr style={{ border: "1px solid #CED4DA", marginTop: "5px", marginBottom: '0px', marginLeft: "15px", marginRight: "15px" }} />
        </div>
        <div className='container p-md-5 d-md-flex ' >
          <div style={{border:"1px solid black", backgroundColor:"white", boxShadow:"1px 2px 1px 1px black"}} className='px-4 side_profile d-none d-md-flex justify-content-center align-items-center text-center '>
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
              <div className='py-4' style={{ position: "relative", padding: "4px" }}>
                <div style={{ display:"flex", placeContent:"center"}}
                className='justify-content-center py-5'>
                  
                 <button
          style={{ padding: '2%' }}
          className={`btn btn-primary change_btn`}
          onClick={toggleButton}
        >
          View My Strategies
           <span className={`arrow ${dropdownVisible ? 'up' : 'down'}`}></span>
        </button>
                  </div>
                
                {dropdownVisible && (
          <div className='d-block'>
            <div>
              <Link to="/favouriteStratigy">
                <button className="authBtn_p me-3" >Favourites ({l})</button>
              </Link>
            </div>
            <div>
              <Link to="/saveStratigy">
                <button className='authBtn_p mt-2 me-3'>Saved ({f})</button>
              </Link>
            </div>
          

      
            <div>
              <Link to="/editedStratigy">
                <button className="authBtn_p mt-2 me-3" >Edited ({e})</button>
              </Link>
            </div>
            <div>
              <Link to="/createdStratigy">
                <button className="authBtn_p mt-2 me-3" >Created ({c})</button>
              </Link>
            </div>
       </div>
        )}
                <div className='d-flex justify-content-center py-4'>
                  <Link to="/addForm"><button className='upload_Str_btn my-3'>Upload Strategy</button></Link>
               
                </div>
                <button onClick={handleAllEdit} className='change_btn mb-3'>{t('Edit Information')}</button>
                    <button onClick={handleForgotShow} className='change_btn'>{t('Change Password')}</button> 
              </div>
            </div>
          </div>
       
       {isMyStrategies?
          <div style={{border:"1px solid black", backgroundColor:"white", boxShadow:"1px 2px 2px 2px black"}} className='ms-md-5 mt-0 mb-1 p-1 p-md-2 mx-2 mx-md-0'>
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
      <div>
        <input
          disabled={!editAll}
          className={!editAll ? "border-0 profile_input" : !cityFound && selectedCountry.city !== "International" ? "border-danger profile_input" : "profile_input"}
          title={cityFound ? '' : "No city/town found"}
          onChange={handlePincode}
          value={pincode}
          type="text"
          name="pincode"
          id=""
        />
      </div>
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
                  {/* <div className='edit_al me-4' onClick={handleAllEdit}>{t('Edit')} </div> */}
                  <button disabled={isLoading || !editAll} type='submit' className='save_change_btn'>
                    {
                      isLoading ? <Spinner className="text-success " animation="border" /> : t('Save Changes')
                    }
                  </button>
                </div>
                <div className='d-block d-md-none'>
                  <div className='d-flex justify-content-center mt-3'>
                    <div>
                      <Link to="/favouriteStratigy"><button className="profileBtn me-3" >{t('Favourites')}</button></Link>
                    </div>
                    <div>
                      <Link to="/saveStratigy">
                        <button className='profileBtn'>
                          {t('Saved')}
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className='d-flex justify-content-center'>
                <div>
                    <Link to="/editedStratigy"><button className="authBtn_p mt-2 me-3" >{t('Edited')}{" "}({e})</button></Link>
                  </div>
                  <div>
                    <Link to="/createdStratigy"><button className="authBtn_p mt-2" >{t('Created')}{" "}({c})</button></Link>
                  </div>
                  </div>
                  <div className='d-flex justify-content-center' style={{ paddingTop: "35px" }}>
                    <Link to="/addForm"><button className='upload_Str_btn'>Upload Strategy</button></Link>
                    
                  </div>
                  <button onClick={handleForgotShow} className='change_btn'>{t('Change Password')}</button>
                </div>
              </div>
            </form>
          </div>
:
  <div style={{border:"1px solid black", backgroundColor:"white", borderRadius:"10px"}} className='ms-md-5 mt-0 mb-1 p-1 p-md-2 mx-2 mx-md-0'>
<div>
<ProfileDataS/>
</div>
<div>
<ProfileDataF/>
</div>
<div>
<ProfileDataE/>
</div>
<div>
<ProfileDataC/>
</div>

  </div>


}

          <div style={{ height: "10px" }}></div>
        </div>
      </section>
    </>
  );
};

export default Profile;