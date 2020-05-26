import React, { useState, useEffect, useCallback } from "react";
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
  faChevronCircleDown,
} from "@fortawesome/free-solid-svg-icons";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { updateClientSquareIDMutation } from "../../graphql/queries/queries";
import { useMutation } from "@apollo/react-hooks";
import { FormGroup, Label, Input } from "reactstrap";

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
  const [squareStoredCreditCards, changeSquareStoredCreditCards] = useState("");
  const [selectedCreditCard, changeSelectedCreditCard] = useState("");
  const [
    selectedCreditCardFullData,
    changeSelectedCreditCardFullData,
  ] = useState("");

  useEffect(() => {
    if (squareStoredCreditCards) {
      if (selectedCreditCard) {
        const creditCardSplitArr = selectedCreditCard.split(" ");

        const fullData = squareStoredCreditCards.data.find((x) => {
          return (
            x.card_brand === creditCardSplitArr[0] &&
            x.last_4 === creditCardSplitArr[creditCardSplitArr.length - 1]
          );
        });

        if (fullData) {
          changeSelectedCreditCardFullData(fullData);
        }
      }
    }
  }, [selectedCreditCard, squareStoredCreditCards]);

  console.log(selectedCreditCardFullData);

  const [
    updateClientSquareID,
    { data: updateClientSquareIDData },
  ] = useMutation(updateClientSquareIDMutation);

  const retrieveSquareCustomerFunction = useCallback(() => {
    return axios.post(
      "http://localhost:4000/retrieve_customer",
      {
        data: {
          squareCustomerId: props.getClientData.client.squareCustomerId,
        },
      },
      {
        headers: {
          Authorization:
            "Bearer " + process.env.REACT_APP_SQUARE_SANDBOX_ACCESS_TOKEN,
        },
      }
    );
  }, [props.getClientData]);

  useEffect(() => {
    if (userAuthenticated) {
      if (!squareStoredCreditCards) {
        const fetchData = async () => {
          const customerData = await retrieveSquareCustomerFunction();

          changeSquareStoredCreditCards(customerData);
        };

        fetchData();
      }
    }
  }, [
    userAuthenticated,
    retrieveSquareCustomerFunction,
    squareStoredCreditCards,
  ]);

  const renderStoredCreditCardOptions = () => {
    if (squareStoredCreditCards) {
      return squareStoredCreditCards.data.map((x, i) => {
        return (
          <option onClick={() => changeSelectedCreditCard(x.id)} key={i}>
            {x.card_brand + " - " + x.last_4}
          </option>
        );
      });
    }
  };

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

      const squarePostRequestFunction = () => {
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

            updateClientSquareID({
              variables: {
                squareCustomerId: JSON.parse(res.request.response).customer.id,
                firstName: userAuthenticated
                  ? props.getClientData.client.firstName
                  : firstName,
                lastName: userAuthenticated
                  ? props.getClientData.client.lastName
                  : lastName,
                email: userAuthenticated
                  ? props.getClientData.client.email
                  : email,
              },
            });

            return axios.post(
              "http://localhost:4000/customers/card",
              squareData,
              {
                headers: {
                  Authorization:
                    "Bearer " +
                    process.env.REACT_APP_SQUARE_SANDBOX_ACCESS_TOKEN,
                },
              }
            );
          })
          .catch((err) => {
            console.error(err);
          });
      };

      userAuthenticated
        ? props.getClientData.client.squareCustomerId
          ? retrieveSquareCustomerFunction()
          : squarePostRequestFunction()
        : squarePostRequestFunction();
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

  useEffect(() => {
    const iFrameLabel = [...document.getElementsByClassName("sq-label")].filter(
      (x) => x.innerText === "CREDIT CARD"
    );
    const iFrameLabelHidden = [
      ...document.getElementsByClassName("sq-label"),
    ].filter((x) => x.className.includes("sq-payment-form-hidden"));

    if (selectedCreditCardFullData) {
      document
        .getElementById("sq-payment-form-sq-card-number")
        .classList.add("sq-payment-form-hidden");

      if (iFrameLabel) {
        if (iFrameLabel[0]) {
          iFrameLabel[0].classList.add("sq-payment-form-hidden");
        }
      }
    } else {
      document
        .getElementById("sq-payment-form-sq-card-number")
        .classList.remove("sq-payment-form-hidden");

      if (iFrameLabelHidden) {
        if (iFrameLabelHidden[0]) {
          iFrameLabelHidden[0].classList.remove("sq-payment-form-hidden");
        }
      }
    }
  }, [selectedCreditCardFullData]);

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
            <FormGroup className="choose_a_credit_card_formgroup">
              <Label className="sq-label" for="select">
                CHOOSE A CREDIT CARD
              </Label>
              <FontAwesomeIcon
                className="choose_a_credit_card_dropdown_icon"
                icon={faChevronCircleDown}
              />
              <Input
                className="sq-cardholder-input"
                type="select"
                name="select"
                id="select"
                onChange={(e) => {
                  if (selectedCreditCard) {
                    if (e.target.value === "NEW CARD") {
                      changeSelectedCreditCard("");
                      changeSelectedCreditCardFullData("");
                    }
                  } else {
                    changeSelectedCreditCard(e.target.value);
                  }
                }}
              >
                <option>NEW CARD</option>
                {renderStoredCreditCardOptions()}
              </Input>
            </FormGroup>
            <div className="sq_card_holder_container">
              <span className="sq-label">CARDHOLDER FIRST NAME</span>
              <input
                name="first_name"
                type="text"
                maxLength="100"
                placeholder="Enter cardholder first name here"
                className="sq-cardholder-input"
                disabled={selectedCreditCardFullData ? true : false}
                onChange={handleCardHolderFirstName}
                value={
                  selectedCreditCardFullData
                    ? selectedCreditCardFullData.cardholder_name.split(" ")[0]
                    : cardHolderFirstName
                }
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
                disabled={selectedCreditCardFullData ? true : false}
                onChange={handleCardHolderLastName}
                value={
                  selectedCreditCardFullData
                    ? selectedCreditCardFullData.cardholder_name.split(" ")[
                        selectedCreditCardFullData.cardholder_name.split(" ")
                          .length - 1
                      ]
                    : cardHolderLastName
                }
              />
            </div>
            {selectedCreditCardFullData ? (
              <div className="sq_card_holder_container">
                <span className="sq-label">CREDIT CARD </span>
                <input
                  name="credit_card"
                  type="text"
                  maxLength="100"
                  className="sq-cardholder-input"
                  disabled={selectedCreditCardFullData ? true : false}
                  value={
                    selectedCreditCardFullData.card_brand.toLowerCase() ===
                    "americanexpress"
                      ? "•••• •••••• •" + selectedCreditCardFullData.last_4
                      : "•••• •••• •••• " + selectedCreditCardFullData.last_4
                  }
                />
              </div>
            ) : null}
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
