const USER_AUTHENTICATED = "USER_AUTHENTICATED";
const USER_NOT_AUTHENTICATED = "USER_NOT_AUTHENTICATED";

const userAuthenticatedReducer = (
  state = { user_authenticated: false },
  action
) => {
  switch (action.type) {
    case USER_AUTHENTICATED:
      return { ...state, user_authenticated: true };
    case USER_NOT_AUTHENTICATED:
      return { ...state, user_authenticated: false };
    default:
      return { ...state };
  }
};

export default userAuthenticatedReducer;
