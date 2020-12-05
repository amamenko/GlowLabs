const ADMIN_DUMMY_TOKEN = "ADMIN_DUMMY_TOKEN";

const ACTION_ADMIN_DUMMY_TOKEN = (admin_dummy_token) => {
  return {
    type: ADMIN_DUMMY_TOKEN,
    admin_dummy_token,
  };
};

export default ACTION_ADMIN_DUMMY_TOKEN;
