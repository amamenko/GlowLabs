const USER_SCROLLED = "USER_SCROLLED";
const USER_SCROLLED_RESET = "USER_SCROLLED_RESET";

const scrollReducer = (state = { scroll: false }, action) => {
  switch (action.type) {
    case USER_SCROLLED:
      return { ...state, scroll: true };
    case USER_SCROLLED_RESET:
      return { ...state, scroll: false };
    default:
      return { ...state };
  }
};

export default scrollReducer;
