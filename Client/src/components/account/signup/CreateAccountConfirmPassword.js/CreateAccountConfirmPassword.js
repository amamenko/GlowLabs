import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, FormFeedback, Label, Input } from "reactstrap";
import "../SignUp.css";
import ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD from "../../../../actions/CreateAccount/CreateAccountConfirmPassword/ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD";
import ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD_NOT_INVALID from "../../../../actions/CreateAccount/CreateAccountConfirmPassword/Validation/Invalid/ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD_NOT_INVALID";
import ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD_VALID from "../../../../actions/CreateAccount/CreateAccountConfirmPassword/Validation/Valid/ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD_VALID";
import ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD_INVALID from "../../../../actions/CreateAccount/CreateAccountConfirmPassword/Validation/Invalid/ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD_INVALID";
import ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD_NOT_VALID from "../../../../actions/CreateAccount/CreateAccountConfirmPassword/Validation/Valid/ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD_NOT_VALID";
import ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD_RESET from "../../../../actions/CreateAccount/CreateAccountConfirmPassword/ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD_RESET";

const CreateAccountConfirmPassword = () => {
  const dispatch = useDispatch();

  // Confirm Password States
  const createAccountConfirmPassword = useSelector(
    (state) =>
      state.createAccountConfirmPassword.create_account_confirm_password
  );
  const createAccountPassword = useSelector(
    (state) => state.createAccountPassword.create_account_password
  );
  const createAccountConfirmPasswordValid = useSelector(
    (state) =>
      state.createAccountConfirmPasswordValid
        .create_account_confirm_password_valid
  );
  const createAccountConfirmPasswordInvalid = useSelector(
    (state) =>
      state.createAccountConfirmPasswordInvalid
        .create_account_confirm_password_invalid
  );

  useEffect(() => {
    if (createAccountConfirmPassword === createAccountPassword) {
      dispatch(ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD_NOT_INVALID());
      dispatch(ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD_VALID());
    } else {
      dispatch(ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD_INVALID());
      dispatch(ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD_NOT_VALID());
    }
  }, [dispatch, createAccountConfirmPassword, createAccountPassword]);

  const handleConfirmPassword = (e) => {
    dispatch(
      ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD(e.currentTarget.value.trim())
    );
  };

  const confirmPasswordTyping = (e) => {
    dispatch(ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD_RESET());

    if (e.target.value === createAccountPassword) {
      ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD(e.target.value);
      dispatch(ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD_NOT_INVALID());
      dispatch(ACTION_CREATE_ACCOUNT_CONFIRM_PASSWORD_VALID());
    }
  };

  return (
    <FormGroup className="sign_up_individual_form_field">
      <Label for="createAccountConfirmPassword">
        <div className="required_label">
          Confirm Password<p className="required_label red_asterisk">* </p>
        </div>
      </Label>
      <Input
        type="password"
        name="createAccountConfirmPassword"
        defaultValue={createAccountConfirmPassword}
        maxLength={128}
        placeholder="Confirm Password"
        className="input_field_sign_up"
        onChange={confirmPasswordTyping}
        onBlur={handleConfirmPassword}
        invalid={
          createAccountConfirmPassword === ""
            ? false
            : createAccountConfirmPasswordInvalid
            ? true
            : false
        }
        valid={
          createAccountConfirmPassword === ""
            ? false
            : createAccountConfirmPasswordValid
            ? true
            : false
        }
      />
      {createAccountConfirmPassword === createAccountPassword ? null : (
        <FormFeedback className="invalid_message_container" invalid="true">
          Passwords must match.
        </FormFeedback>
      )}
    </FormGroup>
  );
};

export default CreateAccountConfirmPassword;
