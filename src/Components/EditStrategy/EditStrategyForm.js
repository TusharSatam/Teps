import React from "react";
import { FaHeart } from "react-icons/fa";
import { useState } from "react";
import { getAllStratigys } from "../../services/stratigyes";
import { useAuth } from "../../Context/AuthContext";
import { postUserStratigys } from "../../services/userStratigy";
import AproveReqModal from "../Modal/AproveReqModal";
import EditStrategyEn from "./EditStrategyEn";
import EditStrategyHi from "./EditStrategyHi";

const EditStrategyForm = () => {
  const { user } = useAuth();

  const [languageSelect, setLanguageSelect] = React.useState("en");
 
  const language = localStorage.getItem("i18nextLng");
  React.useEffect(() => {
    if (language === "hi") {
      setLanguageSelect("hi");
    } else {
      setLanguageSelect("en");
    }
  }, [language]);


  return (
    <div>
      {languageSelect === "en" ? (
        <>
       
  <EditStrategyEn/>
        </>
      ) : (
        <EditStrategyHi />
      )}
    </div>
  );
};

export default EditStrategyForm;
