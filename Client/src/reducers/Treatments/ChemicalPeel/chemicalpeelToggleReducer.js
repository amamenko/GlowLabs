const CHEMICAL_PEEL_TOGGLE = "CHEMICAL_PEEL_TOGGLE";
const CHEMICAL_PEEL_TOGGLE_RESET = "CHEMICAL_PEEL_TOGGLE_RESET";

const chemicalpeelToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case CHEMICAL_PEEL_TOGGLE:
      return { ...state, toggle: true };
    case CHEMICAL_PEEL_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default chemicalpeelToggleReducer;
