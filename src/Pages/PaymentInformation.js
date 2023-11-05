import React, { useState } from "react";
import PageHeading from "../Components/PageHeading/PageHeading";
import styles from "../Pages/styles/PaymentInfo.module.css";
import CreditCard from "../Components/PaymentInfomations/CreditCard/CreditCard";
import { useAuth } from "../Context/AuthContext";
import { useEffect } from "react";
import PaymentStatus from "../Components/Modal/PaymentStatusModal/PaymentStatus";

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
  const { selectedPaymentCard } = useAuth();
  useEffect(() => {
    console.log(selectedPaymentCard);
    if (selectedPaymentCard.amount) {
      setSelectedOption(options[selectedPaymentCard?.index]?.id);
    }
  }, []);

  const paymentMethods = ["Google Pay", "Paypal", "Credit or Debit Card"];
  const options = [
    { id: "option1", label: "One month", price: 549, month: 1 },
    { id: "option2", label: "Three months", price: 1099, month: 3 },
    { id: "option3", label: "Six months", price: 1699, month: 6 },
    { id: "option4", label: "Twelve months", price: 3099, month: 12 },
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
  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };
  const handleClose = () => {
    setshowStatusModal(false);
  };
  return (
    <div className={styles.paymentInfos}>
      <PageHeading title="Payment Information" />
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
      {/* Select a payment method */}
      <div className={styles.paymentSections}>
        <h3>Select a payment method</h3>
        {paymentMethods.map((method) => (
          <label key={method}>
            <input
              type="radio"
              value={method}
              checked={selectedPaymentMethod === method}
              onChange={() => handlePaymentMethodChange(method)}
            />
            {method}
          </label>
        ))}
        {/* Credit Card Input */}
        {selectedPaymentMethod === "Credit or Debit Card" && (
          <CreditCard
            setCardHolderName={setCardHolderName}
            setCardNumber={setCardNumber}
            setExpiryDate={setExpiryDate}
            setCVV={setCVV}
            cvv={cvv}
            cardHolderName={cardHolderName}
            cardNumber={cardNumber}
            expiryDate={expiryDate}
          />
        )}
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
        <small className={styles.yearlyDiscont}>*Yearly plan discount</small>
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
          onClick={() => {
            setisPending(true);
            setshowStatusModal(true);
          }}
        >
          Pay
        </button>
        <button className="secondaryButton">Cancel</button>
      </div>
    </div>
  );
};

export default PaymentInformation;
