import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  SquarePaymentForm,
  CreditCardNumberInput,
  CreditCardExpirationDateInput,
  CreditCardPostalCodeInput,
  CreditCardCVVInput,
  CreditCardSubmitButton,
} from "react-square-payment-form";
import {
  faChevronLeft,
  faChevronRight,
  faChevronCircleDown,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import getClientsQuery from "../../graphql/queries/getClientsQuery";
import removeOneUnsavedSquareCardIDsMutation from "../../graphql/mutations/removeOneUnsavedSquareCardIDsMutation";
import updateUnsavedSquareCardIDsMutation from "../../graphql/mutations/updateUnsavedSquareCardIDsMutation";
import updateClientSquareIDMutation from "../../graphql/mutations/updateClientSquareIDMutation";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { FormGroup, Label, Input } from "reactstrap";
import { css } from "@emotion/css";
import ClipLoader from "react-spinners/ClipLoader";
import { Spring } from "react-spring/renderprops";
import ACTION_SAVE_CARD_UNCHECKED from "../../actions/PaymentInfo/SaveCardChecked/ACTION_SAVE_CARD_UNCHECKED";
import ACTION_SAVE_CARD_CHECKED from "../../actions/PaymentInfo/SaveCardChecked/ACTION_SAVE_CARD_CHECKED";
import ACTION_SQUARE_CUSTOMER_ID_RESET from "../../actions/PaymentInfo/SquareCustomerID/ACTION_SQUARE_CUSTOMER_ID_RESET";
import ACTION_SQUARE_CUSTOMER_ID from "../../actions/PaymentInfo/SquareCustomerID/ACTION_SQUARE_CUSTOMER_ID";
import ACTION_BOOKED_WITH_CARD_ID_RESET from "../../actions/PaymentInfo/BookedWithCardID/ACTION_BOOKED_WITH_CARD_ID_RESET";
import ACTION_BOOKED_WITH_CARD_ID from "../../actions/PaymentInfo/BookedWithCardID/ACTION_BOOKED_WITH_CARD_ID";
import ACTION_CONFIRMATION_PAGE_OPENED from "../../actions/InCart/CartPageOpened/ACTION_CONFIRMATION_PAGE_OPENED";
import ACTION_TIME_PREFERENCE_PAGE_OPENED from "../../actions/InCart/CartPageOpened/ACTION_TIME_PREFERENCE_PAGE_OPENED";
import ACTION_GUEST_CHECKOUT_FORM_PAGE_PAGE_OPENED from "../../actions/InCart/CartPageOpened/ACTION_GUEST_CHECKOUT_FORM_PAGE_OPENED";
import "./PaymentInfo.css";
import "../account/clientprofile/ConsentForm/ConsentForm.css";

const PaymentInfo = (props) => {
  const dispatch = useDispatch();

  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );
  const saveCardChecked = useSelector(
    (state) => state.saveCardChecked.save_card_checked
  );
  const squareCustomerID = useSelector(
    (state) => state.squareCustomerID.square_customer_id
  );
  const bookedWithCardID = useSelector(
    (state) => state.bookedWithCardID.booked_with_card_id
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
  const [successfulCardNonce, changeSuccessfulCardNonce] = useState(false);
  const [squareStoredCreditCards, changeSquareStoredCreditCards] = useState("");
  const [squareCustomerInfo, changeSquareCustomerInfo] = useState("");
  const [selectedCreditCard, changeSelectedCreditCard] = useState({
    name: "",
    id: "",
  });
  const [
    selectedCreditCardFullData,
    changeSelectedCreditCardFullData,
  ] = useState("");
  const [squareFormLoading, changeSquareFormLoading] = useState(true);
  const [pageOpened, changePageOpened] = useState(false);
  const [clipLoaderActive, changeClipLoaderActive] = useState(false);

  const [updateUnsavedSquareCardIDs] = useMutation(
    updateUnsavedSquareCardIDsMutation
  );

  const [updateClientSquareID] = useMutation(updateClientSquareIDMutation);

  const [removeOneUnsavedSquareCardIDs] = useMutation(
    removeOneUnsavedSquareCardIDsMutation
  );

  const { data: getClientsData, refetch: getClientsDataRefetch } = useQuery(
    getClientsQuery,
    {
      fetchPolicy: "no-cache",
    }
  );

  useEffect(() => {
    changePageOpened(true);
    const pageNowOpen = setTimeout(() => {
      changePageOpened(false);
    }, 500);
    return () => {
      clearTimeout(pageNowOpen);
    };
  }, []);

  useEffect(() => {
    if (userAuthenticated) {
      if (bookedWithCardID) {
        if (squareStoredCreditCards) {
          const cardFullData = squareStoredCreditCards.filter(
            (x) => x.id === bookedWithCardID
          )[0];

          if (!selectedCreditCard.name) {
            changeSelectedCreditCard({
              name:
                cardFullData.cardBrand.split("_").join(" ") +
                " - " +
                cardFullData.last4,
              id: cardFullData.id,
            });

            changeCardHolderFirstName(
              squareCustomerInfo.givenName.toUpperCase()
            );
            changeCardHolderLastName(
              squareCustomerInfo.familyName.toUpperCase()
            );

            changeSelectedCreditCardFullData(cardFullData);
          }
        }
      }
    }
  }, [
    squareCustomerInfo,
    bookedWithCardID,
    squareStoredCreditCards,
    userAuthenticated,
    pageOpened,
    selectedCreditCard,
  ]);

  const deleteSquareCustomerFunction = useCallback(() => {
    return axios.post(
      `${
        process.env.REACT_APP_ENV === "production"
          ? process.env.REACT_APP_PRODUCTION_SERVER_URL
          : "http://localhost:4000"
      }/api/delete_customer`,
      {
        data: {
          squareCustomerId: squareCustomerID,
        },
      },
      {
        headers: {
          Authorization:
            "Bearer " + process.env.REACT_APP_SQUARE_SANDBOX_ACCESS_TOKEN,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
  }, [squareCustomerID]);

  useEffect(() => {
    if (!userAuthenticated) {
      if (pageOpened && squareCustomerID) {
        let matchedClient;

        const deleteCustomer = setTimeout(() => {
          if (getClientsData) {
            for (let i = 0; i < getClientsData.clients.length; i++) {
              if (getClientsData.clients[i].email === email) {
                matchedClient = getClientsData.clients[i];
              }
            }
          }

          if (!matchedClient) {
            const deleteCustomerData = async () => {
              await deleteSquareCustomerFunction();

              dispatch(ACTION_BOOKED_WITH_CARD_ID_RESET());
              dispatch(ACTION_SQUARE_CUSTOMER_ID_RESET());
            };
            deleteCustomerData();
          }
        }, 500);

        return () => {
          clearTimeout(deleteCustomer);
        };
      }
    }
  }, [
    deleteSquareCustomerFunction,
    email,
    getClientsData,
    pageOpened,
    userAuthenticated,
    squareCustomerID,
    dispatch,
  ]);

  useEffect(() => {
    if (userAuthenticated) {
      props.clientDataRefetch();
    }
  }, [props, userAuthenticated]);

  useEffect(() => {
    if (!squareFormLoading) {
      if (!props.currentScreenSize) {
        if (!props.initialScreenSize >= 1200) {
          window.scrollTo(0, 0);
        } else {
          window.scrollTo(0, props.largeScreenFrozenScrollPosition);
        }
      } else {
        if (!props.currentScreenSize >= 1200) {
          window.scrollTo(0, 0);
        } else {
          window.scrollTo(0, props.largeScreenFrozenScrollPosition);
        }
      }
    }
  }, [
    squareFormLoading,
    props.currentScreenSize,
    props.initialScreenSize,
    props.largeScreenFrozenScrollPosition,
  ]);

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  useEffect(() => {
    if (squareStoredCreditCards) {
      if (
        selectedCreditCard &&
        selectedCreditCard.name &&
        selectedCreditCard.id
      ) {
        const creditCardSplitArr = selectedCreditCard.name.split(" -");

        const fullData = squareStoredCreditCards.find((x) => {
          return (
            x.cardBrand === creditCardSplitArr[0].replace(" ", "_").trim() &&
            x.last4 ===
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

  const retrieveSquareCustomerFunction = useCallback(
    (matchedClient) => {
      return axios.post(
        `${
          process.env.REACT_APP_ENV === "production"
            ? process.env.REACT_APP_PRODUCTION_SERVER_URL
            : "http://localhost:4000"
        }/api/retrieve_customer`,
        {
          data: {
            squareCustomerId: userAuthenticated
              ? props.getClientData
                ? props.getClientData.client
                  ? props.getClientData.client.squareCustomerId
                  : matchedClient
                  ? matchedClient.squareCustomerId
                  : null
                : matchedClient
                ? matchedClient.squareCustomerId
                : null
              : matchedClient
              ? matchedClient.squareCustomerId
              : null,
          },
        },
        {
          headers: {
            Authorization:
              "Bearer " + process.env.REACT_APP_SQUARE_SANDBOX_ACCESS_TOKEN,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
    },
    [props.getClientData, userAuthenticated]
  );

  useEffect(() => {
    if (userAuthenticated) {
      if (!squareStoredCreditCards) {
        const fetchData = async () => {
          const customerData = await retrieveSquareCustomerFunction();

          if (customerData) {
            if (customerData.data) {
              if (customerData.data.customer) {
                changeSquareStoredCreditCards(customerData.data.customer.cards);
                changeSquareCustomerInfo(customerData.data.customer);
              }
            }
          }
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
      return squareStoredCreditCards
        .filter(
          (x) => !props.getClientData.client.unsavedSquareCardIDs.includes(x.id)
        )
        .map((x, i) => {
          return (
            <option
              value={JSON.stringify({
                name: x.cardBrand.split("_").join(" ") + " - " + x.last4,
                id: x.id,
              })}
              key={i}
            >
              {x.cardBrand.split("_").join(" ") + " - " + x.last4}
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
    changeClipLoaderActive(true);
    if (errors) {
      changeClipLoaderActive(false);
      return changeErrorMessage(
        errors.map((error) => (error ? error.message : null))
      );
    } else {
      changeErrorMessage([]);

      let matchedClient;

      if (getClientsData) {
        for (let i = 0; i < getClientsData.clients.length; i++) {
          if (getClientsData.clients[i].email === email) {
            matchedClient = getClientsData.clients[i];
          }
        }
      }

      const squareCustomerData = {
        family_name: props.getClientData
          ? props.getClientData.client.lastName
          : lastName,
        given_name: props.getClientData
          ? props.getClientData.client.firstName
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
          .post(
            `${
              process.env.REACT_APP_ENV === "production"
                ? process.env.REACT_APP_PRODUCTION_SERVER_URL
                : "http://localhost:4000"
            }/api/customers`,
            squareCustomerData,
            {
              headers: {
                Authorization:
                  "Bearer " + process.env.REACT_APP_SQUARE_SANDBOX_ACCESS_TOKEN,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
          .then((res, err) => {
            const squareData = {
              card_nonce: nonce,
              billingAddress: { postalCode: cardData.billing_postal_code },
              cardholderName:
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

            if (userAuthenticated) {
              updateClientSquareID({
                variables: {
                  squareCustomerId: JSON.parse(res.request.response).customer
                    .id,
                  firstName: props.getClientData.client.firstName,
                  lastName: props.getClientData.client.lastName,
                  email: props.getClientData.client.email,
                },
              });

              props.clientDataRefetch();
            } else {
              if (matchedClient) {
                if (!matchedClient.squareCustomerId) {
                  updateClientSquareID({
                    variables: {
                      squareCustomerId: JSON.parse(res.request.response)
                        .customer.id,
                      firstName: firstName,
                      lastName: lastName,
                      email: email,
                    },
                  });

                  getClientsDataRefetch();
                }
              } else {
                dispatch(
                  ACTION_SQUARE_CUSTOMER_ID(
                    JSON.parse(res.request.response).customer.id
                  )
                );
              }
            }

            if (!saveCardChecked && userAuthenticated) {
              updateUnsavedSquareCardIDs({
                variables: {
                  unsavedSquareCardID: cardData.id,
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

              props.clientDataRefetch();
            }

            return axios.post(
              `${
                process.env.REACT_APP_ENV === "production"
                  ? process.env.REACT_APP_PRODUCTION_SERVER_URL
                  : "http://localhost:4000"
              }/api/customers/card`,
              squareData,
              {
                headers: {
                  Authorization:
                    "Bearer " +
                    process.env.REACT_APP_SQUARE_SANDBOX_ACCESS_TOKEN,
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            );
          })
          .then(async (res) => {
            if (res.data.error) {
              changeClipLoaderActive(false);
              return changeErrorMessage(
                res.data.error.map((error) => error.detail)
              );
            } else {
              changeErrorMessage([]);
              if (squareStoredCreditCards) {
                if (
                  squareStoredCreditCards.some(
                    (x) =>
                      x.billingAddress.postalCode ===
                        res.data.card.billingAddress.postalCode &&
                      x.cardBrand === res.data.card.cardBrand &&
                      x.cardholderName === res.data.card.cardholderName &&
                      x.expMonth === res.data.card.expMonth &&
                      x.expYear === res.data.card.expYear &&
                      x.last4 === res.data.card.last4
                  )
                ) {
                  const deleteCardData = {
                    customerId: userAuthenticated
                      ? props.getClientData.client.squareCustomerId
                      : matchedClient.squareCustomerId,
                    cardId: res.data.card.id,
                  };

                  const matchedDuplicateCard = squareStoredCreditCards.filter(
                    (x) =>
                      x.billingAddress.postalCode ===
                        res.data.card.billingAddress.postalCode &&
                      x.cardBrand === res.data.card.cardBrand &&
                      x.cardholderName === res.data.card.cardholderName &&
                      x.expMonth === res.data.card.expMonth &&
                      x.expYear === res.data.card.expYear &&
                      x.last4 === res.data.card.last4
                  )[0];

                  dispatch(ACTION_BOOKED_WITH_CARD_ID(matchedDuplicateCard.id));
                  changeClipLoaderActive(false);
                  changeSuccessfulCardNonce(true);

                  if (saveCardChecked) {
                    if (userAuthenticated) {
                      if (
                        props.getClientData.client.unsavedSquareCardIDs.includes(
                          matchedDuplicateCard.id
                        )
                      ) {
                        removeOneUnsavedSquareCardIDs({
                          variables: {
                            unsavedSquareCardID: matchedDuplicateCard.id,
                            firstName: props.getClientData.client.firstName,
                            lastName: props.getClientData.client.lastName,
                            email: props.getClientData.client.email,
                          },
                        });
                      }
                    }
                  }

                  return await axios.post(
                    `${
                      process.env.REACT_APP_ENV === "production"
                        ? process.env.REACT_APP_PRODUCTION_SERVER_URL
                        : "http://localhost:4000"
                    }/api/customers/delete_card`,
                    deleteCardData,
                    {
                      headers: {
                        Authorization:
                          "Bearer " +
                          process.env.REACT_APP_SQUARE_SANDBOX_ACCESS_TOKEN,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                    }
                  );
                }
              }

              dispatch(ACTION_BOOKED_WITH_CARD_ID(res.data.card.id));
              changeSuccessfulCardNonce(true);
              changeClipLoaderActive(false);
              if (!saveCardChecked && userAuthenticated) {
                updateUnsavedSquareCardIDs({
                  variables: {
                    unsavedSquareCardID: res.data.card.id,
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

                props.clientDataRefetch();
              }
            }
          })
          .catch((err) => {
            console.error(err);
          });
      };

      const returningClientSquarePostRequestFunction = async () => {
        const squareData = {
          card_nonce: nonce,
          billingAddress: { postalCode: cardData.billing_postal_code },
          cardholderName:
            (userAuthenticated
              ? cardHolderFirstName
                ? cardHolderFirstName
                : props.getClientData.client.firstName.toUpperCase()
              : cardHolderFirstName
              ? cardHolderFirstName
              : firstName.toUpperCase()
            ).trim() +
            " " +
            (userAuthenticated
              ? cardHolderLastName
                ? cardHolderLastName
                : props.getClientData.client.lastName.toUpperCase()
              : cardHolderLastName
              ? cardHolderLastName
              : lastName.toUpperCase()
            ).trim(),
          verification_token: buyerVerificationToken,
          customerId: userAuthenticated
            ? props.getClientData.client.squareCustomerId
            : matchedClient.squareCustomerId,
        };

        changeSuccessfulCardNonce(true);
        changeClipLoaderActive(false);

        return await axios
          .post(
            `${
              process.env.REACT_APP_ENV === "production"
                ? process.env.REACT_APP_PRODUCTION_SERVER_URL
                : "http://localhost:4000"
            }/api/customers/card`,
            squareData,
            {
              headers: {
                Authorization:
                  "Bearer " + process.env.REACT_APP_SQUARE_SANDBOX_ACCESS_TOKEN,
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
          .then(async (res) => {
            if (squareStoredCreditCards) {
              if (
                squareStoredCreditCards.some(
                  (x) =>
                    x.billingAddress.postalCode ===
                      res.data.card.billingAddress.postalCode &&
                    x.cardBrand === res.data.card.cardBrand &&
                    x.cardholderName === res.data.card.cardholderName &&
                    x.expMonth === res.data.card.expMonth &&
                    x.expYear === res.data.card.expYear &&
                    x.last4 === res.data.card.last4
                )
              ) {
                const deleteCardData = {
                  customerId: userAuthenticated
                    ? props.getClientData.client.squareCustomerId
                    : matchedClient.squareCustomerId,
                  cardId: res.data.card.id,
                };

                const matchedDuplicateCard = squareStoredCreditCards.filter(
                  (x) =>
                    x.billingAddress.postalCode ===
                      res.data.card.billingAddress.postalCode &&
                    x.cardBrand === res.data.card.cardBrand &&
                    x.cardholderName === res.data.card.cardholderName &&
                    x.expMonth === res.data.card.expMonth &&
                    x.expYear === res.data.card.expYear &&
                    x.last4 === res.data.card.last4
                )[0];

                dispatch(ACTION_BOOKED_WITH_CARD_ID(matchedDuplicateCard.id));
                changeSuccessfulCardNonce(true);
                changeClipLoaderActive(false);

                if (saveCardChecked) {
                  if (userAuthenticated) {
                    if (
                      props.getClientData.client.unsavedSquareCardIDs.includes(
                        matchedDuplicateCard.id
                      )
                    ) {
                      removeOneUnsavedSquareCardIDs({
                        variables: {
                          unsavedSquareCardID: matchedDuplicateCard.id,
                          firstName: props.getClientData.client.firstName,
                          lastName: props.getClientData.client.lastName,
                          email: props.getClientData.client.email,
                        },
                      });
                    }
                  }
                }

                return await axios.post(
                  `${
                    process.env.REACT_APP_ENV === "production"
                      ? process.env.REACT_APP_PRODUCTION_SERVER_URL
                      : "http://localhost:4000"
                  }/api/customers/delete_card`,
                  deleteCardData,
                  {
                    headers: {
                      Authorization:
                        "Bearer " +
                        process.env.REACT_APP_SQUARE_SANDBOX_ACCESS_TOKEN,
                      Accept: "application/json",
                      "Content-Type": "application/json",
                    },
                  }
                );
              }
            }

            dispatch(ACTION_BOOKED_WITH_CARD_ID(res.data.card.id));
            changeSuccessfulCardNonce(true);
            changeClipLoaderActive(false);

            if (!saveCardChecked && userAuthenticated) {
              updateUnsavedSquareCardIDs({
                variables: {
                  unsavedSquareCardID: res.data.card.id,
                  firstName: props.getClientData
                    ? props.getClientData.client.firstName
                    : firstName,
                  lastName: props.getClientData
                    ? props.getClientData.client.lastName
                    : lastName,
                  email: props.getClientData
                    ? props.getClientData.client.email
                    : email,
                },
              });

              props.clientDataRefetch();
            } else if (!userAuthenticated) {
              updateUnsavedSquareCardIDs({
                variables: {
                  unsavedSquareCardID: res.data.card.id,
                  firstName: matchedClient.firstName,
                  lastName: matchedClient.lastName,
                  email: matchedClient.email,
                },
              });

              getClientsDataRefetch();
            }
          })
          .catch((err) => {
            console.error(err);
          });
      };

      userAuthenticated
        ? props.getClientData.client.squareCustomerId
          ? cardHolderFirstName &&
            cardHolderLastName &&
            !selectedCreditCard.name
            ? returningClientSquarePostRequestFunction()
            : retrieveSquareCustomerFunction()
          : squarePostRequestFunction()
        : matchedClient
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
    } else if (!props.currentScreenSize) {
      if (props.initialScreenSize >= 1200) {
        return <Redirect to="/" />;
      }
    } else if (props.currentScreenSize >= 1200) {
      return <Redirect to="/" />;
    }
  };

  const redirectToCheckout = () => {
    if (successfulCardNonce) {
      if (!props.currentScreenSize) {
        if (props.initialScreenSize >= 1200) {
          dispatch(ACTION_CONFIRMATION_PAGE_OPENED());
        } else {
          dispatch(ACTION_CONFIRMATION_PAGE_OPENED());
          return <Redirect to="/checkout/confirmation" />;
        }
      } else {
        if (props.currentScreenSize >= 1200) {
          dispatch(ACTION_CONFIRMATION_PAGE_OPENED());
        } else {
          dispatch(ACTION_CONFIRMATION_PAGE_OPENED());
          return <Redirect to="/checkout/confirmation" />;
        }
      }
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
      (x) =>
        x.innerText === "CREDIT CARD" ||
        x.innerText === "EXPIRATION" ||
        x.innerText === "ZIP CODE" ||
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

  const checkMark = () => {
    return (
      <Spring from={{ x: 100 }} to={{ x: 0 }} config={{ duration: 2000 }}>
        {(styles) => (
          <svg
            width={
              props.currentScreenSize === ""
                ? props.initialScreenSize >= 1800
                  ? "2rem"
                  : props.initialScreenSize >= 1600
                  ? "1rem"
                  : props.initialScreenSize >= 1200
                  ? "0.5rem"
                  : "100%"
                : props.currentScreenSize >= 1800
                ? "2rem"
                : props.currentScreenSize >= 1600
                ? "1rem"
                : props.currentScreenSize >= 1200
                ? "0.5rem"
                : "100%"
            }
            height={
              props.currentScreenSize === ""
                ? props.initialScreenSize >= 1800
                  ? "2rem"
                  : props.initialScreenSize >= 1600
                  ? "1.3rem"
                  : props.initialScreenSize >= 1200
                  ? "0.5rem"
                  : props.initialScreenSize >= 360
                  ? "2rem"
                  : "1rem"
                : props.currentScreenSize >= 1800
                ? "2rem"
                : props.currentScreenSize >= 1600
                ? "1.3rem"
                : props.currentScreenSize >= 1200
                ? "0.5rem"
                : props.currentScreenSize >= 360
                ? "2rem"
                : "1rem"
            }
            style={{
              display: "block",
            }}
            viewBox="0 0 13.229 13.229"
          >
            <path
              d="M2.851 7.56l2.45 2.482 5.36-6.958"
              fill="none"
              stroke="#000"
              strokeDasharray="100"
              strokeDashoffset={pageOpened ? 0 : `${styles.x}`}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
          </svg>
        )}
      </Spring>
    );
  };

  const handleSaveCardChecked = () => {
    if (saveCardChecked) {
      dispatch(ACTION_SAVE_CARD_UNCHECKED());
    } else {
      dispatch(ACTION_SAVE_CARD_CHECKED());
    }
  };

  return (
    <>
      <div className="payment_info_container">
        {redirectToHome()}
        {redirectToCheckout()}
        <div
          className="clip_loader_spinner_container"
          style={{
            display: clipLoaderActive || squareFormLoading ? "flex" : "none",
          }}
        >
          <ClipLoader
            size={100}
            css={override}
            color={"rgb(44, 44, 52)"}
            loading={clipLoaderActive || squareFormLoading}
          />
        </div>
        <div className="payment_info_container_header">
          <Link
            to={() => {
              if (!props.currentScreenSize) {
                if (props.initialScreenSize >= 1200) {
                  return "/";
                } else {
                  if (userAuthenticated) {
                    return "/availability/timepreference";
                  } else {
                    return "/checkout";
                  }
                }
              } else {
                if (props.currentScreenSize >= 1200) {
                  return "/";
                } else {
                  if (userAuthenticated) {
                    return "/availability/timepreference";
                  } else {
                    return "/checkout";
                  }
                }
              }
            }}
            onClick={() => {
              if (userAuthenticated) {
                dispatch(ACTION_TIME_PREFERENCE_PAGE_OPENED());
              } else {
                dispatch(ACTION_GUEST_CHECKOUT_FORM_PAGE_PAGE_OPENED());
              }
            }}
          >
            <FontAwesomeIcon
              className="payment_info_back_arrow"
              icon={faChevronLeft}
            />
          </Link>
          <h1>PAYMENT INFO</h1>
          {userAuthenticated && bookedWithCardID ? (
            <Link
              to={() => {
                if (!props.currentScreenSize) {
                  if (props.initialScreenSize >= 1200) {
                    return "/";
                  } else {
                    return "/checkout/confirmation";
                  }
                } else {
                  if (props.currentScreenSize >= 1200) {
                    return "/";
                  } else {
                    return "/checkout/confirmation";
                  }
                }
              }}
              onClick={() => {
                dispatch(ACTION_CONFIRMATION_PAGE_OPENED());
              }}
            >
              <FontAwesomeIcon
                className="payment_info_forward_arrow"
                icon={faChevronRight}
              />
            </Link>
          ) : null}
        </div>
        <div className="payment_info_header">
          <h2>
            ENTER{" "}
            {!props.currentScreenSize
              ? props.initialScreenSize <= 360
                ? null
                : "YOUR"
              : props.currentScreenSize <= 360
              ? null
              : "YOUR"}{" "}
            PAYMENT INFORMATION
          </h2>
        </div>
        <p className="payment_info_statement">
          Your credit card will be used to hold your time slot and will not be
          charged until after your appointment. You may change your payment
          method after your service.
        </p>
        <div className="square_payment_form_container">
          <SquarePaymentForm
            sandbox={true}
            applicationId={process.env.REACT_APP_SQUARE_SANDBOX_APPLICATION_ID}
            locationId={process.env.REACT_APP_SQUARE_SANDBOX_LOCATION_ID}
            cardNonceResponseReceived={cardNonceResponseReceived}
            createVerificationDetails={createVerificationDetails}
            paymentFormLoaded={() => changeSquareFormLoading(false)}
            className="square_payment_form"
            placeholderCVV="CVC"
          >
            <fieldset className="sq-fieldset">
              {!userAuthenticated ||
              (userAuthenticated && !squareStoredCreditCards) ||
              (userAuthenticated && squareStoredCreditCards
                ? squareStoredCreditCards.filter(
                    (x) =>
                      !props.getClientData.client.unsavedSquareCardIDs.includes(
                        x.id
                      )
                  ).length === 0
                : false) ? null : (
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
                    disabled={
                      !userAuthenticated ||
                      (userAuthenticated && !squareStoredCreditCards) ||
                      (userAuthenticated && squareStoredCreditCards
                        ? squareStoredCreditCards.filter(
                            (x) =>
                              !props.getClientData.client.unsavedSquareCardIDs.includes(
                                x.id
                              )
                          ).length === 0
                        : false)
                    }
                    value={
                      userAuthenticated
                        ? bookedWithCardID
                          ? squareStoredCreditCards
                            ? JSON.stringify({
                                name:
                                  squareStoredCreditCards
                                    .filter((x) => x.id === bookedWithCardID)[0]
                                    .cardBrand.split("_")
                                    .join(" ") +
                                  " - " +
                                  squareStoredCreditCards.filter(
                                    (x) => x.id === bookedWithCardID
                                  )[0].last4,
                                id: bookedWithCardID,
                              })
                            : JSON.stringify({
                                name: selectedCreditCard.name,
                                id: selectedCreditCard.id,
                              })
                          : JSON.stringify({
                              name: selectedCreditCard.name,
                              id: selectedCreditCard.id,
                            })
                        : JSON.stringify({
                            name: selectedCreditCard.name,
                            id: selectedCreditCard.id,
                          })
                    }
                    onChange={(e) => {
                      const optionsArr = [
                        { name: "", id: "", index: 0 },
                      ].concat(
                        squareStoredCreditCards
                          .filter(
                            (x) =>
                              !props.getClientData.client.unsavedSquareCardIDs.includes(
                                x.id
                              )
                          )
                          .map((x, i) => {
                            return {
                              name:
                                x.cardBrand.split("_").join(" ") +
                                " - " +
                                x.last4,
                              id: x.id,
                              index: i,
                            };
                          })
                      );

                      let chosenItem = optionsArr.filter(
                        (item, index) =>
                          index === e.target.options.selectedIndex
                      )[0];

                      if (selectedCreditCard.name) {
                        dispatch(ACTION_BOOKED_WITH_CARD_ID_RESET());

                        changeSelectedCreditCard({
                          name: chosenItem.name,
                          id: chosenItem.id,
                        });

                        changeCardHolderFirstName(
                          squareCustomerInfo.givenName.toUpperCase()
                        );
                        changeCardHolderLastName(
                          squareCustomerInfo.familyName.toUpperCase()
                        );
                        if (e.target.value === "NEW CARD") {
                          dispatch(ACTION_BOOKED_WITH_CARD_ID_RESET());

                          changeSelectedCreditCard({ name: "", id: "" });
                          changeSelectedCreditCardFullData("");
                          changeCardHolderFirstName("");
                          changeCardHolderLastName("");
                        }
                      } else {
                        dispatch(ACTION_BOOKED_WITH_CARD_ID_RESET());

                        changeSelectedCreditCard({
                          name: chosenItem.name,
                          id: chosenItem.id,
                        });

                        changeCardHolderFirstName(
                          squareCustomerInfo.givenName.toUpperCase()
                        );
                        changeCardHolderLastName(
                          squareCustomerInfo.familyName.toUpperCase()
                        );
                      }
                    }}
                  >
                    <option>NEW CARD</option>
                    {renderStoredCreditCardOptions()}
                  </Input>
                </FormGroup>
              )}
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
                  disabled={selectedCreditCardFullData ? true : false}
                  onChange={handleCardHolderLastName}
                  value={cardHolderLastName}
                />
              </div>
              {selectedCreditCardFullData ? (
                <div className="sq_card_holder_container">
                  {/* Space in "CREDIT CARD " important to distinguish between new card and toggled card form inputs */}
                  <span className="sq-label">CREDIT CARD </span>
                  <input
                    name="credit_card"
                    type="text"
                    maxLength="100"
                    className="sq-cardholder-input"
                    disabled={selectedCreditCardFullData ? true : false}
                    value={
                      selectedCreditCardFullData.cardBrand.toLowerCase() ===
                      "american_express"
                        ? "•••• •••••• •" + selectedCreditCardFullData.last4
                        : "•••• •••• •••• " + selectedCreditCardFullData.last4
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

              {selectedCreditCardFullData ? (
                <div className="sq_third_container">
                  <div className="sq-form-third_credit_card">
                    {/* Space in "EXPIRATION " important to distinguish between new card and toggled card form inputs */}
                    <span className="sq-label">EXPIRATION </span>
                    <input
                      name="expiration_date"
                      type="text"
                      className="sq-cardholder-input"
                      disabled={selectedCreditCardFullData ? true : false}
                      value={
                        selectedCreditCardFullData.expMonth >= 10
                          ? selectedCreditCardFullData.expMonth.toString() +
                            "/" +
                            selectedCreditCardFullData.expYear
                              .toString()
                              .substr(-2)
                          : "0" +
                            selectedCreditCardFullData.expMonth.toString() +
                            "/" +
                            selectedCreditCardFullData.expYear
                              .toString()
                              .substr(-2)
                      }
                    />
                  </div>
                  <div className="sq-form-third_postal">
                    {/* Space in "ZIP CODE " important to distinguish between new card and toggled card form inputs */}
                    <span className="sq-label">ZIP CODE </span>
                    <input
                      name="postalCode"
                      type="text"
                      className="sq-cardholder-input"
                      disabled={selectedCreditCardFullData ? true : false}
                      value={"•••••"}
                    />
                  </div>
                  <div className="sq-form-third_cvv">
                    {/* Space in "CVC " important to distinguish between new card and toggled card form inputs */}
                    <span className="sq-label">CVC </span>
                    <input
                      name="cvc_code"
                      type="text"
                      className="sq-cardholder-input"
                      disabled={selectedCreditCardFullData ? true : false}
                      value={
                        selectedCreditCardFullData.cardBrand.toLowerCase() ===
                        "american_express"
                          ? "••••"
                          : "•••"
                      }
                    />
                  </div>
                </div>
              ) : null}
              {!selectedCreditCard.name &&
              !selectedCreditCard.id &&
              userAuthenticated ? (
                <div className="sq_save_card_information_container">
                  <span
                    className="fa-layers fa-fw client_consent_form_checkbox"
                    style={{
                      transform: !props.currentScreenSize
                        ? props.initialScreenSize >= 1200
                          ? "scale(1.5) translate(0%, -26%)"
                          : null
                        : props.currentScreenSize >= 1200
                        ? "scale(1.5) translate(0%, -26%)"
                        : null,
                    }}
                    onClick={handleSaveCardChecked}
                  >
                    <FontAwesomeIcon
                      color="rgba(155, 155, 155, 0.4)"
                      transform={
                        !props.currentScreenSize
                          ? props.initialScreenSize >= 360
                            ? "grow-20"
                            : "grow-10"
                          : props.currentScreenSize >= 360
                          ? "grow-20"
                          : "grow-10"
                      }
                      icon={faSquare}
                    />
                    {saveCardChecked ? checkMark() : null}
                  </span>
                  <p>Save this card information for future bookings?</p>
                </div>
              ) : null}
            </fieldset>
            {selectedCreditCardFullData ||
            (!selectedCreditCard.name &&
              (!cardHolderFirstName || !cardHolderLastName) &&
              errorMessages.length === 0) ? (
              <Link
                to={() => {
                  if (!props.currentScreenSize) {
                    if (props.initialScreenSize >= 1200) {
                      return "/";
                    } else {
                      return "/checkout/confirmation";
                    }
                  } else {
                    if (props.currentScreenSize >= 1200) {
                      return "/";
                    } else {
                      return "/checkout/confirmation";
                    }
                  }
                }}
                style={{
                  display: "block",
                  pointerEvents:
                    !selectedCreditCard.name &&
                    (!cardHolderFirstName || !cardHolderLastName)
                      ? "none"
                      : "auto",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (userAuthenticated) {
                    if (selectedCreditCardFullData) {
                      dispatch(
                        ACTION_BOOKED_WITH_CARD_ID(
                          selectedCreditCardFullData.id
                        )
                      );
                      dispatch(ACTION_CONFIRMATION_PAGE_OPENED());
                    }
                  }
                }}
              >
                <div className="sq-creditcard">Submit Card Information</div>
              </Link>
            ) : (
              <CreditCardSubmitButton style={{ cursor: "pointer" }}>
                Submit Card Information
              </CreditCardSubmitButton>
            )}
          </SquarePaymentForm>
          {selectedCreditCardFullData && errorMessages.length === 0 ? null : (
            <div className="sq-error-message">
              {errorMessages.map((errorMessage) => (
                <li key={`sq-error-${errorMessage}`}>{errorMessage}</li>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentInfo;
