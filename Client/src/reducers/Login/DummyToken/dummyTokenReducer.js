const DUMMY_TOKEN = "DUMMY_TOKEN";
const DUMMY_TOKEN_RESET = "DUMMY_TOKEN_RESET";

const dummyTokenReducer = (state = { dummy_token: null }, action) => {
  switch (action.type) {
    case DUMMY_TOKEN:
      return { ...state, dummy_token: action.dummy_token };
    case DUMMY_TOKEN_RESET:
      return { ...state, dummy_token: null };
    default:
      return { ...state };
  }
};

export default dummyTokenReducer;
