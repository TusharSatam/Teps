import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import "./styles/saveStratigy.css";
import { getMultitStr } from "../services/stratigyes";
import { Link, useParams } from "react-router-dom";
import { getMultitHiStr } from "../services/hindiStratigys";
import {
  getLikes,
  postLikes,
  unLikeByStratAndUserId,
} from "../services/userLikes";
import { getMultiUsertStr } from "../services/userStratigy";
import { getMultiUserHindiStr } from "../services/userStratigyHi";
import { Spinner } from "react-bootstrap";
import "./styles/profileData.css";
import {
  getSaves,
  postSaves,
  unSaveByStratAndUserId,
} from "../services/userSaves";

const OtherProfileDataF = ({ setNumber, user_id }) => {
  const { user, setstrategyNum } = useAuth();
  const [favStratigy, setFavStratigy] = useState([]);
  const [favStratigyHi, setFavStratigyHi] = useState([]);
  const [languageSelect, setLanguageSelect] = React.useState("en");
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const [likes, setLikes] = useState([]);
  const [saves, setSaves] = useState([]);
  const [specialLinkArr, setSpecialLinkArr] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const language = localStorage.getItem("i18nextLng");
  const { id } = useParams();
  React.useEffect(() => {
    if (language === "hi") {
      setLanguageSelect("hi");
    } else {
      setLanguageSelect("en");
    }
  }, [language]);

  React.useEffect(() => {
    setIsLoading(true);
    if (
      user?._id !== null &&
      user?._id !== undefined &&
      id !== null &&
      id !== undefined
    ) {
      getLikes().then((res) => {
        getSaves().then((res1) => {
          const mySaves = res1?.data?.filter(
            (ress) => ress.user_id === user?._id
          );
          const mySaveIdsArr = mySaves?.map((ress) => ress.strategie_id);
          setSaves(mySaveIdsArr);
        });
        const like = res?.data?.filter((ress) => ress.user_id === id);
        const myLike = res?.data?.filter((ress) => ress.user_id === user?._id);
        const likeIdsArr = like?.map((ress) => ress.strategie_id);
        const myLikeIdsArr = myLike?.map((ress) => ress.strategie_id);
        setLikes(myLikeIdsArr);
        if (languageSelect === "en") {
          setIsLoading(true);
          getMultitStr(likeIdsArr)
            .then((res) => {
              setFavStratigy(res?.data);
              getMultiUsertStr(likeIdsArr)
                .then((res2) => {
                  const idList = res2?.data?.map((obj) => obj?._id);
                  setSpecialLinkArr((prev) => [...prev, ...idList]);
                  setFavStratigy((prev) => [...prev, ...res2?.data]);
                  setIsLoading(false);
                })
                .catch((err2) => {
                  console.log({ err2 });
                  setIsLoading(false);
                });
            })
            .catch((err) => {
              console.log({ err });
              setIsLoading(false);
            });
        } else {
          getMultitHiStr(likeIdsArr)
            .then((res) => {
              setFavStratigyHi(res?.data);
              getMultiUserHindiStr(likeIdsArr)
                .then((res2) => {
                  setFavStratigyHi((prev) => [...prev, ...res2?.data]);
                  setIsLoading(false);
                })
                .catch((err2) => {
                  console.log({ err2 });
                  setIsLoading(false);
                });
            })
            .catch((err) => {
              console.log({ err });
              setIsLoading(false);
            });
        }
      });
    }
  }, [languageSelect, user, id]);
  useEffect(() => {
    console.log({ likes });
  }, [likes]);
  useEffect(() => {
    console.log({ favStratigy });
  }, [favStratigy]);

  const handleApiLikes = (id) => {
    const data = {
      strategie_id: id,
      user_id: user?._id,
    };
    postLikes(data).then((res) => {
      setLikes((prev) => [...prev, id]);
    });
  };
  const handleApiUnLikes = (id) => {
    const requiredStr = likes.find((str) => str === id);
    console.log({ requiredStr });
    const bodyData = {
      strategie_id: requiredStr,
      user_id: user?._id,
    };
    unLikeByStratAndUserId(bodyData)
      .then((res) => {
        setLikes(likes.filter((stringData) => stringData !== id));
      })
      .catch((err) => {
        console.log({ err });
      });
  };
  const handleApiSave = (id) => {
    const data = {
      strategie_id: id,
      user_id: user?._id,
    };
    postSaves(data).then((res) => {
      setSaves((prev) => [...prev, id]);
    });
  };
  const handleApiUnSave = (id) => {
    const bodyData = {
      strategie_id: id,
      user_id: user?._id,
    };
    unSaveByStratAndUserId(bodyData)
      .then((res) => {
        setSaves(saves.filter((stringData) => stringData !== id));
      })
      .then((err) => {
        console.log({ err });
      });
  };
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  {t("Favourite strategies")}
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
                      ? "impGray d-md-none desktopNone"
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
              {t("No favourite strategies available.")}
            </h1>
          ) : favStratigy?.length !== 0 && collapse !== true ? (
            <div>
              {favStratigy?.slice(0, displayCount).map((res, index) => (
                <div key={index} className="cardContainer">
                  <p id="bswm">{res["Pedagogical Approach"]}</p>
                  <p className="savestr_body">
                    {res["Teaching Strategy"]?.slice(0, 150) + "..."}
                  </p>
                  <Link
                    to={
                      specialLinkArr.includes(res?._id)
                        ? `/singleUserStratigy/${res?._id}`
                        : `/single/${res._id}`
                    }
                    id="pgnw"
                    onClick={() => setstrategyNum(index + 1)}
                  >
                    Read More...
                  </Link>
                  <div style={{ cursor: "pointer" }} className="saveLikebtn">
                    {saves?.includes(res?._id) ? (
                      <svg
                        onClick={() => {
                          handleApiUnSave(res?._id);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M12 1H4C3.73478 1 3.48043 1.10536 3.29289 1.29289C3.10536 1.48043 3 1.73478 3 2V15L8 12.473L13 15V2C13 1.73478 12.8946 1.48043 12.7071 1.29289C12.5196 1.10536 12.2652 1 12 1Z"
                          fill="#1AA05B"
                        />
                      </svg>
                    ) : (
                      <svg
                        onClick={() => {
                          handleApiSave(res?._id);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M12 2V13.375L8.45 11.58L8 11.355L7.55 11.58L4 13.375V2H12ZM12 1H4C3.73478 1 3.48043 1.10536 3.29289 1.29289C3.10536 1.48043 3 1.73478 3 2V15L8 12.5L13 15V2C13 1.73478 12.8946 1.48043 12.7071 1.29289C12.5196 1.10536 12.2652 1 12 1Z"
                          fill="#1AA05B"
                        />
                      </svg>
                    )}
                    {likes?.includes(res._id) ? (
                      <svg
                        onClick={() => {
                          handleApiUnLikes(res?._id);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M1.33398 6.09123C1.33398 9.33323 4.01398 11.0606 5.97532 12.6072C6.66732 13.1526 7.33398 13.6666 8.00065 13.6666C8.66732 13.6666 9.33398 13.1532 10.026 12.6066C11.988 11.0612 14.6673 9.33323 14.6673 6.09189C14.6673 2.84989 11.0007 0.550561 8.00065 3.66789C5.00065 0.549894 1.33398 2.84923 1.33398 6.09123Z"
                          fill="#DD1D43"
                        />
                      </svg>
                    ) : (
                      <svg
                        onClick={() => {
                          handleApiLikes(res?._id);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M11.125 2.125C9.8125 2.125 8.67125 2.71688 8 3.70875C7.32875 2.71688 6.1875 2.125 4.875 2.125C3.88079 2.12616 2.92764 2.52162 2.22463 3.22463C1.52162 3.92764 1.12616 4.88079 1.125 5.875C1.125 7.7 2.2625 9.59937 4.50625 11.5194C5.53441 12.3955 6.64501 13.1699 7.8225 13.8319C7.87707 13.8612 7.93805 13.8765 8 13.8765C8.06195 13.8765 8.12293 13.8612 8.1775 13.8319C9.35499 13.1699 10.4656 12.3955 11.4937 11.5194C13.7375 9.59937 14.875 7.7 14.875 5.875C14.8738 4.88079 14.4784 3.92764 13.7754 3.22463C13.0724 2.52162 12.1192 2.12616 11.125 2.125ZM8 13.0694C6.97437 12.4775 1.875 9.3575 1.875 5.875C1.87583 5.0796 2.19216 4.31702 2.75459 3.75459C3.31702 3.19216 4.0796 2.87583 4.875 2.875C6.1425 2.875 7.20687 3.55187 7.65312 4.64187C7.68138 4.71065 7.72944 4.76948 7.7912 4.81088C7.85297 4.85228 7.92564 4.87439 8 4.87439C8.07436 4.87439 8.14703 4.85228 8.2088 4.81088C8.27056 4.76948 8.31862 4.71065 8.34688 4.64187C8.79313 3.55187 9.8575 2.875 11.125 2.875C11.9204 2.87583 12.683 3.19216 13.2454 3.75459C13.8078 4.31702 14.1242 5.0796 14.125 5.875C14.125 9.3575 9.02563 12.4775 8 13.0694Z"
                          fill="#DD1D43"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
              {!showAll && favStratigy?.length > 2 ? (
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
                      ? "impGray d-md-none desktopNone"
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
                  </p>
                  <Link
                    to={`/singleHi/${res._id}`}
                    id="pgnw"
                    onClick={() => setstrategyNum(index + 1)}
                  >
                    Read More...
                  </Link>
                  <div style={{ cursor: "pointer" }} className="saveLikebtn">
                    {saves?.includes(res?._id) ? (
                      <svg
                        onClick={() => {
                          handleApiUnSave(res?._id);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M12 1H4C3.73478 1 3.48043 1.10536 3.29289 1.29289C3.10536 1.48043 3 1.73478 3 2V15L8 12.473L13 15V2C13 1.73478 12.8946 1.48043 12.7071 1.29289C12.5196 1.10536 12.2652 1 12 1Z"
                          fill="#1AA05B"
                        />
                      </svg>
                    ) : (
                      <svg
                        onClick={() => {
                          handleApiSave(res?._id);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M12 2V13.375L8.45 11.58L8 11.355L7.55 11.58L4 13.375V2H12ZM12 1H4C3.73478 1 3.48043 1.10536 3.29289 1.29289C3.10536 1.48043 3 1.73478 3 2V15L8 12.5L13 15V2C13 1.73478 12.8946 1.48043 12.7071 1.29289C12.5196 1.10536 12.2652 1 12 1Z"
                          fill="#1AA05B"
                        />
                      </svg>
                    )}
                    {likes?.includes(res._id) ? (
                      <svg
                        onClick={() => {
                          handleApiUnLikes(res?._id);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M1.33398 6.09123C1.33398 9.33323 4.01398 11.0606 5.97532 12.6072C6.66732 13.1526 7.33398 13.6666 8.00065 13.6666C8.66732 13.6666 9.33398 13.1532 10.026 12.6066C11.988 11.0612 14.6673 9.33323 14.6673 6.09189C14.6673 2.84989 11.0007 0.550561 8.00065 3.66789C5.00065 0.549894 1.33398 2.84923 1.33398 6.09123Z"
                          fill="#DD1D43"
                        />
                      </svg>
                    ) : (
                      <svg
                        onClick={() => {
                          handleApiLikes(res?._id);
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M11.125 2.125C9.8125 2.125 8.67125 2.71688 8 3.70875C7.32875 2.71688 6.1875 2.125 4.875 2.125C3.88079 2.12616 2.92764 2.52162 2.22463 3.22463C1.52162 3.92764 1.12616 4.88079 1.125 5.875C1.125 7.7 2.2625 9.59937 4.50625 11.5194C5.53441 12.3955 6.64501 13.1699 7.8225 13.8319C7.87707 13.8612 7.93805 13.8765 8 13.8765C8.06195 13.8765 8.12293 13.8612 8.1775 13.8319C9.35499 13.1699 10.4656 12.3955 11.4937 11.5194C13.7375 9.59937 14.875 7.7 14.875 5.875C14.8738 4.88079 14.4784 3.92764 13.7754 3.22463C13.0724 2.52162 12.1192 2.12616 11.125 2.125ZM8 13.0694C6.97437 12.4775 1.875 9.3575 1.875 5.875C1.87583 5.0796 2.19216 4.31702 2.75459 3.75459C3.31702 3.19216 4.0796 2.87583 4.875 2.875C6.1425 2.875 7.20687 3.55187 7.65312 4.64187C7.68138 4.71065 7.72944 4.76948 7.7912 4.81088C7.85297 4.85228 7.92564 4.87439 8 4.87439C8.07436 4.87439 8.14703 4.85228 8.2088 4.81088C8.27056 4.76948 8.31862 4.71065 8.34688 4.64187C8.79313 3.55187 9.8575 2.875 11.125 2.875C11.9204 2.87583 12.683 3.19216 13.2454 3.75459C13.8078 4.31702 14.1242 5.0796 14.125 5.875C14.125 9.3575 9.02563 12.4775 8 13.0694Z"
                          fill="#DD1D43"
                        />
                      </svg>
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

export default OtherProfileDataF;
