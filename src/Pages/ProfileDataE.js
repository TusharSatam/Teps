import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";
import {
  getHindiStratigysEditedbyUser,
  getMultitHiStr,
} from "../services/hindiStratigys";
import { getUserStbyID, getUserCreated } from "../services/userCreated";
import { getMultiUsertStr } from "../services/userStratigy";
import { getMultiUserHindiStr } from "../services/userStratigyHi";
import "./styles/saveStratigy.css";
import { getEdits } from "../services/userEdited";
const ProfileDataE = ({ setNumber }) => {
  const { user, stratigyFilData,setstrategyNum  } = useAuth();

  const [saveStratigy, setSaveStratigy] = useState([]);
  const [saveStratigyHi, setSaveStratigyHi] = useState([]);
  const [saveUserStratigy, setSaveUserStratigy] = useState([]);
  const [saveStratigyHiUser, setSaveStratigyiUser] = useState([]);
  const [languageSelect, setLanguageSelect] = React.useState("en");

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const language = localStorage.getItem("i18nextLng");
  const [collapse, setCollapse] = useState(true);

  const [save, setSave] = useState([]);
  React.useEffect(() => {
    if (language === "hi") {
      setLanguageSelect("hi");
    } else {
      setLanguageSelect("en");
    }
  }, [language]);
  React.useEffect(() => {
    setIsLoading(true);
    if (languageSelect === "en") {
      console.log("edited english");
      getEdits(user._id)
        .then((res) => {
          // const saves = res?.data?.filter((ress) => ress.Approve === true);
          setSaveStratigy(res?.data);
          setIsLoading(false);
        })
        .catch((err) => {
          setSaveStratigy([]);
          console.log({ err });
          setIsLoading(false);
        });
    }
    if (languageSelect === "hi") {
      console.log("edited hindi");

      getHindiStratigysEditedbyUser(user._id)
        .then((res) => {
          // console.log({ res });
          setSaveStratigyHi(res);
          setIsLoading(false);
        })
        .catch((err) => {
          setSaveStratigyHi([]);
          console.log({ err });
          setIsLoading(false);
        });
      // hindi api call
    }
    // getEdits(user._id)
    //   .then(res => {
    //     const saves = res?.data?.filter(ress => ress.Approve === true)
    //     const savesId = saves?.map(ress => ress._id);
    //     // console.log({saves})
    //     // console.log({savesId})

    //     setSave(saves?.map(ress => ress.strategie_id))
    //     if (languageSelect === "en") {
    //       // setIsLoading(false)
    //       //   getEdits(user._id)
    //       //   .then(res => {
    //       //     setSaveStratigy(res.data);
    //       //     setIsLoading(false)
    //       //   })
    //       //   .catch(err => {
    //       //     setIsLoading(false)
    //       //     setSaveStratigy([])
    //       //   })
    //       // getMultiUsertStr(savesId)
    //       //   .then(res => {
    //       //     setSaveUserStratigy(res.data);
    //       //     setIsLoading(false)
    //       //   })
    //       //   .catch(err => {
    //       //     setSaveUserStratigy([])
    //       //     setIsLoading(false)
    //       //   })
    //     }
    //     else {
    //       getMultitHiStr(savesId)
    //         .then(res => {
    //           setSaveStratigyi(res.data)
    //           setIsLoading(false)
    //         })
    //       getMultiUserHindiStr(savesId)
    //         .then(res => {
    //           setSaveStratigyiUser(res.data)
    //           setIsLoading(false)
    //         })
    //     }
    //   })
  }, [languageSelect]);

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
              onClick={() => setCollapse((prev) => !prev)}
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
                    {t("Edited strategies")}
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
                {t("No edited strategies available.")}
              </h1>
            ) : saveStratigy?.length !== 0 && collapse !== true ? (
              <div>
                {saveStratigy?.slice(0, displayCount).map((res, index) => (
                  <div key={index} className="cardContainer">
                    <p id="bswm">{res["Pedagogical Approach"]}</p>
                    <p className="savestr_body">
                      {res["Teaching Strategy"].slice(0, 150) + "..."}
                    </p>
                    <Link to={`/singleUserStratigy/${res?._id}`} id="pgnw"  onClick={()=>setstrategyNum(index+1)}>
                      Read More...
                    </Link>
                    <div className="saveLikebtn">
                      <Link
                        to={`/editStrategyform/${res._id}/user`}
                        className="pencilButton"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M3.33333 12.6673H4.26667L10.0167 6.91732L9.08333 5.98398L3.33333 11.734V12.6673ZM12.8667 5.95065L10.0333 3.15065L10.9667 2.21732C11.2222 1.96176 11.5362 1.83398 11.9087 1.83398C12.2811 1.83398 12.5949 1.96176 12.85 2.21732L13.7833 3.15065C14.0389 3.40621 14.1722 3.71465 14.1833 4.07598C14.1944 4.43732 14.0722 4.74554 13.8167 5.00065L12.8667 5.95065ZM11.9 6.93398L4.83333 14.0007H2V11.1673L9.06667 4.10065L11.9 6.93398ZM9.55 6.45065L9.08333 5.98398L10.0167 6.91732L9.55 6.45065Z"
                            fill="#1AA05B"
                          />
                        </svg>
                      </Link>
                    </div>
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
              onClick={() => setCollapse((prev) => !prev)}
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
                    {t("Edited strategies")}
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
            ) : saveStratigyHi?.length === 0 && collapse !== true ? (
              <h1 className="my-5 text-center py-5 text-danger">
                {t("No Saved Strategies available.")}
              </h1>
            ) : saveStratigyHi?.length !== 0 && collapse !== true ? (
              <div>
                {saveStratigyHi?.slice(0, displayCount).map((res, index) => (
                  <div key={index} className="cardContainer">
                  <p id="bswm">{res["शिक्षण के परिणाम"]}</p>
                  <p className="savestr_body">
                    {res["शिक्षण रणनीति"].slice(0, 150) + "..."}
                  </p>
                  <Link to={`/singleHi/${res._id}`} id="pgnw"  onClick={()=>setstrategyNum(index+1)}>
                    Read More...
                  </Link>
                  <div className="saveLikebtn">
                    <Link
                      to={`/editStrategyform/${res._id}/user`}
                      className="pencilButton"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M3.33333 12.6673H4.26667L10.0167 6.91732L9.08333 5.98398L3.33333 11.734V12.6673ZM12.8667 5.95065L10.0333 3.15065L10.9667 2.21732C11.2222 1.96176 11.5362 1.83398 11.9087 1.83398C12.2811 1.83398 12.5949 1.96176 12.85 2.21732L13.7833 3.15065C14.0389 3.40621 14.1722 3.71465 14.1833 4.07598C14.1944 4.43732 14.0722 4.74554 13.8167 5.00065L12.8667 5.95065ZM11.9 6.93398L4.83333 14.0007H2V11.1673L9.06667 4.10065L11.9 6.93398ZM9.55 6.45065L9.08333 5.98398L10.0167 6.91732L9.55 6.45065Z"
                          fill="#1AA05B"
                        />
                      </svg>
                    </Link>
                  </div>
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
export default ProfileDataE;