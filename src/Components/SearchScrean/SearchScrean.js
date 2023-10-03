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
    fetchUserDataForAll();
  }, []);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {user.firstName}
    </Tooltip>
  );
  const handleBackClick = () => {
    window.history.go(-1);
  };
  return (
    <>
      <ScrollToTop smooth style={{ background: "#d5b39a" }} color="#00000" />
      <div className=" d-flex justify-content-center align-items-center mb-3">
        <button className="backbutton" onClick={handleBackClick}>{`< ${t('Back')}`}</button>
        <hr className="line"/>
      </div>
      {
        (localStorage.getItem('filterData') || localStorage.getItem('filterDataH')) && stratigyFilData?.length !== 0 ?
          <>
            {
              selectLang === 'english' && !uniqueSubSubTopic[0]['शिक्षण के परिणाम'] ?
                <>
                  <div className='mb-md-3 container_title_sec'>
                    <div className='d-flex  flex-column justify-content-between mt-md-5'>
                      <p> <span className='sub-title'>{t("Sub sub - topic")}:&nbsp;&nbsp;</span> <span className='sub-subtitle'>{selectLang === 'english' ? (uniqueSubSubTopic[0] === undefined ? '' : uniqueSubSubTopic[0]['Sub-sub topic']) : (uniqueHindiSubSubTopic[0] === undefined ? '' : uniqueHindiSubSubTopic[0]['शिक्षण के परिणाम'])}</span> </p>
                      <p className='clickLearningText'>Click on a learning outcome to get its teaching strategy.</p>
                    </div>
                  
                  </div>
                  <div className='dropDownContainer mb-5' key={accorKey}>
                    <Accordion alwaysOpen >
                      {
                        uniqueSubSubTopic?.map((data, index) => (
                          <Card className='border-0 '>
                            <Card.Header className={index === 0 ? 'd-flex align-items-center p-0 borderNone' : 'd-flex align-items-center p-0'}>
                              <ContextAwareToggle eventKey={index + 1}>
                                {show?.includes(index) ?
                                  <img className="checkbox_size" onClick={() => handleCheckbox(index)} src={checkCheckbox} alt="checkbox" /> :
                                  <img className='checkbox_size' onClick={() => handleCheckbox(index)} src={EmptyCheckbox} alt="checkbox" />}
                              </ContextAwareToggle>
                              <p className='mt-3 checkBox_title'>{data['Learning Outcome']}</p>
                            </Card.Header>
                            <Accordion.Collapse eventKey={index + 1} className="acordonia_coll">
                              <Card.Body style={{ background: "#FFFFFF" }} className='border-bottom card_pad px-0'>
                                <div className='my-4'>
                                  {
                                    stratigyFilData?.filter(res => res['Learning Outcome'] === data['Learning Outcome']).map((strRes, index) => (
                                      <div className='d-flex flex-column justify-content-between my-4 outcomeList'>
                                        <Link to={`/single/${strRes._id}`} className="linkStyle">
                                          <div className='me-1'>
                                            <div>
                                              <div className='d-flex'>
                                                <p className='Strategy_count'>{t("strategy")}</p>
                                                <p className='counter_str'>{index + 1}</p>
                                              </div>
                                            </div>
                                      
                                          </div>
                                        </Link>
                                        <div className='Strategy_count_article'>
                                          <p className='pedalogicalText'>{strRes["Pedagogical Approach"]}</p>
                                          <Link to={`/single/${strRes._id}`} className="linkStyle">
                                            <p>
                                              {strRes["Teaching Strategy"].slice(0,200)}...
                                            </p>
                                          </Link>
                             
                                          <div className='strategyReadmore'>
                                            <Link to={`/single/${strRes._id}`} >
                                              Read more...
                                            </Link>
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
                                      <div className='user_str_border'></div>
                                    {
                                      stratigyFilUserData?.filter(res => res['Learning Outcome'] === data['Learning Outcome']).map((strUser, index) => (
                                        <div className={index === 0 ? 'd-flex flex-column justify-content-between my-4  outcomeList' : 'd-flex flex-column justify-content-between my-4 pt-5 outcomeList'}>
                                          <div className=''>
                                            <div>
                                              <Link to={`/singleUserStratigy/${strUser._id}`} className="linkStyle">
                                                <div className='d-flex'>
                                                  <p className='Strategy_count'>{t("strategy")}</p>
                                                  <p className='counter_str'>{stratigyFilUserData?.filter(res => res['Learning Outcome'] === data['Learning Outcome']).length + (index +1)}</p>
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
                                            <Link to={`/singleUserStratigy/${strUser._id}`} className="linkStyle">
                                    
                                            </Link>
                                          </div>
                                          <div className='Strategy_count_article'>
                                          <p className='pedalogicalText'>{strUser["Pedagogical Approach"]}</p>

                                            <Link to={`/singleUserStratigy/${strUser._id}`} className="linkStyle">
                                              <p>
                                                {strUser["Teaching Strategy"].slice(0,200)}...
                                              </p>
                                            </Link>
                                  
                                            <div className='d-flex justify-content-between align-items-center'>
                                       
                                                </div>
                                              <div className='strategyReadmore'>
                                                <Link to={`/singleUserStratigy/${strUser._id}`} >
                                                  Read more...
                                                </Link>
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
                  <div className='d-block d-md-none mb-2 container_title_sec'>
                      {
                        !check ? <img className='checkbox_size' onClick={handleUserDataCheck} src={EmptyCheckbox} alt="checkbox" /> : <img className='checkbox_size' onClick={handleUserDataCheck} src={checkCheckbox} alt="checkbox" />
                      }
                      <span className='ms-2'>Show user contributed strategies</span>
                    </div>
                     <div className='d-none d-md-block mt-6 mb-3 container_title_sec'>
                       <div className='lightgreenline my-5'></div>
                        {
                          !check ? <img onClick={handleUserDataCheck} className='checkbox_size' src={EmptyCheckbox} alt="checkbox" /> : <img onClick={handleUserDataCheck} src={checkCheckbox} alt="checkbox" className='checkbox_size'/>
                        }
                        <span className='ms-2'>Show user contributed strategies</span>
                      </div>
                </> :
                selectLang !== 'english' && !uniqueHindiSubSubTopic[0]['Learning Outcome'] ?
                  <>
                    <div className='mb-md-3 container_title_sec'>
                      <p className='mt-md-5'> <span className='sub-title'>{t("Sub sub - topic")}:&nbsp;&nbsp;</span> <span className='sub-subtitle'>{selectLang === 'english' ? (uniqueSubSubTopic[0] === undefined ? '' : uniqueSubSubTopic[0]['Sub-sub topic']) : (uniqueHindiSubSubTopic[0] === undefined ? '' : uniqueHindiSubSubTopic[0]['शिक्षण के परिणाम'])}</span> </p>
                <p className='clickLearningText'>किसी शिक्षण परिणाम की शिक्षण रणनीति जानने के लिए उस पर क्लिक करें।</p>                      
                    </div>
                    <div className='dropDownContainer mb-5' key={accorKey}>
                      <Accordion alwaysOpen >

                        {
                          uniqueHindiSubSubTopic?.map((data, index) => (
                            <Card className='border-0 '>
                              <Card.Header className={index === 0 ? 'd-flex align-items-center p-0 borderNone' : 'd-flex align-items-center p-0'} style={{ background: "#FFFFFF" }}>
                                <ContextAwareToggle eventKey={index + 1}>{showH?.includes(index) ? <img className="checkbox_size" onClick={() => handleCheckboxH(index)} src={checkCheckbox} alt="" /> : <img className='checkbox_size' onClick={() => handleCheckboxH(index)} src={EmptyCheckbox} alt="" />}</ContextAwareToggle>
                                <p className='mt-3 checkBox_title'>{data['शिक्षण के परिणाम']}</p>
                              </Card.Header>
                              <Accordion.Collapse eventKey={index + 1} className="acordonia_coll">
                                <Card.Body style={{ background: "#FFFFFF" }} className='border-bottom card_pad px-0'>
                                  <div className='my-4'>
                                    {
                                      stratigyFilData?.filter(res => res['शिक्षण के परिणाम'] === data['शिक्षण के परिणाम']).map((data, index) => (
                                        <div className='d-flex flex-column justify-content-between my-4 outcomeList'>
                                          <Link to={`/singleHi/${data._id}`} className="linkStyle">
                                            <div className='me-1'>
                                              <div>
                                                <div className='d-flex'>
                                                  <p className='Strategy_count'>{t("strategy")}</p>
                                                  <p className='counter_str'>{index + 1}</p>
                                                </div>
                                              </div>
                                    
                                            </div>
                                          </Link>
                                          <div className='Strategy_count_article'>
                                            <Link to={`/singleHi/${data._id}`} className="linkStyle">
                                              <p>
                                                {data["शिक्षण रणनीति"]}
                                              </p>
                                            </Link>
                                       
               
                                            <div className='strategyReadmore'>
                                          <Link to={`/singleHi/${data._id}`} >
                                          और पढ़ें...
                                          </Link>
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
            <>
        <div className='filterCard p-1 p-md-3 blackshadow mb-md-3 container_title_sec'>
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
    </>
  );
};

export default SearchScrean;



