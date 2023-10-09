import React, { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
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
import LikeByModal from "../Components/Modal/LikeByModal";
import { singleUserEnStratigys } from "../services/userStratigy";
import { Buffer } from "buffer";
import { getRatings, postRating, postcomment } from "../services/stratigyes";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import moment from "moment";
import { delLikes, getLikes, postLikes } from "../services/userLikes";
import { delSaves, getSaves, postSaves } from "../services/userSaves";
import editIcon from "../asstes/icons/editIcon.svg";
import { replaceNewlinesWithLineBreaks } from "../utils/utils";
import RatingModal from "../Components/Modal/RatingModal/RatingModal";

const SingleUserStr = () => {
  const { user, seteditStrategyFormData } = useAuth();
  const [str, setStr] = React.useState([]);
  const [seeComment, setSeecomment] = React.useState(false);
  const { id } = useParams();
  const { t } = useTranslation();
  const [comment, setComment] = React.useState([]);
  const [totalLikeUser, setTotalLikeUser] = React.useState([]);
  const [uploader, setuploader] = React.useState("");
  const [isUsedStrategy, setisUsedStrategy] = useState(false);
  const [formatted, setformatted] = useState("");
  const [rating, setRating] = useState(0);
  const pRef = useRef(null);
  const navigate = useNavigate();
  const [isAlreadyRated, setisAlreadyRated] = useState(false);
  const [isLoadingContent, setIsLoadingContent] = useState(true);

  // Function to handle a star click
  const handleStarClick = (starIndex) => {
    setRating(starIndex);
    setisUsedStrategy(false);
    sendRating(starIndex);
    setisAlreadyRated(true);
  };
  const toggleUsedStrategy = () => {
    setisUsedStrategy(!isUsedStrategy);
  };
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
  //fetching rating
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
    singleUserEnStratigys(id).then((res) => {
      setStr(res.data[0]);
      setComment(res.data[1]?.comments);
      getSingleUser(res.data[0].User_id).then((res) => {
        setuploader(res.data[0]);
      });
    });
  }, []);
  const handleSeeComment = () => {
    if (seeComment) {
      setSeecomment(false);
    } else {
      setSeecomment(true);
    }
  };

  const [show, setShow] = React.useState(false);
  const showReact = () => {
    if (show) {
      setShow(false);
    }
    if (totalLikeUser.length === 0) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  const [disable, setDisable] = useState(false);
  const handleComment = (e) => {
    e.preventDefault();
    setDisable(true);
    const data = {
      strategie_id: id,
      user_name: `${user.firstName} ${user.lastName}`,
      comment: e.target.comment.value,
      postTime: new Date(),
    };
    postcomment(data).then((res) => {
      singleUserEnStratigys(id).then((res) => {
        setStr(res.data[0]);
        setComment(res.data[1]?.comments);
        e.target.reset();
        setDisable(false);
      });
    });
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {uploader.firstName}
    </Tooltip>
  );
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
  const handleUsedStrategy = () => {
    setisUsedStrategy(true);
  };
  const handleCloseRatingModal = () => {
    setisUsedStrategy(false);
  };
  const handleEditStrategy = async () => {
    await seteditStrategyFormData(str);
    navigate(`/editStrategyform/${str._id}/user`);
  };
  const handleBackClick = () => {
    window.history.go(-1);
  };
  useEffect(() => {
    setTimeout(() => {
      const newText = replaceNewlinesWithLineBreaks(str["Teaching Strategy"]);
      if (pRef.current) {
        pRef.current.innerHTML = newText;
      }
      setformatted(""); // Assign the new HTML to the innerHTML property
      setIsLoadingContent(false); // Mark loading as complete
    }, 100); 
  }, [str["Teaching Strategy"]]);


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
        <p className="headText text-center">{t("Strategy screen")}</p>
        <hr className="line" />
      </div>
      <div className="mx-2 mx-md-5">
        <p className="single_str_head">
        {str?.Grade}&nbsp;&nbsp; &gt; {str?.Subject}&nbsp;&nbsp; &gt;{" "}
          {str?.['Super Topic']}&nbsp;&nbsp; &gt; {str?.Topic}&nbsp;&nbsp; &gt;{" "}
          {str[`Sub Topic`]}&nbsp;&nbsp; &gt; {str["Sub-sub topic"]}
        </p>
      </div>
      <div className="mx-2 mx-md-5">
        <div  className="card_pad">
          <div className="my-4">
            <div className="d-flex justify-content-between my-4 flex-column">
              <p className="savestr_head mt-0">
                {t("Learning Outcomes")}: {str["Learning Outcome"]}
              </p>
              <div className="col-9  w-100 textContainer p-2 p-md-4">
                <div className="me-1">
                  <div>
                    <div className=" str_titlee">
                      <p className="Strategy_count str_name">{t("strategy")}</p>
                    </div>
                    {
                      str["Pedagogical Approach"]&&
                    <div className="mb-md-1">
                      <i className="pedalogicalText">{str["Pedagogical Approach"]}</i>
                    </div>
                    }
                  </div>
                </div>
                {isLoadingContent?"Loading...": (
                  <p
                    ref={pRef}
                    className="newLine  me-2 me-md-2 disableCopy"
                  ></p>
                )}

                <div className="d-flex justify-content-between my-2">
                  <div className="d-flex gap-2 gap-md-2 align-items-center">
                    <div className="d-flex flex-column justify-content-center align-items-center">
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
                    <div className="d-flex flex-column justify-content-center align-items-center">
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
                  <div className=" d-flex gap-3 justify-content-center">
                    <button
                      className="secondaryButton"
                      onClick={handleEditStrategy}
                    >
                      Edit Strategy <img src={editIcon} alt="edit" className="mx-md-2" />
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
                <div className="comment_div w-100 d-none d-md-block col-md-11">
                  <p className="comment_div_p">{t("Comments")}</p>
                  <form onSubmit={handleComment}>
                    <div>
                      <input
                        name="comment"
                        required
                        placeholder={`${t("Add a comment")}...`}
                        className="w-100 comment_input"
                        type="text"
                      />
                    </div>
                    <div className="d-flex justify-content-end comment_submit">
                      <input
                        disabled={disable}
                        type="submit"
                        value={`${t("Submit")}`}
                      />
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
                        required
                        name="comment"
                        placeholder="Add a comment..."
                        className="w-100 comment_input"
                        type="text"
                      />
                    </div>
                    <div className="d-flex justify-content-end comment_submit">
                      <input disabled={disable} type="submit" />
                    </div>
                  </form>
                  <div className={!seeComment ? "d-block" : "d-none"}>
                    <div
                      onClick={handleSeeComment}
                      className="text-center see_comment"
                    >
                      <p className="m-0">
                        View comments {comment?.length}{" "}
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
                        Hide comments {comment?.length}{" "}
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

export default SingleUserStr;