import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./styles/saveStratigy.css";
import backArrow from "../asstes/icons/backArrow.svg";
import LikeIcon from "../asstes/icons/Like.svg";
import LikedIcon from "../asstes/icons/Liked.svg";
import SaveIcon from "../asstes/icons/Save.svg";
import SavedIcon from "../asstes/icons/Saved.svg";
import DownArrow from "../asstes/icons/DownArrow.svg";
import UpArrow from "../asstes/icons/upArrow.svg";
import { useTranslation } from "react-i18next";
import {
  getMultitUser,
  getSingleUser,
  getUsers,
  updateUser,
} from "../services/dashboardUsers";
import { useAuth } from "../Context/AuthContext";
import { singleHindiStratigys } from "../services/hindiStratigys";
import { getRatings, postRating, postcomment } from "../services/stratigyes";
import moment from "moment";
import { delLikes, getLikes, postLikes } from "../services/userLikes";
import { delSaves, getSaves, postSaves } from "../services/userSaves";
import LikeByModal from "../Components/Modal/LikeByModal";
import LeftArrow from "../asstes/left-arrow.svg";
import { replaceNewlinesWithLineBreaks } from "../utils/utils";
import ratingStar from "../asstes/icons/ratingStar.svg";
import ratingStarFill from "../asstes/icons/ratingStarFill.svg";
import editIcon from "../asstes/icons/editIcon.svg";
import RatingModal from "../Components/Modal/RatingModal/RatingModal";
import { singleUserHiStratigys } from "../services/userStratigyHi";

