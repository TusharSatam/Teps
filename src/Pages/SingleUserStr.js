import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles/saveStratigy.css'
import OfflineIcon from '../asstes/icons/offline.svg'
import ChatIcon from '../asstes/icons/chat.svg'
import KnowledgeIcon from '../asstes/icons/knowledge.svg'
import Physical from '../asstes/icons/Motor-Physical.png'
import Social from '../asstes/icons/Socio-Emotional-Ethical.png'
import OnlineIcon from '../asstes/icons/online.svg'
import LikeIcon from '../asstes/icons/Like.svg'
import LikedIcon from '../asstes/icons/Liked.svg'
import SaveIcon from '../asstes/icons/Save.svg'
import SavedIcon from '../asstes/icons/Saved.svg'
import DownArrow from '../asstes/icons/DownArrow.svg'
import UpArrow from '../asstes/icons/upArrow.svg'
import { useTranslation } from 'react-i18next';
import { getSingleUser, getUsers, updateUser } from '../services/dashboardUsers';
import { useAuth } from '../Context/AuthContext';
import LikeByModal from '../Components/Modal/LikeByModal';
import { singleUserEnStratigys } from '../services/userStratigy';
import UserImage from '../asstes/Group 51.svg'
import { Buffer } from 'buffer';
import { postcomment } from '../services/stratigyes';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';
import { delLikes, getLikes, postLikes } from '../services/userLikes';
import { delSaves, getSaves, postSaves } from '../services/userSaves';

