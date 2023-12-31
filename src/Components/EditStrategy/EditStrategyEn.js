import React, { useEffect, useRef } from "react";
import { t } from "i18next";
import { Accordion, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Buffer } from "buffer";
import { useState } from "react";
import {
  getAllStratigys,
  getStratigys,
  singleStratigys,
} from "../../services/stratigyes";
import { useAuth } from "../../Context/AuthContext";
import {
  postUserStratigys,
  singleUserEnStratigys,
} from "../../services/userStratigy";
import AproveReqModal from "../Modal/AproveReqModal";
import { useParams } from "react-router-dom";
import "./EditStrategy.css";
import { getSingleUser } from "../../services/dashboardUsers";
import PublishModal from "../Modal/PublishEditStrategy/PublishModal";
import UserImage from "../../asstes/Group 51.svg";
import backArrow from "../../asstes/icons/backArrow.svg";
import PublishStrModal from "../Modal/PublishEditStrategy/PublishStrModal";
const EditStrategyEn = () => {
  const [allStratigys, setAllStratigys] = React.useState([]);
  //---------------------------------------------------------
  const [selectSubject, setSelectSubject] = React.useState("");
  const [selectGrade, setSelectGrade] = React.useState("");
  const [selectTopic, setSelectTopic] = React.useState("");
  const [selectSuperTopic, setSelectSuperTopic] = React.useState("");
  const [selectSubTopic, setSelectSubTopic] = React.useState("");
  const [selectSubSubTopic, setSelectSubSubTopic] = React.useState("");
  const [selectLearningOutcome, setSelectLearningOutcome] = React.useState("");
  const [teachingStrategy, setteachingStrategy] = React.useState("");
  const [formData, setformData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedContent, setSubmittedContent] = useState("");
  const successTextRef = useRef(null);
  const [modalShow, setModalShow] = React.useState(false);
  const [error, setError] = useState(false);
  const [uploaderName, setuploaderName] = useState("");
  const { id } = useParams();
  const [isPublishModalOpen, setisPublishModalOpen] = useState(false);
  const [isStrategyPublic, setisStrategyPublic] = useState(false);
  const [editedDatas, seteditedDatas] = useState("");
  const { user } = useAuth();
  const [submitType, setSubmitType] = useState({});
  const [uploaderDatas, setuploaderDatas] = useState([]);
  const [isStrategyLoading, setisStrategyLoading] = useState(false);
  const handleTeachingStrategyChange = (event) => {
    const { name, value } = event.target;
    setformData({
      ...formData,
      [name]: value,
    });
    setSubmittedContent(value);
  };

  let paramobject = useParams();
  let isUserStrategyForm = paramobject["*"] === "user";
  useEffect(() => {
    setisStrategyLoading(true);
    if (!isUserStrategyForm) {
      singleStratigys(id).then((res) => {
        setformData(res[0]);
        setSubmittedContent(res[0]["Teaching Strategy"]);
        setteachingStrategy(res[0]["Teaching Strategy"])
      });
      setisStrategyLoading(false);
    } else {
      singleUserEnStratigys(id).then((res) => {
        setformData(res.data[0]);
        setSubmittedContent(res.data[0]["Teaching Strategy"]);
        setteachingStrategy(res.data[0]["Teaching Strategy"])
        getSingleUser(res.data[0].User_id).then((res) => {
          setuploaderName(`${res?.data[0].firstName} ${res?.data[0].lastName}`);
          setuploaderDatas(res?.data[0]);
        });
        setisStrategyLoading(false);
      });
    }
  }, [id]);

  const handleBackClick = () => {
    window.history.go(-1);
  };
  const handleCancelForm=()=>{
    formData["Teaching Strategy"]=teachingStrategy
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target?.["Teaching Strategy"].value === "") {
      setError(true);
    } else {
      setModalShow(true);
      setError(false);
      const data = {
        User_id: user._id,
        Subject: formData.Subject,
        Grade: formData.Grade,
        Skill: formData.Skill,
        Topic: formData.Topic,
        "Pedagogical Approach": formData["Pedagogical Approach"],
        "Sub Topic": formData["Sub Topic"],
        "Sub-sub topic": formData["Sub-sub topic"],
        "Super Topic": formData["Super Topic"],
        "Learning Outcome": formData["Learning Outcome"],
        "Teaching Strategy": formData["Teaching Strategy"],
        Approve: false,
        EditedBy: user._id,
        isPublic: submitType.buttonType === "Public"?true:false,
        isPrivate: submitType.buttonType === "Public"?false:true,
      };
      postUserStratigys(data).then((res) => {
        console.log("Response from CreatedStrUser EN:", res);
      });
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
  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {uploaderName}
    </Tooltip>
  );
  return (
    <>
      <div className=" d-flex justify-content-center align-items-center mb-1 position-relative HeadLine ">
        <button className="backbutton" onClick={handleBackClick}>
          <img src={backArrow} alt="backArrow" className="mb-md-1" />
          {`${t("Back")}`}
        </button>
        <hr className="line" />
        <p className="headText d-none d-md-block text-center">Edit Strategy</p>
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
              <div className=" col-md-2 ml-0">
                {isUserStrategyForm ? (
                  <div className="d-none d-md-block mb-1 mb-md-1 str_title d-flex gap-2 align-items-center">
                    {uploaderDatas?.firstName !== "" && (
                      <>
                        <p className="mb-1">{t("Uploaded By:")}</p>
                        <p className="d-flex gap-2">
                          {uploaderDatas?.image ? (
                            <OverlayTrigger
                              placement="right"
                              delay={{ show: 250, hide: 400 }}
                              overlay={renderTooltip}
                            >
                              <img
                                className="label user_image"
                                src={`data:${
                                  uploaderDatas?.image?.contentType
                                };base64,${Buffer.from(
                                  uploaderDatas?.image?.data?.data
                                ).toString("base64")}`}
                                alt="user_image"
                              />
                            </OverlayTrigger>
                          ) : (
                            <OverlayTrigger
                              placement="right"
                              delay={{ show: 250, hide: 400 }}
                              overlay={renderTooltip}
                            >
                              <img
                                src={UserImage}
                                className="user_image"
                                alt="person pic"
                              />
                            </OverlayTrigger>
                          )}
                          <p className="uni_id">{uploaderName}</p>
                        </p>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="d-none d-md-block mb-1 mb-md-1 str_title">
                    <p className="str_name">{t("strategy")}</p>
                    <p className="uni_id">ID-{formData?._id?.slice(19, 26)}</p>
                  </div>
                )}
              </div>
              <div className="d-flex flex-column  formWrapper">
                {isUserStrategyForm ? (
                  <div className=" d-md-none mb-1 mb-md-1 str_title d-flex gap-2 align-items-center">
                    <p className="m-0">{t("Uploaded By:")}</p>
                    <p className="d-flex gap-1 mb-0 align-items-center">
                      {uploaderDatas?.image ? (
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <img
                            className="label user_image"
                            src={`data:${
                              uploaderDatas?.image?.contentType
                            };base64,${Buffer.from(
                              uploaderDatas?.image?.data?.data
                            ).toString("base64")}`}
                            alt="user_image"
                          />
                        </OverlayTrigger>
                      ) : (
                        <OverlayTrigger
                          placement="right"
                          delay={{ show: 250, hide: 400 }}
                          overlay={renderTooltip}
                        >
                          <img
                            src={UserImage}
                            className="user_image"
                            alt="person pic"
                          />
                        </OverlayTrigger>
                      )}
                      <p className="uni_id">{uploaderName}</p>
                    </p>
                  </div>
                ) : (
                  <div className=" d-md-none mb-1 mb-md-1 str_title">
                    <p className="str_name">{t("strategy")}</p>
                    <p className="uni_id">ID-{formData?._id?.slice(19, 26)}</p>
                  </div>
                )}
                <PublishStrModal
                  show={isPublishModalOpen}
                  handleClose={() => setisPublishModalOpen(false)}
                  setisStrategyPublic={setisStrategyPublic}
                  setDatas={seteditedDatas}
                  Datas={editedDatas}
                  submitType={submitType}
                />

                <form onSubmit={handleSubmit}>
                  <div className="two-selects gap-3 d-flex flex-row">
                    <div className="halfwidth">
                      <p className="select-title ">
                        Grade <p>*</p>
                      </p>
                      <select
                        className={"select-field"}
                        name="grade"
                        disabled
                      >
                        <option value="" selected disabled>
                          {formData?.Grade}
                        </option>
                      </select>
                    </div>
                    <div className="halfwidth">
                      <p className="select-title">
                        Subject <p>*</p>
                      </p>
                      <select
                        className={"select-field "}
                        name="subject"
                        aria-label="Default select example"
                        value={formData.Subject}
                        disabled
                      >
                        <option value="" selected disabled>
                          {formData.Subject}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="two-selects ">
                    <div>
                      <p className="select-title">
                        Super topic <p>*</p>
                      </p>
                      <select
                        className={"select-field"}
                        name="Super_Topic"
                        value={
                          formData?.["Super Topic"]
                            ? formData?.["Super Topic"]
                            : formData?.["Skill"]
                        }
                        disabled
                      >
                        <option value="" selected disabled>
                          {formData?.["Super Topic"]
                            ? formData?.["Super Topic"]
                            : formData?.["Skill"]}
                        </option>
                      </select>
                    </div>
                    <div>
                      <p className="select-title">
                        Topic <p>*</p>
                      </p>
                      <select
                        className={"select-field"}
                        name="topic"
                        value={formData?.Topic}
                        disabled
                      >
                        <option value="" selected disabled>
                          {formData?.Topic}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="two-selects ">
                    <div>
                      <p className="select-title">
                        Sub-topic <p>*</p>
                      </p>
                      <select
                        className={"select-field"}
                        name="sub_topic"
                        value={formData?.["Sub Topic"]}
                        disabled
                      >
                        <option value="" selected disabled>
                          {formData?.["Sub Topic"]}
                        </option>
                      </select>
                    </div>
                    <div>
                      <p className="select-title">
                        Sub sub-topic <p>*</p>
                      </p>
                      <select
                        className={"select-field"}
                        name="sub_sub_topic"
                        value={formData["Sub-sub topic"]}
                        disabled
                      >
                        <option value="" selected disabled>
                          {formData["Sub-sub topic"]}
                        </option>
                      </select>
                    </div>
                  </div>
                  <div className="two-selects ">
                    <div>
                      <p className="select-title">
                        Pedagogical Approach <p>*</p>
                      </p>
                      <select
                        className={"select-field"}
                        name="Pedagogical_Approach"
                        value={
                          formData["Pedagogical Approach"]
                            ? formData["Pedagogical Approach"]
                            : "sasa"
                        }
                        disabled
                      >
                        <option value="" selected disabled>
                          {formData?.["Pedagogical Approach"]}
                        </option>
                      </select>
                    </div>
                    <div>
                      <p className="select-title">
                        Learning Outcome<p>*</p>
                      </p>
                      <select
                        className={"select-field"}
                        name="learning_outcome"
                        value={formData["Learning Outcome"]}
                        disabled
                      >
                        <option value="" selected disabled>
                          {formData?.["Learning Outcome"]}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="one-selects-l">
                    <div>
                      <p className="select-title">
                        Teaching Strategy <p>*</p>
                      </p>
                      <textarea
                        className={"select-field-full-2 StrategyTextarea"}
                        name="Teaching Strategy"
                        value={
                          formData?.["Teaching Strategy"]
                            ? formData?.["Teaching Strategy"]
                            : ""
                        }
                        onChange={handleTeachingStrategyChange}
                        disabled={formSubmitted}
                      />
                    </div>
                  </div>
                  <div className="d-flex gap-2 gap-md-4 mt-4">
                    <button
                      type="submit"
                      className="primaryButton"
                      disabled={formSubmitted}
                      onClick={()=>{
                        setSubmitType({buttonType:"Public",formType:"Edited"});
                      }}
                    >
                      Publish strategy
                    </button>
                    <button
                      type="submit"
                      className="secondaryButton"
                      disabled={formSubmitted}
                      onClick={()=>{
                        setSubmitType({buttonType:"Private",formType:"Edited"});
                      }}
                    >
                      Save privately
                    </button>
                    <button
                      type="button"
                      className="TertiaryButton"
                      disabled={formSubmitted}
                      onClick={handleCancelForm}
                    >
                      Cancel
                    </button>
                  </div>
                  {error && (
                    <p className="form-error">
                      Please fill all of the above fields !
                    </p>
                  )}
                  <div className="formNote">
                    <p>
                    A published strategy will be reviewed by the TEPS team and be available on the TEPS site for all users to view. The strategy will also be available on your profile page under the ‘Edited strategies’ list.
                    </p>
                    <p className="mt-1 md:mt-0">
                    Private strategies are only available to you and will be available on your profile page under the ‘Edited strategies’ list.
                    </p>
                  </div>
                </form>
              </div>
            </div>
          ) : null}
          {formSubmitted && isStrategyPublic && (
            <p className="responseText" ref={successTextRef}>
              Thank you for publishing your strategy!
            </p>
          )}
        </>
      )}
    </>
  );
};

export default EditStrategyEn;
