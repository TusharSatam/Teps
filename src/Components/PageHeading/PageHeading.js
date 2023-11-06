import React from "react";
import backArrow from "../../asstes/icons/backArrow.svg";
import { t } from "i18next";
const PageHeading = (props) => {
  const handleBackClick = () => {
    window.history.go(-1);
  };
  return (
    <div className=" d-flex justify-content-center align-items-center mb-1 position-relative HeadLine ">
      <button className="backbutton" onClick={handleBackClick}>
        <img src={backArrow} alt="backArrow" className="mb-md-1" />
        {`${t("Back")}`}
      </button>
      <hr className="line" />
      {props.title && (
        <p className="headText d-none d-md-block text-center">{props.title}</p>
      )}
      <hr className="line" />
    </div>
  );
};

export default PageHeading;
