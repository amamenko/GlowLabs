const NAVBAR_TOGGLE = "NAVBAR_TOGGLE";
const NAVBAR_TOGGLE_RESET = "NAVBAR_TOGGLE_RESET";

const navbarToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case NAVBAR_TOGGLE:
      return { ...state, toggle: true };
    case NAVBAR_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default navbarToggleReducer;
