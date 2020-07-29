import React, { useState, useCallback, useEffect } from "react";
import {
  SquarePaymentForm,
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton,
} from "react-square-payment-form";
import "./AdminPaymentInfo.css";
import Dropdown from "react-dropdown";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ACTION_BOOKED_WITH_CARD_ID_RESET from "../../../../../actions/PaymentInfo/BookedWithCardID/ACTION_BOOKED_WITH_CARD_ID_RESET";

const AdminPaymentInfo = (props) => {
  const dispatch = useDispatch();

  const [errorMessages, changeErrorMessage] = useState([]);
  const [cardHolderFirstName, changeCardHolderFirstName] = useState("");
  const [cardHolderLastName, changeCardHolderLastName] = useState("");
  const [squareStoredCreditCards, changeSquareStoredCreditCards] = useState("");
  const [selectedCreditCard, changeSelectedCreditCard] = useState({
    name: "",
    id: "",
  });
  const [
    selectedCreditCardFullData,
    changeSelectedCreditCardFullData,
  ] = useState("");
  const [selectedClient, changeSelectedClient] = useState("");

  const adminClientFirstName = useSelector(
    (state) => state.adminClientFirstName.admin_client_first_name
  );
  const adminClientLastName = useSelector(
    (state) => state.adminClientLastName.admin_client_last_name
  );
  const adminClientEmail = useSelector(
    (state) => state.adminClientEmail.admin_client_email
  );
  const adminClientPhoneNumber = useSelector(
    (state) => state.adminClientPhoneNumber.admin_client_phone_number
  );
  const bookedWithCardID = useSelector(
    (state) => state.bookedWithCardID.booked_with_card_id
  );

  useEffect(() => {
    if (selectedClient.length < 1) {
      changeSelectedCreditCardFullData("");
      changeSelectedCreditCard({
        name: "",
        id: "",
      });
      changeSquareStoredCreditCards("");
    }
  }, [selectedClient.length]);

  useEffect(() => {
    if (squareStoredCreditCards) {
      if (
        selectedCreditCard &&
        selectedCreditCard.name &&
        selectedCreditCard.id
      ) {
        const creditCardSplitArr = selectedCreditCard.name.split(" -");

        const fullData = squareStoredCreditCards.data.find((x) => {
          return (
            x.card_brand === creditCardSplitArr[0].replace(" ", "_").trim() &&
            x.last_4 ===
              creditCardSplitArr[creditCardSplitArr.length - 1].trim() &&
            x.id === selectedCreditCard.id
          );
        });

        if (fullData) {
          changeSelectedCreditCardFullData(fullData);
        }
      }
    }
  }, [selectedCreditCard, squareStoredCreditCards]);

  useEffect(() => {
    const iFrameLabel = [...document.getElementsByClassName("sq-label")].filter(
      (x) =>
        x.innerText === "Credit Card" ||
        x.innerText === "Expiration" ||
        x.innerText === "Zip Code" ||
        x.innerText === "CVC"
    );

    const iFrameLabelHidden = [
      ...document.getElementsByClassName("sq-label"),
    ].filter((x) => x.className.includes("sq-payment-form-hidden"));

    if (selectedCreditCardFullData) {
      document
        .getElementById("sq-payment-form-sq-card-number")
        .classList.add("sq-payment-form-hidden");
      document
        .getElementById("sq-payment-form-sq-expiration-date")
        .classList.add("sq-payment-form-hidden");
      document
        .getElementById("sq-payment-form-sq-postal-code")
        .classList.add("sq-payment-form-hidden");
      document
        .getElementById("sq-payment-form-sq-cvv")
        .classList.add("sq-payment-form-hidden");

      if (iFrameLabel) {
        if (iFrameLabel.length > 0) {
          iFrameLabel.forEach((x) => x.classList.add("sq-payment-form-hidden"));
        }
      }
    } else {
      document
        .getElementById("sq-payment-form-sq-card-number")
        .classList.remove("sq-payment-form-hidden");
      document
        .getElementById("sq-payment-form-sq-expiration-date")
        .classList.remove("sq-payment-form-hidden");
      document
        .getElementById("sq-payment-form-sq-postal-code")
        .classList.remove("sq-payment-form-hidden");
      document
        .getElementById("sq-payment-form-sq-cvv")
        .classList.remove("sq-payment-form-hidden");

      if (iFrameLabelHidden) {
        if (iFrameLabelHidden.length > 0) {
          iFrameLabelHidden.forEach((x) => {
            x.classList.remove("sq-payment-form-hidden");
          });
        }
      }
    }
  }, [selectedCreditCardFullData]);

  useEffect(() => {
    if (props.getClientsData) {
      if (props.getClientsData.clients) {
        changeSelectedClient(
          props.getClientsData.clients.filter((x, i) => {
            return (
              x.firstName.toLowerCase() ===
                adminClientFirstName.toLowerCase() &&
              x.lastName.toLowerCase() === adminClientLastName.toLowerCase() &&
              x.email.toLowerCase() === adminClientEmail.toLowerCase() &&
              x.phoneNumber.toLowerCase() ===
                adminClientPhoneNumber.toLowerCase()
            );
          })
        );
      }
    }
  }, [
    props.getClientData,
    adminClientLastName,
    adminClientFirstName,
    adminClientEmail,
    adminClientPhoneNumber,
    props.getClientsData,
    props.getClientsData.clients,
  ]);

  const retrieveSquareCustomerFunction = useCallback(async () => {
    return await axios
      .post(
        "http://localhost:4000/retrieve_customer",
        {
          data: {
            squareCustomerId:
              selectedClient.length > 0
                ? selectedClient[0].squareCustomerId
                : "",
          },
        },
        {
          headers: {
            Authorization:
              "Bearer " + process.env.REACT_APP_SQUARE_SANDBOX_ACCESS_TOKEN,
          },
        }
      )
      .catch((e) => changeSquareStoredCreditCards(""));
  }, [selectedClient]);

  useEffect(() => {
    if (squareStoredCreditCards) {
      const cardFullData = squareStoredCreditCards.data.filter(
        (x) => x.id === selectedCreditCard.id
      )[0];

      if (!selectedCreditCard.name) {
        if (cardFullData) {
          changeSelectedCreditCard({
            name:
              cardFullData.card_brand.split("_").join(" ") +
              " - " +
              cardFullData.last_4,
            id: cardFullData.id,
          });

          changeSelectedCreditCardFullData(cardFullData);
        }
      }
    }
  }, [bookedWithCardID, squareStoredCreditCards, selectedCreditCard]);

  useEffect(() => {
    if (!squareStoredCreditCards) {
      if (selectedClient.length > 0) {
        if (selectedClient[0].squareCustomerId) {
          const fetchData = async () => {
            const customerData = await retrieveSquareCustomerFunction();

            changeSquareStoredCreditCards(customerData);
          };

          fetchData();
        } else {
          changeSquareStoredCreditCards("");
        }
      }
    } else {
      if (squareStoredCreditCards) {
        if (selectedClient.length === 0) {
          changeSquareStoredCreditCards("");
        }
      }
    }
  }, [retrieveSquareCustomerFunction, squareStoredCreditCards, selectedClient]);

  const renderStoredCreditCardOptions = () => {
    if (squareStoredCreditCards) {
      if (squareStoredCreditCards.data) {
        return squareStoredCreditCards.data
          .filter((x) =>
            selectedClient.length > 0
              ? selectedClient[0].unsavedSquareCardIDs.includes(x.id)
              : ""
          )
          .map((x, i) => {
            return {
              value: JSON.stringify({
                name: x.card_brand.split("_").join(" ") + " - " + x.last_4,
                id: x.id,
              }),
              label: x.card_brand.split("_").join(" ") + " - " + x.last_4,
            };
          });
      } else {
        return [
          {
            value: JSON.stringify({
              name: "",
              id: "",
            }),
            label: "No cards saved on file",
          },
        ];
      }
    } else {
      return [
        {
          value: JSON.stringify({
            name: "",
            id: "",
          }),
          label: "No cards saved on file",
        },
      ];
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
        <div className="admin_create_appointment_input_information_container">
          <div className="sq-label">Choose a credit card</div>
          <Dropdown
            options={[
              {
                value: JSON.stringify({
                  name: "NEW CARD",
                  id: "NEW CARD",
                }),
                label: "NEW CARD",
              },
              ...renderStoredCreditCardOptions(),
            ].flat()}
            value={
              selectedCreditCard
                ? selectedCreditCard.name
                  ? selectedCreditCard.name
                  : ""
                : ""
            }
            onChange={(item) => {
              const itemValue = JSON.parse(item.value);

              if (selectedCreditCard.name) {
                dispatch(ACTION_BOOKED_WITH_CARD_ID_RESET());

                if (itemValue.name === "" || itemValue.name === "NEW CARD") {
                  dispatch(ACTION_BOOKED_WITH_CARD_ID_RESET());

                  changeSelectedCreditCard({ name: "", id: "" });
                  changeSelectedCreditCardFullData("");
                } else {
                  dispatch(ACTION_BOOKED_WITH_CARD_ID_RESET());

                  changeSelectedCreditCard({ name: "", id: "" });
                  changeSelectedCreditCardFullData("");

                  changeSelectedCreditCard({
                    name: itemValue.name,
                    id: itemValue.id,
                  });

                  const cardFullData = squareStoredCreditCards.data.filter(
                    (x) => x.id === selectedCreditCard.id
                  )[0];

                  changeSelectedCreditCardFullData(cardFullData);
                }
              } else {
                dispatch(ACTION_BOOKED_WITH_CARD_ID_RESET());

                changeSelectedCreditCard({ name: "", id: "" });
                changeSelectedCreditCardFullData("");

                changeSelectedCreditCard({
                  name: itemValue.name,
                  id: itemValue.id,
                });

                const cardFullData = squareStoredCreditCards
                  ? squareStoredCreditCards.data
                    ? squareStoredCreditCards.data.filter(
                        (x) => x.id === selectedCreditCard.id
                      )[0]
                    : null
                  : null;

                changeSelectedCreditCardFullData(cardFullData);
              }
            }}
            controlClassName="sq-input"
            className="sq-creditcard"
            placeholder={
              adminClientFirstName && adminClientLastName
                ? "NEW CARD"
                : "No client selected"
            }
            disabled={
              adminClientFirstName && adminClientLastName ? false : true
            }
          />
        </div>
        <div className="admin_create_appointment_cardholder_container">
          <span className="sq-label">Cardholder First Name</span>
          <input
            className="sq-input"
            placeholder="Enter first name"
            value={
              selectedCreditCardFullData
                ? selectedCreditCardFullData.cardholder_name
                  ? selectedCreditCardFullData.cardholder_name.split(" ")[0]
                  : cardHolderFirstName
                : cardHolderFirstName
            }
            disabled={selectedCreditCardFullData ? true : false}
            onChange={(e) =>
              changeCardHolderFirstName(e.target.value.toUpperCase())
            }
          />
        </div>
        <div className="admin_create_appointment_cardholder_container">
          <span className="sq-label">Cardholder Last Name</span>
          <input
            className="sq-input"
            placeholder="Enter last name"
            value={
              selectedCreditCardFullData
                ? selectedCreditCardFullData.cardholder_name
                  ? selectedCreditCardFullData.cardholder_name.split(" ")[1]
                  : cardHolderLastName
                : cardHolderLastName
            }
            onChange={(e) =>
              changeCardHolderLastName(e.target.value.toUpperCase())
            }
            disabled={selectedCreditCardFullData ? true : false}
          />
        </div>
        {selectedCreditCardFullData ? (
          <>
            <div className="sq-selected-credit-card-details">
              {/* Space in "Credit Card " important to distinguish between new card and toggled card form inputs */}
              <span className="sq-label">Credit Card &nbsp;</span>
              <input
                name="credit_card"
                type="text"
                maxLength="100"
                className="sq-input"
                disabled={true}
                value={
                  selectedCreditCardFullData.card_brand.toLowerCase() ===
                  "american_express"
                    ? "•••• •••••• •" + selectedCreditCardFullData.last_4
                    : "•••• •••• •••• " + selectedCreditCardFullData.last_4
                }
              />
            </div>
            <div>
              {/* Space in "Expiration " important to distinguish between new card and toggled card form inputs */}
              <span className="sq-label">Expiration &nbsp;</span>
              <input
                name="expiration_date"
                type="text"
                className="sq-input"
                disabled={true}
                value={
                  selectedCreditCardFullData.exp_month >= 10
                    ? selectedCreditCardFullData.exp_month.toString() +
                      "/" +
                      selectedCreditCardFullData.exp_year.toString().substr(-2)
                    : "0" +
                      selectedCreditCardFullData.exp_month.toString() +
                      "/" +
                      selectedCreditCardFullData.exp_year.toString().substr(-2)
                }
              />
            </div>
            <div>
              {/* Space in "Zip Code " important to distinguish between new card and toggled card form inputs */}
              <span className="sq-label">Zip Code &nbsp;</span>
              <input
                name="postal_code"
                type="text"
                className="sq-input"
                disabled={true}
                value={selectedCreditCardFullData.billing_address.postal_code}
              />
            </div>
            <div>
              {/* Space in "CVC " important to distinguish between new card and toggled card form inputs */}
              <span className="sq-label">CVC &nbsp;</span>
              <input
                name="cvc_code"
                type="text"
                className="sq-input"
                disabled={true}
                value={
                  selectedCreditCardFullData.card_brand.toLowerCase() ===
                  "american_express"
                    ? "••••"
                    : "•••"
                }
              />
            </div>
          </>
        ) : null}

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