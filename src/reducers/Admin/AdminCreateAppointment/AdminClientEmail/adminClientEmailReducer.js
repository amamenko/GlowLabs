const ADMIN_CLIENT_EMAIL = "ADMIN_CLIENT_EMAIL";
const ADMIN_CLIENT_EMAIL_RESET = "ADMIN_CLIENT_EMAIL_RESET";

const adminClientEmailReducer = (
  state = { admin_client_email: "" },
  action
) => {
  switch (action.type) {
    case ADMIN_CLIENT_EMAIL:
      return {
        ...state,
        admin_client_email: action.admin_client_email,
      };
    case ADMIN_CLIENT_EMAIL_RESET:
      return { ...state, admin_client_email: "" };
    default:
      return { ...state };
  }
};

export default adminClientEmailReducer;
