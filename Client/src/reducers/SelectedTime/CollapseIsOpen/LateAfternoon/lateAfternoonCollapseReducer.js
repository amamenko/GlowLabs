const LATE_AFTERNOON_OPEN = "LATE_AFTERNOON_OPEN";
const LATE_AFTERNOON_CLOSED = "LATE_AFTERNOON_CLOSED";
const ALL_COLLAPSE_RESET = "ALL_COLLAPSE_RESET";

const lateAfternoonCollapseReducer = (
  state = { collapseIsOpen: false },
  action
) => {
  switch (action.type) {
    case LATE_AFTERNOON_OPEN:
      return { ...state, collapseIsOpen: true };
    case ALL_COLLAPSE_RESET:
    case LATE_AFTERNOON_CLOSED:
      return { ...state, collapseIsOpen: false };
    default:
      return { ...state };
  }
};

export default lateAfternoonCollapseReducer;
