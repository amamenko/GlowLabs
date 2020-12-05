const DERMAPLANING_TOGGLE = "DERMAPLANING_TOGGLE";
const DERMAPLANING_TOGGLE_RESET = "DERMAPLANING_TOGGLE_RESET";

const dermaplaningToggleReducer = (state = { toggle: false }, action) => {
  switch (action.type) {
    case DERMAPLANING_TOGGLE:
      return { ...state, toggle: true };
    case DERMAPLANING_TOGGLE_RESET:
      return { ...state, toggle: false };
    default:
      return { ...state };
  }
};

export default dermaplaningToggleReducer;
