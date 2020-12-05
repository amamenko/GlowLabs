import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, FormFeedback, Label, Input } from "reactstrap";
import ACTION_ADMIN_LOGIN_EMAIL from "../../../actions/Admin/AdminLogin/AdminEmail/ACTION_ADMIN_LOGIN_EMAIL";
import ACTION_ADMIN_LOGIN_EMAIL_NOT_INVALID from "../../../actions/Admin/AdminLogin/AdminEmail/Invalid/ACTION_ADMIN_LOGIN_EMAIL_NOT_INVALID";
import ACTION_ADMIN_REGISTERED_EMPLOYEE_FOUND_RESET from "../../../actions/Admin/AdminLogin/AdminRegisteredEmployeeFound/ACTION_ADMIN_REGISTERED_EMPLOYEE_FOUND_RESET";
import ACTION_ADMIN_LOGIN_PASSWORD_NOT_INVALID from "../../../actions/Admin/AdminLogin/AdminPassword/Invalid/ACTION_ADMIN_LOGIN_PASSWORD_NOT_INVALID";
import "./AdminLoginPage.css";

const AdminLoginEmail = (props) => {
  const dispatch = useDispatch();

  // Admin Email States
  const adminLoginEmail = useSelector(
    (state) => state.adminLoginEmail.admin_login_email
  );
  const adminLoginEmailInvalid = useSelector(
    (state) => state.adminLoginEmailInvalid.admin_login_email_invalid
  );

  const adminEmailTyping = (e) => {
    dispatch(ACTION_ADMIN_LOGIN_EMAIL(e.currentTarget.value.trim()));
    dispatch(ACTION_ADMIN_REGISTERED_EMPLOYEE_FOUND_RESET());
    dispatch(ACTION_ADMIN_LOGIN_PASSWORD_NOT_INVALID());
    dispatch(ACTION_ADMIN_LOGIN_EMAIL_NOT_INVALID());
  };

  return (
    <FormGroup>
      <Label for="loginEmail">
        <div className="required_label">Email</div>
      </Label>
      <Input
        type="email"
        name="adminLoginEmail"
        defaultValue={adminLoginEmail}
        maxLength={128}
        placeholder="Email address"
        className="input_field_sign_up"
        onChange={adminEmailTyping}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            props.handleAdminLoginClick();
          }
        }}
        invalid={
          adminLoginEmail === "" ? false : adminLoginEmailInvalid ? true : false
        }
      />
      {adminLoginEmailInvalid ? (
        <FormFeedback invalid="true">
          No registered employee found with this email.
        </FormFeedback>
      ) : null}
    </FormGroup>
  );
};

export default AdminLoginEmail;
