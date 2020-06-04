const ADMIN_AUTHENTICATED = "ADMIN_AUTHENTICATED";
const ADMIN_NOT_AUTHENTICATED = "ADMIN_NOT_AUTHENTICATED";

const adminAuthenticatedReducer = (
  state = { admin_authenticated: false },
  action
) => {
  switch (action.type) {
    case ADMIN_AUTHENTICATED:
      return { ...state, admin_authenticated: true };
    case ADMIN_NOT_AUTHENTICATED:
      return { ...state, admin_authenticated: false };
    default:
      return { ...state };
  }
};

export default adminAuthenticatedReducer;
