import React, { useEffect, useRef } from "react";
import { t } from "i18next";
import { useState } from "react";

import { useAuth } from "../../Context/AuthContext";
import { useParams } from "react-router-dom";
import "./EditStrategy.css";
import { useTranslation } from "react-i18next";
import { singleHindiStratigys } from "../../services/hindiStratigys";
import PublishModal from "../Modal/PublishEditStrategy/PublishModal";
import backArrow from "../../asstes/icons/backArrow.svg";
import { singleUserHiStratigys } from "../../services/userStratigyHi";
const EditStrategyHi = () => {
  const [allStratigys, setAllStratigys] = React.useState([]);
  const [selectSubject, setSelectSubject] = React.useState("");
  const [selectGrade, setSelectGrade] = React.useState("");
  const [selectTopic, setSelectTopic] = React.useState("");
  const [selectSuperTopic, setSelectSuperTopic] = React.useState("");
  const [selectSubTopic, setSelectSubTopic] = React.useState("");
  const [selectSubSubTopic, setSelectSubSubTopic] = React.useState("");
  const [selectLearningOutcome, setSelectLearningOutcome] = React.useState("");
  const [teachingStrategy, setteachingStrategy] = React.useState("");
  const [devDom1, setDevDom1] = React.useState("");
  const [devDom2, setDevDom2] = React.useState("");
  const [formData, setformData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedContent, setSubmittedContent] = useState("");
  const [formError, setformError] = useState("");
  const { t } = useTranslation();
  //-----------------------------------------------------------------
  const [modalShow, setModalShow] = React.useState(false);
  const [languageSelect, setLanguageSelect] = React.useState("en");
  const [error, setError] = useState(false);
  const [submitData, setSubmitData] = useState({});
  const { id } = useParams();
  const successTextRef = useRef(null);
  const [isPublishModalOpen, setisPublishModalOpen] = useState(false);
  const [isStrategyPublic, setisStrategyPublic] = useState(false);
  const [editedDatas, seteditedDatas] = useState("");
  const { user, editStrategyFormData } = useAuth();
  const [isStrategyLoading, setisStrategyLoading] = useState(false);
  const handleTeachingStrategyChange = (event) => {
    const { name, value } = event.target;
    setformData({
      ...formData,
      [name]: value,
    });
    setSubmittedContent(value);
  };

  const handlePublishStrategy = () => {
    console.log("publish");
  };
  useEffect(() => {
    setisStrategyLoading(true);
    singleHindiStratigys(id).then((res) => {
      if (res[0] && res[0]._id) {
        setformData(res[0]);
        setSubmittedContent(res[0]["शिक्षण रणनीति"]);
        setisStrategyLoading(false);
      } else {
        singleUserHiStratigys(id).then((res) => {
          console.log(res.data[0]);
          setformData(res.data[0]);
          setSubmittedContent(res.data[0]["शिक्षण रणनीति"]);
        });
        setisStrategyLoading(false);
      }
    });
  }, [id]);

  const resetDropdowns = () => {
    for (const key in formData) {
      formData[key] = "";
    }
  };

  const handleSub = (e) => {
    setSelectSubject(e.target.value);
  };
  const handleGrade = (e) => {
    setSelectGrade(e.target.value);
  };
  const handleSuperTopic = (e) => {
    setSelectSuperTopic(e.target.value);
  };
  const handleTopic = (e) => {
    setSelectTopic(e.target.value);
  };
  const handleSubTopic = (e) => {
    setSelectSubTopic(e.target.value);
  };
  const handleSubSubTopic = (e) => {
    setSelectSubSubTopic(e.target.value);
  };
  const handleLearningOutcome = (e) => {
    setSelectLearningOutcome(e.target.value);
  };
  const handleBackClick = () => {
    window.history.go(-1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target?.["शिक्षण रणनीति"].value === "") {
      setError(true);
    } else {
      setModalShow(true);
      setError(false);
      const data = {
        User_id: user._id,
        विषय: formData.विषय,
        श्रेणी: formData.श्रेणी,
        "प्रमुख शीर्षक": formData["प्रमुख शीर्षक"],
        शीर्षक: formData.शीर्षक,
        "उप शीर्षक": formData["उप शीर्षक"],
        "उप-उप शीर्षक": formData["उप-उप शीर्षक"],
        "शिक्षण के परिणाम": formData["शिक्षण के परिणाम"],
        "शिक्षण रणनीति": formData["शिक्षण रणनीति"],
        Approve: false,
        EditedBy: user._id,
        isPublic: false,
      };
      seteditedDatas(data);
      setFormSubmitted(true);
      setisPublishModalOpen(true);
    }
  };

  React.useEffect(() => {
    if (formSubmitted && isStrategyPublic) {
      successTextRef?.current.scrollIntoView({
        behavior: "smooth", // You can use "auto" for instant scrolling
        block: "start", // Scroll to the top of the message
      });
    }
  }, [formSubmitted]);

  return (
    <>
      <div className=" d-flex justify-content-center align-items-center mb-1 position-relative HeadLine ">
        <button className="backbutton" onClick={handleBackClick}>
          <img src={backArrow} alt="backArrow" className="mb-md-1" />
          {`${t("Back")}`}
        </button>
        <hr className="line" />
        <p className="headText d-none d-md-block text-center">रणनीति संपादित करें</p>
        <hr className="line" />
      </div>
      {formData?.comments?.length === 0 && (
        <p className="errorText text-danger text-center strategyErr">
          {t("Strategy not available for this language!")}
        </p>
      )}
      {isStrategyLoading && (
        <div className="loadContainer">
          <div className="loading-spinner"></div>
        </div>
      )}
      {formData?._id && (
        <>
          {formData?.length != 0 ? (
            <div className="center-div d-flex mx-1 mx-md-4 mb-4">
              <div className="me-1 col-md-2 ml-0">
                <div className="d-none d-md-block mb-1 mb-md-1 str_title">
                  <p className="str_name">{t("strategy")}</p>
                  <p className="uni_id">ID-{formData?._id?.slice(19, 26)}</p>
                </div>
              </div>
              <div className="d-flex flex-column formWrapper">
                <div className=" d-md-none mb-1 mb-md-1 str_title">
                  <p className="str_name">{t("strategy")}</p>
                  <p className="uni_id">ID-{formData?._id?.slice(19, 26)}</p>
                </div>
                <PublishModal
                  show={isPublishModalOpen}
                  handleClose={() => setisPublishModalOpen(false)}
                  setisStrategyPublic={setisStrategyPublic}
                  setDatas={seteditedDatas}
                  Datas={editedDatas}
                />

                <form onSubmit={handleSubmit}>
                  <div className="two-selects d-flex gap-2">
                    <div className="halfwidth">
                      <p className="select-title">
                        {t("Grade")} <p>*</p>
                      </p>
                      <select
                        onChange={handleGrade}
                        className={"select-field"}
                        name="grade"
                        disabled
                      >
                        <option selected disabled>
                          {formData?.श्रेणी}
                        </option>
                      </select>
                    </div>
                    <div className="halfwidth">
                      <p className="select-title">
                        {t("Subject")} <p>*</p>
                      </p>
                      <select
                        onChange={handleSub}
                        className={"select-field"}
                        name="subject"
                        aria-label="Default select example"
                        value={formData.Subject}
                        disabled
                      >
                        <option selected disabled>
                          {formData.विषय}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="two-selects ">
                    <div>
                      <p className="select-title">
                        {t("Super topic")} <p>*</p>
                      </p>
                      <select
                        onChange={handleSuperTopic}
                        className={"select-field"}
                        name="Super_Topic"
                        value={
                          formData?.["Super Topic"]
                            ? formData?.["Super Topic"]
                            : formData?.["प्रमुख शीर्षक"]
                        }
                        disabled
                      >
                        <option selected disabled>
                          {formData?.["मुख्य शीर्षक"]
                            ? formData?.["मुख्य शीर्षक"]
                            : formData?.["प्रमुख शीर्षक"]}
                        </option>
                      </select>
                    </div>
                    <div>
                      <p className="select-title">
                        {t("Topic")} <p>*</p>
                      </p>
                      <select
                        onChange={handleTopic}
                        className={"select-field"}
                        name="topic"
                        value={formData?.शीर्षक}
                        disabled
                      >
                        <option selected disabled>
                          {formData?.शीर्षक}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="two-selects ">
                    <div>
                      <p className="select-title">
                        {t("Sub - topic")} <p>*</p>
                      </p>
                      <select
                        onChange={handleSubTopic}
                        className={"select-field"}
                        name="sub_topic"
                        value={formData?.["उप शीर्षक"]}
                        disabled
                      >
                        <option selected disabled>
                          {formData?.["उप शीर्षक"]}
                        </option>
                      </select>
                    </div>
                    <div>
                      <p className="select-title">
                        {t("Sub sub - topic")} <p>*</p>
                      </p>
                      <select
                        onChange={handleSubSubTopic}
                        className={"select-field"}
                        name="sub_sub_topic"
                        value={formData["उप-उप शीर्षक"]}
                        disabled
                      >
                        <option selected disabled>
                          {formData["उप-उप शीर्षक"]}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="one-selects">
                    <div>
                      <p className="select-title">
                        {t("शिक्षण के परिणाम")}
                        <p>*</p>
                      </p>
                      <select
                        onChange={handleLearningOutcome}
                        className={"select-field w-100"}
                        name="learning_outcome"
                        value={formData["शिक्षण के परिणाम"]}
                        disabled
                      >
                        <option selected disabled>
                          {formData?.["शिक्षण के परिणाम"]}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="one-selects-l">
                    <div>
                      <p className="select-title">
                        {t("शिक्षण रणनीति")} <p>*</p>
                      </p>
                      <textarea
                        className={"select-field-full-2 StrategyTextarea"}
                        name="शिक्षण रणनीति"
                        value={
                          formData?.["शिक्षण रणनीति"]
                            ? formData?.["शिक्षण रणनीति"]
                            : ""
                        }
                        onChange={handleTeachingStrategyChange}
                        disabled={formSubmitted}
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-3 mt-4">
                    <button
                      type="submit"
                      className="primaryButton"
                      disabled={formSubmitted}
                    >
                      रणनीति प्रकाशित करें
                    </button>
                    <button
                      className="secondaryButton"
                      disabled={formSubmitted}
                    >
                      रद्द
                    </button>
                  </div>
                  {error && (
                    <p className="form-error">
                      कृपया उपरोक्त फ़ील्ड में शिक्षण रणनीति भरें!
                    </p>
                  )}
                </form>
              </div>
            </div>
          ) : null}
          {formSubmitted &&
            isStrategyPublic &&(
            <p className="responseText" ref={successTextRef}>
              अपनी रणनीति प्रकाशित करने के लिए धन्यवाद!
            </p>
          )}
        </>
      )}
    </>
  );
};

export default EditStrategyHi;
