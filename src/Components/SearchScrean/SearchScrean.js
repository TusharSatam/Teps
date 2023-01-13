import { Buffer } from 'buffer';
import React, { useState } from 'react';
import { Accordion, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ScrollToTop from 'react-scroll-to-top';
import UserImage from '../../asstes/Group 51.svg';
import checkCheckbox from '../../asstes/iconmonstr-checkbox-8 2.svg';
import ChatIcon from '../../asstes/icons/chat.svg';
import KnowledgeIcon from '../../asstes/icons/knowledge.svg';
import LikeIcon from '../../asstes/icons/Like.svg';
import LikedIcon from '../../asstes/icons/Liked.svg';
import Physical from '../../asstes/icons/Motor-Physical.png';
import OfflineIcon from '../../asstes/icons/offline.svg';
import OnlineIcon from '../../asstes/icons/online.svg';
import SaveIcon from '../../asstes/icons/Save.svg';
import SavedIcon from '../../asstes/icons/Saved.svg';
import Social from '../../asstes/icons/Socio-Emotional-Ethical.png';
import EmptyCheckbox from '../../asstes/Rectangle 161.svg';
import { useAuth } from '../../Context/AuthContext';
import { delLikes, getLikes, postLikes } from '../../services/userLikes';
import { delSaves, getSaves, postSaves } from '../../services/userSaves';
import ContextAwareToggle from '../BootStrapCollapseBtn/ContextAwareToggle';
import HomeHindiLayout from '../Home/HomeHindiLayout';
import HomeLayout from '../Home/HomeLayout';
import './searchscrean.css';

const SearchScrean = () => {
  const { stratigyFilData, selectLang, user, setUser, stratigyFilUserData } = useAuth()
  const [show, setShow] = React.useState([]);
  const [showH, setShowH] = React.useState([]);
  const [check, setCheck] = React.useState(false);
  // const [react, setReact] = React.useState(user ? user?.saveId : []);
  // const [like, setLike] = React.useState(user ? user?.saveReact : []);
  const { t } = useTranslation();


  const uniqueSubSubTopic = Array.from(new Set(stratigyFilData?.map(a => a['Learning Outcome'])))
    .map(learning_outcome => {
      return stratigyFilData?.find(a => a['Learning Outcome'] === learning_outcome)
    });

  const uniqueSubSubTopicUser = Array.from(new Set(stratigyFilUserData?.map(a => a['Learning Outcome'])))
    .map(learning_outcome => {
      return stratigyFilData?.find(a => a['Learning Outcome'] === learning_outcome)
    });

  const uniqueHindiSubSubTopic = Array.from(new Set(stratigyFilData?.map(a => a['शिक्षण के परिणाम'])))
    .map(learning_outcome => {
      return stratigyFilData?.find(a => a['शिक्षण के परिणाम'] === learning_outcome)
    });

  const handleCheckbox = (ind) => {
    if (show.includes(ind)) {
      for (var i = 0; i < show.length; i++) {
        if (show[i] === ind) {
          show.splice(i, 1);
          i--;
        }
      }
    }
    else {
      show.push(ind)
    }
    setShow([...show], [show]);
  }
  const handleCheckboxH = (e) => {
    if (showH.includes(e)) {
      for (var i = 0; i < showH.length; i++) {
        if (showH[i] === e) {
          showH.splice(i, 1);
          i--;
        }
      }
    }
    else {
      showH.push(e)
    }
    setShowH([...showH], [showH]);
  }
  // const handleReact = async (e) => {
  //   if (react?.includes(e)) {
  //     for (var i = 0; i < react.length; i++) {
  //       if (react[i] === e) {
  //         react?.splice(i, 1);
  //         i--;
  //       }
  //     }
  //   }
  //   else {
  //     react?.push(e)
  //   }
  //   setReact([...react], [react]);
  // }
  // React.useEffect(() => {
  //   const data = { "saveId": react }
  //   if (react) {
  //     updateUser(user._id, data)
  //       .then(res => {
  //         getSingleUser(user._id)
  //           .then(res => {
  //             window.localStorage.setItem('data', JSON.stringify(res.data[0]));
  //             setUser(res.data[0]);
  //           })
  //       })
  //   }
  // }, [react, user, setUser])

  // const handleLike = async (e) => {

  //   if (like?.includes(e)) {
  //     for (var i = 0; i < like.length; i++) {
  //       if (like[i] === e) {
  //         like.splice(i, 1);
  //         i--;
  //       }
  //     }
  //   }
  //   else {
  //     like.push(e)
  //   }
  //   setLike([...like], [like]);
  // }

  // React.useEffect(() => {
  //   const data = { "saveReact": like }
  //   if (like) {
  //     updateUser(user._id, data)
  //       .then(res => {
  //         getSingleUser(user._id)
  //           .then(res => {
  //             window.localStorage.setItem('data', JSON.stringify(res.data[0]));
  //             setUser(res.data[0]);
  //           })
  //       })
  //   }
  // }, [like, user, setUser])

  if (selectLang !== 'english') {
    localStorage.removeItem('selectedDropdown');
    localStorage.removeItem('filterData');
  }
  else {
    localStorage.removeItem('selectedHiDropdown');
    localStorage.removeItem('filterDataH');
  }
  React.useEffect(() => {
    if (stratigyFilData.length === 0) {
      setShow([''])
      setShowH([''])
    }
    if (selectLang !== 'english') {
      localStorage.removeItem('selectedDropdown');
      localStorage.removeItem('filterData');
      setShow([''])
    }
    else {
      localStorage.removeItem('selectedHiDropdown');
      localStorage.removeItem('filterDataH');
      setShowH([''])
    }

  }, [stratigyFilData, selectLang])

  // let accordion_key = 12345;
  const [accorKey, setAccorKey] = React.useState(12345)
  const handleReinitialize = () => {
    setAccorKey(accorKey + 1)
    setShow([])
    setShowH([])
  };
  const handleUserDataCheck = () => {
    if (check) {
      setCheck(false)
    }
    else {
      setCheck(true)
    }
  }
  const [userLikes, setUserLikes] = useState([]);
  // const [c, setC] = useState();
  React.useEffect(() => {
    getLikes()
      .then(res => {
        const userlike = res?.data?.filter(ress => ress.user_id === user._id)
        setUserLikes(userlike?.map(ress => ress.strategie_id))
      })
  }, [])
  const handleApiLikes = (id) => {
    const data = {
      strategie_id: id,
      user_id: user._id
    }
    postLikes(data)
      .then(res => {
        getLikes()
          .then(res => {
            const userlike = res?.data?.filter(ress => ress.user_id === user._id)
            setUserLikes(userlike?.map(ress => ress.strategie_id))
          })
      })
  }
  const handleApiUnLikes = (id) => {
    delLikes(id)
      .then(res => {
        getLikes()
          .then(res => {
            const userlike = res?.data?.filter(ress => ress.user_id === user._id)
            setUserLikes(userlike?.map(ress => ress.strategie_id))
          })
      })
  }

  const [userSaves, setUserSaves] = useState([]);
  // const [c, setC] = useState();
  React.useEffect(() => {
    getSaves()
      .then(res => {
        const userlike = res?.data?.filter(ress => ress.user_id === user._id)
        setUserSaves(userlike?.map(ress => ress.strategie_id))
      })
  }, [])
  const handleApiSaves = (id) => {
    const data = {
      strategie_id: id,
      user_id: user._id
    }
    postSaves(data)
      .then(res => {
        getSaves()
          .then(res => {
            const userSave = res?.data?.filter(ress => ress.user_id === user._id)
            setUserSaves(userSave?.map(ress => ress.strategie_id))
          })
      })
  }
  const handleApiUnSaves = (id) => {
    delSaves(id)
      .then(res => {
        getSaves()
          .then(res => {
            const userSave = res?.data?.filter(ress => ress.user_id === user._id)
            setUserSaves(userSave?.map(ress => ress.strategie_id))
          })
      })
  }
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {user.firstName}
    </Tooltip>
  );
  return (
    <>
      <ScrollToTop smooth style={{ background: "#d5b39a" }} color="#00000" />
      <>
        <div className='stratigy_bg'>
          {
            selectLang === 'hindi' ?
              <HomeHindiLayout
                setAccorKey={handleReinitialize}
              /> :
              <HomeLayout
                setAccorKey={handleReinitialize}
              />
          }
        </div>
      </>
      {
        (localStorage.getItem('filterData') || localStorage.getItem('filterDataH')) && stratigyFilData?.length !== 0 ?
          <>
            {
              selectLang === 'english' && !uniqueSubSubTopic[0]['शिक्षण के परिणाम'] ?
                <>
                  <div className='mb-md-3 container_title_sec'>
                    <div className='d-flex justify-content-between mt-md-5'>
                      <p> <span className='sub-title'>{t("Sub sub - topic")}:&nbsp;&nbsp;</span> <span className='sub-subtitle'>{selectLang === 'english' ? (uniqueSubSubTopic[0] === undefined ? '' : uniqueSubSubTopic[0]['Sub-sub topic']) : (uniqueHindiSubSubTopic[0] === undefined ? '' : uniqueHindiSubSubTopic[0]['शिक्षण के परिणाम'])}</span> </p>
                      <div className='d-none d-md-block'>
                        {
                          !check ? <img onClick={handleUserDataCheck} src={EmptyCheckbox} alt="" /> : <img onClick={handleUserDataCheck} src={checkCheckbox} alt="" />
                        }
                        <span className='ms-2'>Show user contributed strategies</span>
                      </div>
                    </div>
                    <div className='d-block d-md-none mb-2'>
                      {
                        !check ? <img className='checkbox_size' onClick={handleUserDataCheck} src={EmptyCheckbox} alt="" /> : <img className='checkbox_size' onClick={handleUserDataCheck} src={checkCheckbox} alt="" />
                      }
                      <span className='ms-2 ' style={{ fontSize: "12px" }}>Show user contributed strategies</span>
                    </div>
                    <p className='mt-md-4 sub_sub_title'> {t("Learning Outcomes")} </p>
                  </div>
                  <div className='dropDownContainer mb-5' key={accorKey}>
                    <Accordion alwaysOpen >
                      {
                        uniqueSubSubTopic?.map((data, index) => (
                          <Card className='border-0 '>
                            <Card.Header className={index === 0 ? 'd-flex align-items-center p-0 border-top' : 'd-flex align-items-center p-0'} style={{ background: "#FFFFFF" }}>
                              <ContextAwareToggle eventKey={index + 1}>
                                {show?.includes(index) ?
                                  <img className="checkbox_size" onClick={() => handleCheckbox(index)} src={checkCheckbox} alt="" /> :
                                  <img className='checkbox_size' onClick={() => handleCheckbox(index)} src={EmptyCheckbox} alt="" />}
                              </ContextAwareToggle>
                              <p className='mt-3 checkBox_title'>{data['Learning Outcome']}</p>
                            </Card.Header>
                            <Accordion.Collapse eventKey={index + 1} className="acordonia_coll">
                              <Card.Body style={{ background: "#FFFFFF" }} className='border-bottom card_pad'>
                                <div className='my-4'>
                                  {
                                    stratigyFilData?.filter(res => res['Learning Outcome'] === data['Learning Outcome']).map((strRes, index) => (
                                      <div className='d-flex justify-content-between my-4 '>
                                        <Link to={`/single/${strRes._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                          <div className='me-1'>
                                            <div>
                                              <div className='d-flex'>
                                                <p className='Strategy_count'>{t("strategy")}</p>
                                                <p className='counter_str'>{index + 1}</p>
                                              </div>
                                              {/* <span className='unique_id'>ID {data._id.slice(19, 26)}</span> */}
                                            </div>
                                            <div className='d-block d-md-none mt-1'>
                                              <div className='icon_heading_text me-1 p-1'>Developmental Domains</div>
                                              <div className=' mt-1' style={{ marginLeft: "10px" }}>
                                                <div className='res_btn_icon'>
                                                  <div className='d-flex flex-column res_inner_div p-1 '>
                                                    {
                                                      !strRes['Dev Dom 1'] ? <div className='threeIcons'></div> :
                                                        strRes['Dev Dom 1'] === "Cognitive Sensory" ?
                                                          <img title="Cognitive Sensory" className='threeIcons mb-1' src={KnowledgeIcon} alt="" /> :
                                                          <img title="Motor-Physical" className='threeIcons mb-1' src={Physical} alt="" />
                                                    }
                                                    {
                                                      !strRes['Dev Dom 2'] ? <div className='threeIcons'></div> :
                                                        strRes['Dev Dom 2'] === "Socio-Emotional-Ethical" ?
                                                          <img title='Socio-Emotional-Ethical' className='threeIcons mb-1' src={Social} alt="" /> :
                                                          <img title='Language & Communication' className='threeIcons mb-1' src={ChatIcon} alt="" />
                                                    }
                                                  </div>
                                                </div>
                                                <div className='ms-1'>
                                                  {
                                                    strRes['Mode of Teaching'] === "Online" ?
                                                      <img title='Online' className='threeIcons' src={OnlineIcon} alt="" /> :
                                                      <img title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                                                  }
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </Link>
                                        <div className='col-9 ms-4 col-md-8 Strategy_count_article'>
                                          <Link to={`/single/${strRes._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                            <p>
                                              {strRes["Teaching Strategy"]}
                                            </p>
                                          </Link>
                                          <div className='d-flex align-items-center my-3'>
                                            {userSaves?.includes(strRes._id) ? <img onClick={() => handleApiUnSaves(strRes._id)} style={{ cursor: "pointer" }} className="save_likes me-2 me-md-3" src={SavedIcon} alt="" /> : <img onClick={() => handleApiSaves(strRes._id)} style={{ cursor: "pointer" }} className="save_likes me-2 me-md-3 " src={SaveIcon} alt="" />}
                                            {userLikes?.includes(strRes._id) ? <img onClick={() => handleApiUnLikes(strRes._id)} style={{ cursor: "pointer" }} className=' save_like' src={LikedIcon} alt="" /> : <img onClick={() => handleApiLikes(strRes._id)} style={{ cursor: "pointer" }} className='save_like' src={LikeIcon} alt="" />}
                                          </div>
                                        </div>
                                        <div className='col-md-2 d-none d-md-block ms-5'>
                                          <div className='d-flex flex-column align-items-center justify-content-center'>
                                            <div>
                                              <span className='icons_heading'>Developmental Domains</span>
                                            </div>
                                            <div className='d-flex align-items-center justify-content-center mt-md-2'>
                                              <div className='d-flex align-items-center justify-content-center border p-2 me-2'>
                                                {
                                                  !strRes['Dev Dom 1'] ? <div className='threeIcons-nun'></div> :
                                                    strRes['Dev Dom 1'] === "Cognitive Sensory" ?
                                                      <img title="Cognitive Sensory" className='threeIcons ' src={KnowledgeIcon} alt="" /> :
                                                      <img title="Motor-Physical" className='threeIcons ' src={Physical} alt="" />
                                                }
                                                {
                                                  !strRes['Dev Dom 2'] ? <div className='threeIcons-nun'></div> :
                                                    strRes['Dev Dom 2'] === "Socio-Emotional-Ethical" ?
                                                      <img title='Socio-Emotional-Ethical' className='threeIcons ms-3' src={Social} alt="" /> :
                                                      <img title='Language & Communication' className='threeIcons ms-3' src={ChatIcon} alt="" />
                                                }
                                              </div>
                                              {
                                                strRes['Mode of Teaching'] === "Online" ?
                                                  <img title='Online' className='threeIcons' src={OnlineIcon} alt="" /> :
                                                  <img title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                                              }
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                  }
                                </div>
                                {check ?
                                  <div className='my-4'>
                                    {
                                      console.log("checked", stratigyFilUserData)
                                    }
                                    {
                                      stratigyFilUserData?.filter(res => res['Learning Outcome'] === data['Learning Outcome']).map((strUser, index) => (
                                        <div className={index === 0 ? 'd-flex justify-content-between my-4 user_str_border pt-4 pt-md-5' : 'd-flex justify-content-between my-4 pt-5'}>
                                          <div className='me-1'>
                                            <div>
                                              <Link to={`/singleUserStratigy/${strUser._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                                <div className='d-flex'>
                                                  <p className='Strategy_count'>{t("strategy")}</p>
                                                  <p className='counter_str'>{stratigyFilUserData?.filter(res => res['Learning Outcome'] === data['Learning Outcome']).length + (index + 1)}</p>
                                                </div>
                                              </Link>
                                              <p className='user_str d-none d-md-block'>Uploaded By - {
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
                                            <Link to={`/singleUserStratigy/${strUser._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                              <div className='d-block d-md-none mt-1'>
                                                <div className='icon_heading_text me-1 p-1'>Developmental Domains</div>
                                                <div className=' mt-1' style={{ marginLeft: "10px" }}>
                                                  <div className='res_btn_icon'>
                                                    <div className='d-flex flex-column res_inner_div p-1 '>
                                                      {
                                                        !strUser['Dev Dom 1'] ? <div className='threeIcons'></div> :
                                                          strUser['Dev Dom 1'] === "Cognitive Sensory" ?
                                                            <img style={{ width: "20px", height: "20px" }} title="Cognitive Sensory" className='threeIcons mb-1' src={KnowledgeIcon} alt="" /> :
                                                            <img style={{ width: "20px", height: "20px" }} title="Motor-Physical" className='threeIcons mb-1' src={Physical} alt="" />
                                                      }
                                                      {
                                                        !strUser['Dev Dom 2'] ? <div className='threeIcons'></div> :
                                                          strUser['Dev Dom 2'] === "Socio-Emotional-Ethical" ?
                                                            <img style={{ width: "20px", height: "20px" }} title='Socio-Emotional-Ethical' className='threeIcons mb-1' src={Social} alt="" /> :
                                                            <img style={{ width: "20px", height: "20px" }} title='Language & Communication' className='threeIcons mb-1' src={ChatIcon} alt="" />
                                                      }
                                                    </div>
                                                  </div>
                                                  <div className='ms-1'>
                                                    {
                                                      strUser['Mode of Teaching'] === "Online" ?
                                                        <img style={{ width: "20px", height: "20px" }} title='Online' className='threeIcons' src={OnlineIcon} alt="" /> :
                                                        <img style={{ width: "20px", height: "20px" }} title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                                                    }
                                                  </div>
                                                </div>
                                              </div>
                                            </Link>
                                          </div>
                                          <div className='col-9 ms-4 col-md-8 Strategy_count_article'>
                                            <Link to={`/singleUserStratigy/${strUser._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                              <p>
                                                {strUser["Teaching Strategy"]}
                                              </p>
                                            </Link>
                                            {/* <div className='d-flex align-items-center my-3'>
                                              {react?.includes(strUser._id) ? <img onClick={() => handleReact(strUser._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SavedIcon} alt="" /> : <img onClick={() => handleReact(strUser._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SaveIcon} alt="" />}
                                              {like.includes(strUser._id) ? <img onClick={() => handleLike(strUser._id)} style={{ cursor: "pointer" }} className="save_likes" src={LikedIcon} alt="" /> : <img onClick={() => handleLike(strUser._id)} style={{ cursor: "pointer" }} className="save_likes" src={LikeIcon} alt="" />}
                                            </div> */}
                                            <div className='d-flex justify-content-between align-items-center'>
                                              <div className='d-flex align-items-center my-3'>
                                                {userSaves?.includes(strUser._id) ? <img onClick={() => handleApiUnSaves(strUser._id)} style={{ cursor: "pointer" }} className="save_likes me-2 me-md-3" src={SavedIcon} alt="" /> : <img onClick={() => handleApiSaves(strUser._id)} style={{ cursor: "pointer" }} className="save_likes me-2 me-md-3 " src={SaveIcon} alt="" />}
                                                {userLikes?.includes(strUser._id) ? <img onClick={() => handleApiUnLikes(strUser._id)} style={{ cursor: "pointer" }} className=' save_like' src={LikedIcon} alt="" /> : <img onClick={() => handleApiLikes(strUser._id)} style={{ cursor: "pointer" }} className='save_like' src={LikeIcon} alt="" />}
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
                                                    <img src={UserImage} className="user_image" alt="person pic" />
                                                } </p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className='col-md-2 d-none d-md-block ms-5'>
                                            <div className='d-flex flex-column align-items-center justify-content-center'>
                                              <div>
                                                <span className='icons_heading'>Developmental Domains</span>
                                              </div>
                                              <div className='d-flex align-items-center justify-content-center mt-md-2'>
                                                <div className='d-flex align-items-center justify-content-center border p-2 me-2'>
                                                  {
                                                    !strUser['Dev Dom 1'] ? <div className='threeIcons-nun'></div> :
                                                      strUser['Dev Dom 1'] === "Cognitive Sensory" ?
                                                        <img title="Cognitive Sensory" className='threeIcons ' src={KnowledgeIcon} alt="" /> :
                                                        <img title="Motor-Physical" className='threeIcons ' src={Physical} alt="" />
                                                  }
                                                  {
                                                    !strUser['Dev Dom 2'] ? <div className='threeIcons-nun'></div> :
                                                      strUser['Dev Dom 2'] === "Socio-Emotional-Ethical" ?
                                                        <img title='Socio-Emotional-Ethical' className='threeIcons ms-3' src={Social} alt="" /> :
                                                        <img title='Language & Communication' className='threeIcons ms-3' src={ChatIcon} alt="" />
                                                  }
                                                </div>
                                                {
                                                  strUser['Mode of Teaching'] === "Online" ?
                                                    <img title='Online' className='threeIcons' src={OnlineIcon} alt="" /> :
                                                    <img title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                                                }
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      ))
                                    }
                                  </div> : ""
                                }

                              </Card.Body>
                            </Accordion.Collapse>
                          </Card>
                        ))
                      }
                    </Accordion>
                  </div>
                </> :
                selectLang !== 'english' && !uniqueHindiSubSubTopic[0]['Learning Outcome'] ?
                  <>
                    <div className='mb-md-3 container_title_sec'>
                      <p className='mt-md-5'> <span className='sub-title'>{t("Sub sub - topic")}:&nbsp;&nbsp;</span> <span className='sub-subtitle'>{selectLang === 'english' ? (uniqueSubSubTopic[0] === undefined ? '' : uniqueSubSubTopic[0]['Sub-sub topic']) : (uniqueHindiSubSubTopic[0] === undefined ? '' : uniqueHindiSubSubTopic[0]['शिक्षण के परिणाम'])}</span> </p>
                      <p className='mt-md-4 sub_sub_title'> {t("Learning Outcomes")} </p>
                    </div>
                    <div className='dropDownContainer mb-5' key={accorKey}>
                      <Accordion alwaysOpen >

                        {
                          uniqueHindiSubSubTopic?.map((data, index) => (
                            <Card className='border-0 '>
                              <Card.Header className={index === 0 ? 'd-flex align-items-center p-0 border-top' : 'd-flex align-items-center p-0'} style={{ background: "#FFFFFF" }}>
                                <ContextAwareToggle eventKey={index + 1}>{showH?.includes(index) ? <img className="checkbox_size" onClick={() => handleCheckboxH(index)} src={checkCheckbox} alt="" /> : <img className='checkbox_size' onClick={() => handleCheckboxH(index)} src={EmptyCheckbox} alt="" />}</ContextAwareToggle>
                                <p className='mt-3 checkBox_title'>{data['शिक्षण के परिणाम']}</p>
                              </Card.Header>
                              <Accordion.Collapse eventKey={index + 1} className="acordonia_coll">
                                <Card.Body style={{ background: "#FFFFFF" }} className='border-bottom card_pad'>
                                  <div className='my-4'>
                                    {
                                      stratigyFilData?.filter(res => res['शिक्षण के परिणाम'] === data['शिक्षण के परिणाम']).map((data, index) => (
                                        <div className='d-flex justify-content-between my-4 '>
                                          <Link to={`/singleHi/${data._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                            <div className='me-1'>
                                              <div>
                                                <div className='d-flex'>
                                                  <p className='Strategy_count'>{t("strategy")}</p>
                                                  <p className='counter_str'>{index + 1}</p>
                                                </div>
                                                {/* <span className='unique_id'>ID {data._id.slice(19, 26)}</span> */}
                                              </div>
                                              <div className='d-block d-md-none mt-1'>
                                                <div className='icon_heading_text me-1 p-1'>विकासात्मक क्षेत्र</div>
                                                <div className=' mt-1' style={{ marginLeft: "15px" }}>
                                                  <div className='res_btn_icon'>
                                                    <div className='d-flex flex-column res_inner_div p-1 '>
                                                      {
                                                        !data['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons'></div> :
                                                          data['विकासात्मक क्षेत्र 1'] === "संज्ञानात्मक संवेदी" ?
                                                            <img title="संज्ञानात्मक संवेदी" className='threeIcons mb-1' src={KnowledgeIcon} alt="" /> :
                                                            <img title="मोटर-भौतिक" className='threeIcons mb-1' src={Physical} alt="" />
                                                      }
                                                      {
                                                        !data['विकासात्मक क्षेत्र 2'] ? <div className='threeIcons'></div> :
                                                          data['विकासात्मक क्षेत्र 2'] === "सामाजिक-भावनात्मक-नैतिक" ?
                                                            <img title='सामाजिक-भावनात्मक-नैतिक' className='threeIcons mb-1' src={Social} alt="" /> :
                                                            <img title='भाषा और संचार' className='threeIcons mb-1' src={ChatIcon} alt="" />
                                                      }
                                                    </div>
                                                  </div>
                                                  <div className='ms-1'>
                                                    {
                                                      data['Mode of Teaching'] === "ऑनलाइन" ?
                                                        <img title='ऑनलाइन' className='threeIcons' src={OnlineIcon} alt="" /> :
                                                        <img title='विद्यालय में' className='threeIcons' src={OfflineIcon} alt="" />
                                                    }

                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </Link>
                                          <div className='col-9 col-md-8 Strategy_count_article'>
                                            <Link to={`/singleHi/${data._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                              <p>
                                                {data["शिक्षण रणनीति"]}
                                              </p>
                                            </Link>
                                            {/* <div className='d-flex align-items-center my-3'>
                                              {react?.includes(data._id) ? <img onClick={() => handleReact(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SavedIcon} alt="" /> : <img onClick={() => handleReact(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SaveIcon} alt="" />}
                                              {like?.includes(data._id) ? <img onClick={() => handleLike(data._id)} style={{ cursor: "pointer" }} className="save_likes" src={LikedIcon} alt="" /> : <img onClick={() => handleLike(data._id)} style={{ cursor: "pointer" }} className="save_likes" src={LikeIcon} alt="" />}
                                            </div> */}
                                            <div className='d-flex align-items-center my-3'>
                                              {userSaves?.includes(data._id) ? <img onClick={() => handleApiUnSaves(data._id)} style={{ cursor: "pointer" }} className="save_likes me-2 me-md-3" src={SavedIcon} alt="" /> : <img onClick={() => handleApiSaves(data._id)} style={{ cursor: "pointer" }} className="save_likes me-2 me-md-3 " src={SaveIcon} alt="" />}
                                              {userLikes?.includes(data._id) ? <img onClick={() => handleApiUnLikes(data._id)} style={{ cursor: "pointer" }} className=' save_like' src={LikedIcon} alt="" /> : <img onClick={() => handleApiLikes(data._id)} style={{ cursor: "pointer" }} className='save_like' src={LikeIcon} alt="" />}
                                            </div>
                                          </div>
                                          <div className='col-md-2 d-none d-md-block ms-5'>
                                            <div className='d-flex flex-column align-items-center justify-content-center'>
                                              <div>
                                                <span className='icons_hindi_heading'>विकासात्मक क्षेत्र</span>
                                              </div>
                                              <div className='d-flex align-items-center justify-content-center mt-2'>
                                                <div className='d-flex align-items-center justify-content-center border p-2 me-2'>
                                                  {
                                                    !data['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons-nunH'></div> :
                                                      data['विकासात्मक क्षेत्र 1'] === "संज्ञानात्मक संवेदी" ?
                                                        <img title="संज्ञानात्मक संवेदी" className='threeIcons' src={KnowledgeIcon} alt="" /> :
                                                        <img title="मोटर-भौतिक" className='threeIcons' src={Physical} alt="" />
                                                  }
                                                  {
                                                    !data['विकासात्मक क्षेत्र 2'] ? <div className='threeIcons-nunH'></div> :
                                                      data['विकासात्मक क्षेत्र 2'] === "सामाजिक-भावनात्मक-नैतिक" ?
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
                                      ))
                                    }
                                  </div>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          ))
                        }
                      </Accordion>
                    </div>
                  </> : <div className='text-danger empty_stratigys'>
                    {t('Please reselect the dropdowns for Hindi strategies.')}
                  </div>

            }

          </> : <div className='text-danger empty_stratigys'>
            {t('strategies_not_found')}
          </div>

      }
    </>
  );
};

export default SearchScrean;



