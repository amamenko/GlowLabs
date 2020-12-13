const ASSIGN_ADMIN_NOTIFICATIONS = "ASSIGN_ADMIN_NOTIFICATIONS";
const RESET_ADMIN_NOTIFICATIONS = "RESET_ADMIN_NOTIFICATIONS";

const adminNotificationsReducer = (state = { notifications: [] }, action) => {
  switch (action.type) {
    case ASSIGN_ADMIN_NOTIFICATIONS:
      return { ...state, notifications: action.notifications };
    case RESET_ADMIN_NOTIFICATIONS:
      return { ...state, notifications: [] };
    default:
      return { ...state };
  }
};

export default adminNotificationsReducer;
