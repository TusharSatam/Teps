import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Buffer } from "buffer";
import { updateInfo } from "../../services/auth";
import { getEdits } from "../../services/userEdited";
import {
  getSingleUser,
  updateUser,
  updateUserWithHandling,
} from "../../services/dashboardUsers";
import defaultProfile from "../../asstes/defaultProfile.png";
import { useAuth } from "../../Context/AuthContext";
import ChangePass from "../ForgotPassModal/ChangePass";
import LikeIcon from "../../asstes/icons/Like.svg";
import LikdIcon from "../../asstes/icons/Liked.svg";
import HeroSection from "../Home/HeroSection";
import toast, { Toaster } from "react-hot-toast";
import "./profile.css";
import { useTranslation } from "react-i18next";
import { OverlayTrigger, Spinner, Tooltip } from "react-bootstrap";
import axios from "axios";
import emailjs from "@emailjs/browser";
import VerifyModal from "../ForgotPassModal/VerifyModal";
import { Link } from "react-router-dom";
import { getLikes } from "../../services/userLikes";
import { getSaves } from "../../services/userSaves";
import { getUserCreated } from "../../services/userCreated";
import ProfileDataC from "../../Pages/ProfileDataC";
import ProfileDataE from "../../Pages/ProfileDataE";
import ProfileDataS from "../../Pages/ProfileDataS";
import downArrow from "../../asstes/icons/viewDown.svg";
import SaveCards from "./cards/SaveCards";
import SavedStrategies from "./cards/SavedStrategies";
import SaveStratigy from "../../Pages/SaveStratigy";
import FavouriteStr from "../../Pages/FavouriteStr";
import OtherProfileDataF from "../../Pages/OtherProfileDataF";
import OtherProfileDataE from "../../Pages/OtherProfileDataE";
import OtherProfileDataC from "../../Pages/OtherProfileDataC";
import OtherProfileDataS from "../../Pages/OtherProfileDataS";
const language = localStorage.getItem("i18nextLng");

