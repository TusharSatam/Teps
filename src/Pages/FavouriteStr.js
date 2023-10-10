import React, { useEffect, useRef } from "react";
import OfflineIcon from "../asstes/icons/offline.svg";
import ChatIcon from "../asstes/icons/chat.svg";
import KnowledgeIcon from "../asstes/icons/knowledge.svg";
import Physical from "../asstes/icons/Motor-Physical.png";
import Social from "../asstes/icons/Socio-Emotional-Ethical.png";
import LikeIcon from "../asstes/icons/Like.svg";
import LikedIcon from "../asstes/icons/Liked.svg";
import OnlineIcon from "../asstes/icons/online.svg";
import { useTranslation } from "react-i18next";
import { useAuth } from "../Context/AuthContext";
import Filter from "../asstes/Filter.svg";
import FilterHover from "../asstes/icons/filter_icon.svg";
import HomeLayout from "../Components/Home/HomeLayout";
import { useState } from "react";
import "./styles/saveStratigy.css";
import { getMultitStr } from "../services/stratigyes";
import { getSingleUser, updateUser } from "../services/dashboardUsers";
import FilterStr from "../Components/Home/FilterStr";
import { Link, useLocation } from "react-router-dom";
import { getMultitHiStr } from "../services/hindiStratigys";
import { delUserLikes, getLikes, postLikes } from "../services/userLikes";
import { getMultiUsertStr } from "../services/userStratigy";
import { getMultiUserHindiStr } from "../services/userStratigyHi";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import UserImage from "../asstes/Group 51.svg";
import { Buffer } from "buffer";
import FilterStrHI from "../Components/Home/FilterStrHI";

