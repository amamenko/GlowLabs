const MORNING_OPEN = "MORNING_OPEN";
const MORNING_CLOSED = "MORNING_CLOSED";
const ALL_COLLAPSE_RESET = "ALL_COLLAPSE_RESET";

const morningCollapseReducer = (state = { collapseIsOpen: false }, action) => {
  switch (action.type) {
    case MORNING_OPEN:
      return { ...state, collapseIsOpen: true };
    case ALL_COLLAPSE_RESET:
    case MORNING_CLOSED:
      return { ...state, collapseIsOpen: false };
    default:
      return { ...state };
  }
};

export default morningCollapseReducer;
