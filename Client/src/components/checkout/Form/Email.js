import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, FormFeedback, Label, Input } from "reactstrap";
import isEmail from "validator/lib/isEmail";
import { useQuery } from "@apollo/react-hooks";
import getClientsQuery from "../../../graphql/queries/getClientsQuery";
import ACTION_EMAIL from "../../../actions/GuestCheckoutForm/Email/ACTION_EMAIL";
import ACTION_EMAIL_RESET from "../../../actions/GuestCheckoutForm/Email/ACTION_EMAIL_RESET";
import ACTION_EMAIL_NOT_INVALID from "../../../actions/EmailValidation/Invalid/ACTION_EMAIL_NOT_INVALID";
import ACTION_EMAIL_VALID from "../../../actions/EmailValidation/Valid/ACTION_EMAIL_VALID";
import ACTION_EMAIL_INVALID from "../../../actions/EmailValidation/Invalid/ACTION_EMAIL_INVALID";
import ACTION_EMAIL_NOT_VALID from "../../../actions/EmailValidation/Valid/ACTION_EMAIL_NOT_VALID";
import ACTION_BOOKING_SUMMARY_NOT_ACTIVE from "../../../actions/ContinueToBookingSummaryButtonActive/ACTION_BOOKING_SUMMARY_NOT_ACTIVE";
import "../GuestCheckout.css";

const Email = () => {
  const dispatch = useDispatch();

  // Email States
  const email = useSelector((state) => state.email.email);
  const emailIsValid = useSelector((state) => state.emailIsValid.email_valid);
  const emailIsInvalid = useSelector(
    (state) => state.emailIsInvalid.email_invalid
  );
  const [emailAlreadyRegistered, changeEmailAlreadyRegistered] = useState(
    false
  );

  // Regular Expression for Email Validation - allows only one @ and only one period while not allowing special characters or spaces
  const emailReg = /^[^\s@#!]+@{1}[^\s@.#!]+\.{1}[^\s@.]+$/;

  const { data } = useQuery(getClientsQuery, {
    fetchPolicy: "no-cache",
  });

  const validateEmail = (e) => {
    const validEmail = emailReg.test(e.currentTarget.value);
    const validatorTest = isEmail(e.currentTarget.value);
    dispatch(ACTION_EMAIL(e.currentTarget.value.trim()));

    if (!emailAlreadyRegistered) {
      if (validEmail && validatorTest) {
        dispatch(ACTION_EMAIL_NOT_INVALID());
        dispatch(ACTION_EMAIL_VALID());
      } else {
        dispatch(ACTION_EMAIL_INVALID());
        dispatch(ACTION_EMAIL_NOT_VALID());
        dispatch(ACTION_BOOKING_SUMMARY_NOT_ACTIVE());
      }
    } else {
      dispatch(ACTION_EMAIL_INVALID());
      dispatch(ACTION_EMAIL_NOT_VALID());
      dispatch(ACTION_BOOKING_SUMMARY_NOT_ACTIVE());
    }
  };

  useMemo(() => {
    if (email) {
      if (data) {
        for (let i = 0; i < data.clients.length; i++) {
          if (data.clients[i].email === email) {
            if (
              data.clients[i].password !== null ||
              data.clients[i].tokenCount > 0
            ) {
              changeEmailAlreadyRegistered(true);
              dispatch(ACTION_EMAIL_INVALID());
              dispatch(ACTION_EMAIL_NOT_VALID());
              dispatch(ACTION_BOOKING_SUMMARY_NOT_ACTIVE());
            }
          }
        }
      }
    }
  }, [dispatch, data, email]);

  const emailTyping = () => {
    dispatch(ACTION_EMAIL_RESET());
    changeEmailAlreadyRegistered(false);
  };

  return (
    <FormGroup>
      <Label for="guestEmail">
        <div className="required_label">
          Email<p className="required_label red_asterisk">* </p>
        </div>
      </Label>
      <Input
        type="email"
        name="email"
        defaultValue={email}
        maxLength={128}
        placeholder="Email address"
        className="input_field"
        onChange={emailTyping}
        onBlur={validateEmail}
        invalid={email === "" ? false : emailIsInvalid ? true : false}
        valid={email === "" ? false : emailIsValid ? true : false}
      />
      {emailAlreadyRegistered ? (
        <FormFeedback invalid="true">
          This email has already been registered.
        </FormFeedback>
      ) : (
        <FormFeedback invalid="true">
          Please enter a valid email address.
        </FormFeedback>
      )}
    </FormGroup>
  );
};

export default Email;
