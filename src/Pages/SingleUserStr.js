import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import DownArrow from "../asstes/icons/DownArrow.svg";
import LikeIcon from "../asstes/icons/Like.svg";
import LikedIcon from "../asstes/icons/Liked.svg";
import backArrow from "../asstes/icons/backArrow.svg";
import SaveIcon from "../asstes/icons/Save.svg";
import SavedIcon from "../asstes/icons/Saved.svg";
import UpArrow from "../asstes/icons/upArrow.svg";
import LikeByModal from "../Components/Modal/LikeByModal";
import { useAuth } from "../Context/AuthContext";
import defaultProfile from "../asstes/defaultProfile.png";
import { getMultitUser, getSingleUser } from "../services/dashboardUsers";
import { Buffer } from "buffer";
import {
  deleteRating,
  getRatings,
  postRating,
  postcomment,
  putRating,
  singleStratigys,
} from "../services/stratigyes";
import { generateChatGPTResponse } from "../services/chatGpt";
import { delLikes, getLikes, postLikes } from "../services/userLikes";
import { delSaves, getSaves, postSaves } from "../services/userSaves";
import editIcon from "../asstes/icons/editIcon.svg";
import "./styles/saveStratigy.css";
import { replaceNewlinesWithLineBreaks } from "../utils/utils";

import RatingModal from "../Components/Modal/RatingModal/RatingModal";
import styles from "./styles/SingleStr.module.css";
import LoadingCarousel from "../Components/LoadingCarousel/LoadingCarousel";
import MagicWond from "../Components/CommonSvgs/MagicWond"
import CopySvg from "../Components/CommonSvgs/CopySvg"
import toast, { Toaster } from "react-hot-toast";
import { singleUserEnStratigys } from "../services/userStratigy";

