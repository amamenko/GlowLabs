import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, FormFeedback, Label, Input } from "reactstrap";
import ACTION_LOGIN_PASSWORD from "../../../../actions/Login/LoginPassword/ACTION_LOGIN_PASSWORD";
import ACTION_LOGIN_EMAIL_NOT_INVALID from "../../../../actions/Login/LoginEmail/Invalid/ACTION_LOGIN_EMAIL_NOT_INVALID";
import ACTION_LOGIN_PASSWORD_NOT_INVALID from "../../../../actions/Login/LoginPassword/Invalid/ACTION_LOGIN_PASSWORD_NOT_INVALID";
import "../Login.css";

const LoginPassword = (props) => {
  const { handleLoginClick } = props;
  const dispatch = useDispatch();

  // Password States
  const loginPassword = useSelector(
    (state) => state.loginPassword.login_password
  );
  const loginPasswordInvalid = useSelector(
    (state) => state.loginPasswordInvalid.login_password_invalid
  );

  const passwordTyping = (e) => {
    dispatch(ACTION_LOGIN_PASSWORD(e.currentTarget.value.trim()));
    dispatch(ACTION_LOGIN_EMAIL_NOT_INVALID());
    dispatch(ACTION_LOGIN_PASSWORD_NOT_INVALID());
  };

  return (
    <FormGroup>
      <Label for="loginPassword">
        <div className="required_label">Password</div>
      </Label>
      <Input
        type="password"
        name="loginPassword"
        defaultValue={loginPassword}
        maxLength={128}
        placeholder="Password"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLoginClick();
          }
        }}
        className="input_field_sign_up"
        onChange={passwordTyping}
        invalid={
          loginPassword === "" ? false : loginPasswordInvalid ? true : false
        }
      />
      {loginPasswordInvalid ? (
        <FormFeedback invalid="true">Invalid password.</FormFeedback>
      ) : null}
    </FormGroup>
  );
};

export default LoginPassword;
