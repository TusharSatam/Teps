import React, { useRef, useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import { getAllHindiStratigys } from "../../services/hindiStratigys";
import ApproveReqModalHi from "../Modal/ApproveReqModalHi";
import PublishModal from "../Modal/PublishEditStrategy/PublishModal";
import { t } from "i18next";
import backArrow from "../../asstes/icons/backArrow.svg";
import { Dropdown } from "react-bootstrap";
import "react-dropdown/style.css";

const AddFormHi = () => {
  const [allStratigys, setAllStratigys] = React.useState([]);
  //---------------------------------------------------------
  const [selectSubject, setSelectSubject] = React.useState("");
  const [selectGrade, setSelectGrade] = React.useState("");
  const [selectTopic, setSelectTopic] = React.useState("");
  const [selectSkill, setSelectSkill] = React.useState("");
  const [selectSubTopic, setSelectSubTopic] = React.useState("");
  const [selectSubSubTopic, setSelectSubSubTopic] = useState("");
  const [learning_outcome, setlearning_outcome] = useState("");
  const [submitData, setSubmitData] = React.useState({});
  const { user } = useAuth();
  const [modalShow, setModalShow] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const successMessageRef = useRef(null);
  const [isStrategyPublic, setisStrategyPublic] = useState(false);

  React.useEffect(() => {
    getAllHindiStratigys().then((res) => {
      setAllStratigys(res.data);
    });
  }, []);

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
    "10"
  ];
  const uniqueGrade = Array.from(
    new Set(allStratigys.map((a) => a?.श्रेणी))
  ).sort((a, b) => {
    const indexA = customSortOrder.indexOf(a);
    const indexB = customSortOrder.indexOf(b);
    return indexA - indexB;
  });

  const aquaticCreaturesSubject = allStratigys.filter(function (creature) {
    return creature.श्रेणी === selectGrade;
  });
  const uniqueSubject = Array.from(
    new Set(aquaticCreaturesSubject.map((a) => a.विषय))
  ).map((subject) => {
    return aquaticCreaturesSubject.find((a) => a.विषय === subject);
  });

  const uniqueDevDom1 = Array.from(
    new Set(allStratigys.map((a) => a["विकासात्मक क्षेत्र 1"]))
  ).map((devDom1) => {
    return allStratigys.find((a) => a["विकासात्मक क्षेत्र 1"] === devDom1);
  });
  const uniqueDevDom2 = Array.from(
    new Set(allStratigys.map((a) => a["विकासात्मक क्षेत्र 2"]))
  ).map((devDom1) => {
    return allStratigys.find((a) => a["विकासात्मक क्षेत्र 2"] === devDom1);
  });
  const handleSub = (e) => {
    setSelectSubject(e.target.value);
    setSelectTopic("");
    setSelectSkill("");
    setSelectSubTopic("");
    setSelectSubSubTopic("");
  };
  const handleGrade = (e) => {
    setSelectGrade(e.target.value);
    setSelectSubject("");
    setSelectTopic("");
    setSelectSkill("");
    setSelectSubTopic("");
    setSelectSubSubTopic("");
  };
  const handleSkill = (e) => {
    setSelectSkill(e.target.value);
    setSelectTopic("");
    setSelectSubTopic("");
    setSelectSubSubTopic("");
  };
  const handleTopic = (e) => {
    setSelectTopic(e.target.value);
    setSelectSubTopic("");
    setSelectSubSubTopic("");
  };
  const handleSubTopic = (e) => {
    setSelectSubTopic(e.target.value);
    setSelectSubSubTopic("");
  };
  const handleSubSubTopic = (e) => {
    setSelectSubSubTopic(e.target.value);
  };
  const handleLearning = (e) => {
    setlearning_outcome(e.target.value);
  };

  const aquaticCreatures = allStratigys.filter(function (creature) {
    return creature.विषय === selectSubject && creature.श्रेणी === selectGrade;
  });
  const uniqueSkill = Array.from(
    new Set(aquaticCreatures?.map((a) => a["प्रमुख शीर्षक"]))
  ).map((skill) => {
    return aquaticCreatures?.find((a) => a["प्रमुख शीर्षक"] === skill);
  });
  const aquaticCreaturesSkill = allStratigys.filter(function (creature) {
    return (
      creature.विषय === selectSubject &&
      creature.श्रेणी === selectGrade &&
      creature["प्रमुख शीर्षक"] === selectSkill
    );
  });
  const uniqueTopic = Array.from(
    new Set(aquaticCreaturesSkill?.map((a) => a.शीर्षक))
  ).map((topic) => {
    return aquaticCreaturesSkill?.find((a) => a.शीर्षक === topic);
  });
  const aquaticCreaturesTopic = allStratigys.filter(function (creature) {
    return (
      creature.विषय === selectSubject &&
      creature.श्रेणी === selectGrade &&
      creature["प्रमुख शीर्षक"] === selectSkill &&
      creature.शीर्षक === selectTopic
    );
  });

  const uniqueSubTopic = Array.from(
    new Set(aquaticCreaturesTopic?.map((a) => a["उप शीर्षक"]))
  ).map((sub_topic) => {
    return aquaticCreaturesTopic?.find((a) => a["उप शीर्षक"] === sub_topic);
  });
  const aquaticCreaturesSubTopic = allStratigys.filter(function (creature) {
    return (
      creature.विषय === selectSubject &&
      creature.श्रेणी === selectGrade &&
      creature.शीर्षक === selectTopic &&
      creature["प्रमुख शीर्षक"] === selectSkill &&
      creature["उप शीर्षक"] === selectSubTopic
    );
  });
  const uniqueSubSubTopic = Array.from(
    new Set(aquaticCreaturesSubTopic?.map((a) => a["उप-उप शीर्षक"]))
  ).map((sub_sub_topic) => {
    return aquaticCreaturesSubTopic?.find(
      (a) => a["उप-उप शीर्षक"] === sub_sub_topic
    );
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !selectSubject ||
      !selectGrade ||
      !selectSkill ||
      !selectTopic ||
      !selectSubTopic ||
      !selectSubSubTopic ||
      e.target.teaching_str.value === ""
    ) {
      setError(true);
    } else {
      setError(false);
      setModalShow(true);
      const data = {
        User_id: user._id,
        विषय: selectSubject,
        श्रेणी: selectGrade,
        "प्रमुख शीर्षक": selectSkill,
        शीर्षक: selectTopic,
        "उप शीर्षक": selectSubTopic,
        "उप-उप शीर्षक": selectSubSubTopic,
        "शिक्षण के परिणाम": learning_outcome,
        "शिक्षण रणनीति": e.target.teaching_str.value,
        Approve: false,
      };
      setFormSubmitted(true);
      setSubmitData(data);
      // Clear all select values
      setSelectSubject("");
      setSelectGrade("");
      setSelectSkill("");
      setSelectTopic("");
      setSelectSubTopic("");
      setSelectSubSubTopic("");
      setlearning_outcome("");
      e.target.reset();
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
      <PublishModal
        show={modalShow}
        handleClose={handleClosePublishModal}
        setDatas={setSubmitData}
        Datas={submitData}
      />
      <div className=" d-flex justify-content-center align-items-center mb-1 position-relative HeadLine ">
        <button className="backbutton" onClick={handleBackClick}>
          <img src={backArrow} alt="backArrow" className="mb-md-1" />
          {`${t("Back")}`}
        </button>
        <hr className="line" />
        <p className="headText d-none d-md-block text-center">अपनी रणनीति जोड़ें</p>
        <hr className="line" />
      </div>
      <div className="center-div">
        <form className="form-main-div" onSubmit={handleSubmit}>
          <div className="two-selects ">
            <div>
              <p className="select-title">
                श्रेणी <p>*</p>
              </p>

              <Dropdown
                      options={uniqueGrade
                        ?.filter((res) => res !== undefined)
                        .map((res, i) => res)}
                      onChange={(e)=>{handleGrade(e.value)}}
                      value={selectGrade}
                      placeholder="श्रेणी"
                    />
            </div>
            <div>
              <p className="select-title">
                विषय <p>*</p>
              </p>

              <Dropdown
                      options={uniqueSubject
                        ?.filter((res) => res.विषय !== undefined)
                        .map((res, i) => res.विषय)}
                      onChange={(e)=>{handleSub(e.value)}}
                      value={selectSubject}
                      placeholder="विषय"
                    />
            </div>
          </div>
          <div className="two-selects ">
            <div>
              <p className="select-title">
                प्रमुख शीर्षक <p>*</p>
              </p>

              <Dropdown
                      options={uniqueSkill
                        ?.filter((res) => res["प्रमुख शीर्षक"] !== undefined)
                        .map((res, i) => res["प्रमुख शीर्षक"])}
                      onChange={(e)=>{handleSkill(e.value)}}
                      value={selectSkill}
                      placeholder="प्रमुख शीर्षक"
                    />
            </div>
            <div>
              <p className="select-title">
                शीर्षक <p>*</p>
              </p>

              <Dropdown
                      options={uniqueTopic
                        ?.filter((res) => res.शीर्षक !== undefined)
                        .map((res, i) => res.शीर्षक)}
                      onChange={(e)=>{handleTopic(e.value)}}
                      value={selectTopic}
                      placeholder="शीर्षक"
                    />
            </div>
          </div>
          <div className="two-selects ">
            <div>
              <p className="select-title">
                उप शीर्षक <p>*</p>
              </p>

              <Dropdown
                      options={uniqueSubTopic
                        ?.filter((res) => res["उप शीर्षक"] !== undefined)
                        .map((res, i) => res["उप शीर्षक"])}
                      onChange={(e)=>{handleSubTopic(e.value)}}
                      value={selectSubTopic}
                      placeholder="उप शीर्षक"
                    />
            </div>
            <div>
              <p className="select-title">
                उप-उप शीर्षक <p>*</p>
              </p>

              <Dropdown
                      options={uniqueSubSubTopic
                        ?.filter((res) => res["उप-उप शीर्षक"] !== undefined)
                        .map((res, i) => res["उप-उप शीर्षक"])}
                      onChange={(e)=>{handleSubSubTopic(e.value)}}
                      value={selectSubSubTopic}
                      placeholder="उप-उप शीर्षक"
                    />
            </div>
          </div>

          <div className="one-selects">
            <div>
              <p className="select-title">
                शिक्षण के परिणाम<p>*</p>
              </p>

              <Dropdown
                      options={uniqueSubSubTopic
                        ?.filter((res) => res["शिक्षण के परिणाम"] !== undefined)
                        .map((res, i) => res["शिक्षण के परिणाम"])}
                      onChange={(e)=>{handleLearning(e.value)}}
                      value={learning_outcome}
                      placeholder="शिक्षण के परिणाम"
                    />
            </div>
          </div>
          <div className="one-selects-l">
            <div>
              <p className="select-title">
                शिक्षण रणनीति <p>*</p>
              </p>
              <textarea
                className={"select-field-full-2"}
                name="teaching_str"
                onClick={() => setFormSubmitted(false)}
              />
            </div>
          </div>
          <div className="d-flex  mt-4 gap-3">
            <button type="submit" className="primaryButton">
              अद्यतन रणनीति
            </button>
            <button type="button" className="secondaryButton">
              रद्द
            </button>
          </div>
          {error && (
            <p className="form-error">कृपया उपरोक्त सभी फ़ील्ड भरें!</p>
          )}
        </form>
      </div>
      {formSubmitted &&
            isStrategyPublic &&(
        <p className="responseText" ref={successMessageRef}>
          अपनी रणनीति प्रकाशित करने के लिए धन्यवाद!
        </p>
      )}
    </div>
  );
};

export default AddFormHi;
