const TOTAL_DURATION = "TOTAL_DURATION";
const TOTAL_DURATION_RESET = "TOTAL_DURATION_RESET";

const totalDurationReducer = (state = { totalDuration: "" }, action) => {
  switch (action.type) {
    case TOTAL_DURATION:
      return { ...state, totalDuration: action.duration };
    case TOTAL_DURATION_RESET:
      return { ...state, totalDuration: "" };
    default:
      return { ...state };
  }
};

export default totalDurationReducer;