const OthersProfile = () => {
  const { t } = useTranslation();
  const { user, setUser } = useAuth();
  const [forgot, setForgot] = useState(false);
  const [profileImage, setProfileImage] = useState([]);
  const [isMyStrategies, setIsMyStrategies] = useState(true);
  const [isShowFav, setisShowFav] = useState(false);
  const [isShowEdited, setisShowEdited] = useState(false);
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [citys, setCitys] = React.useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [show, setShow] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const [istypeOptionVisible, setistypeoptionVisible] = useState(false);
  const [f, setF] = React.useState(0);
  const [l, setL] = React.useState(0);
  const [e, setE] = React.useState(0);
  const [c, setC] = React.useState(0);
  const navigate = useNavigate();
  const [currentPageUserDetails, setCurrentPageUserDetails] = useState();
  const { id } = useParams();
  useEffect(() => {
    if (id != undefined) {
      getSingleUser(id).then((e) => {
        setCurrentPageUserDetails(e.data[0]);
      });
    } else {
      setCurrentPageUserDetails(user);
    }
  }, []);

  // const prof=()=>{setIsMyStrategies(true);}
  const toggleButton = () => {
    setDropdownVisible(!dropdownVisible);
    setIsMyStrategies(false);
  };




  // edit Email handler
  const [editEmail, setEditEmail] = useState(false);
  const handleEmailEdit = () => {
    if (editEmail === false) {
      setEditEmail(true);
    } else setEditEmail(false);
  };

  // edit all handler
  const [editAll, setEditAll] = useState(true);
  const handleAllEdit = () => {
    setIsMyStrategies(true);
  };

  // pincode handler
  const [cityFound, setCityFound] = React.useState(true);
  const [liveDetails, setLiveDetails] = React.useState();

  React.useEffect(() => {
    const url = "./citys.json";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const res = await response.json();
        setCitys(res.cities);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const token = JSON.stringify(localStorage.getItem("jwt"));

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <section className="profile_container pb-5 overflow-hidden">
        {/* ---------mombile profile info-------------- */}
        <div className="d-block d-md-none text-start mx-3 mt-3">
          <div className="d-flex align-items-start prfile_pic">
            <div className="button-wrapper">
              {preview ? (
                <img
                  className="label"
                  id="wb"
                  src={preview}
                  alt="image"
                  width={"40px"}
                  height={"40px"}
                />
              ) : profileImage?.image ? (
                <img
                  className="label"
                  id="wb"
                  src={`data:${
                    profileImage?.image?.contentType
                  };base64,${Buffer.from(
                    profileImage?.image?.data?.data
                  ).toString("base64")}`}
                  alt=""
                  width={"40px"}
                  height={"40px"}
                />
              ) : currentPageUserDetails?.image ? (
                <img
                  className="label"
                  id="wb"
                  src={`data:${
                    currentPageUserDetails?.image?.contentType
                  };base64,${Buffer.from(
                    currentPageUserDetails?.image?.data?.data
                  ).toString("base64")}`}
                  alt="image"
                  width={"40px"}
                  height={"40px"}
                />
              ) : (
                <img
                  width={"40px"}
                  height={"40px"}
                  className="label"
                  src={defaultProfile}
                  alt="image"
                />
              )}

            </div>
            <div>
              <div className="profile_school mt-6">
                <p className="res_userName">
                  {currentPageUserDetails?.firstName
                    ? currentPageUserDetails?.firstName
                    : "Name N/A"}
                </p>
                <p className="res_userName" id="mtop">
                  {currentPageUserDetails?.organization
                    ? currentPageUserDetails?.organization
                    : "Organization N/A"}
                </p>
                <p className="res_userName" id="mtop">
                  {currentPageUserDetails?.designation
                    ? currentPageUserDetails?.designation
                    : "designation N/A"}
                </p>
                <p className="res_userName" id="mtop">
                  {currentPageUserDetails?.country
                    ? currentPageUserDetails?.country
                    : "country N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* ------------------------------------------------- */}

        {/* -----------My strategies Mobile------------------- */}
        <div className="mx-2">
          <div className=" mx-2 d-md-none">
            <button
              className="change_btn"
              onClick={(e) => setistypeoptionVisible(!istypeOptionVisible)}
            >
              {t("Their strategies")}
              <></>
            </button>
          </div>
        </div>

        {/* My strategies type Mobile */}
        {istypeOptionVisible && (
          <div className="typeWrapper mt-2 d-flex flex-column mx-3 w-100 d-md-none">
            <OtherProfileDataS setNumber={setF} />
            <OtherProfileDataF setNumber={setL} />
            <OtherProfileDataE setNumber={setE} />
            <OtherProfileDataC setNumber={setC} />
            {isShowFav && <FavouriteStr />}
          </div>
        )}
        {/* ------------------------------ */}

        {/* mobile sidebar button */}

        <div className="container justify-content-md-around  d-md-flex  mt-2 mx-2 ">
          <div
            id="bwb"
            className="p-4 side_profile d-none d-md-flex justify-content-center align-items-center text-center "
          >
            <div>
              <div className="button-wrapper">
                {profileImage?.image ? (
                  <img
                    className="label"
                    id="wb1"
                    src={`data:${
                      profileImage?.image?.contentType
                    };base64,${Buffer.from(
                      profileImage?.image?.data?.data
                    ).toString("base64")}`}
                    alt="image"
                  />
                ) : currentPageUserDetails?.image ? (
                  <img
                    className="label"
                    id="wb1"
                    src={`data:${
                      currentPageUserDetails?.image?.contentType
                    };base64,${Buffer.from(
                      currentPageUserDetails?.image?.data?.data
                    ).toString("base64")}`}
                    alt="image"
                  />
                ) : (
                  <img
                    className="label"
                    width={"120px"}
                    src={defaultProfile}
                    alt="image"
                  />
                )}


              </div>
              <div className="profile_school">
                <p className="profile_Name">
                  {currentPageUserDetails?.firstName
                    ? currentPageUserDetails?.firstName
                    : "Name N/A"}
                </p>{" "}
                <p className="profile_Organization mb-0" >
                  {currentPageUserDetails?.organization
                    ? currentPageUserDetails?.organization
                    : "Organization N/A"}
                </p>
                <p className="profile_Organization mb-1">
                  {currentPageUserDetails?.designation
                    ? currentPageUserDetails?.designation
                    : "designation N/A"}
                </p>
                <p className="profile_Organization mb-1">
                  {" "}
                  {currentPageUserDetails?.country
                    ? currentPageUserDetails?.country
                    : "country N/A"}
                </p>
              </div>
              <div id="rp">
                <div>
                  <button className={`viewMyStrategies`} onClick={toggleButton}>
                    {t("View My Strategies")}
                    <img
                      src={downArrow}
                      height="20"
                      width="20"
                      className="hover-white"
                    />
                  </button>
                </div>

                {dropdownVisible && (
                  <div className="d-block">
                    
                    <div>
                      {l === 0 ? (
                        <button
                          className="authBtn_p mt-2 me-3 viewBtns"
                          disabled
                        >
                          {t(`Favorite strategies`)}
                          <span>({l})</span>
                        </button>
                      ) : (
                          <Link to={`favouriteStrategies`} className="authBtn_p mt-2 me-3 viewBtns">
                            {t(`Favourite strategies`)}
                            <span>({l})</span>
                          </Link>
                      )}
                    </div>
                    
                    <div>
                      {c === 0 ? (
                        <button
                          className="authBtn_p mt-2 me-3 viewBtns"
                          disabled
                        >
                          {t("Created strategies")} <span>({c})</span>
                        </button>
                      ) : (
                          <Link to={`createdStrategies`} className="authBtn_p mt-2 me-3 viewBtns">
                            {t("Created strategies")} <span>({c})</span>
                          </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Edit Profile data form */}
          {isMyStrategies ? (
            <></>
          ) : (
            <div
              id="bbb"
              className="ms-md-5 mt-0 mb-1 p-1 p-md-2 mx-2 mx-md-0 d-none d-md-block"
            >
              
              <div>
                <OtherProfileDataF setNumber={setL} />
              </div>
              
              <div>
                <OtherProfileDataC setNumber={setC} />
              </div>
            </div>
          )}

          {/* ------------------- */}
          <div id="h10"></div>
        </div>
      </section>
    </>
  );
};

export default OthersProfile;
