import React from "react";
import backArrow from "../../asstes/icons/backArrow.svg";
import { t } from "i18next";
import { useNavigate } from 'react-router-dom';
const PageHeading = (props) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    const initialPathname = window.location.pathname;

    // Go back once
    window.history.go(-1);

    // Check if the URL changed after going back once
    if (window.location.pathname === initialPathname) {
      // Go back again only if the previous route is not accessible
      navigate(-1);
    }
  };
  return (
    <div className=" d-flex justify-content-center align-items-center mb-1 position-relative HeadLine ">
      <button className="backbutton" onClick={handleBackClick}>
        <img src={backArrow} alt="backArrow" className="mb-md-1" />
        {`${t("Back")}`}
      </button>
      <hr className="line" />
      {props.title && (
        <p className={`headText d-none d-md-block text-center ${props.title==="Subscription"?"subscriptionTitle":""}`}>{props.title}</p>
      )}
      <hr className="line" />
    </div>
  );
};

export default PageHeading;
