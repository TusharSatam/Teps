import { Buffer } from 'buffer';
import React, { useState } from 'react';
import { OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import Filter from "../asstes/Filter.svg";
import UserImage from '../asstes/Group 51.svg';
import ChatIcon from '../asstes/icons/chat.svg';
import FilterHover from "../asstes/icons/filter_icon.svg";
import KnowledgeIcon from '../asstes/icons/knowledge.svg';
import Physical from '../asstes/icons/Motor-Physical.png';
import OfflineIcon from '../asstes/icons/offline.svg';
import OnlineIcon from '../asstes/icons/online.svg';
import SaveIcon from '../asstes/icons/Save.svg';
import SavedIcon from '../asstes/icons/Saved.svg';
import Social from '../asstes/icons/Socio-Emotional-Ethical.png';
import FilterStr from '../Components/Home/FilterStr';
import { useAuth } from '../Context/AuthContext';
import { getHindiStratigysCreatedByUser, getMultitHiStr } from '../services/hindiStratigys';
import { getMultitStr } from '../services/stratigyes';
import { getUserStbyID, getUserCreated,PostUserCreated } from '../services/userCreated';
import { getMultiUsertStr } from '../services/userStratigy';
import { getMultiUserHindiStr } from '../services/userStratigyHi';
import './styles/saveStratigy.css';
import './styles/profileData.css';

const CreatedStratigy = () => {
  const { user, setUser, stratigyFilData } = useAuth()
  const [filetr, setFilter] = useState(false)
  const [saveStratigy, setSaveStratigy] = useState([])
  const [saveUserStratigy, setSaveUserStratigy] = useState([])
  const [saveStratigyHi, setSaveStratigyi] = useState([])
  const [saveStratigyHiUser, setSaveStratigyiUser] = useState([])
  const [languageSelect, setLanguageSelect] = React.useState("en")
  const [react, setReact] = React.useState(user ? user?.saveId : []);
  const { t } = useTranslation();
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const language = localStorage.getItem("i18nextLng")
 
  React.useEffect(() => {
    if (language === "hi") {
      setLanguageSelect("hi")
    }
    else {
      setLanguageSelect("en")
    }
  }, [language])

  const handleFilter = () => {
    if (filetr) {
      setFilter(false)
    }
    else {
      setFilter(true)
    }
  }
  const [save, setSave] = useState([]);

  React.useEffect(() => {
    setIsLoading(true)
    getUserCreated(user._id)
      .then(res => {
        const saves = res?.data?.filter(ress => ress.user_id === user._id)
        const savesId = saves?.map(ress => ress.strategie_id)
       
        setSave(saves?.map(ress => ress.strategie_id))
        if (languageSelect === "en") {
          
          getUserCreated(user._id)
            .then(res => {
              setSaveStratigy(res.data);
              setIsLoading(false)
            })
            .catch(err => {
              setIsLoading(false)
              setSaveStratigy([])
            })
          getMultiUsertStr(savesId)
            .then(res => {
              setSaveUserStratigy(res.data);
              setIsLoading(false)
            })
            .catch(err => {
              setSaveUserStratigy([])
              setIsLoading(false)
            })
        }
        else {
          getHindiStratigysCreatedByUser("6521953d46e580f49478ad11")
            .then(res => {
              console.log(res);
              setSaveStratigyi(res)
              setIsLoading(false)
            })

        }
      })

  }, [languageSelect])

  const handleApiSaves = (id) => {
    const data = {
      strategie_id: id,
      user_id: user._id
    }
    PostUserCreated(data)
      .then(res => {
        getUserCreated(user._id)
          .then(res => {
            const saves = res?.data?.filter(ress => ress.user_id === user._id)
            const savesId = saves?.map(ress => ress.strategie_id)
            setSave(saves?.map(ress => ress.strategie_id))
            if (languageSelect === "en") {
              getUserCreated(user._id)
                .then(res => {
                  setSaveStratigy(res.data);
                })
                .catch(err => setSaveStratigy([]))
              getMultiUsertStr(savesId)
                .then(res => {
                  setSaveUserStratigy(res.data);
                })
                .catch(err => setSaveUserStratigy([]))
            }
            else {
              getMultitHiStr(savesId)
                .then(res => {
                  setSaveStratigyi(res.data)
                })
              getMultiUserHindiStr(savesId)
                .then(res => {
                  setSaveStratigyiUser(res.data)
                })
            }
          })
      })
  }
  
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {user.firstName}
    </Tooltip>
  );
  return (
    <div>
      {languageSelect === "en" ? (
        <>
     {location.pathname!="/profile" &&   <div className="saveStrParent">
           {location.pathname!="/profile" && <div className="row py-2 align-items-center position-relative">
              <div className="d-flex justify-content-center">
                <span className=" text-white text-center headText w-50">
                  {user.firstName} {user.lastName}
                  {t("’s")} {t("Saved Strategies")}
                </span>
              </div>

        {location.pathname!="/profile"  &&    <div className="filter_btn_container d-flex justify-content-end position-absolute">
                <div onClick={handleFilter} className="filter_bTn">
                  <span className="me-1 me-md-0">{t("Filter")}</span>
                  <img src={Filter} alt="" className="filtericon2" />
                  <img src={FilterHover} alt="" className="filtericon3" />
                </div>
              </div>}
            </div>}
            <div className={filetr ? "d-block" : "d-none"}>
              <FilterStr stratigy={saveStratigy} language={languageSelect} />
            </div>
          </div>}
          {isLoading ? (
            <div className="loadingWrap">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : saveStratigy?.length === 0 && saveUserStratigy?.length === 0 ? (
            <h1 className="my-5 text-center py-5 text-danger">
              {t("No Saved Strategies available.")}
            </h1>
          ) : stratigyFilData?.length !== 0 ? (
            <>
              {stratigyFilData?.map((res, index) => (
                <div key={index} className="container">
                  <div className="card_pad">
                    <div className=" mt-2  mb-0 my-md-4">
                      <div className="d-flex justify-content-between  my-0 my-md-4 flex-column outcomeList">
                   {location.pathname!="/profile" &&    <Link to={`/single/${res._id}`} className="linkStyle">
                          <div className="me-1">
                            <div>
                              <div className="d-flex  str_text_left m-0">
                                <p className="Strategy_count mb-0">
                                  {t("strategy")}
                                </p>
                                <p className="counter_str mb-0">{index + 1}</p>
                              </div>
                            </div>
                          </div>
                        </Link>}

                        <div>
                          <Link to={`/single/${res._id}`} className="linkStyle">
                            <p className="pedalogicalText">
                              {res?.["Pedagogical Approach"]}
                            </p>
                            <p className="savestr_body">
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
              ))}
              {saveUserStratigy?.map((data, index) => (
                <div key={index} className="container">
                  <div className="card_pad">
                    <div className=" mt-2  mb-0 my-md-4">
                      <div className="d-flex justify-content-between my-0 my-md-4 flex-column outcomeList">
          { location.pathname!="/profile" &&             <Link
                          to={`/singleUserStratigy/${data._id}`}
                          className="linkStyle"
                        >
                          <div className="me-1">
                            <div>
                              <div className="d-flex str_text_left m-0">
                                <p className="Strategy_count m-0">
                                  {t("strategy")}
                                </p>
                                <p className="counter_str mb-0">
                                  {saveStratigy.length + index + 1}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Link>}
                        <div>
                          <Link
                            to={`/singleUserStratigy/${data._id}`}
                            className="linkStyle"
                          >
                            <p className="pedalogicalText">
                              {data?.["Pedagogical Approach"]}
                            </p>
                            <p className="savestr_body">
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
              {saveStratigy?.map((data, index) => (
                <div key={index} className="container">
                  <div className="card_pad">
                    <div className=" mt-2  mb-0 my-md-4">
                      <div className="d-flex justify-content-between my-0 my-md-4 flex-column outcomeList">
                     {location.pathname!="/profile" &&     <Link to={`/singleUserStratigy/${data._id}`} className="linkStyle">
                          <div className="me-1">
                            <div>
                              <div className="d-flex  str_text_left m-0">
                                <p className="Strategy_count mb-0">
                                  {t("strategy")}
                                </p>
                                <p className="counter_str mb-0">{index + 1}</p>
                              </div>
                            </div>
                          </div>
                        </Link>}
                        <div>
                          <Link
                            to={`/singleUserStratigy/${data._id}`}
                            className="linkStyle"
                          >
                            <p className="pedalogicalText">
                              {data?.["Pedagogical Approach"]}
                            </p>
                            <p className="savestr_body">
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
              {saveUserStratigy?.map((data, index) => (
                <div key={index} className="container">
                  <div className="card_pad">
                    <div className=" mt-2  mb-0 my-md-4">
                      <div className="d-flex justify-content-between my-0 my-md-4 flex-column outcomeList">
                        <Link
                          to={`/singleUserStratigy/${data._id}`}
                          className="linkStyle"
                        >
                          <div className="me-1">
                            <div>
                              <div className="d-flex str_text_left m-0">
                                <p className="Strategy_count m-0">
                                  {t("strategy")}
                                </p>
                                <p className="counter_str mb-0">
                                  {saveStratigy.length + index + 1}
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
                            <p className="savestr_body">
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
{ location.pathname!="/profile"  &&  <div className="saveStrParent">
            <div className="row py-2">
              <div className="col-md-1"></div>
              <div className="col-8 col-md-10 text-white text-center headText mt-2 mt-md-0">
                {user.firstName}
                {user.lastName}
                {t("’s")} {t("Saved Strategies")}
              </div>
              <div
                onClick={handleFilter}
                className="col-md-1 d-flex justify-content-center  align-items-center filter_bTn"
              >
                <span>{t("Filter")}</span>
              </div>
            </div>
            <div className={filetr ? "d-block" : "d-none"}>
              <FilterStr stratigy={saveStratigyHi} language={languageSelect} />
            </div>
          </div>}
          {isLoading ? (
            <div className="loadingWrap">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : saveStratigyHi?.length === 0 ? (
            <h1 className="my-5 text-center py-5 text-danger">
              {t("No Saved Strategies available.")}
            </h1>
          ) : stratigyFilData?.length !== 0 ? (
            <>
              {stratigyFilData?.map((res, index) => (
                <div key={index} className="container">
                  <div className="card_pad">
                    <div className=" mt-2  mb-0 my-md-4">
                      <div className="d-flex justify-content-between my-0 my-md-4 flex-column outcomeList">
                        <Link to={`/singleHi/${res._id}`} className="linkStyle">
                          <div className="me-1">
                            <div>
                              <div className="d-flex mb-3">
                                <p className="Strategy_count m-0">
                                  {t("strategy")}
                                </p>
                                <p className="counter_str mb-0">{index + 1}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div>
                          <Link
                            to={`/singleHi/${res._id}`}
                            className="linkStyle"
                          >
                            <p className="savestr_head">
                              {t("शिक्षण के परिणाम")}: {res["शिक्षण के परिणाम"]}
                            </p>
                            <p className="savestr_body">
                              {res["शिक्षण रणनीति"].slice(0, 250)}...
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
              {saveStratigyHiUser?.map((res, index) => (
                <div key={index} className="container">
                  <div className="card_pad">
                    <div className=" mt-2  mb-0 my-md-4">
                      <div className="d-flex justify-content-between my-0 my-md-4 flex-column outcomeList">
                        <Link to={`/singleHi/${res._id}`} className="linkStyle">
                          <div className="me-1">
                            <div>
                              <div className="d-flex mb-3">
                                <p className="Strategy_count m-0">
                                  {t("strategy")}
                                </p>
                                <p className="counter_str mb-0">{index + 1}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div>
                          <Link
                            to={`/singleHi/${res._id}`}
                            className="linkStyle"
                          >
                            <p className="savestr_head">
                              {t("शिक्षण के परिणाम")}: {res["शिक्षण के परिणाम"]}
                            </p>
                            <p className="savestr_body">
                              {res["शिक्षण रणनीति"].slice(0, 250)}...
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
              {saveStratigyHi?.map((data, index) => (
                <div key={index} className="container">
                  <div className="card_pad">
                    <div className=" mt-2  mb-0 my-md-4">
                      <div className="d-flex justify-content-between my-0 my-md-4 flex-column outcomeList">
                        <Link
                          to={`/singleHi/${data._id}`}
                          className="linkStyle"
                        >
                          <div className="me-1">
                            <div>
                              <div className="d-flex mb-3">
                                <p className="Strategy_count m-0">
                                  {t("strategy")}
                                </p>
                                <p className="counter_str mb-0">{index + 1}</p>
                              </div>
                            </div>
                          </div>
                        </Link>
                        <div>
                          <Link
                            to={`/singleHi/${data._id}`}
                            className="linkStyle"
                          >
                            <p className="savestr_head">
                              शिक्षण के परिणाम: {data["शिक्षण के परिणाम"]}
                            </p>
                            <p className="savestr_body">
                              {data["शिक्षण रणनीति"].slice(0, 250)}...
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
              {saveStratigyHiUser?.map((data, index) => (
                <div key={index} className="container">
                  <div className="card_pad">
                    <div className=" mt-2  mb-0 my-md-4">
                      <div className="d-flex justify-content-between my-0 my-md-4 flex-column outcomeList">
                        <Link
                          to={`/singleHi/${data._id}`}
                          className="linkStyle"
                        >
                          <div className="me-1">
                            <div>
                              <div className="d-flex mb-3">
                                <p className="Strategy_count m-0">
                                  {t("strategy")}
                                </p>
                                <p className="counter_str mb-0">
                                  {saveStratigyHi.length + index + 1}
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
                            <p className="savestr_head">
                              शिक्षण के परिणाम: {data["शिक्षण के परिणाम"]}
                            </p>
                            <p className="savestr_body">
                              {data["शिक्षण रणनीति"].slice(0, 250)}...
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

export default CreatedStratigy;
