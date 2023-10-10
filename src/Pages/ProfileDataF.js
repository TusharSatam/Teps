import React, { useEffect } from "react";
import LikeIcon from "../asstes/icons/Like.svg";
import LikedIcon from "../asstes/icons/Liked.svg";
import { useTranslation } from "react-i18next";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import "./styles/saveStratigy.css";
import { getMultitStr } from "../services/stratigyes";
import { Link } from "react-router-dom";
import { getMultitHiStr } from "../services/hindiStratigys";
import {
  delUserLikes,
  getLikes,
  getLikesByUserId,
  postLikes,
  unLikeByStratAndUserId,
} from "../services/userLikes";
import { getMultiUsertStr } from "../services/userStratigy";
import { getMultiUserHindiStr } from "../services/userStratigyHi";
import { Spinner } from "react-bootstrap";
import "./styles/profileData.css";
import FilterStrHI from "../Components/Home/FilterStrHI";

const ProfileDataF = ({ setNumber }) => {
  const { user, setUser, stratigyFilData,setstrategyNum  } = useAuth();
  const [filetr, setFilter] = useState(false);
  const [favStratigy, setFavStratigy] = useState([]);
  const [favStratigyHi, setFavStratigyHi] = useState([]);
  const [like, setLike] = React.useState([]);
  const [languageSelect, setLanguageSelect] = React.useState("en");
  const { t } = useTranslation();
  const [likeStratigyHiUser, setlikeStratigyiUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const language = localStorage.getItem("i18nextLng");
  React.useEffect(() => {
    if (language === "hi") {
      setLanguageSelect("hi");
    } else {
      setLanguageSelect("en");
    }
  }, [language]);

  const [likes, setLikes] = useState([]);
  const [likesArr, setLikesArr] = useState([]);
  const [specialLinkArr,setSpecialLinkArr]  = useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    getLikes().then((res) => {
      const like = res?.data?.filter((ress) => ress.user_id === user._id);
      const likeId = like?.map((ress) => ress.strategie_id);
      // setLikes(like?.map((ress) => ress.strategie_id));
      if (likeId.length === 0) {
        // No need to make API requests when savedId is empty
        setIsLoading(false);
        return; // Exit the useEffect
      }
      if (languageSelect === "en") {
        getMultitStr(likeId)
          .then((res) => {
            setFavStratigy(res.data);
            setIsLoading(false);
            const strategies = res?.data?.map((obj) => obj._id);
            setLikes(strategies);
            getMultiUsertStr(likeId)
              .then((res2) => {
                const idList = res2?.data?.map((obj)=>obj?._id);
                setSpecialLinkArr(prev=>[...prev,...idList]);
                setFavStratigy((prev) => [...prev, ...res2.data]);
                setIsLoading(false);
                const strategies = res2?.data?.map((obj) => obj._id);
                setLikes((prev) => [...prev, ...strategies]);
              })
              .catch((err) => {
                setIsLoading(false);
                setFavStratigy((prev) => [...prev]);
              });
          })
          .catch((err) => {
            setIsLoading(false);
            setFavStratigy([]);
          });
      } else {
        getMultitHiStr(likeId)
          .then((res) => {
            console.log({ data: res.data });
            setFavStratigyHi(res.data);
            const strategies = res?.data?.map((obj) => obj._id);
            setLikes(strategies);
            setIsLoading(false);
            getMultiUserHindiStr(likeId)
              .then((res2) => {
                console.log({ data2: res2.data });
                setFavStratigyHi((prev) => [...prev, ...res2.data]);
                setIsLoading(false);
                const strategies = res2?.data?.map((obj) => obj._id);
                setLikes((prev) => [...prev, ...strategies]);
              })
              .catch((err) => {
                setIsLoading(false);
                setFavStratigyHi((prev) => [...prev]);
              });
          })
          .catch((err) => {
            setIsLoading(false);
            setFavStratigyHi([]);
          });
      }
    });
  }, [languageSelect]);
  useEffect(() => {
    console.log({ likes });
  }, [likes]);
  useEffect(() => {
    console.log({ favStratigy });
  }, [favStratigy]);

  const handleApiLikes = (id) => {
    const data = {
      strategie_id: id,
      user_id: user._id,
    };
    postLikes(data).then((res) => {
      setLikes((prev) => [...prev, id]);
      // getLikes().then((res) => {
      //   const like = res?.data?.filter((ress) => ress.user_id === user._id);
      //   const likeId = like?.map((ress) => ress.strategie_id);
      //   setLikes(like?.map((ress) => ress.strategie_id));
      //   if (languageSelect === "en") {
      //     getMultitStr(likeId)
      //       .then((res) => {
      //         setFavStratigy(res.data);
      //       })
      //       .catch((err) => setFavStratigy([]));
      //     getMultiUsertStr(likeId)
      //       .then((res) => {
      //         setlikeUserStratigy(res.data);
      //       })
      //       .catch((err) => setlikeUserStratigy([]));
      //   } else {
      //     getMultitHiStr(likeId).then((res) => {
      //       setfavStratigyi(res.data);
      //     });
      //     getMultiUserHindiStr(likeId)
      //       .then((res) => {
      //         setlikeStratigyiUser(res.data);
      //       })
      //       .catch((err) => setlikeStratigyiUser([]));
      //   }
      // });
    });
  };
  const handleApiUnLikes = (id) => {
    const requiredStr = likes.find((str) => str === id);
    console.log({ requiredStr });
    const bodyData = {
      strategie_id: requiredStr,
      user_id: user._id,
    };
    unLikeByStratAndUserId(bodyData)
      .then((res) => {
        setLikes(likes.filter((stringData) => stringData !== id));
        // getLikes().then((res) => {
        //   const like = res?.data?.filter((ress) => ress.user_id === user._id);
        //   const likeId = like?.map((ress) => ress.strategie_id);
        //   setLikes(like?.map((ress) => ress.strategie_id));
        //   if (languageSelect === "en") {
        //     getMultitStr(likeId)
        //       .then((res) => {
        //         setFavStratigy(res.data);
        //       })
        //       .catch((err) => setFavStratigy([]));
        //     getMultiUsertStr(likeId)
        //       .then((res) => {
        //         setlikeUserStratigy(res.data);
        //       })
        //       .catch((err) => setlikeUserStratigy([]));
        //   } else {
        //     getMultitHiStr(likeId).then((res) => {
        //       setfavStratigyi(res.data);
        //     });
        //     getMultiUserHindiStr(likeId)
        //       .then((res) => {
        //         setlikeStratigyiUser(res.data);
        //       })
        //       .catch((err) => setlikeStratigyiUser([]));
        //   }
        // });
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const [showAll, setShowAll] = useState(false);
  const displayCount = showAll
    ? languageSelect === "en"
      ? favStratigy?.length
      : favStratigyHi?.length
    : 2;
  React.useEffect(() => {
    if (languageSelect === "en") {
      setNumber(favStratigy?.length);
    }
    if (languageSelect === "hi") {
      setNumber(favStratigyHi?.length);
    }
  }, [favStratigy, favStratigyHi, languageSelect]);
  useEffect(() => {
    console.log({ likes });
  }, [likes]);
  return (
    <div>
      {languageSelect === "en" ? (
        <>
          <div
            onClick={() => {
              setCollapse((prev) => !prev);
            }}
            className={collapse ? "saveStrParent" : "saveStrParentActive"}
          >
            <div className="row py-2 align-items-center" id="div1">
              <div className="d-flex justify-content-start">
                <span
                  className={
                    favStratigy?.length === 0
                      ? "headText w-50 impGray"
                      : "headText w-50"
                  }
                >
                  {t("Favourite Strategies")}
                </span>
              </div>
              <div
                className="filter_btn_container d-flex justify-content-end"
                id="at"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="d-none d-md-block"
                >
                  <g
                    clip-path="url(#clip0_4614_16349)"
                    transform={collapse ? "" : "rotate(180, 12, 12)"}
                  >
                    <path
                      d="M11.5 12.5456L15.0002 10L16 10.7272L11.5 14L7 10.7272L7.99984 10L11.5 12.5456Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4614_16349">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span
                  className={
                    favStratigy?.length === 0
                      ? "impGray d-md-none"
                      : "d-md-none"
                  }
                >
                  ({favStratigy?.length})
                </span>
              </div>
            </div>
          </div>
          {isLoading && !collapse ? (
            <div id="div2">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : favStratigy?.length === 0 && collapse !== true ? (
            <h1 className="my-5 text-center py-5 text-danger">
              {t("No Favourite Strategies available.")}
            </h1>
          ) : favStratigy?.length !== 0 && collapse !== true ? (
            <div>
              {favStratigy?.slice(0, displayCount).map((res, index) => (
                <div key={index} className="cardContainer">
                            <p id="bswm">{res["Pedagogical Approach"]}</p>
                            <p className="savestr_body">
                              {res["Teaching Strategy"]?.slice(0, 150) + "..."}

                              
                            </p><Link to={specialLinkArr.includes(res?._id)?`/singleUserStratigy/${res?._id}`:`/single/${res._id}`} id="pgnw"  onClick={()=>setstrategyNum(index+1)}>
                                Read More...
                              </Link>
                            <div
                              style={{ cursor: "pointer" }}
                              className="saveLikebtn"
                            >
                              {likes?.includes(res._id) ? (
                                <img
                                  onClick={() => handleApiUnLikes(res._id)}
                                  src={LikedIcon}
                                  alt="unlike"
                                />
                              ) : (
                                <img
                                  onClick={() => handleApiLikes(res._id)}
                                  src={LikeIcon}
                                  alt="like"
                                />
                              )}
                            </div>
                      
                  
                </div>
              ))}
              {!showAll && favStratigy.length > 2 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <button
                    onClick={() => {
                      setShowAll(true);
                    }}
                    className="loadMore"
                  >
                    Load More...
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
        </>
      ) : (
        <>
          <div
            onClick={() => {
              setCollapse((prev) => !prev);
            }}
            className={collapse ? "saveStrParent" : "saveStrParentActive"}
          >
            <div className="row py-2 align-items-center" id="div1">
              <div className="d-flex justify-content-start">
                <span
                  className={
                    favStratigyHi?.length === 0
                      ? "headText w-50 impGray"
                      : "headText w-50"
                  }
                >
                  {t("Favourite Strategies")}
                </span>
              </div>
              <div
                className="filter_btn_container d-flex justify-content-end"
                id="at"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="d-none d-md-block"
                >
                  <g
                    clip-path="url(#clip0_4614_16349)"
                    transform={collapse ? "" : "rotate(180, 12, 12)"}
                  >
                    <path
                      d="M11.5 12.5456L15.0002 10L16 10.7272L11.5 14L7 10.7272L7.99984 10L11.5 12.5456Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4614_16349">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span
                  className={
                    favStratigyHi?.length === 0
                      ? "impGray d-md-none"
                      : "d-md-none"
                  }
                >
                  ({favStratigyHi?.length})
                </span>
              </div>
            </div>
          </div>
          {isLoading && !collapse ? (
            <div id="div2">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : favStratigyHi?.length === 0 && collapse !== true ? (
            <h1 className="my-5 text-center py-5 text-danger">
              {t("No Favourite Strategies available.")}
            </h1>
          ) : favStratigyHi?.length !== 0 && collapse !== true ? (
            <div>
              {favStratigyHi?.slice(0, displayCount).map((res, index) => (
                <div key={index} className="cardContainer">
                <p id="bswm">{res["शिक्षण के परिणाम"]}</p>
                <p className="savestr_body">
                  {res["शिक्षण रणनीति"]?.slice(0, 150) + "..."}

                  
                </p><Link to={`/singleHi/${res._id}`} id="pgnw"  onClick={()=>setstrategyNum(index+1)}>
                                Read More...
                              </Link>
                <div
                  style={{ cursor: "pointer" }}
                  className="saveLikebtn"
                >
                  {likes?.includes(res._id) ? (
                    <img
                      onClick={() => handleApiUnLikes(res._id)}
                      src={LikedIcon}
                      alt="unlike"
                    />
                  ) : (
                    <img
                      onClick={() => handleApiLikes(res._id)}
                      src={LikeIcon}
                      alt="like"
                    />
                  )}
                </div>
          
      
    </div>
              ))}
              {!showAll && favStratigyHi.length > 2 ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <button
                    onClick={() => {
                      setShowAll(true);
                    }}
                    className="loadMore"
                  >
                    Load More...
                  </button>
                </div>
              ) : null}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default ProfileDataF;
