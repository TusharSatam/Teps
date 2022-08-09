import React from 'react';
import './searchscrean.css'
import likeIcon from '../../asstes/like.svg'
import icon1 from '../../asstes/Group 70.svg'
import icon2 from '../../asstes/Group 71.svg'
import { useTranslation } from 'react-i18next';
import { Accordion, Card } from 'react-bootstrap';
import ContextAwareToggle from '../BootStrapCollapseBtn/ContextAwareToggle';
import EmptyCheckbox from '../../asstes/Rectangle 161.svg'
import checkCheckbox from '../../asstes/iconmonstr-checkbox-8 2.svg'
import OnlineIcon from '../../asstes/icons/online.svg'
import OfflineIcon from '../../asstes/icons/offline.svg'
import ChatIcon from '../../asstes/icons/chat.svg'
import KnowledgeIcon from '../../asstes/icons/knowledge.svg'
import Physical from '../../asstes/icons/Motor-Physical.png'
import Social from '../../asstes/icons/Socio-Emotional-Ethical.png'
import LikeIcon from '../../asstes/icons/Like.svg'
import LikedIcon from '../../asstes/icons/Liked.svg'
import SaveIcon from '../../asstes/icons/Save.svg'
import SavedIcon from '../../asstes/icons/Saved.svg'
import LanguageSelect from '../../languageSelect';
import { useAuth } from '../../Context/AuthContext';
import HomeLayout from '../Home/HomeLayout';
import HomeHindiLayout from '../Home/HomeHindiLayout';
import { getSingleUser, updateUser } from '../../services/dashboardUsers';
const SearchScrean = () => {
  const { stratigyFilData, selectLang, user, setUser } = useAuth()
  const [show, setShow] = React.useState([]);
  const [showH, setShowH] = React.useState([]);
  const [react, setReact] = React.useState(user ? user?.saveId : []);
  const [like, setLike] = React.useState(user ? user?.saveReact : []);
  const { t } = useTranslation();

  const uniqueSubSubTopic = Array.from(new Set(stratigyFilData?.map(a => a['Learning Outcome'])))
    .map(learning_outcome => {
      return stratigyFilData?.find(a => a['Learning Outcome'] === learning_outcome)
    });

  const uniqueHindiSubSubTopic = Array.from(new Set(stratigyFilData?.map(a => a['शिक्षण के परिणाम'])))
    .map(learning_outcome => {
      return stratigyFilData?.find(a => a['शिक्षण के परिणाम'] === learning_outcome)
    });

  const handleCheckbox = async (e) => {

    if (show.includes(e)) {
      for (var i = 0; i < show.length; i++) {
        if (show[i] === e) {
          show.splice(i, 1);
          i--;
        }
      }
    }
    else {
      show.push(e)
    }
    setShow([...show], [show]);
  }
  const handleCheckboxH = async (e) => {

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
  const handleReact = async (e) => {
    if (react?.includes(e)) {
      for (var i = 0; i < react.length; i++) {
        if (react[i] === e) {
          react?.splice(i, 1);
          i--;
        }
      }
    }
    else {
      react?.push(e)
    }
    setReact([...react], [react]);
  }
  React.useEffect(() => {
    const data = { "saveId": react }
    if (react) {
      updateUser(user._id, data)
        .then(res => {
          getSingleUser(user._id)
            .then(res => {
              window.localStorage.setItem('data', JSON.stringify(res.data[0]));
              setUser(res.data[0]);
            })
        })
    }
  }, [react, user, setUser])

  const handleLike = async (e) => {

    if (like?.includes(e)) {
      for (var i = 0; i < like.length; i++) {
        if (like[i] === e) {
          like.splice(i, 1);
          i--;
        }
      }
    }
    else {
      like.push(e)
    }
    setLike([...like], [like]);
  }

  React.useEffect(() => {
    const data = { "saveReact": like }
    if (like) {
      updateUser(user._id, data)
        .then(res => {
          getSingleUser(user._id)
            .then(res => {
              window.localStorage.setItem('data', JSON.stringify(res.data[0]));
              setUser(res.data[0]);
            })
        })
    }
  }, [like, user, setUser])
  // console.log(uniqueHindiSubSubTopic[0]['Learning Outcome'] ? true : false);
  // console.log(uniqueSubSubTopic[0]['शिक्षण के परिणाम'] ? true : false);
  // const selectedDropdown = localStorage.getItem('');

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
  console.log(show);
  return (
    <>
      <>
        <div className='stratigy_bg'>
          {
            selectLang === 'hindi' ?
              <HomeHindiLayout /> :
              <HomeLayout />
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
                    <p className='mt-md-5'> <span className='sub-title'>{t("Sub sub - topic")}:&nbsp;&nbsp;</span> <span className='sub-subtitle'>{selectLang === 'english' ? (uniqueSubSubTopic[0] === undefined ? '' : uniqueSubSubTopic[0]['Sub-sub topic']) : (uniqueHindiSubSubTopic[0] === undefined ? '' : uniqueHindiSubSubTopic[0]['शिक्षण के परिणाम'])}</span> </p>
                    <p className='mt-md-4 sub_sub_title'> {t("Learning Outcomes")} </p>
                  </div>
                  <div className='dropDownContainer mb-5'>
                    <Accordion defaultActiveKey="0" alwaysOpen >
                      {
                        uniqueSubSubTopic?.map((data, index) => (
                          <Card className='border-0 '>
                            <Card.Header className={index === 0 ? 'd-flex align-items-center p-0 border-top' : 'd-flex align-items-center p-0'} style={{ background: "#FFFFFF" }}>
                              <ContextAwareToggle eventKey={index + 1}>{show?.includes(index) ? <img className="checkbox_size" onClick={() => handleCheckbox(index)} src={checkCheckbox} alt="" /> : <img className='checkbox_size' onClick={() => handleCheckbox(index)} src={EmptyCheckbox} alt="" />}</ContextAwareToggle>
                              <p className='mt-3 checkBox_title'>{data['Learning Outcome']}</p>
                            </Card.Header>
                            <Accordion.Collapse eventKey={index + 1} className="acordonia_coll">
                              <Card.Body style={{ background: "#FFFFFF" }} className='border-bottom card_pad'>
                                <div className='my-4'>
                                  {
                                    stratigyFilData?.filter(res => res['Learning Outcome'] === data['Learning Outcome']).map((data, index) => (
                                      <div className='d-flex justify-content-between my-4 '>
                                        <div className='me-1'>
                                          <div className='d-flex'>
                                            <p className='Strategy_count'>{t("strategy")}</p>
                                            <p className='counter_str'>{index + 1}</p>
                                          </div>
                                          <div className='d-block d-md-none mt-1'>
                                            <div className='icon_heading_text me-1 p-1'>Developmental Domains</div>
                                            <div className=' mt-1' style={{ marginLeft: "20px" }}>
                                              <div className='res_btn_icon'>
                                                <div className='d-flex flex-column res_inner_div p-1 '>
                                                  {
                                                    !data['Dev Dom 1'] ? <div className='threeIcons'></div> :
                                                      data['Dev Dom 1'] === "Cognitive Sensory" ?
                                                        <img title="Cognitive Sensory" className='threeIcons mb-1' src={KnowledgeIcon} alt="" /> :
                                                        <img title="Motor-Physical" className='threeIcons mb-1' src={Physical} alt="" />
                                                  }
                                                  {
                                                    !data['Dev Dom 2'] ? <div className='threeIcons'></div> :
                                                      data['Dev Dom 2'] === "Socio-Emotional-Ethical" ?
                                                        <img title='Socio-Emotional-Ethical' className='threeIcons mb-1' src={Social} alt="" /> :
                                                        <img title='Language & Communication' className='threeIcons mb-1' src={ChatIcon} alt="" />
                                                  }
                                                </div>
                                              </div>
                                              <div className='ms-1'>
                                                {
                                                  data['Mode of Teaching'] === "Online" ?
                                                    <img title='Online' className='threeIcons' src={OnlineIcon} alt="" /> :
                                                    <img title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                                                }
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className='col-9 ms-4 col-md-8 Strategy_count_article'>
                                          <p>
                                            {data["Teaching Strategy"]}
                                          </p>
                                          <div className='d-flex align-items-center my-3'>
                                            {react?.includes(data._id) ? <img onClick={() => handleReact(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SavedIcon} alt="" /> : <img onClick={() => handleReact(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SaveIcon} alt="" />}
                                            {like.includes(data._id) ? <img onClick={() => handleLike(data._id)} style={{ cursor: "pointer" }} className="save_likes" src={LikedIcon} alt="" /> : <img onClick={() => handleLike(data._id)} style={{ cursor: "pointer" }} className="save_likes" src={LikeIcon} alt="" />}

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
                                                  !data['Dev Dom 1'] ? <div className='threeIcons'></div> :
                                                    data['Dev Dom 1'] === "Cognitive Sensory" ?
                                                      <img title="Cognitive Sensory" className='threeIcons ' src={KnowledgeIcon} alt="" /> :
                                                      <img title="Motor-Physical" className='threeIcons ' src={Physical} alt="" />
                                                }
                                                {
                                                  !data['Dev Dom 2'] ? <div className='threeIcons'></div> :
                                                    data['Dev Dom 2'] === "Socio-Emotional-Ethical" ?
                                                      <img title='Socio-Emotional-Ethical' className='threeIcons ms-3' src={Social} alt="" /> :
                                                      <img title='Language & Communication' className='threeIcons ms-3' src={ChatIcon} alt="" />
                                                }
                                              </div>
                                              {
                                                data['Mode of Teaching'] === "Online" ?
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
                    <div className='dropDownContainer mb-5'>
                      <Accordion defaultActiveKey="0" alwaysOpen >

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
                                          <div className='me-1'>
                                            <div className='d-flex'>
                                              <p className='Strategy_count'>{t("strategy")}</p>
                                              <p className='counter_str'>{index + 1}</p>
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
                                          <div className='col-9 col-md-8 Strategy_count_article'>
                                            <p>
                                              {data["शिक्षण रणनीति"]}
                                            </p>
                                            <div className='d-flex align-items-center my-3'>
                                              {react?.includes(data._id) ? <img onClick={() => handleReact(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SavedIcon} alt="" /> : <img onClick={() => handleReact(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SaveIcon} alt="" />}
                                              {like?.includes(data._id) ? <img onClick={() => handleLike(data._id)} style={{ cursor: "pointer" }} className="save_likes" src={LikedIcon} alt="" /> : <img onClick={() => handleLike(data._id)} style={{ cursor: "pointer" }} className="save_likes" src={LikeIcon} alt="" />}

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
                                                    !data['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons'></div> :
                                                      data['विकासात्मक क्षेत्र 1'] === "संज्ञानात्मक संवेदी" ?
                                                        <img title="संज्ञानात्मक संवेदी" className='threeIcons' src={KnowledgeIcon} alt="" /> :
                                                        <img title="मोटर-भौतिक" className='threeIcons' src={Physical} alt="" />
                                                  }
                                                  {
                                                    !data['विकासात्मक क्षेत्र 2'] ? <div className='threeIcons'></div> :
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