const FavouriteStr = () => {
  const { user, setUser, stratigyFilData } = useAuth();
  const [filetr, setFilter] = useState(false);
  const [favStratigy, setFavStratigy] = useState([]);
  const [like, setLike] = React.useState([]);
  const [favStratigyHi, setfavStratigyi] = useState([]);
  const [languageSelect, setLanguageSelect] = React.useState("en");
  const { t } = useTranslation();
  const [likeUserStratigy, setlikeUserStratigy] = useState([]);
  const [likeStratigyHiUser, setlikeStratigyiUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const language = localStorage.getItem("i18nextLng");
  React.useEffect(() => {
    if (language === "hi") {
      setLanguageSelect("hi");
    } else {
      setLanguageSelect("en");
    }
  }, [language]);

  const handleFilter = () => {
    if (filetr) {
      setFilter(false);
    } else {
      setFilter(true);
    }
  };

  useEffect(()=>{
    console.log({favStratigyHi,likeStratigyHiUser,stratigyFilData})
  },[favStratigyHi,likeStratigyHiUser,stratigyFilData])
  const [likes, setLikes] = useState([]);
  React.useEffect(() => {
    setIsLoading(true);
    getLikes().then((res) => {
      const like = res?.data?.filter((ress) => ress.user_id === user._id);
      const likeId = like?.map((ress) => ress.strategie_id);
      setLikes(like?.map((ress) => ress.strategie_id));
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
          })
          .catch((err) => {
            setIsLoading(false);
            setFavStratigy([]);
          });
        getMultiUsertStr(likeId)
          .then((res) => {
            setlikeUserStratigy(res.data);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            setlikeUserStratigy([]);
          });
      } else {
        getMultitHiStr(likeId).then((res) => {
          console.log({data1:res.data})
          setfavStratigyi(res.data);
          setIsLoading(false);
        });
        getMultiUserHindiStr(likeId)
          .then((res) => {
            console.log({data2:res.data})
            setlikeStratigyiUser(res.data);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            setlikeStratigyiUser([]);
          });
      }
    });
  }, [languageSelect]);

  const handleApiLikes = (id) => {
    const data = {
      strategie_id: id,
      user_id: user._id,
    };
    postLikes(data).then((res) => {
      getLikes().then((res) => {
        const like = res?.data?.filter((ress) => ress.user_id === user._id);
        const likeId = like?.map((ress) => ress.strategie_id);
        setLikes(like?.map((ress) => ress.strategie_id));
        if (languageSelect === "en") {
          getMultitStr(likeId)
            .then((res) => {
              setFavStratigy(res.data);
            })
            .catch((err) => setFavStratigy([]));
          getMultiUsertStr(likeId)
            .then((res) => {
              setlikeUserStratigy(res.data);
            })
            .catch((err) => setlikeUserStratigy([]));
        } else {
          getMultitHiStr(likeId).then((res) => {
            setfavStratigyi(res.data);
          });
          getMultiUserHindiStr(likeId)
            .then((res) => {
              setlikeStratigyiUser(res.data);
            })
            .catch((err) => setlikeStratigyiUser([]));
        }
      });
    });
  };
  const handleApiUnLikes = (id) => {
    delUserLikes(id).then((res) => {
      getLikes().then((res) => {
        const like = res?.data?.filter((ress) => ress.user_id === user._id);
        const likeId = like?.map((ress) => ress.strategie_id);
        setLikes(like?.map((ress) => ress.strategie_id));
        if (languageSelect === "en") {
          getMultitStr(likeId)
            .then((res) => {
              setFavStratigy(res.data);
            })
            .catch((err) => setFavStratigy([]));
          getMultiUsertStr(likeId)
            .then((res) => {
              setlikeUserStratigy(res.data);
            })
            .catch((err) => setlikeUserStratigy([]));
        } else {
          getMultitHiStr(likeId).then((res) => {
            setfavStratigyi(res.data);
          });
          getMultiUserHindiStr(likeId)
            .then((res) => {
              setlikeStratigyiUser(res.data);
            })
            .catch((err) => setlikeStratigyiUser([]));
        }
      });
    });
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
  const location = useLocation()
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {user.firstName}
    </Tooltip>
  );
  return (
    <div>
      {languageSelect === "en" ? (
        <>
        {location.pathname!="/profile" &&  <div className="newSaveStrParent mx-0">
            <div className="row py-2 align-items-center">
              <div className="d-flex justify-content-center">
                <span className=" text-white text-center headText w-50">
                  {user.firstName} {user.lastName}
                  {t("’s")} {t("Favourite Strategies")}
                </span>
              </div>
              <div className="d-flex justify-content-end position-absolute ">
                <div onClick={handleFilter} className="filter_bTn">
                  <span className="me-1 me-md-0">{t("Filter")}</span>
                  <img src={Filter} alt="" className="filtericon2" />
                  <img src={FilterHover} alt="" className="filtericon3" />
                </div>
              </div>
            </div>
            <div className={filetr ? "d-block" : "d-none"}>
              <FilterStr stratigy={favStratigy} />
            </div>
          </div>}
          {isLoading ? (
            <div className="loadingWrap">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : favStratigy?.length === 0 && likeUserStratigy.length === 0 ? (
            <h1 className="my-5 text-center py-5 text-danger">
              {t("No Favourite Strategies available.")}
            </h1>
          ) : stratigyFilData?.length !== 0 ? (
            <>
              {stratigyFilData?.map((res, index) => (
                <div key={index} className="container">
                  <div className="card_pad">
                    <div className="mt-2 my-md-4">
                      <div className="filter_btn_container d-flex justify-content-end flex-column outcomeList ">
                        <Link to={`/single/${res._id}`} className="linkStyle">
                          <div className="me-1">
                            <div>
                              <div className="d-flex mb-3 str_text_left">
                                <p className="Strategy_count">
                                  {t("strategy")}
                                </p>
                                <p className="counter_str">{index + 1}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div>
                          <Link to={`/single/${res._id}`} className="linkStyle">
                            <p className="pedalogicalText">
                              {res?.["Pedagogical Approach"]}
                            </p>
                            <p style={{width:"100%"}} className="savestr_body">
                              {res["Teaching Strategy"].slice(0, 250)}...
                            </p>
                            <div className="strategyReadmore">
                              <Link to={`/single/${res._id}`}>
                                Read more...
                              </Link>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                // </Link>
              ))}
              {likeUserStratigy?.map((data, index) => (
                <div key={index} className="container">
                  <div className="card_pad">
                    <div className="mt-2 my-md-4">
                      <div className="filter_btn_container d-flex justify-content-end flex-column outcomeList ">
                        <Link
                          to={`/singleUserStratigy/${data._id}`}
                          className="linkStyle"
                        >
                          <div className="me-1">
                            <div>
                              <div className="d-flex mb-md-3 str_text_left">
                                <p className="Strategy_count">
                                  {t("strategy")}
                                </p>
                                <p className="counter_str">
                                  {favStratigy.length + index + 1}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div>
                          <Link
                            to={`/singleUserStratigy/${data._id}`}
                            className="linkStyle"
                          >
                            <p className="pedalogicalText">
                              {data?.["Pedagogical Approach"]}
                            </p>
                            <p style={{width:"100%"}} className="savestr_body">
                              {data["Teaching Strategy"].slice(0, 250)}...
                            </p>
                            <div className="strategyReadmore">
                              <Link to={`/singleUserStratigy/${data._id}`}>
                                Read more...
                              </Link>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {favStratigy?.map((data, index) => (
                <div key={index} className="container">
                  <div className="card_pad">
                    <div className="mt-2 my-md-4">
                      <div className="filter_btn_container d-flex justify-content-end flex-column outcomeList ">
                        <Link to={`/single/${data._id}`} className="linkStyle">
                          <div className="me-1">
                            <div>
                              <div className="d-flex mb-3 str_text_left">
                                <p className="Strategy_count">
                                  {t("strategy")}
                                </p>
                                <p className="counter_str">{index + 1}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div>
                          <Link
                            to={`/single/${data._id}`}
                            className="linkStyle"
                          >
                            <p className="pedalogicalText">
                              {data?.["Pedagogical Approach"]}
                            </p>
                            <p style={{width:"100%"}} className="savestr_body">
                              {data["Teaching Strategy"].slice(0, 250)}...
                            </p>
                            <div className="strategyReadmore">
                              <Link to={`/single/${data._id}`}>
                                Read more...
                              </Link>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {likeUserStratigy?.map((data, index) => (
                <div key={index} className="container">
                  <div className="card_pad">
                    <div className="mt-2 my-md-4">
                      <div className="filter_btn_container d-flex justify-content-end flex-column outcomeList ">
                        <Link
                          to={`/singleUserStratigy/${data._id}`}
                          className="linkStyle"
                        >
                          <div className="me-1">
                            <div>
                              <div className="d-flex mb-md-3 str_text_left">
                                <p className="Strategy_count">
                                  {t("strategy")}
                                </p>
                                <p className="counter_str">
                                  {favStratigy.length + index + 1}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div>
                          <Link
                            to={`/singleUserStratigy/${data._id}`}
                            className="linkStyle"
                          >
                            <p className="pedalogicalText">
                              {data?.["Pedagogical Approach"]}
                            </p>
                            <p style={{width:"100%"}} className="savestr_body">
                              {data["Teaching Strategy"].slice(0, 250)}...
                            </p>
                            <div className="strategyReadmore">
                              <Link to={`/singleUserStratigy/${data._id}`}>
                                Read more...
                              </Link>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      ) : (
        <>
          <div className="newSaveStrParent">
            <div className="row py-2">
              <div className="col-md-1"></div>
              <div className="col-8 col-md-10 text-white text-center headText mt-2 mt-md-0">
                {user.firstName}
                {user.lastName}
                {t("’s")} {t("Favourite Strategies")}
              </div>
              <div
                onClick={handleFilter}
                className="col-md-1 bg-white py-1 px-3 filterBtn"
              >
                <span>{t("Filter")}</span>
                <img src={Filter} className="filtericon3" alt="FilterIcon" />
              </div>
            </div>
            <div className={filetr ? "d-block" : "d-none"}>
              <FilterStr stratigy={favStratigyHi} />
            </div>
          </div>
          {isLoading ? (
            <div>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : favStratigyHi?.length === 0 ? (
            <h1 className="my-5 text-center py-5 text-danger">
              {t("No Saved Strategies available.")}
            </h1>
          ) : stratigyFilData?.length !== 0 ? (
            <>
              {stratigyFilData?.map((res, index) => (
                <div key={index} className="container">
                  <div className="card_pad">
                    <div className="mt-2 my-md-4">
                      <div className="filter_btn_container d-flex justify-content-end flex-column outcomeList ">
                        <Link to={`/singleHi/${res._id}`} className="linkStyle">
                          <div className="me-1">
                            <div>
                              <div className="d-flex mb-3">
                                <p className="Strategy_count">
                                  {t("strategy")}
                                </p>
                                <p className="counter_str">{index + 1}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div>
                          <Link
                            to={`/singleHi/${res._id}`}
                            className="linkStyle"
                          >
                            <p className="savestr_head mt-0">
                              {t("शिक्षण के परिणाम")}: {res["शिक्षण के परिणाम"]}
                            </p>
                            <p style={{width:"100%"}} className="savestr_body">
                              {res["शिक्षण के परिणाम"].slice(0, 250)}...
                            </p>
                            <div className="strategyReadmore">
                              <Link to={`/singleHi/${res._id}`}>
                                Read more...
                              </Link>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                // </Link>
              ))}
              {likeStratigyHiUser?.map((res, index) => (
                <div key={index} className="container">
                  <div className="card_pad">
                    <div className="mt-2 my-md-4">
                      <div className="filter_btn_container d-flex justify-content-end flex-column outcomeList ">
                        <Link to={`/singleHi/${res._id}`} className="linkStyle">
                          <div className="me-1">
                            <div>
                              <div className="d-flex mb-3">
                                <p className="Strategy_count">
                                  {t("strategy")}
                                </p>
                                <p className="counter_str">
                                  {stratigyFilData.length + index + 1}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div>
                          <Link
                            to={`/singleHi/${res._id}`}
                            className="linkStyle"
                          >
                            <p className="savestr_head mt-0">
                              {t("शिक्षण के परिणाम")}: {res["शिक्षण के परिणाम"]}
                            </p>
                            <p style={{width:"100%"}} className="savestr_body">
                              {res["शिक्षण के परिणाम"].slice(0, 250)}...
                            </p>
                            <div className="strategyReadmore">
                              <Link to={`/singleHi/${res._id}`}>
                                Read more...
                              </Link>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                // </Link>
              ))}
            </>
          ) : (
            <>
              {favStratigyHi?.map((data, index) => (
                <div key={index} className="container">
                  <div className="card_pad">
                    <div className="mt-2 my-md-4">
                      <div className="filter_btn_container d-flex justify-content-end flex-column outcomeList ">
                        <Link
                          to={`/singleHi/${data._id}`}
                          className="linkStyle"
                        >
                          <div className="me-1">
                            <div>
                              <div className="d-flex mb-3">
                                <p className="Strategy_count">
                                  {t("strategy")}
                                </p>
                                <p className="counter_str">{index + 1}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div>
                          <Link
                            to={`/singleHi/${data._id}`}
                            className="linkStyle"
                          >
                            <p className="savestr_head mt-0">
                              शिक्षण के परिणाम: {data["शिक्षण के परिणाम"]}
                            </p>
                            <p style={{width:"100%"}} className="savestr_body">
                              {data["शिक्षण के परिणाम"].slice(0, 250)}...
                            </p>
                            <div className="strategyReadmore">
                              <Link to={`/singleHi/${data._id}`}>
                                Read more...
                              </Link>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {likeStratigyHiUser?.map((data, index) => (
                <div key={index} className="container">
                  <div className="card_pad">
                    <div className="mt-2 my-md-4">
                      <div className="filter_btn_container d-flex justify-content-end flex-column outcomeList ">
                        <Link
                          to={`/singleHi/${data._id}`}
                          className="linkStyle"
                        >
                          <div className="me-1">
                            <div>
                              <div className="d-flex mb-3">
                                <p className="Strategy_count">
                                  {t("strategy")}
                                </p>
                                <p className="counter_str">
                                  {favStratigyHi.length + index + 1}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div>
                          <Link
                            to={`/singleHi/${data._id}`}
                            className="linkStyle"
                          >
                            <p className="savestr_head mt-0">
                              शिक्षण के परिणाम: {data["शिक्षण के परिणाम"]}
                            </p>
                            <p style={{width:"100%"}} className="savestr_body">
                              {data["शिक्षण के परिणाम"].slice(0, 250)}...
                            </p>
                            <div className="strategyReadmore">
                              <Link to={`/singleHi/${data._id}`}>
                                Read more...
                              </Link>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default FavouriteStr;