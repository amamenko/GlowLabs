const REFORMATTED_DAY_CLONE = "REFORMATTED_DAY_CLONE";
const REFORMATTED_DAY_CLONE_RESET = "REFORMATTED_DAY_CLONE_RESET";

const reformattedDayCloneReducer = (
  state = { reformattedDayClone: "" },
  action
) => {
  switch (action.type) {
    case REFORMATTED_DAY_CLONE:
      return { ...state, reformattedDayClone: action.day };
    case REFORMATTED_DAY_CLONE_RESET:
      return { ...state, reformattedDayClone: "" };
    default:
      return { ...state };
  }
};

export default reformattedDayCloneReducer;
