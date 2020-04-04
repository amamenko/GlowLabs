const DIAGNOSED_WITH_ROSACEA_YES = "DIAGNOSED_WITH_ROSACEA_YES";
const DIAGNOSED_WITH_ROSACEA_YES_RESET = "DIAGNOSED_WITH_ROSACEA_YES_RESET";

const diagnosedWithRosaceaYesReducer = (
  state = { diagnosed_with_rosacea_yes_active: false },
  action
) => {
  switch (action.type) {
    case DIAGNOSED_WITH_ROSACEA_YES:
      return { ...state, diagnosed_with_rosacea_yes_active: true };
    case DIAGNOSED_WITH_ROSACEA_YES_RESET:
      return { ...state, diagnosed_with_rosacea_yes_active: false };
    default:
      return { ...state };
  }
};

export default diagnosedWithRosaceaYesReducer;
