import React from 'react';
import OfflineIcon from '../asstes/icons/offline.svg'
import ChatIcon from '../asstes/icons/chat.svg'
import KnowledgeIcon from '../asstes/icons/knowledge.svg'
import Physical from '../asstes/icons/Motor-Physical.png'
import Social from '../asstes/icons/Socio-Emotional-Ethical.png'
import LikeIcon from '../asstes/icons/Like.svg'
import LikedIcon from '../asstes/icons/Liked.svg'
import OnlineIcon from '../asstes/icons/online.svg'
import { useTranslation } from 'react-i18next';
import { useAuth } from '../Context/AuthContext';
import Filter from "../asstes/Filter.svg"
import FilterHover from "../asstes/icons/filter_icon.svg"
import HomeLayout from "../Components/Home/HomeLayout"
import { useState } from 'react';
import './styles/saveStratigy.css'
import { getMultitStr } from '../services/stratigyes';
import { getSingleUser, updateUser } from '../services/dashboardUsers';
import FilterStr from '../Components/Home/FilterStr';
import { Link } from 'react-router-dom';
import { getMultitHiStr } from '../services/hindiStratigys';
import { delLikes, getLikes, postLikes } from '../services/userLikes';
import { getMultiUsertStr } from '../services/userStratigy';
import { getMultiUserHindiStr } from '../services/userStratigyHi';
import { OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import UserImage from '../asstes/Group 51.svg'
import { Buffer } from 'buffer';

const FavouriteStr = () => {
  const { user, setUser, stratigyFilData } = useAuth()
  const [filetr, setFilter] = useState(false)
  const [favStratigy, setFavStratigy] = useState([])
  const [like, setLike] = React.useState(user ? user?.saveReact : []);
  const [favStratigyHi, setfavStratigyi] = useState([])
  const [languageSelect, setLanguageSelect] = React.useState("en")
  const { t } = useTranslation();
  const [likeUserStratigy, setlikeUserStratigy] = useState([])
  const [likeStratigyHiUser, setlikeStratigyiUser] = useState([])
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

  const [likes, setLikes] = useState([])
  React.useEffect(() => {
    setIsLoading(true)
    getLikes()
      .then(res => {
        const like = res?.data?.filter(ress => ress.user_id === user._id)
        const likeId = like?.map(ress => ress.strategie_id)
        setLikes(like?.map(ress => ress.strategie_id))
        if (languageSelect === "en") {
          getMultitStr(likeId)
            .then(res => {
              setFavStratigy(res.data);
              setIsLoading(false);
            })
            .catch(err => {
              setIsLoading(false)
              setFavStratigy([])
            })
          getMultiUsertStr(likeId)
            .then(res => {
              setlikeUserStratigy(res.data);
              setIsLoading(false)
            })
            .catch(err => {
              setIsLoading(false)
              setlikeUserStratigy([])
            })
        }
        else {
          getMultitHiStr(likeId)
            .then(res => {
              setfavStratigyi(res.data)
              setIsLoading(false)
            })
          getMultiUserHindiStr(likeId)
            .then(res => {
              setlikeStratigyiUser(res.data);
              setIsLoading(false)
            })
            .catch(err => {
              setIsLoading(false)
              setlikeStratigyiUser([])
            })
        }
      })

  }, [languageSelect])

  const handleApiLikes = (id) => {
    const data = {
      strategie_id: id,
      user_id: user._id
    }
    postLikes(data)
      .then(res => {
        getLikes()
          .then(res => {
            const like = res?.data?.filter(ress => ress.user_id === user._id)
            const likeId = like?.map(ress => ress.strategie_id)
            setLikes(like?.map(ress => ress.strategie_id))
            if (languageSelect === "en") {
              getMultitStr(likeId)
                .then(res => {
                  setFavStratigy(res.data);
                })
                .catch(err => setFavStratigy([]))
              getMultiUsertStr(likeId)
                .then(res => {
                  setlikeUserStratigy(res.data);
                })
                .catch(err => setlikeUserStratigy([]))
            }
            else {
              getMultitHiStr(likeId)
                .then(res => {
                  setfavStratigyi(res.data)
                })
              getMultiUserHindiStr(likeId)
                .then(res => {
                  setlikeStratigyiUser(res.data);
                })
                .catch(err => setlikeStratigyiUser([]))
            }
          })
      })
  }
  const handleApiUnLikes = (id) => {
    delLikes(id)
      .then(res => {
        getLikes()
          .then(res => {
            const like = res?.data?.filter(ress => ress.user_id === user._id)
            const likeId = like?.map(ress => ress.strategie_id)
            setLikes(like?.map(ress => ress.strategie_id))
            if (languageSelect === "en") {
              getMultitStr(likeId)
                .then(res => {
                  setFavStratigy(res.data);
                })
                .catch(err => setFavStratigy([]))
              getMultiUsertStr(likeId)
                .then(res => {
                  setlikeUserStratigy(res.data);
                })
                .catch(err => setlikeUserStratigy([]))
            }
            else {
              getMultitHiStr(likeId)
                .then(res => {
                  setfavStratigyi(res.data)
                })
              getMultiUserHindiStr(likeId)
                .then(res => {
                  setlikeStratigyiUser(res.data);
                })
                .catch(err => setlikeStratigyiUser([]))
            }
          })
      })
  }
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
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {user.firstName}
    </Tooltip>)
  return (
    <div>
      {
        languageSelect === "en" ?
          <>
            <div className='saveStrParent' >
              <div className='row py-2'>
                <div className='d-flex justify-content-center'>
                  <span className=' text-white text-center headText w-50'>{user.firstName} {user.lastName}{t("’s")} {t("Favourite Strategies")}</span>
                </div>
                <div className='d-flex justify-content-end ' style={{ position: "absolute", top: "100" }}>
                  <div onClick={handleFilter} className='filter_bTn'>
                    <span className='me-1 me-md-0'>{t("Filter")}</span>
                    <img src={Filter} alt="" className='filtericon2' />
                    <img src={FilterHover} alt="" className='filtericon3' />
                  </div>
                </div>
              </div>
              <div className={filetr ? 'd-block' : 'd-none'}>
                <FilterStr
                  stratigy={favStratigy}
                />
              </div>
            </div>
            {
              isLoading ? <div style={{ marginLeft: "650px", marginTop: "150px", marginBottom: "150px" }}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div> :
                favStratigy?.length === 0 && likeUserStratigy.length === 0 ? <h1 className='my-5 text-center py-5 text-danger'>{t("No Favourite Strategies available.")}</h1> :
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
                                    {/* <span className='unique_id'>ID {data._id.slice(19, 26)}</span> */}
                                  </div>
                                  <div className='d-block d-md-none mt-1'>
                                    <div className='icon_heading_text me-1 p-1'>Development Domains</div>
                                    <div className=' mt-1' style={{ marginLeft: "20px" }}>
                                      <div className='res_btn_icon'>
                                        <div className='d-flex flex-column res_inner_div p-1 '>
                                          {
                                            !res['Dev Dom 1'] ? <div className='threeIcons'></div> :
                                              res['Dev Dom 1'] === "Cognitive Sensory" ?
                                                <img style={{ width: "20px", height: "20px" }} title="Cognitive Sensory" className='threeIcons mb-1' src={KnowledgeIcon} alt="" /> :
                                                <img style={{ width: "20px", height: "20px" }} title="Motor-Physical" className='threeIcons mb-1' src={Physical} alt="" />
                                          }
                                          {
                                            !res['Dev Dom 2'] ? <div className='threeIcons'></div> :
                                              res['Dev Dom 2'] === "Socio-Emotional-Ethical" ?
                                                <img style={{ width: "20px", height: "20px" }} title='Socio-Emotional-Ethical' className='threeIcons mb-1' src={Social} alt="" /> :
                                                <img style={{ width: "20px", height: "20px" }} title='Language & Communication' className='threeIcons mb-1' src={ChatIcon} alt="" />
                                          }
                                        </div>
                                      </div>
                                      <div className='ms-1'>
                                        {
                                          res['Mode of Teaching'] === "Online" ?
                                            <img style={{ width: "20px", height: "20px" }} title='Online' className='threeIcons' src={OnlineIcon} alt="" /> :
                                            <img style={{ width: "20px", height: "20px" }} title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                              <div className='col-9 ms-4 col-md-8 '>
                                <Link to={`/single/${res._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                  <p className='savestr_head'>Learning Outcome: {res["Learning Outcome"]}</p>
                                  <p className='savestr_body'>
                                    {res["Teaching Strategy"]}
                                  </p>
                                </Link>
                                <div className='d-flex align-items-center my-3'>
                                  {likes?.includes(res._id) ? <img onClick={() => handleApiUnLikes(res._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={LikedIcon} alt="" /> : <img onClick={() => handleApiLikes(res._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={LikeIcon} alt="" />}
                                </div>
                              </div>
                              <div className='col-md-2 d-none d-md-block ms-5'>
                                <div className='d-flex flex-column align-items-center justify-content-center'>
                                  <div>
                                    <span className='icons_heading'>Development Domains</span>
                                  </div>
                                  <div className='d-flex align-items-center justify-content-center mt-md-2'>
                                    <div className='d-flex align-items-center justify-content-center border p-2 me-2'>
                                      {
                                        !res['Dev Dom 1'] ? <div className='threeIcons-nun'></div> :
                                          res['Dev Dom 1'] === "Cognitive Sensory" ?
                                            <img title="Cognitive Sensory" className='threeIcons  mx-2' src={KnowledgeIcon} alt="" /> :
                                            <img title="Motor-Physical" className='threeIcons mx-2' src={Physical} alt="" />
                                      }
                                      {
                                        !res['Dev Dom 2'] ? <div className='threeIcons-nun'></div> :
                                          res['Dev Dom 2'] === "Socio-Emotional-Ethical" ?
                                            <img title='Socio-Emotional-Ethical' className='threeIcons ms-3' src={Social} alt="" /> :
                                            <img title='Language & Communication' className='threeIcons ms-3' src={ChatIcon} alt="" />
                                      }
                                    </div>
                                    {
                                      res['Mode of Teaching'] === "Online" ?
                                        <img title='Online' className='threeIcons' src={OnlineIcon} alt="" /> :
                                        <img title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
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
                      likeUserStratigy?.map((data, index) => (
                        <div key={index} className='container'>
                          <div style={{ background: "#FFFFFF" }} className='card_pad'>
                            <div className='my-4'>
                              <div className='d-flex justify-content-between my-4 '>
                                <Link to={`/singleUserStratigy/${data._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                  <div className='me-1'>
                                    <div>
                                      <div className='d-flex mb-md-3 str_text_left'>
                                        <p className='Strategy_count'>{t("strategy")}</p>
                                        <p className='counter_str'>{favStratigy.length + index + 1}</p>
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
                                      {/* <span className='unique_id'>ID {data._id.slice(19, 26)}</span> */}
                                    </div>
                                    <div className='d-block d-md-none mt-3 mt-md-1'>
                                      <div className='icon_heading_text me-1 p-1'>Developmental Domains</div>
                                      <div className=' mt-1' style={{ marginLeft: "20px" }}>
                                        <div className='res_btn_icon'>
                                          <div className='d-flex flex-column res_inner_div p-1 '>
                                            {
                                              !data['Dev Dom 1'] ? <div className='threeIcons'></div> :
                                                data['Dev Dom 1'] === "Cognitive Sensory" ?
                                                  <img style={{ width: "20px", height: "20px" }} title="Cognitive Sensory" className='threeIcons mb-1' src={KnowledgeIcon} alt="" /> :
                                                  <img style={{ width: "20px", height: "20px" }} title="Motor-Physical" className='threeIcons mb-1' src={Physical} alt="" />
                                            }
                                            {
                                              !data['Dev Dom 2'] ? <div className='threeIcons'></div> :
                                                data['Dev Dom 2'] === "Socio-Emotional-Ethical" ?
                                                  <img style={{ width: "20px", height: "20px" }} title='Socio-Emotional-Ethical' className='threeIcons mb-1' src={Social} alt="" /> :
                                                  <img style={{ width: "20px", height: "20px" }} title='Language & Communication' className='threeIcons mb-1' src={ChatIcon} alt="" />
                                            }
                                          </div>
                                        </div>
                                        <div className='ms-1'>
                                          {
                                            data['Mode of Teaching'] === "Online" ?
                                              <img style={{ width: "20px", height: "20px" }} title='Online' className='threeIcons' src={OnlineIcon} alt="" /> :
                                              <img style={{ width: "20px", height: "20px" }} title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                                          }
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                                <div className='col-9 ms-md-4 col-md-8 '>
                                  <Link to={`/singleUserStratigy/${data._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                    <p className='savestr_head'>Learning Outcome: {data["Learning Outcome"]}</p>
                                    <p className='savestr_body'>
                                      {data["Teaching Strategy"]}
                                    </p>
                                  </Link>
                                  <div className='d-flex justify-content-between my-3'>
                                    <div>
                                      {likes?.includes(data._id) ? <img onClick={() => handleApiUnLikes(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={LikedIcon} alt="" /> : <img onClick={() => handleApiLikes(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={LikeIcon} alt="" />}
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
                                    <div>
                                      <span className='icons_heading'>Development Domains</span>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-center mt-md-2'>
                                      <div className='d-flex align-items-center justify-content-center border p-2 me-2'>
                                        {
                                          !data['Dev Dom 1'] ? <div className='threeIcons-nun'></div> :
                                            data['Dev Dom 1'] === "Cognitive Sensory" ?
                                              <img title="Cognitive Sensory" className='threeIcons mx-2' src={KnowledgeIcon} alt="" /> :
                                              <img title="Motor-Physical" className='threeIcons mx-2' src={Physical} alt="" />
                                        }
                                        {
                                          !data['Dev Dom 2'] ? <div className='threeIcons-nun'></div> :
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
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </>
                    :
                    <>
                      {
                        favStratigy?.map((data, index) => (
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
                                        {/* <span className='unique_id'>ID {data._id.slice(19, 26)}</span> */}
                                      </div>
                                      <div className='d-block d-md-none mt-1'>
                                        <div className='icon_heading_text me-1 p-1'>Developmental Domains</div>
                                        <div className=' mt-1' style={{ marginLeft: "20px" }}>
                                          <div className='res_btn_icon'>
                                            <div className='d-flex flex-column res_inner_div p-1 '>
                                              {
                                                !data['Dev Dom 1'] ? <div className='threeIcons'></div> :
                                                  data['Dev Dom 1'] === "Cognitive Sensory" ?
                                                    <img style={{ width: "20px", height: "20px" }} title="Cognitive Sensory" className='threeIcons mb-1' src={KnowledgeIcon} alt="" /> :
                                                    <img style={{ width: "20px", height: "20px" }} title="Motor-Physical" className='threeIcons mb-1' src={Physical} alt="" />
                                              }
                                              {
                                                !data['Dev Dom 2'] ? <div className='threeIcons'></div> :
                                                  data['Dev Dom 2'] === "Socio-Emotional-Ethical" ?
                                                    <img style={{ width: "20px", height: "20px" }} title='Socio-Emotional-Ethical' className='threeIcons mb-1' src={Social} alt="" /> :
                                                    <img style={{ width: "20px", height: "20px" }} title='Language & Communication' className='threeIcons mb-1' src={ChatIcon} alt="" />
                                              }
                                            </div>
                                          </div>
                                          <div className='ms-1'>
                                            {
                                              data['Mode of Teaching'] === "Online" ?
                                                <img style={{ width: "20px", height: "20px" }} title='Online' className='threeIcons' src={OnlineIcon} alt="" /> :
                                                <img style={{ width: "20px", height: "20px" }} title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                  <div className='col-9 ms-4 col-md-8 '>
                                    <Link to={`/single/${data._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                      <p className='savestr_head'>Learning Outcome: {data["Learning Outcome"]}</p>
                                      <p className='savestr_body'>
                                        {data["Teaching Strategy"]}
                                      </p>
                                    </Link>
                                    <div className='d-flex align-items-center my-3'>
                                      {likes?.includes(data._id) ? <img onClick={() => handleApiUnLikes(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={LikedIcon} alt="" /> : <img onClick={() => handleApiLikes(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={LikeIcon} alt="" />}
                                    </div>
                                  </div>
                                  <div className='col-md-2 d-none d-md-block ms-5'>
                                    <div className='d-flex flex-column align-items-center justify-content-center'>
                                      <div>
                                        <span className='icons_heading'>Development Domains</span>
                                      </div>
                                      <div className='d-flex align-items-center justify-content-center mt-md-2'>
                                        <div className='d-flex align-items-center justify-content-center border p-2 me-2'>
                                          {
                                            !data['Dev Dom 1'] ? <div className='threeIcons-nun'></div> :
                                              data['Dev Dom 1'] === "Cognitive Sensory" ?
                                                <img title="Cognitive Sensory" className='threeIcons mx-2' src={KnowledgeIcon} alt="" /> :
                                                <img title="Motor-Physical" className='threeIcons mx-2' src={Physical} alt="" />
                                          }
                                          {
                                            !data['Dev Dom 2'] ? <div className='threeIcons-nun'></div> :
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
                              </div>
                            </div>
                          </div>
                        ))
                      }{
                        likeUserStratigy?.map((data, index) => (
                          <div key={index} className='container'>
                            <div style={{ background: "#FFFFFF" }} className='card_pad'>
                              <div className='my-4'>
                                <div className='d-flex justify-content-between my-4 '>
                                  <Link to={`/singleUserStratigy/${data._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                    <div className='me-1'>
                                      <div>
                                        <div className='d-flex mb-md-3 str_text_left'>
                                          <p className='Strategy_count'>{t("strategy")}</p>
                                          <p className='counter_str'>{favStratigy.length + index + 1}</p>
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
                                        {/* <span className='unique_id'>ID {data._id.slice(19, 26)}</span> */}
                                      </div>
                                      <div className='d-block d-md-none mt-3 mt-md-1'>
                                        <div className='icon_heading_text me-1 p-1'>Developmental Domains</div>
                                        <div className=' mt-1' style={{ marginLeft: "20px" }}>
                                          <div className='res_btn_icon'>
                                            <div className='d-flex flex-column res_inner_div p-1 '>
                                              {
                                                !data['Dev Dom 1'] ? <div className='threeIcons'></div> :
                                                  data['Dev Dom 1'] === "Cognitive Sensory" ?
                                                    <img style={{ width: "20px", height: "20px" }} title="Cognitive Sensory" className='threeIcons mb-1' src={KnowledgeIcon} alt="" /> :
                                                    <img style={{ width: "20px", height: "20px" }} title="Motor-Physical" className='threeIcons mb-1' src={Physical} alt="" />
                                              }
                                              {
                                                !data['Dev Dom 2'] ? <div className='threeIcons'></div> :
                                                  data['Dev Dom 2'] === "Socio-Emotional-Ethical" ?
                                                    <img style={{ width: "20px", height: "20px" }} title='Socio-Emotional-Ethical' className='threeIcons mb-1' src={Social} alt="" /> :
                                                    <img style={{ width: "20px", height: "20px" }} title='Language & Communication' className='threeIcons mb-1' src={ChatIcon} alt="" />
                                              }
                                            </div>
                                          </div>
                                          <div className='ms-1'>
                                            {
                                              data['Mode of Teaching'] === "Online" ?
                                                <img style={{ width: "20px", height: "20px" }} title='Online' className='threeIcons' src={OnlineIcon} alt="" /> :
                                                <img style={{ width: "20px", height: "20px" }} title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                                            }
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>
                                  <div className='col-9 ms-md-4 col-md-8 '>
                                    <Link to={`/singleUserStratigy/${data._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                      <p className='savestr_head'>Learning Outcome: {data["Learning Outcome"]}</p>
                                      <p className='savestr_body'>
                                        {data["Teaching Strategy"]}
                                      </p>
                                    </Link>
                                    <div className='d-flex justify-content-between my-3'>
                                      <div>
                                        {likes?.includes(data._id) ? <img onClick={() => handleApiUnLikes(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={LikedIcon} alt="" /> : <img onClick={() => handleApiLikes(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={LikeIcon} alt="" />}
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
                                      <div>
                                        <span className='icons_heading'>Development Domains</span>
                                      </div>
                                      <div className='d-flex align-items-center justify-content-center mt-md-2'>
                                        <div className='d-flex align-items-center justify-content-center border p-2 me-2'>
                                          {
                                            !data['Dev Dom 1'] ? <div className='threeIcons-nun'></div> :
                                              data['Dev Dom 1'] === "Cognitive Sensory" ?
                                                <img title="Cognitive Sensory" className='threeIcons mx-2' src={KnowledgeIcon} alt="" /> :
                                                <img title="Motor-Physical" className='threeIcons mx-2' src={Physical} alt="" />
                                          }
                                          {
                                            !data['Dev Dom 2'] ? <div className='threeIcons-nun'></div> :
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
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </>
            }
          </> :
          <>
            <div className='saveStrParent' >
              <div className='row py-2'>
                <div className='col-md-1'></div>
                <div className='col-8 col-md-10 text-white text-center headText mt-2 mt-md-0'>{user.firstName}{user.lastName}{t("’s")} {t("Favourite Strategies")}</div>
                <div onClick={handleFilter} className='col-md-1 bg-white py-1 px-3' style={{ borderRadius: "27px", width: "90px", cursor: "pointer" }}>
                  <span style={{ color: "#1AA05B" }}>{t("Filter")}</span>
                  <img src={Filter} className="filtericon3" alt="" />
                </div>
              </div>
              <div className={filetr ? 'd-block' : 'd-none'}>
                <FilterStr
                  stratigy={favStratigy}
                />
              </div>
            </div>
            {
              isLoading ? <div style={{ marginLeft: "650px", marginTop: "150px", marginBottom: "150px" }}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div> :
                favStratigyHi?.length === 0 ? <h1 className='my-5 text-center py-5 text-danger'>{t("No Saved Strategies available.")}</h1> :
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
                                <div className='col-9 ms-4 col-md-8 '>
                                  <Link to={`/singleHi/${res._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                    <p className='savestr_head'>{t("शिक्षण के परिणाम")}: {res["शिक्षण के परिणाम"]}</p>
                                    <p className='savestr_body'>
                                      {res["शिक्षण रणनीति"]}
                                    </p>
                                  </Link>
                                  <div className='d-flex align-items-center my-3'>
                                    {likes?.includes(res._id) ? <img onClick={() => handleApiUnLikes(res._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={LikedIcon} alt="" /> : <img onClick={() => handleApiLikes(res._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={LikeIcon} alt="" />}
                                  </div>
                                </div>
                                <div className='col-md-2 d-none d-md-block ms-5'>
                                  <div className='d-flex flex-column align-items-center justify-content-center'>
                                    <div>
                                      <span className='icons_heading'>विकासात्मक क्षेत्र</span>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-center mt-md-2'>
                                      <div className='d-flex align-items-center justify-content-center border p-2 me-2'>
                                        {
                                          !res['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons-nun'></div> :
                                            res['विकासात्मक क्षेत्र 1'] === "संज्ञानात्मक संवेदी" ?
                                              <img title="संज्ञानात्मक संवेदी" className='threeIcons mx-2' src={KnowledgeIcon} alt="" /> :
                                              <img title="मोटर-भौतिक" className='threeIcons mx-2' src={Physical} alt="" />
                                        }
                                        {
                                          !res['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons-nun'></div> :
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
                    }{
                      likeStratigyHiUser?.map((res, index) => (
                        <div key={index} className='container'>
                          <div style={{ background: "#FFFFFF" }} className='card_pad'>
                            <div className='my-4'>
                              <div className='d-flex justify-content-between my-4 '>
                                <Link to={`/singleHi/${res._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                  <div className='me-1'>
                                    <div>
                                      <div className='d-flex mb-3'>
                                        <p className='Strategy_count'>{t("strategy")}</p>
                                        <p className='counter_str'>{stratigyFilData.length + index + 1}</p>
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
                                <div className='col-9 ms-4 col-md-8 '>
                                  <Link to={`/singleHi/${res._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                    <p className='savestr_head'>{t("शिक्षण के परिणाम")}: {res["शिक्षण के परिणाम"]}</p>
                                    <p className='savestr_body'>
                                      {res["शिक्षण रणनीति"]}
                                    </p>
                                  </Link>
                                  <div className='d-flex align-items-center my-3'>
                                    {likes?.includes(res._id) ? <img onClick={() => handleApiUnLikes(res._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={LikedIcon} alt="" /> : <img onClick={() => handleApiLikes(res._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={LikeIcon} alt="" />}
                                  </div>
                                </div>
                                <div className='col-md-2 d-none d-md-block ms-5'>
                                  <div className='d-flex flex-column align-items-center justify-content-center'>
                                    <div>
                                      <span className='icons_heading'>विकासात्मक क्षेत्र</span>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-center mt-md-2'>
                                      <div className='d-flex align-items-center justify-content-center border p-2 me-2'>
                                        {
                                          !res['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons-nun'></div> :
                                            res['विकासात्मक क्षेत्र 1'] === "संज्ञानात्मक संवेदी" ?
                                              <img title="संज्ञानात्मक संवेदी" className='threeIcons mx-2' src={KnowledgeIcon} alt="" /> :
                                              <img title="मोटर-भौतिक" className='threeIcons mx-2' src={Physical} alt="" />
                                        }
                                        {
                                          !res['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons-nun'></div> :
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

                      favStratigyHi?.map((data, index) => (
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
                                <div className='col-9 ms-4 col-md-8 '>
                                  <Link to={`/singleHi/${data._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                    <p className='savestr_head'>शिक्षण के परिणाम: {data["शिक्षण के परिणाम"]}</p>
                                    <p className='savestr_body'>
                                      {data["शिक्षण रणनीति"]}
                                    </p>
                                  </Link>
                                  <div className='d-flex align-items-center my-3'>
                                    {likes?.includes(data._id) ? <img onClick={() => handleApiUnLikes(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={LikedIcon} alt="" /> : <img onClick={() => handleApiLikes(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={LikeIcon} alt="" />}
                                  </div>
                                </div>
                                <div className='col-md-2 d-none d-md-block ms-5'>
                                  <div className='d-flex flex-column align-items-center justify-content-center'>
                                    <div>
                                      <span className='icons_heading'>विकासात्मक क्षेत्र</span>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-center mt-md-2'>
                                      <div className='d-flex align-items-center justify-content-center border p-2 me-2'>
                                        {
                                          !data['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons-nun'></div> :
                                            data['विकासात्मक क्षेत्र 1'] === "संज्ञानात्मक संवेदी" ?
                                              <img title="संज्ञानात्मक संवेदी" className='threeIcons  mx-2' src={KnowledgeIcon} alt="" /> :
                                              <img title="मोटर-भौतिक" className='threeIcons  mx-2' src={Physical} alt="" />
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
                    }{
                        likeStratigyHiUser?.map((data, index) => (
                          <div key={index} className='container'>
                            <div style={{ background: "#FFFFFF" }} className='card_pad'>
                              <div className='my-4'>
                                <div className='d-flex justify-content-between my-4 '>
                                  <Link to={`/singleHi/${data._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                    <div className='me-1'>
                                      <div>
                                        <div className='d-flex mb-3'>
                                          <p className='Strategy_count'>{t("strategy")}</p>
                                          <p className='counter_str'>{favStratigyHi.length + index + 1}</p>
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
                                  <div className='col-9 ms-4 col-md-8 '>
                                    <Link to={`/singleHi/${data._id}`} style={{ textDecoration: "none", color: 'black' }}>
                                      <p className='savestr_head'>शिक्षण के परिणाम: {data["शिक्षण के परिणाम"]}</p>
                                      <p className='savestr_body'>
                                        {data["शिक्षण रणनीति"]}
                                      </p>
                                    </Link>
                                    <div className='d-flex align-items-center my-3'>
                                      {likes?.includes(data._id) ? <img onClick={() => handleApiUnLikes(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={LikedIcon} alt="" /> : <img onClick={() => handleApiLikes(data._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={LikeIcon} alt="" />}
                                    </div>
                                  </div>
                                  <div className='col-md-2 d-none d-md-block ms-5'>
                                    <div className='d-flex flex-column align-items-center justify-content-center'>
                                      <div>
                                        <span className='icons_heading'>विकासात्मक क्षेत्र</span>
                                      </div>
                                      <div className='d-flex align-items-center justify-content-center mt-md-2'>
                                        <div className='d-flex align-items-center justify-content-center border p-2 me-2'>
                                          {
                                            !data['विकासात्मक क्षेत्र 1'] ? <div className='threeIcons-nun'></div> :
                                              data['विकासात्मक क्षेत्र 1'] === "संज्ञानात्मक संवेदी" ?
                                                <img title="संज्ञानात्मक संवेदी" className='threeIcons  mx-2' src={KnowledgeIcon} alt="" /> :
                                                <img title="मोटर-भौतिक" className='threeIcons  mx-2' src={Physical} alt="" />
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
                      }</>
            }
          </>
      }

    </div>
  );
};

export default FavouriteStr;