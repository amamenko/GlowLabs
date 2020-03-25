const CREATE_ACCOUNT_PASSWORD = "CREATE_ACCOUNT_PASSWORD";

const ACTION_CREATE_ACCOUNT_PASSWORD = create_account_password => {
  return {
    type: CREATE_ACCOUNT_PASSWORD,
    create_account_password
  };
};

export default ACTION_CREATE_ACCOUNT_PASSWORD;
