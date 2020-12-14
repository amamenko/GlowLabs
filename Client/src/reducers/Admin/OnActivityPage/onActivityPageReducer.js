const ON_ACTIVITY_PAGE = "ON_ACTIVITY_PAGE";
const ON_ACTIVITY_PAGE_RESET = "ON_ACTIVITY_PAGE_RESET";

const onActivityPageReducer = (state = { on_activity_page: false }, action) => {
  switch (action.type) {
    case ON_ACTIVITY_PAGE:
      return { ...state, on_activity_page: true };
    case ON_ACTIVITY_PAGE_RESET:
      return { ...state, on_activity_page: false };
    default:
      return { ...state };
  }
};

export default onActivityPageReducer;