const SingleHindiStr = () => {
  const { user, setUser, seteditStrategyFormData,strategyNum, setstrategyNum  } = useAuth();
  const [str, setStr] = React.useState([]);
  const [seeComment, setSeecomment] = React.useState(false);
  const [allUser, setAllUser] = React.useState([]);
  const [comment, setComment] = React.useState([]);
  const { id } = useParams();
  const { t } = useTranslation();
  const [react, setReact] = React.useState(user ? user?.saveId : []);
  const [like, setLike] = React.useState(user ? user?.saveReact : []);
  const [totalLikeUser, setTotalLikeUser] = React.useState([]);
  const [isUsedStrategy, setisUsedStrategy] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const pRef = useRef(null);
  const [isAlreadyRated, setisAlreadyRated] = useState(false);

  // Function to handle a star click
  const handleStarClick = (starIndex) => {
    setRating(starIndex);
    setisUsedStrategy(false);
    sendRating(starIndex);
    setisAlreadyRated(true);
  };
  const handleUsedStrategy = () => {
    setisUsedStrategy(true);
  };
  const handleCloseRatingModal = () => {
    setisUsedStrategy(false);
  };
  const toggleUsedStrategy = () => {
    setisUsedStrategy(!isUsedStrategy);
  };
  //handling rating
  const sendRating = async (starIndex) => {
    const dataToSend = {
      rating: starIndex,
      user_id: user._id,
      strategy_id: id,
    };
    try {
      const response = await postRating(dataToSend);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };
  useEffect(() => {
    getRatings(id).then((res) => {
      const filteredData = res.filter(
        (obj) => obj.user_id === user._id && obj.strategy_id === id
      );
      if (filteredData.length) {
        setisAlreadyRated(true);
      }
    });
  }, [isAlreadyRated]);

  React.useEffect(() => {
      singleHindiStratigys(id).then((res) => {
        console.log(res);
        if(res[0] && res[0]._id){
          setStr(res[0]);
        }
        else{
          singleUserHiStratigys(id).then((res) => {
            console.log(res);
            setStr(res.data[0]);
          });
        }
      });
  }, []);
  const handleReact = async (e) => {
    if (react?.includes(e)) {
      for (var i = 0; i < react.length; i++) {
        if (react[i] === e) {
          react?.splice(i, 1);
          i--;
        }
      }
    } else {
      react?.push(e);
    }
    setReact([...react], [react]);
  };

  const handleLike = async (e) => {
    if (like?.includes(e)) {
      for (var i = 0; i < like.length; i++) {
        if (like[i] === e) {
          like.splice(i, 1);
          i--;
        }
      }
    } else {
      like.push(e);
    }
    setLike([...like], [like]);
  };

  const handleSeeComment = () => {
    if (seeComment) {
      setSeecomment(false);
    } else {
      setSeecomment(true);
    }
  };

  React.useEffect(() => {
    getUsers().then((res) => {
      setAllUser(res.data);
    });
  }, []);
  const totalSave = allUser.filter((res) => res.saveId.includes(id));
  const totalReact = allUser.filter((res) => res.saveReact.includes(id));
  const handleComment = (e) => {
    e.preventDefault();
    const data = {
      strategie_id: id,
      user_name: `${user.firstName} ${user.lastName}`,
      comment: e.target.comment.value,
    };
    postcomment(data).then((res) => {
      singleHindiStratigys(id).then((res) => {
        setStr(res[0]);
        setComment(res[1]?.comments);
        e.target.reset();
      });
    });
  };
  const [userLikes, setUserLikes] = useState([]);
  const [totalUserLikes, setTotalUserLikes] = useState(0);
  const [likeUser, setLikeUser] = useState([]);
  React.useEffect(() => {
    getLikes().then((res) => {
      const totalLike = res?.data?.filter((ress) => ress.strategie_id === id);
      setTotalUserLikes(totalLike.length);
      const userlike = totalLike?.filter((ress) => ress.user_id === user._id);
      setLikeUser(userlike);
      setUserLikes(userlike?.map((ress) => ress.strategie_id));
      getMultitUser(totalLike?.map((user_id) => user_id.user_id)).then(
        (resUser) => setTotalLikeUser(resUser.data)
      );
    });
  }, []);
  const handleApiLikes = (id) => {
    const data = {
      strategie_id: id,
      user_id: user._id,
    };
    postLikes(data).then((res) => {
      getLikes().then((res) => {
        const totalLike = res?.data?.filter((ress) => ress.strategie_id === id);
        setTotalUserLikes(totalLike.length);
        const userlike = totalLike?.filter((ress) => ress.user_id === user._id);
        setLikeUser(userlike);
        setUserLikes(userlike?.map((ress) => ress.strategie_id));
        getMultitUser(totalLike?.map((user_id) => user_id.user_id))
          .then((resUser) => setTotalLikeUser(resUser.data))
          .catch((err) => setTotalLikeUser([]));
      });
    });
  };
  const handleApiUnLikes = (id) => {
    if (likeUser.length !== 0) {
      delLikes(likeUser[0]._id).then((res) => {
        getLikes().then((res) => {
          const totalLike = res?.data?.filter(
            (ress) => ress.strategie_id === id
          );
          setTotalUserLikes(totalLike.length);
          const userlike = totalLike?.filter(
            (ress) => ress.user_id === user._id
          );
          setLikeUser(userlike);
          setUserLikes(userlike?.map((ress) => ress.strategie_id));
          getMultitUser(totalLike?.map((user_id) => user_id.user_id))
            .then((resUser) => setTotalLikeUser(resUser.data))
            .catch((err) => setTotalLikeUser([]));
        });
      });
    }
  };

  const [userSaves, setUserSaves] = useState([]);
  const [saveUser, setSaveUser] = useState([]);
  const [totalUserSaves, setTotalUserSaves] = useState(0);
  React.useEffect(() => {
    getSaves().then((res) => {
      const totalSave = res?.data?.filter((ress) => ress.strategie_id === id);
      setTotalUserSaves(totalSave.length);
      const userlike = totalSave?.filter((ress) => ress.user_id === user._id);
      setSaveUser(userlike);
      setUserSaves(userlike?.map((ress) => ress.strategie_id));
    });
  }, []);
  const handleApiSaves = (id) => {
    const data = {
      strategie_id: id,
      user_id: user._id,
    };
    postSaves(data).then((res) => {
      getSaves().then((res) => {
        const totalSave = res?.data?.filter((ress) => ress.strategie_id === id);
        setTotalUserSaves(totalSave.length);
        const userSave = totalSave?.filter((ress) => ress.user_id === user._id);
        setSaveUser(userSave);
        setUserSaves(userSave?.map((ress) => ress.strategie_id));
      });
    });
  };

  const handleApiUnSaves = (id) => {
    if (saveUser.length !== 0) {
      delSaves(saveUser[0]._id).then((res) => {
        if (res.data) {
          getSaves().then((res) => {
            const totalSave = res?.data?.filter(
              (ress) => ress.strategie_id === id
            );
            setTotalUserSaves(totalSave.length);
            const userSave = totalSave?.filter(
              (ress) => ress.user_id === user._id
            );
            setSaveUser(userSave);
            setUserSaves(userSave?.map((ress) => ress.strategie_id));
          });
        }
      });
    }
  };
  const [show, setShow] = useState(false);

  const handleEditStrategy = async () => {
    await seteditStrategyFormData(str);
    navigate(`/editStrategyform/${str._id}`);
  };
  const handleBackClick = () => {
    window.history.go(-1);
  };
  useEffect(() => {
    setTimeout(() => {
      const newText = replaceNewlinesWithLineBreaks(str["शिक्षण रणनीति"]);
      if (pRef.current) {
        pRef.current.innerHTML = newText;
      }
      setIsLoadingContent(false); // Mark loading as complete
    }, 100); 
  }, [str["शिक्षण रणनीति"]]);

  return (
    <div>
      <LikeByModal
        show={show}
        handleClose={() => setShow(false)}
        totalReact={totalLikeUser}
      />
      <div className=" d-flex justify-content-center align-items-center mb-1 position-relative ">
        <button className="backbutton" onClick={handleBackClick}>
          <img src={backArrow} alt="backArrow" className="mb-md-1" />
          {`${t("Back")}`}
        </button>
        <hr className="line" />
        <p className="headText text-center">{t("Strategy")}</p>
        <hr className="line" />
      </div>
      <div className="mx-2 mx-md-5">
        <p className="single_str_head">
        {str?.श्रेणी} &gt;  {str?.विषय} &gt;  {str?.['प्रमुख शीर्षक']} &gt; {str?.शीर्षक}{" "}
          &gt; {str[`उप शीर्षक`]} &gt; {str["उप-उप शीर्षक"]}
        </p>
      </div>
      <div className="mx-2 mx-md-5">
        <div  className="card_pad">
          <div className="my-4">
            <div className="d-flex justify-content-between my-4 ">
              <div className="col-9  w-100 textContainer p-2 p-md-4">
                <div className="me-1">
                  <div>
                    <div className=" mb-1 mb-md-1 str_title">
                      <p className="str_name d-flex">{t("strategy")} <span className="counter_str">{`${strategyNum}`}</span></p>
                    </div>
                  </div>
                </div>
                {isLoadingContent?"Loading...": (
                  <p
                    ref={pRef}
                    className="newLine me-2 me-md-2 disableCopy"
                  ></p>
                )}

                <div className="d-flex justify-content-between my-2">
                  <div className="d-flex gap-2 gap-md-2 align-items-center">
                    <div className="d-flex align-items-center flex-column">
                      <div>
                        {userSaves?.includes(str?._id) ? (
                          <img
                            onClick={() => handleApiUnSaves(str?._id)}
                            className="save_like cursor-pointer"
                            src={SavedIcon}
                            alt="SavedIcon"
                          />
                        ) : (
                          <img
                            onClick={() => handleApiSaves(str?._id)}
                            className="save_like cursor-pointer"
                            src={SaveIcon}
                            alt="SavedIcon"
                          />
                        )}
                      </div>
                    </div>
                    <div className="d-flex align-items-center flex-column">
                      <div>
                        {userLikes.includes(str?._id) ? (
                          <img
                            onClick={() => handleApiUnLikes(str?._id)}
                            className="save_likes cursor-pointer"
                            src={LikedIcon}
                            alt="LikedIcon"
                          />
                        ) : (
                          <img
                            onClick={() => handleApiLikes(str?._id)}
                            className="save_likes cursor-pointer"
                            src={LikeIcon}
                            alt="LikedIcon"
                          />
                        )}
                      </div>

                    </div>
                    {!isAlreadyRated ? (
                      <button
                        className="secondaryButton"
                        onClick={toggleUsedStrategy}
                      >
                        {t("Mark as used")}
                      </button>
                    ) : (
                      <button className="primaryButton">
                        {t("I used this!")}
                      </button>
                    )}
                  </div>
                  <div className="justify-content-center d-flex gap-3">
                    <button
                      className="secondaryButton"
                      onClick={handleEditStrategy}
                    >
                      {t("Edit Strategy")} <img src={editIcon} alt="edit" className="mx-md-2"/>
                    </button>
                  </div>
                </div>
                <RatingModal
                  show={isUsedStrategy}
                  handleClose={handleCloseRatingModal}
                  handleStarClick={handleStarClick}
                  rating={rating}
                  setRating={setRating}
                />
                <div className="comment_div d-none d-md-block">
                  <p className="comment_div_p">{t("Comments")}</p>
                  <form onSubmit={handleComment}>
                    <div>
                      <input
                        name="comment"
                        placeholder={`${t("Add a comment")}...`}
                        className="w-100 comment_input"
                        type="text"
                      />
                    </div>
                    <div className="d-flex justify-content-end comment_submit">
                      <input type="submit" value={`${t("Submit")}`} />
                    </div>
                  </form>
                  <div className={!seeComment ? "d-block" : "d-none"}>
                    <div
                      onClick={handleSeeComment}
                      className="text-center see_comment"
                    >
                      <p className="m-0">
                        {t("View comments")} {comment?.length}{" "}
                        <img src={DownArrow} alt="DownArrow" />
                      </p>
                    </div>
                  </div>
                  <div className={seeComment ? "d-block" : "d-none"}>
                    <div
                      onClick={handleSeeComment}
                      className="text-center see_comment"
                    >
                      <p className="m-0">
                        {t("Hide comments")} {comment?.length}{" "}
                        <img src={UpArrow} alt="DownArrow" />
                      </p>
                    </div>
                    {comment?.map((res, index) => (
                      <div key={index} className="mt-4">
                        <p className="comment_head">
                          {res.user_name}{" "}
                          <span className="comment_span">
                            {moment(res.postTime)
                              .startOf("MMMM Do YYYY, h:mm:ss a")
                              .fromNow()}
                          </span>
                        </p>
                        <p className="comment_text">{res.comment}</p>
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="comment_div d-block d-md-none">
                  <p className="comment_div_p">Comments</p>
                  <form onSubmit={handleComment}>
                    <div>
                      <input
                        name="comment"
                        placeholder="Add a comment..."
                        className="w-100 comment_input"
                        type="text"
                      />
                    </div>
                    <div className="d-flex justify-content-end comment_submit">
                      <input type="submit" />
                    </div>
                  </form>
                  <div className={!seeComment ? "d-block" : "d-none"}>
                    <div
                      onClick={handleSeeComment}
                      className="text-center see_comment"
                    >
                      <p className="m-0">
                        {t("View comments")} {comment?.length}{" "}
                        <img src={DownArrow} alt="DownArrow" />
                      </p>
                    </div>
                  </div>
                  <div className={seeComment ? "d-block" : "d-none"}>
                    <div
                      onClick={handleSeeComment}
                      className="text-center see_comment"
                    >
                      <p className="m-0">
                        {t("Hide comments")} {comment?.length}{" "}
                        <img src={UpArrow} alt="DownArrow" />
                      </p>
                    </div>
                    {comment?.map((res, index) => (
                      <div key={index} className="mt-4">
                        <p className="comment_head">
                          {res.user_name}{" "}
                          <span className="comment_span">
                            {moment(res.postTime)
                              .startOf("MMMM Do YYYY, h:mm:ss a")
                              .fromNow()}
                          </span>
                        </p>
                        <p className="comment_text">{res.comment}</p>
                        <hr />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleHindiStr;