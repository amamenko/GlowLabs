const EXTRA_EXTRACTIONS_TOGGLE = "EXTRA_EXTRACTIONS_TOGGLE";
const EXTRA_EXTRACTIONS_TOGGLE_RESET = "EXTRA_EXTRACTIONS_TOGGLE_RESET";

const extraExtractionsToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case EXTRA_EXTRACTIONS_TOGGLE:
      return { ...state, toggle: true };
    case EXTRA_EXTRACTIONS_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default extraExtractionsToggleReducer;
