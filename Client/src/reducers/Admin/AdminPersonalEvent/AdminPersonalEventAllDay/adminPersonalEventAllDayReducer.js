const ADMIN_PERSONAL_EVENT_ALL_DAY = "ADMIN_PERSONAL_EVENT_ALL_DAY";
const ADMIN_PERSONAL_EVENT_ALL_DAY_RESET = "ADMIN_PERSONAL_EVENT_ALL_DAY_RESET";

const adminPersonalEventAllDayReducer = (
  state = { all_day: false },
  action
) => {
  switch (action.type) {
    case ADMIN_PERSONAL_EVENT_ALL_DAY:
      return { ...state, all_day: true };
    case ADMIN_PERSONAL_EVENT_ALL_DAY_RESET:
      return { ...state, all_day: false };
    default:
      return { ...state };
  }
};

export default adminPersonalEventAllDayReducer;