const SingleUserStr = () => {
  const { user, setUser } = useAuth()
  const [str, setStr] = React.useState([])
  const [seeComment, setSeecomment] = React.useState(false)
  const [allUser, setAllUser] = React.useState([])
  const { id } = useParams();
  const { t } = useTranslation();
  const [react, setReact] = React.useState(user ? user?.saveId : []);
  const [like, setLike] = React.useState(user ? user?.saveReact : []);
  const [comment, setComment] = React.useState([])
  React.useEffect(() => {
    singleUserEnStratigys(id)
      .then(res => {
        setStr(res.data[0]);
        setComment(res.data[1]?.comments)
      })
  }, [])

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

  const handleSeeComment = () => {
    if (seeComment) {
      setSeecomment(false)
    }
    else {
      setSeecomment(true)
    }
  }

  React.useEffect(() => {
    getUsers()
      .then(res => {
        setAllUser(res.data);
      })
  }, [])
  const totalSave = allUser.filter(res => res.saveId.includes(id));
  const totalReact = allUser.filter(res => res.saveReact.includes(id));
  const [show, setShow] = React.useState(false)
  const showReact = () => {
    if (show) {
      setShow(false)
    }
    if (totalReact.length === 0) {
      setShow(false)
    }
    else {
      setShow(true)
    }
  }
  const handleComment = (e) => {
    e.preventDefault()
    const data = {
      "strategie_id": id,
      "user_name": `${user.firstName} ${user.lastName}`,
      "comment": e.target.comment.value,
      "postTime": new Date()
    }
    postcomment(data)
      .then(res => {
<<<<<<< HEAD
        // console.log('comm', res);
=======
>>>>>>> 97fd27a1730d361537a24279bd0413fbd1fc4f85
        singleUserEnStratigys(id)
          .then(res => {
            setStr(res.data[0]);
            setComment(res.data[1]?.comments);
            e.target.reset()
          })
      })
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {user.firstName}
    </Tooltip>
  );
  const [userLikes, setUserLikes] = useState([]);
  const [totalUserLikes, setTotalUserLikes] = useState(0);
  React.useEffect(() => {
    getLikes()
      .then(res => {
        const totalLike = res?.data?.filter(ress => ress.strategie_id === id)
        setTotalUserLikes(totalLike.length)
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
            const totalLike = res?.data?.filter(ress => ress.strategie_id === id)
            setTotalUserLikes(totalLike.length)
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
            const totalLike = res?.data?.filter(ress => ress.strategie_id === id)
            setTotalUserLikes(totalLike.length)
            const userlike = res?.data?.filter(ress => ress.user_id === user._id)
            setUserLikes(userlike?.map(ress => ress.strategie_id))
          })
      })
  }

  const [userSaves, setUserSaves] = useState([]);
  const [totalUserSaves, setTotalUserSaves] = useState(0);
  React.useEffect(() => {
    getSaves()
      .then(res => {
        const totalSave = res?.data?.filter(ress => ress.strategie_id === id)
        setTotalUserSaves(totalSave.length)
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
            const totalSave = res?.data?.filter(ress => ress.strategie_id === id)
            setTotalUserSaves(totalSave.length)
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
            const totalSave = res?.data?.filter(ress => ress.strategie_id === id)
            setTotalUserSaves(totalSave.length)
            const userSave = res?.data?.filter(ress => ress.user_id === user._id)
            setUserSaves(userSave?.map(ress => ress.strategie_id))
          })
      })
  }
  return (
    <div>
      <LikeByModal
        show={show}
        handleClose={() => setShow(false)}
        totalReact={totalReact}
      />
      <div className='saveStrParent' >
        <div className='text-white text-center headText mt-2 mt-md-0'>{t("Strategy screen")}</div>
      </div>
      <div className='mx-3 mx-md-5'>
        <p className='single_str_head'>{str?.Subject} &gt; {str?.Grade} &gt; {str?.Skill} &gt; {str?.Topic} &gt; {str[`Sub Topic`]} &gt; {str['Sub-sub topic']}</p>
      </div>
      <div className='mx-5'>
        <div style={{ background: "#FFFFFF" }} className='card_pad'>
          <div className='my-4'>
            <div className='d-flex justify-content-between my-4 '>
              <div className='me-1'>
                <div>
                  <div className=' mb-4 mb-md-3'>
                    <p className='Strategy_count'>{t("strategy")}</p>
                    <p className='uni_id'>ID-{str && str?._id?.slice(19, 26)}</p>
                    <p className='user_str'>Uploaded By - {
                      user.image ?
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <img className='label' style={{ width: "26px", height: "26px", borderRadius: '1000px' }} src={`data:${user?.image?.contentType};base64,${Buffer.from(user?.image?.data?.data).toString('base64')}`} alt="" />
                        </OverlayTrigger>
                        :
                        <img src={UserImage} alt="person pic" />
                    } </p>
                  </div>
                </div>
                <div className='d-block d-md-none mt-1'>
                  <div className='icon_heading_text p-1'>Development Domains</div>
                  <div className=' mt-1'>
                    <div className='res_btn_icon'>
                      <div className='d-flex flex-column res_inner_div p-1 '>
                        {
                          !str['Dev Dom 1'] ? <div className='threeIcons'></div> :
                            str['Dev Dom 1'] === "Cognitive Sensory" ?
                              <div className='d-flex flex-column align-items-center justify-content-center'>
                                <div>
                                  <img title="Cognitive Sensory" className='threeIcons mb-1' src={KnowledgeIcon} alt="" />
                                </div>
                                <p className='dev_dpm_text'>Cognitive Sensory</p>
                              </div> :
                              <div className='d-flex flex-column align-items-center justify-content-center'>
                                <div>
                                  <img title="Motor-Physical" className='threeIcons mb-1' src={Physical} alt="" />
                                </div>
                                <p className='dev_dpm_text'>Motor-Physical</p>
                              </div>
                        }
                        {
                          !str['Dev Dom 2'] ? <div className='threeIcons'></div> :
                            str['Dev Dom 2'] === "Socio-Emotional-Ethical" ?
                              <div className='d-flex flex-column align-items-center justify-content-center'>
                                <div>
                                  <img title='Socio-Emotional-Ethical' className='threeIcons mb-1' src={Social} alt="" />
                                </div>
                                <p className='dev_dpm_text'>Socio-Emotional-Ethical</p>
                              </div> :
                              <div className='d-flex flex-column align-items-center justify-content-center'>
                                <div>
                                  <img title='Language & Communication' className='threeIcons mb-1' src={ChatIcon} alt="" />
                                </div>
                                <p className='dev_dpm_text'>Language & Communication</p>
                              </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-9 ms-4 col-md-7 '>
                <p className='savestr_head'>{t("Learning Outcomes")}: {str["Learning Outcome"]}</p>
                <p className='savestr_body'>
                  {str["Teaching Strategy"]}
                </p>
                <div className='d-flex justify-content-between my-2'>
                  <div className='d-flex align-items-center'>
                    <div>
                      <div className='mx-2'>
                        {userSaves?.includes(str?._id) ? <img onClick={() => handleApiUnSaves(str?._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SavedIcon} alt="" /> : <img onClick={() => handleApiSaves(str?._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SaveIcon} alt="" />}
                      </div>
                      <p className='count_num'>{totalUserSaves}</p>
                    </div>
                    <div className='mx-3'>
                      <div>
                        {userLikes.includes(str?._id) ? <img onClick={() => handleApiUnLikes(str?._id)} style={{ cursor: "pointer" }} className="save_likes" src={LikedIcon} alt="" /> : <img onClick={() => handleApiLikes(str?._id)} style={{ cursor: "pointer" }} className="save_likes" src={LikeIcon} alt="" />}
                      </div>
                      <p style={{ cursor: "pointer" }} onClick={showReact} className='count_num'>{totalUserLikes}</p>
                    </div>
                  </div>
                  <div className='me-md-3 me-0'>
                    {
                      str['Mode of Teaching'] === "Online" ?
                        <img title='Online' className='threeIcons' src={OnlineIcon} alt="" /> :
                        <img title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                    }
                  </div>
                </div>
              </div>
              <div className='col-md-3 d-none d-md-block dev_dom_bg'>
                <div className='d-flex flex-column align-items-center justify-content-center'>
                  <div className='mt-3'>
                    <span className='Dev_dom'>{t("Developmental Domains")}</span>
                  </div>
                  <div className='d-flex align-items-center justify-content-center mt-md-2'>
                    <div className='p-3 m-2 icon_bg'>
                      <div>
                        {
                          !str['Dev Dom 1'] ? <div className='threeIcons-nun'></div> :
                            str['Dev Dom 1'] === "Cognitive Sensory" ?
                              <div className='d-flex dev_dom_single'>
                                <img title="Cognitive Sensory" className='threeIcons ' src={KnowledgeIcon} alt="" />
                                <p className='dev_dpm_text'>Cognitive Sensory</p>
                              </div> :
                              <div className='d-flex dev_dom_single'>
                                <img title="Motor-Physical" className='threeIcons ' src={Physical} alt="" />
                                <p className='dev_dpm_text'>Motor-Physical</p>
                              </div>
                        }
                      </div>
                      <div>
                        {
                          !str['Dev Dom 2'] ? <div className='threeIcons-nun'></div> :
                            str['Dev Dom 2'] === "Socio-Emotional-Ethical" ?
                              <div className='d-flex'>
                                <img title='Socio-Emotional-Ethical' className='threeIcons' src={Social} alt="" />
                                <p className='dev_dpm_text'>Socio-Emotional-Ethical</p>
                              </div> :
                              <div className='d-flex'>
                                <img title='Language & Communication' className='threeIcons' src={ChatIcon} alt="" />
                                <p className='dev_dpm_text'>Language and Communication</p>
                              </div>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='comment_div d-none d-md-block'>
              <p className='comment_div_p'>{t("Comments")}</p>
              <form onSubmit={handleComment}>
                <div>
                  <input name='comment' placeholder={`${t("Add a comment")}...`} className='w-100 comment_input' type="text" />
                </div>
                <div className='d-flex justify-content-end comment_submit'>
                  <input type="submit" value={`${t('Submit')}`} />
                </div>
              </form>
              <div className={!seeComment ? "d-block" : "d-none"}>
                <div onClick={handleSeeComment} className="text-center see_comment">
                  <p className='m-0'>{t("View comments")} {comment?.length} <img src={DownArrow} alt="" /></p>
                </div>
              </div>
              <div className={seeComment ? "d-block" : "d-none"}>
                <div onClick={handleSeeComment} className='text-center see_comment'>
                  <p className='m-0'>{t("Hide comments")} {comment?.length} <img src={UpArrow} alt="" /></p>
                </div>
                {
                  comment?.map((res, index) => (
                    <div key={index} className='mt-4'>
                      <p className='comment_head'>{res.user_name} <span className='comment_span'>{moment(res.postTime).startOf('day').fromNow()}</span></p>
                      <p className='comment_text'>{res.comment}
                      </p>
                      <hr />
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='comment_div d-block d-md-none'>
        <p className='comment_div_p'>Comments</p>
        <form onSubmit={handleComment}>
          <div>
            <input name='comment' placeholder='Add a comment...' className='w-100 comment_input' type="text" />
          </div>
          <div className='d-flex justify-content-end comment_submit'>
            <input type="submit" />
          </div>
        </form>
        <div className={!seeComment ? "d-block" : "d-none"}>
          <div onClick={handleSeeComment} className="text-center see_comment">
            <p className='m-0'>View comments {comment?.length} <img src={DownArrow} alt="" /></p>
          </div>
        </div>
        <div className={seeComment ? "d-block" : "d-none"}>
          <div onClick={handleSeeComment} className='text-center see_comment'>
            <p className='m-0'>Hide comments {comment?.length} <img src={UpArrow} alt="" /></p>
          </div>
          {
            comment?.map((res, index) => (
              <div key={index} className='mt-4'>
                <p className='comment_head'>{res.user_name} <span className='comment_span'>Days/weeks/months ago</span></p>
                <p className='comment_text'>{res.comment}
                </p>
                <hr />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default SingleUserStr;