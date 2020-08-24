const ADMIN_PERSONAL_EVENT_TITLE = "ADMIN_PERSONAL_EVENT_TITLE";
const ADMIN_PERSONAL_EVENT_TITLE_RESET = "ADMIN_PERSONAL_EVENT_TITLE_RESET";

const adminPersonalEventTitleReducer = (state = { title: "" }, action) => {
  switch (action.type) {
    case ADMIN_PERSONAL_EVENT_TITLE:
      return { ...state, title: action.title };
    case ADMIN_PERSONAL_EVENT_TITLE_RESET:
      return { ...state, title: "" };
    default:
      return { ...state };
  }
};

export default adminPersonalEventTitleReducer;
