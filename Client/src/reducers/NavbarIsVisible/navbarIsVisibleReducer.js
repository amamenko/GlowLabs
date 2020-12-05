const NAVBAR_IS_VISIBLE = "NAVBAR_IS_VISIBLE";
const NAVBAR_NOT_VISIBLE = "NAVBAR_NOT_VISIBLE";

const navbarIsVisibleReducer = (state = { visible: true }, action) => {
  switch (action.type) {
    case NAVBAR_IS_VISIBLE:
      return { ...state, visible: true };
    case NAVBAR_NOT_VISIBLE:
      return { ...state, visible: false };
    default:
      return { ...state };
  }
};

export default navbarIsVisibleReducer;
