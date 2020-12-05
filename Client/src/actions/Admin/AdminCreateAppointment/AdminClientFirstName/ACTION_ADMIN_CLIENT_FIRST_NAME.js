const ADMIN_CLIENT_FIRST_NAME = "ADMIN_CLIENT_FIRST_NAME";

const ACTION_ADMIN_CLIENT_FIRST_NAME = (admin_client_first_name) => {
  return {
    type: ADMIN_CLIENT_FIRST_NAME,
    admin_client_first_name,
  };
};

export default ACTION_ADMIN_CLIENT_FIRST_NAME;
