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
  deleteRating,
  getRatings,
  postRating,
  postcomment,
  putRating,
  singleStratigys,
} from "../services/stratigyes";
import { delLikes, getLikes, postLikes } from "../services/userLikes";
import { delSaves, getSaves, postSaves } from "../services/userSaves";
import LeftArrow from "../asstes/left-arrow.svg";
import editIcon from "../asstes/icons/editIcon.svg";
import "./styles/saveStratigy.css";
import { replaceNewlinesWithLineBreaks } from "../utils/utils";

import RatingModal from "../Components/Modal/RatingModal/RatingModal";
import styles from "./styles/SingleStr.module.css";
const SingleStr = () => {
  const { user, seteditStrategyFormData, strategyNum, setstrategyNum,setselectedResource } =
    useAuth();
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
  const [isFecthingStrategy, setisFecthingStrategy] = useState(false);
  const [teachinStratText, setTeachingStratText] = useState("");
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
  const handleExplore=(resource)=>{
    setselectedResource(resource)
    navigate('/resources')
  }
  const handleDeleteUsedStrategy = async () => {
    const dataToSend = {
      user_id: user._id,
      strategy_id: id,
    };
    try {
      const response = await deleteRating(dataToSend);
      if (response) {
        setisAlreadyRated(false);
      }
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
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
      if (isAlreadyRated) {
        const response = await putRating(dataToSend);
      } else {
        const response = await postRating(dataToSend);
      }
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
      <div className=" d-flex justify-content-center align-items-center mb-1 position-relative HeadLine ">
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
                    {str["Pedagogical Approach"] && (
                      <div className="mb-md-1 ">
                        <i className="pedalogicalText">
                          {str["Pedagogical Approach"]}
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
                <div className={styles.exploreTexts}>
                  {(str?.Grade === "UKG" ||
                    str?.Grade === "Pre-K" ||
                    str?.Grade === "LKG") &&
                  (str?.["Pedagogical Approach"] === "Constructivism" ||
                    str?.["Pedagogical Approach"] ===
                      "Inquiry-based Learning" ||
                    str?.["Pedagogical Approach"] ===
                      "Project-based Learning") ? (
                    <p on onClick={()=>handleExplore(str?.["Pedagogical Approach"])}>Explore more about {str?.["Pedagogical Approach"]}</p>
                  ) : null}
                </div>
                <div className={styles.chatGPTbox}>
                  <div className={styles.magicIconBox}>
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_5155_31706)">
                          <path
                            d="M1.34992 15.4864L0.576172 14.7114L11.9799 3.30762L12.7537 4.08137L1.34992 15.4864Z"
                            fill="url(#paint0_linear_5155_31706)"
                          />
                          <path
                            d="M12.5055 3.55767C12.2243 3.27642 11.9818 3.30767 11.9818 3.30767L9.9668 5.32267C10.0855 5.29642 10.2943 5.39767 10.4805 5.58267C10.6655 5.76767 10.7668 5.97642 10.7405 6.09642L12.7555 4.08142C12.7543 4.08142 12.7868 3.84017 12.5055 3.55767Z"
                            fill="url(#paint1_linear_5155_31706)"
                          />
                          <path
                            d="M3.1368 12.9249C2.85555 12.6436 2.61305 12.6749 2.61305 12.6749L0.591797 14.6949C0.710547 14.6686 0.925547 14.7649 1.1118 14.9499C1.2968 15.1349 1.39305 15.3511 1.3668 15.4699L3.3868 13.4486C3.3868 13.4486 3.41805 13.2061 3.1368 12.9249Z"
                            fill="url(#paint2_linear_5155_31706)"
                          />
                          <path
                            d="M1.36178 15.4739C1.45648 15.3792 1.35992 15.1291 1.1461 14.9153C0.932288 14.7015 0.682187 14.6049 0.587486 14.6996C0.492786 14.7943 0.589347 15.0444 0.803163 15.2582C1.01698 15.472 1.26708 15.5686 1.36178 15.4739Z"
                            fill="#9E9E9E"
                          />
                          <path
                            opacity="0.85"
                            d="M11.9783 3.31012L3.48583 11.8039C3.39083 11.8989 3.48708 12.1489 3.70083 12.3614C3.91458 12.5751 4.16458 12.6714 4.25833 12.5764L12.7521 4.08262C12.7521 4.08262 12.8046 3.84763 12.5046 3.55638C12.2046 3.26513 11.9783 3.31012 11.9783 3.31012Z"
                            fill="url(#paint3_linear_5155_31706)"
                          />
                          <path
                            opacity="0.22"
                            d="M9.07403 6.2141L0.581534 14.7078C0.486534 14.8028 0.582784 15.0528 0.796534 15.2653C1.01028 15.4791 1.26028 15.5753 1.35403 15.4803L9.84903 6.98785C9.84903 6.98785 9.90153 6.75285 9.60153 6.4616C9.30028 6.1716 9.07403 6.2141 9.07403 6.2141Z"
                            fill="#474747"
                          />
                          <path
                            d="M8.54596 2.35308L9.29346 1.60808C9.33471 1.56683 9.40596 1.60058 9.39971 1.65933L9.30346 2.53308C9.29971 2.56683 9.32346 2.59808 9.35846 2.60183L10.4285 2.72933C10.491 2.73683 10.5047 2.82183 10.446 2.84808L9.33096 3.34683C9.31471 3.35433 9.30221 3.36933 9.29721 3.38683L8.97471 4.49308C8.95971 4.54683 8.88721 4.55433 8.86096 4.50558L8.36221 3.59933C8.35632 3.58878 8.34755 3.58013 8.33693 3.57437C8.3263 3.56862 8.31426 3.566 8.30221 3.56683L7.34471 3.64433C7.33197 3.6454 7.31921 3.64253 7.30817 3.63608C7.29712 3.62964 7.28834 3.61995 7.283 3.60833C7.27767 3.59671 7.27606 3.58373 7.27837 3.57115C7.28069 3.55858 7.28683 3.54703 7.29596 3.53808L7.93096 2.91933C7.94971 2.90183 7.95471 2.87308 7.94471 2.84933L7.60846 2.08058C7.58596 2.02808 7.63971 1.97433 7.69221 1.99933L8.47846 2.36683C8.49971 2.37683 8.52721 2.37183 8.54596 2.35308Z"
                            fill="#FFBD59"
                          />
                          <path
                            d="M11.2613 7.90804L11.8538 8.18179C11.8688 8.18929 11.8863 8.18679 11.8988 8.17679L12.4926 7.72804C12.5238 7.70429 12.5663 7.72929 12.5638 7.76679L12.5076 8.50429C12.5063 8.52054 12.5138 8.53679 12.5288 8.54554L13.0951 8.89554C13.1288 8.91679 13.1201 8.96929 13.0801 8.97679L12.3701 9.12304C12.3526 9.12679 12.3388 9.13929 12.3351 9.15679L12.1838 9.82554C12.1751 9.86554 12.1213 9.87304 12.1013 9.83679L11.7863 9.26054C11.7825 9.25329 11.7767 9.24725 11.7696 9.24306C11.7626 9.23887 11.7545 9.2367 11.7463 9.23679L11.0013 9.26054C10.9626 9.26179 10.9413 9.21679 10.9651 9.18679L11.4451 8.61304C11.4563 8.60054 11.4588 8.58304 11.4526 8.56679L11.2001 7.96429C11.1863 7.92804 11.2251 7.89054 11.2613 7.90804Z"
                            fill="#FFBD59"
                          />
                          <path
                            d="M13.7056 1.45638L14.7594 0.98888C14.8119 0.96513 14.8581 1.01763 14.8306 1.06763L14.3094 2.02763C14.2969 2.05013 14.2994 2.07763 14.3156 2.09513L15.4444 3.19013C15.4781 3.22513 15.4494 3.28763 15.3981 3.29013L14.0131 3.04638C13.9919 3.04763 13.9719 3.06013 13.9606 3.08013L13.2319 4.41388C13.2044 4.46263 13.1344 4.45763 13.1231 4.40638L12.9806 3.10763C12.9778 3.09652 12.9716 3.08656 12.9629 3.07916C12.9542 3.07176 12.9433 3.06729 12.9319 3.06638L11.7881 2.88013C11.7394 2.87638 11.7206 2.81763 11.7581 2.78138L12.7144 2.04638C12.7281 2.03263 12.7356 2.01388 12.7331 1.99513L12.5619 0.54763C12.5569 0.49263 12.6256 0.45638 12.6644 0.49388L13.6419 1.44638C13.6581 1.46138 13.6831 1.46513 13.7056 1.45638Z"
                            fill="#FFBD59"
                          />
                          <path
                            d="M12.0355 3.35838C11.568 3.47838 11.0942 3.58213 10.6105 3.62213C10.1267 3.66588 9.63546 3.63088 9.15796 3.54463C8.68046 3.45588 8.21171 3.34463 7.73921 3.25713C7.26671 3.16963 6.79171 3.09963 6.31421 3.04463C6.07546 3.01713 5.83546 2.99713 5.59671 2.97338C5.36296 2.95088 5.13171 2.95713 4.91171 3.00838C4.69546 3.06338 4.49421 3.16713 4.36421 3.33713C4.23296 3.50463 4.17046 3.72213 4.17046 3.94588C4.16796 4.39713 4.34921 4.84713 4.57921 5.25338C4.81046 5.66213 5.11421 6.03338 5.41796 6.40463C6.02296 7.14963 6.67671 7.85838 7.32546 8.57213C7.65046 8.92963 7.97546 9.28588 8.29546 9.64838C8.61796 10.0084 8.92921 10.3796 9.22671 10.7621C9.52546 11.1434 9.80921 11.5421 10.0405 11.9746C10.098 12.0796 10.1617 12.1959 10.1805 12.3359C10.1867 12.4071 10.1792 12.4859 10.1392 12.5559C10.0992 12.6259 10.033 12.6696 9.96921 12.6984C9.83796 12.7509 9.70796 12.7546 9.58296 12.7484C9.45796 12.7409 9.33546 12.7209 9.21546 12.6934C8.73796 12.5771 8.29171 12.3784 7.86171 12.1546C7.64671 12.0421 7.43671 11.9221 7.23046 11.7959C7.02546 11.6684 6.82421 11.5334 6.62671 11.3959C7.03671 11.6509 7.45671 11.8884 7.89046 12.0946C8.32421 12.2996 8.77546 12.4784 9.23921 12.5721C9.35546 12.5934 9.47171 12.6109 9.58671 12.6146C9.70171 12.6184 9.81796 12.6084 9.91046 12.5684C9.95546 12.5471 9.99296 12.5196 10.0117 12.4821C10.0305 12.4459 10.0355 12.3996 10.0305 12.3509C10.0155 12.2509 9.96171 12.1509 9.90046 12.0471C9.66671 11.6346 9.38046 11.2496 9.07546 10.8796C7.85546 9.39963 6.46546 8.05463 5.22546 6.56213C4.92171 6.18588 4.61421 5.80338 4.37296 5.36963C4.13546 4.93963 3.93921 4.46213 3.94546 3.94088C3.94796 3.68338 4.02296 3.41213 4.19296 3.19963C4.36171 2.98338 4.61421 2.85838 4.86296 2.79838C5.11421 2.74338 5.37171 2.73713 5.61796 2.76588C5.85796 2.79588 6.09921 2.82088 6.33921 2.85463C6.81921 2.92213 7.29671 3.00463 7.77046 3.10338C8.24421 3.20338 8.71296 3.32338 9.18171 3.42463C9.64921 3.52713 10.1267 3.58088 10.6067 3.55588C11.0855 3.53338 11.5617 3.45213 12.0355 3.35838Z"
                            fill="#FFBD59"
                          />
                          <path
                            d="M8.473 4.45537C7.06675 4.78287 5.453 3.83037 3.963 3.99787C3.39425 4.07287 3.1605 4.75287 3.70675 5.83037C4.77925 7.67662 6.34425 8.76662 6.92175 9.44287C6.1455 9.00787 4.5505 7.86162 3.44175 6.78287C1.773 5.18287 2.08175 3.18287 3.62925 3.18912C4.148 3.13912 5.15175 3.38912 5.57175 3.54287C5.9855 3.70912 7.39425 4.32287 8.473 4.45537Z"
                            fill="url(#paint4_radial_5155_31706)"
                          />
                        </g>
                        <defs>
                          <linearGradient
                            id="paint0_linear_5155_31706"
                            x1="6.27792"
                            y1="9.00964"
                            x2="7.05201"
                            y2="9.78376"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0.595" stop-color="#616161" />
                            <stop offset="0.775" stop-color="#565656" />
                            <stop offset="1" stop-color="#424242" />
                          </linearGradient>
                          <linearGradient
                            id="paint1_linear_5155_31706"
                            x1="11.1105"
                            y1="4.31492"
                            x2="11.9587"
                            y2="5.16317"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0.262" stop-color="#F5F5F5" />
                            <stop offset="0.466" stop-color="#EAEAEA" />
                            <stop offset="0.822" stop-color="#CDCDCD" />
                            <stop offset="0.989" stop-color="#BDBDBD" />
                          </linearGradient>
                          <linearGradient
                            id="paint2_linear_5155_31706"
                            x1="1.73842"
                            y1="13.6844"
                            x2="2.58867"
                            y2="14.5345"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0.262" stop-color="#F5F5F5" />
                            <stop offset="0.466" stop-color="#EAEAEA" />
                            <stop offset="0.822" stop-color="#CDCDCD" />
                            <stop offset="0.989" stop-color="#BDBDBD" />
                          </linearGradient>
                          <linearGradient
                            id="paint3_linear_5155_31706"
                            x1="8.54908"
                            y1="7.5135"
                            x2="12.8738"
                            y2="3.18875"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stop-color="#FFBD59" stop-opacity="0" />
                            <stop offset="1" stop-color="#FFBD59" />
                          </linearGradient>
                          <radialGradient
                            id="paint4_radial_5155_31706"
                            cx="0"
                            cy="0"
                            r="1"
                            gradientUnits="userSpaceOnUse"
                            gradientTransform="translate(11.5958 8.76142) rotate(30.6965) scale(11.7163 7.02157)"
                          >
                            <stop stop-color="#FF914D" stop-opacity="0" />
                            <stop offset="1" stop-color="#FDD835" />
                          </radialGradient>
                          <clipPath id="clip0_5155_31706">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                  <div className={styles.gptButtonsContainer}>
                    <div className={styles.magicIconBoxDesktop}>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                        >
                          <path
                            d="M3.37578 38.7154L1.44141 36.7779L29.9508 8.26855L31.8852 10.2029L3.37578 38.7154Z"
                            fill="url(#paint0_linear_5282_23103)"
                          />
                          <path
                            d="M31.2629 8.89418C30.5598 8.19106 29.9535 8.26918 29.9535 8.26918L24.916 13.3067C25.2129 13.2411 25.7348 13.4942 26.2004 13.9567C26.6629 14.4192 26.916 14.9411 26.8504 15.2411L31.8879 10.2036C31.8848 10.2036 31.966 9.60043 31.2629 8.89418Z"
                            fill="url(#paint1_linear_5282_23103)"
                          />
                          <path
                            d="M7.84297 32.3122C7.13984 31.609 6.53359 31.6872 6.53359 31.6872L1.48047 36.7372C1.77734 36.6715 2.31484 36.9122 2.78047 37.3747C3.24297 37.8372 3.48359 38.3778 3.41797 38.6747L8.46797 33.6215C8.46797 33.6215 8.54609 33.0153 7.84297 32.3122Z"
                            fill="url(#paint2_linear_5282_23103)"
                          />
                          <path
                            d="M3.40543 38.6857C3.64218 38.4489 3.40078 37.8237 2.86624 37.2892C2.3317 36.7546 1.70644 36.5133 1.46969 36.75C1.23294 36.9868 1.47434 37.612 2.00888 38.1465C2.54342 38.6811 3.16868 38.9225 3.40543 38.6857Z"
                            fill="#9E9E9E"
                          />
                          <path
                            opacity="0.85"
                            d="M29.9439 8.27482L8.71262 29.5092C8.47512 29.7467 8.71575 30.3717 9.25012 30.9029C9.7845 31.4373 10.4095 31.6779 10.6439 31.4404L31.8783 10.2061C31.8783 10.2061 32.0095 9.61857 31.2595 8.89045C30.5095 8.16232 29.9439 8.27482 29.9439 8.27482Z"
                            fill="url(#paint3_linear_5282_23103)"
                          />
                          <path
                            opacity="0.22"
                            d="M22.6841 15.5348L1.45286 36.7691C1.21536 37.0066 1.45598 37.6316 1.99036 38.1629C2.52473 38.6973 3.14973 38.9379 3.38411 38.7004L24.6216 17.4691C24.6216 17.4691 24.7529 16.8816 24.0029 16.1535C23.2497 15.4285 22.6841 15.5348 22.6841 15.5348Z"
                            fill="#474747"
                          />
                          <path
                            d="M21.3649 5.88171L23.2337 4.01921C23.3368 3.91609 23.5149 4.00046 23.4993 4.14734L23.2587 6.33171C23.2493 6.41609 23.3087 6.49421 23.3962 6.50359L26.0712 6.82234C26.2274 6.84109 26.2618 7.05359 26.1149 7.11921L23.3274 8.36609C23.2868 8.38484 23.2555 8.42234 23.243 8.46609L22.4368 11.2317C22.3993 11.3661 22.218 11.3848 22.1524 11.263L20.9055 8.99734C20.8908 8.97097 20.8689 8.94934 20.8423 8.93495C20.8158 8.92057 20.7857 8.91403 20.7555 8.91609L18.3618 9.10984C18.3299 9.11253 18.298 9.10534 18.2704 9.08924C18.2428 9.07313 18.2208 9.0489 18.2075 9.01985C18.1942 8.9908 18.1901 8.95834 18.1959 8.92691C18.2017 8.89548 18.2171 8.8666 18.2399 8.84421L19.8274 7.29734C19.8743 7.25359 19.8868 7.18171 19.8618 7.12234L19.0212 5.20046C18.9649 5.06921 19.0993 4.93484 19.2305 4.99734L21.1962 5.91609C21.2493 5.94109 21.318 5.92859 21.3649 5.88171Z"
                            fill="#FFBD59"
                          />
                          <path
                            d="M28.1523 19.7691L29.6335 20.4535C29.671 20.4722 29.7148 20.466 29.746 20.441L31.2304 19.3191C31.3085 19.2597 31.4148 19.3222 31.4085 19.416L31.2679 21.2597C31.2648 21.3004 31.2835 21.341 31.321 21.3629L32.7367 22.2379C32.821 22.291 32.7992 22.4222 32.6992 22.441L30.9242 22.8066C30.8804 22.816 30.846 22.8472 30.8367 22.891L30.4585 24.5629C30.4367 24.6629 30.3023 24.6816 30.2523 24.591L29.4648 23.1504C29.4552 23.1323 29.4408 23.1171 29.4231 23.1067C29.4055 23.0962 29.3853 23.0908 29.3648 23.091L27.5023 23.1504C27.4054 23.1535 27.3523 23.041 27.4117 22.966L28.6117 21.5316C28.6398 21.5004 28.646 21.4566 28.6304 21.416L27.9992 19.9097C27.9648 19.8191 28.0617 19.7254 28.1523 19.7691Z"
                            fill="#FFBD59"
                          />
                          <path
                            d="M34.2661 3.64095L36.9004 2.4722C37.0317 2.41283 37.1473 2.54408 37.0786 2.66908L35.7754 5.06908C35.7442 5.12533 35.7504 5.19408 35.791 5.23783L38.6129 7.97533C38.6973 8.06283 38.6254 8.21908 38.4973 8.22533L35.0348 7.61595C34.9817 7.61908 34.9317 7.65033 34.9036 7.70033L33.0817 11.0347C33.0129 11.1566 32.8379 11.1441 32.8098 11.016L32.4535 7.76908C32.4466 7.7413 32.4311 7.7164 32.4092 7.6979C32.3873 7.6794 32.3602 7.66823 32.3317 7.66595L29.4723 7.20033C29.3504 7.19095 29.3035 7.04408 29.3973 6.95345L31.7879 5.11595C31.8223 5.08158 31.8411 5.0347 31.8348 4.98783L31.4067 1.36908C31.3942 1.23158 31.566 1.14095 31.6629 1.2347L34.1067 3.61595C34.1473 3.65345 34.2098 3.66283 34.2661 3.64095Z"
                            fill="#FFBD59"
                          />
                          <path
                            d="M30.0906 8.39644C28.9218 8.69644 27.7375 8.95582 26.5281 9.05582C25.3187 9.16519 24.0906 9.07769 22.8968 8.86207C21.7031 8.64019 20.5312 8.36207 19.35 8.14332C18.1687 7.92457 16.9812 7.74957 15.7875 7.61207C15.1906 7.54332 14.5906 7.49332 13.9937 7.43394C13.4093 7.37769 12.8312 7.39332 12.2812 7.52144C11.7406 7.65894 11.2375 7.91832 10.9125 8.34332C10.5843 8.76207 10.4281 9.30582 10.4281 9.86519C10.4218 10.9933 10.875 12.1183 11.45 13.1339C12.0281 14.1558 12.7875 15.0839 13.5468 16.0121C15.0593 17.8746 16.6937 19.6464 18.3156 21.4308C19.1281 22.3246 19.9406 23.2152 20.7406 24.1214C21.5468 25.0214 22.325 25.9496 23.0687 26.9058C23.8156 27.8589 24.525 28.8558 25.1031 29.9371C25.2468 30.1996 25.4062 30.4902 25.4531 30.8402C25.4687 31.0183 25.45 31.2152 25.35 31.3902C25.25 31.5652 25.0843 31.6746 24.925 31.7464C24.5968 31.8777 24.2718 31.8871 23.9593 31.8714C23.6468 31.8527 23.3406 31.8027 23.0406 31.7339C21.8468 31.4433 20.7312 30.9464 19.6562 30.3871C19.1187 30.1058 18.5937 29.8058 18.0781 29.4902C17.5656 29.1714 17.0625 28.8339 16.5687 28.4902C17.5937 29.1277 18.6437 29.7214 19.7281 30.2371C20.8125 30.7496 21.9406 31.1964 23.1 31.4308C23.3906 31.4839 23.6812 31.5277 23.9687 31.5371C24.2562 31.5464 24.5468 31.5214 24.7781 31.4214C24.8906 31.3683 24.9843 31.2996 25.0312 31.2058C25.0781 31.1152 25.0906 30.9996 25.0781 30.8777C25.0406 30.6277 24.9062 30.3777 24.7531 30.1183C24.1687 29.0871 23.4531 28.1246 22.6906 27.1996C19.6406 23.4996 16.1656 20.1371 13.0656 16.4058C12.3062 15.4652 11.5375 14.5089 10.9343 13.4246C10.3406 12.3496 9.84997 11.1558 9.8656 9.85269C9.87185 9.20895 10.0593 8.53082 10.4843 7.99957C10.9062 7.45894 11.5375 7.14644 12.1593 6.99644C12.7875 6.85894 13.4312 6.84332 14.0468 6.91519C14.6468 6.99019 15.25 7.05269 15.85 7.13707C17.05 7.30582 18.2437 7.51207 19.4281 7.75894C20.6125 8.00894 21.7843 8.30894 22.9562 8.56207C24.125 8.81832 25.3187 8.95269 26.5187 8.89019C27.7156 8.83394 28.9062 8.63082 30.0906 8.39644Z"
                            fill="#FFBD59"
                          />
                          <path
                            d="M21.1815 11.1379C17.6659 11.9567 13.6315 9.57543 9.90651 9.99418C8.48464 10.1817 7.90026 11.8817 9.26589 14.5754C11.9471 19.1911 15.8596 21.9161 17.3034 23.6067C15.3628 22.5192 11.3753 19.6536 8.60339 16.9567C4.43151 12.9567 5.20339 7.95668 9.07214 7.97231C10.369 7.84731 12.8784 8.47231 13.9284 8.85668C14.9628 9.27231 18.4846 10.8067 21.1815 11.1379Z"
                            fill="url(#paint4_radial_5282_23103)"
                          />
                          <defs>
                            <linearGradient
                              id="paint0_linear_5282_23103"
                              x1="15.6958"
                              y1="22.5236"
                              x2="17.631"
                              y2="24.4589"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0.595" stop-color="#616161" />
                              <stop offset="0.775" stop-color="#565656" />
                              <stop offset="1" stop-color="#424242" />
                            </linearGradient>
                            <linearGradient
                              id="paint1_linear_5282_23103"
                              x1="27.7754"
                              y1="10.7873"
                              x2="29.8957"
                              y2="12.9079"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0.262" stop-color="#F5F5F5" />
                              <stop offset="0.466" stop-color="#EAEAEA" />
                              <stop offset="0.822" stop-color="#CDCDCD" />
                              <stop offset="0.989" stop-color="#BDBDBD" />
                            </linearGradient>
                            <linearGradient
                              id="paint2_linear_5282_23103"
                              x1="4.34703"
                              y1="34.2109"
                              x2="6.47266"
                              y2="36.3362"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop offset="0.262" stop-color="#F5F5F5" />
                              <stop offset="0.466" stop-color="#EAEAEA" />
                              <stop offset="0.822" stop-color="#CDCDCD" />
                              <stop offset="0.989" stop-color="#BDBDBD" />
                            </linearGradient>
                            <linearGradient
                              id="paint3_linear_5282_23103"
                              x1="21.3707"
                              y1="18.7833"
                              x2="32.1826"
                              y2="7.97139"
                              gradientUnits="userSpaceOnUse"
                            >
                              <stop stop-color="#FFBD59" stop-opacity="0" />
                              <stop offset="1" stop-color="#FFBD59" />
                            </linearGradient>
                            <radialGradient
                              id="paint4_radial_5282_23103"
                              cx="0"
                              cy="0"
                              r="1"
                              gradientUnits="userSpaceOnUse"
                              gradientTransform="translate(28.9886 21.9031) rotate(30.6965) scale(29.2909 17.5539)"
                            >
                              <stop stop-color="#FF914D" stop-opacity="0" />
                              <stop offset="1" stop-color="#FDD835" />
                            </radialGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                    <button>Get worksheet</button>
                    <button>Prior knowledge</button>
                    <button>Misconception</button>
                    <button>Get a lesson plan</button>
                  </div>
                  <div className={styles.gptAnswer}>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Aspernatur dolorem distinctio ullam, amet sapiente
                      corporis neque rem tempora, sed voluptates laborum
                      perspiciatis incidunt blanditiis odit commodi in, sequi
                      nam accusantium officiis? Modi consequatur soluta, fuga
                      praesentium, repellat ipsa aspernatur unde minima nam
                      earum laboriosam voluptate odit blanditiis libero a odio
                      molestias. Odio quidem possimus nisi hic eaque saepe
                      dolorem neque, dolor illo maiores nesciunt similique illum
                      ad ex omnis, aperiam accusamus at porro a nihil ipsa
                      magni. Temporibus qui exercitationem obcaecati, eius
                      voluptas excepturi consequatur et voluptatem accusantium
                      illum tempora minima similique nostrum fugit sit illo
                      alias fuga! Aliquam, laboriosam.
                    </p>
                  </div>
                </div>
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
    </div>
  );
};

export default SingleStr;
