const PREGNANT_OR_NURSING_NO = "PREGNANT_OR_NURSING_NO";
const PREGNANT_OR_NURSING_NO_RESET = "PREGNANT_OR_NURSING_NO_RESET";

const pregnantOrNursingNoReducer = (
  state = { pregnant_or_nursing_no_active: false },
  action
) => {
  switch (action.type) {
    case PREGNANT_OR_NURSING_NO:
      return { ...state, pregnant_or_nursing_no_active: true };
    case PREGNANT_OR_NURSING_NO_RESET:
      return { ...state, pregnant_or_nursing_no_active: false };
    default:
      return { ...state };
  }
};

export default pregnantOrNursingNoReducer;
