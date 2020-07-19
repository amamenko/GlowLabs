const ADMIN_CLIENT_LAST_NAME = "ADMIN_CLIENT_LAST_NAME";

const ACTION_ADMIN_CLIENT_LAST_NAME = (admin_client_last_name) => {
  return {
    type: ADMIN_CLIENT_LAST_NAME,
    admin_client_last_name,
  };
};

export default ACTION_ADMIN_CLIENT_LAST_NAME;
