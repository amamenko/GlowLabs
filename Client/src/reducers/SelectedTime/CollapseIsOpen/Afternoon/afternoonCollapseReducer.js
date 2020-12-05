const AFTERNOON_OPEN = "AFTERNOON_OPEN";
const AFTERNOON_CLOSED = "AFTERNOON_CLOSED";
const ALL_COLLAPSE_RESET = "ALL_COLLAPSE_RESET";

const afternoonCollapseReducer = (
  state = { collapseIsOpen: false },
  action
) => {
  switch (action.type) {
    case AFTERNOON_OPEN:
      return { ...state, collapseIsOpen: true };
    case ALL_COLLAPSE_RESET:
    case AFTERNOON_CLOSED:
      return { ...state, collapseIsOpen: false };
    default:
      return { ...state };
  }
};

export default afternoonCollapseReducer;
