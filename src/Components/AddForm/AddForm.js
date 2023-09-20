import React from "react";
import "./addForm.css";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { getAllStratigys } from "../../services/stratigyes";
import { useAuth } from "../../Context/AuthContext";
import { postUserStratigys } from "../../services/userStratigy";
import AproveReqModal from "../Modal/AproveReqModal";
import AddFormHi from "./AddFormHi";

const AddForm = () => {
  const { user } = useAuth();
  const [allStratigys, setAllStratigys] = React.useState([]);
  //---------------------------------------------------------
  const [selectSubject, setSelectSubject] = React.useState();
  const [selectGrade, setSelectGrade] = React.useState();
  const [selectTopic, setSelectTopic] = React.useState();
  const [selectSkill, setSelectSkill] = React.useState();
  const [selectSubTopic, setSelectSubTopic] = React.useState();
  const [selectSubSubTopic, setSelectSubSubTopic] = React.useState();
  const [selectLearningOutcome, setSelectLearningOutcome] = React.useState();
  const [teachingStrategy, setteachingStrategy] = React.useState();
  const [devDom1, setDevDom1] = React.useState("");
  const [devDom2, setDevDom2] = React.useState("");

  //-----------------------------------------------------------------
  const [modalShow, setModalShow] = React.useState(false);
  const [languageSelect, setLanguageSelect] = React.useState("en");
  const [error, setError] = useState(false);
  const [submitData, setSubmitData] = useState({});
  const language = localStorage.getItem("i18nextLng");
  React.useEffect(() => {
    if (language === "hi") {
      setLanguageSelect("hi");
    } else {
      setLanguageSelect("en");
    }
  }, [language]);

  React.useEffect(() => {
    getAllStratigys().then((res) => {
      setAllStratigys(res.data);
    });
  }, []);
  const resetDropdowns = () => {
    setSelectSubject("");
    setSelectGrade("");
    setSelectSkill("");
    setSelectTopic("");
    setSelectSubTopic("");
    setSelectSubSubTopic("");
    setSelectLearningOutcome("");
    setDevDom1("");
    setDevDom2("");
    setteachingStrategy("");
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
  const handleSkill = (e) => {
    setSelectSkill(e.target.value);
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
      creature.Skill === selectSkill
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
      creature.Skill === selectSkill &&
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
      creature.Skill === selectSkill &&
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
      creature.Skill === selectSkill &&
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
      e.target.subject.value === "" ||
      e.target.grade.value === "" ||
      e.target.skill.value === "" ||
      e.target.topic.value === "" ||
      e.target.sub_topic.value === "" ||
      e.target.sub_sub_topic.value === "" ||
      e.target.dev_dom_1.value === "" ||
      e.target.dev_dom_2.value === "" ||
      e.target.mode_of_teaching.value === "" ||
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
        Skill: e.target.skill.value,
        Topic: e.target.topic.value,
        "Sub Topic": e.target.sub_topic.value,
        "Sub-sub topic": e.target.sub_sub_topic.value,
        "Dev Dom 1": e.target.dev_dom_1.value,
        "Dev Dom 2": e.target.dev_dom_2.value,
        "Mode of Teaching": e.target.mode_of_teaching.value,
        "Learning Outcome": e.target.learning_outcome.value,
        "Teaching Strategy": e.target.teaching_str.value,
        Approve: false,
      };
      setSubmitData(data);
      resetDropdowns()
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
    <div>
      {languageSelect === "en" ? (
        <>
          <AproveReqModal
            show={modalShow}
            setModalShow={setModalShow}
            onHide={() => setModalShow(false)}
            data={submitData}
          />
          <div className="form-title">
            <p>Add Your Strategy</p>
          </div>
          <div className="center-div">
            <form onSubmit={handleSubmit} className="form-main-div">
              <div className="two-selects ">
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
                    value={selectSubject}
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
                <div>
                  <p className="select-title">
                    Grade <p>*</p>
                  </p>
                  <select
                    onChange={handleGrade}
                    className={"select-field"}
                    name="grade"
                    id=""
                    value={selectGrade}
                  >
                    <option value="" selected disabled>
                      Grade
                    </option>
                    {uniqueGrade
                      ?.filter((res) => res.Grade !== undefined)
                      .map((res, i) => (
                        <option key={i}>{res.Grade}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="two-selects ">
                <div>
                  <p className="select-title">
                    Skill <p>*</p>
                  </p>
                  <select
                    onChange={handleSkill}
                    className={"select-field"}
                    name="skill"
                    id=""
                    value={selectSkill}
                  >
                    <option value="" selected disabled>
                      Skill
                    </option>
                    {uniqueSkill
                      ?.filter((res) => res.Skill !== undefined)
                      .map((res, i) => (
                        <option key={i}>{res.Skill}</option>
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
                    id=""
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
                    Sub-Topic <p>*</p>
                  </p>
                  <select
                    onChange={handleSubTopic}
                    className={"select-field"}
                    name="sub_topic"
                    id=""
                    value={selectSubTopic}

                  >
                    <option value="" selected disabled>
                      Sub-Topic
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
                    Sub-Sub-Topic <p>*</p>
                  </p>
                  <select
                    onChange={handleSubSubTopic}
                    className={"select-field"}
                    name="sub_sub_topic"
                    id=""
                    value={selectSubSubTopic}
                  >
                    <option value="" selected disabled>
                      Sub-Sub-Topic
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
                    value={devDom1}
                  >
                    <option value="" selected disabled>
                    Dev Dom 1
                    </option>
                    {devDom1Options.map((option, i) => (
                      <option key={i}>{option}</option>
                    ))}

                    {/* {uniqueDevDom1
                      ?.filter((res) => res["Dev Dom 1"] !== "")
                      .map((res) => (
                        <option>
                          {res["Dev Dom 1"] !== undefined && res["Dev Dom 1"]}
                        </option>
                      ))} */}
                  </select>
                </div>
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
                    value={devDom2}
                  >
                  <option value="" selected disabled>
                    Dev Dom 2
                    </option>
                    {devDom1Options.map(
                      (option, i) =>
                        !(devDom1 === option) && (
                          <option key={i}>{option}</option>
                        )
                    )}
                    {/* {
                        uniqueDevDom2?.filter(res => res['Dev Dom 2'] !== undefined).map(res => (
                          <option>{res['Dev Dom 2']}</option>
                        ))
                      } */}
                  </select>
                </div>
              </div>
              <div className="two-selects ">
                <div>
                  <p className="select-title">
                    Mode Of Teaching <p>*</p>
                  </p>
                  <select
                    className={"select-field"}
                    name="mode_of_teaching"
                    id=""
                    // value={}
                  >
                    <option value="" selected disabled>
                      Mode Of Teaching
                    </option>
                    <option>Online</option>
                    <option>Offline</option>
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
                    id=""
                    value={teachingStrategy}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center mt-4">
                {/* <p className='form-note'>Note - The strategy will be added post approval by admin</p> */}
                <button type="submit" className="form-btn">
                  Submit Strategy
                </button>
              </div>
              {/* {error ? <p className='form-success'>Thank you for submitting the strategy</p> */}
              {error && (
                <p className="form-error">
                  Please fill all of the above fields !
                </p>
              )}
            </form>
          </div>
        </>
      ) : (
        <AddFormHi />
      )}
    </div>
  );
};

export default AddForm;