const SingleUserStr = () => {

  const { user, seteditStrategyFormData,strategyNum,setselectedResource,isPlanExpired } = useAuth();
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
  const [isFecthing, setisFecthing] = useState(false);
  const [teachinStratText,setTeachingStratText] = useState("");
  const [chatGptResponse,setChatGptResponse] = useState("");
  const [chatGptError,setChatGptError] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const navigate = useNavigate();
  const pRef = useRef(null);
  const [uploader,setUploader] = useState('');
  const [btnClicked,setBtnClicked] = useState(null);

  // Function to handle a star click
  const handleStarClick = (starIndex) => {
    setRating(starIndex);
    setisUsedStrategy(false);
    sendRating(starIndex);
    setisAlreadyRated(true);
  };
  useEffect(() => {
    singleUserEnStratigys(id).then((res) => {
      setStr(res?.data[0]);
      setComment(res.data[1]?.comments);
      getSingleUser(res.data[0].User_id).then((res) => {
        setUploader(res.data[0]);
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
        (resUser) => setTotalLikeUser(resUser?.data)
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
    if(isPlanExpired){
      toast.error("Subscription required")
      return
    }
    else{
      await seteditStrategyFormData(str);
      navigate(`/editStrategyform/${str._id}/user`);
    }
  };
  const handleUsedStrategy = () => {
    setisUsedStrategy(true);
  };
  const handleCloseRatingModal = () => {
    setisUsedStrategy(false);
  };
const handleDeleteUsedStrategy=async()=>{
  const dataToSend = {
    user_id: user._id,
    strategy_id: id,
  };
  try {
    const response = await deleteRating(dataToSend);
    if(response){
      setisAlreadyRated(false)
    }
  } catch (error) {
    console.error("Error sending POST request:", error);
  }
}
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
      if(isAlreadyRated){
      const response = await putRating(dataToSend);
      console.log("put")
      }
      else{
        const response = await postRating(dataToSend);
      }
      console.log("post")
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

  const callChatGPTApi = (promptStart) => {
    setisFecthing(true);
    setChatGptError(false);
    generateChatGPTResponse({prompt:`${promptStart} ${str["Teaching Strategy"]}`}).then((res)=>{
      setisFecthing(false);
      setChatGptResponse(res?.data?.response);
      console.log({res});
    }).catch((err)=>{
      setisFecthing(false);
      setChatGptResponse("");
      setChatGptError(true);
      console.log({err});
    });
  }

  const handleCopyClick = () => {
    navigator.clipboard.writeText(chatGptResponse).then(() => {
      toast.success("Data Copied Successfully");
    })
    .catch((err) => {
      toast.error("Some error occured during copying");
      console.error('Unable to copy text to clipboard:', err);
    });
  };

  const handleExplore = (resource) => {
    if(isPlanExpired){
      toast.error("Subscription required")
      return
    }
    if(resource){
      console.log(resource);
      setselectedResource(resource)
    }
    navigate("/resources");
  };

  const handleExpiryRoute = (link) => {
    if (isPlanExpired) {
      toast.error("Subscription required");
    } else {
      navigate(link);
    }
  };
  const gptpRef = useRef(null); 
  useEffect(() => {
       const newText = replaceNewlinesWithLineBreaks(chatGptResponse);
       if (gptpRef.current) {
         gptpRef.current.innerHTML = newText;
       }
   }, [chatGptResponse]);

  return (
    <div>
      {isFecthing?<LoadingCarousel/>:null}
      <LikeByModal
        show={show}
        handleClose={() => setShow(false)}
        totalReact={totalLikeUser}
      />
      <div className=" d-flex justify-content-center align-items-center mb-1 position-relative strPageLine ">
        <button className="backbutton" onClick={handleBackClick}>
          <img src={backArrow} alt="backArrow" className="mb-md-1" />
          {`${t("Back")}`}
        </button>
        <hr className="line" />
        <p className="headText d-none d-md-block text-center">
          {t("Strategy")}
        </p>
        <hr className="line" />
      </div>

      <div className="mx-2 mx-md-4">
        <p className="single_str_head">
          {str?.Grade} &gt; {str?.Subject} &gt; {str?.["Super Topic"]} &gt;{" "}
          {str?.Topic} &gt; {str[`Sub Topic`]} &gt; {str["Sub-sub topic"]}
        </p>
      </div>

      <div className="mx-2 mx-md-4">
        <div className="card_pad">
          <div className="my-4">
            <div className="d-flex justify-content-between my-4 flex-column">
              <p className="savestr_head mt-0">
                {t("Learning Outcome")}:{" "}
                <span className="learningOutcome">
                  {str["Learning Outcome"]}
                </span>
              </p>

              <div className="col-9  w-100 textContainer p-2 p-md-4">
                <div className="me-1">
                  <div>
                    <div className=" mb-md-1 str_title">
                      <p className="str_name d-flex">
                        {t("strategy")}{" "}
                        {strategyNum != "" ? (
                          <span className="counter_str">{`${strategyNum}`}</span>
                        ) : (
                          ""
                        )}
                      </p>
                    </div>
                    <button className="userdetailsBox" onClick={()=>handleExpiryRoute(`/profile/${uploader?._id}`)}>
                      Strategy created by {uploader.firstName}{" "}
                      {uploader.image ? (
                        <img
                          src={
                            uploader?.image?.data?.data
                              ? `data:${
                                  uploader?.image?.contentType
                                };base64,${Buffer.from(
                                  uploader?.image?.data?.data
                                ).toString("base64")}`
                              : ""
                          }
                          alt="uploader"
                        />
                      ) : (
                        <img
                          width={"40px"}
                          height={"40px"}
                          className="label"
                          src={defaultProfile}
                          alt="image"
                        />
                      )}
                    </button>
                    {str["Pedagogical Approach"] && (
                      <div className="mb-md-1 ">
                        <i className="pedalogicalText">
                          {str["Pedagogical Approach"].toUpperCase()}
                        </i>
                      </div>
                    )}
                  </div>
                </div>
                {isLoadingContent ? (
                  "Loading..."
                ) : (
                  <p
                    ref={pRef}
                    className="newLine me-2 me-md-2 disableCopy"
                  ></p>
                )}

                <div className="d-flex justify-content-between my-2">
                  <div className="d-flex gap-2 gap-md-3 align-items-center">
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
                      <button
                        className="primaryButton"
                        onClick={handleDeleteUsedStrategy}
                      >
                        {t("I used this!")}
                      </button>
                    )}
                  </div>
                  <div className=" d-flex gap-3 justify-content-center">
                    <button
                      className="secondaryButton"
                      onClick={handleEditStrategy}
                    >
                      {t("Edit Strategy")}{" "}
                      <img src={editIcon} alt="edit" className="mx-md-2" />
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
                {/* //TODO:Enable after payment gateway */}
                <div className={styles.exploreTexts}>
                {str?.Grade == "Pre-K" ||
                  str?.Grade == "UKG" ||
                  str?.Grade == "LKG" ? (
                    <p onClick={()=>navigate("/resources")}>Explore more about foundational learning...</p>
                  ) : str["Pedagogical Approach"] == "Constructivism" ||
                    str["Pedagogical Approach"] == "Inquiry-based Learning" ||
                    str["Pedagogical Approach"] == "Project-based Learning" ? (
                    <p
                      onClick={() =>
                        handleExplore(str?.["Pedagogical Approach"])
                      }
                    >
                      Explore more about {str?.["Pedagogical Approach"]}...
                    </p>
                  ) : (
                    ""
                  )}
                </div>
                <div className={styles.chatGPTbox}>
                  <div className={styles.gptButtonsContainer}>
                    <div className={styles.magicIconBoxDesktop}>
                      <div>
                        <MagicWond mobile={false} />
                      </div>
                    </div>
                    <button
                      className={btnClicked===1?styles.clicked:""}
                      onClick={() => {
                        setBtnClicked(1);
                        callChatGPTApi(
                          "Please send a prior knowledge for the following teaching strategy"
                        );
                      }}
                    >
                      <MagicWond mobile={true} /> Prior knowledge
                    </button>
                    <button
                      className={btnClicked===2?styles.clicked:""}
                      onClick={() => {
                        setBtnClicked(2);
                        callChatGPTApi(
                          "Please send misconceptions for the following teaching strategy"
                        );
                      }}
                    >
                      <MagicWond mobile={true} /> Misconceptions
                    </button>
                    <button
                      className={btnClicked===3?styles.clicked:""}
                      onClick={() => {
                        setBtnClicked(3);
                        callChatGPTApi(
                          "Please send a understanding for the following teaching strategy"
                        );
                      }}
                    >
                      <MagicWond mobile={true} /> Check for understanding
                    </button>
                    <button
                      className={btnClicked===4?styles.clicked:""}
                      onClick={() => {
                        setBtnClicked(4);
                        callChatGPTApi(
                          "Please send a lesson plan for the following teaching strategy"
                        );
                      }}
                    >
                      <MagicWond mobile={true} /> Lesson Plan
                    </button>
                  </div>
                  {chatGptResponse.length !== 0 || chatGptError === true ? (
                    <div className={styles.gptAnswer}>
                      {chatGptResponse.length !== 0 && (
                        <div className={styles.copyContainer}>
                          <CopySvg onClick={handleCopyClick} />
                        </div>
                      )}
                      {chatGptResponse.length !== 0 && <p ref={gptpRef}>{chatGptResponse}</p>}
                      {chatGptError === true ? (
                        <p className={styles.gptError}>
                          We are experiencing difficulties while loading the
                          data.
                          <br /> Please try again.
                        </p>
                      ) : null}
                      {chatGptResponse.length !== 0 && (
                        <div className={styles.copyContainer}>
                          <CopySvg onClick={handleCopyClick} />
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
                {/* ================ FOR LARGE SCREEN =============  */}
                <div className="largeCommentContainer">
                  <div className="comment_div d-none d-md-block">
                    <form onSubmit={handleComment}>
                      <div>
                        <input
                          required
                          name="comment"
                          placeholder={`${t("Add a comment")}...`}
                          className="w-100 comment_input"
                          type="text"
                          onChange={(e) => setCommentInput(e.target.value)}
                        />
                      </div>
                      <div className="d-flex justify-content-end comment_submit">
                        <input
                          disabled={isLoading|| commentInput === ''}
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
                  <form onSubmit={handleComment}>
                    <div>
                      <input
                        required
                        name="comment"
                        placeholder="Add a comment..."
                        className="w-100 comment_input"
                        type="text"
                        onChange={(e) => setCommentInput(e.target.value)}
                      />
                    </div>
                    <div className="d-flex justify-content-end comment_submit">
                      <input type="submit" disabled={isLoading|| commentInput === ''}/>
                    </div>
                  </form>
                  <div className={!seeComment ? "d-block" : "d-none"}>
                    <div
                      onClick={handleSeeComment}
                      className="text-center see_comment"
                    >
                      <p className="m-0">
                        View comments {comment?.length}{" "}
                        <img
                          width="7px"
                          height="5px"
                          src={DownArrow}
                          alt="DownArrow"
                        />
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
                        <img
                          width="7px"
                          height="5px"
                          src={UpArrow}
                          alt="DownArrow"
                        />
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
      <Toaster  position="top-right" />
    </div>
  );
};

export default SingleUserStr;