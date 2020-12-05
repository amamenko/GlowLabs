const ADMIN_CLIENT_LAST_NAME = "ADMIN_CLIENT_LAST_NAME";
const ADMIN_CLIENT_LAST_NAME_RESET = "ADMIN_CLIENT_LAST_NAME_RESET";

const adminClientLastNameReducer = (
  state = { admin_client_last_name: "" },
  action
) => {
  switch (action.type) {
    case ADMIN_CLIENT_LAST_NAME:
      return {
        ...state,
        admin_client_last_name: action.admin_client_last_name,
      };
    case ADMIN_CLIENT_LAST_NAME_RESET:
      return { ...state, admin_client_last_name: "" };
    default:
      return { ...state };
  }
};

export default adminClientLastNameReducer;
