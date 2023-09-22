import React, { useEffect } from "react";
import { t } from "i18next";
import { useState } from "react";
import {
  getAllStratigys,
  getStratigys,
  singleStratigys,
} from "../../services/stratigyes";
import { useAuth } from "../../Context/AuthContext";
import { postUserStratigys } from "../../services/userStratigy";
import AproveReqModal from "../Modal/AproveReqModal";
import { useParams } from "react-router-dom";
import "./EditStrategy.css";
const EditStrategyEn = () => {
  const [allStratigys, setAllStratigys] = React.useState([]);
  //---------------------------------------------------------
  const [selectSubject, setSelectSubject] = React.useState();
  const [selectGrade, setSelectGrade] = React.useState();
  const [selectTopic, setSelectTopic] = React.useState();
  const [selectSuperTopic, setSelectSuperTopic] = React.useState();
  const [selectSubTopic, setSelectSubTopic] = React.useState();
  const [selectSubSubTopic, setSelectSubSubTopic] = React.useState();
  const [selectLearningOutcome, setSelectLearningOutcome] = React.useState();
  const [teachingStrategy, setteachingStrategy] = React.useState();
  const [devDom1, setDevDom1] = React.useState("");
  const [devDom2, setDevDom2] = React.useState("");
  const [formData, setformData] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedContent, setSubmittedContent] = useState("");

  //-----------------------------------------------------------------
  const [modalShow, setModalShow] = React.useState(false);
  const [languageSelect, setLanguageSelect] = React.useState("en");
  const [error, setError] = useState(false);
  const [submitData, setSubmitData] = useState({});
  const { id } = useParams();

  // const language = localStorage.getItem("i18nextLng");
  // React.useEffect(() => {
  //   if (language === "hi") {
  //     setLanguageSelect("hi");
  //   } else {
  //     setLanguageSelect("en");
  //   }
  // }, [language]);

  const { user, editStrategyFormData } = useAuth();
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
    singleStratigys(id).then((res) => {
      console.log(res);
      setformData(res[0]);
    });
  }, [id]);
  React.useEffect(() => {
    getAllStratigys().then((res) => {
      setAllStratigys(res.data);
    });
  }, []);
  const resetDropdowns = () => {
    formData["Grade"] = "";
    formData["Subject"] = "";
    formData["Super topic"] = "";
    formData["Skill"] = "";
    formData["Topic"] = "";
    formData["Sub Topic"] = "";
    formData["Sub-sub topic"] = "";
    formData["Dev Dom 1"] = "";
    formData["Dev Dom 2"] = "";
    formData["Teaching Strategy"] = "";
    formData["Learning Outcome"] = "";

  };
  // english stratiges--------------------------------------------------------
  const uniqueSubject = Array.from(
    new Set(allStratigys.map((a) => a.Subject))
  ).map((subject) => {
    return allStratigys.find((a) => a.Subject === subject);
  });

  const uniqueGrade = Array.from(new Set(allStratigys.map((a) => a.Grade))).map(
    (grade) => {
      return allStratigys.find((a) => a.Grade === grade);
    }
  );

  const uniqueDevDom1 = Array.from(
    new Set(allStratigys.map((a) => a["Dev Dom 1"]))
  ).map((devDom1) => {
    return allStratigys.find((a) => a["Dev Dom 1"] === devDom1);
  });

  const uniqueDevDom2 = Array.from(
    new Set(allStratigys.map((a) => a["Dev Dom 2"]))
  ).map((devDom1) => {
    return allStratigys.find((a) => a["Dev Dom 2"] === devDom1);
  });

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
  const aquaticCreatures = allStratigys.filter(function (creature) {
    return creature.Subject === selectSubject && creature.Grade === selectGrade;
  });
  const uniqueSkill = Array.from(
    new Set(aquaticCreatures?.map((a) => a.Skill))
  ).map((skill) => {
    return aquaticCreatures?.find((a) => a.Skill === skill);
  });
  const aquaticCreaturesSkill = allStratigys.filter(function (creature) {
    return (
      creature.Subject === selectSubject &&
      creature.Grade === selectGrade &&
      creature.Skill === selectSuperTopic
    );
  });

  const uniqueTopic = Array.from(
    new Set(aquaticCreaturesSkill?.map((a) => a.Topic))
  ).map((topic) => {
    return aquaticCreaturesSkill?.find((a) => a.Topic === topic);
  });

  const aquaticCreaturesTopic = allStratigys.filter(function (creature) {
    return (
      creature.Subject === selectSubject &&
      creature.Grade === selectGrade &&
      creature.Skill === selectSuperTopic &&
      creature.Topic === selectTopic
    );
  });

  const uniqueSubTopic = Array.from(
    new Set(aquaticCreaturesTopic?.map((a) => a["Sub Topic"]))
  ).map((sub_topic) => {
    return aquaticCreaturesTopic?.find((a) => a["Sub Topic"] === sub_topic);
  });
  const aquaticCreaturesSubTopic = allStratigys.filter(function (creature) {
    return (
      creature.Subject === selectSubject &&
      creature.Grade === selectGrade &&
      creature.Skill === selectSuperTopic &&
      creature.Topic === selectTopic &&
      creature["Sub Topic"] === selectSubTopic
    );
  });
  const uniqueSubSubTopic = Array.from(
    new Set(aquaticCreaturesSubTopic?.map((a) => a["Sub-sub topic"]))
  ).map((sub_sub_topic) => {
    return aquaticCreaturesSubTopic?.find(
      (a) => a["Sub-sub topic"] === sub_sub_topic
    );
  });
  const aquaticCreaturesLearningOutcome = allStratigys.filter(function (
    creature
  ) {
    return (
      creature.Subject === selectSubject &&
      creature.Grade === selectGrade &&
      creature.Skill === selectSuperTopic &&
      creature.Topic === selectTopic &&
      creature["Sub Topic"] === selectSubTopic &&
      creature["Sub-sub topic"] === selectSubSubTopic
    );
  });
  const uniqueLearningOutcome = Array.from(
    new Set(aquaticCreaturesLearningOutcome?.map((a) => a["Learning Outcome"]))
  ).map((learning_outcome) => {
    return aquaticCreaturesLearningOutcome?.find(
      (a) => a["Learning Outcome"] === learning_outcome
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      e.target?.["Teaching Strategy"].value === ""
    ) {
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
        "Sub Topic": formData["Sub Topic"],
        "Sub-sub topic": formData["Sub-sub topic"],
        "Dev Dom 1": formData["Dev Dom 1"],
        "Dev Dom 2": formData["Dev Dom 2"],
        "Mode of Teaching": formData["Mode of Teaching"],
        "Learning Outcome": formData["Learning Outcome"],
        "Teaching Strategy": formData["Teaching Strategy"],
        Approve: false,
      };
      // setSubmitData(data);
      console.log(formData, data);
      resetDropdowns();
      setFormSubmitted(true);
    }
  };
  const devDom1Options = [
    null,
    "Cognitive Sensory",
    "Motor-Physical",
    "Socio-Emotional-Ethical",
    "Language & Communication",
  ];

  return (
    <>
      <div className="form-title">
        <p>Edit User Strategy</p>
      </div>
      {formData.length != 0 ? (
        <div className="center-div d-flex ">
          <div className="me-1 col-md-2 ml-0">
            <div className=" mb-4 mb-md-3 str_title">
              <p className="str_name">{t("strategy")}</p>
              {/* <p className='uni_id'>ID-{str && str?._id?.slice(19, 26)}</p> */}
              <p className="uni_id">ID-3232323</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className=" col-md-8">
            <div className="two-selects ">
              <div>
                <p className="select-title">
                  Grade <p>*</p>
                </p>
                <select
                  onChange={handleGrade}
                  className={"select-field"}
                  name="grade"
                  id=""
                  disabled
                >
                  <option value="" selected disabled>
                    {formData?.Grade}
                  </option>
                </select>
              </div>
              <div>
                <p className="select-title">
                  Subject <p>*</p>
                </p>
                <select
                  onChange={handleSub}
                  className={"select-field"}
                  name="subject"
                  id=""
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
                  Super Topic <p>*</p>
                </p>
                <select
                  onChange={handleSuperTopic}
                  className={"select-field"}
                  name="Super_Topic"
                  id=""
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
                  onChange={handleTopic}
                  className={"select-field"}
                  name="topic"
                  id=""
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
                  Pedagogical Approach <p>*</p>
                </p>
                <select
                  onChange={handleSubTopic}
                  className={"select-field"}
                  name="sub_topic"
                  id=""
                  value={
                    formData?.["Pedagogical Approach"]}
                    disabled
                >
                  <option value="" selected disabled>
                    {formData?.[" Pedagogical Approach"]}
                  </option>
                </select>
              </div>
              <div>
                <p className="select-title">
                  Sub-Topic <p>*</p>
                </p>
                <select
                  onChange={handleSubTopic}
                  className={"select-field"}
                  name="sub_topic"
                  id=""
                  value={
                    formData?.["Sub Topic"]}
                    disabled
                >
                  <option value="" selected disabled>
                    {formData?.["Sub Topic"]}
                  </option>
                </select>
              </div>
            </div>
            <div className="two-selects ">
              <div>
                <p className="select-title">
                  Sub-Sub-Topic <p>*</p>
                </p>
                <select
                  onChange={handleSubSubTopic}
                  className={"select-field"}
                  name="sub_sub_topic"
                  id=""
                  value={formData["Sub-sub topic"]}
                  disabled
                >
                  <option value="" selected disabled>
                    {formData["Sub-sub topic"]}
                  </option>
                </select>
              </div>
              <div>
                <p className="select-title">
                  Dev Dom 1 <p>*</p>
                </p>

                <select
                  className={"select-field"}
                  name="dev_dom_1"
                  id=""
                  placeholder="Dev Dom 1"
                  onChange={(e) => {
                    setDevDom1(e.target.value);
                  }}
                  value={formData?.["Dev Dom 1"] ? formData?.["Dev Dom 1"] : ""}
                  disabled
                >
                  <option value="" selected disabled>
                    {formData?.["Dev Dom 1"] ? formData?.["Dev Dom 1"] : ""}
                  </option>
                </select>
              </div>
            </div>
            <div className="two-selects ">
              <div>
                <p className="select-title">
                  Dev Dom 2 <p>*</p>
                </p>
                <select
                  className={"select-field"}
                  name="dev_dom_2"
                  placeholder="Dev Dom 2"
                  id=""
                  onChange={(e) => {
                    setDevDom2(e.target.value);
                  }}
                  disabled
                  value={formData?.["Dev Dom 2"] ? formData?.["Dev Dom 2"] : ""}
                >
                  <option value="" selected disabled>
                    {formData?.["Dev Dom 2"] ? formData?.["Dev Dom 2"] : ""}
                  </option>
                </select>
              </div>
              <div>
                <p className="select-title">
                  Mode Of Teaching <p>*</p>
                </p>
                <select
                  className={"select-field"}
                  name="Mode of Teaching"
                  id=""
                  disabled
                  value={
                    formData?.["Mode of Teaching"]
                      ? formData?.["Mode of Teaching"]
                      : ""
                  }
                >
                  <option value="" selected disabled>
                    {formData?.["Mode of Teaching"]
                      ? formData?.["Mode of Teaching"]
                      : ""}
                  </option>
                </select>
              </div>
            </div>
            <div className="one-selects">
              <div>
                <p className="select-title">
                  <p>*</p>Learning Outcome
                </p>
                <select
                  onChange={handleLearningOutcome}
                  className={"select-field w-100"}
                  name="learning_outcome"
                  id=""
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
                  id=""
                  value={
                    formData?.["Teaching Strategy"]
                      ? formData?.["Teaching Strategy"]
                      : ""
                  }
                  onChange={handleTeachingStrategyChange}
                />
              </div>
            </div>
            <div className="d-flex gap-3 mt-4">
              {/* <p className='form-note'>Note - The strategy will be added post approval by admin</p> */}
              <button type="submit" className=" saveStrategy" disabled={formSubmitted} >
                Save Strategy
              </button>
              <button
                onClick={handlePublishStrategy}
                className="publishStrategy"
              >
                Publish Strategy
              </button>
            </div>
            {/* {error ? <p className='form-success'>Thank you for submitting the strategy</p> */}
            {error && (
              <p className="form-error">
                Please fill all of the above fields !
              </p>
            )}
           {formSubmitted && <div className="afterSubmitText my-3">
              <h2 className="sucessText">Thank you for submitting the strategy</h2>
              <textarea readOnly   className={"select-field-full-2 StrategyTextarea submittedTextarea"}  value={submittedContent}>
                    {/* {formData['Teaching Strategy']} */}
              </textarea>
              <div className="bottomButtons d-flex gap-3 align-items-center">
                <button className="viewStrategy">View Strategy</button>
                <button className="editStrategy">Edit Strategy</button>
                <button className="publishStrategy">Publish Strategy</button>
              </div>
            </div>}
          </form>
        </div>
      ) : (
        <div className="loadContainer">
          <div className="loading-spinner"></div>
        </div>
      )}
    </>
  );
};

export default EditStrategyEn;
