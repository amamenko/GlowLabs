import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormGroup, FormFeedback, Label, Input } from "reactstrap";
import ACTION_ADMIN_CONFIRM_NEW_PASSWORD from "../../../../actions/Admin/AdminLogin/AdminConfirmNewPassword/ACTION_ADMIN_CONFIRM_NEW_PASSWORD";
import ACTION_ADMIN_CONFIRM_NEW_PASSWORD_RESET from "../../../../actions/Admin/AdminLogin/AdminConfirmNewPassword/ACTION_ADMIN_CONFIRM_NEW_PASSWORD_RESET";
import ACTION_ADMIN_CONFIRM_NEW_PASSWORD_NOT_INVALID from "../../../../actions/Admin/AdminLogin/AdminConfirmNewPassword/Invalid/ACTION_ADMIN_CONFIRM_NEW_PASSWORD_NOT_INVALID";
import ACTION_ADMIN_CONFIRM_NEW_PASSWORD_VALID from "../../../../actions/Admin/AdminLogin/AdminConfirmNewPassword/Valid/ACTION_ADMIN_CONFIRM_NEW_PASSWORD_VALID";
import ACTION_ADMIN_CONFIRM_NEW_PASSWORD_INVALID from "../../../../actions/Admin/AdminLogin/AdminConfirmNewPassword/Invalid/ACTION_ADMIN_CONFIRM_NEW_PASSWORD_INVALID";
import ACTION_ADMIN_CONFIRM_NEW_PASSWORD_NOT_VALID from "../../../../actions/Admin/AdminLogin/AdminConfirmNewPassword/Valid/ACTION_ADMIN_CONFIRM_NEW_PASSWORD_NOT_VALID";
import "../AdminLoginPage.css";

const AdminConfirmNewPassword = () => {
  const dispatch = useDispatch();

  // Admin Confirm New Password States
  const adminNewPassword = useSelector(
    (state) => state.adminNewPassword.admin_new_password
  );
  const adminNewPasswordValid = useSelector(
    (state) => state.adminNewPasswordValid.admin_new_password_valid
  );
  const adminConfirmNewPassword = useSelector(
    (state) => state.adminConfirmNewPassword.admin_confirm_new_password
  );
  const adminConfirmNewPasswordInvalid = useSelector(
    (state) =>
      state.adminConfirmNewPasswordInvalid.admin_confirm_new_password_invalid
  );
  const adminConfirmNewPasswordValid = useSelector(
    (state) =>
      state.adminConfirmNewPasswordValid.admin_confirm_new_password_valid
  );

  useEffect(() => {
    if (adminConfirmNewPassword === adminNewPassword) {
      dispatch(ACTION_ADMIN_CONFIRM_NEW_PASSWORD_NOT_INVALID());
      dispatch(ACTION_ADMIN_CONFIRM_NEW_PASSWORD_VALID());
    } else {
      dispatch(ACTION_ADMIN_CONFIRM_NEW_PASSWORD_INVALID());
      dispatch(ACTION_ADMIN_CONFIRM_NEW_PASSWORD_NOT_VALID());
    }
  }, [dispatch, adminConfirmNewPassword, adminNewPassword]);

  const handleConfirmNewPassword = (e) => {
    dispatch(ACTION_ADMIN_CONFIRM_NEW_PASSWORD(e.currentTarget.value.trim()));
  };

  const confirmNewPasswordTyping = (e) => {
    dispatch(ACTION_ADMIN_CONFIRM_NEW_PASSWORD_RESET());

    if (adminNewPassword) {
      if (adminNewPasswordValid) {
        if (e.currentTarget.value === adminNewPassword) {
          dispatch(
            ACTION_ADMIN_CONFIRM_NEW_PASSWORD(e.currentTarget.value.trim())
          );
          dispatch(ACTION_ADMIN_CONFIRM_NEW_PASSWORD_NOT_INVALID());
          dispatch(ACTION_ADMIN_CONFIRM_NEW_PASSWORD_VALID());
        }
      }
    }
  };

  return (
    <FormGroup className="sign_up_individual_form_field">
      <Label for="adminLoginPassword">
        <div className="required_label">Confirm New Password</div>
      </Label>
      <Input
        type="password"
        name="createAccountConfirmPassword"
        defaultValue={adminConfirmNewPassword}
        maxLength={128}
        placeholder="Re-enter new password here"
        className="input_field_sign_up"
        onChange={confirmNewPasswordTyping}
        onBlur={handleConfirmNewPassword}
        invalid={
          adminConfirmNewPassword === ""
            ? false
            : adminConfirmNewPasswordInvalid
            ? true
            : false
        }
        valid={
          adminConfirmNewPassword === ""
            ? false
            : adminConfirmNewPasswordValid
            ? true
            : false
        }
      />
      {adminConfirmNewPassword === adminNewPassword ? null : (
        <FormFeedback className="invalid_message_container" invalid="true">
          Passwords must match.
        </FormFeedback>
      )}
    </FormGroup>
  );
};

export default AdminConfirmNewPassword;
