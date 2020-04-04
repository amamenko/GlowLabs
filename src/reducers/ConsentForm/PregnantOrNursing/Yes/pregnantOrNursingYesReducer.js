const PREGNANT_OR_NURSING_YES = "PREGNANT_OR_NURSING_YES";
const PREGNANT_OR_NURSING_YES_RESET = "PREGNANT_OR_NURSING_YES_RESET";

const pregnantOrNursingYesReducer = (
  state = { pregnant_or_nursing_yes_active: false },
  action
) => {
  switch (action.type) {
    case PREGNANT_OR_NURSING_YES:
      return { ...state, pregnant_or_nursing_yes_active: true };
    case PREGNANT_OR_NURSING_YES_RESET:
      return { ...state, pregnant_or_nursing_yes_active: false };
    default:
      return { ...state };
  }
};

export default pregnantOrNursingYesReducer;
