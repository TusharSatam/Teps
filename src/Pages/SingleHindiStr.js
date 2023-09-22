import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { getMultitUser, getSingleUser, getUsers, updateUser } from '../services/dashboardUsers';
import { useAuth } from '../Context/AuthContext';
import { singleHindiStratigys } from '../services/hindiStratigys';
import { postcomment } from '../services/stratigyes';
import moment from 'moment';
import { delLikes, getLikes, postLikes } from '../services/userLikes';
import { delSaves, getSaves, postSaves } from '../services/userSaves';
import LikeByModal from '../Components/Modal/LikeByModal';
import LeftArrow from '../asstes/left-arrow.svg'
import { replaceNewlinesWithLineBreaks } from '../utils/utils';
import ratingStar from "../asstes/icons/ratingStar.svg"
import ratingStarFill from "../asstes/icons/ratingStarFill.svg"
import editIcon from "../asstes/icons/editIcon.svg"

const SingleHindiStr = () => {
  const { user, setUser } = useAuth()
  const [str, setStr] = React.useState([])
  const [seeComment, setSeecomment] = React.useState(false)
  const [allUser, setAllUser] = React.useState([])
  const [comment, setComment] = React.useState([])
  const { id } = useParams();
  const { t } = useTranslation();
  const [react, setReact] = React.useState(user ? user?.saveId : []);
  const [like, setLike] = React.useState(user ? user?.saveReact : []);
  const [totalLikeUser, setTotalLikeUser] = React.useState([]);
  const [isUsedStrategy, setisUsedStrategy] = useState(false);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const pRef = useRef(null)



  // Function to handle a star click
  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };
const toggleUsedStrategy=()=>{
  setisUsedStrategy(!isUsedStrategy);
}
  React.useEffect(() => {
    singleHindiStratigys(id)
      .then(res => {
        setStr(res[0]);
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
  const handleComment = (e) => {
    e.preventDefault()
    const data = {
      "strategie_id": id,
      "user_name": `${user.firstName} ${user.lastName}`,
      "comment": e.target.comment.value
    }
    postcomment(data)
      .then(res => {
        singleHindiStratigys(id)
          .then(res => {
            setStr(res[0]);
            setComment(res[1]?.comments);
            e.target.reset()
          })
      })
  }
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
  const [show, setShow] = useState(false)
  const handleEditStrategy=()=>{
    navigate('/editStrategyform')
  }
  useEffect(() => {
    const newText = replaceNewlinesWithLineBreaks(str["शिक्षण रणनीति"]);
    pRef.current.innerHTML = newText;
  }, [str["शिक्षण रणनीति"]])
  return (
    <div>
      <LikeByModal
        show={show}
        handleClose={() => setShow(false)}
        totalReact={totalLikeUser}
      />
      {/* <div className='saveStrParent' >
        <div className='text-white text-center headText mt-2 mt-md-0'>{t("Strategy screen")}</div>
      </div> */}
      <div className='saveStrParent2'>
        <Link to="/search" className='GoBack'><img src={LeftArrow}/>{t('Back')}</Link>
        <div  className='text-center headText my-1 mt-md-0 fw-bold'>{t("Strategy screen")}</div>
      </div>
      <div className='mx-3 mx-md-5'>
        <p className='single_str_head'>{str?.विषय} &gt; {str?.श्रेणी} &gt; {str?.कौशल} &gt; {str?.शीर्षक} &gt; {str[`उप शीर्षक`]} &gt; {str['उप-उप शीर्षक']}</p>
      </div>
      <div className='mx-5'>
        <div style={{ background: "#FFFFFF" }} className='card_pad'>
          <div className='my-4'>
            <div className='d-flex justify-content-between my-4 '>
              <div className='me-1'>
                <div>
                  <div className=' mb-4 mb-md-3 str_title'>
                    <p className='str_name '>{t("strategy")}</p>
                    <p className='uni_id'>ID-{str && str?._id?.slice(19, 26)}</p>
                  </div>
                </div>
            
              </div>
              <div className='col-9 ms-4 col-md-11 '>
                <p className='savestr_head'>{t("Learning Outcomes")}: {str["शिक्षण के परिणाम"]}</p>
                <p ref={pRef} className='newLine savestr_body me-2 me-md-2 disableCopy'>
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
                      <p className='count_num' onClick={() => setShow(!show)}>{totalUserLikes}</p>
                    </div>
                  </div>
                  <div className='me-md-3 me-0 d-flex gap-3'>
                  
                      <button className='editStrategy' onClick={handleEditStrategy}>Edit Strategy <img src={editIcon} alt="edit"/></button>
                      {
                        !isUsedStrategy?<button className='markUsed' onClick={toggleUsedStrategy}>Mark as Used</button>:<button className='UsedStartegy' onClick={toggleUsedStrategy}>Used startegy</button>
                      }                      

                  </div>
                </div>
                <div className='rateStrategy'>
                  {[1, 2, 3, 4, 5].map((starIndex) => (
                    <img
                      key={starIndex}
                      src={starIndex <= rating ? ratingStarFill : ratingStar}
                      alt={`Star ${starIndex}`}
                      onClick={() => handleStarClick(starIndex)}
                    />
                  ))}
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
  );
};

export default SingleHindiStr;