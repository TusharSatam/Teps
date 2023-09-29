import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';
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
import { delUserLikes, getLikes, postLikes } from '../../services/userLikes';
import { delUserSaves, getSaves, postSaves } from '../../services/userSaves';
import ContextAwareToggle from '../BootStrapCollapseBtn/ContextAwareToggle';
import HomeHindiLayout from '../Home/HomeHindiLayout';
import HomeLayout from '../Home/HomeLayout';
import './searchscrean.css';
import { singleUserEnStratigys } from '../../services/userStratigy';
import { getSingleUser } from '../../services/dashboardUsers';

const SearchScrean = () => {
  const { stratigyFilData, selectLang, user, setUser, stratigyFilUserData } = useAuth()
  const [show, setShow] = React.useState([]);
  const [showH, setShowH] = React.useState([]);
  const [check, setCheck] = React.useState(false);
  const [uploadeduserIDs, setuploadeduserIDs] = useState([])
  const [userDetails, setUserDetails] = useState([]);
 
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
    delUserLikes(id)
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
    delUserSaves(id)
      .then(res => {
        getSaves()
          .then(res => {
            const userSave = res?.data?.filter(ress => ress.user_id === user._id)
            setUserSaves(userSave?.map(ress => ress.strategie_id))
          })
      })
  }

  useEffect(() => {
   const userIDs = stratigyFilUserData?.map(item => item.User_id);

    const fetchUserDataForAll = async () => {
      try {
        const userPromises = userIDs?.map(User_id => getSingleUser(User_id));
        const userData = await Promise.all(userPromises);
        console.log("userData",userData);
        setUserDetails(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    // Call the function to start fetching data
    fetchUserDataForAll();
  }, []);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {user.firstName}
    </Tooltip>
  );
  return (
    <>
      <ScrollToTop smooth style={{ background: "#d5b39a" }} color="#00000" />
     
      {
        (localStorage.getItem('filterData') || localStorage.getItem('filterDataH')) && stratigyFilData?.length !== 0 ?
          <>
            {
              selectLang === 'english' && !uniqueSubSubTopic[0]['शिक्षण के परिणाम'] ?
                <>
                  <div className='mb-md-3 container_title_sec'>
                    <div className='d-flex justify-content-between mt-md-5'>
                      <p> <span className='sub-title'>{t("Sub sub - topic")}:&nbsp;&nbsp;</span> <span className='sub-subtitle'>{selectLang === 'english' ? (uniqueSubSubTopic[0] === undefined ? '' : uniqueSubSubTopic[0]['Sub-sub topic']) : (uniqueHindiSubSubTopic[0] === undefined ? '' : uniqueHindiSubSubTopic[0]['शिक्षण के परिणाम'])}</span> </p>
                      

                      
                    </div>
                    <div className='d-block d-md-none mb-2'>
                      {
                        !check ? <img className='checkbox_size' onClick={handleUserDataCheck} src={EmptyCheckbox} alt="" /> : <img className='checkbox_size' onClick={handleUserDataCheck} src={checkCheckbox} alt="" />
                      }
                      <span className='ms-2 ' style={{ fontSize: "12px" }}>Show user contributed strategies</span>
                    </div>
                     <p className='mt-md-4 sub_sub_title' data-bs-toggle="modal" data-bs-target="#exampleModal" >
        Learning Outcomes
      </p>

      <div className="modal fade" id="exampleModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">Learning Outcomes</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
           ﻿

Learning Outcomes: Visualizes the feelings of being hungry
Teaching strategy: Mind mapping Step by step instructions: 1. Explain to the students about the concept of hunger and how it feels like. Ask them to share their experiences of feeling hungry. 2. Provide each student with a blank sheet of paper and ask them to draw a circle in the center of the paper. In the circle, they can write the word "Hunger" or draw a picture that symbolizes hunger. 3. Next, ask the students to brainstorm different emotions, thoughts, and physical sensations that they experience when they are hungry. Ask them to write down these words or draw symbols around the central circle. Encourage them to be creative and come up with as many ideas as possible. 4. Instruct the students to group the ideas that are similar or related to each other. For example, they can group together words like "grumbling stomach," "weakness," and "dizziness" under the category of physical sensations.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Understood</button>
            </div>
          </div>
        </div>
      </div>
 
                  </div>
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
                                             
                                            </div>
                                            <div className='d-block d-md-none mt-1'>
                                            
                                              <div className=' mt-1' style={{ marginLeft: "10px" }}>
                                                <div className='res_btn_icon'>
                                                 
                                                </div>
                                              
                                              </div>
                                            </div>
                                          </div>
                                        </Link>
                                        <div className='col-9 ms-4 col-md-11 Strategy_count_article'>
                                          <Link  style={{ textDecoration: "none", color: 'black' }}>
                                            <p>
                                              {strRes["Teaching Strategy"].slice(0, 150) + '...'}
                                              <Link to={`/single/${strRes._id}`} style={{cursor:"pointer", color:"green",textDecoration: "none",fontWeight:"600"}}>Read More</Link>
                                            </p>
                                          </Link>
                                          <div className='d-flex align-items-center my-3'>
                                            {userSaves?.includes(strRes._id) ? <img onClick={() => handleApiUnSaves(strRes._id)} style={{ cursor: "pointer" }} className="save_likes me-2 me-md-3" src={SavedIcon} alt="" /> : <img onClick={() => handleApiSaves(strRes._id)} style={{ cursor: "pointer" }} className="save_likes me-2 me-md-3 " src={SaveIcon} alt="" />}
                                            {userLikes?.includes(strRes._id) ? <img onClick={() => handleApiUnLikes(strRes._id)} style={{ cursor: "pointer" }} className=' save_like' src={LikedIcon} alt="" /> : <img onClick={() => handleApiLikes(strRes._id)} style={{ cursor: "pointer" }} className='save_like' src={LikeIcon} alt="" />}
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
                                                userDetails[index]?.data[0]?.image ?
                                                  <OverlayTrigger
                                                    placement="right"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={renderTooltip}
                                                  >
                                                    <img className='label user_image' src={`data:${userDetails[index]?.data[0]?.image?.contentType};base64,${Buffer.from(userDetails[index]?.data[0]?.image?.data?.data).toString('base64')}`} alt="" />
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
                                               
                                                <div className=' mt-1' style={{ marginLeft: "10px" }}>
                                                  <div className='res_btn_icon'>
                                                    
                                                  </div>
                                                 
                                                </div>
                                              </div>
                                            </Link>
                                          </div>
                                          <div className='col-9 ms-4 col-md-11 Strategy_count_article'>
                                            <Link  style={{ textDecoration: "none", color: 'black' }}>
                                              <p>
                                                {strUser["Teaching Strategy"].slice(0,150) + '...'}
                                                <Link to={`/singleUserStratigy/${strUser._id}`} style={{cursor:"pointer", color:"green",textDecoration: "none",fontWeight:"600"}}>Read More</Link>
                                              </p>
                                            </Link>
                                            
                                            <div className='d-flex justify-content-between align-items-center'>
                                              <div className='d-flex align-items-center my-3'>
                                                {userSaves?.includes(strUser._id) ? <img onClick={() => handleApiUnSaves(strUser._id)} style={{ cursor: "pointer" }} className="save_likes me-2 me-md-3" src={SavedIcon} alt="" /> : <img onClick={() => handleApiSaves(strUser._id)} style={{ cursor: "pointer" }} className="save_likes me-2 me-md-3 " src={SaveIcon} alt="" />}
                                                {userLikes?.includes(strUser._id) ? <img onClick={() => handleApiUnLikes(strUser._id)} style={{ cursor: "pointer" }} className=' save_like' src={LikedIcon} alt="" /> : <img onClick={() => handleApiLikes(strUser._id)} style={{ cursor: "pointer" }} className='save_like' src={LikeIcon} alt="" />}
                                              </div>
                                              <div className='d-block d-md-none'>
                                                <p className='user_str'>Uploaded By - {
                                                  userDetails[index]?.data[0]?.image ?
                                                    <OverlayTrigger
                                                      placement="right"
                                                      delay={{ show: 250, hide: 400 }}
                                                      overlay={renderTooltip}
                                                    >
                                                      <img className='label user_image' src={`data:${userDetails[index]?.data[0]?.image?.contentType};base64,${Buffer.from(userDetails[index]?.data[0]?.image?.data?.data).toString('base64')}`} alt="" />
                                                    </OverlayTrigger>
                                                    :
                                                    <img src={UserImage} className="user_image" alt="person pic" />
                                                } </p>
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
                   <div id="usercon" className='d-none d-md-block'> { !check ? <img onClick={handleUserDataCheck} src={EmptyCheckbox} alt="" /> : <img onClick={handleUserDataCheck} src={checkCheckbox} alt="" /> } <span className='ms-2'>Show user contributed strategies</span> </div>
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