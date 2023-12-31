import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";
import {
  getHindiStratigysCreatedByUser,
  getMultitHiStr,
} from "../services/hindiStratigys";
import { getUserStbyID, getUserCreated } from "../services/userCreated";
import { getMultiUsertStr } from "../services/userStratigy";
import { getMultiUserHindiStr } from "../services/userStratigyHi";
import "./styles/saveStratigy.css";
import "./styles/profileData.css";
import { getSingleUser } from "../services/dashboardUsers";
const ProfileDataC = ({ setNumber }) => {
  const { user, stratigyFilData,setstrategyNum  } = useAuth();

  const [saveStratigy, setSaveStratigy] = useState([]);
  const [saveStratigyHi, setSaveStratigyHi] = useState([]);
  const [saveUserStratigy, setSaveUserStratigy] = useState([]);
  const [saveStratigyHiUser, setSaveStratigyiUser] = useState([]);
  const [languageSelect, setLanguageSelect] = React.useState("en");

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const language = localStorage.getItem("i18nextLng");
  const [save, setSave] = useState([]);

  const [currentPageUserDetails, setCurrentPageUserDetails] = useState();
  const { id } = useParams();
  useEffect(() => {
    if (id != undefined) {
      getSingleUser(id).then((e) => {
        console.log(e.data[0]);
        setCurrentPageUserDetails(e.data[0]);
      });
    } else {
      setCurrentPageUserDetails(user);
    }
  }, []);

  React.useEffect(() => {
    if (language === "hi") {
      setLanguageSelect("hi");
    } else {
      setLanguageSelect("en");
    }
  }, [language]);
  React.useEffect(() => {
    setIsLoading(true);
    getUserCreated(currentPageUserDetails?._id).then((res) => {
      const saves = res?.data?.filter((ress) => ress.User_id === currentPageUserDetails?._id);
      const savesId = saves?.map((ress) => ress?.strategie_id);
      setSave(saves?.map((ress) => ress.strategie_id));
      if (languageSelect === "en") {
        getUserCreated(currentPageUserDetails?._id)
          .then((res) => {
            setSaveStratigy(saves);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log({ err });
            setIsLoading(false);
            setSaveStratigy([]);
          });

      }
      if (languageSelect === "hi") {
        getHindiStratigysCreatedByUser(currentPageUserDetails?._id)
          .then((res) => {
            console.log({ res });
            setSaveStratigyHi(res);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log({ err });
            setSaveStratigyHi([]);
            setIsLoading(false);
          });

      }
    });
  }, [languageSelect,currentPageUserDetails]);

  const [showAll, setShowAll] = useState(false);
  const displayCount = showAll
    ? languageSelect === "en"
      ? saveStratigy?.length
      : saveStratigyHi?.length
    : 2;
  React.useEffect(() => {
    if (languageSelect === "en") {
      setNumber(saveStratigy?.length);
    }
    if (languageSelect === "hi") {
      setNumber(saveStratigyHi?.length);
    }
  }, [saveStratigy, saveStratigyHi, languageSelect]);

  return (
    <>
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
                <div className="d-flex">
                  <span
                    className={
                      saveStratigy?.length === 0
                        ? "headText w-50 impGray"
                        : "headText w-50"
                    }
                  >
                    {t("Created strategies")}
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
                      saveStratigy?.length === 0
                        ? "impGray d-md-none desktopNone"
                        : "d-md-none"
                    }
                  >
                    ({saveStratigy?.length})
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
            ) : saveStratigy?.length === 0 && collapse !== true ? (
              <h1 className="my-5 text-center py-5 text-danger">
                {t("No created strategies available.")}
              </h1>
            ) : saveStratigy?.length !== 0 && collapse !== true ? (
              <div>
                {saveStratigy?.slice(0, displayCount).map((res, index) => (
                  <div key={index} className="cardContainer">
                    <p id="bswm">{res["Pedagogical Approach"]}</p>
                    <p className="savestr_body">
                      {res["Teaching Strategy"]?.slice(0, 150) + "..."}
                    </p>
                    <Link to={`/singleUserStratigy/${res?._id}`} id="pgnw" onClick={()=>setstrategyNum(index+1)}>
                      Read More...
                    </Link>
                    <div className="d-flex flex-column align-items-center justify-content-center"></div>
                  </div>
                ))}
                {!showAll && saveStratigy.length > 2 ? (
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
                <div className="d-flex">
                  <span
                    className={
                      saveStratigyHi?.length === 0
                        ? "headText w-50 impGray"
                        : "headText w-50"
                    }
                  >
                    {t("Created strategies")}
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
                      saveStratigyHi?.length === 0
                        ? "impGray d-md-none desktopNone"
                        : "d-md-none"
                    }
                  >
                    ({saveStratigyHi?.length})
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
            ) : saveStratigyHi?.length !== 0 && collapse !== true ? (
              <div>
                {saveStratigyHi?.slice(0, displayCount).map((res, index) => (
                  <div key={index} className="cardContainer">
                    <p id="bswm">{res["शिक्षण के परिणाम"]}</p>
                    <p className="savestr_body">
                      {res["शिक्षण रणनीति"].slice(0, 150) + "..."}
                    </p>
                    <Link to={`/singleHi/${res?._id}`} id="pgnw" onClick={()=>setstrategyNum(index+1)}>
                      Read More...
                    </Link>
                    <div className="d-flex flex-column align-items-center justify-content-center"></div>
                  </div>
                ))}
                {!showAll && saveStratigyHi.length > 2 ? (
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
    </>
  );
};
export default ProfileDataC;
