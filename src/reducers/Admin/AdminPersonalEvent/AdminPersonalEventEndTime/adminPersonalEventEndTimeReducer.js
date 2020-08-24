const ADMIN_PERSONAL_EVENT_END_TIME = "ADMIN_PERSONAL_EVENT_END_TIME";
const ADMIN_PERSONAL_EVENT_END_TIME_RESET =
  "ADMIN_PERSONAL_EVENT_END_TIME_RESET";

const adminPersonalEventEndTimeReducer = (state = { end_time: "" }, action) => {
  switch (action.type) {
    case ADMIN_PERSONAL_EVENT_END_TIME:
      return { ...state, end_time: action.end_time };
    case ADMIN_PERSONAL_EVENT_END_TIME_RESET:
      return { ...state, end_time: "" };
    default:
      return { ...state };
  }
};

export default adminPersonalEventEndTimeReducer;
