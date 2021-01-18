import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, FormFeedback, Label, Input } from "reactstrap";
import "../SignUp.css";
import ACTION_CREATE_ACCOUNT_PASSWORD from "../../../../actions/CreateAccount/CreateAccountPassword/ACTION_CREATE_ACCOUNT_PASSWORD";
import ACTION_CREATE_ACCOUNT_PASSWORD_NOT_INVALID from "../../../../actions/CreateAccount/CreateAccountPassword/Validation/Invalid/ACTION_CREATE_ACCOUNT_PASSWORD_NOT_INVALID";
import ACTION_CREATE_ACCOUNT_PASSWORD_VALID from "../../../../actions/CreateAccount/CreateAccountPassword/Validation/Valid/ACTION_CREATE_ACCOUNT_PASSWORD_VALID";
import ACTION_CREATE_ACCOUNT_PASSWORD_INVALID from "../../../../actions/CreateAccount/CreateAccountPassword/Validation/Invalid/ACTION_CREATE_ACCOUNT_PASSWORD_INVALID";
import ACTION_CREATE_ACCOUNT_PASSWORD_NOT_VALID from "../../../../actions/CreateAccount/CreateAccountPassword/Validation/Valid/ACTION_CREATE_ACCOUNT_PASSWORD_NOT_VALID";
import ACTION_CREATE_ACCOUNT_PASSWORD_RESET from "../../../../actions/CreateAccount/CreateAccountPassword/ACTION_CREATE_ACCOUNT_PASSWORD_RESET";

const CreateAccountPassword = () => {
  const dispatch = useDispatch();

  // Password States
  const createAccountPassword = useSelector(
    (state) => state.createAccountPassword.create_account_password
  );
  const createAccountPasswordValid = useSelector(
    (state) => state.createAccountPasswordValid.create_account_password_valid
  );
  const createAccountPasswordInvalid = useSelector(
    (state) =>
      state.createAccountPasswordInvalid.create_account_password_invalid
  );

  // Regular Expression for Password Validation - must be at least 8 characters long, must contain at least 1 lowercase character, 1 uppercase character, and 1 number
  const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const validatePassword = (e) => {
    const validPassword = passwordReg.test(e.currentTarget.value);
    dispatch(ACTION_CREATE_ACCOUNT_PASSWORD(e.currentTarget.value.trim()));

    if (validPassword) {
      dispatch(ACTION_CREATE_ACCOUNT_PASSWORD_NOT_INVALID());
      dispatch(ACTION_CREATE_ACCOUNT_PASSWORD_VALID());
    } else {
      dispatch(ACTION_CREATE_ACCOUNT_PASSWORD_INVALID());
      dispatch(ACTION_CREATE_ACCOUNT_PASSWORD_NOT_VALID());
    }
  };

  const passwordTyping = () => {
    dispatch(ACTION_CREATE_ACCOUNT_PASSWORD_RESET());
  };

  return (
    <FormGroup className="sign_up_individual_form_field">
      <Label for="createAccountPassword">
        <div className="required_label">
          Password<p className="required_label red_asterisk">* </p>
        </div>
      </Label>
      <Input
        type="password"
        name="createAccountPassword"
        defaultValue={createAccountPassword}
        maxLength={128}
        autoFocus
        placeholder="Password"
        className="input_field_sign_up"
        onChange={passwordTyping}
        onBlur={validatePassword}
        invalid={
          createAccountPassword === ""
            ? false
            : createAccountPasswordInvalid
            ? true
            : false
        }
        valid={
          createAccountPassword === ""
            ? false
            : createAccountPasswordValid
            ? true
            : false
        }
      />
      {createAccountPassword.length < 8 ? (
        <FormFeedback className="invalid_message_container" invalid="true">
          Password must be at least 8 characters long.
        </FormFeedback>
      ) : (
        <FormFeedback className="invalid_message_container" invalid="true">
          Password must contain at least 1 lowercase character, 1 uppercase
          character, and 1 number.
        </FormFeedback>
      )}
    </FormGroup>
  );
};

export default CreateAccountPassword;
