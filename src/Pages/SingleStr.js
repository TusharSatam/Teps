import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import ChatIcon from '../asstes/icons/chat.svg';
import DownArrow from '../asstes/icons/DownArrow.svg';
import KnowledgeIcon from '../asstes/icons/knowledge.svg';
import LikeIcon from '../asstes/icons/Like.svg';
import LikedIcon from '../asstes/icons/Liked.svg';
import Physical from '../asstes/icons/Motor-Physical.png';
import OfflineIcon from '../asstes/icons/offline.svg';
import OnlineIcon from '../asstes/icons/online.svg';
import SaveIcon from '../asstes/icons/Save.svg';
import SavedIcon from '../asstes/icons/Saved.svg';
import Social from '../asstes/icons/Socio-Emotional-Ethical.png';
import UpArrow from '../asstes/icons/upArrow.svg';
import LikeByModal from '../Components/Modal/LikeByModal';
import DevelopmentalDomainIconSM from '../Components/SingleStr/DevelopmentalDomainIconSM';
import DevelopmentalDomainIconXL from '../Components/SingleStr/DevelopmentalDomainIconXL';
import { useAuth } from '../Context/AuthContext';
import { getMultitUser } from '../services/dashboardUsers';
import { postcomment, singleStratigys } from '../services/stratigyes';
import { delLikes, getLikes, postLikes } from '../services/userLikes';
import { delSaves, getSaves, postSaves } from '../services/userSaves';
import { getUserStbyID, getUserCreated, PostUserCreated } from '../services/userCreated';
import LeftArrow from '../asstes/left-arrow.svg'

