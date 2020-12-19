import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, FormFeedback, Label, Input } from "reactstrap";
import { useQuery } from "@apollo/react-hooks";
import getClientsQuery from "../../../graphql/queries/getClientsQuery";
import ACTION_PHONE_NUMBER_RESET from "../../../actions/GuestCheckoutForm/PhoneNumber/ACTION_PHONE_NUMBER_RESET";
import ACTION_PHONE_NUMBER from "../../../actions/GuestCheckoutForm/PhoneNumber/ACTION_PHONE_NUMBER";
import ACTION_PHONE_VALID from "../../../actions/PhoneNumberValidation/Valid/ACTION_PHONE_VALID";
import ACTION_PHONE_NOT_INVALID from "../../../actions/PhoneNumberValidation/Invalid/ACTION_PHONE_NOT_INVALID";
import ACTION_PHONE_NOT_VALID from "../../../actions/PhoneNumberValidation/Valid/ACTION_PHONE_NOT_VALID";
import ACTION_PHONE_INVALID from "../../../actions/PhoneNumberValidation/Invalid/ACTION_PHONE_INVALID";
import ACTION_BOOKING_SUMMARY_NOT_ACTIVE from "../../../actions/ContinueToBookingSummaryButtonActive/ACTION_BOOKING_SUMMARY_NOT_ACTIVE";
import "../GuestCheckout.css";

