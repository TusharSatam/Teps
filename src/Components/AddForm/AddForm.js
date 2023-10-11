import React, { useRef } from "react";
import "./addForm.css";
import { useState } from "react";
import { getAllStratigys } from "../../services/stratigyes";
import { useAuth } from "../../Context/AuthContext";
import AddFormHi from "./AddFormHi";
import { useEffect } from "react";
import PublishModal from "../Modal/PublishEditStrategy/PublishModal";
import { t } from "i18next";
import backArrow from "../../asstes/icons/backArrow.svg";

const AddForm = () => {
  const { user, selectLang,allStrategies } = useAuth();
  const [allStratigys, setAllStratigys] = React.useState([]);
  const [selectSubject, setSelectSubject] = React.useState("");
  const [selectGrade, setSelectGrade] = React.useState("");
  const [selectTopic, setSelectTopic] = React.useState("");
  const [selectSkill, setSelectSkill] = React.useState("");
  const [selectSubTopic, setSelectSubTopic] = React.useState("");
  const [selectSubSubTopic, setSelectSubSubTopic] = React.useState("");
  const [selectPedagogical, setSelectPedagogical] = React.useState("");
  const [selectSuperTopic, setSelectSuperTopic] = React.useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [uniqueSubjects, setuniqueSubjects] = useState("");
  const [selectLearningOutcome, setSelectLearningOutcome] = React.useState("");
  const [teachingStrategy, setteachingStrategy] = React.useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const [languageSelect, setLanguageSelect] = React.useState("en");
  const [error, setError] = useState(false);
  const [submitData, setSubmitData] = useState({});
  const language = localStorage.getItem("i18nextLng");
  const successMessageRef = useRef(null);
  const [isStrategyPublic, setisStrategyPublic] = useState(false);

  React.useEffect(() => {
    if (language === "hi") {
      setLanguageSelect("hi");
    } else {
      setLanguageSelect("en");
    }
  }, [language, selectLang]);

  React.useEffect(() => {
      setAllStratigys(allStrategies);
  }, []);
  const resetDropdowns = () => {
    setSelectSubject("");
    setSelectGrade("");
    setSelectSkill("");
    setSelectTopic("");
    setSelectSubTopic("");
    setSelectSubSubTopic("");
    setSelectLearningOutcome("");
    setteachingStrategy("");
    setSelectPedagogical("");
    setSelectSuperTopic("");
  };

  const handleSub = (e) => {
    setSelectSubject(e.target.value);
    setSelectTopic("");
    setSelectSkill("");
    setSelectSuperTopic("");
    setSelectSubTopic("");
    setSelectSubSubTopic("");
    setSelectPedagogical("");
    setSelectLearningOutcome("");
  };
  const handleGrade = (e) => {
    setSelectGrade(e.target.value);
    setSelectSubject("");
    setSelectTopic("");
    setSelectSkill("");
    setSelectSuperTopic("");
    setSelectSubTopic("");
    setSelectSubSubTopic("");
    setSelectPedagogical("");
    setSelectLearningOutcome("");
  };
  const handleSkill = (e) => {
    setSelectSkill(e.target.value);
  };
  const handleSuperTopic = (e) => {
    setSelectSuperTopic(e.target.value);
    setSelectTopic("");
    setSelectSubTopic("");
    setSelectSubSubTopic("");
    setSelectPedagogical("");
    setSelectLearningOutcome("");
  };
  const handleTopic = (e) => {
    setSelectTopic(e.target.value);
    setSelectSubTopic("");
    setSelectSubSubTopic("");
    setSelectPedagogical("");
    setSelectLearningOutcome("");
  };
  const handleSubTopic = (e) => {
    setSelectSubTopic(e.target.value);
    setSelectSubSubTopic("");
    setSelectPedagogical("");
    setSelectLearningOutcome("");
  };
  const handleSubSubTopic = (e) => {
    setSelectSubSubTopic(e.target.value);
    setSelectPedagogical("");
    setSelectLearningOutcome("");
  };
  const handlePedagogical = (e) => {
    setSelectPedagogical(e.target.value);
    setSelectLearningOutcome("");
  };
  const handleLearningOutcome = (e) => {
    setSelectLearningOutcome(e.target.value);
  };

  const customSortOrder = [
    "Pre-K",
    "LKG",
    "UKG",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];
  const uniqueGrade = Array.from(
    new Set(allStratigys.map((a) => a.Grade))
  ).sort((a, b) => {
    const indexA = customSortOrder.indexOf(a);
    const indexB = customSortOrder.indexOf(b);
    return indexA - indexB;
  });

  const aquaticCreaturesSubject = allStratigys.filter(function (creature) {
    return creature.Grade === selectGrade;
  });
  let allowedSubjects = [];
  const uniqueSubject = Array.from(
    new Set(aquaticCreaturesSubject.map((a) => a.Subject))
  )
    .map((subject) => {
      return aquaticCreaturesSubject.find((a) => a.Subject === subject);
    })
    .filter((e) => {
      if (
        selectGrade === "Pre-K" ||
        selectGrade === "LKG" ||
        selectGrade === "UKG"
      ) {
        // For Pre-K, K1, K2 selectGrades
        allowedSubjects = ["English", "Numeracy", "Science", "EVS"];
        return allowedSubjects.includes(e.Subject);
      } else if (
        selectGrade === "1" ||
        selectGrade === "2" ||
        selectGrade === "3" ||
        selectGrade === "4" ||
        selectGrade === "5"
      ) {
        // For selectGrades 1 to 5
        allowedSubjects = ["English", "Mathematics", "EVS"];
        return allowedSubjects.includes(e.Subject);
      } else {
        // For other selectGrades
        allowedSubjects = [
          "English",
          "Mathematics",
          "Science",
          "Social Studies",
        ];
        return allowedSubjects.includes(e.Subject);
      }
    });

  const aquaticCreatures = allStratigys.filter(function (creature) {
    return creature.Subject === selectSubject && creature.Grade === selectGrade;
  });

  const uniqueSuperTopic = Array.from(
    new Set(aquaticCreatures?.map((a) => a["Super Topic"]))
  ).map((SuperTopic) => {
    return aquaticCreatures?.find((a) => a["Super Topic"] === SuperTopic);
  });

  const aquaticCreaturesSuperTopic = allStratigys.filter(function (creature) {
    return (
      creature.Subject === selectSubject &&
      creature.Grade === selectGrade &&
      creature["Super Topic"] === selectSuperTopic
    );
  });

  const uniqueTopic = Array.from(
    new Set(aquaticCreaturesSuperTopic?.map((a) => a.Topic))
  ).map((topic) => {
    return aquaticCreaturesSuperTopic?.find((a) => a.Topic === topic);
  });

  const aquaticCreaturesTopic = allStratigys.filter(function (creature) {
    return (
      creature.Subject === selectSubject &&
      creature.Grade === selectGrade &&
      creature["Super Topic"] === selectSuperTopic &&
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
      creature["Super Topic"] === selectSuperTopic &&
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

  const aquaticCreaturesSubSubTopic = allStratigys.filter(function (creature) {
    return (
      creature.Subject === selectSubject &&
      creature.Grade === selectGrade &&
      creature["Super Topic"] === selectSuperTopic &&
      creature.Topic === selectTopic &&
      creature["Sub Topic"] === selectSubTopic &&
      creature["Sub-sub topic"] === selectSubSubTopic
    );
  });
  const uniquePedagogical = Array.from(
    new Set(aquaticCreaturesSubSubTopic?.map((a) => a["Pedagogical Approach"]))
  ).map((PedagogicalApproach) => {
    return aquaticCreaturesSubSubTopic?.find(
      (a) => a["Pedagogical Approach"] === PedagogicalApproach
    );
  });

  const aquaticCreaturesLearningOutcome = allStratigys.filter(function (
    creature
  ) {
    return (
      creature.Subject === selectSubject &&
      creature.Grade === selectGrade &&
      creature["Super Topic"] === selectSuperTopic &&
      creature.Topic === selectTopic &&
      creature["Sub Topic"] === selectSubTopic &&
      creature["Sub-sub topic"] === selectSubSubTopic &&
      creature["Pedagogical Approach"] === selectPedagogical
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
      e.target.subject.value === "" ||
      e.target.grade.value === "" ||
      e.target.superTopic.value === "" ||
      e.target.topic.value === "" ||
      e.target.sub_topic.value === "" ||
      e.target.sub_sub_topic.value === "" ||
      e.target.pedagogical.value === "" ||
      e.target.learning_outcome.value === "" ||
      e.target.teaching_str.value === ""
    ) {
      setError(true);
    } else {
      setModalShow(true);
      setError(false);
      const data = {
        User_id: user._id,
        Subject: e.target.subject.value,
        Grade: e.target.grade.value,
        Topic: e.target.topic.value,
        "Super Topic": e.target.superTopic.value,
        "Sub Topic": e.target.sub_topic.value,
        "Sub-sub topic": e.target.sub_sub_topic.value,
        "Pedagogical Approach": e.target.pedagogical.value,
        "Learning Outcome": e.target.learning_outcome.value,
        "Teaching Strategy": e.target.teaching_str.value,
        Approve: false,
      };
      setFormSubmitted(true);
      setSubmitData(data);
      // Reset the form fields
      // Clear all input fields
      setSelectSubject("");
      setSelectGrade("");
      setSelectSkill("");
      setSelectTopic("");
      setSelectSubTopic("");
      setSelectSubSubTopic("");
      setSelectLearningOutcome("");
      setteachingStrategy("");
      setSelectPedagogical("");
      setSelectSuperTopic("");
    }
  };
  React.useEffect(() => {
    if (formSubmitted && isStrategyPublic) {
      successMessageRef?.current.scrollIntoView({
        behavior: "smooth", // You can use "auto" for instant scrolling
        block: "start", // Scroll to the top of the message
      });
    }
  }, [formSubmitted]);

  const handleClosePublishModal = () => {
    setModalShow(false);
  };
  const handleBackClick = () => {
    window.history.go(-1);
  };
  return (
    <div>
      {languageSelect === "en" ? (
        <>
          <PublishModal
            show={modalShow}
            handleClose={handleClosePublishModal}
            setDatas={setSubmitData}
            Datas={submitData}
            setisStrategyPublic={setisStrategyPublic}
          />
          <div className=" d-flex justify-content-center align-items-center mb-1 position-relative HeadLine ">
            <button className="backbutton" onClick={handleBackClick}>
              <img src={backArrow} alt="backArrow" className="mb-md-1" />
              {`${t("Back")}`}
            </button>
            <hr className="line" />
            <p className="headText d-none d-md-block text-center">Add Your Strategy</p>
            <hr className="line" />
          </div>
          <div className="center-div">
            {allStratigys.length ? (
              <form onSubmit={handleSubmit} className="form-main-div">
                <div className="two-selects ">
                  <div>
                    <p className="select-title">
                      Grade <p>*</p>
                    </p>
                    <select
                      onChange={handleGrade}
                      className={"select-field"}
                      name="grade"
                      value={selectGrade}
                      id="grade"
                    >
                      <option value="" selected disabled>
                        Grade
                      </option>
                      {uniqueGrade
                        ?.filter((res) => res !== undefined)
                        .map((res, i) => (
                          <option key={i}>{res}</option>
                        ))}
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
                      value={selectSubject}
                      id="subject"
                    >
                      <option value="" selected disabled>
                        Subject
                      </option>
                      {uniqueSubject
                        ?.filter((res) => res.Subject !== undefined)
                        .map((res, i) => (
                          <option key={i}>
                            {res.Subject !== "" && res.Subject}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="two-selects ">
                  <div>
                    <p className="select-title">
                      Super topic <p>*</p>
                    </p>
                    <select
                      onChange={handleSuperTopic}
                      className={"select-field"}
                      name="superTopic"
                      value={selectSuperTopic}
                    >
                      <option value="" selected disabled>
                        Super topic
                      </option>
                      {uniqueSuperTopic
                        ?.filter((res) => res["Super Topic"] !== undefined)
                        .map((res, i) => (
                          <option key={i}>{res["Super Topic"]}</option>
                        ))}
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
                      value={selectTopic}
                    >
                      <option value="" selected disabled>
                        Topic
                      </option>
                      {uniqueTopic
                        ?.filter((res) => res.Topic !== undefined)
                        .map((res, i) => (
                          <option key={i}>{res.Topic}</option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="two-selects ">
                  <div>
                    <p className="select-title">
                      Sub-topic <p>*</p>
                    </p>
                    <select
                      onChange={handleSubTopic}
                      className={"select-field"}
                      name="sub_topic"
                      value={selectSubTopic}
                    >
                      <option value="" selected disabled>
                        Sub-topic
                      </option>
                      {uniqueSubTopic
                        ?.filter((res) => res["Sub Topic"] !== undefined)
                        .map((res, i) => (
                          <option key={i}>{res["Sub Topic"]}</option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <p className="select-title">
                      Sub sub-topic <p>*</p>
                    </p>
                    <select
                      onChange={handleSubSubTopic}
                      className={"select-field"}
                      name="sub_sub_topic"
                      value={selectSubSubTopic}
                    >
                      <option value="" selected disabled>
                        Sub sub-topic
                      </option>

                      {uniqueSubSubTopic
                        ?.filter((res) => res["Sub-sub topic"] !== undefined)
                        .map((res, i) => (
                          <option key={i}>{res["Sub-sub topic"]}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="two-selects ">
                  <div>
                    <p className="select-title">
                      Pedagogical Approach <p>*</p>
                    </p>
                    <select
                      onChange={handlePedagogical}
                      className={"select-field"}
                      name="pedagogical"
                      value={selectPedagogical}
                    >
                      <option value="" selected disabled>
                        Pedagogical Approach
                      </option>

                      {uniquePedagogical
                        ?.filter(
                          (res) => res["Pedagogical Approach"] !== undefined
                        )
                        .map((res, i) => (
                          <option key={i}>{res["Pedagogical Approach"]}</option>
                        ))}
                    </select>
                  </div>
                  <div>
                    <p className="select-title">
                      Learning Outcome<p>*</p>
                    </p>
                    <select
                      onChange={handleLearningOutcome}
                      className={"select-field"}
                      name="learning_outcome"
                      value={selectLearningOutcome}
                    >
                      <option value="" selected disabled>
                        Learning Outcome
                      </option>
                      {uniqueLearningOutcome
                        ?.filter((res) => res["Learning Outcome"] !== undefined)
                        .map((res, i) => (
                          <option key={i}>{res["Learning Outcome"]}</option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="one-selects-l">
                  <div>
                    <p className="select-title">
                      Teaching Strategy <p>*</p>
                    </p>
                    <textarea
                      className={"select-field-full-2"}
                      name="teaching_str"
                      value={teachingStrategy}
                      onClick={() => setFormSubmitted(false)}
                      onChange={(e) => setteachingStrategy(e.target.value)}
                    />
                  </div>
                </div>
                {error && (
                  <p className="form-error">
                    Please fill all of the above fields !
                  </p>
                )}
                <div className="d-flex gap-3 mt-4">
                  <button type="submit" className="primaryButton">
                    Publish strategy
                  </button>
                  <button type="button" className="secondaryButton">
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="loadContainer">
                <div className="loading-spinner"></div>
              </div>
            )}
            {formSubmitted &&
            isStrategyPublic &&(
              <p className="responseText" ref={successMessageRef}>
                Thank you for publishing your strategy!
              </p>
            )}
          </div>
        </>
      ) : (
        <AddFormHi />
      )}
    </div>
  );
};

export default AddForm;