import './styles/saveStratigy.css';
const SingleStr = () => {
  const { user } = useAuth()
  const [str, setStr] = React.useState([])
  const [comment, setComment] = React.useState([])
  const [seeComment, setSeecomment] = React.useState(false)
  const [totalLikeUser, setTotalLikeUser] = React.useState([])
  const { id } = useParams();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false)
  React.useEffect(() => {
    singleStratigys(id)
      .then(res => {
        setStr(res[0]);
        setComment(res[1]?.comments)
      })
  }, [id])


  const handleSeeComment = () => {
    if (seeComment) {
      setSeecomment(false)
    }
    else {
      setSeecomment(true)
    }
  }
  const handleComment = (e) => {
    e.preventDefault();
    setIsLoading(true)
    const data = {
      "strategie_id": id,
      "user_name": `${user.firstName} ${user.lastName}`,
      "comment": e.target.comment.value,
      "postTime": new Date()
    }
    postcomment(data)
      .then(res => {
        singleStratigys(id)
          .then(res => {
            setStr(res[0]);
            setComment(res[1]?.comments);
            e.target.reset();
            setIsLoading(false)
          })
      })
  }
  const [show, setShow] = useState()

  const [userLikes, setUserLikes] = useState([]);
  const [totalUserLikes, setTotalUserLikes] = useState(0);
  const [likeUser, setLikeUser] = useState([]);
  React.useEffect(() => {
    getLikes()
      .then(res => {
        const totalLike = res?.data?.filter(ress => ress.strategie_id === id)
        setTotalUserLikes(totalLike.length)
        const userlike = totalLike?.filter(ress => ress.user_id === user._id)
        setLikeUser(userlike)
        setUserLikes(userlike?.map(ress => ress.strategie_id))
        getMultitUser(totalLike?.map(user_id => user_id.user_id))
          .then(resUser => setTotalLikeUser(resUser.data))
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
            const userlike = totalLike?.filter(ress => ress.user_id === user._id)
            setLikeUser(userlike)
            setUserLikes(userlike?.map(ress => ress.strategie_id))
            getMultitUser(totalLike?.map(user_id => user_id.user_id))
              .then(resUser => setTotalLikeUser(resUser.data))
              .catch(err => setTotalLikeUser([]))
          })
      })
  }
  const handleApiUnLikes = (id) => {
    if (likeUser.length !== 0) {
      delLikes(likeUser[0]._id)
        .then(res => {
          getLikes()
            .then(res => {
              const totalLike = res?.data?.filter(ress => ress.strategie_id === id)
              setTotalUserLikes(totalLike.length)
              const userlike = totalLike?.filter(ress => ress.user_id === user._id)
              setLikeUser(userlike)
              setUserLikes(userlike?.map(ress => ress.strategie_id))
              getMultitUser(totalLike?.map(user_id => user_id.user_id))
                .then(resUser => setTotalLikeUser(resUser.data))
                .catch(err => setTotalLikeUser([]))
            })
        })
    }
  }

  const [userSaves, setUserSaves] = useState([]);
  const [saveUser, setSaveUser] = useState([]);
  const [userEdits,setUserEdits]=useState([]);
  const [totalUserSaves, setTotalUserSaves] = useState(0);
  React.useEffect(() => {
    getSaves()
      .then(res => {
        const totalSave = res?.data?.filter(ress => ress.strategie_id === id)
        setTotalUserSaves(totalSave.length)
        const userlike = totalSave?.filter(ress => ress.user_id === user._id)
        setSaveUser(userlike)
        setUserSaves(userlike?.map(ress => ress.strategie_id))
      })
  }, [])
  React.useEffect(() => {
    getUserCreated(user._id)
      .then(res => {
        const totalSave = res?.data?.filter(ress => ress.strategie_id === id)
        // setTotalUserSaves(totalSave.length)
        const userlike = totalSave?.filter(ress => ress.user_id === user._id)
        // setUserEdits(userlike)
        setUserEdits(userlike?.map(ress => ress.strategie_id))
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
            const userSave = totalSave?.filter(ress => ress.user_id === user._id)
            setSaveUser(userSave)
            setUserSaves(userSave?.map(ress => ress.strategie_id))
          })
      })
  }

  const handleApiUnSaves = (id) => {
    if (saveUser.length !== 0) {
      delSaves(saveUser[0]._id)
        .then(res => {
          if (res.data) {
            getSaves()
              .then(res => {
                const totalSave = res?.data?.filter(ress => ress.strategie_id === id)
                setTotalUserSaves(totalSave.length)
                const userSave = totalSave?.filter(ress => ress.user_id === user._id)
                setSaveUser(userSave)
                console.log(userSave);
                setUserSaves(userSave?.map(ress => ress.strategie_id))
              })
          }
        })
    }
  }
  console.log(totalLikeUser);
  return (
    <div>
      <LikeByModal
        show={show}
        handleClose={() => setShow(false)}
        totalReact={totalLikeUser}
      />
      <div className='saveStrParent2'>
      <Link to="/search" className='GoBack'><img src={LeftArrow}/>{t("Back")}</Link>
        <div  className='text-center headText my-1 mt-md-0 fw-bold'>{t("Strategy screen")}</div>
      </div>
      <div className='mx-3 mx-md-5'>
        <p className='single_str_head'>{str?.Subject} &gt; {str?.Grade} &gt; {str?.Skill} &gt; {str?.Topic} &gt; {str[`Sub Topic`]} &gt; {str['Sub-sub topic']}</p>
      </div>
      <div className='mx-4'>
        <div style={{ background: "#FFFFFF" }} className='card_pad'>
          <div className='my-4'>
            <div className='d-flex justify-content-between my-4 '>
              <div className='me-1'>
                <div>
                  <div className=' mb-4 mb-md-3 str_title'>
                    <p className='str_name'>{t("strategy")}</p>
                    <p className='uni_id'>ID-{str && str?._id?.slice(19, 26)}</p>
                  </div>
                </div>

            
              </div>

              <div className='col-9 ms-2 ms-md-4 col-md-11 '>
                <p className='savestr_head'>{t("Learning Outcomes")}: {str["Learning Outcome"]}</p>
                <p className='savestr_body me-2 me-md-2 disableCopy'>
                {str["Teaching Strategy"]?.split(/\n/g)
                  .map((step, index) => (
                    <div key={index}>
                      {step.match(/^\d+\.\s/) ? (
                      <div> {step}</div>
                      ) : (
                        <div>
                          {step}
                        </div>
                      )}
                    </div>
                  ))}
                </p>
                <div className='d-flex justify-content-between my-2'>
                  <div className='d-flex align-items-center mt-2'>

                    <div className='mx-lg-3 mx-md-2 mx-2 d-flex align-items-center flex-column'>
                      <div>
                        {/* {
                          console.log(userSaves?.includes(str?._id))
                        } */}
                        {userSaves?.includes(str?._id) ?
                          <img onClick={() => handleApiUnSaves(str?._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SavedIcon} alt="" />
                          :
                          <img onClick={() => handleApiSaves(str?._id)} style={{ cursor: "pointer" }} className='me-2 me-md-3 save_like' src={SaveIcon} alt="" />
                        }
                        <p className='count_num mx-1'>{totalUserSaves}</p>
                      </div>
                    </div>

                    <div className='mx-lg-3 mx-md-2 mx-2 d-flex align-items-center flex-column'>
                      <div>
                        {userLikes.includes(str?._id) ?
                          <img onClick={() => handleApiUnLikes(str?._id)} style={{ cursor: "pointer", transform: 'scale(1.1)' }} className="save_likes" src={LikedIcon} alt="" />
                          :
                          <img onClick={() => handleApiLikes(str?._id)} style={{ cursor: "pointer" }} className="save_likes" src={LikeIcon} alt="" />}
                      </div>
                      <p className='count_num mx-1' onClick={() => setShow(true)}>{totalLikeUser?.length}</p>
                    </div>


                  </div>
                 
                </div>
              </div>


      
            </div>


            {/* ================ FOR LARGE SCREEN =============  */}
            <div className='largeCommentContainer'>
              <div className='comment_div d-none d-md-block'>
                <p className='comment_div_p'>{t("Comments")}</p>
                <form onSubmit={handleComment}>
                  <div>
                    <input required name='comment' placeholder={`${t("Add a comment")}...`} className='w-100 comment_input' type="text" />
                  </div>
                  <div className='d-flex justify-content-end comment_submit'>
                    <input disabled={isLoading} type="submit" value={`${t('Submit')}`} />
                  </div>
                </form>
                <div className={!seeComment ? "d-block" : "d-none"}>
                  <div onClick={handleSeeComment} className="text-center see_comment">
                    <p className='m-0'>{t("View comments")} {comment?.length} <img width="10px" src={DownArrow} alt="" /></p>
                  </div>
                </div>
                <div className={seeComment ? "d-block" : "d-none"}>
                  <div onClick={handleSeeComment} className='text-center see_comment'>
                    <p className='m-0'>{t("Hide comments")} {comment?.length} <img width="10px" src={UpArrow} alt="" /></p>
                  </div>
                  {
                    comment?.map((res, index) => (
                      <div key={index} className='mt-4'>
                        <p className='comment_head'>{res.user_name} <span className='comment_span'>{moment(res.postTime).startOf('MMMM Do YYYY, h:mm:ss a').fromNow()}</span></p>
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
      </div>




      {/* ============ FOR SMALL SCREEN ================  */}
      <div className='comment_div d-block d-md-none'>
        <p className='comment_div_p'>Comments</p>
        <form onSubmit={handleComment}>
          <div>
            <input required name='comment' placeholder='Add a comment...' className='w-100 comment_input' type="text" />
          </div>
          <div className='d-flex justify-content-end comment_submit'>
            <input type="submit" />
          </div>
        </form>
        <div className={!seeComment ? "d-block" : "d-none"}>
          <div onClick={handleSeeComment} className="text-center see_comment">
            <p className='m-0'>View comments {comment?.length} <img width="7px" height="5px" src={DownArrow} alt="" /></p>
          </div>
        </div>
        <div className={seeComment ? "d-block" : "d-none"}>
          <div onClick={handleSeeComment} className='text-center see_comment'>
            <p className='m-0'>Hide comments {comment?.length} <img width="7px" height="5px" src={UpArrow} alt="" /></p>
          </div>
          {
            comment?.map((res, index) => (
              <div key={index} className='mt-4'>
                <p className='comment_head'>{res.user_name} <span className='comment_span'>{moment(res.postTime).startOf('MMMM Do YYYY, h:mm:ss a').fromNow()}</span></p>
                <p className='comment_text'>{res.comment}
                </p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default SingleStr;