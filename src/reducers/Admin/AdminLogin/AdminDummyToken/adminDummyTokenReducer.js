const ADMIN_DUMMY_TOKEN = "ADMIN_DUMMY_TOKEN";
const ADMIN_DUMMY_TOKEN_RESET = "ADMIN_DUMMY_TOKEN_RESET";

const adminDummyTokenReducer = (
  state = { admin_dummy_token: null },
  action
) => {
  switch (action.type) {
    case ADMIN_DUMMY_TOKEN:
      return { ...state, admin_dummy_token: action.admin_dummy_token };
    case ADMIN_DUMMY_TOKEN_RESET:
      return { ...state, admin_dummy_token: null };
    default:
      return { ...state };
  }
};

export default adminDummyTokenReducer;
