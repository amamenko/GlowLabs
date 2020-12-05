const DIAGNOSED_WITH_ROSACEA_NO = "DIAGNOSED_WITH_ROSACEA_NO";
const DIAGNOSED_WITH_ROSACEA_NO_RESET = "DIAGNOSED_WITH_ROSACEA_NO_RESET";

const diagnosedWithRosaceaNoReducer = (
  state = { diagnosed_with_rosacea_no_active: false },
  action
) => {
  switch (action.type) {
    case DIAGNOSED_WITH_ROSACEA_NO:
      return { ...state, diagnosed_with_rosacea_no_active: true };
    case DIAGNOSED_WITH_ROSACEA_NO_RESET:
      return { ...state, diagnosed_with_rosacea_no_active: false };
    default:
      return { ...state };
  }
};

export default diagnosedWithRosaceaNoReducer;
