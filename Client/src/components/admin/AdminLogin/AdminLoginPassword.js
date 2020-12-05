import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, FormFeedback, Label, Input } from "reactstrap";
import ACTION_ADMIN_LOGIN_PASSWORD_NOT_INVALID from "../../../actions/Admin/AdminLogin/AdminPassword/Invalid/ACTION_ADMIN_LOGIN_PASSWORD_NOT_INVALID";
import ACTION_ADMIN_LOGIN_EMAIL_NOT_INVALID from "../../../actions/Admin/AdminLogin/AdminEmail/Invalid/ACTION_ADMIN_LOGIN_EMAIL_NOT_INVALID";
import ACTION_ADMIN_LOGIN_PASSWORD from "../../../actions/Admin/AdminLogin/AdminPassword/ACTION_ADMIN_LOGIN_PASSWORD";
import "./AdminLoginPage.css";

const AdminLoginPassword = (props) => {
  const dispatch = useDispatch();

  // Admin Password States
  const adminLoginPassword = useSelector(
    (state) => state.adminLoginPassword.admin_login_password
  );
  const adminLoginPasswordInvalid = useSelector(
    (state) => state.adminLoginPasswordInvalid.admin_login_password_invalid
  );

  const adminPasswordTyping = (e) => {
    dispatch(ACTION_ADMIN_LOGIN_PASSWORD(e.currentTarget.value.trim()));
    dispatch(ACTION_ADMIN_LOGIN_EMAIL_NOT_INVALID());
    dispatch(ACTION_ADMIN_LOGIN_PASSWORD_NOT_INVALID());
  };

  return (
    <FormGroup>
      <Label for="adminLoginPassword">
        <div className="required_label">Password</div>
      </Label>
      <Input
        type="password"
        name="adminLoginPassword"
        defaultValue={adminLoginPassword}
        maxLength={128}
        placeholder="Password"
        className="input_field_sign_up"
        onChange={adminPasswordTyping}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            props.handleAdminLoginClick();
          }
        }}
        invalid={
          adminLoginPassword === ""
            ? false
            : adminLoginPasswordInvalid
            ? true
            : false
        }
      />
      {adminLoginPasswordInvalid ? (
        <FormFeedback invalid="true">Invalid password.</FormFeedback>
      ) : null}
    </FormGroup>
  );
};

export default AdminLoginPassword;
