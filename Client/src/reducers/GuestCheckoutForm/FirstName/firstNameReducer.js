const FIRST_NAME = "FIRST_NAME";
const FIRST_NAME_RESET = "FIRST_NAME_RESET";

const firstNameReducer = (state = { first_name: "" }, action) => {
  switch (action.type) {
    case FIRST_NAME:
      return { ...state, first_name: action.first_name };
    case FIRST_NAME_RESET:
      return { ...state, first_name: "" };
    default:
      return { ...state };
  }
};

export default firstNameReducer;
