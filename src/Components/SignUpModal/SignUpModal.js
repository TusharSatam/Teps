import React, { useRef, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { sendOTP, userRegister } from "../../services/auth";
import CrossIcon from "../../asstes/cross-icon.png";
import { useAuth } from "../../Context/AuthContext";
import ForgotModal from "../ForgotPassModal/ForgotModal";
import "./signUpModal.css";
import axios from "axios";
import emailjs from "@emailjs/browser";
import VerifyModal from "../ForgotPassModal/VerifyModal";
import toast from "react-hot-toast";

const SignUpModal = ({
  handleClose,
  show,
  setShow,
  showOTPInputs,
  setshowOTPInputs,
  setPhoneForOTP,
  setisOTPLoginOpen,
  setLoginModal,
}) => {
  const { t } = useTranslation();
  const [error, setError] = React.useState("");
  const [required, setRequired] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [town, setTown] = React.useState("");
  const [cityDisable, setCityDisable] = React.useState(false);
  const [interNAtionalDisable, setInterNAtionalDisable] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  const [display, setDisplay] = React.useState("d-none");
  const [forgot, setForgot] = React.useState(false);
  const [checkError, setCheckError] = React.useState("");
  const [passError, setPassError] = React.useState("");
  const [emailErr, setEmailErr] = React.useState("");
  const [verifyModal, setVerifyModal] = React.useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [registrationOption, setRegistrationOption] = useState("email");
  const navigate = useNavigate();
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPass, setConfirmPass] = useState("");

  const { setIsAuthenticated, setUser } = useAuth();
  const [phoneValue, setPhoneValue] = React.useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPhoneInputType, setisPhoneInputType] = useState(false);
  const emailInputRef = useRef(null);
  const checkFormValidity = () => {
    // Check if any of the required fields are empty
    let isInvalid;
    if (registrationOption === "email") {
      isInvalid =
        !FirstName ||
        !LastName ||
        !(Email || PhoneNumber) ||
        !Password ||
        !ConfirmPass;
    } else {
      isInvalid = !FirstName || !LastName || !PhoneNumber;
    }

    setIsFormValid(!isInvalid);
  };

  const handleRegistrationOptionChange = (option) => {
    setRegistrationOption(option);
    if (option === "email") {
      setPhoneValue("");
      setPhoneError("");
      if (emailInputRef.current) {
        emailInputRef.current.value = ""; // Clear the email input value
      }
    } else {
      if (emailInputRef.current) {
        emailInputRef.current.value = ""; // Clear the email input value
      }
      setEmailError("");
    }
  };
  const handlePhoneBlur = () => {
    if (phoneValue.length < 10) {
      setPhoneError("must be 10 digits long");
    } else {
      setPhoneError(""); // Clear the error message
    }
  };
  React.useEffect(() => {
    if (checked) {
      setCityDisable(true);
      setInterNAtionalDisable(false);
    } else {
      setCityDisable(false);
    }
    if (show === false) {
      setError("");
      setRequired("");
      setEmailError("");
      setCheckError("");
      setPassError("");
      setEmailErr("");
      setChecked(false);
      setCityFound("");
      setTown("");
    }
  }, [checked, show]);
  const [cityFound, setCityFound] = React.useState("");
  const [liveDetails, setLiveDetails] = React.useState();
  const handlePincode = (e) => {
    if (e.target.value === "") {
      setTown("");
      setCityFound("");
    }
    axios
      .get(`https://api.postalpincode.in/pincode/${e.target.value}`)
      .then((res) => {
        if (res?.data[0].Message !== "No records found") {
          setLiveDetails(res?.data[0]?.PostOffice[0]);
          setCityFound("");
          setTown(res?.data[0]?.PostOffice[0]?.Block);
        } else {
          if (!checked) setTown("");
          setCityFound("No city/Town found");
        }
      });
  };
  const handleNameChange = (e) => {
    const input = e.target;
    const text = input.value;
    input.value = text.replace(/[^A-Za-z]/g, "");
  };
  const wrongEmail =
    "Your email could not be found, please register with the correct email.";
  const [wrongEMailfound, setWrongEMailfound] = React.useState();

  const resetForm =  () => {
    setForgot(false);
    setError("");
    setCheckError("");
    setVerifyModal(false);
    setEmail(""); // Reset the email state if needed
    setPhoneValue("");
    setPassword("");
    setConfirmPass("");
    setFirstName("");
    setLastName("");
  }

  const handleSignUp = (e) => {
    e.preventDefault();

    let equalPass;
    const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (registrationOption === "email") {
      if (
        e.target.firstName.value &&
        e.target.lastName.value &&
        e.target.email.value &&
        equalPass !== ""
      ) {
        setRequired("");
        if (e.target.email.value.match(pattern)) {
          setEmailError("");
          setEmailErr("");
          if (e.target.checkmark.checked === true) {
            setCheckError("");
            if (
              e.target.password.value.length > 4 &&
              e.target.confirm_password.value.length > 4
            ) {
              setPassError(``);
              if (e.target.password.value === e.target.confirm_password.value) {
                setError("");
                setEmailError("");
                equalPass = e.target.password.value;
                const formData = {
                  firstName: e.target.firstName.value,
                  lastName: e.target.lastName.value,
                  email: e.target.email.value,
                  password: equalPass,
                };

                userRegister(formData)
                  .then((res) => {
                    e.target.reset();
                    setShow(false);
                    const data = {
                      to: res?.data?.data?.email,
                      subject: "Email verification - TEPS",
                      html: `
                      <p>Hello and welcome to Things Education’s Pedagogical Strategies</p>
                      <p>Please click this link to verify your email address before you get started. Once verified, you will be able to log in to the site.</p>
                      <p>https://teps.school/verify?sdfbkjfewihuf=${res?.data?.data?._id}&pfgvsckvnlksfwe=${res.data.jwt}</p><br/>
                      <p>Regards,</p>
                      <p>Things Education</p>
                      `,
                    };
                    axios
                      .post("email", data)
                      .then((res) => {
                        if (res) {
                          setVerifyModal(true);
                          setWrongEMailfound("");
                        }
                      })
                      .catch((err) => setWrongEMailfound(wrongEmail));
                  })
                  .catch((err) => {
                    if (err.response.status === 409) {
                      setEmailError(`${t("already_email")}`);
                      setDisplay("d-block");
                    } else console.log(err);
                  });
              } else {
                setError(`${t("password_match")}`);
              }
            } else {
              setPassError(`${t("password_five")}`);
              setError(``);
            }
          } else {
            setCheckError(`${t("checkbox_error")}`);
            setPassError("");
            setError(``);
            setRequired(``);
          }
        } else {
          setEmailErr(t("Email_Error"));
          setCheckError(``);
          setPassError("");
          setError(``);
          setRequired(``);
        }
      } else {
        setRequired(`${t("fill_all_box")}`);
        setPassError("");
        setError(``);
        setEmailError(t("Email_Error"));
      }
    } else if (registrationOption === "phone") {
      // Phone number registration option is selected
      if (e.target.firstName.value && e.target.lastName.value && phoneValue) {
        setRequired("");
        if (e.target.phone.value) {
          if (e.target.checkmark.checked === true) {
            setCheckError("");
            setPassError(``);
            setError("");
            setEmailError("");
            const formData = {
              firstName: e.target.firstName.value,
              lastName: e.target.lastName.value,
              phoneNumber: phoneValue,
              password: phoneValue,
            };
            userRegister(formData)
              .then((res) => {
                e.target.reset();
                setShow(false);
                let data = {
                  phoneNumber: phoneValue,
                };
                sendOTP(data)
                  .then((res) => {
                setLoginModal(true);
                setPhoneValue("");
                resetForm();
                  })
                  .catch((err) => {
                    console.log({ err });
                    toast.error("Some Error Occured");
                  });
                setPhoneForOTP(phoneValue);
                setshowOTPInputs(true);
                setisOTPLoginOpen(true);
              })
              .catch((err) => {
                if (err.response.status === 409) {
                  setPhoneError(`${t("already_phone")}`);
                  setDisplay("d-block");
                } else console.log(err);
              });

          } else {
            setCheckError(`${t("checkbox_error")}`);
            setPassError("");
            setError(``);
            setRequired(``);
          }
        } else {
          setEmailErr(t("Email_Error"));
          setCheckError(``);
          setPassError("");
          setError(``);
          setRequired(``);
        }
      } else {
        setRequired(`${t("fill_all_box")}`);
        setPassError("");
        setError(``);
      }
    }
  };

  const handleForgotShow = () => {
    setForgot(true);
    setShow(false);
  };
  const handleEmailError = (e) => {
    if (e.target.value) {
      setEmailError("");
      setPassError(``);
    }
  };
  const handlePhoneInput = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (inputValue.length <= 10) {
      setPhoneValue(inputValue); // Update the state with the cleaned input value
      setPhoneError(""); // Clear any previous error
    } else {
      setPhoneError("must be 10 digits long");
    }
  };
  return (
    <>
      <ForgotModal show={forgot} setShow={setForgot} />
      <VerifyModal
        show={verifyModal}
        setShow={setVerifyModal}
        wrong={wrongEMailfound}
      />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="modal_full d-none d-md-block"
      >
        <Modal.Body className="modal_body">
          <div>
            <span
              className="d-none d-md-block d-xxl-none closeModalIcon"
              onClick={handleClose}
            >
              <img width="15px" src={CrossIcon} alt="" />
            </span>
            <span
              className="d-md-none d-xxl-block closeModalIcon"
              onClick={handleClose}
            >
              <img width="15px" src={CrossIcon} alt="" />
            </span>
            <p className="text-center sign_up ">{t("Register")} now!</p>
          </div>
          <div className="mx-4 mt-4">
            <form className="ms-md-3 ms-xxl-5" onSubmit={handleSignUp}>
              <div className="d-flex ">
                <div className="me-5">
                  <label htmlFor="">
                    {t("First Name")}
                    <span className="text-danger position-absolute">*</span>
                  </label>{" "}
                  <br />
                  <input
                    className="signup_Input"
                    name="firstName"
                    placeholder="Lily"
                    type="text"
                    pattern="[A-Za-z]+"
                    onInput={handleNameChange}
                    onBlur={checkFormValidity}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="">
                    {t("Last Name")}
                    <span className="text-danger position-absolute">*</span>
                  </label>{" "}
                  <br />
                  <input
                    className="signup_Input"
                    name="lastName"
                    placeholder="Blom"
                    type="text"
                    onInput={handleNameChange}
                    onBlur={checkFormValidity}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="d-flex my-3 flex-column">
                <h1 className="selectOne">
                  Select One
                  <span className="text-danger position-absolute">*</span>
                </h1>
                {/* Email input */}
                <div className="d-flex">
                  <div className=" me-5">
                    <label>
                      <input
                        type="radio"
                        value="email"
                        checked={registrationOption === "email"}
                        onChange={() => handleRegistrationOptionChange("email")}
                        className="me-2"
                      />
                      {t("Email")} ID
                    </label>
                    <label
                      className={
                        emailError ? "text-danger res-label" : "res-label"
                      }
                      htmlFor=""
                    >
                      <span className="text-danger mt-5 smallTextSize">
                        &nbsp; {emailError ? emailError : ""}
                      </span>
                    </label>{" "}
                    <br />
                    <input
                      ref={emailInputRef}
                      className={
                        emailError
                          ? "signup_Input border-danger text-danger"
                          : registrationOption === "phone"
                          ? "signup_Input email"
                          : "signup_Input email"
                      }
                      name="email"
                      placeholder="Lilyblom201@gmail.com"
                      type="email"
                      disabled={registrationOption == "phone"}
                      onBlur={checkFormValidity}
                      onChange={(e) => {
                        handleEmailError(e);
                        setEmail(e.target.value);
                      }}
                    />
                    <a
                      href="#"
                      className={
                        emailError ? "d-block smallTextSize" : "d-none"
                      }
                      onClick={handleForgotShow}
                    >
                      <p className="text-start forgot_passs mt-1">
                        {t("retrieve_password")}
                      </p>
                    </a>
                  </div>
                  <div className="">
                    <label>
                      <input
                        type="radio"
                        value="phone"
                        name="phone"
                        checked={registrationOption === "phone"}
                        onChange={() => handleRegistrationOptionChange("phone")}
                        className="me-2"
                      />
                      {t("Phone Number")}
                    </label>
                    <label
                      className={
                        phoneError ? "text-danger res-label" : "res-label"
                      }
                      htmlFor=""
                    >
                      <span className="text-danger mt-5 smallTextSize">
                        &nbsp; {phoneError ? phoneError : ""}
                      </span>
                    </label>{" "}
                    <br />
                    <input
                      onChange={(e) => {
                        handlePhoneInput(e);
                        setPhoneNumber(e.target.value);
                      }}
                      onBlur={(e) => {
                        handlePhoneBlur();
                        checkFormValidity(); // Assuming this function checks the form's overall validity
                      }}
                      className={
                        phoneError
                          ? "signup_Input border-danger text-danger"
                          : registrationOption === "email"
                          ? "signup_Input phoneNumber "
                          : "signup_Input phoneNumber"
                      }
                      name="phone_number"
                      placeholder={t("Phone Number")}
                      value={phoneValue}
                      type="tel"
                      pattern="[0-9]{10}"
                      maxLength="10"
                      disabled={registrationOption == "email"}
                    />
                  <h4 className="phoneInputNote">Users from outside India may join using email address only</h4>
                  </div>
                </div>
              </div>
              {registrationOption === "email" && (
                <div className="d-flex my-3">
                  <div className="me-5">
                    <label htmlFor="">{t("Password")}</label>
                    <span className="text-danger position-absolute">*</span>
                    <br />
                    <input
                      className="signup_Input"
                      min="0"
                      name="password"
                      placeholder={t("Password")}
                      type="password"
                      step="1"
                      onBlur={checkFormValidity}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="">{t("Confirm Password")}</label>
                    <span className="text-danger position-absolute">*</span>
                    <br />
                    <input
                      className="signup_Input"
                      name="confirm_password"
                      placeholder={t("Confirm Password")}
                      type="password"
                      onBlur={checkFormValidity}
                      onChange={(e) => setConfirmPass(e.target.value)}
                    />
                  </div>
                </div>
              )}
              <div className="d-flex">
                <div className=" d-none d-md-block">
                  <label className="containerr">
                    <input name="checkmark" type="checkbox" />
                    <span className="checkmark"></span>
                  </label>
                </div>
                <p className="roboText">
                  {t("I am not a robot.")}
                  <span className="text-danger position-absolute">*</span>
                </p>
              </div>
              {required ? (
                <p className="text-danger text-center me-5 pe-4 mb-4">
                  {required}
                </p>
              ) : (
                ""
              )}
              {error ? (
                <p className="text-danger text-center me-5 pe-4">{error}</p>
              ) : (
                ""
              )}
              <div className="text-danger me-5 pe-4 text-center smallTextSize">
                {emailErr ? emailErr : ""}
              </div>
              <p className="text-danger ">{checkError ? checkError : ""}</p>
              <p className="text-danger text-center me-5 pe-4">
                {passError ? passError : ""}
              </p>
              <div className="d-flex justify-content-center me-5 pe-4">
                <button
                  className="primaryButton subBtn"
                  disabled={!isFormValid}
                >
                  {t("Submit")}
                </button>
              </div>
              <div className="d-flex justify-content-center me-5 pe-4 mt-3">
                <button
                  className="secondaryButton subBtn"
                  onClick={handleClose}
                >
                  {t("Remind me Later")}
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="d-block d-md-none mt-5 pt-2 px-2"
      >
        <Modal.Body className="res_modal ">
          <div>
            <div>
              <span
                onClick={handleClose}
                className="d-flex justify-content-end cursor-pointer"
              >
                <img width="15px" src={CrossIcon} alt="" />
              </span>
              <p className="text-center sign_up">{t("Register")}</p>
            </div>
            <div className="mx-4 d-flex justify-content-center">
              <form onSubmit={handleSignUp}>
                <div>
                  <label className="res-label " htmlFor="">
                    {t("First Name")}
                    <span className="text-danger position-absolute">*</span>
                  </label>{" "}
                  <br />
                  <input
                    className="signup_Input"
                    name="firstName"
                    placeholder="Lily"
                    type="text"
                    onInput={handleNameChange}
                    onBlur={checkFormValidity}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <label className="res-label " htmlFor="">
                    {t("Last Name")}
                    <span className="text-danger position-absolute">*</span>
                  </label>{" "}
                  <br />
                  <input
                    className="signup_Input"
                    name="lastName"
                    placeholder="Blom"
                    type="text"
                    onInput={handleNameChange}
                    onBlur={checkFormValidity}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                {/* ------------------- */}
                <div className="input-type-selector">
                  <label>
                    <input
                      type="radio"
                      name="inputType"
                      value="email"
                      checked={!isPhoneInputType}
                      onClick={() => handleRegistrationOptionChange("email")}
                      onChange={() => setisPhoneInputType(false)}
                      className="me-2"
                    />
                    {t("Email")}
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="phone"
                      value="phone"
                      checked={isPhoneInputType}
                      onClick={() => handleRegistrationOptionChange("phone")}
                      onChange={() => setisPhoneInputType(true)}
                      className="me-2"
                    />
                    {t("Phone Number")}
                  </label>
                </div>

                {/* ------------------- */}

                {registrationOption == "email" && (
                  <div className="mt-3">
                    <label
                      className={
                        emailError || emailErr
                          ? "text-danger res-label"
                          : "res-label"
                      }
                      htmlFor=""
                    >
                      {t("Email")}
                      <span className="text-danger mt-5 smallTextSize">
                        * {emailError ? emailError : ""}
                      </span>
                    </label>{" "}
                    <br />
                    <input
                      ref={emailInputRef}
                      onChange={(e) => {
                        handleEmailError(e);
                        setEmail(e.target.value);
                      }}
                      className={
                        emailError
                          ? "signup_Input border-danger text-danger"
                          : registrationOption === "phone"
                          ? "signup_Input hide"
                          : "signup_Input"
                      }
                      name="email"
                      placeholder="Lilyblom201@gmail.com"
                      type="text"
                      onBlur={checkFormValidity}
                    />
                    <a
                      href="#"
                      className={
                        emailError ? "d-block smallTextSize" : "d-none"
                      }
                      onClick={handleForgotShow}
                    >
                      <p className="text-start forgot_passs mt-1">
                        {t("retrieve_password")}
                      </p>
                    </a>
                  </div>
                )}

                {registrationOption == "phone" && (
                  <div className="mt-3">
                    <label
                      className={
                        phoneError ? "text-danger res-label" : "res-label"
                      }
                      htmlFor=""
                    >
                      {t("Phone Number")}
                      <span className="text-danger mt-5 smallTextSize">
                        * {phoneError ? phoneError : ""}
                      </span>
                    </label>{" "}
                    <br />
                    <input
                      onChange={(e) => {
                        handlePhoneInput(e);
                        setPhoneNumber(e.target.value);
                      }}
                      onBlur={(e) => {
                        handlePhoneBlur();
                        checkFormValidity(); // Assuming this function checks the form's overall validity
                      }}
                      className={
                        phoneError
                          ? "signup_Input border-danger text-danger"
                          : registrationOption === "email"
                          ? "signup_Input hide"
                          : "signup_Input"
                      }
                      name="phone_number"
                      placeholder={t("Phone Number")}
                      value={phoneValue}
                      type="tel"
                      pattern="[0-9]{10}"
                      maxLength="10"
                      disabled={registrationOption == "email"}
                    />
                  <h4 className="phoneInputNote">Users from outside India may join using email address only</h4>
                  </div>
                )}

                {registrationOption === "email" && (
                  <div className="mt-3">
                    <label className="res-label " htmlFor="">
                      {t("Password")}
                    </label>{" "}
                    <span className="text-danger position-absolute">*</span>
                    <br />
                    <input
                      className="signup_Input"
                      name="password"
                      placeholder={t("Password")}
                      type="password"
                      onBlur={checkFormValidity}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                )}
                {registrationOption === "email" && (
                  <div className="mt-3">
                    <label className="res-label " htmlFor="">
                      {t("Confirm Password")}
                    </label>{" "}
                    <span className="text-danger position-absolute">*</span>
                    <br />
                    <input
                      className="signup_Input"
                      name="confirm_password"
                      placeholder={t("Confirm Password")}
                      type="password"
                      onBlur={checkFormValidity}
                      onChange={(e) => setConfirmPass(e.target.value)}
                    />
                  </div>
                )}
                <div className="d-flex my-3">
                  <div className="mt-md-1 d-block d-md-none">
                    <label className="containerr">
                      <input name="checkmark" type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <p className="roboText">
                    {t("I am not a robot.")}
                    <span className="text-danger position-absolute">*</span>
                  </p>
                </div>
                {required ? (
                  <p className="text-danger text-center">{required}</p>
                ) : (
                  ""
                )}
                {error ? (
                  <p className="text-danger text-center">{error}</p>
                ) : (
                  ""
                )}
                <div
                  className="text-danger"
                  style={{ textAlign: "center", fontSize: "15px" }}
                >
                  {emailErr ? emailErr : ""}
                </div>
                <p className="text-danger ">{checkError ? checkError : ""}</p>
                <p className="text-danger text-center smallTextSize">
                  {passError ? passError : ""}
                </p>
                <div className="d-flex justify-content-center">
                  <button
                    className="primaryButton subBtn"
                    disabled={!isFormValid}
                  >
                    {t("Submit")}
                  </button>
                </div>
                <div className="d-flex justify-content-center mt-2">
                  <button
                    className="secondaryButton subBtn"
                    onClick={handleClose}
                  >
                    {t("Remind me Later")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUpModal;
