import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../Context/AuthContext";
import Filter from "../asstes/Filter.svg";
import FilterHover from "../asstes/icons/filter_icon.svg";
import { useState } from "react";
import "./styles/saveStratigy.css";
import { getMultitStr } from "../services/stratigyes";
import { getSingleUser } from "../services/dashboardUsers";
import FilterStr from "../Components/Home/FilterStr";
import { Link, useParams } from "react-router-dom";
import { getMultitHiStr } from "../services/hindiStratigys";
import { getLikes } from "../services/userLikes";
import { getMultiUsertStr } from "../services/userStratigy";
import { getMultiUserHindiStr } from "../services/userStratigyHi";
import { Spinner } from "react-bootstrap";
import backArrow from "../asstes/icons/backArrow.svg";

const OtherFavouriteStrategies = () => {
  const { stratigyFilData,setstrategyNum } = useAuth();
  const [filetr, setFilter] = useState(false);
  const [favStratigy, setFavStratigy] = useState([]);
  const [favStratigyHi, setfavStratigyi] = useState([]);
  const [languageSelect, setLanguageSelect] = React.useState("en");
  const { t } = useTranslation();
  const [likeUserStratigy, setlikeUserStratigy] = useState([]);
  const [likeStratigyHiUser, setlikeStratigyiUser] = useState([]);
  const [user,setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const language = localStorage.getItem("i18nextLng");
  const {id} = useParams();
  useEffect(()=>{getSingleUser(id).then((res)=>{
    setUser(res?.data[0])
  })},[id]);
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

  useEffect(() => {
    console.log({ favStratigyHi, likeStratigyHiUser, stratigyFilData });
  }, [favStratigyHi, likeStratigyHiUser, stratigyFilData]);
  React.useEffect(() => {
    setIsLoading(true);
    getLikes().then((res) => {
      const like = res?.data?.filter((ress) => ress.user_id === id);
      const likeId = like?.map((ress) => ress.strategie_id);
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
          console.log({ data1: res.data });
          setfavStratigyi(res.data);
          setIsLoading(false);
        });
        getMultiUserHindiStr(likeId)
          .then((res) => {
            console.log({ data2: res.data });
            setlikeStratigyiUser(res.data);
            setIsLoading(false);
          })
          .catch((err) => {
            setIsLoading(false);
            setlikeStratigyiUser([]);
          });
      }
    });
  }, [languageSelect,id]);
  const handleBackClick = () => {
    window.history.go(-1);
  };
  useEffect(()=>{

  },[id]);
  return (
    <div>
      {languageSelect === "en" ? (
        <>
          <div className=" d-flex justify-content-center align-items-center mb-1 position-relative HeadLine ">
            <button className="backbutton" onClick={handleBackClick}>
              <img src={backArrow} alt="backArrow" className="mb-md-1" />
              {`${t("Back")}`}
            </button>
            <hr className="line" />
            <span className="text-center headText w-50 d-none d-md-block">
              {user?.firstName} {user?.lastName}
              {t("’s")} {t("Favourite Strategies")}
            </span>
            <div className="filter_btn_container d-flex justify-content-end position-absolute">
              <div onClick={handleFilter} className="filter_bTn">
                <span className="me-1 me-md-0">{t("Filter")}</span>
                <img src={Filter} alt="" className="filtericon2" />
                <img src={FilterHover} alt="" className="filtericon3" />
              </div>
            </div>
            <hr className="line" />
          </div>
          <div className={filetr ? "d-block" : "d-none"}>
            <FilterStr stratigy={favStratigy} language={languageSelect} />
          </div>

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
                      <div className="filter_btn_container d-flex justify-content-end flex-column outcomeList " onClick={()=>setstrategyNum(index+1)}>
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
                      <div className="filter_btn_container d-flex justify-content-end flex-column outcomeList " onClick={()=>setstrategyNum(index+1)}>
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
                      <div className="filter_btn_container d-flex justify-content-end flex-column outcomeList " onClick={()=>setstrategyNum(index+1)}>
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
                      <div className="filter_btn_container d-flex justify-content-end flex-column outcomeList " onClick={()=>setstrategyNum(index+1)}>
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
                {user?.firstName}
                {user?.lastName}
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
                      <div className="filter_btn_container d-flex justify-content-end flex-column outcomeList " onClick={()=>setstrategyNum(index+1)}>
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
                      <div className="filter_btn_container d-flex justify-content-end flex-column outcomeList " onClick={()=>setstrategyNum(index+1)}>
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
                      <div className="filter_btn_container d-flex justify-content-end flex-column outcomeList " onClick={()=>setstrategyNum(index+1)}>
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
                      <div className="filter_btn_container d-flex justify-content-end flex-column outcomeList " onClick={()=>setstrategyNum(index+1)}>
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

export default OtherFavouriteStrategies;
