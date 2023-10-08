import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";
import { updateInfo } from "../../services/auth";
import { getEdits } from "../../services/userEdited";
import { getSingleUser, updateUser } from "../../services/dashboardUsers";
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
import ProfileDataF from "../../Pages/ProfileDataF";
import downArrow from "../../asstes/icons/viewDown.svg";
import SaveCards from "./cards/SaveCards";
import SavedStrategies from "./cards/SavedStrategies";
import SaveStratigy from "../../Pages/SaveStratigy";
import FavouriteStr from "../../Pages/FavouriteStr";
const Profile = () => {
  const { t } = useTranslation();
  const { user, setUser } = useAuth();
  const [forgot, setForgot] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState([]);
  const [isMyStrategies, setIsMyStrategies] = useState(true);
  const [isShowCreated, setisShowCreated] = useState(false);
  const [isShowSaved, setisShowSaved] = useState(false);
  const [isShowFav, setisShowFav] = useState(false);
  const [isShowEdited, setisShowEdited] = useState(false);

  const [phoneInput, setphoneInput] = useState("");
  const [country, setCountry] = useState([]);
  const [state, setState] = useState([]);
  const [citys, setCitys] = React.useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [emailErr, setEmailErr] = React.useState("");
  const [phoneError, setphoneError] = useState(false);
  const [show, setShow] = React.useState(false);
  const [preview, setPreview] = React.useState(null);
  const [istypeOptionVisible, setistypeoptionVisible] = useState(false);
  const [f, setF] = React.useState(0);
  const [l, setL] = React.useState(0);
  const [e, setE] = React.useState(0);
  const [c, setC] = React.useState(0);
  const { logout } = useAuth();
  const [pincode, setPincode] = useState(user?.pincode);
  const navigate = useNavigate();
  // React.useEffect(() => {
  //   getSaves().then((res) => {
  //     const saves = res?.data?.filter((ress) => ress.user_id === user._id);
  //     setF(saves.length);
  //   });
  // }, []);
  // React.useEffect(() => {
  //   getUserCreated(user._id).then((res) => {
  //     setC(res.data.length);
  //   });
  // }, []);
  // React.useEffect(() => {
  //   getEdits(user._id).then((res) => {
  //     setE(res.data.length);
  //   });
  // }, []);

  // React.useEffect(() => {
  //   getLikes().then((res) => {
  //     const like = res?.data?.filter((ress) => ress.user_id === user._id);
  //     setL(like.length);
  //   });
  // });

  const handleForgotShow = () => {
    setForgot(true);
  };
  const handleProfile = (e) => {
    setPreview(URL.createObjectURL(e.target.files[0]));
    let formData = new FormData();
    formData.append("img", e.target.files[0]);
    updateInfo(user._id, formData).then((res) => {
      getSingleUser(user._id).then((res) => {
        window.localStorage.setItem("data", JSON.stringify(res.data[0]));
        setUser(res.data[0]);
      });
    });
  };
  // const prof=()=>{setIsMyStrategies(true);}
  const toggleButton = () => {
    setDropdownVisible(!dropdownVisible);
    setIsMyStrategies(false);
  };
  React.useEffect(() => {
    const url = "./countrys.json";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const res = await response.json();
        setCountry(res.countrys);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  React.useEffect(() => {
    const url = "./state.json";
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const res = await response.json();
        setState(res.states);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

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

  const handlePincode = (e) => {
    const inputValue = e.target.value;
    const onlyDigits = /^\d+$/;

    if (
      (onlyDigits.test(inputValue) && inputValue.length <= 6) ||
      inputValue === ""
    ) {
      setPincode(inputValue);

      if (inputValue !== "") {
        axios
          .get(`https://api.postalpincode.in/pincode/${inputValue}`)
          .then((res) => {
            if (res?.data[0].Message !== "No records found") {
              setLiveDetails(res?.data[0]?.PostOffice[0]);
              setCityFound(true);
            } else {
              setCityFound(false);
            }
          });
      }
    }
  };

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

  const [getEmail, setGetEmail] = useState();
  const handleEmail = (e) => {
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (e.target.value.match(pattern)) {
      setEmailErr("");

      setGetEmail(e.target.value);
    } else {
      setEmailErr("Enter correct email");
      setIsLoading(false);
    }
  };
  const token = JSON.stringify(localStorage.getItem("jwt"));
  const doneEmail = () => {
    const getEmail = document.getElementById("email").value;
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (pattern.test(getEmail)) {
      const data = {
        to: getEmail,
        subject: "Email verification - TEPS",
        html: `
      <p>Hello and welcome to Things Education’s Pedagogical Strategies</p>
      <p>Please click this link to verify your email address before you get started. Once verified, you will be able to log in to the site.</p>
      <p>https://teps.school/emailverify?ajhsdfjahb=${getEmail}&sdfbkjfewihuf=${user?._id}&pfgvsckvnlksfwe=${token}</p><br/>
      <p>Regards,</p>
      <p>Things Education</p>
      `,
      };
      axios
        .post("email", data)
        .then((res) => {
          if (res) {
            setShow(true);
            setEditEmail(false);
          }
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("Incorrect email format");
    }
  };

  const [selectedCountry, setSelectedCountry] = React.useState({
    city: user?.city,
    state: user?.state,
  });
  const handleCountry = (e) => {
    if (e.target.value !== " ") {
      setSelectedCountry({
        city: "International",
        state: "International",
      });
    } else {
      setSelectedCountry(user?.city);
    }
  };

  // update all data
  const handleUpdate = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      phoneNumber: e.target.phoneNumber.value,
      organization: e.target.organization.value,
      city: liveDetails ? liveDetails.Block : user.city,
      state: liveDetails ? liveDetails.State : user.state,
      pincode: e.target.pincode.value,
      country: e.target.country.value,
    };
    updateUser(user._id, formData)
      .then((res) => {
        getSingleUser(user._id).then((res) => {
          let f = user.email;
          const data = {
            to: f,
            subject: "Profile details - TEPS",
            html: `
                  <p>Hello,</p>
                  <p>Your profile details have been successfully updated!</p><br />
                  <p>Regards,</p>
                  <p>Things Education</p>
                  `,
          };

          axios
            .post("email", data)
            .then((res) => {
              if (res) {
                getSingleUser(user._id).then((res) => {
                  window.localStorage.setItem(
                    "data",
                    JSON.stringify(res.data[0])
                  );
                  setUser(res.data[0]);
                  toast.success(`${t("update_profile_messege")}`);
                  setIsLoading(false);
                });
              }
            })

            .catch((err) => console.log(err));
        });
      })
      .catch((err) => {
        toast.error("Something is wrong please try again!", err);
        setIsLoading(false);
      });
  };
  return (
    <>
      <VerifyModal
        show={show}
        setShow={setShow}
        noti1={"Your email has been changed!"}
        noti2={"Note: Please log in with your new email ID after verification."}
      />
      <Toaster position="top-right" reverseOrder={false} />
      <ChangePass show={forgot} setShow={setForgot} />

      <section className="profile_container pb-5">
        <div className="w-100 text-center welcomeUser">
          {t('Welcome')}, {user?.firstName}
        </div>

        {/* ---------mombile profile info-------------- */}
        <div className="d-block d-md-none text-start mx-3 mt-3">
          <div className="d-flex align-items-start prfile_pic">
            <div className="button-wrapper">
              {preview ? (
                <img src={preview} alt="image" />
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
                />
              ) : user?.image ? (
                <img
                  className="label"
                  id="wb"
                  src={`data:${user?.image?.contentType};base64,${Buffer.from(
                    user?.image?.data?.data
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
              <input
                id="upload"
                onChange={handleProfile}
                className="upload-box"
                type="file"
                accept="image/png, image/gif, image/jpeg"
                name=""
              />
            </div>
            <div>
              <div className="profile_school mt-6">
                <p className="res_userName">
                  {user?.firstName} {user?.lastName}
                </p>
                <p className="res_userName" id="mtop">
                  {user?.organization}
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
              {t("My strategies")}
              <></>
            </button>
          </div>
        </div>

        {/* My strategies type Mobile */}
        {istypeOptionVisible && (
          <div className="typeWrapper mt-2 d-flex flex-column mx-3 w-100 d-md-none">
            {/* <button className="typeButton">Created strategies</button> */}
            {/* Created strategies */}

            {/* Saved strategies */}
            {/* <button
              className="typeButton"
              onClick={() => setisShowSaved(!isShowSaved)}
            >
              Saved strategies
            </button> */}
            {/* {isShowSaved && <SaveStratigy />} */}
            <ProfileDataS setNumber={setF}/>
            <ProfileDataF setNumber={setL}/>
            <ProfileDataE setNumber={setE}/>
            <ProfileDataC setNumber={setC}/>
            {/* Edited Strategies */}
            {/* <button className="typeButton">Edited strategies</button> */}
            {/* Favorite Strategies */}
            {/* <button
              className="typeButton"
              onClick={() => setisShowFav(!isShowFav)}
            >
              Favorite strategies
            </button> */}
            {isShowFav && <FavouriteStr />}
          </div>
        )}
        {/* ------------------------------ */}

        {/* mobile sidebar button */}
        <div className="mx-2 mt-2">
          <div className=" mx-2 d-md-none">
            <button
              className="change_btn"
              onClick={() => {
                navigate("/addform");
              }}
            >
              {t("Upload strategy")}
              <></>
            </button>
          </div>
        </div>
        <div className="mx-2 mt-2">
          <div className=" mx-2 d-md-none">
            <button
              className="change_btn"
              onClick={(e) => setIsMyStrategies(!isMyStrategies)}
            >
              {t("Edit Information")}
              <></>
            </button>
          </div>
        </div>
        <div className="container justify-content-md-around  d-md-flex  mt-2 mx-2">
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
                ) : user?.image ? (
                  <img
                    className="label"
                    id="wb1"
                    src={`data:${user?.image?.contentType};base64,${Buffer.from(
                      user?.image?.data?.data
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

                <input
                  accept="image/png, image/gif, image/jpeg"
                  onChange={handleProfile}
                  id="upload"
                  className="upload-box"
                  type="file"
                  name=""
                />
              </div>
              <div className="profile_school">
                <p className="profile_Name">
                  {user.firstName} {user.lastName}{" "}
                </p>{" "}
                <p className="profile_Organization"> {user.organization}</p>
              </div>
              <div className="" id="rp">
                <div id="" className="">
                  <button
                    id=""
                    className={`viewMyStrategies`}
                    onClick={toggleButton}
                  >
                   {t('View My Strategies')}
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
                      {c === 0 ? (
                        <button className="authBtn_p mt-2 me-3" disabled>
                          {t('Created strategies')} <span>({c})</span>
                        </button>
                      ) : (
                        <Link to="/user-created-strategy">
                          <button className="authBtn_p mt-2 me-3">
                          {t('Created strategies')} <span>({c})</span>
                          </button>
                        </Link>
                      )}
                    </div>
                    <div>
                      {f === 0 ? (
                        <button className="authBtn_p mt-2 me-3" disabled>
                          {t('Saved strategies')} ({f})
                        </button>
                      ) : (
                        <Link to="/saveStratigy">
                          <button className="authBtn_p mt-2 me-3">
                            {t('Saved strategies')}<span>({f})</span>
                          </button>
                        </Link>
                      )}
                    </div>
                    <div>
                      {e === 0 ? (
                        <button className="authBtn_p mt-2 me-3" disabled>
                          {t('Edited strategies')} <span>({e})</span>
                        </button>
                      ) : (
                        <Link to="/user-edited-strategy">
                          <button className="authBtn_p mt-2 me-3">
                          {t('Edited strategies')} <span>({e})</span>
                          </button>
                        </Link>
                      )}
                    </div>
                    <div>
                      {l === 0 ? (
                        <button className="authBtn_p mt-2 me-3" disabled>
                          {t(`Favorite strategies`)}({l})
                        </button>
                      ) : (
                        <Link to="/favouriteStratigy">
                          <button className="authBtn_p mt-2 me-3">
                          {t(`Favorite strategies`)}<span>({l})</span>
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
                <div className="d-flex flex-column w-100 lowerOptions">
                  <Link to="/addForm">
                    <button className="profileOption">{t("Upload strategy")}</button>
                  </Link>
                  <button onClick={handleAllEdit} className="profileOption">
                    {t("Edit Information")}
                  </button>
                  <button onClick={handleForgotShow} className="profileOption">
                    {t("Change Password")}
                  </button>
                  <button onClick={logout} className="profileOption">
                    {t("Log Out")}
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Edit Profile data form */}
          {isMyStrategies ? (
            <div id="bwb" className="ms-md-5 mt-0 mb-1 p-1 p-md-2 mx-2 mx-md-0">
              <form
                className="p-1 p-md-5 mx-3 mx-md-0 profileFormWrapper"
                onSubmit={handleUpdate}
              >
                <div className="w-100">
                  <div>
                    <div className="d-flex justify-content-between align-items-center input_div">
                      <h4 className="input_label">{t("First Name")}:</h4>
                      <div>
                        <input
                          disabled={!editAll}
                          className={
                            !editAll
                              ? "border-0 profile_input  "
                              : "profile_input "
                          }
                          type="text"
                          defaultValue={user?.firstName}
                          name="firstName"
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center input_div">
                      <h4 className="input_label">{t("Last Name")}:</h4>
                      <div>
                        <input
                          disabled={!editAll}
                          className={
                            !editAll
                              ? "border-0 profile_input  "
                              : "profile_input "
                          }
                          type="text"
                          defaultValue={user?.lastName}
                          name="lastName"
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center input_div">
                      <h4 className="input_label">
                        {t("School/Organization")}:
                      </h4>
                      <div>
                        <input
                          disabled={!editAll}
                          className={
                            !editAll
                              ? "border-0 profile_input "
                              : "profile_input"
                          }
                          type="text"
                          defaultValue={user?.organization}
                          name="organization"
                          id=""
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center input_div">
                      <h4 className="input_label">{t("Email")}:</h4>
                      <div className="">
                        <input
                          onChange={handleEmail}
                          disabled={!editAll}
                          className={
                            emailErr
                              ? "border-danger text-danger profile_input mt-md-2"
                              : editEmail
                              ? "profile_input  mt-md-2"
                              : "border-0 profile_input mt-md-2"
                          }
                          type="text"
                          defaultValue={user.email}
                          name="email"
                          id="email"
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center input_div">
                      <h4 className="input_label">{t("Phone Number")}:</h4>
                      <div>
                        <input
                          disabled={!editAll}
                          className={`profile_input ${
                            phoneError ? "text-danger" : ""
                          }`}
                          type="text"
                          defaultValue={
                            user?.phoneNumber ? user?.phoneNumber : ""
                          }
                          name="phoneNumber"
                          pattern="[0-9]*"
                          maxLength="10"
                          onChange={(e) => setphoneInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (
                              !(
                                (e.key >= "0" && e.key <= "9") ||
                                e.key === "Backspace" ||
                                e.key === "Delete" ||
                                e.key === "ArrowLeft" ||
                                e.key === "ArrowRight" ||
                                e.key === "Tab"
                              )
                            ) {
                              e.preventDefault();
                            }
                          }}
                          onInput={(e) => {
                            e.target.value = e.target.value
                              .replace(/\D/g, "")
                              .substring(0, 10);
                          }}
                          onBlur={() => {
                            if (phoneInput.length !== 10) {
                              // Show an error message or take any other desired action
                              setphoneError(true);
                            } else {
                              setphoneError(false);
                            }
                          }}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center input_div">
                      <h4 className="input_label">{t("City/Town")}:</h4>
                      {selectedCountry?.city === "International" ? (
                        <div>
                          <input
                            disabled={!editAll}
                            className={
                              !editAll
                                ? "border-0 profile_input"
                                : "profile_input"
                            }
                            type="text"
                            defaultValue={selectedCountry}
                            name="city"
                            id=""
                          />
                        </div>
                      ) : (
                        <div>
                          <input
                            disabled={!editAll}
                            className={
                              !editAll
                                ? "border-0 profile_input"
                                : "profile_input"
                            }
                            type="text"
                            value={liveDetails ? liveDetails?.Block : user.city}
                            name="city"
                            id=""
                          />
                        </div>
                      )}
                    </div>

                    <div className="d-flex justify-content-between align-items-center input_div">
                      <h4 className="input_label">{t("state")}:</h4>
                      <div>
                        {selectedCountry?.city === "International" ? (
                          <input
                            disabled={!editAll}
                            className={
                              !editAll
                                ? "border-0 profile_input"
                                : "profile_input"
                            }
                            type="text"
                            defaultValue={selectedCountry?.state}
                            name="state"
                            id=""
                          />
                        ) : (
                          <input
                            disabled={!editAll}
                            className={
                              !editAll
                                ? "border-0 profile_input"
                                : "profile_input"
                            }
                            type="text"
                            value={
                              liveDetails ? liveDetails?.State : user?.state
                            }
                            name="state"
                            id=""
                          />
                        )}
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center input_div">
                      <h4 className="input_label">{t("Pincode")}:</h4>
                      <div>
                        <input
                          disabled={!editAll}
                          className={
                            !editAll
                              ? "border-0 profile_input"
                              : !cityFound &&
                                selectedCountry.city !== "International"
                              ? "border-danger profile_input"
                              : "profile_input"
                          }
                          title={cityFound ? "" : "No city/town found"}
                          onChange={handlePincode}
                          value={pincode}
                          type="text"
                          name="pincode"
                          id=""
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center input_div">
                      <h4 className=" input_label">{t("country")}:</h4>
                      <div className="select_div">
                        {liveDetails ? (
                          <select
                            value={liveDetails?.country}
                            onChange={handleCountry}
                            disabled={!editAll}
                            className="profile_input "
                            name="country"
                            id=""
                          >
                            <option className="">
                              {user.country ? user.country : "Country"}
                            </option>
                            {country?.map((item, index) => (
                              <option className="">{item?.name}</option>
                            ))}
                          </select>
                        ) : (
                          <select
                            onChange={handleCountry}
                            disabled={!editAll}
                            className="profile_input "
                            name="country"
                            id=""
                          >
                            <option className="">
                              {user.country ? user.country : "Country"}
                            </option>
                            {country?.map((item, index) => (
                              <option className="">{item?.name}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-d button_div">
                    {/* <div className='edit_al me-4' onClick={handleAllEdit}>{t('Edit')} </div> */}
                    <button
                      disabled={isLoading || phoneError}
                      type="submit"
                      className="primaryButton subBtn  mx-auto"
                    >
                      {isLoading ? (
                        <Spinner className="text-success " animation="border" />
                      ) : (
                        t("Save Changes")
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div
              id="bbb"
              className="ms-md-5 mt-0 mb-1 p-1 p-md-2 mx-2 mx-md-0 d-none d-md-block"
            >
              <div>
                <ProfileDataS setNumber={setF} />
              </div>
              <div>
                <ProfileDataF setNumber={setL} />
              </div>
              <div>
                <ProfileDataE setNumber={setE} />
              </div>
              <div>
                <ProfileDataC setNumber={setC} />
              </div>
            </div>
          )}
          {/* mobile bottom buttons */}
          <button
            onClick={handleForgotShow}
            className="change_btn mx-2   d-md-none"
          >
            {t("Change Password")}
          </button>
          <button
            onClick={logout}
            className="change_btn mt-2 mx-2  d-md-none"
          >
            {t("Log Out")}
          </button>
          {/* ------------------- */}
          <div id="h10"></div>
        </div>
      </section>
    </>
  );
};

export default Profile;
