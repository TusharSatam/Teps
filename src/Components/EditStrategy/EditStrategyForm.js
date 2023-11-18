import React from "react";
import EditStrategyEn from "./EditStrategyEn";
import EditStrategyHi from "./EditStrategyHi";

const EditStrategyForm = () => {
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
          <EditStrategyEn />
        </>
      ) : (
        <EditStrategyHi />
      )}
    </div>
  );
};

export default EditStrategyForm;
