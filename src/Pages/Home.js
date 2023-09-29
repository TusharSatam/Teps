import React, { Suspense, lazy } from "react";
import HeroSection from "../Components/Home/HeroSection";
import { useAuth } from "../Context/AuthContext";
import LandingCarousel from "../Components/LandingCarousel/LandingCarousel";
import { t } from "i18next";
import editIcon from "../asstes/icons/editIcon.svg";
import { useNavigate } from "react-router-dom";

const HomeHindiLayout = lazy(() =>
  import("../Components/Home/HomeHindiLayout")
);
const HomeLayout = lazy(() => import("../Components/Home/HomeLayout"));
const Article = lazy(() => import("../Components/LandingArticle/Article"));

const Home = () => {
  const { selectLang,user } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <LandingCarousel />

      <div className="filterCard p-3 homeFilterCard">
        <h1 className="mx-auto">{t("Welcome")},{user.firstName}!</h1>

        <Suspense fallback={<div>Loading...</div>}>
          {selectLang === "hindi" ? <HomeHindiLayout /> : <HomeLayout />}
        </Suspense>
      </div>
      <div className="uploadStartegyContainer mx-4">
        <h2>
          {t("Want to upload your own strategy and")}{" "}
          <span className="contributeText">
           {t("contribute to the TEPS community?")}
          </span>
        </h2>
        <button className="uploadStrategies" onClick={()=>navigate('/profile')}>
          {t("Upload Strategies")}
          <img src={editIcon} alt="editIcon" className="d-md-none" />
        </button>
      </div>
    </>
  );
};

export default Home;
