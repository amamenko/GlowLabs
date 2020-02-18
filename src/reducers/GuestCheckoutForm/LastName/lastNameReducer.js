const LAST_NAME = "LAST_NAME";
const LAST_NAME_RESET = "LAST_NAME_RESET";

const lastNameReducer = (state = { last_name: "" }, action) => {
  switch (action.type) {
    case LAST_NAME:
      return { ...state, last_name: action.last_name };
    case LAST_NAME_RESET:
      return { ...state, last_name: "" };
    default:
      return { ...state };
  }
};

export default lastNameReducer;
