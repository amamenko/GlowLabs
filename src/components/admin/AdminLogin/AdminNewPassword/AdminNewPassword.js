import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, FormFeedback, Label, Input } from "reactstrap";
import ACTION_ADMIN_NEW_PASSWORD_NOT_INVALID from "../../../../actions/Admin/AdminLogin/AdminNewPassword/Invalid/ACTION_ADMIN_NEW_PASSWORD_NOT_INVALID";
import ACTION_ADMIN_NEW_PASSWORD from "../../../../actions/Admin/AdminLogin/AdminNewPassword/ACTION_ADMIN_NEW_PASSWORD";
import ACTION_ADMIN_NEW_PASSWORD_INVALID from "../../../../actions/Admin/AdminLogin/AdminNewPassword/Invalid/ACTION_ADMIN_NEW_PASSWORD_INVALID";
import ACTION_ADMIN_NEW_PASSWORD_VALID from "../../../../actions/Admin/AdminLogin/AdminNewPassword/Valid/ACTION_ADMIN_NEW_PASSWORD_VALID";
import ACTION_ADMIN_NEW_PASSWORD_NOT_VALID from "../../../../actions/Admin/AdminLogin/AdminNewPassword/Valid/ACTION_ADMIN_NEW_PASSWORD_NOT_VALID";
import ACTION_ADMIN_NEW_PASSWORD_RESET from "../../../../actions/Admin/AdminLogin/AdminNewPassword/ACTION_ADMIN_NEW_PASSWORD_RESET";
import "../AdminLoginPage.css";

const AdminNewPassword = () => {
  const dispatch = useDispatch();

  // Admin New Password States
  const adminNewPassword = useSelector(
    (state) => state.adminNewPassword.admin_new_password
  );
  const adminNewPasswordInvalid = useSelector(
    (state) => state.adminNewPasswordInvalid.admin_new_password_invalid
  );
  const adminNewPasswordValid = useSelector(
    (state) => state.adminNewPasswordValid.admin_new_password_valid
  );

  const adminPasswordTyping = () => {
    dispatch(ACTION_ADMIN_NEW_PASSWORD_RESET());
    dispatch(ACTION_ADMIN_NEW_PASSWORD_NOT_INVALID());
  };

  // Regular Expression for Password Validation - must be at least 8 characters long, must contain at least 1 lowercase character, 1 uppercase character, and 1 number
  const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  const validatePassword = (e) => {
    const validPassword = passwordReg.test(e.currentTarget.value);
    dispatch(ACTION_ADMIN_NEW_PASSWORD(e.currentTarget.value.trim()));

    if (validPassword) {
      dispatch(ACTION_ADMIN_NEW_PASSWORD_NOT_INVALID());
      dispatch(ACTION_ADMIN_NEW_PASSWORD_VALID());
    } else {
      dispatch(ACTION_ADMIN_NEW_PASSWORD_INVALID());
      dispatch(ACTION_ADMIN_NEW_PASSWORD_NOT_VALID());
    }
  };

  return (
    <FormGroup>
      <Label for="adminLoginPassword">
        <div className="required_label">New Password</div>
      </Label>
      <Input
        type="password"
        name="createNewAdminPassword"
        defaultValue={adminNewPassword}
        maxLength={128}
        placeholder="Enter new password here"
        className="input_field_sign_up"
        onChange={adminPasswordTyping}
        onBlur={validatePassword}
        invalid={
          adminNewPassword === ""
            ? false
            : adminNewPasswordInvalid
            ? true
            : false
        }
        valid={
          adminNewPassword === "" ? false : adminNewPasswordValid ? true : false
        }
      />
      {adminNewPassword.length < 8 ? (
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

export default AdminNewPassword;
