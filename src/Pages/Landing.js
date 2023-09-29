import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Article from "../Components/LandingArticle/Article";
import LandingCarousel from "../Components/LandingCarousel/LandingCarousel";
import SignUpModal from "../Components/SignUpModal/SignUpModal";
import { useAuth } from "../Context/AuthContext";
import FilterStr from "../Components/Home/FilterStr";
import editIcon from "../asstes/icons/editIcon.svg";
import "./styles/Landing.css";
import LoginOptionModal from "../Components/Modal/LoginOptionModal/LoginOptionModal";
import LoginModal from "../Components/LoginModal/LoginModal";
import { t } from "i18next";
const Landing = () => {
  const { isAuthenticated, allStrategies, selectLang, allHindiStrategies } =
    useAuth();
  const [show, setShow] = useState(false);
  const [optionModal, setoptionModal] = useState(false);
  const [isLoginModal, setisLoginModal] = useState(false);
  const handleClose = () => setShow(false);
  const closeLoginModal = () => setisLoginModal(false);
  const handleOptionModalClose = () => setoptionModal(false);
  const handleShow = () => setShow(true);

  const openLoginModal = () => {
    setoptionModal(false);
    setisLoginModal(true);
  };
  const handleOptionModalShow = (selectSubject, selectGrade, selectTopic, selectSkill, selectSubTopic, selectSubSubTopic) => {
    console.log(selectSubject, selectGrade, selectTopic, selectSkill, selectSubTopic, selectSubSubTopic);
    if(selectSubject, selectGrade, selectTopic, selectSkill, selectSubTopic, selectSubSubTopic){
      if(selectLang=="english"){
        window.localStorage.setItem('selectedDropdown', JSON.stringify({ selectSubject, selectGrade, selectTopic, selectSkill, selectSubTopic, selectSubSubTopic }));
      }
      else{
        window.localStorage.setItem('selectedHiDropdown', JSON.stringify({ selectSubject, selectGrade, selectTopic, selectSkill, selectSubTopic, selectSubSubTopic }));
      }
    }
    setoptionModal(true);
  };

  const handleRegisterForm = () => {
    setoptionModal(false);
    setShow(true);
  };

  const navigate = useNavigate();
  useEffect(() => {
    isAuthenticated && navigate("/home");
  });
  return (
    <>
      <LandingCarousel />
      <div className="filterCard p-3">
        <h1 className="mx-auto">{t("Welcome")}</h1>
        <FilterStr
          stratigy={
            selectLang == "english" ? allStrategies : allHindiStrategies
          }
          handleShow={handleShow}
          handleOptionModalShow={handleOptionModalShow}
        />
      </div>
      <div className="uploadStartegyContainer mx-4">
        <h2>
          {t("Want to upload your own strategy and")}{" "}
          <span className="contributeText">
           {t("contribute to the TEPS community?")}
          </span>
        </h2>
        <button className="uploadStrategies" onClick={()=>handleOptionModalShow()}>
          {t("Upload Strategies")}
          <img src={editIcon} alt="editIcon" className="d-md-none" />
        </button>
      </div>
      <SignUpModal
        key={"1"}
        handleClose={handleClose}
        show={show}
        setShow={setShow}
      />
      <LoginOptionModal
        key={"2"}
        handleClose={handleOptionModalClose}
        show={optionModal}
        setShow={setoptionModal}
        handleShow={handleShow}
        handleRegisterForm={handleRegisterForm}
        openLoginModal={openLoginModal}
      />
      <LoginModal
        key={"3"}
        handleClose={closeLoginModal}
        show={isLoginModal}
        setShow={setisLoginModal}
      />
    </>
  );
};

export default Landing;
