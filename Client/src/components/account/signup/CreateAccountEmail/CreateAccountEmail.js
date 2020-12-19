import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, FormFeedback, Label, Input } from "reactstrap";
import { useQuery } from "@apollo/react-hooks";
import getClientsQuery from "../../../../graphql/queries/getClientsQuery";
import isEmail from "validator/lib/isEmail";
import ACTION_CREATE_ACCOUNT_EMAIL from "../../../../actions/CreateAccount/CreateAccountEmail/ACTION_CREATE_ACCOUNT_EMAIL";
import ACTION_CREATE_ACCOUNT_EMAIL_NOT_INVALID from "../../../../actions/CreateAccount/CreateAccountEmail/Validation/Invalid/ACTION_CREATE_ACCOUNT_EMAIL_NOT_INVALID";
import ACTION_CREATE_ACCOUNT_EMAIL_VALID from "../../../../actions/CreateAccount/CreateAccountEmail/Validation/Valid/ACTION_CREATE_ACCOUNT_EMAIL_VALID";
import ACTION_CREATE_ACCOUNT_EMAIL_INVALID from "../../../../actions/CreateAccount/CreateAccountEmail/Validation/Invalid/ACTION_CREATE_ACCOUNT_EMAIL_INVALID";
import ACTION_CREATE_ACCOUNT_EMAIL_NOT_VALID from "../../../../actions/CreateAccount/CreateAccountEmail/Validation/Valid/ACTION_CREATE_ACCOUNT_EMAIL_NOT_VALID";
import ACTION_CREATE_ACCOUNT_EMAIL_RESET from "../../../../actions/CreateAccount/CreateAccountEmail/ACTION_CREATE_ACCOUNT_EMAIL_RESET";
import "../SignUp.css";

const CreateAccountEmail = () => {
  const dispatch = useDispatch();

  // Email States
  const createAccountEmail = useSelector(
    (state) => state.createAccountEmail.create_account_email
  );
  const createAccountEmailValid = useSelector(
    (state) => state.createAccountEmailValid.create_account_email_valid
  );
  const createAccountEmailInvalid = useSelector(
    (state) => state.createAccountEmailInvalid.create_account_email_invalid
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
    dispatch(ACTION_CREATE_ACCOUNT_EMAIL(e.currentTarget.value.trim()));

    if (!emailAlreadyRegistered) {
      if (validEmail && validatorTest) {
        dispatch(ACTION_CREATE_ACCOUNT_EMAIL_NOT_INVALID());
        dispatch(ACTION_CREATE_ACCOUNT_EMAIL_VALID());
      } else {
        dispatch(ACTION_CREATE_ACCOUNT_EMAIL_INVALID());
        dispatch(ACTION_CREATE_ACCOUNT_EMAIL_NOT_VALID());
      }
    } else {
      dispatch(ACTION_CREATE_ACCOUNT_EMAIL_NOT_INVALID());
      dispatch(ACTION_CREATE_ACCOUNT_EMAIL_VALID());
    }
  };

  useMemo(() => {
    if (createAccountEmail) {
      if (data) {
        for (let i = 0; i < data.clients.length; i++) {
          if (data.clients[i].email === createAccountEmail) {
            if (
              data.clients[i].password !== null ||
              data.clients[i].tokenCount > 0
            ) {
              changeEmailAlreadyRegistered(true);
              dispatch(ACTION_CREATE_ACCOUNT_EMAIL_INVALID());
              dispatch(ACTION_CREATE_ACCOUNT_EMAIL_NOT_VALID());
            }
          }
        }
      }
    }
  }, [dispatch, data, createAccountEmail]);

  const emailTyping = () => {
    dispatch(ACTION_CREATE_ACCOUNT_EMAIL_RESET());
    changeEmailAlreadyRegistered(false);
  };

  return (
    <FormGroup className="sign_up_individual_form_field">
      <Label for="createAccountEmail">
        <div className="required_label">
          Email<p className="required_label red_asterisk">* </p>
        </div>
      </Label>
      <Input
        type="email"
        name="createAccountEmail"
        defaultValue={createAccountEmail}
        maxLength={128}
        placeholder="Email address"
        className="input_field_sign_up"
        onChange={emailTyping}
        onBlur={validateEmail}
        invalid={
          createAccountEmail === ""
            ? false
            : createAccountEmailInvalid
            ? true
            : false
        }
        valid={
          createAccountEmail === ""
            ? false
            : createAccountEmailValid
            ? true
            : false
        }
      />
      {emailAlreadyRegistered ? (
        <FormFeedback className="invalid_message_container" invalid="true">
          This email has already been registered.
        </FormFeedback>
      ) : (
        <FormFeedback className="invalid_message_container" invalid="true">
          Please enter a valid email address.
        </FormFeedback>
      )}
    </FormGroup>
  );
};

export default CreateAccountEmail;
