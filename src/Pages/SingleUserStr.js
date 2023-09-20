import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
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
import LikeByModal from '../Components/Modal/LikeByModal';
import { singleUserEnStratigys } from '../services/userStratigy';
import UserImage from '../asstes/Group 51.svg'
import { Buffer } from 'buffer';
import { postcomment } from '../services/stratigyes';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import moment from 'moment';
import { delLikes, getLikes, postLikes } from '../services/userLikes';
import { delSaves, getSaves, postSaves } from '../services/userSaves';
import LeftArrow from '../asstes/left-arrow.svg'
import ratingStar from "../asstes/icons/ratingStar.svg"
import editIcon from "../asstes/icons/editIcon.svg"
import ratingStarFill from "../asstes/icons/ratingStarFill.svg"



const SingleUserStr = () => {
  const { user } = useAuth()
  const [str, setStr] = React.useState([])
  const [seeComment, setSeecomment] = React.useState(false)
  const { id } = useParams();
  const { t } = useTranslation();
  const [comment, setComment] = React.useState([])
  const [totalLikeUser, setTotalLikeUser] = React.useState([])
  const [uploader, setuploader] =  React.useState('')
  const [isUsedStrategy, setisUsedStrategy] = useState(false)
  const [rating, setRating] = useState(0);

  // Function to handle a star click
  const handleStarClick = (starIndex) => {
    setRating(starIndex);
  };
const toggleUsedStrategy=()=>{
  setisUsedStrategy(!isUsedStrategy);
}
  React.useEffect(() => {
    singleUserEnStratigys(id)
      .then(res => {
        console.log("startegy scrren ", res.data[0]);
        // setuploadByUserID(res.data[0].User_id)
        setStr(res.data[0]);
        setComment(res.data[1]?.comments)
        getSingleUser(res.data[0].User_id)
        .then(res=>{
          console.log("uploader",res);
          setuploader(res.data[0])
        })
      })
  }, [])
console.log(uploader);
  const handleSeeComment = () => {
    if (seeComment) {
      setSeecomment(false)
    }
    else {
      setSeecomment(true)
    }
  }

  const [show, setShow] = React.useState(false)
  const showReact = () => {
    if (show) {
      setShow(false)
    }
    if (totalLikeUser.length === 0) {
      setShow(false)
    }
    else {
      setShow(true)
    }
  }
  const [disable, setDisable] = useState(false)
  const handleComment = (e) => {
    e.preventDefault()
    setDisable(true)
    const data = {
      "strategie_id": id,
      "user_name": `${user.firstName} ${user.lastName}`,
      "comment": e.target.comment.value,
      "postTime": new Date()
    }
    postcomment(data)
      .then(res => {
        singleUserEnStratigys(id)
          .then(res => {
            setStr(res.data[0]);
            setComment(res.data[1]?.comments);
            e.target.reset()
            setDisable(false)
          })
      })
  }

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {uploader.firstName}
    </Tooltip>
  );
  const [userLikes, setUserLikes] = useState([]);
  const [totalUserLikes, setTotalUserLikes] = useState(0);
  const [likeUser, setLikeUser] = useState([]);
  console.log(userLikes);
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
              setUserLikes(userlike?.map(ress => ress.strategie_id));
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

  // const wrapLinksAndText = (text) => {
  //   const parts = text?.split(/(https?:\/\/\S+|www\.\S+|\n)/g); // Split by URLs and line breaks

  //   let result = [];
  //   let currentLine = '';

  //   parts?.forEach((part, index) => {
  //     if (part?.startsWith('http') || part?.startsWith('www.')) {
  //       const url = part?.startsWith('http') ? part : `https://${part}`;
  //       currentLine += (
  //         <a
  //           key={index}
  //           href={url}
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           {url}
  //         </a>
  //       );
  //     } else {
  //       currentLine += part;
  //     }

  //     // If the next part is a line break or we've reached the end, add the current line to the result
  //     if (index === parts.length - 1 || parts[index + 1] === '\n') {
  //       result?.push(<div key={index}>{currentLine}</div>);
  //       currentLine = '';
  //     }
  //   });

  //   return result;
  // };
  function wrapLinksAndText(text) {
    const lines = text?.split(/\n/g).filter((line) => line.trim() !== '');
  
    return lines?.map((line, index) => {
      const points = line.match(/^\d+\./); // Match point numbers at the beginning of each line
      const parts = line.split(/(https?:\/\/[^\s]+)/); // Split line by URLs
  
      return (
        <div key={index}>
          {points && <span>{points[0]}</span>}
          {parts.map((part, partIndex) => {
            if (part.match(/https?:\/\/[^\s]+/)) {
              // Extract the URL from the part
              const url = part.match(/(https?:\/\/[^\s]+)/)[0];
              
              return (
                <a
                  key={partIndex}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {part}
                </a>
              );
            } else {
              return (
                <div key={partIndex}>
                  {part}
                </div>
              );
            }
          })}
          <br /> {/* Add a line break after each line */}
        </div>
      );
    });
  }
  
  
  
  
 
 
  return (
    <div>
      <LikeByModal
        show={show}
        handleClose={() => setShow(false)}
        totalReact={totalLikeUser}
      />
      <div className='saveStrParent2'>
      <Link to="/search" className='GoBack'><img src={LeftArrow}/>{t('Back')}</Link>
        <div className='text-center headText my-1 mt-md-0 fw-bold'>{t("Strategy screen")}</div>
      </div>
      <div className='mx-3 mx-md-5'>
        <p className='single_str_head'>{str?.Subject}&nbsp;&nbsp; &gt; {str?.Grade}&nbsp;&nbsp; &gt; {str?.Skill}&nbsp;&nbsp; &gt; {str?.Topic}&nbsp;&nbsp; &gt; {str[`Sub Topic`]}&nbsp;&nbsp; &gt; {str['Sub-sub topic']}</p>
      </div>
      <div className='mx-4 mx-md-5'>
        <div style={{ background: "#FFFFFF" }} className='card_pad'>
          <div className='my-4'>
            <div className='d-flex justify-content-between my-4 '>
              <div className='me-1'>
                <div className='str_title_user'>
                  <div className='mb-md-3 str_titlee'>
                    <p className='Strategy_count str_name'>{t("strategy")}</p>
                  </div>
                  <div>
                    <p className='uni_id'>ID-{str && str?._id?.slice(19, 26)}</p>
                    <p className='user_str d-none d-md-block'>Uploaded By - {
                      uploader?.image ?
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <img className='label user_image' src={`data:${uploader?.image?.contentType};base64,${Buffer.from(uploader?.image?.data?.data).toString('base64')}`} alt="" />
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
                  <div className=' mt-1'>
           
                    <p className='user_str d-block d-md-none mt-3'>Uploaded By - {
                      uploader?.image ?
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <img className='label user_image' src={`data:${uploader?.image?.contentType};base64,${Buffer.from(uploader?.image?.data?.data).toString('base64')}`} alt="" />
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
              <div className='col-8 ms-3  col-md-11 '>
                <p className='padalogicalTitle'>Inquiry Based Learning</p>
                <p className='savestr_head'>{t("Learning Outcomes")}: {str["Learning Outcome"]}</p>
                <p className='savestr_body'>
                {/* {str["Teaching Strategy"]?.split(/\n/g)
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
                  ))} */}
                  {wrapLinksAndText(str["Teaching Strategy"])}
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
                      <p style={{ cursor: "pointer" }} onClick={showReact} className='count_num'>{totalLikeUser.length}</p>
                    </div>
                  </div>
                  <div className='me-md-3 me-0 d-flex gap-3'>
                    {/* {
                      str['Mode of Teaching'] === "Online" ?
                        <img title='Online' className='threeIcons' src={OnlineIcon} alt="" /> :
                        <img title='Classroom' className='threeIcons' src={OfflineIcon} alt="" />
                    } */}
                      <button className='editStrategy'>Edit Strategy <img src={editIcon} alt="edit"/></button>
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
            <div className='comment_div d-none d-md-block col-md-11'>
              <p className='comment_div_p'>{t("Comments")}</p>
              <form onSubmit={handleComment}>
                <div>
                  <input name='comment' required placeholder={`${t("Add a comment")}...`} className='w-100 comment_input' type="text" />
                </div>
                <div className='d-flex justify-content-end comment_submit'>
                  <input disabled={disable} type="submit" value={`${t('Submit')}`} />
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
            <input required name='comment' placeholder='Add a comment...' className='w-100 comment_input' type="text" />
          </div>
          <div className='d-flex justify-content-end comment_submit'>
            <input disabled={disable} type="submit" />
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

export default SingleUserStr;