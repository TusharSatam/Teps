import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import DownArrow from "../asstes/icons/DownArrow.svg";
import LikeIcon from "../asstes/icons/Like.svg";
import LikedIcon from "../asstes/icons/Liked.svg";
import backArrow from "../asstes/icons/backArrow.svg";
import SaveIcon from "../asstes/icons/Save.svg";
import SavedIcon from "../asstes/icons/Saved.svg";
import UpArrow from "../asstes/icons/upArrow.svg";
import LikeByModal from "../Components/Modal/LikeByModal";
import { useAuth } from "../Context/AuthContext";
import { getMultitUser } from "../services/dashboardUsers";
import {
  getRatings,
  postRating,
  postcomment,
  singleStratigys,
} from "../services/stratigyes";
import { delLikes, getLikes, postLikes } from "../services/userLikes";
import { delSaves, getSaves, postSaves } from "../services/userSaves";
import LeftArrow from "../asstes/left-arrow.svg";
import editIcon from "../asstes/icons/editIcon.svg";
import "./styles/saveStratigy.css";
import { replaceNewlinesWithLineBreaks } from "../utils/utils";

import RatingModal from "../Components/Modal/RatingModal/RatingModal";
const SingleStr = () => {
  const { user, seteditStrategyFormData } = useAuth();
  const [str, setStr] = React.useState([]);
  const [comment, setComment] = React.useState([]);
  const [seeComment, setSeecomment] = React.useState(false);
  const [totalLikeUser, setTotalLikeUser] = React.useState([]);
  const { id } = useParams();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [formatted, setformatted] = useState("");
  const [isUsedStrategy, setisUsedStrategy] = useState(false);
  const [rating, setRating] = useState(0);
  const [userSaves, setUserSaves] = useState([]);
  const [saveUser, setSaveUser] = useState([]);
  const [totalUserSaves, setTotalUserSaves] = useState(0);
  const [show, setShow] = useState();
  const [userLikes, setUserLikes] = useState([]);
  const [totalUserLikes, setTotalUserLikes] = useState(0);
  const [isAlreadyRated, setisAlreadyRated] = useState(false);
  const [likeUser, setLikeUser] = useState([]);
  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [isFecthingStrategy, setisFecthingStrategy] = useState(false)
  const [teachinStratText,setTeachingStratText] = useState("")
  const navigate = useNavigate();
  const pRef = useRef(null);

  // Function to handle a star click
  const handleStarClick = (starIndex) => {
    setRating(starIndex);
    setisUsedStrategy(false);
    sendRating(starIndex);
    setisAlreadyRated(true);
  };
  React.useEffect(() => {
    singleStratigys(id).then((res) => {
      setStr(res[0]);
      setComment(res[1]?.comments);
    });
  }, [id]);

  const handleSeeComment = () => {
    if (seeComment) {
      setSeecomment(false);
    } else {
      setSeecomment(true);
    }
  };
  const handleBackClick = () => {
    window.history.go(-1);
  };
  const handleComment = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      strategie_id: id,
      user_name: `${user.firstName} ${user.lastName}`,
      comment: e.target.comment.value,
      postTime: new Date(),
    };
    postcomment(data).then((res) => {
      singleStratigys(id).then((res) => {
        setStr(res[0]);
        setComment(res[1]?.comments);
        e.target.reset();
        setIsLoading(false);
      });
    });
  };

  React.useEffect(() => {
    getLikes().then((res) => {
      const totalLike = res?.data?.filter((ress) => ress.strategie_id === id);
      setTotalUserLikes(totalLike.length);
      const userlike = totalLike?.filter((ress) => ress?.user_id === user._id);
      setLikeUser(userlike);
      setUserLikes(userlike?.map((ress) => ress?.strategie_id));
      getMultitUser(totalLike?.map((user_id) => user_id?.user_id)).then(
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
  const handleEditStrategy = async () => {
    await seteditStrategyFormData(str);
    navigate(`/editStrategyform/${str._id}`);
  };
  const handleUsedStrategy = () => {
    setisUsedStrategy(true);
  };
  const handleCloseRatingModal = () => {
    setisUsedStrategy(false);
  };

  useEffect(() => {
    setTimeout(() => {
      const newText = replaceNewlinesWithLineBreaks(str["Teaching Strategy"]);
      if (pRef.current) {
        pRef.current.innerHTML = newText;
        setTeachingStratText(newText);
      }
      setformatted(""); // Assign the new HTML to the innerHTML property
      setIsLoadingContent(false); // Mark loading as complete
    }, 100); 
  }, [str["Teaching Strategy"]]);
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

      <div className="mx-2 mx-md-4">
        <p className="single_str_head">
        {str?.Grade} &gt; {str?.Subject} &gt;  {str?.['Super Topic']} &gt; {str?.Topic}{" "}
          &gt; {str[`Sub Topic`]} &gt; {str["Sub-sub topic"]}
        </p>
      </div>

      <div className="mx-2 mx-md-4">
        <div className="card_pad">
          <div className="my-4">
            <div className="d-flex justify-content-between my-4 flex-column">
              <p className="savestr_head mt-0">
                {t("Learning Outcomes")}:
                <span className="learningOutcome">
                  {str["Learning Outcome"]}
                </span>
              </p>

              <div className="col-9  w-100 textContainer p-2 p-md-4">
                <div className="me-1">
                  <div>
                    <div className=" mb-md-1 str_title">
                      <p className="str_name">{t("strategy")}</p>
                    </div>
                    {
                      str["Pedagogical Approach"]&&
                    <div className="mb-md-1 ">
                      <i className="pedalogicalText">{str["Pedagogical Approach"]}</i>
                    </div>
                    }
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
                            className="save_like"
                            src={SavedIcon}
                            alt="SavedIcon"
                          />
                        ) : (
                          <img
                            onClick={() => handleApiSaves(str?._id)}
                            className="save_like"
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
                            className="save_likes"
                            src={LikedIcon}
                            alt="LikedIcon"
                          />
                        ) : (
                          <img
                            onClick={() => handleApiLikes(str?._id)}
                            className="save_likes"
                            src={LikeIcon}
                            alt="LikedIcon"
                          />
                        )}
                      </div>

                    </div>

                    {!isAlreadyRated ? (
                      <button
                        className="secondaryButton"
                        onClick={handleUsedStrategy}
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
                {/* ================ FOR LARGE SCREEN =============  */}
                <div className="largeCommentContainer">
                  <div className="comment_div d-none d-md-block">
                    <p className="comment_div_p">{t("Comments")}</p>
                    <form onSubmit={handleComment}>
                      <div>
                        <input
                          required
                          name="comment"
                          placeholder={`${t("Add a comment")}...`}
                          className="w-100 comment_input"
                          type="text"
                        />
                      </div>
                      <div className="d-flex justify-content-end comment_submit">
                        <input
                          disabled={isLoading}
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
                          <img width="10px" src={DownArrow} alt="DownArrow" />
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
                          <img width="10px" src={UpArrow} alt="DownArrow" />
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
                {/* ============ FOR SMALL SCREEN ================  */}
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
                      <input type="submit" />
                    </div>
                  </form>
                  <div className={!seeComment ? "d-block" : "d-none"}>
                    <div
                      onClick={handleSeeComment}
                      className="text-center see_comment"
                    >
                      <p className="m-0">
                        View comments {comment?.length}{" "}
                        <img width="7px" height="5px" src={DownArrow} alt="DownArrow" />
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
                        <img width="7px" height="5px" src={UpArrow} alt="DownArrow" />
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

export default SingleStr;