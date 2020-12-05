const ADMIN_PERSONAL_EVENT_BLOCK_TIME = "ADMIN_PERSONAL_EVENT_BLOCK_TIME";
const ADMIN_PERSONAL_EVENT_BLOCK_TIME_RESET =
  "ADMIN_PERSONAL_EVENT_BLOCK_TIME_RESET";

const adminPersonalEventBlockTimeReducer = (
  state = { block_time: true },
  action
) => {
  switch (action.type) {
    case ADMIN_PERSONAL_EVENT_BLOCK_TIME:
      return { ...state, block_time: true };
    case ADMIN_PERSONAL_EVENT_BLOCK_TIME_RESET:
      return { ...state, block_time: false };
    default:
      return { ...state };
  }
};

export default adminPersonalEventBlockTimeReducer;
