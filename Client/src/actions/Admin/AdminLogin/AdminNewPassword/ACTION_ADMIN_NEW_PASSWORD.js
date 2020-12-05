const ADMIN_NEW_PASSWORD = "ADMIN_NEW_PASSWORD";

const ACTION_ADMIN_NEW_PASSWORD = (admin_new_password) => {
  return {
    type: ADMIN_NEW_PASSWORD,
    admin_new_password,
  };
};

export default ACTION_ADMIN_NEW_PASSWORD;
