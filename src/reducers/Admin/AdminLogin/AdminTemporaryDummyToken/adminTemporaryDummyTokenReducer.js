const ADMIN_TEMPORARY_DUMMY_TOKEN = "ADMIN_TEMPORARY_DUMMY_TOKEN";
const ADMIN_TEMPORARY_DUMMY_TOKEN_RESET = "ADMIN_TEMPORARY_DUMMY_TOKEN_RESET";

const adminTemporaryDummyTokenReducer = (
  state = { admin_temporary_dummy_token: null },
  action
) => {
  switch (action.type) {
    case ADMIN_TEMPORARY_DUMMY_TOKEN:
      return {
        ...state,
        admin_temporary_dummy_token: action.admin_temporary_dummy_token,
      };
    case ADMIN_TEMPORARY_DUMMY_TOKEN_RESET:
      return { ...state, admin_temporary_dummy_token: null };
    default:
      return { ...state };
  }
};

export default adminTemporaryDummyTokenReducer;
