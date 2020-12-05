const EVENING_OPEN = "EVENING_OPEN";
const EVENING_CLOSED = "EVENING_CLOSED";
const ALL_COLLAPSE_RESET = "ALL_COLLAPSE_RESET";

const eveningCollapseReducer = (state = { collapseIsOpen: false }, action) => {
  switch (action.type) {
    case EVENING_OPEN:
      return { ...state, collapseIsOpen: true };
    case ALL_COLLAPSE_RESET:
    case EVENING_CLOSED:
      return { ...state, collapseIsOpen: false };
    default:
      return { ...state };
  }
};

export default eveningCollapseReducer;
