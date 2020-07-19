const ADMIN_CLIENT_PHONE_NUMBER = "ADMIN_CLIENT_PHONE_NUMBER";

const ACTION_ADMIN_CLIENT_PHONE_NUMBER = (admin_client_phone_number) => {
  return {
    type: ADMIN_CLIENT_PHONE_NUMBER,
    admin_client_phone_number,
  };
};

export default ACTION_ADMIN_CLIENT_PHONE_NUMBER;
