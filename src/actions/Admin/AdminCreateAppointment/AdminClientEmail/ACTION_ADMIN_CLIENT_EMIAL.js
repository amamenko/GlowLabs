const ADMIN_CLIENT_EMAIL = "ADMIN_CLIENT_EMAIL";

const ACTION_ADMIN_CLIENT_EMAIL = (admin_client_email) => {
  return {
    type: ADMIN_CLIENT_EMAIL,
    admin_client_email,
  };
};

export default ACTION_ADMIN_CLIENT_EMAIL;
