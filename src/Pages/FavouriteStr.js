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
import HomeLayout from "../Components/Home/HomeLayout"
import { useState } from 'react';
import './styles/saveStratigy.css'
import { getMultitStr } from '../services/stratigyes';
import { getSingleUser, updateUser } from '../services/dashboardUsers';
import FilterStr from '../Components/Home/FilterStr';
import { Link } from 'react-router-dom';

const FavouriteStr = () => {
  const { user, setUser, stratigyFilData } = useAuth()
  const [filetr, setFilter] = useState(false)
  const [favStratigy, setFavStratigy] = useState([])
  const [like, setLike] = React.useState(user ? user?.saveReact : []);
  const { t } = useTranslation();
  const handleFilter = () => {
    if (filetr) {
      setFilter(false)
    }
    else {
      setFilter(true)
    }
  }
  React.useEffect(() => {
    getMultitStr(user.saveReact)
      .then(res => {
        setFavStratigy(res.data);
      })
      .catch(err => setFavStratigy([]))
  }, [user.saveReact])

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

  return (
    <div>
      <div className='saveStrParent' >
        <div className='row py-2'>
          <div className='col-md-1'></div>
          <div className='col-8 col-md-10 text-white text-center headText mt-2 mt-md-0'>{user.firstName}{user.lastName}{t("’s")} {t("Favourite Strategies")}</div>
          <div onClick={handleFilter} className='col-md-1 bg-white py-1 px-3' style={{ borderRadius: "27px", width: "90px", cursor: "pointer" }}>
            <span style={{ color: "#1AA05B" }}>{t("Filter")}</span>
            <img src={Filter} alt="" />
          </div>
        </div>
        <div className={filetr ? 'd-block' : 'd-none'}>
          <FilterStr
            stratigy={favStratigy}
          />
        </div>
      </div>
      {
        favStratigy?.length === 0 ? <h3 className='my-5 text-center py-5 text-danger'>{t("No Favourite Strategies available.")}</h3> :
          stratigyFilData?.length !== 0 ? stratigyFilData?.map((res, index) => (
            <Link to={`/single/${res._id}`} style={{ textDecoration: "none", color: 'black' }}>
              <div key={index} className='container'>
                <div style={{ background: "#FFFFFF" }} className='card_pad'>
                  <div className='my-4'>
                    <div className='d-flex justify-content-between my-4 '>
                      <div className='me-1'>
                        <div>
                          <div className='d-flex mb-3'>
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
                                  !res['Dev Dom 1'] ? <div className='threeIcons'></div> :
                                    res['Dev Dom 1'] === "Cognitive Sensory" ?
                                      <img title="Cognitive Sensory" className='threeIcons mb-1' src={KnowledgeIcon} alt="" /> :
                                      <img title="Motor-Physical" className='threeIcons mb-1' src={Physical} alt="" />
                                }
                                {
                                  !res['Dev Dom 2'] ? <div className='threeIcons'></div> :
                                    res['Dev Dom 2'] === "Socio-Emotional-Ethical" ?
                                      <img title='Socio-Emotional-Ethical' className='threeIcons mb-1' src={Social} alt="" /> :
                                      <img title='Language & Communication' className='threeIcons mb-1' src={ChatIcon} alt="" />
                                }
                              </div>
                            </div>
                            <div className='ms-1'>
                              {
                                res['Mode of Teaching'] === "Online" ?
                                  <img title='Online' className='threeIcons' src={OnlineIcon} alt="" /> :
                                  <img title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='col-9 ms-4 col-md-8 '>
                        <p className='savestr_head'>Learning Outcome: {res["Learning Outcome"]}</p>
                        <p className='savestr_body'>
                          {res["Teaching Strategy"]}
                        </p>
                        <div className='d-flex align-items-center my-3'>
                          {like.includes(res._id) ? <img onClick={() => handleLike(res._id)} style={{ cursor: "pointer" }} className="save_likes" src={LikedIcon} alt="" /> : <img onClick={() => handleLike(res._id)} style={{ cursor: "pointer" }} className="save_likes" src={LikeIcon} alt="" />}
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
                                !res['Dev Dom 1'] ? <div className='threeIcons-nun'></div> :
                                  res['Dev Dom 1'] === "Cognitive Sensory" ?
                                    <img title="Cognitive Sensory" className='threeIcons ' src={KnowledgeIcon} alt="" /> :
                                    <img title="Motor-Physical" className='threeIcons ' src={Physical} alt="" />
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
            </Link>
          )) :
            favStratigy?.map((data, index) => (
              <div key={index} className='container'>
                <div style={{ background: "#FFFFFF" }} className='card_pad'>
                  <div className='my-4'>
                    <div className='d-flex justify-content-between my-4 '>
                      <Link to={`/single/${data._id}`} style={{ textDecoration: "none", color: 'black' }}>
                        <div className='me-1'>
                          <div>
                            <div className='d-flex mb-3'>
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
                      </Link>
                      <div className='col-9 ms-4 col-md-8 '>
                        <Link to={`/single/${data._id}`} style={{ textDecoration: "none", color: 'black' }}>

                          <p className='savestr_head'>Learning Outcome: {data["Learning Outcome"]}</p>
                          <p className='savestr_body'>
                            {data["Teaching Strategy"]}
                          </p>
                        </Link>
                        <div className='d-flex align-items-center my-3'>
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
                                !data['Dev Dom 1'] ? <div className='threeIcons-nun'></div> :
                                  data['Dev Dom 1'] === "Cognitive Sensory" ?
                                    <img title="Cognitive Sensory" className='threeIcons ' src={KnowledgeIcon} alt="" /> :
                                    <img title="Motor-Physical" className='threeIcons ' src={Physical} alt="" />
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
    </div>
  );
};

export default FavouriteStr;