import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllStratigys, getFilterStrategies } from "../../services/stratigyes";
import { useAuth } from "../../Context/AuthContext";
import Article from "../LandingArticle/Article";
import "./homelayout.css";
import { getUserStratigys } from "../../services/userStratigy";
import { postPulledStr } from "../../services/pulledStratigy";
import {
  getAllGrades,
  getAllSubSubTopics,
  getAllSubTopics,
  getAllSubjects,
  getAllSuperTopics,
  getAllTopics,
} from "../../services/dropdowns";
const HomeLayout = ({ setAccorKey = () => {}, setoptionModal }) => {
  const { t } = useTranslation();
  const [allStratigys, setAllStratigys] = React.useState([]);
  const [allUserStratigys, setAllUserStratigys] = React.useState([]);
  const [selectSubject, setSelectSubject] = React.useState();
  const [selectGrade, setSelectGrade] = React.useState();
  const [selectTopic, setSelectTopic] = React.useState();
  const [selectSkill, setSelectSkill] = React.useState();
  const [selectSuperTopic, setSelectSuperTopic] = React.useState();
  const [selectSubTopic, setSelectSubTopic] = React.useState();
  const [selectSubSubTopic, setSelectSubSubTopic] = React.useState();
  const [selectedOption, setSelectedOption] = React.useState();
  const [error, setError] = React.useState("");
  const [error1, setError1] = React.useState(false);
  const [error2, setError2] = React.useState(false);
  const [error3, setError3] = React.useState(false);
  const [error4, setError4] = React.useState(false);
  const [error5, setError5] = React.useState(false);
  const [error6, setError6] = React.useState(false);
  const [uniqueGrade, setuniqueGrade] = useState([]);
  const [uniqueSubject, setuniqueSubject] = useState([]);
  const [uniqueSuperTopic, setuniqueSuperTopic] = useState([]);
  const [uniqueTopic, setuniqueTopic] = useState([]);
  const [uniqueSubTopic, setuniqueSubTopic] = useState([]);
  const [uniqueSubSubTopic, setuniqueSubSubTopic] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    setStratigyFilData,
    setStratigyFilUserData,
    user,
    allStrategies,
    allUserStrategies,
    loadingdropdown,
  } = useAuth();
  useEffect(() => {
    const selectedDropdown = localStorage.getItem("selectedDropdown");
    if (selectedDropdown) {
      setSelectedOption(JSON.parse(selectedDropdown));
    }
  }, []);

  React.useEffect(() => {
    setAllStratigys(allStrategies);
    setAllUserStratigys(allUserStrategies);
  }, [allStrategies, allUserStrategies, loadingdropdown]);
  React.useEffect(() => {
    if (selectedOption) {
      setSelectSubject(selectedOption?.selectSubject);
      setSelectGrade(selectedOption?.selectGrade);
      setSelectTopic(selectedOption?.selectTopic);
      setSelectSkill(selectedOption?.selectSkill);
      setSelectSuperTopic(selectedOption?.selectSuperTopic);
      setSelectSubTopic(selectedOption?.selectSubTopic);
      setSelectSubSubTopic(selectedOption?.selectSubSubTopic);
      //call all dropdown apis for  values
      handleAllSubject(selectedOption?.selectGrade)
      handleAllSuperTopic(selectedOption?.selectGrade,selectedOption?.selectSubject)
      handleAllTopic(selectedOption?.selectGrade,selectedOption?.selectSubject,selectedOption?.selectSuperTopic)
      handleAllSubTopic(selectedOption?.selectGrade,selectedOption?.selectSubject,selectedOption?.selectSuperTopic,selectedOption?.selectTopic)
      handleAllSubSubTopic(selectedOption?.selectGrade,selectedOption?.selectSubject,selectedOption?.selectSuperTopic,selectedOption?.selectTopic,selectedOption?.selectSubTopic)
    }
  }, [selectedOption, location.pathname]);
  const resetallErrors = () => {
    setError1(false);
    setError2(false);
    setError3(false);
    setError4(false);
    setError5(false);
    setError6(false);
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



  useEffect(() => {
    getAllGrades().then((res) => {
      let response = res?.data.sort((a, b) => {
        const indexA = customSortOrder.indexOf(a);
        const indexB = customSortOrder.indexOf(b);
        return indexA - indexB;
      });
      setuniqueGrade(response);
    });
  }, []);

  //functions to fetch dropdata datas

  const handleAllSubject = (item) => {
    getAllSubjects(item).then((res) => {
      let response = res?.data.filter((e) => {
        if (item === "Pre-K" || item === "LKG" || item === "UKG") {
          // For Pre-K, K1, K2 selectGrades
          allowedSubjects = ["English", "Numeracy", "Science", "EVS"];
          return allowedSubjects.includes(e);
        } else if (
          item === "1" ||
          item === "2" ||
          item === "3" ||
          item === "4" ||
          item === "5"
        ) {
          // For selectGrades 1 to 5
          allowedSubjects = ["English", "Mathematics", "EVS"];
          return allowedSubjects.includes(e);
        } else if (item === "6" || item === "7" || item === "8") {
          allowedSubjects = [
            "English",
            "Mathematics",
            "Science",
            "History",
            "Political Science",
            "Geography",
          ];
          return allowedSubjects.includes(e);
        } else if (item === "9" || item === "10") {
          allowedSubjects = [
            "English",
            "Mathematics",
            "Science",
            "Economics",
            "History",
            "Political Science",
            "Geography",
          ];
          return allowedSubjects.includes(e);
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
          return allowedSubjects.includes(e);
        }
      });
      setuniqueSubject(response);
    });
  };
  const handleAllSuperTopic = (grade, subject) => {
    getAllSuperTopics(grade, subject).then((res) => {
      setuniqueSuperTopic(res?.data);
    });
  };

  const handleAllTopic = (grade, subject, superTopic) => {
    getAllTopics(grade, subject, superTopic).then((res) => {
      setuniqueTopic(res?.data);
    });
  };

  const handleAllSubTopic = (grade, subject, superTopic, topic) => {
    getAllSubTopics(grade, subject, superTopic, topic).then((res) => {
      setuniqueSubTopic(res?.data);
    });
  };

  const handleAllSubSubTopic = (grade, subject, superTopic, topic,subtopic) => {
    getAllSubSubTopics(grade, subject, superTopic, topic,subtopic).then((res) => {
      setuniqueSubSubTopic(res?.data);
    });
  };

  let allowedSubjects = [];

  const handlesubFilter = (e) => {
    setSelectSubject(e.target.value);
    setSelectTopic("");
    setSelectSkill("");
    setSelectSuperTopic("");
    setSelectSubTopic("");
    setSelectSubSubTopic("");
    localStorage.removeItem("selectedDropdown");
    resetallErrors();
    handleAllSuperTopic(selectGrade, e.target.value);
  };

  const handlegradeFilter = (e) => {
    setSelectGrade(e.target.value);
    setSelectSubject("");
    setSelectTopic("");
    setSelectSkill("");
    setSelectSuperTopic("");
    setSelectSubTopic("");
    setSelectSubSubTopic("");
    localStorage.removeItem("selectedDropdown");
    resetallErrors();
    handleAllSubject(e.target.value);
  };

  const handleSkillFilter = (e) => {
    setSelectSkill(e.target.value);
    setSelectSuperTopic("");
    setSelectTopic("");
    setSelectSubTopic("");
    setSelectSubSubTopic("");
    localStorage.removeItem("selectedDropdown");
    resetallErrors();
  };
  const handleSuperTopicFilter = (e) => {
    setSelectSuperTopic(e.target.value);
    setSelectTopic("");
    setSelectSubTopic("");
    setSelectSubSubTopic("");
    localStorage.removeItem("selectedDropdown");
    resetallErrors();
    handleAllTopic(selectGrade, selectSubject, e.target.value);
  };
  const handleTopicFilter = (e) => {
    setSelectTopic(e.target.value);
    setSelectSubTopic("");
    setSelectSubSubTopic("");
    localStorage.removeItem("selectedDropdown");
    resetallErrors();
    handleAllSubTopic(
      selectGrade,
      selectSubject,
      selectSuperTopic,
      e.target.value
    );
  };
  const handleSubTopicFilter = (e) => {
    setSelectSubTopic(e.target.value);
    setSelectSubSubTopic("");
    localStorage.removeItem("selectedDropdown");
    resetallErrors();
    handleAllSubSubTopic(selectGrade,selectSubject,selectSuperTopic,selectTopic,e.target.value)
  };
  const handleSubSUbTopicFilter = (e) => {
    setSelectSubSubTopic(e.target.value);
    localStorage.removeItem("selectedDropdown");
    resetallErrors();
  };

  // ---------------


  const handleFindStratigys = async () => {
    // accordion collapse and remove checkbox
    setAccorKey();
    let isUserExist = localStorage.getItem("jwt");
    if (isUserExist === null) {
      setoptionModal(true);
    }

    if (location.pathname === "/home") {
      if (
        selectSubject &&
        selectGrade &&
        selectSuperTopic &&
        selectTopic &&
        selectSubTopic &&
        selectSubSubTopic
      ) {

          const filterData = await getFilterStrategies(
            selectGrade,
            selectSubject,
            selectSuperTopic,
            selectTopic,
            selectSubTopic,
            selectSubSubTopic
          );

          const aquaticCreatures = filterData?.data;
        const aquaticCreaturesUser = allUserStratigys.filter(function (
          creature
        ) {
          return (
            creature.Subject === selectSubject &&
            creature.Grade === selectGrade &&
            creature.Topic === selectTopic &&
            creature["Super Topic"] === selectSuperTopic &&
            creature["Sub Topic"] === selectSubTopic &&
            creature["Sub-sub topic"] === selectSubSubTopic
          );
        });
        if (aquaticCreatures) {
          window.localStorage.setItem(
            "filterData",
            JSON.stringify(aquaticCreatures)
          );
          setStratigyFilData(aquaticCreatures);
          const pulledStr = aquaticCreatures.map((res) => res._id);
          const data = {
            strategie_id: pulledStr[0],
            user_id: user._id,
          };
          postPulledStr(data);
        }
        if (aquaticCreaturesUser) {
          setStratigyFilUserData(aquaticCreaturesUser);
          window.localStorage.setItem(
            "filterUserData",
            JSON.stringify(aquaticCreaturesUser)
          );
          const pulledStr = aquaticCreaturesUser.map((res) => res._id);
          const data = {
            strategie_id: pulledStr[0],
            user_id: user._id,
          };
          postPulledStr(data);
        }
        if (
          aquaticCreatures?.length !== 0 ||
          aquaticCreaturesUser?.length !== 0
        ) {
          if (
            location.pathname === "/home" ||
            location.pathname === "/search"
          ) {
            navigate("/search");
          }
          window.localStorage.setItem(
            "selectedDropdown",
            JSON.stringify({
              selectSubject,
              selectGrade,
              selectTopic,
              selectSuperTopic,
              selectSubTopic,
              selectSubSubTopic,
            })
          );
        } else {
          setError(
            "No strategies are available for this combination. Please try a different combination."
          );
        }
      } else {
        if (!selectSubject) {
          setError5(true);
        }
        if (!selectGrade) {
          setError6(true);
        }
        if (!selectSuperTopic) {
          setError1(true);
        }
        if (!selectTopic) {
          setError2(true);
        }
        if (!selectSubTopic) {
          setError3(true);
        }
        if (!selectSubSubTopic) {
          setError4(true);
        }
        setError("Please fill all the boxes to proceed.");
      }
    }
     else {
      if (
        selectSubject &&
        selectGrade &&
        selectSuperTopic &&
        selectTopic &&
        selectSubject &&
        selectSubSubTopic
      ){
      window.localStorage.setItem(
        "selectedDropdown",
        JSON.stringify({
          selectSubject,
          selectGrade,
          selectTopic,
          selectSuperTopic,
          selectSubTopic,
          selectSubSubTopic,
        })
      );
      const filterData = await getFilterStrategies(
        selectGrade,
        selectSubject,
        selectSuperTopic,
        selectTopic,
        selectSubTopic,
        selectSubSubTopic
      );
      console.log(filterData?.data);

      const aquaticCreatures = filterData?.data;
      const aquaticCreaturesUser = allUserStratigys.filter(function (creature) {
        return (
          creature.Subject === selectSubject &&
          creature.Grade === selectGrade &&
          creature.Topic === selectTopic &&
          creature["Super Topic"] === selectSuperTopic &&
          creature["Sub Topic"] === selectSubTopic &&
          creature["Sub-sub topic"] === selectSubSubTopic &&
          creature.isPublic === true
        );
      });
      setStratigyFilData(aquaticCreatures);
      if (aquaticCreatures) {
        window.localStorage.setItem(
          "filterData",
          JSON.stringify(aquaticCreatures)
        );
        const pulledStr = aquaticCreatures.map((res) => res._id);
        const data = {
          strategie_id: pulledStr[0],
          user_id: user?._id,
        };
        postPulledStr(data);
      }
      if (aquaticCreaturesUser) {
        window.localStorage.setItem(
          "filterUserData",
          JSON.stringify(aquaticCreaturesUser)
        );
        const pulledStr = aquaticCreaturesUser.map((res) => res._id);
        const data = {
          strategie_id: pulledStr[0],
          user_id: user._id,
        };
        postPulledStr(data);
      }
      if (aquaticCreatures?.length === 0 || aquaticCreaturesUser?.length === 0) {
        setError(
          "No strategies are available for this combination. Please try a different combination."
        );
      }
    }
    else {
      if (!selectSubject) {
        setError5(true);
      }
      if (!selectGrade) {
        setError6(true);
      }
      if (!selectSuperTopic) {
        setError1(true);
      }
      if (!selectTopic) {
        setError2(true);
      }
      if (!selectSubTopic) {
        setError3(true);
      }
      if (!selectSubSubTopic) {
        setError4(true);
      }
      setError("Please fill all the boxes to proceed.");
    }
    }
  };
  return uniqueGrade ? (
    <>
      <div
        className={
          location.pathname === "/saveStratigy" ||
          location.pathname === "/favouriteStratigy"
            ? "container d-flex flex-column justify-content-center align-items-md-center"
            : "container d-flex flex-column justify-content-center align-items-md-center my-3 my-md-5"
        }
      >
        <div
          className={
            location.pathname === "/home" || location.pathname === "/"
              ? "my-2 my-md-3 d-flex"
              : location.pathname === "/saveStratigy" ||
                location.pathname === "/favouriteStratigy"
              ? "my-3 d-flex"
              : "mt-1 mb-2 mb-md-3 pt-3 pt-md-5 d-flex"
          }
        >
          <select
            value={selectGrade}
            onChange={handlegradeFilter}
            defaultValue={
              location.pathname === "/home" || !selectedOption?.selectGrade
                ? ""
                : selectedOption?.selectGrade
            }
            className={
              error6
                ? "d-block d-md-none px-md-3 px-1 py-md-2 bg-light ms-2 ms-md-3 error-border w-50"
                : "d-block d-md-none px-md-3 px-1 py-md-2 bg-light  ms-md-3 select-border w-50"
            }
          >
            <option value="" disabled>
              {t("Grade")}
            </option>

            {uniqueGrade?.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>

          <select
            value={selectGrade}
            onChange={handlegradeFilter}
            defaultValue={
              location.pathname === "/home" || !selectedOption?.selectGrade
                ? ""
                : selectedOption?.selectGrade
            }
            className={
              error6
                ? "d-none d-md-block px-md-3 px-1 py-md-2 bg-light mx-2 mx-md-3 error-border "
                : "d-none d-md-block px-md-3 px-1 py-md-2 bg-light mx-2 mx-md-3 select-border "
            }
          >
            <option value="" disabled>
              {t("Grade")}
            </option>

            {uniqueGrade?.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>

          <select
            value={selectSubject}
            onChange={handlesubFilter}
            defaultValue={
              location.pathname === "/home" || !selectedOption?.selectSubject
                ? ""
                : selectedOption?.selectSubject
            }
            className={
              error5
                ? "d-none d-md-block px-md-3 px-1 py-md-2 bg-light mx-md-3 error-border me-3"
                : "d-none d-md-block px-md-3 px-1 py-md-2 bg-light mx-md-3 select-border me-3"
            }
          >
            <option value="" disabled>
              {t("Subject")}
            </option>
            {uniqueSubject?.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <select
            value={selectSubject}
            onChange={handlesubFilter}
            defaultValue={
              location.pathname === "/home" || !selectedOption?.selectSubject
                ? ""
                : selectedOption?.selectSubject
            }
            className={
              error5
                ? "d-block d-md-none px-md-3 px-1 py-md-2 bg-light mx-md-3 error-border me-3 w-50"
                : "d-block d-md-none px-md-3 px-1 py-md-2 bg-light mx-md-3 select-border ms-2 w-50"
            }
          >
            <option value="" disabled>
              {t("Subject")}
            </option>
            {localStorage.getItem("selectedDropdown") && !selectSubject && (
              <option value="" selected disabled>
                {selectedOption?.selectSubject}
              </option>
            )}
            {uniqueSubject?.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>

          <select
            value={selectSuperTopic}
            onChange={handleSuperTopicFilter}
            defaultValue={selectedOption?.selectSkill}
            className={
              error1
                ? "d-none d-md-block px-1  px-md-3 py-md-2 bg-light mx-md-3 error-border"
                : "d-none d-md-inline px-1  px-md-3 py-md-2 bg-light mx-md-3 select-border"
            }
          >
            {selectedOption && location.pathname !== "/home" ? (
              <>
                <option value="" selected disabled>
                  {t("Super Topic")}
                </option>
                {localStorage.getItem("selectedDropdown") &&
                  !selectSuperTopic && (
                    <option value="" selected disabled>
                      {selectedOption?.selectSuperTopic}
                    </option>
                  )}
              </>
            ) : (
              <option value="" selected disabled>
                {t("Super Topic")}
              </option>
            )}
            {uniqueSuperTopic?.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <select
            value={selectTopic}
            onChange={handleTopicFilter}
            defaultValue={selectedOption?.selectTopic}
            className={
              error2
                ? "d-none d-md-block px-md-3 px-1 py-md-2 bg-light mx-md-3 error-border"
                : "d-none d-md-block px-md-3 px-1 py-md-2 bg-light mx-md-3 select-border"
            }
          >
            {selectedOption && location.pathname !== "/home" ? (
              <>
                <option value="" selected disabled>
                  {t("Topic")}
                </option>
                {localStorage.getItem("selectedDropdown") && !selectTopic && (
                  <option value="" selected disabled>
                    {selectedOption?.selectTopic}
                  </option>
                )}
              </>
            ) : (
              <option value="" selected disabled>
                {t("Topic")}
              </option>
            )}
            {uniqueTopic?.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
        </div>
        <div className="mb-2 mb-md-3">
          <select
            value={selectSuperTopic}
            onChange={handleSuperTopicFilter}
            defaultValue={selectedOption?.selectSuperTopic}
            className={
              error1
                ? "d-block d-md-none px-1  px-md-3 py-md-2 bg-light error-border me-2  w-100"
                : "d-block d-md-none px-1  px-md-3 py-md-2 bg-light select-border me-2 w-100"
            }
          >
            {selectedOption && location.pathname !== "/home" ? (
              <>
                <option value="" selected disabled>
                  {t("Super Topic")}
                </option>
                {localStorage.getItem("selectedDropdown") &&
                  !selectSuperTopic && (
                    <option value="" selected disabled>
                      {selectedOption?.selectSuperTopic}
                    </option>
                  )}
              </>
            ) : (
              <>
                <option value="" selected disabled>
                  {t("Super Topic")}
                </option>
              </>
            )}
            {uniqueSuperTopic?.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <select
            value={selectTopic}
            onChange={handleTopicFilter}
            defaultValue={selectedOption?.selectTopic}
            className={
              error2
                ? "d-block d-md-none px-md-3 py-md-2 bg-light error-border me-4 w-100 mt-3"
                : "d-block d-md-none px-md-3  py-md-2 bg-light select-border me-4 mt-2 mt-md-3 w-100"
            }
            style={{ paddingLeft: "2px", paddingRight: "5px" }}
          >
            {selectedOption && location.pathname !== "/home" ? (
              <>
                <option value="" selected disabled>
                  {t("Topic")}
                </option>
                {localStorage.getItem("selectedDropdown") && !selectTopic && (
                  <option value="" selected disabled>
                    {selectedOption?.selectTopic}
                  </option>
                )}
              </>
            ) : (
              <option value="" selected disabled>
                {t("Topic")}
              </option>
            )}
            {uniqueTopic?.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
        </div>
        <div className="d-block justify-content-center align-items-center d-md-none">
          <div>
            <select
              value={selectSubTopic}
              onChange={handleSubTopicFilter}
              defaultValue={selectedOption?.selectSubTopic}
              className={
                error3
                  ? "px-1 px-md-3 py-md-2 bg-light error-border w-100"
                  : "px-1 px-md-3 py-md-2 bg-light select-border w-100"
              }
            >
              {selectedOption && location.pathname !== "/home" ? (
                <>
                  <option value="" selected disabled>
                    {t("Sub - topic")}
                  </option>
                  {localStorage.getItem("selectedDropdown") &&
                    !selectSubTopic && (
                      <option value="" selected disabled>
                        {selectedOption?.selectSubTopic}
                      </option>
                    )}
                </>
              ) : (
                <>
                  <option value="" selected disabled>
                    {t("Sub - topic")}
                  </option>
                </>
              )}
              {uniqueSubTopic?.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
          </div>
          <div className="mt-2 mt-md-3">
            <select
              value={selectSubSubTopic}
              onChange={handleSubSUbTopicFilter}
              defaultValue={selectedOption?.selectSubSubTopic}
              className={
                error4
                  ? "px-1 px-md-3 py-md-2 bg-light mx-md-3 error-border w-100"
                  : "px-1 px-md-3 py-md-2 bg-light mx-md-3 select-border w-100"
              }
            >
              {selectedOption && location.pathname !== "/home" ? (
                <>
                  <option value="" selected disabled>
                    {t("Sub sub - topic")}
                  </option>
                  {localStorage.getItem("selectedDropdown") &&
                    !selectSubSubTopic && (
                      <option value="" selected disabled>
                        {selectedOption?.selectSubSubTopic}
                      </option>
                    )}
                </>
              ) : (
                <>
                  <option value="" selected disabled>
                    {t("Sub sub - topic")}
                  </option>
                </>
              )}
              {uniqueSubSubTopic?.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="d-none d-md-block">
          <select
            value={selectSubTopic}
            onChange={handleSubTopicFilter}
            defaultValue={selectedOption?.selectSubTopic}
            className={
              error3
                ? "px-1 px-md-3 py-md-2 bg-light mx-2 mx-md-3 error-border"
                : "px-1 px-md-3 py-md-2 bg-light mx-2 mx-md-3 select-border"
            }
          >
            {selectedOption && location.pathname !== "/home" ? (
              <>
                <option value="" selected disabled>
                  {t("Sub - topic")}
                </option>
                {localStorage.getItem("selectedDropdown") &&
                  !selectSubTopic && (
                    <option value="" selected disabled>
                      {selectedOption?.selectSubTopic}
                    </option>
                  )}
              </>
            ) : (
              <>
                <option value="" selected disabled>
                  {t("Sub - topic")}
                </option>
              </>
            )}
            {uniqueSubTopic?.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <select
            value={selectSubSubTopic}
            onChange={handleSubSUbTopicFilter}
            defaultValue={selectedOption?.selectSubSubTopic}
            className={
              error4
                ? "px-1 px-md-3 py-md-2 bg-light mx-md-3 error-border"
                : "px-1 px-md-3 py-md-2 bg-light mx-md-3 select-border"
            }
          >
            {selectedOption && location.pathname !== "/home" ? (
              <>
                <option value="" selected disabled>
                  {t("Sub sub - topic")}
                </option>
                {localStorage.getItem("selectedDropdown") &&
                  !selectSubSubTopic && (
                    <option value="" selected disabled>
                      {selectedOption?.selectSubSubTopic}
                    </option>
                  )}
              </>
            ) : (
              <>
                <option value="" selected disabled>
                  {t("Sub sub - topic")}
                </option>
              </>
            )}
            {uniqueSubSubTopic?.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        {error && location.pathname === "/home" && (
          <p className="error_text mt-2">{error}</p>
        )}
      </div>
      {location.pathname === "/home" ? (
        <div className="d-flex justify-content-center  my-md-0 ">
          <button
            onClick={handleFindStratigys}
            className="primaryButton subBtn"
          >
            {t("Find Strategies")}
          </button>
        </div>
      ) : location.pathname === "/saveStratigy" ||
        location.pathname === "/favouriteStratigy" ? (
        <div className="d-flex justify-content-center my-4 my-md-5">
          <button onClick={handleFindStratigys} className="Sec_submit_btn">
            {t("Find Strategies")}
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-center pb-md-0 ">
          <button
            onClick={handleFindStratigys}
            className="primaryButton subBtn"
          >
            {t("Find Strategies")}
          </button>
        </div>
      )}
    </>
  ) : (
    <div className="loading-spinner"></div>
  );
};

export default HomeLayout;
