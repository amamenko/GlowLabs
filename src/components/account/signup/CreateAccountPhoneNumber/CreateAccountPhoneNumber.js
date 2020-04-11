import React, { useMemo, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, FormFeedback, Label, Input } from "reactstrap";
import { useQuery } from "@apollo/react-hooks";
import { getClientsQuery } from "../../../../graphql/queries/queries";
import "../SignUp.css";
import ACTION_CREATE_ACCOUNT_PHONE_NUMBER_VALID from "../../../../actions/CreateAccount/CreateAccountPhoneNumber/Validation/Valid/ACTION_CREATE_ACCOUNT_PHONE_NUMBER_VALID";
import ACTION_CREATE_ACCOUNT_PHONE_NUMBER_NOT_INVALID from "../../../../actions/CreateAccount/CreateAccountPhoneNumber/Validation/Invalid/ACTION_CREATE_ACCOUNT_PHONE_NUMBER_NOT_INVALID";
import ACTION_CREATE_ACCOUNT_PHONE_NUMBER_NOT_VALID from "../../../../actions/CreateAccount/CreateAccountPhoneNumber/Validation/Valid/ACTION_CREATE_ACCOUNT_PHONE_NUMBER_NOT_VALID";
import ACTION_CREATE_ACCOUNT_PHONE_NUMBER_INVALID from "../../../../actions/CreateAccount/CreateAccountPhoneNumber/Validation/Invalid/ACTION_CREATE_ACCOUNT_PHONE_NUMBER_INVALID";
import ACTION_CREATE_ACCOUNT_PHONE_NUMBER from "../../../../actions/CreateAccount/CreateAccountPhoneNumber/ACTION_CREATE_ACCOUNT_PHONE_NUMBER";
import ACTION_CREATE_ACCOUNT_PHONE_NUMBER_RESET from "../../../../actions/CreateAccount/CreateAccountPhoneNumber/ACTION_CREATE_ACCOUNT_PHONE_NUMBER_RESET";

const PhoneNumber = () => {
  const dispatch = useDispatch();
  // Phone Number States
  const createAccountPhoneNumber = useSelector(
    state => state.createAccountPhoneNumber.create_account_phone_number
  );
  const createAccountPhoneNumberValid = useSelector(
    state =>
      state.createAccountPhoneNumberValid.create_account_phone_number_valid
  );
  const createAccountPhoneNumberInvalid = useSelector(
    state =>
      state.createAccountPhoneNumberInvalid.create_account_phone_number_invalid
  );
  const facebookCompleteRegistration = useSelector(
    state =>
      state.facebookCompleteRegistration.facebook_complete_registration_active
  );

  const [
    phoneNumberAlreadyRegistered,
    changePhoneNumberAlreadyRegistered
  ] = useState(false);

  // Regular Expression for Phone Number Validation - allows only phone numbers in the format (xxx) xxx - xxx, with x values being digits
  const phoneNumberReg = /^(\(\d\d\d\))+\s+(\d\d\d)+\s+(-)+\s+(\d\d\d\d)$/g;

  // Regular Expression for Autocompleted Phone Numbers - allows phone numbers in the format 1xxxxxxxxxx, with x values being digits and the leading 1 country code being optional.
  const phoneNumberAutocompleteReg = /^(1*\d{10})$/g;

  const { data } = useQuery(getClientsQuery, {
    fetchPolicy: "no-cache"
  });

  useMemo(() => {
    if (createAccountPhoneNumber) {
      if (data) {
        for (let i = 0; i < data.clients.length; i++) {
          if (
            data.clients[i].phoneNumber === createAccountPhoneNumber &&
            data.clients[i].password !== null
          ) {
            changePhoneNumberAlreadyRegistered(true);
            dispatch(ACTION_CREATE_ACCOUNT_PHONE_NUMBER_NOT_VALID());
            dispatch(ACTION_CREATE_ACCOUNT_PHONE_NUMBER_INVALID());
          }
        }
      }
    }
  }, [data, createAccountPhoneNumber, dispatch]);

  useEffect(() => {
    const validatePhoneNumber = number => {
      const validPhoneNumber = phoneNumberReg.test(number);
      const validPhoneAutocomplete = phoneNumberAutocompleteReg.test(number);

      if (!phoneNumberAlreadyRegistered) {
        if (validPhoneNumber | validPhoneAutocomplete) {
          dispatch(ACTION_CREATE_ACCOUNT_PHONE_NUMBER_VALID());
          dispatch(ACTION_CREATE_ACCOUNT_PHONE_NUMBER_NOT_INVALID());
        } else {
          dispatch(ACTION_CREATE_ACCOUNT_PHONE_NUMBER_NOT_VALID());
          dispatch(ACTION_CREATE_ACCOUNT_PHONE_NUMBER_INVALID());
        }
      } else {
        dispatch(ACTION_CREATE_ACCOUNT_PHONE_NUMBER_NOT_VALID());
        dispatch(ACTION_CREATE_ACCOUNT_PHONE_NUMBER_INVALID());
      }
    };

    if (createAccountPhoneNumber.length === 16) {
      validatePhoneNumber(createAccountPhoneNumber);
    }
  }, [
    createAccountPhoneNumber,
    dispatch,
    phoneNumberAlreadyRegistered,
    phoneNumberAutocompleteReg,
    phoneNumberReg
  ]);

  const phoneNumberTyping = e => {
    let currentTyping = e.currentTarget.value;

    if (createAccountPhoneNumber.length !== 15) {
      if (createAccountPhoneNumberValid) {
        dispatch(ACTION_CREATE_ACCOUNT_PHONE_NUMBER_NOT_VALID());
      }
    }

    if (phoneNumberAlreadyRegistered) {
      changePhoneNumberAlreadyRegistered(false);
    }
    if (createAccountPhoneNumberInvalid) {
      dispatch(ACTION_CREATE_ACCOUNT_PHONE_NUMBER_NOT_INVALID());
    }

    dispatch(ACTION_CREATE_ACCOUNT_PHONE_NUMBER(e.currentTarget.value));

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

  const phoneNumberKeyTyping = e => {
    if (
      (e.keyCode >= 8 && e.keyCode < 32) ||
      (e.keyCode >= 96 && e.keyCode <= 105) ||
      (e.keyCode >= 48 && e.keyCode <= 57)
    ) {
      return e.keyCode;
    } else {
      e.preventDefault();
    }
  };

  return (
    <FormGroup className="sign_up_individual_form_field">
      <Label for="createAccountPhoneNumber">
        <div className="required_label">
          Phone Number
          <p className="required_label red_asterisk">
            {facebookCompleteRegistration ? null : "* "}
          </p>
        </div>
      </Label>
      <Input
        type="tel"
        name="createAccountPhoneNumber"
        maxLength={16}
        onKeyDown={phoneNumberKeyTyping}
        defaultValue={createAccountPhoneNumber}
        placeholder="Phone number"
        onChange={phoneNumberTyping}
        className="input_field_sign_up"
        invalid={
          createAccountPhoneNumber === ""
            ? false
            : createAccountPhoneNumberInvalid
            ? true
            : false
        }
        valid={
          createAccountPhoneNumber === ""
            ? false
            : createAccountPhoneNumberValid
            ? true
            : false
        }
      />
      {phoneNumberAlreadyRegistered ? (
        <FormFeedback className="invalid_message_container" invalid="true">
          This phone number has already been registered.
        </FormFeedback>
      ) : (
        <FormFeedback className="invalid_message_container" invalid="true">
          Please enter a valid phone number.
        </FormFeedback>
      )}
    </FormGroup>
  );
};

export default PhoneNumber;
