import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  SquarePaymentForm,
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton,
} from "react-square-payment-form";
import "./PaymentInfo.css";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { updateClientSquareIDMutation } from "../../graphql/queries/queries";
import { useMutation } from "@apollo/react-hooks";

const PaymentInfo = (props) => {
  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );

  // Checkout Form States
  const firstName = useSelector((state) => state.firstName.first_name);
  const lastName = useSelector((state) => state.lastName.last_name);
  const email = useSelector((state) => state.email.email);
  const phoneNumber = useSelector((state) => state.phoneNumber.phone_number);

  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );

  const [errorMessages, changeErrorMessage] = useState([]);
  const [cardHolderFirstName, changeCardHolderFirstName] = useState("");
  const [cardHolderLastName, changeCardHolderLastName] = useState("");

  const [
    updateClientSquareID,
    { data: updateClientSquareIDData },
  ] = useMutation(updateClientSquareIDMutation);

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
    } else {
      changeErrorMessage([]);

      const squareCustomerData = {
        family_name: props.getClientData
          ? cardHolderLastName
            ? cardHolderLastName
            : props.getClientData.client.lastName
          : cardHolderLastName
          ? cardHolderLastName
          : lastName,
        given_name: props.getClientData
          ? cardHolderFirstName
            ? cardHolderFirstName
            : props.getClientData.client.firstName
          : cardHolderFirstName
          ? cardHolderFirstName
          : firstName,
        email_address: props.getClientData
          ? props.getClientData.client.email
          : email,
        phone_number: props.getClientData
          ? props.getClientData.client.phoneNumber
          : phoneNumber,
      };

      axios
        .post("http://localhost:4000/customers", squareCustomerData, {
          headers: {
            Authorization:
              "Bearer " + process.env.REACT_APP_SQUARE_SANDBOX_ACCESS_TOKEN,
          },
        })
        .then((res) => {
          const squareData = {
            card_nonce: nonce,
            billing_address: { postal_code: cardData.billing_postal_code },
            cardholder_name:
              (userAuthenticated
                ? cardHolderFirstName
                  ? cardHolderFirstName
                  : props.getClientData.client.firstName
                : cardHolderFirstName
                ? cardHolderFirstName
                : firstName
              ).trim() +
              " " +
              (userAuthenticated
                ? cardHolderLastName
                  ? cardHolderLastName
                  : props.getClientData.client.lastName
                : cardHolderLastName
                ? cardHolderLastName
                : lastName
              ).trim(),
            verification_token: buyerVerificationToken,
            customerId: JSON.parse(res.request.response).customer.id,
          };

          return axios.post(
            "http://localhost:4000/customers/card",
            squareData,
            {
              headers: {
                Authorization:
                  "Bearer " + process.env.REACT_APP_SQUARE_SANDBOX_ACCESS_TOKEN,
              },
            }
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const createVerificationDetails = () => {
    return {
      amount: "",
      currencyCode: "",
      intent: "STORE",
      billingContact: {
        familyName: userAuthenticated
          ? cardHolderLastName
            ? cardHolderLastName
            : props.getClientData.client.lastName
          : cardHolderLastName
          ? cardHolderLastName
          : lastName,
        givenName: userAuthenticated
          ? cardHolderFirstName
            ? cardHolderFirstName
            : props.getClientData.client.firstName
          : cardHolderFirstName
          ? cardHolderFirstName
          : firstName,
        email: userAuthenticated ? props.getClientData.client.email : email,
        phone: userAuthenticated
          ? props.getClientData.client.phoneNumber
          : phoneNumber,
      },
    };
  };

  const redirectToHome = () => {
    if (!splashScreenComplete) {
      return <Redirect to="/" />;
    }
  };

  const handleCardHolderFirstName = (e) => {
    changeCardHolderFirstName(e.currentTarget.value.toUpperCase().trim());
  };

  const handleCardHolderLastName = (e) => {
    changeCardHolderLastName(e.currentTarget.value.toUpperCase().trim());
  };

  return (
    <div className="payment_info_container">
      {redirectToHome()}
      <div className="payment_info_container_header">
        <Link to="/availability/timepreference">
          <FontAwesomeIcon
            className="payment_info_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>PAYMENT INFO</h1>
        <Link to="/checkout">
          <FontAwesomeIcon
            className="payment_info_forward_arrow"
            icon={faChevronRight}
          />
        </Link>
      </div>
      <div className="payment_info_header">
        <h2>ENTER YOUR PAYMENT INFORMATION</h2>
      </div>
      <p className="payment_info_statement">
        Your credit card will be used to hold your time slot and will not be
        charged until after your appointment. You may change your payment method
        after your service.
      </p>
      <div className="square_payment_form_container">
        <SquarePaymentForm
          sandbox={true}
          applicationId={process.env.REACT_APP_SQUARE_SANDBOX_APPLICATION_ID}
          locationId={process.env.REACT_APP_SQUARE_SANDBOX_LOCATION_ID}
          cardNonceResponseReceived={cardNonceResponseReceived}
          createVerificationDetails={createVerificationDetails}
          className="square_payment_form"
        >
          <fieldset className="sq-fieldset">
            <div className="sq_card_holder_container">
              <span className="sq-label">CARDHOLDER FIRST NAME</span>
              <input
                name="first_name"
                type="text"
                maxLength="100"
                placeholder="Enter cardholder first name here"
                className="sq-cardholder-input"
                onChange={handleCardHolderFirstName}
                value={cardHolderFirstName}
              />
            </div>
            <div className="sq_card_holder_container">
              <span className="sq-label">CARDHOLDER LAST NAME</span>
              <input
                name="last_name"
                type="text"
                maxLength="100"
                placeholder="Enter cardholder last name here"
                className="sq-cardholder-input"
                onChange={handleCardHolderLastName}
                value={cardHolderLastName}
              />
            </div>
            <CreditCardNumberInput />
            <div className="sq_third_container">
              <div className="sq-form-third_credit_card">
                <CreditCardExpirationDateInput />
              </div>

              <div className="sq-form-third_postal">
                <CreditCardPostalCodeInput label="ZIP CODE" />
              </div>

              <div className="sq-form-third_cvv">
                <CreditCardCVVInput label="CVC" />
              </div>
            </div>
          </fieldset>

          <CreditCardSubmitButton>
            Submit Card Information
          </CreditCardSubmitButton>
        </SquarePaymentForm>
        <div className="sq-error-message">
          {errorMessages.map((errorMessage) => (
            <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentInfo;
