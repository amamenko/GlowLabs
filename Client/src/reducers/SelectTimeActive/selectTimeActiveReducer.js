const SELECT_TIME_ACTIVE = "SELECT_TIME_ACTIVE";
const SELECT_TIME_NOT_ACTIVE = "SELECT_TIME_NOT_ACTIVE";

const selectTimeActiveReducer = (
  state = { selectTimeActive: false },
  action
) => {
  switch (action.type) {
    case SELECT_TIME_ACTIVE:
      return { ...state, selectTimeActive: true };
    case SELECT_TIME_NOT_ACTIVE:
      return { ...state, selectTimeActive: false };
    default:
      return { ...state };
  }
};

export default selectTimeActiveReducer;
