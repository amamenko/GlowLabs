const ADMIN_TEMPORARY_DUMMY_TOKEN = "ADMIN_TEMPORARY_DUMMY_TOKEN";

const ACTION_ADMIN_TEMPORARY_DUMMY_TOKEN = (admin_temporary_dummy_token) => {
  return {
    type: ADMIN_TEMPORARY_DUMMY_TOKEN,
    admin_temporary_dummy_token,
  };
};

export default ACTION_ADMIN_TEMPORARY_DUMMY_TOKEN;
