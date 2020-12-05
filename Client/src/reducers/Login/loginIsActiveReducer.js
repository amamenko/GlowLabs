const LOGIN_IS_ACTIVE = "LOGIN_IS_ACTIVE";
const LOGIN_IS_NOT_ACTIVE = "LOGIN_IS_NOT_ACTIVE";

const loginIsActiveReducer = (state = { login_is_active: false }, action) => {
  switch (action.type) {
    case LOGIN_IS_ACTIVE:
      return { ...state, login_is_active: true };
    case LOGIN_IS_NOT_ACTIVE:
      return { ...state, login_is_active: false };
    default:
      return { ...state };
  }
};

export default loginIsActiveReducer;
