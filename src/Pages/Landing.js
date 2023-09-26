import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Article from "../Components/LandingArticle/Article";
import LandingCarousel from "../Components/LandingCarousel/LandingCarousel";
import SignUpModal from "../Components/SignUpModal/SignUpModal";
import { useAuth } from "../Context/AuthContext";
import FilterStr from "../Components/Home/FilterStr";
import "./styles/Landing.css";
const Landing = () => {
  const { isAuthenticated, allStrategies, selectLang, allHindiStrategies } =
    useAuth();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  useEffect(() => {
    isAuthenticated && navigate("/home");
  });
  return (
    <>
      <LandingCarousel />
      <div className="filterCard p-3">
        <h1 className="mx-auto">Welcome</h1>
        <FilterStr
          stratigy={
            selectLang == "english" ? allStrategies : allHindiStrategies
          }
          handleShow={handleShow}
        />
      </div>
      <div className="uploadStartegyContainer">
        <h2>
          Want to upload your own strategy and{" "}
          <span className="contributeText">
            contribute to the TEPS community?
          </span>
        </h2>
        <button className="uploadStrategies">Upload Strategies</button>
      </div>
      {/* <Article /> */}
      <SignUpModal
        key={"1"}
        handleClose={handleClose}
        show={show}
        setShow={setShow}
      />
    </>
  );
};

export default Landing;
