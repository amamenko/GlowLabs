const MICROCURRENT_TOGGLE = "MICROCURRENT_TOGGLE";
const MICROCURRENT_TOGGLE_RESET = "MICROCURRENT_TOGGLE_RESET";

const microcurrentToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case MICROCURRENT_TOGGLE:
      return { ...state, toggle: true };
    case MICROCURRENT_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default microcurrentToggleReducer;
