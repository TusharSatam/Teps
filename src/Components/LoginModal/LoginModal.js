import React, { useState, useRef, useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { sendOTP, userLogin, verifyOTP } from "../../services/auth";
import { useAuth } from "../../Context/AuthContext";
import ForgotModal from "../ForgotPassModal/ForgotModal";
import "./loginModal.css";
import VerifyModal from "../ForgotPassModal/VerifyModal";
import emailjs from "@emailjs/browser";
import axios from "axios";

const LoginModal = ({ show, setShow, isnavigateUploadPage }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth();
  const [forgot, setForgot] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isResendOTP, setIsResendOTP] = React.useState(false);
  const [error, setError] = React.useState("");
  const [checkError, setCheckError] = React.useState("");
  const [verifyModal, setVerifyModal] = React.useState(false);
  const [isOTPLoginOpen, setisOTPLoginOpen] = useState(false);
  const [email, setemail] = useState("");
  const [phoneValue, setPhoneValue] = React.useState("");
  const [inputotp, setInputotp] = useState(["", "", "", "", ""]);
  const [OTP, setOTP] = useState(0);
  const [showOTPInputs, setshowOTPInputs] = useState(false);
  const inputRefs = useRef([]);

  const handleGetOTP = (e) => {
    if (phoneValue.length < 10) {
      // Show an error message for invalid phone number
      setCheckError(t("Phone number must be 10 digits"));
    } else {
      let data = {
        phoneNumber: phoneValue,
      };
      // Phone number is valid, proceed to OTP input
      sendOTP(data).then((res) => {
        setOTP(res);
      });
      setCheckError(""); // Clear any previous error messages
      setshowOTPInputs(true);
    }
  };
  const resendOTP = () => {
    setIsResendOTP(true);
    setCheckError("");
    let data = {
      phoneNumber: phoneValue,
    };
    sendOTP(data).then((res) => {
      setIsResendOTP(false);
    });
    setshowOTPInputs(true);
  };
  const handlePhoneInput = (e) => {
    setError("");
    const inputValue = e.target.value.replace(/\D/g, ""); // Remove non-digit characters
    if (inputValue.length <= 10) {
      setPhoneValue(inputValue); // Update the state with the cleaned input value
    } else {
    }
  };

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1); // Limit input to a single character
    }

    const newOTP = [...inputotp];
    newOTP[index] = value;
    setInputotp(newOTP);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleInputKeyDown = (event, index) => {
    if (event.key === "Backspace" && !inputotp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleLoginForm = () => {
    setisOTPLoginOpen(!isOTPLoginOpen);
    setIsLoading(false);
    setCheckError("");
    setError("");
  };

  const handleClose = () => {
    setShow(false);
    setCheckError("");
    setError("");
  };
  const resetModalState = () => {
    setForgot(false);
    setIsLoading(false);
    setError("");
    setCheckError("");
    setVerifyModal(false);
    setisOTPLoginOpen(false);
    setemail(""); // Reset the email state if needed
    setPhoneValue("");
    setInputotp(["", "", "", "", ""]);
    setOTP(99999); // Reset the OTP state if needed
    setshowOTPInputs(false);
  };
  const handleSIgnIn = (e) => {
    e.preventDefault();
    if (!isOTPLoginOpen) {
      setIsLoading(true);
      setCheckError("");
      const data = {
        email: email,
        password: e.target.password.value,
      };
      userLogin(data)
        .then((res) => {
          if (res) {
            if (res?.data?.varified) {
              setIsLoading(false);
              setShow(false);
              setUser(res.data);
              setIsAuthenticated(true);
              window.localStorage.setItem("jwt", JSON.stringify(res.jwt));
              window.localStorage.setItem("data", JSON.stringify(res.data));
              let localstorageData;
              if (
                localStorage.getItem("i18nextLng") === "en-US" ||
                localStorage.getItem("i18nextLng") === "en"
              ) {
                localstorageData = localStorage.getItem("selectedDropdown");
              } else {
                localstorageData = localStorage.getItem("selectedHiDropdown");
              }
              if (isnavigateUploadPage == true) {
                navigate("/addform");
              } else if (localstorageData === null) {
                navigate("/home");
              } else if (localstorageData != null) {
                navigate("/search");
              }
              resetModalState();
            } else {
              const data = {
                to: res?.data?.email,
                subject: "Email verification - TEPS",
                html: `
                  <p>Hello and welcome to Things Education’s Pedagogical Strategies</p>
                  <p>Please click this link to verify your email address before you get started. Once verified, you will be able to log in to the site.</p>
                  <p>https://teps.school/verify?sdfbkjfewihuf=${res?.data?._id}&pfgvsckvnlksfwe=${res?.jwt}</p><br/>
                  <p>Regards,</p>
                  <p>Things Education</p>
                  `,
              };
              axios
                .post("email", data)
                .then((res) => {
                  if (res) {
                    setIsLoading(false);
                    setShow(false);
                    setVerifyModal(true);
                  }
                })
                .catch((err) => console.log(err));
            }
          }
        })
        .catch((err) => {
          setError(err.response.data.message);
          setIsLoading(false);
        });
    } else if (isOTPLoginOpen) {
      setIsLoading(true);
      let givenOTP = parseInt(inputotp.join(""), 10);
      let data = {
        phoneNumber: phoneValue,
        OTP: givenOTP,
      };
      verifyOTP(data)
        .then((res) => {
          setCheckError("");
          if (res.message === "logged in successfully") {
            setIsLoading(false);
            setShow(false);
            setshowOTPInputs(false);
            setPhoneValue("");
            setInputotp(["", "", "", "", ""]);
            setUser(res.data);
            setIsAuthenticated(true);
            window.localStorage.setItem("jwt", JSON.stringify(res.jwt));
            window.localStorage.setItem("data", JSON.stringify(res.data));
            if (
              localStorage.getItem("i18nextLng") === "en-US" ||
              localStorage.getItem("i18nextLng") === "en"
            ) {
              localstorageData = localStorage.getItem("selectedDropdown");
            } else {
              localstorageData = localStorage.getItem("selectedHiDropdown");
            }
            if (isnavigateUploadPage == true) {
              navigate("/addform");
            } else if (localstorageData === null) {
              navigate("/home");
            } else if (localstorageData != null) {
              navigate("/search");
            }
            resetModalState();
          } else if (res.message === "OTP not verified") {
            setCheckError("Invalid OTP");
            setInputotp(["", "", "", "", ""]);
            setIsLoading(false);
          } else if (
            res.message === "New user" ||
            res.message === "No user found"
          ) {
            setError("No user found");
            setIsLoading(false);
          }
        })
        .catch((e) => {
          setCheckError(e?.response.data.message);
          setIsLoading(false);
        });
    }
  };
  const handleForgotShow = () => {
    setForgot(true);
    setShow(false);
  };
  return (
    <>
      <ForgotModal show={forgot} setShow={setForgot} />
      <VerifyModal show={verifyModal} setShow={setVerifyModal} />
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="mt-5 mt-md-0 px-2 px-md-0"
      >
        <Modal.Body className="signIn_body">
          <div>
            <div>
              <p
                onClick={handleClose}
                className=" me-1 fs-5 text-end signinCloseIcon"
              >
                &#10006;
              </p>
              <p className="text-center log_in mt-3">{t("Login now")}</p>
            </div>
            <form onSubmit={handleSIgnIn}>
              <div className="d-flex justify-content-center">
                <div>
                  {!isOTPLoginOpen ? (
                    <>
                      <div className="my-3">
                        <label
                          htmlFor="emailInput"
                          className={
                            error === "Invalid Email"
                              ? "d-flex text-danger"
                              : "d-flex"
                          }
                        >
                          {t("Email")} <span className="text-danger">*</span>
                          <span
                            className={
                              error === "Invalid Email" ||
                              error === "Invalid Credential"
                                ? "d-block text-danger"
                                : "d-none"
                            }
                          >
                            &nbsp;{t("email_not_found")}
                          </span>
                        </label>
                        <br />
                        <input
                          id="emailInput"
                          placeholder="LilyBlom201@gmail.com"
                          name="email"
                          className={
                            error === "Invalid Email" ||
                            error === "Invalid Credential"
                              ? "login_input text-danger border border-danger"
                              : "login_input"
                          }
                          type="email"
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                        />
                      </div>

                      <div className="my-4">
                        <label
                          htmlFor="authPass"
                          className={
                            error === "Invalid Password"
                              ? "d-flex text-danger"
                              : "d-flex"
                          }
                        >
                          {t("Password")} <span className="text-danger">*</span>
                          <span
                            className={
                              error === "Invalid Password"
                                ? "d-block"
                                : "d-none"
                            }
                          >
                            &nbsp;{t("password_error")}
                          </span>
                        </label>
                        <br />
                        <input
                          id="authPass"
                          placeholder="password"
                          className={
                            error === "Invalid Password"
                              ? "login_input text-danger border border-danger"
                              : "login_input"
                          }
                          type="password"
                          name="password"
                        />
                        <br />
                        <a href="#" onClick={handleForgotShow}>
                          <p className="text-start forgot_pass mt-1">
                            {t("Forgot Password?")}
                          </p>
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="my-3">
                        <label
                          htmlFor="phoneInput"
                          className={
                            error === "No user found"
                              ? "d-flex text-danger"
                              : "d-flex"
                          }
                        >
                          {t("Phone Number")}
                          <span className="text-danger">*</span>
                          <span
                            className={
                              error === "No user found" ? "d-block" : "d-none"
                            }
                          >
                            &nbsp;No user found
                          </span>
                        </label>
                        <br />
                        <input
                          id="phoneInput"
                          value={phoneValue}
                          placeholder="Phone Number"
                          name="phone"
                          className={
                            error === "No user found"
                              ? "login_input text-danger border border-danger"
                              : "login_input"
                          }
                          type="tel"
                          pattern="[0-9]{10}"
                          onChange={handlePhoneInput}
                        />
                      </div>
                      {showOTPInputs && (
                        <div style={{position:"relative"}} id="pin-input" className="pinInput">
                          {inputotp.map((digit, index) => (<span key={index}>
                            <input
                            // style={{background:"red"}}
                              // key={index}
                              type="tel"
                              maxLength={1}
                              value={digit}
                              style={{color:"transparent"}}
                              onInput={(e) => {
                                // Use a regular expression to remove non-numeric characters
                                e.target.value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ""
                                );
                              }}
                              onChange={(e) =>
                                handleInputChange(index, e.target.value)
                              }
                              onKeyDown={(e) => handleInputKeyDown(e, index)}
                              ref={(inputRef) =>
                                (inputRefs.current[index] = inputRef)
                              }
                              className="OTPinput"
                              pattern="\d*"
                            />
                            <p style={{position:"absolute",color:"#1aa05b", left:`calc(${index+1} * 20)px`, top:'28px'}}>{digit}</p>
                          </span>))}
                          <button
                            type="button"
                            className="resendOTP"
                            onClick={resendOTP}
                          >
                            {isResendOTP ? (
                              <Spinner
                                className="text-light"
                                animation="border"
                              />
                            ) : (
                              t("Resend OTP")
                            )}
                          </button>
                        </div>
                      )}
                    </>
                  )}
                  <p
                    className={`text-danger ${checkError ? "text-center" : ""}`}
                  >
                    {checkError ? t(checkError) : ""}
                  </p>
                  {!isOTPLoginOpen ? (
                    <>
                      <div className="d-flex justify-content-center my-3">
                        <button
                          disabled={isLoading}
                          className="primaryButton subBtn"
                        >
                          {isLoading ? (
                            <Spinner
                              className="text-light "
                              animation="border"
                            />
                          ) : (
                            t("Login")
                          )}
                        </button>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </form>
            {isOTPLoginOpen ? (
              <>
                {!showOTPInputs && (
                  <div
                    className="d-flex justify-content-center my-3"
                    onClick={handleGetOTP}
                  >
                    <button className="primaryButton subBtn">
                      {t("Get OTP")}
                    </button>
                  </div>
                )}
                {showOTPInputs && (
                  <div className="d-flex justify-content-center mb-3">
                    <button
                      disabled={
                        isLoading || inputotp.some((digit) => digit === "")
                      }
                      className="primaryButton subBtn"
                      onClick={handleSIgnIn}
                    >
                      {isLoading ? (
                        <Spinner className="text-light" animation="border" />
                      ) : (
                        t("Submit")
                      )}
                    </button>
                  </div>
                )}
                <div className="d-flex justify-content-center mb-3">
                  <button
                    disabled={isLoading}
                    className="secondaryButton subBtn"
                    onClick={handleLoginForm}
                  >
                    {t("Sign In with Email")}
                  </button>
                </div>
              </>
            ) : (
              <div className="d-flex justify-content-center mb-3">
                <button
                  disabled={isLoading}
                  className="secondaryButton subBtn"
                  onClick={handleLoginForm}
                >
                  {t("Sign In with OTP")}
                </button>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginModal;
