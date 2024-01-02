import React, { Suspense, lazy, useEffect, useState } from "react";
import HeroSection from "../Components/Home/HeroSection";
import { useAuth } from "../Context/AuthContext";
import LandingCarousel from "../Components/LandingCarousel/LandingCarousel";
import { t } from "i18next";
import editIcon from "../asstes/icons/editIcon.svg";
import { useNavigate } from "react-router-dom";
import FilterStr from "../Components/Home/FilterStr";
import PofileReminderModal from "../Components/Home/ProfileReminderModal";

const HomeHindiLayout = lazy(() =>
  import("../Components/Home/HomeHindiLayout")
);
const HomeLayout = lazy(() => import("../Components/Home/HomeLayout"));
const Article = lazy(() => import("../Components/LandingArticle/Article"));

const Home = () => {
  const { selectLang, user } = useAuth();
  const [showProfileModal, setshowProfileModal] = useState(false);
  const navigate = useNavigate();
  // useEffect(() => {
  //   if(user){
  //     if (!user?.country || !user?.state || !user?.email || !user?.phoneNumber || !user?.organization ||!user?.pincode) {
  //       setTimeout(() => {
  //         setshowProfileModal(true);
  //       }, 3000);
  //     }
  //   }
  // }, [user]);

  return (
    <>
      <LandingCarousel />
      {/* <PofileReminderModal
        show={showProfileModal}
        setShow={setshowProfileModal}
      /> */}
      <div className="blueShadow">
        <div className="filterCard homeFilterCard gap-2 gap-md-4">
          <h1 className="mx-auto welcomeText my-0">
            {t("Welcome")},{" "}
            {user?.firstName
              ? user?.firstName?.charAt(0)?.toUpperCase() +
                user?.firstName?.slice(1)
              : "Guest"}
            !
          </h1>
          <Suspense fallback={<div>Loading...</div>}>
            {selectLang === "hindi" ? <HomeHindiLayout /> : <HomeLayout />}
          </Suspense>
        </div>
      </div>
      <div className="uploadStartegyContainer mx-4">
        <h2>
          {t("Want to upload your own strategy and")}{" "}
          <span className="contributeText">
            {t("contribute to the TEPS community?")}
          </span>
        </h2>
        <button
          className="secondaryButton subBtn"
          onClick={() => navigate("/addForm")}
        >
          {t("Upload Strategies")}
        </button>
      </div>
    </>
  );
};

export default Home;
