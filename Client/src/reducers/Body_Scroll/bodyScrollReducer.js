const BODY_SCROLL_ALLOW = "BODY_SCROLL_ALLOW";
const BODY_SCROLL_RESET = "BODY_SCROLL_RESET";

const bodyScrollReducer = (state = { overflow: "hidden" }, action) => {
  switch (action.type) {
    case BODY_SCROLL_ALLOW:
      return { ...state, overflow: "visible" };
    case BODY_SCROLL_RESET:
      return { ...state, overflow: "hidden" };
    default:
      return { ...state };
  }
};

export default bodyScrollReducer;
