const CBD_TOGGLE = "CBD_TOGGLE";
const CBD_TOGGLE_RESET = "CBD_TOGGLE_RESET";

const cbdToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case CBD_TOGGLE:
      return { ...state, toggle: true };
    case CBD_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default cbdToggleReducer;
