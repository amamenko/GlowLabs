const ADMIN_LOGIN_EMAIL = "ADMIN_LOGIN_EMAIL";

const ACTION_ADMIN_LOGIN_EMAIL = (admin_login_email) => {
  return {
    type: ADMIN_LOGIN_EMAIL,
    admin_login_email,
  };
};

export default ACTION_ADMIN_LOGIN_EMAIL;
