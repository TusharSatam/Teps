import React from "react";
import LikeIcon from "../asstes/icons/Like.svg";
import LikedIcon from "../asstes/icons/Liked.svg";
import { useTranslation } from "react-i18next";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import "./styles/saveStratigy.css";
import { getMultitStr } from "../services/stratigyes";
import { Link } from "react-router-dom";
import { getMultitHiStr } from "../services/hindiStratigys";
import { delUserLikes, getLikes, postLikes } from "../services/userLikes";
import { getMultiUsertStr } from "../services/userStratigy";
import { getMultiUserHindiStr } from "../services/userStratigyHi";
import {  Spinner } from "react-bootstrap";

import FilterStrHI from "../Components/Home/FilterStrHI";

const ProfileDataF= () => {
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

 

  const [likes, setLikes] = useState([]);
  React.useEffect(() => {
    setIsLoading(true);
    getLikes().then((res) => {
      const like = res?.data?.filter((ress) => ress.user_id === user._id);
      
      const likeId = like?.map((ress) => ress.strategie_id);
      setLikes(like?.map((ress) => ress.strategie_id));
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
          setfavStratigyi(res.data);
          setIsLoading(false);
        });
        getMultiUserHindiStr(likeId)
          .then((res) => {
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
   return (
    <div>
    {languageSelect === "en" ? (
      <>
        <div className="saveStrParent">
          <div className="row py-2 align-items-center" style={{ alignItems: "center" }}>
            <div className="d-flex justify-content-center">
              <span className="text-white text-center headText w-50">
                {user.firstName} {user.lastName}
                {t("’s")} {t("Favourite Strategies")}
              </span>
            </div>
            <div className="d-flex justify-content-end " style={{ position: "absolute", top: "100" }}>
           
            </div>
          </div>
         
        </div>
        {isLoading ? (
          <div style={{ marginLeft: "650px", marginTop: "150px", marginBottom: "150px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : favStratigy?.length === 0 && likeUserStratigy.length === 0 ? (
          <h1 className="my-5 text-center py-5 text-danger">
            {t("No Favourite Strategies available.")}
          </h1>
        ) : (
          stratigyFilData?.length !== 0 ? (
            <>
              {stratigyFilData?.map((res, index) => (
                <div key={index} className="container">
                  <div style={{ background: "#FFFFFF" }} className="card_pad">
                    <div className="my-4">
                      <div className="d-flex justify-content-between my-4 ">
                        <Link to={`/single/${res._id}`} style={{ textDecoration: "none", color: "black" }}>
                          <div className="me-1">
                            <div>
                              <div className="d-flex mb-3 str_text_left">
                                <p className="Strategy_count">{t("strategy")}</p>
                                <p className="counter_str">{index + 1}</p>
                              </div>
                            </div>
                            <div className="d-block d-md-none mt-1">
                              <div className="mt-1" style={{ marginLeft: "20px" }}>
                                <div className="res_btn_icon"></div>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div className="col-9 ms-md-4 col-md-8 ">
                          <Link style={{ textDecoration: "none", color: "black" }}>
                            <p style={{ color: "brown", fontSize: "17px", fontWeight: "500", margin: "30px 0px -30px" }}>Project-based Learning</p>
                            <p className="savestr_head">
                              Learning Outcome: {res["Learning Outcome"]}
                            </p>
                            <p className="savestr_body">
                              {res["Teaching Strategy"].slice(0, 150) + "..."}
  
                              <Link
                                to={`/favouriteStratigy`}
                                style={{
                                  cursor: "pointer",
                                  color: "green",
                                  textDecoration: "none",
                                  fontWeight: "600"
                                }}
                              >
                                Load All
                              </Link>
                            </p>
                          </Link>
                          <div className="d-flex align-items-center my-3">
                            {likes?.includes(res._id) ? (
                              <img
                                onClick={() => handleApiUnLikes(res._id)}
                                style={{ cursor: "pointer" }}
                                className="me-2 me-md-3 save_like"
                                src={LikedIcon}
                                alt=""
                              />
                            ) : (
                              <img
                                onClick={() => handleApiLikes(res._id)}
                                style={{ cursor: "pointer" }}
                                className="me-2 me-md-3 save_like"
                                src={LikeIcon}
                                alt=""
                              />
                            )}
                          </div>
                        </div>
                        <div className="col-md-2 d-none d-md-block ms-5">
                          <div className="d-flex flex-column align-items-center justify-content-center">
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : null
        )}
      </>
    ) : null}
  </div>
   )};  

export default ProfileDataF