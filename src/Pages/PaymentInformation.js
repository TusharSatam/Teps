import React, { useState } from "react";
import PageHeading from "../Components/PageHeading/PageHeading";
import styles from "../Pages/styles/PaymentInfo.module.css";
import CreditCard from "../Components/PaymentInfomations/CreditCard/CreditCard";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";
import PaymentStatus from "../Components/Modal/PaymentStatusModal/PaymentStatus";
import TEPS_LOGO from "../asstes/TEPSlogo.png"
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {useNavigate } from "react-router-dom";

const PaymentInformation = () => {
  const [selectedOption, setSelectedOption] = useState("option3"); // State to keep track of the selected radio option.
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [showStatusModal, setshowStatusModal] = useState(false);
  const [isPending, setisPending] = useState(false);
  const { user,selectedPaymentCard } = useAuth();
  const navigate=useNavigate()
  useEffect(() => {
    console.log(selectedPaymentCard);
    if (selectedPaymentCard.amount) {
      setSelectedOption(options[selectedPaymentCard?.index]?.id);
    }
  }, []);

  const paymentMethods = ["Google Pay", "Paypal", "Credit or Debit Card"];
  const options = [
    { id: "option1", label: "One month", price: 549, month: 1,Days:30 },
    { id: "option2", label: "Three months", price: 1099, month: 3,Days:90 },
    { id: "option3", label: "Six months", price: 1699, month: 6,Days:180 },
    { id: "option4", label: "Twelve months", price: 3099, month: 12,Days:365 },
  ];

  const selectedOptionData = options.find(
    (option) => option.id === selectedOption
  );
  const subTotal = selectedOptionData ? 549 * selectedOptionData?.month : 0;
  const PlanDiscount = selectedOptionData
    ? subTotal - selectedOptionData?.price
    : 0; // You can replace this with the actual discount value.
  const total = selectedOptionData ? subTotal - PlanDiscount : 0;

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAgreeTermsChange = (event) => {
    setAgreeTerms(event.target.checked);
  };

  const handleClose = () => {
    setshowStatusModal(false);
  };

//Todo: change url while deployment

	const initPayment = (data) => {
		const options = {
			key: "rzp_test_Ke1ZQFLmXLygwx",
			amount: data.amount,
			currency: data.currency,
			name: "TEPS",
			description: selectedOptionData.label,
			image: TEPS_LOGO,
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "http://43.205.39.232/api/payment/verify";
					const { data } = await axios.post(verifyUrl, {...response,User_id:user._id,duration:selectedOptionData.Days});
          // setisPending(true);
          // setshowStatusModal(true);
					console.log(data);
          if(data.message==="Payment verified successfully"){
            navigate('/profile')
          }
				} catch (error) {
					console.log(error);
          toast.error(`Payment failed`, {
            duration: 6000,
          });
				}
			},
			theme: {
				color: "#1aa05b",
			},
		};
		const rzp1 = new window.Razorpay(options);
		rzp1.open();
	};

	const handlePayment = async () => {
		try {
			const orderUrl = "http://43.205.39.232/api/payment/order";
			const { data } = await axios.post(orderUrl, { amount: selectedOptionData.price });
			console.log(data);
			initPayment(data.data);
		} catch (error) {
			console.log(error);
		}
	};


  return (
    <div className={styles.paymentInfos}>
      <PageHeading title="Payment Information" />
      <Toaster position="top-right" reverseOrder={false} />
      <PaymentStatus
        show={showStatusModal}
        handleClose={handleClose}
        setShow={setshowStatusModal}
        setisPending={setisPending}
        isPending={isPending}
      />
      {/* Subscribe to TEPS options */}
      <div className={styles.paymentOptions}>
        <h3>Subscribe to TEPS</h3>
        <div className={styles.SubscribeDetails}>
          {options.map((option) => (
            <label key={option.id}>
              <input
                type="radio"
                value={option.id}
                checked={selectedOption === option.id}
                onChange={handleOptionChange}
              />
              <div>
                {option.label}
                <span>{option.price.toLocaleString()}₹</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      <hr className={styles.line}></hr>

      {/* Bill details */}
      <div className={styles.subscriptionBill}>
        <div className={styles.subTotal}>
          Sub total
          <span>
            {subTotal}₹ <small>Including GST*</small>
          </span>
        </div>
        <div className={styles.planDiscount}>
          {selectedOption == "option4" ? "Yearly" : "Monthly"} plan discount
          <span>
            -{PlanDiscount}₹ <small>Including GST*</small>
          </span>
        </div>
        <hr className={styles.line}></hr>
        <div className={styles.total}>
          Total
          <span>
            {total}₹ <small>Including GST*</small>
          </span>
        </div>
        <small className={styles.yearlyDiscont}>*{selectedOption == "option4" ? "Yearly" : "Monthly"} plan discount</small>
        <div className={styles.agreeTerms}>
          <label>
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={handleAgreeTermsChange}
            />
            <p>
              I agree to <a>Terms & Conditions</a> and the <a>Privacy Policy</a>
              <span>*</span>
            </p>
          </label>
        </div>
      </div>
      <div className={styles.payButtons}>
        <button
          className="primaryButton"
          // onClick={() => {
          //   setisPending(true);
          //   setshowStatusModal(true);
          // }}
          onClick={handlePayment}
          disabled={!agreeTerms}
        >
          Pay
        </button>
        <button className="secondaryButton">Cancel</button>
      </div>
    </div>
  );
};

export default PaymentInformation;
