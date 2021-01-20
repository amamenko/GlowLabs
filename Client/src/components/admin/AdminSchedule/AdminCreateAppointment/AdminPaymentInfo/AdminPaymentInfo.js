import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  SquarePaymentForm,
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton,
} from "react-square-payment-form";
import Dropdown from "react-dropdown";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useMutation } from "@apollo/react-hooks";
import updateClientSquareIDMutation from "../../../../../graphql/mutations/updateClientSquareIDMutation";
import updateUnsavedSquareCardIDsMutation from "../../../../../graphql/mutations/updateUnsavedSquareCardIDsMutation";
import ACTION_BOOKED_WITH_CARD_ID_RESET from "../../../../../actions/PaymentInfo/BookedWithCardID/ACTION_BOOKED_WITH_CARD_ID_RESET";
import ACTION_SQUARE_CUSTOMER_ID from "../../../../../actions/PaymentInfo/SquareCustomerID/ACTION_SQUARE_CUSTOMER_ID";
import ACTION_BOOKED_WITH_CARD_ID from "../../../../../actions/PaymentInfo/BookedWithCardID/ACTION_BOOKED_WITH_CARD_ID";
import "./AdminPaymentInfo.css";

const AdminPaymentInfo = (props) => {
  const { getClientsData, getClientsRefetch, handleSubmitBooking } = props;

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
  const [successfulCardNonce, changeSuccessfulCardNonce] = useState(false);
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

  const [updateUnsavedSquareCardIDs] = useMutation(
    updateUnsavedSquareCardIDsMutation
  );

  const [updateClientSquareID] = useMutation(updateClientSquareIDMutation);

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
    if (getClientsData) {
      if (getClientsData.clients) {
        changeSelectedClient(
          getClientsData.clients.filter((x, i) => {
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
    adminClientLastName,
    adminClientFirstName,
    adminClientEmail,
    adminClientPhoneNumber,
    getClientsData,
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

  const fetchData = useCallback(async () => {
    const customerData = await retrieveSquareCustomerFunction();

    changeSquareStoredCreditCards(customerData);
  }, [retrieveSquareCustomerFunction]);

  useMemo(() => {
    if (selectedClient.length > 0) {
      if (selectedClient[0].squareCustomerId) {
        fetchData();
      } else {
        changeSquareStoredCreditCards("");
      }
    } else {
      if (selectedClient.length === 0) {
        changeSquareStoredCreditCards("");
      }
    }
  }, [selectedClient, fetchData]);

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
    } else {
      changeErrorMessage([]);

      let matchedClient;

      if (getClientsData) {
        for (let i = 0; i < getClientsData.clients.length; i++) {
          if (getClientsData.clients[i].email === adminClientEmail) {
            matchedClient = getClientsData.clients[i];
          }
        }
      }

      const squareCustomerData = {
        family_name: adminClientFirstName,
        given_name: adminClientLastName,
        email_address: adminClientEmail,
        phone_number: adminClientPhoneNumber,
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
                (cardHolderFirstName
                  ? cardHolderFirstName
                  : adminClientFirstName
                ).trim() +
                " " +
                (cardHolderLastName
                  ? cardHolderLastName
                  : adminClientLastName
                ).trim(),
              verification_token: buyerVerificationToken,
              customerId: JSON.parse(res.request.response).customer.id,
            };

            if (matchedClient) {
              if (!matchedClient.squareCustomerId) {
                updateClientSquareID({
                  variables: {
                    squareCustomerId: JSON.parse(res.request.response).customer
                      .id,
                    firstName: adminClientFirstName,
                    lastName: adminClientLastName,
                    email: adminClientEmail,
                  },
                });

                getClientsRefetch();
              }
            } else {
              dispatch(
                ACTION_SQUARE_CUSTOMER_ID(
                  JSON.parse(res.request.response).customer.id
                )
              );
            }

            changeSuccessfulCardNonce(true);

            updateUnsavedSquareCardIDs({
              variables: {
                unsavedSquareCardID: cardData.id,
                firstName: adminClientFirstName,
                lastName: adminClientLastName,
                email: adminClientEmail,
              },
            });

            getClientsRefetch();

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
          .then(async (res) => {
            if (squareStoredCreditCards.data) {
              if (
                squareStoredCreditCards.data.some(
                  (x) =>
                    x.billing_address.postal_code ===
                      res.data.card.billing_address.postal_code &&
                    x.card_brand === res.data.card.card_brand &&
                    x.cardholder_name === res.data.card.cardholder_name &&
                    x.exp_month === res.data.card.exp_month &&
                    x.exp_year === res.data.card.exp_year &&
                    x.last_4 === res.data.card.last_4
                )
              ) {
                const matchedDuplicateCard = squareStoredCreditCards.data.filter(
                  (x) =>
                    x.billing_address.postal_code ===
                      res.data.card.billing_address.postal_code &&
                    x.card_brand === res.data.card.card_brand &&
                    x.cardholder_name === res.data.card.cardholder_name &&
                    x.exp_month === res.data.card.exp_month &&
                    x.exp_year === res.data.card.exp_year &&
                    x.last_4 === res.data.card.last_4
                )[0];

                dispatch(ACTION_BOOKED_WITH_CARD_ID(matchedDuplicateCard.id));
              }
            }

            dispatch(ACTION_BOOKED_WITH_CARD_ID(res.data.card.id));

            updateUnsavedSquareCardIDs({
              variables: {
                unsavedSquareCardID: res.data.card.id,
                firstName: adminClientFirstName,
                lastName: adminClientLastName,
                email: adminClientEmail,
              },
            });

            getClientsRefetch();
          })
          .catch((err) => {
            console.error(err);
          });
      };

      const returningClientSquarePostRequestFunction = async () => {
        const squareData = {
          card_nonce: nonce,
          billing_address: { postal_code: cardData.billing_postal_code },
          cardholder_name:
            (cardHolderFirstName
              ? cardHolderFirstName
              : adminClientFirstName
            ).trim() +
            " " +
            (cardHolderLastName
              ? cardHolderLastName
              : adminClientLastName
            ).trim(),
          verification_token: buyerVerificationToken,
          customerId: matchedClient.squareCustomerId,
        };

        changeSuccessfulCardNonce(true);

        return await axios
          .post("http://localhost:4000/customers/card", squareData, {
            headers: {
              Authorization:
                "Bearer " + process.env.REACT_APP_SQUARE_SANDBOX_ACCESS_TOKEN,
            },
          })
          .then(async (res) => {
            if (squareStoredCreditCards.data) {
              if (
                squareStoredCreditCards.data.some(
                  (x) =>
                    x.billing_address.postal_code ===
                      res.data.card.billing_address.postal_code &&
                    x.card_brand === res.data.card.card_brand &&
                    x.cardholder_name === res.data.card.cardholder_name &&
                    x.exp_month === res.data.card.exp_month &&
                    x.exp_year === res.data.card.exp_year &&
                    x.last_4 === res.data.card.last_4
                )
              ) {
                const matchedDuplicateCard = squareStoredCreditCards.data.filter(
                  (x) =>
                    x.billing_address.postal_code ===
                      res.data.card.billing_address.postal_code &&
                    x.card_brand === res.data.card.card_brand &&
                    x.cardholder_name === res.data.card.cardholder_name &&
                    x.exp_month === res.data.card.exp_month &&
                    x.exp_year === res.data.card.exp_year &&
                    x.last_4 === res.data.card.last_4
                )[0];

                dispatch(ACTION_BOOKED_WITH_CARD_ID(matchedDuplicateCard.id));
              }
            }

            dispatch(ACTION_BOOKED_WITH_CARD_ID(res.data.card.id));

            updateUnsavedSquareCardIDs({
              variables: {
                unsavedSquareCardID: res.data.card.id,
                firstName: matchedClient.firstName,
                lastName: matchedClient.lastName,
                email: matchedClient.email,
              },
            });

            getClientsRefetch();
          })
          .catch((err) => {
            console.error(err);
          });
      };

      matchedClient
        ? matchedClient.squareCustomerId
          ? returningClientSquarePostRequestFunction()
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
        familyName: adminClientLastName,
        givenName: adminClientFirstName,
        email: adminClientEmail,
        phone: adminClientPhoneNumber,
      },
    };
  };

  useEffect(() => {
    if (successfulCardNonce) {
      handleSubmitBooking();
    }
  }, [successfulCardNonce, handleSubmitBooking]);

  return (
    <div className="admin_square_payment_form_container">
      <SquarePaymentForm
        sandbox={true}
        applicationId={process.env.REACT_APP_SQUARE_SANDBOX_APPLICATION_ID}
        locationId={process.env.REACT_APP_SQUARE_SANDBOX_LOCATION_ID}
        cardNonceResponseReceived={cardNonceResponseReceived}
        createVerificationDetails={createVerificationDetails}
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
