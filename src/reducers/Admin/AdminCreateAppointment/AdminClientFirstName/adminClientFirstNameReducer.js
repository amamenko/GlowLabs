const ADMIN_CLIENT_FIRST_NAME = "ADMIN_CLIENT_FIRST_NAME";
const ADMIN_CLIENT_FIRST_NAME_RESET = "ADMIN_CLIENT_FIRST_NAME_RESET";

const adminClientFirstNameReducer = (
  state = { admin_client_first_name: "" },
  action
) => {
  switch (action.type) {
    case ADMIN_CLIENT_FIRST_NAME:
      return {
        ...state,
        admin_client_first_name: action.admin_client_first_name,
      };
    case ADMIN_CLIENT_FIRST_NAME_RESET:
      return { ...state, admin_client_first_name: "" };
    default:
      return { ...state };
  }
};

export default adminClientFirstNameReducer;
