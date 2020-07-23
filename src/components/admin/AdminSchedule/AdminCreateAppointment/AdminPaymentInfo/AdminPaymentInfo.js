import React, { useState } from "react";
import {
  SquarePaymentForm,
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton,
} from "react-square-payment-form";
import "./AdminPaymentInfo.css";

const AdminPaymentInfo = () => {
  const [errorMessages, changeErrorMessage] = useState([]);

  const cardNonceResponseReceived = (
    errors,
    nonce,
    cardData,
    buyerVerificationToken
  ) => {
    if (errors[0] !== null) {
      return changeErrorMessage(
        errors.map((error) => (error ? error.message : null))
      );
    }
  };

  return (
    <div className="admin_square_payment_form_container">
      <SquarePaymentForm
        sandbox={true}
        applicationId={process.env.REACT_APP_SQUARE_SANDBOX_APPLICATION_ID}
        locationId={process.env.REACT_APP_SQUARE_SANDBOX_LOCATION_ID}
        cardNonceResponseReceived={cardNonceResponseReceived}
        createVerificationDetails={() => console.log("OK")}
        // paymentFormLoaded={() => changeSquareFormLoading(false)}

        inputStyles={[
          {
            fontSize: "24px",
            padding: "14px",
            placeholderColor: "#a0a0a0",
            backgroundColor: "transparent",
          },
          {
            mediaMaxWidth: "1800px",
            mediaMinWidth: "1600px",
            fontSize: "16px",
          },
          {
            mediaMinWidth: "1801px",
            fontSize: "24px",
          },
        ]}
      >
        <div className="admin_create_appointment_cardholder_container">
          <span className="sq-label">Cardholder First Name</span>
          <input className="sq-input"></input>
        </div>
        <div className="admin_create_appointment_cardholder_container">
          <span className="sq-label">Cardholder Last Name</span>
          <input className="sq-input"></input>
        </div>

        <CreditCardNumberInput label="Credit Card" />
        <CreditCardExpirationDateInput label="Expiration" />
        <CreditCardPostalCodeInput label="Zip Code" />
        <CreditCardCVVInput label="CVC" />
        <CreditCardSubmitButton>Book Appointment</CreditCardSubmitButton>
      </SquarePaymentForm>
      <div className="sq-error-message">
        {errorMessages.map((errorMessage) => (
          <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
        ))}
      </div>
    </div>
  );
};

export default AdminPaymentInfo;
