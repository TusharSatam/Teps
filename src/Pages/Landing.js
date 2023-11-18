import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingCarousel from "../Components/LandingCarousel/LandingCarousel";
import SignUpModal from "../Components/SignUpModal/SignUpModal";
import { useAuth } from "../Context/AuthContext";
import "./styles/Landing.css";
import LoginOptionModal from "../Components/Modal/LoginOptionModal/LoginOptionModal";
import LoginModal from "../Components/LoginModal/LoginModal";
import { t } from "i18next";
import ScrollToTop from "react-scroll-to-top";
import HomeLayout from "../Components/Home/HomeLayout";
import HomeHindiLayout from "../Components/Home/HomeHindiLayout";
const Landing = () => {
  const { isAuthenticated, selectLang } =
    useAuth();
  const [show, setShow] = useState(false);
  const [optionModal, setoptionModal] = useState(false);
  const [isLoginModal, setisLoginModal] = useState(false);
  const [isnavigateUploadPage, setisnavigateUploadPage] = useState(false);
  const [showOTPInputs, setshowOTPInputs] = useState(false);
  const [phoneValue, setPhoneValue] = React.useState("");
  const [isOTPLoginOpen, setisOTPLoginOpen] = useState(false);
  const handleClose = () => setShow(false);
  const closeLoginModal = () => setisLoginModal(false);
  const handleOptionModalClose = () => setoptionModal(false);
  const handleShow = () => setShow(true);

  const openLoginModal = () => {
    setoptionModal(false);
    setisLoginModal(true);
  };
  const handleOptionModalShow = (
    selectSubject,
    selectGrade,
    selectTopic,
    selectSkill,
    selectSubTopic,
    selectSubSubTopic
  ) => {
    if (
      (selectSubject,
      selectGrade,
      selectTopic,
      selectSkill,
      selectSubTopic,
      selectSubSubTopic)
    ) {
      if (selectLang == "english") {
        window.localStorage.setItem(
          "selectedDropdown",
          JSON.stringify({
            selectSubject,
            selectGrade,
            selectTopic,
            selectSkill,
            selectSubTopic,
            selectSubSubTopic,
          })
        );
      } else {
        window.localStorage.setItem(
          "selectedHiDropdown",
          JSON.stringify({
            selectSubject,
            selectGrade,
            selectTopic,
            selectSkill,
            selectSubTopic,
            selectSubSubTopic,
          })
        );
      }
    }
    // setoptionModal(true);
  };
  const handleUploadButton = () => {
    setisnavigateUploadPage(true);
    setoptionModal(true);
  };

  const handleRegisterForm = () => {
    setoptionModal(false);
    setShow(true);
  };

  const navigate = useNavigate();
  useEffect(() => {
    isAuthenticated && navigate("/home");
  }, []);
  return (
    <>
      <ScrollToTop smooth color="#00000" />
      <LandingCarousel />
      <div className="blueShadow">
        <div className="filterCard p-2 p-md-3  gap-2 gap-md-4">
          <h1 className="mx-auto welcomeText">{t("Welcome")}!</h1>
          {selectLang === "english" ? (
            <HomeLayout setoptionModal={setoptionModal} />
          ) : (
            <HomeHindiLayout setoptionModal={setoptionModal} />
          )}
        </div>
      </div>
      <div className="uploadStartegyContainer mx-4">
        <h2>
          {t("Want to upload your own strategy and")}{" "}
          <span className="contributeText">
            {t("contribute to the TEPS community?")}
          </span>
        </h2>
        <button className="secondaryButton subBtn" onClick={handleUploadButton}>
          {t("Upload Strategies")}
        </button>
      </div>
      <SignUpModal
        key={"1"}
        handleClose={handleClose}
        show={show}
        setShow={setShow}
        isnavigateUploadPage={isnavigateUploadPage}
        setshowOTPInputs={setshowOTPInputs}
        showOTPInputs={showOTPInputs}
        setPhoneForOTP={setPhoneValue}
        setisOTPLoginOpen={setisOTPLoginOpen}
        setLoginModal={setisLoginModal}
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
        isnavigateUploadPage={isnavigateUploadPage}
        setshowOTPInputs={setshowOTPInputs}
        showOTPInputs={showOTPInputs}
        phoneValue={phoneValue}
        setPhoneValue={setPhoneValue}
        isOTPLoginOpen={isOTPLoginOpen}
        setisOTPLoginOpen={setisOTPLoginOpen}
      />
    </>
  );
};

export default Landing;
