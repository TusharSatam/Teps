import React, { useRef } from "react";
import "./addForm.css";
import { useState } from "react";
import { getAllStratigys } from "../../services/stratigyes";
import { useAuth } from "../../Context/AuthContext";
import AddFormHi from "./AddFormHi";
import { useEffect } from "react";
import PublishStrModal from "../Modal/PublishEditStrategy/PublishStrModal";
import { t } from "i18next";
import backArrow from "../../asstes/icons/backArrow.svg";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import { postUserStratigys, privateCreatedStrUser } from "../../services/userStratigy";
import { postUserStratigysHi } from "../../services/userStratigyHi";

const AddForm = () => {
  const { user, selectLang, allStrategies } = useAuth();
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
  const [submitType, setSubmitType] = useState({});
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
  }, [allStrategies]);
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
    setSelectSubject(e);
    setSelectTopic("");
    setSelectSkill("");
    setSelectSuperTopic("");
    setSelectSubTopic("");
    setSelectSubSubTopic("");
    setSelectPedagogical("");
    setSelectLearningOutcome("");
  };
  const handleGrade = (e) => {
    setSelectGrade(e);
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
    setSelectSuperTopic(e);
    setSelectTopic("");
    setSelectSubTopic("");
    setSelectSubSubTopic("");
    setSelectPedagogical("");
    setSelectLearningOutcome("");
  };
  const handleTopic = (e) => {
    setSelectTopic(e);
    setSelectSubTopic("");
    setSelectSubSubTopic("");
    setSelectPedagogical("");
    setSelectLearningOutcome("");
  };
  const handleSubTopic = (e) => {
    setSelectSubTopic(e);
    setSelectSubSubTopic("");
    setSelectPedagogical("");
    setSelectLearningOutcome("");
  };
  const handleSubSubTopic = (e) => {
    setSelectSubSubTopic(e);
    setSelectPedagogical("");
    setSelectLearningOutcome("");
  };
  const handlePedagogical = (e) => {
    setSelectPedagogical(e);
    setSelectLearningOutcome("");
  };
  const handleLearningOutcome = (e) => {
    setSelectLearningOutcome(e);
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
      } else if (
        selectGrade === "6" ||
        selectGrade === "7" ||
        selectGrade === "8"
      ) {
        allowedSubjects = [
          "English",
          "Mathematics",
          "Science",
          "History",
          "Political Science",
          "Geography",
        ];
        return allowedSubjects.includes(e.Subject);
      } else if (selectGrade === "9" || selectGrade === "10") {
        allowedSubjects = [
          "English",
          "Mathematics",
          "Science",
          "Economics",
          "History",
          "Political Science",
          "Geography",
        ];
        return allowedSubjects.includes(e.Subject);
      } else {
        // For other selectGrades
        allowedSubjects = [
          "English",
          "Mathematics",
          "Science",
          "Numeracy",
          "EVS",
          "Economics",
          "History",
          "Political Science",
          "Geography",
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
      selectSubject === "" ||
      selectGrade === "" ||
      selectSuperTopic === "" ||
      selectTopic === "" ||
      selectSubTopic === "" ||
      selectSubSubTopic === "" ||
      selectPedagogical === "" ||
      selectLearningOutcome === "" ||
      e.target.teaching_str.value === ""
    ) {
      setError(true);
    } else {
      setModalShow(true);
      setError(false);
      let data;
      if (submitType.buttonType === "Public") {
        data = {
          User_id: user._id,
          Subject: selectSubject,
          Grade: selectGrade,
          Topic: selectTopic,
          "Super Topic": selectSuperTopic,
          "Sub Topic": selectSubTopic,
          "Sub-sub topic": selectSubSubTopic,
          "Pedagogical Approach": selectPedagogical,
          "Learning Outcome": selectLearningOutcome,
          "Teaching Strategy": e.target.teaching_str.value,
          Approve: false,
          isPublic: true,
          isPrivate: false,
        };
        // Call postUserStratigys with updated data
        if (selectLang == "english") {
          postUserStratigys(data).then((res) => {
            console.log("Response from postUserStratigys:", res);
          });
        } else if (selectLang == "hindi") {
          postUserStratigysHi(data).then((res) => {
            console.log("Response from postUserStratigysHi:", res);
          });
        }
      } else {
        data = {
          User_id: user._id,
          Subject: selectSubject,
          Grade: selectGrade,
          Topic: selectTopic,
          "Super Topic": selectSuperTopic,
          "Sub Topic": selectSubTopic,
          "Sub-sub topic": selectSubSubTopic,
          "Pedagogical Approach": selectPedagogical,
          "Learning Outcome": selectLearningOutcome,
          "Teaching Strategy": e.target.teaching_str.value,
          Approve: false,
          isPublic: false,
          isPrivate: true,
        };
         // Call postUserStratigys with updated data
         if (selectLang == "english") {
          postUserStratigys(data).then((res) => {
            console.log("Response from privateCreatedStrUser EN:", res);
          });
        } 
      }
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
          <PublishStrModal
            show={modalShow}
            handleClose={handleClosePublishModal}
            setDatas={setSubmitData}
            Datas={submitData}
            setisStrategyPublic={setisStrategyPublic}
            submitType={submitType}
          />
          <div className=" d-flex justify-content-center align-items-center mb-1 position-relative HeadLine ">
            <button className="backbutton" onClick={handleBackClick}>
              <img src={backArrow} alt="backArrow" className="mb-md-1" />
              {`${t("Back")}`}
            </button>
            <hr className="line" />
            <p className="headText d-none d-md-block text-center">
              Add Your Strategy
            </p>
            <hr className="line" />
          </div>
          <div className="center-div">
            {allStratigys.length ? (
              <form onSubmit={handleSubmit} className="form-main-div addForm">
                <div className="two-selects ">
                  <div>
                    <p className="select-title">
                      Grade <p>*</p>
                    </p>
                    {/* <select
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
                    </select> */}
                    <Dropdown
                      options={uniqueGrade
                        ?.filter((res) => res !== undefined)
                        .map((res, i) => res)}
                      onChange={(e) => {
                        handleGrade(e.value);
                      }}
                      value={selectGrade}
                      placeholder="Grade"
                    />
                  </div>
                  <div>
                    <p className="select-title">
                      Subject <p>*</p>
                    </p>
    
                    <Dropdown
                      options={uniqueSubject
                        ?.filter((res) => res.Subject !== undefined)
                        .map((res, i) => res.Subject)}
                      onChange={(e) => {
                        handleSub(e.value);
                      }}
                      value={selectSubject}
                      placeholder="Subject"
                    />
                  </div>
                </div>
                <div className="two-selects ">
                  <div>
                    <p className="select-title">
                      Super topic <p>*</p>
                    </p>

                    <Dropdown
                      options={uniqueSuperTopic
                        ?.filter((res) => res["Super Topic"] !== undefined)
                        .map((res, i) => res["Super Topic"])}
                      onChange={(e) => {
                        handleSuperTopic(e.value);
                      }}
                      value={selectSuperTopic}
                      placeholder="Super Topic"
                    />
                  </div>
                  <div>
                    <p className="select-title">
                      Topic <p>*</p>
                    </p>

                    <Dropdown
                      options={uniqueTopic
                        ?.filter((res) => res.Topic !== undefined)
                        .map((res, i) => res.Topic)}
                      onChange={(e) => {
                        handleTopic(e.value);
                      }}
                      value={selectTopic}
                      placeholder="Topic"
                    />
                  </div>
                </div>
                <div className="two-selects ">
                  <div>
                    <p className="select-title">
                      Sub-topic <p>*</p>
                    </p>
   
                    <Dropdown
                      options={uniqueSubTopic
                        ?.filter((res) => res["Sub Topic"] !== undefined)
                        .map((res, i) => res["Sub Topic"])}
                      onChange={(e) => {
                        handleSubTopic(e.value);
                      }}
                      value={selectSubTopic}
                      placeholder="Sub Topic"
                    />
                  </div>
                  <div>
                    <p className="select-title">
                      Sub sub-topic <p>*</p>
                    </p>

                    <Dropdown
                      options={uniqueSubSubTopic
                        ?.filter((res) => res["Sub-sub topic"] !== undefined)
                        .map((res, i) => res["Sub-sub topic"])}
                      onChange={(e) => {
                        handleSubSubTopic(e.value);
                      }}
                      value={selectSubSubTopic}
                      placeholder="Sub sub-topic"
                    />
                  </div>
                </div>

                <div className="two-selects ">
                  <div>
                    <p className="select-title">
                      Pedagogical Approach <p>*</p>
                    </p>

                    <Dropdown
                      options={uniquePedagogical
                        ?.filter(
                          (res) => res["Pedagogical Approach"] !== undefined
                        )
                        .map((res, i) => res["Pedagogical Approach"])}
                      onChange={(e) => {
                        handlePedagogical(e.value);
                      }}
                      value={selectPedagogical}
                      placeholder="Pedagogical Approach"
                    />
                  </div>
                  <div>
                    <p className="select-title">
                      Learning Outcome<p>*</p>
                    </p>

                    <Dropdown
                      options={uniqueLearningOutcome
                        ?.filter((res) => res["Learning Outcome"] !== undefined)
                        .map((res, i) => res["Learning Outcome"])}
                      onChange={(e) => {
                        handleLearningOutcome(e.value);
                      }}
                      value={selectLearningOutcome}
                      placeholder="Learning Outcome"
                    />
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
                <div className="d-flex gap-2 gap-md-4 mt-4">
                  <button
                    type="submit"
                    className="primaryButton"
                    onClick={() => {
                      setSubmitType({
                        buttonType: "Public",
                        formType: "Created",
                      });
                    }}
                  >
                    Publish strategy
                  </button>
                  <button
                    type="submit"
                    className="secondaryButton"
                    onClick={() => {
                      setSubmitType({
                        buttonType: "Private",
                        formType: "Created",
                      });
                    }}
                  >
                    Save privately
                  </button>
                  <button type="button" className="TertiaryButton" onClick={resetDropdowns}>
                    Cancel
                  </button>
                </div>
                <div className="formNote">
                  <p>
                    Publish strategies will be reviewed by the TEPS team and
                    added to your Profile's ‘Created strategies’ list
                  </p>
                  <p>
                    Private strategies are for user reference in the 'Created
                    strategies' list on the Profile Page.
                  </p>
                </div>
              </form>
            ) : (
              <div className="loadContainer">
                <div className="loading-spinner"></div>
              </div>
            )}
            {formSubmitted && isStrategyPublic && (
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
