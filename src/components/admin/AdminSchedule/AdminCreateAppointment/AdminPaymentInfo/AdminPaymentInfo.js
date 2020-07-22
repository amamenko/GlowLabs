import React from "react";
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
  return (
    <div className="admin_square_payment_form_container">
      <SquarePaymentForm
        sandbox={true}
        applicationId={process.env.REACT_APP_SQUARE_SANDBOX_APPLICATION_ID}
        locationId={process.env.REACT_APP_SQUARE_SANDBOX_LOCATION_ID}
        cardNonceResponseReceived={() => console.log("OK")}
        createVerificationDetails={() => console.log("OK")}
        // paymentFormLoaded={() => changeSquareFormLoading(false)}

        placeholderCVV="CVC"
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
        <CreditCardNumberInput />
        <CreditCardExpirationDateInput />
        <CreditCardPostalCodeInput />
        <CreditCardCVVInput />
        <CreditCardSubmitButton />
      </SquarePaymentForm>
    </div>
  );
};

export default AdminPaymentInfo;
