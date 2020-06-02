const ADMIN_CONFIRM_NEW_PASSWORD = "ADMIN_CONFIRM_NEW_PASSWORD";

const ACTION_ADMIN_CONFIRM_NEW_PASSWORD = (admin_confirm_new_password) => {
  return {
    type: ADMIN_CONFIRM_NEW_PASSWORD,
    admin_confirm_new_password,
  };
};

export default ACTION_ADMIN_CONFIRM_NEW_PASSWORD;
