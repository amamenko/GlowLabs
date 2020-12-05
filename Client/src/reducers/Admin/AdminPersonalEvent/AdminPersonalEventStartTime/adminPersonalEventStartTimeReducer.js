const ADMIN_PERSONAL_EVENT_START_TIME = "ADMIN_PERSONAL_EVENT_START_TIME";
const ADMIN_PERSONAL_EVENT_START_TIME_RESET =
  "ADMIN_PERSONAL_EVENT_START_TIME_RESET";

const adminPersonalEventStartTimeReducer = (
  state = { start_time: "" },
  action
) => {
  switch (action.type) {
    case ADMIN_PERSONAL_EVENT_START_TIME:
      return { ...state, start_time: action.start_time };
    case ADMIN_PERSONAL_EVENT_START_TIME_RESET:
      return { ...state, start_time: "" };
    default:
      return { ...state };
  }
};

export default adminPersonalEventStartTimeReducer;