const PhoneNumber = () => {
  const dispatch = useDispatch();
  // Phone Number States
  const phoneNumber = useSelector((state) => state.phoneNumber.phone_number);
  const phoneIsValid = useSelector((state) => state.phoneIsValid.phone_valid);
  const phoneIsInvalid = useSelector(
    (state) => state.phoneIsInvalid.phone_invalid
  );
  const [
    phoneNumberAlreadyRegistered,
    changePhoneNumberAlreadyRegistered,
  ] = useState(false);

  // Regular Expression for Phone Number Validation - allows only phone numbers in the format (xxx) xxx - xxx, with x values being digits
  const phoneNumberReg = /^(\(\d\d\d\))+\s+(\d\d\d)+\s+(-)+\s+(\d\d\d\d)$/g;

  // Regular Expression for Autocompleted Phone Numbers - allows phone numbers in the format 1xxxxxxxxxx, with x values being digits and the leading 1 country code being optional.
  const phoneNumberAutocompleteReg = /^(1*\d{10})$/g;

  const { data } = useQuery(getClientsQuery, {
    fetchPolicy: "no-cache",
  });

  const validatePhoneNumber = (number) => {
    const validPhoneNumber = phoneNumberReg.test(number);
    const validPhoneAutocomplete = phoneNumberAutocompleteReg.test(number);

    if (!phoneNumberAlreadyRegistered) {
      if (validPhoneNumber || validPhoneAutocomplete) {
        dispatch(ACTION_PHONE_VALID());
        dispatch(ACTION_PHONE_NOT_INVALID());
      } else {
        dispatch(ACTION_PHONE_NOT_VALID());
        dispatch(ACTION_PHONE_INVALID());
        dispatch(ACTION_BOOKING_SUMMARY_NOT_ACTIVE());
      }
    } else {
      dispatch(ACTION_PHONE_NOT_VALID());
      dispatch(ACTION_PHONE_INVALID());
      dispatch(ACTION_BOOKING_SUMMARY_NOT_ACTIVE());
    }
  };

  const handlePhoneNumber = (e) => {
    validatePhoneNumber(e.currentTarget.value);
    dispatch(ACTION_PHONE_NUMBER(e.currentTarget.value));
  };

  useMemo(() => {
    if (phoneNumber) {
      if (data) {
        for (let i = 0; i < data.clients.length; i++) {
          if (
            data.clients[i].phoneNumber === phoneNumber &&
            (data.clients[i].password !== null ||
              data.clients[i].tokenCount > 0)
          ) {
            changePhoneNumberAlreadyRegistered(true);
            dispatch(ACTION_PHONE_NOT_VALID());
            dispatch(ACTION_PHONE_INVALID());
            dispatch(ACTION_BOOKING_SUMMARY_NOT_ACTIVE());
          }
        }
      }
    }
  }, [data, phoneNumber, dispatch]);

  const phoneNumberTyping = (e) => {
    let currentTyping = e.currentTarget.value;

    changePhoneNumberAlreadyRegistered(false);
    dispatch(ACTION_PHONE_NUMBER_RESET());

    // Formatting for US Phone Numbers
    if (currentTyping.length === 3) {
      currentTyping = currentTyping.split("");
      currentTyping.unshift("(");
      currentTyping.push(") ");

      currentTyping = currentTyping.join("");
    } else {
      if (currentTyping.length === 4) {
        if (
          currentTyping.indexOf("(") === 0 &&
          currentTyping.indexOf(")") < 0
        ) {
          currentTyping = currentTyping.split("");
          currentTyping.splice(currentTyping.indexOf("("), 1);

          currentTyping = currentTyping.join("");
        } else {
          if (
            currentTyping.indexOf("(") < 0 &&
            currentTyping.indexOf(")") < 0
          ) {
            currentTyping = currentTyping.split("");
            currentTyping.unshift("(");
            currentTyping.splice(4, 0, ") ");

            currentTyping = currentTyping.join("");
          }
        }
      } else {
        if (currentTyping.length === 6) {
          if (currentTyping.indexOf(" ") < 0) {
            currentTyping = currentTyping.split("");
            currentTyping.splice(5, 0, " ");

            currentTyping = currentTyping.join("");
          }
        } else {
          if (currentTyping.length === 10) {
            if (currentTyping.lastIndexOf(" ") === 5) {
              currentTyping = currentTyping.split("");
              currentTyping.splice(9, 0, " - ");

              currentTyping = currentTyping.join("");
            } else {
              if (currentTyping.indexOf("(") < 0) {
                currentTyping = currentTyping.split("");
                currentTyping.unshift("(");
                currentTyping.splice(4, 0, ") ");
                currentTyping.splice(8, 0, " - ");
                currentTyping = currentTyping.join("");
              }
            }
          } else {
            if (currentTyping.length === 11) {
              if (
                currentTyping.lastIndexOf(" ") === 9 &&
                currentTyping.indexOf("-") < 0
              ) {
                currentTyping = currentTyping.split("");
                currentTyping.splice(9, 0, " -");

                currentTyping = currentTyping.join("");
              }
            } else {
              if (currentTyping.length === 12) {
                if (currentTyping.lastIndexOf(" ") === 9) {
                  currentTyping = currentTyping.split("");
                  currentTyping.splice(11, 0, " ");

                  currentTyping = currentTyping.join("");
                }
              }
            }
          }
        }
      }
    }
    e.currentTarget.value = currentTyping;
  };

  const phoneNumberKeyTyping = (e) => {
    if (
      (e.keyCode >= 8 && e.keyCode < 32) ||
      (e.keyCode >= 37 && e.keyCode <= 40) ||
      (e.keyCode >= 96 && e.keyCode <= 105) ||
      (e.keyCode >= 48 && e.keyCode <= 57)
    ) {
      return e.keyCode;
    } else {
      e.preventDefault();
    }
  };

  return (
    <FormGroup>
      <Label for="phoneNumber">
        <div className="required_label">
          Phone Number<p className="required_label red_asterisk">* </p>
        </div>
      </Label>
      <Input
        type="tel"
        name="phoneNumber"
        maxLength={16}
        onKeyDown={phoneNumberKeyTyping}
        defaultValue={phoneNumber}
        placeholder="Phone number"
        onChange={phoneNumberTyping}
        onBlur={handlePhoneNumber}
        className="input_field"
        invalid={phoneNumber === "" ? false : phoneIsInvalid ? true : false}
        valid={phoneNumber === "" ? false : phoneIsValid ? true : false}
      />
      {phoneNumberAlreadyRegistered ? (
        <FormFeedback invalid="true">
          This phone number has already been registered.
        </FormFeedback>
      ) : (
        <FormFeedback invalid="true">
          Please enter a valid phone number.
        </FormFeedback>
      )}
    </FormGroup>
  );
};

export default PhoneNumber;
