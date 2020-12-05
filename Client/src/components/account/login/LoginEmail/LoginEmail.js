import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, FormFeedback, Label, Input } from "reactstrap";
import ACTION_LOGIN_EMAIL from "../../../../actions/Login/LoginEmail/ACTION_LOGIN_EMAIL";
import ACTION_REGISTERED_CLIENT_FOUND_RESET from "../../../../actions/Login/RegisteredClientFound/ACTION_REGISTERED_CLIENT_FOUND_RESET";
import ACTION_LOGIN_EMAIL_NOT_INVALID from "../../../../actions/Login/LoginEmail/Invalid/ACTION_LOGIN_EMAIL_NOT_INVALID";
import ACTION_LOGIN_PASSWORD_NOT_INVALID from "../../../../actions/Login/LoginPassword/Invalid/ACTION_LOGIN_PASSWORD_NOT_INVALID";
import "../Login.css";

const LoginEmail = () => {
  const dispatch = useDispatch();

  // Email States
  const loginEmail = useSelector(state => state.loginEmail.login_email);
  const loginEmailInvalid = useSelector(
    state => state.loginEmailInvalid.login_email_invalid
  );

  const emailTyping = e => {
    dispatch(ACTION_LOGIN_EMAIL(e.currentTarget.value.trim()));
    dispatch(ACTION_REGISTERED_CLIENT_FOUND_RESET());
    dispatch(ACTION_LOGIN_PASSWORD_NOT_INVALID());
    dispatch(ACTION_LOGIN_EMAIL_NOT_INVALID());
  };

  return (
    <FormGroup>
      <Label for="loginEmail">
        <div className="required_label">Email</div>
      </Label>
      <Input
        type="email"
        name="loginEmail"
        defaultValue={loginEmail}
        maxLength={128}
        placeholder="Email address"
        className="input_field_sign_up"
        onChange={emailTyping}
        invalid={loginEmail === "" ? false : loginEmailInvalid ? true : false}
      />
      {loginEmailInvalid ? (
        <FormFeedback invalid="true">
          No registered client found with this email.
        </FormFeedback>
      ) : null}
    </FormGroup>
  );
};

export default LoginEmail;
