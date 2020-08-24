const ADMIN_PERSONAL_EVENT_STAFF = "ADMIN_PERSONAL_EVENT_STAFF";
const ADMIN_PERSONAL_EVENT_STAFF_RESET = "ADMIN_PERSONAL_EVENT_STAFF_RESET";

const adminPersonalEventStaffReducer = (state = { staff: "" }, action) => {
  switch (action.type) {
    case ADMIN_PERSONAL_EVENT_STAFF:
      return { ...state, staff: action.staff };
    case ADMIN_PERSONAL_EVENT_STAFF_RESET:
      return { ...state, staff: "" };
    default:
      return { ...state };
  }
};

export default adminPersonalEventStaffReducer;
