const QUENCH_TOGGLE = "QUENCH_TOGGLE";
const QUENCH_TOGGLE_RESET = "QUENCH_TOGGLE_RESET";

const quenchToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case QUENCH_TOGGLE:
      return { ...state, toggle: true };
    case QUENCH_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default quenchToggleReducer;
