const BEARD_TOGGLE = "BEARD_TOGGLE";
const BEARD_TOGGLE_RESET = "BEARD_TOGGLE_RESET";

const beardToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case BEARD_TOGGLE:
      return { ...state, toggle: true };
    case BEARD_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default beardToggleReducer;
