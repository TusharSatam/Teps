import { Buffer } from 'buffer';
import React, { useState } from 'react';
import { OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Filter from "../asstes/Filter.svg";
import UserImage from '../asstes/Group 51.svg';
import ChatIcon from '../asstes/icons/chat.svg';
import FilterHover from "../asstes/icons/filter_icon.svg";
import KnowledgeIcon from '../asstes/icons/knowledge.svg';
import Physical from '../asstes/icons/Motor-Physical.png';
import OfflineIcon from '../asstes/icons/offline.svg';
import OnlineIcon from '../asstes/icons/online.svg';
import SaveIcon from '../asstes/icons/Save.svg';
import SavedIcon from '../asstes/icons/Saved.svg';
import Social from '../asstes/icons/Socio-Emotional-Ethical.png';
import FilterStr from '../Components/Home/FilterStr';
import { useAuth } from '../Context/AuthContext';
import { getMultitHiStr } from '../services/hindiStratigys';
import { getMultitStr } from '../services/stratigyes';
import { delUserSaves, getSaves, postSaves } from '../services/userSaves';
import { getMultiUsertStr } from '../services/userStratigy';
import { getMultiUserHindiStr } from '../services/userStratigyHi';
import './styles/saveStratigy.css';
import FilterStrHi from '../Components/Home/FilterStrHI';

const SaveStratigy = () => {
  const { user, setUser, stratigyFilData } = useAuth()
  const [filetr, setFilter] = useState(false)
  const [saveStratigy, setSaveStratigy] = useState([])
  const [saveUserStratigy, setSaveUserStratigy] = useState([])
  const [saveStratigyHi, setSaveStratigyi] = useState([])
  const [saveStratigyHiUser, setSaveStratigyiUser] = useState([])
  const [languageSelect, setLanguageSelect] = React.useState("en")
  const [react, setReact] = React.useState(user ? user?.saveId : []);
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false)
  const language = localStorage.getItem("i18nextLng")
 
  React.useEffect(() => {
    if (language === "hi") {
      setLanguageSelect("hi")
    }
    else {
      setLanguageSelect("en")
    }
  }, [language])

  const handleFilter = () => {
    if (filetr) {
      setFilter(false)
    }
    else {
      setFilter(true)
    }
  }
  const [save, setSave] = useState([]);

  React.useEffect(() => {
    setIsLoading(true)
    getSaves()
      .then(res => {
        const saves = res?.data?.filter(ress => ress.user_id === user._id)
        const savesId = saves?.map(ress => ress.strategie_id)
       
        setSave(saves?.map(ress => ress.strategie_id))
        if (languageSelect === "en") {
          getMultitStr(savesId)
            .then(res => {
              setSaveStratigy(res.data);
              setIsLoading(false)
            })
            .catch(err => {
              setIsLoading(false)
              setSaveStratigy([])
            })
          getMultiUsertStr(savesId)
            .then(res => {
              setSaveUserStratigy(res.data);
              setIsLoading(false)
            })
            .catch(err => {
              setSaveUserStratigy([])
              setIsLoading(false)
            })
        }
        else {
          getMultitHiStr(savesId)
            .then(res => {
              setSaveStratigyi(res.data)
              setIsLoading(false)
            })
          getMultiUserHindiStr(savesId)
            .then(res => {
              setSaveStratigyiUser(res.data)
              setIsLoading(false)
            })
        }
      })

  }, [languageSelect])

  const handleApiSaves = (id) => {
    const data = {
      strategie_id: id,
      user_id: user._id
    }
    postSaves(data)
      .then(res => {
        getSaves()
          .then(res => {
            const saves = res?.data?.filter(ress => ress.user_id === user._id)
            const savesId = saves?.map(ress => ress.strategie_id)
            setSave(saves?.map(ress => ress.strategie_id))
            if (languageSelect === "en") {
              getMultitStr(savesId)
                .then(res => {
                  setSaveStratigy(res.data);
                })
                .catch(err => setSaveStratigy([]))
              getMultiUsertStr(savesId)
                .then(res => {
                  setSaveUserStratigy(res.data);
                })
                .catch(err => setSaveUserStratigy([]))
            }
            else {
              getMultitHiStr(savesId)
                .then(res => {
                  setSaveStratigyi(res.data)
                })
              getMultiUserHindiStr(savesId)
                .then(res => {
                  setSaveStratigyiUser(res.data)
                })
            }
          })
      })
  }
  const handleApiUnSaves = (id) => {
    delUserSaves(id)
      .then(res => {
        getSaves()
          .then(res => {
            const saves = res?.data?.filter(ress => ress.user_id === user._id)
            const savesId = saves?.map(ress => ress.strategie_id)
            setSave(saves?.map(ress => ress.strategie_id))
            if (languageSelect === "en") {
              getMultitStr(savesId)
                .then(res => {
                  setSaveStratigy(res.data);
                })
                .catch(err => setSaveStratigy([]))
              getMultiUsertStr(savesId)
                .then(res => {
                  setSaveUserStratigy(res.data);
                })
                .catch(err => setSaveUserStratigy([]))
            }
            else {
              getMultitHiStr(savesId)
                .then(res => {
                  setSaveStratigyi(res.data)
                })
              getMultiUserHindiStr(savesId)
                .then(res => {
                  setSaveStratigyiUser(res.data)
                })
            }
          })
      })
  }
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {user.firstName}
    </Tooltip>
  );
  return (
    <div>
      {
        languageSelect === "en" ?
          <>
            <div className='saveStrParent' >
              <div className='row py-2 align-items-center' style={{ alignItems: "center", position: 'relative' }}>
                <div className='d-flex justify-content-center'>
                  <span className=' text-white text-center headText w-50'>{user.firstName} {user.lastName}{t("’s")} {t("Saved Strategies")}</span>
                </div>

                <div className='filter_btn_container d-flex justify-content-end' style={{ position: "absolute", top: "100" }}>
                  <div onClick={handleFilter} className='filter_bTn'>
                    <span className='me-1 me-md-0'>{t("Filter")}</span>
                    <img src={Filter} alt="" className='filtericon2' />
                    <img src={FilterHover} alt="" className='filtericon3' />
                  </div>
                </div>
              </div>
              <div className={filetr ? 'd-block' : 'd-none'}>
                <FilterStr
                  stratigy={saveStratigy}
                  language={languageSelect}
                />
              </div>
            </div>
            {isLoading ?
              <div style={{ marginLeft: "650px", marginTop: "150px", marginBottom: "150px" }}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div> :
              saveStratigy?.length === 0 && saveUserStratigy?.length === 0 ? <h1 className='my-5 text-center py-5 text-danger'>{t("No Saved Strategies available.")}</h1> :
                stratigyFilData?.length !== 0 ? <>{
                  stratigyFilData?.map((res, index) => (
                    <div key={index} className='container'>
                      <div style={{ background: "#FFFFFF" }} className='card_pad'>
                        <div className='my-4'>
                          <div className='d-flex justify-content-between my-4 '>
                            <Link to={`/single/${res._id}`} style={{ textDecoration: "none", color: 'black' }}>
                              <div className='me-1'>
                                <div>
                                  <div className='d-flex mb-3 str_text_left'>
                                    <p className='Strategy_count'>{t("strategy")}</p>
                                    <p className='counter_str'>{index + 1}</p>
                                  </div>
                                 
                                </div>
                                <div className='d-block d-md-none mt-1'>
                                
                                  <div className=' mt-1' style={{ marginLeft: "20px" }}>
                                   
                                  </div>
                                </div>
                              </div>
                            </Link>



                            <div className='col-9 ms-md-4 col-md-8 '>
                              <Link  style={{ textDecoration: "none", color: 'black' }}>
                                <p style={{color:"brown",fontSize:"13px",fontWeight:"500",margin:"30px 0px -30px"}}>Project-based Learning</p>
                                <p className='savestr_head'>Learning Outcome: {res["Learning Outcome"]}</p>
                                <p className='savestr_body'>
                                  {res["Teaching Strategy"].slice(0, 150) + '...'}
                                  <Link to={`/single/${res._id}`} style={{cursor:"pointer", color:"green",textDecoration: "none", fontWeight:"600"}}>Read More</Link>
                                 
                                </p>
                              </Link>
                              <div className='d-flex align-items-center my-3'>
                                {save?.includes(res._id) ? <img onClick={() => handleApiUnSaves(res._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SavedIcon} alt="" /> : <img onClick={() => handleApiSaves(res._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SaveIcon} alt="" />}
                              </div>
                            </div>

                            <div className='col-3 col-md-2 d-none d-md-block ms-5' style={{ marginTop: "40px" }}>
                              <div className='d-flex flex-column align-items-center justify-content-center'>
                                
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
                  {
                    saveUserStratigy?.map((data, index) => (
                      <div key={index} className='container'>
                        <div style={{ background: "#FFFFFF" }} className='card_pad'>
                          <div className='my-4'>
                            <div className='d-flex justify-content-between my-4 '>
                              <Link to={`/singleUserStratigy/${data._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                <div className='me-1'>
                                  <div>
                                    <div className='d-flex mb-md-3 str_text_left'>
                                      <p className='Strategy_count'>{t("strategy")}</p>
                                      <p className='counter_str'>{saveStratigy.length + index + 1}</p>
                                    </div>
                                    <div className='d-none d-md-block' style={{ marginTop: "-10px" }}>
                                      <p className='user_str'>Uploaded By - {
                                        user.image ?
                                          <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltip}
                                          >
                                            <img className='label user_image' src={`data:${user?.image?.contentType};base64,${Buffer.from(user?.image?.data?.data).toString('base64')}`} alt="" />
                                          </OverlayTrigger>
                                          :
                                          <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltip}
                                          >
                                            <img src={UserImage} className="user_image" alt="person pic" />
                                          </OverlayTrigger>
                                      } </p>
                                    </div>
                                   
                                  </div>
                                  <div className='d-block d-md-none mt-1'>
                                  
                                    <div className=' mt-1' style={{ marginLeft: "20px" }}>
                                      <div className='res_btn_icon'>
                                                                            </div>
                                    
                                    </div>
                                  </div>
                                </div>
                              </Link>
                              <div className='col-9 ms-md-4 col-md-8 '>
                                <Link style={{ textDecoration: "none", color: 'black' }}>
                                <p style={{color:"brown",fontSize:"13px",fontWeight:"500",margin:"30px 0px -30px"}}>Project-based Learning</p>
                                  <p className='savestr_head'>Learning Outcome: {data["Learning Outcome"]}</p>
                                  <p className='savestr_body'>
                                  {data["Teaching Strategy"].slice(0, 150) + '...'}
                            <Link  to={`/singleUserStratigy/${data._id}`} style={{cursor:"pointer", color:"green",textDecoration: "none", fontWeight:"600"}}>Read More</Link>
                                 
                                  </p>
                                </Link>
                                <div className='d-flex justify-content-between my-3'>
                                  <div>
                                    {save?.includes(data._id) ? <img onClick={() => handleApiUnSaves(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SavedIcon} alt="" /> : <img onClick={() => handleApiSaves(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SaveIcon} alt="" />}
                                  </div>
                                  <div className='d-block d-md-none'>
                                    <p className='user_str'>Uploaded By - {
                                      user.image ?
                                        <OverlayTrigger
                                          placement="right"
                                          delay={{ show: 250, hide: 400 }}
                                          overlay={renderTooltip}
                                        >
                                          <img className='label user_image' src={`data:${user?.image?.contentType};base64,${Buffer.from(user?.image?.data?.data).toString('base64')}`} alt="" />
                                        </OverlayTrigger>
                                        :
                                        <OverlayTrigger
                                          placement="right"
                                          delay={{ show: 250, hide: 400 }}
                                          overlay={renderTooltip}
                                        >
                                          <img src={UserImage} className="user_image" alt="person pic" />
                                        </OverlayTrigger>
                                    } </p>
                                  </div>
                                </div>
                              </div>
                              <div className='col-3 col-md-2 d-none d-md-block ms-5' style={{ marginTop: "40px" }}>
                                <div className='d-flex flex-column align-items-center justify-content-center'>
                                  
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </>
                  :
                  <>
                    {
                      saveStratigy?.map((data, index) => (
                        <div key={index} className='container'>
                          <div style={{ background: "#FFFFFF" }} className='card_pad'>
                            <div className='my-4'>
                              <div className='d-flex justify-content-between my-4 '>
                                <Link to={`/single/${data._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                  <div className='me-1'>
                                    <div>
                                      <div className='d-flex mb-3 str_text_left'>
                                        <p className='Strategy_count'>{t("strategy")}</p>
                                        <p className='counter_str'>{index + 1}</p>
                                      </div>
                                     
                                    </div>
                                    <div className='d-block d-md-none mt-1'>
                                    
                                      <div className=' mt-1' style={{ marginLeft: "20px" }}>
                                        <div className='res_btn_icon'>
                                         
                                        </div>
                                        
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                                <div className='col-9 ms-md-4 col-md-8 '>
                                  <Link style={{ textDecoration: "none", color: 'black' }}>
                                  <p style={{color:"brown",fontSize:"19px",fontWeight:"500",margin:"30px 0px -30px"}}>Inquiry-based Learning</p>
                                    <p className='savestr_head'>Learning Outcome: {data["Learning Outcome"]}</p>
                                    <p className='savestr_body'>
                                      {data["Teaching Strategy"].slice(0, 150) + '...'}
                                      <Link to={`/single/${data._id}`} style={{cursor:"pointer", color:"green",textDecoration: "none", fontWeight:"600"}}>Read More</Link>
                                    </p>
                                  </Link>
                                  <div className='d-flex align-items-center my-3'>
                                    {save?.includes(data._id) ? <img onClick={() => handleApiUnSaves(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SavedIcon} alt="" /> : <img onClick={() => handleApiSaves(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SaveIcon} alt="" />}
                                  </div>
                                </div>
                                <div className='col-3 col-md-2 d-none d-md-block ms-5' style={{ marginTop: "40px" }}>
                                  <div className='d-flex flex-column align-items-center justify-content-center'>
                                   
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                    {
                      saveUserStratigy?.map((data, index) => (
                        <div key={index} className='container'>
                          <div style={{ background: "#FFFFFF" }} className='card_pad'>
                            <div className='my-4'>
                              <div className='d-flex justify-content-between my-4 '>
                                <Link to={`/singleUserStratigy/${data._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                  <div className='me-1'>
                                    <div>
                                      <div className='d-flex mb-md-3 str_text_left'>
                                        <p className='Strategy_count'>{t("strategy")}</p>
                                        <p className='counter_str'>{saveStratigy.length + index + 1}</p>
                                      </div>
                                      <div className='d-none d-md-block' style={{ marginTop: "-10px" }}>
                                        <p className='user_str'>Uploaded By - {
                                          user.image ?
                                            <OverlayTrigger
                                              placement="right"
                                              delay={{ show: 250, hide: 400 }}
                                              overlay={renderTooltip}
                                            >
                                              <img className='label user_image' src={`data:${user?.image?.contentType};base64,${Buffer.from(user?.image?.data?.data).toString('base64')}`} alt="" />
                                            </OverlayTrigger>
                                            :
                                            <OverlayTrigger
                                              placement="right"
                                              delay={{ show: 250, hide: 400 }}
                                              overlay={renderTooltip}
                                            >
                                              <img src={UserImage} className="user_image" alt="person pic" />
                                            </OverlayTrigger>
                                        } </p>
                                      </div>
                                     
                                    </div>
                                    <div className='d-block d-md-none mt-1'>
                                      
                                      <div className=' mt-1' style={{ marginLeft: "20px" }}>
                                        <div className='res_btn_icon'>
                                         
                                        </div>
                                       
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                                <div className='col-9 ms-md-4 col-md-8 '>
                                  <Link  style={{ textDecoration: "none", color: 'black' }}>
                                  <p style={{color:"brown",fontSize:"19px",fontWeight:"500",margin:"30px 0px -30px"}}>Project-based Learning</p>
                                    <p className='savestr_head'>Learning Outcome: {data["Learning Outcome"]}</p>
                                    <p className='savestr_body'>
                                    {data["Teaching Strategy"].slice(0, 150) + '...'}
                                      <Link to={`/singleUserStratigy/${data._id}`} style={{cursor:"pointer", color:"green",textDecoration: "none", fontWeight:"600"}}>Read More</Link>
                                  </p>
                                  </Link>
                                  <div className='d-flex justify-content-between my-3'>
                                    <div>
                                      {save?.includes(data._id) ? <img onClick={() => handleApiUnSaves(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SavedIcon} alt="" /> : <img onClick={() => handleApiSaves(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SaveIcon} alt="" />}
                                    </div>
                                    <div className='d-block d-md-none'>
                                      <p className='user_str'>Uploaded By - {
                                        user.image ?
                                          <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltip}
                                          >
                                            <img className='label user_image' src={`data:${user?.image?.contentType};base64,${Buffer.from(user?.image?.data?.data).toString('base64')}`} alt="" />
                                          </OverlayTrigger>
                                          :
                                          <OverlayTrigger
                                            placement="right"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltip}
                                          >
                                            <img src={UserImage} className="user_image" alt="person pic" />
                                          </OverlayTrigger>
                                      } </p>
                                    </div>
                                  </div>
                                </div>
                                <div className='col-3 col-md-2 d-none d-md-block ms-5' style={{ marginTop: "40px" }}>
                                  <div className='d-flex flex-column align-items-center justify-content-center'>
                                    
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </>
            }
          </> :
          <>
            {/* 'col-md-1 bg-white py-1 px-3' */}
            <div className='saveStrParent' >
              <div className='row py-2'>
                <div className='col-md-1'></div>
                <div className='col-8 col-md-10 text-white text-center headText mt-2 mt-md-0'>{user.firstName}{user.lastName}{t("’s")} {t("Saved Strategies")}</div>
                <div onClick={handleFilter} className="col-md-1 d-flex justify-content-center  align-items-center filter_bTn">
                  <span>{t("Filter")}</span>
                  {/* <img src={Filter} className="filtericon3" alt="" /> */}
                </div>
              </div>
              <div className={filetr ? 'd-block' : 'd-none'}>
                <FilterStr
                  stratigy={saveStratigyHi}
                  language={languageSelect}
                />
              </div>
            </div>
            {
              isLoading ? <div style={{ marginLeft: "650px", marginTop: "150px", marginBottom: "150px" }}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div> :
                saveStratigyHi?.length === 0 ? <h1 className='my-5 text-center py-5 text-danger'>{t("No Saved Strategies available.")}</h1> :
                  stratigyFilData?.length !== 0 ? <>
                    {
                      stratigyFilData?.map((res, index) => (
                        <div key={index} className='container'>
                          <div style={{ background: "#FFFFFF" }} className='card_pad'>
                            <div className='my-4'>
                              <div className='d-flex justify-content-between my-4 '>
                                <Link to={`/singleHi/${res._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                  <div className='me-1'>
                                    <div>
                                      <div className='d-flex mb-3'>
                                        <p className='Strategy_count'>{t("strategy")}</p>
                                        <p className='counter_str'>{index + 1}</p>
                                      </div>
                                      {/* <span className='unique_id'>ID {data._id.slice(19, 26)}</span> */}
                                    </div>
                                    <div className='d-block d-md-none mt-1'>
                                      <div className='icon_heading_text me-1 p-1'>शिक्षण के परिणाम</div>
                                      <div className=' mt-1' style={{ marginLeft: "20px" }}>
                                        <div className='res_btn_icon'>
                                          <div className='d-flex flex-column res_inner_div p-1 '>
                                            {
                                              !res['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons'></div> :
                                                res['विकासात्मक क्षेत्र 1'] === "संज्ञानात्मक संवेदी" ?
                                                  <img style={{ width: "20px", height: "20px" }} title="संज्ञानात्मक संवेदी" className='threeIcons mb-1' src={KnowledgeIcon} alt="" /> :
                                                  <img style={{ width: "20px", height: "20px" }} title="मोटर-भौतिक" className='threeIcons mb-1' src={Physical} alt="" />
                                            }
                                            {
                                              !res['विकासात्मक क्षेत्र 2'] ? <div className='threeIcons'></div> :
                                                res['विकासात्मक क्षेत्र 2'] === "सामाजिक-भावनात्मक-नैतिक" ?
                                                  <img style={{ width: "20px", height: "20px" }} title='सामाजिक-भावनात्मक-नैतिक' className='threeIcons mb-1' src={Social} alt="" /> :
                                                  <img style={{ width: "20px", height: "20px" }} title='भाषा और संचार' className='threeIcons mb-1' src={ChatIcon} alt="" />
                                            }
                                          </div>
                                        </div>
                                        <div className='ms-1'>
                                          {
                                            res['Mode of Teaching'] === "ऑनलाइन" ?
                                              <img style={{ width: "20px", height: "20px" }} title='ऑनलाइन' className='threeIcons' src={OnlineIcon} alt="" /> :
                                              <img style={{ width: "20px", height: "20px" }} title='विद्यालय में' className='threeIcons' src={OfflineIcon} alt="" />
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                                <div className='col-9 ms-md-4 col-md-8 '>
                                  <Link to={`/singleHi/${res._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                    <p className='savestr_head'>{t("शिक्षण के परिणाम")}: {res["शिक्षण के परिणाम"]}</p>
                                    <p className='savestr_body'>
                                      {res["शिक्षण रणनीति"]}
                                    </p>
                                  </Link>
                                  <div className='d-flex align-items-center my-3'>
                                    {save?.includes(res._id) ? <img onClick={() => handleApiUnSaves(res._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SavedIcon} alt="" /> : <img onClick={() => handleApiSaves(res._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SaveIcon} alt="" />}
                                  </div>
                                </div>
                                <div className='col-3 col-md-2 d-none d-md-block ms-5'>
                                  <div className='d-flex flex-column align-items-center justify-content-center'>
                                    <div>
                                      <span className='icons_heading'>विकासात्मक क्षेत्र</span>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-center mt-md-2'>
                                      <div className='d-flex align-items-center justify-content-center border p-2 me-2'>
                                        {
                                          !res['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons-nun-save'></div> :
                                            res['विकासात्मक क्षेत्र 1'] === "संज्ञानात्मक संवेदी" ?
                                              <img title="संज्ञानात्मक संवेदी" className='threeIcons mx-2' src={KnowledgeIcon} alt="" /> :
                                              <img title="मोटर-भौतिक" className='threeIcons mx-2' src={Physical} alt="" />
                                        }
                                        {
                                          !res['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons-nun-save'></div> :
                                            res['विकासात्मक क्षेत्र 1'] === "सामाजिक-भावनात्मक-नैतिक" ?
                                              <img title='सामाजिक-भावनात्मक-नैतिक' className='threeIcons ms-3' src={Social} alt="" /> :
                                              <img title='भाषा और संचार' className='threeIcons ms-3' src={ChatIcon} alt="" />
                                        }
                                      </div>
                                      {
                                        res['Mode of Teaching'] === "ऑनलाइन" ?
                                          <img title='ऑनलाइन' className='threeIcons' src={OnlineIcon} alt="" /> :
                                          <img title='विद्यालय में' className='threeIcons' src={OfflineIcon} alt="" />
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        // </Link>
                      ))
                    }
                    {
                      saveStratigyHiUser?.map((res, index) => (
                        <div key={index} className='container'>
                          <div style={{ background: "#FFFFFF" }} className='card_pad'>
                            <div className='my-4'>
                              <div className='d-flex justify-content-between my-4 '>
                                <Link to={`/singleHi/${res._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                  <div className='me-1'>
                                    <div>
                                      <div className='d-flex mb-3'>
                                        <p className='Strategy_count'>{t("strategy")}</p>
                                        <p className='counter_str'>{index + 1}</p>
                                      </div>
                                      {/* <span className='unique_id'>ID {data._id.slice(19, 26)}</span> */}
                                    </div>
                                    <div className='d-block d-md-none mt-1'>
                                      <div className='icon_heading_text me-1 p-1'>शिक्षण के परिणाम</div>
                                      <div className=' mt-1' style={{ marginLeft: "20px" }}>
                                        <div className='res_btn_icon'>
                                          <div className='d-flex flex-column res_inner_div p-1 '>
                                            {
                                              !res['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons'></div> :
                                                res['विकासात्मक क्षेत्र 1'] === "संज्ञानात्मक संवेदी" ?
                                                  <img style={{ width: "20px", height: "20px" }} title="संज्ञानात्मक संवेदी" className='threeIcons mb-1' src={KnowledgeIcon} alt="" /> :
                                                  <img style={{ width: "20px", height: "20px" }} title="मोटर-भौतिक" className='threeIcons mb-1' src={Physical} alt="" />
                                            }
                                            {
                                              !res['विकासात्मक क्षेत्र 2'] ? <div className='threeIcons'></div> :
                                                res['विकासात्मक क्षेत्र 2'] === "सामाजिक-भावनात्मक-नैतिक" ?
                                                  <img style={{ width: "20px", height: "20px" }} title='सामाजिक-भावनात्मक-नैतिक' className='threeIcons mb-1' src={Social} alt="" /> :
                                                  <img style={{ width: "20px", height: "20px" }} title='भाषा और संचार' className='threeIcons mb-1' src={ChatIcon} alt="" />
                                            }
                                          </div>
                                        </div>
                                        <div className='ms-1'>
                                          {
                                            res['Mode of Teaching'] === "ऑनलाइन" ?
                                              <img style={{ width: "20px", height: "20px" }} title='ऑनलाइन' className='threeIcons' src={OnlineIcon} alt="" /> :
                                              <img style={{ width: "20px", height: "20px" }} title='विद्यालय में' className='threeIcons' src={OfflineIcon} alt="" />
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                                <div className='col-9 ms-md-4 col-md-8 '>
                                  <Link to={`/singleHi/${res._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                    <p className='savestr_head'>{t("शिक्षण के परिणाम")}: {res["शिक्षण के परिणाम"]}</p>
                                    <p className='savestr_body'>
                                      {res["शिक्षण रणनीति"]}
                                    </p>
                                  </Link>
                                  <div className='d-flex align-items-center my-3'>
                                    {save?.includes(res._id) ? <img onClick={() => handleApiUnSaves(res._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SavedIcon} alt="" /> : <img onClick={() => handleApiSaves(res._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SaveIcon} alt="" />}
                                  </div>
                                </div>
                                <div className='col-3 col-md-2 d-none d-md-block ms-5'>
                                  <div className='d-flex flex-column align-items-center justify-content-center'>
                                    <div>
                                      <span className='icons_heading'>विकासात्मक क्षेत्र</span>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-center mt-md-2'>
                                      <div className='d-flex align-items-center justify-content-center border p-2 me-2'>
                                        {
                                          !res['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons-nun-save'></div> :
                                            res['विकासात्मक क्षेत्र 1'] === "संज्ञानात्मक संवेदी" ?
                                              <img title="संज्ञानात्मक संवेदी" className='threeIcons mx-2' src={KnowledgeIcon} alt="" /> :
                                              <img title="मोटर-भौतिक" className='threeIcons mx-2' src={Physical} alt="" />
                                        }
                                        {
                                          !res['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons-nun-save'></div> :
                                            res['विकासात्मक क्षेत्र 1'] === "सामाजिक-भावनात्मक-नैतिक" ?
                                              <img title='सामाजिक-भावनात्मक-नैतिक' className='threeIcons ms-3' src={Social} alt="" /> :
                                              <img title='भाषा और संचार' className='threeIcons ms-3' src={ChatIcon} alt="" />
                                        }
                                      </div>
                                      {
                                        res['Mode of Teaching'] === "ऑनलाइन" ?
                                          <img title='ऑनलाइन' className='threeIcons' src={OnlineIcon} alt="" /> :
                                          <img title='विद्यालय में' className='threeIcons' src={OfflineIcon} alt="" />
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        // </Link>
                      ))
                    }
                  </>
                    :
                    <>{
                      saveStratigyHi?.map((data, index) => (
                        <div key={index} className='container'>
                          <div style={{ background: "#FFFFFF" }} className='card_pad'>
                            <div className='my-4'>
                              <div className='d-flex justify-content-between my-4 '>
                                <Link to={`/singleHi/${data._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                  <div className='me-1'>
                                    <div>
                                      <div className='d-flex mb-3'>
                                        <p className='Strategy_count'>{t("strategy")}</p>
                                        <p className='counter_str'>{index + 1}</p>
                                      </div>
                                      {/* <span className='unique_id'>ID {data._id.slice(19, 26)}</span> */}
                                    </div>
                                    <div className='d-block d-md-none mt-1'>
                                      <div className='icon_heading_text me-1 p-1'>शिक्षण के परिणाम</div>
                                      <div className=' mt-1' style={{ marginLeft: "20px" }}>
                                        <div className='res_btn_icon'>
                                          <div className='d-flex flex-column res_inner_div p-1 '>
                                            {
                                              !data['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons'></div> :
                                                data['विकासात्मक क्षेत्र 1'] === "संज्ञानात्मक संवेदी" ?
                                                  <img style={{ width: "20px", height: "20px" }} title="संज्ञानात्मक संवेदी" className='threeIcons mb-1' src={KnowledgeIcon} alt="" /> :
                                                  <img style={{ width: "20px", height: "20px" }} title="मोटर-भौतिक" className='threeIcons mb-1' src={Physical} alt="" />
                                            }
                                            {
                                              !data['विकासात्मक क्षेत्र 2'] ? <div className='threeIcons'></div> :
                                                data['विकासात्मक क्षेत्र 2'] === "सामाजिक-भावनात्मक-नैतिक" ?
                                                  <img style={{ width: "20px", height: "20px" }} title='सामाजिक-भावनात्मक-नैतिक' className='threeIcons mb-1' src={Social} alt="" /> :
                                                  <img style={{ width: "20px", height: "20px" }} title='भाषा और संचार' className='threeIcons mb-1' src={ChatIcon} alt="" />
                                            }
                                          </div>
                                        </div>
                                        <div className='ms-1'>
                                          {
                                            data['Mode of Teaching'] === "ऑनलाइन" ?
                                              <img style={{ width: "20px", height: "20px" }} title='ऑनलाइन' className='threeIcons' src={OnlineIcon} alt="" /> :
                                              <img style={{ width: "20px", height: "20px" }} title='विद्यालय में' className='threeIcons' src={OfflineIcon} alt="" />
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                                <div className='col-9 ms-md-4 col-md-8 '>
                                  <Link to={`/singleHi/${data._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                    <p className='savestr_head'>शिक्षण के परिणाम: {data["शिक्षण के परिणाम"]}</p>
                                    <p className='savestr_body'>
                                      {data["शिक्षण रणनीति"]}
                                    </p>
                                  </Link>
                                  <div className='d-flex align-items-center my-3'>
                                    {save?.includes(data._id) ? <img onClick={() => handleApiUnSaves(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SavedIcon} alt="" /> : <img onClick={() => handleApiSaves(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SaveIcon} alt="" />}
                                  </div>
                                </div>
                                <div className='col-3 col-md-2 d-none d-md-block ms-5'>
                                  <div className='d-flex flex-column align-items-center justify-content-center'>
                                    <div>
                                      <span className='icons_heading'>विकासात्मक क्षेत्र</span>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-center mt-md-2'>
                                      <div className='d-flex align-items-center justify-content-center border p-2 me-2'>
                                        {
                                          !data['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons-nun-save'></div> :
                                            data['विकासात्मक क्षेत्र 1'] === "संज्ञानात्मक संवेदी" ?
                                              <img title="संज्ञानात्मक संवेदी" className='threeIcons mx-2' src={KnowledgeIcon} alt="" /> :
                                              <img title="मोटर-भौतिक" className='threeIcons mx-2' src={Physical} alt="" />
                                        }
                                        {
                                          !data['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons-nun'></div> :
                                            data['विकासात्मक क्षेत्र 1'] === "सामाजिक-भावनात्मक-नैतिक" ?
                                              <img title='सामाजिक-भावनात्मक-नैतिक' className='threeIcons ms-3' src={Social} alt="" /> :
                                              <img title='भाषा और संचार' className='threeIcons ms-3' src={ChatIcon} alt="" />
                                        }
                                      </div>
                                      {
                                        data['Mode of Teaching'] === "ऑनलाइन" ?
                                          <img title='ऑनलाइन' className='threeIcons' src={OnlineIcon} alt="" /> :
                                          <img title='विद्यालय में' className='threeIcons' src={OfflineIcon} alt="" />
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                      {
                        saveStratigyHiUser?.map((data, index) => (
                          <div key={index} className='container'>
                            <div style={{ background: "#FFFFFF" }} className='card_pad'>
                              <div className='my-4'>
                                <div className='d-flex justify-content-between my-4 '>
                                  <Link to={`/singleHi/${data._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                    <div className='me-1'>
                                      <div>
                                        <div className='d-flex mb-3'>
                                          <p className='Strategy_count'>{t("strategy")}</p>
                                          <p className='counter_str'>{saveStratigyHi.length + index + 1}</p>
                                        </div>
                                        {/* <span className='unique_id'>ID {data._id.slice(19, 26)}</span> */}
                                      </div>
                                      <div className='d-block d-md-none mt-1'>
                                        <div className='icon_heading_text me-1 p-1'>शिक्षण के परिणाम</div>
                                        <div className=' mt-1' style={{ marginLeft: "20px" }}>
                                          <div className='res_btn_icon'>
                                            <div className='d-flex flex-column res_inner_div p-1 '>
                                              {
                                                !data['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons'></div> :
                                                  data['विकासात्मक क्षेत्र 1'] === "संज्ञानात्मक संवेदी" ?
                                                    <img style={{ width: "20px", height: "20px" }} title="संज्ञानात्मक संवेदी" className='threeIcons mb-1' src={KnowledgeIcon} alt="" /> :
                                                    <img style={{ width: "20px", height: "20px" }} title="मोटर-भौतिक" className='threeIcons mb-1' src={Physical} alt="" />
                                              }
                                              {
                                                !data['विकासात्मक क्षेत्र 2'] ? <div className='threeIcons'></div> :
                                                  data['विकासात्मक क्षेत्र 2'] === "सामाजिक-भावनात्मक-नैतिक" ?
                                                    <img style={{ width: "20px", height: "20px" }} title='सामाजिक-भावनात्मक-नैतिक' className='threeIcons mb-1' src={Social} alt="" /> :
                                                    <img style={{ width: "20px", height: "20px" }} title='भाषा और संचार' className='threeIcons mb-1' src={ChatIcon} alt="" />
                                              }
                                            </div>
                                          </div>
                                          <div className='ms-1'>
                                            {
                                              data['Mode of Teaching'] === "ऑनलाइन" ?
                                                <img style={{ width: "20px", height: "20px" }} title='ऑनलाइन' className='threeIcons' src={OnlineIcon} alt="" /> :
                                                <img style={{ width: "20px", height: "20px" }} title='विद्यालय में' className='threeIcons' src={OfflineIcon} alt="" />
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                  <div className='col-9 ms-md-4 col-md-8 '>
                                    <Link to={`/singleHi/${data._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                      <p className='savestr_head'>शिक्षण के परिणाम: {data["शिक्षण के परिणाम"]}</p>
                                      <p className='savestr_body'>
                                        {data["शिक्षण रणनीति"]}
                                      </p>
                                    </Link>
                                    <div className='d-flex align-items-center my-3'>
                                      {save?.includes(data._id) ? <img onClick={() => handleApiUnSaves(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SavedIcon} alt="" /> : <img onClick={() => handleApiSaves(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SaveIcon} alt="" />}
                                    </div>
                                  </div>
                                  <div className='col-3 col-md-2 d-none d-md-block ms-5'>
                                    <div className='d-flex flex-column align-items-center justify-content-center'>
                                      <div>
                                        <span className='icons_heading'>विकासात्मक क्षेत्र</span>
                                      </div>
                                      <div className='d-flex align-items-center justify-content-center mt-md-2'>
                                        <div className='d-flex align-items-center justify-content-center border p-2 me-2'>
                                          {
                                            !data['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons-nun'></div> :
                                              data['विकासात्मक क्षेत्र 1'] === "संज्ञानात्मक संवेदी" ?
                                                <img title="संज्ञानात्मक संवेदी" className='threeIcons mx-2' src={KnowledgeIcon} alt="" /> :
                                                <img title="मोटर-भौतिक" className='threeIcons mx-2' src={Physical} alt="" />
                                          }
                                          {
                                            !data['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons-nun'></div> :
                                              data['विकासात्मक क्षेत्र 1'] === "सामाजिक-भावनात्मक-नैतिक" ?
                                                <img title='सामाजिक-भावनात्मक-नैतिक' className='threeIcons ms-3' src={Social} alt="" /> :
                                                <img title='भाषा और संचार' className='threeIcons ms-3' src={ChatIcon} alt="" />
                                          }
                                        </div>
                                        {
                                          data['Mode of Teaching'] === "ऑनलाइन" ?
                                            <img title='ऑनलाइन' className='threeIcons' src={OnlineIcon} alt="" /> :
                                            <img title='विद्यालय में' className='threeIcons' src={OfflineIcon} alt="" />
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </>
            }
          </>
      }

    </div>
  );
  };

export default SaveStratigy;
