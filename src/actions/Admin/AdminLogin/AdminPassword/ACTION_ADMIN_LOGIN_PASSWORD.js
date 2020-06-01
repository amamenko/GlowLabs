const ADMIN_LOGIN_PASSWORD = "ADMIN_LOGIN_PASSWORD";

const ACTION_ADMIN_LOGIN_PASSWORD = (admin_login_password) => {
  return {
    type: ADMIN_LOGIN_PASSWORD,
    admin_login_password,
  };
};

export default ACTION_ADMIN_LOGIN_PASSWORD;
