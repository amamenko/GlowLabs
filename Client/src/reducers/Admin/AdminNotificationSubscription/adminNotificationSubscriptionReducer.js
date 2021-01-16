const ADMIN_NOTIFICATION_SUBSCRIPTION = "ADMIN_NOTIFICATION_SUBSCRIPTION";
const ADMIN_NOTIFICATION_SUBSCRIPTION_RESET =
  "ADMIN_NOTIFICATION_SUBSCRIPTION_RESET";

const adminNotificationSubscriptionReducer = (
  state = { notification_subscription: "" },
  action
) => {
  switch (action.type) {
    case ADMIN_NOTIFICATION_SUBSCRIPTION:
      return {
        ...state,
        notification_subscription: action.notification_subscription,
      };
    case ADMIN_NOTIFICATION_SUBSCRIPTION_RESET:
      return {
        ...state,
        notification_subscription: "",
      };
    default:
      return { ...state };
  }
};

export default adminNotificationSubscriptionReducer;
