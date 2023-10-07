import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";
import { getMultitHiStr } from "../services/hindiStratigys";
import { getUserStbyID, getUserCreated } from "../services/userCreated";
import { getMultiUsertStr } from "../services/userStratigy";
import { getMultiUserHindiStr } from "../services/userStratigyHi";
import "./styles/saveStratigy.css";
import { getEdits } from "../services/userEdited";
const ProfileDataE = () => {
  const { user, stratigyFilData } = useAuth();

  const [saveStratigy, setSaveStratigy] = useState([]);
  const [saveUserStratigy, setSaveUserStratigy] = useState([]);
  const [saveStratigyHi, setSaveStratigyi] = useState([]);
  const [saveStratigyHiUser, setSaveStratigyiUser] = useState([]);
  const [languageSelect, setLanguageSelect] = React.useState("en");

  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const language = localStorage.getItem("i18nextLng");
  const [collapse, setCollapse] = useState(false);

  const [save, setSave] = useState([]);
  React.useEffect(() => {
    setIsLoading(true);
    if (languageSelect === "en") {
      getEdits(user._id)
        .then((res) => {
          const saves = res?.data?.filter((ress) => ress.Approve === true);
          setSaveStratigy(saves);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log({ err });
          setIsLoading(false);
        });
    } else {
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
  return (
    <>
      <div>
        {languageSelect === "en" ? (
          <>
            <div
              onClick={() => setCollapse((prev) => !prev)}
              className={collapse?"saveStrParent":"saveStrParentActive"}
            >
              <div className="row py-2 align-items-center" id="div1">
                <div className="d-flex">
                  <span className="headText w-50">
                    {t("Edited Strategies")}
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
                </div>
              </div>
            </div>
            {isLoading && !collapse ? (
              <div id="div2">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : saveStratigy?.length === 0 &&
              saveUserStratigy?.length === 0 &&
              collapse !== true ? (
              <h1 className="my-5 text-center py-5 text-danger">
                {t("No Saved Strategies available.")}
              </h1>
            ) : saveStratigy?.length !== 0 && collapse !== true ? (
              <>
                {saveStratigy?.map((res, index) => (
                  <div key={index} className="cardContainer">
                    <div id="ws" className="card_pad">
                      <div className="mt-4">
                        <div className="d-flex justify-content-between">
                          <div className="col-9 ms-md-4 col-md-8 ps-2">
                            <Link id="nb">
                              <p id="bswm">Project-based Learning</p>
                              <p className="savestr_head">
                                Learning Outcome: {res["Learning Outcome"]}
                              </p>
                              <p className="savestr_body">
                                {res["Teaching Strategy"]?.slice(0, 150) +
                                  "..."}
                                <Link to={`/single/${res._id}`} id="pgnw">
                                  Read More...
                                </Link>
                              </p>
                            </Link>
                          </div>
                          <div
                            className="col-3 col-md-2 d-none d-md-block ms-5"
                            id="mt"
                          >
                            <div className="d-flex flex-column align-items-center justify-content-center"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
};
export default ProfileDataE;
